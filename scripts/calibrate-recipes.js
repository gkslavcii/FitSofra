// ╔══════════════════════════════════════════════════════════════════════╗
// ║  FitSofra — Tarif Makro Kalibrasyon Raporu (DRY-RUN)                ║
// ║  TURKISH_RECIPES_DB'deki kayıtlı makroları RecipeCalculator ile     ║
// ║  karşılaştırır, gerçek yieldServings'i çıkarır, dosyaya yazmaz.     ║
// ║                                                                      ║
// ║  Kullanım: node scripts/calibrate-recipes.js [--full|--low|--mid]   ║
// ╚══════════════════════════════════════════════════════════════════════╝
'use strict';
global.window = {};
require('../js/turkish-hammadde-db.js');
require('../js/turkish-recipes-db.js');
require('../js/amount-parser.js');
require('../js/recipe-calculator.js');

var DB = window.TURKISH_RECIPES_DB;
var RC = window.RecipeCalculator;

// Kategori bazlı beklenen porsiyon gramı (sanity guardrails)
var EXPECTED_GRAMS = {
  klasik:  [200, 450],
  corba:   [250, 450],
  fit:     [200, 450],
  pratik:  [150, 400],
  sebze:   [180, 400],
  tatli:   [60,  180],
  vegan:   [200, 450],
  sandvic: [150, 350],
  salata:  [150, 350],
  hamur:   [120, 350],
  meze:    [80,  200]
};

function inferYield(stored, calc, coverage) {
  // Düşük coverage → güvenilmez
  if (coverage < 0.85) return { yields: null, reason: 'low-coverage' };
  if (!stored || stored < 10) return { yields: null, reason: 'no-stored' };
  if (!calc || calc < 10) return { yields: null, reason: 'no-calc' };

  var ratio = calc / stored;

  // Stored zaten doğru civarında (0.7 - 1.5x)
  if (ratio >= 0.70 && ratio <= 1.50) {
    return { yields: 1, reason: 'stored-ok', ratio: ratio };
  }
  // Stored çok düşük → yield > 1
  if (ratio > 1.50 && ratio <= 8.0) {
    return { yields: Math.round(ratio), reason: 'multi-portion', ratio: ratio };
  }
  // Stored çok yüksek (toplam değil porsiyon olarak) — nadir
  if (ratio < 0.70 && ratio >= 0.20) {
    return { yields: 1, reason: 'stored-too-high', ratio: ratio, flag: true };
  }
  return { yields: null, reason: 'extreme-ratio', ratio: ratio };
}

function checkServGrams(catKey, gramsPerServing) {
  var range = EXPECTED_GRAMS[catKey];
  if (!range || !gramsPerServing) return { ok: true };
  if (gramsPerServing < range[0]) return { ok: false, reason: 'too-light', range: range, val: gramsPerServing };
  if (gramsPerServing > range[1]) return { ok: false, reason: 'too-heavy', range: range, val: gramsPerServing };
  return { ok: true };
}

var rows = [];
var stats = {
  total: DB.length,
  storedOk: 0,
  multiPortion: 0,
  flagged: 0,
  lowCoverage: 0,
  servGramsFlagged: 0
};

DB.forEach(function (r) {
  var calc = RC.calcRecipe(r);
  var inf = inferYield(r.cal, calc.total.cal, calc.coverage.ratio);
  var newYield = inf.yields;
  var newPer = null;
  var servCheck = { ok: true };

  if (newYield && newYield > 0) {
    newPer = {
      cal:  Math.round(calc.total.cal / newYield),
      prot: Math.round((calc.total.prot / newYield) * 10) / 10,
      carb: Math.round((calc.total.carb / newYield) * 10) / 10,
      fat:  Math.round((calc.total.fat / newYield) * 10) / 10,
      grams: Math.round(calc.total.grams / newYield)
    };
    servCheck = checkServGrams(r.cat, newPer.grams);
    if (!servCheck.ok) stats.servGramsFlagged++;
  }

  if (inf.reason === 'stored-ok') stats.storedOk++;
  else if (inf.reason === 'multi-portion') stats.multiPortion++;
  else if (inf.reason === 'low-coverage') stats.lowCoverage++;
  else if (inf.flag) stats.flagged++;

  rows.push({
    id: r.id, name: r.name, cat: r.cat,
    stored: { cal: r.cal, prot: r.prot, carb: r.carb, fat: r.fat },
    calcTotal: calc.total,
    coverage: calc.coverage.ratio,
    inference: inf,
    yieldServings: newYield,
    newPer: newPer,
    servCheck: servCheck,
    missing: calc.coverage.missing.map(function (m) { return m.name; })
  });
});

// ═══ Çıktı ═══
var arg = process.argv[2] || '--summary';

console.log('═════════════════════════════════════════════════════════════');
console.log('  TARIF MAKRO KALİBRASYON RAPORU (dry-run, dosya YAZILMIYOR)');
console.log('═════════════════════════════════════════════════════════════');
console.log('Toplam tarif:        ', stats.total);
console.log('Stored zaten OK:     ', stats.storedOk,     '(%' + Math.round(stats.storedOk    / stats.total * 100) + ')');
console.log('Multi-portion (yield>1):', stats.multiPortion, '(%' + Math.round(stats.multiPortion / stats.total * 100) + ')');
console.log('Stored çok yüksek (?):', stats.flagged);
console.log('Düşük coverage (<%85):', stats.lowCoverage,  '(%' + Math.round(stats.lowCoverage / stats.total * 100) + ')');
console.log('Porsiyon gram outlier:', stats.servGramsFlagged);

function printRow(r) {
  var s = r.stored, p = r.newPer;
  var line = '  ' + r.id.padEnd(28).slice(0,28) +
    ' [' + r.cat.padEnd(7) + ']' +
    ' cov:' + (Math.round(r.coverage * 100) + '%').padStart(4) +
    ' kayıt:' + String(s.cal).padStart(4) + 'k' +
    ' total:' + String(Math.round(r.calcTotal.cal)).padStart(5) + 'k' +
    ' yield:' + String(r.yieldServings || '-').padStart(2) +
    (p ? ' →per:' + String(p.cal).padStart(4) + 'k(' + String(p.grams).padStart(3) + 'g)' : '') +
    ' [' + r.inference.reason + (r.inference.ratio ? ' ' + r.inference.ratio.toFixed(1) + 'x' : '') + ']' +
    (r.servCheck.ok ? '' : ' ⚠️' + r.servCheck.reason);
  console.log(line);
}

if (arg === '--full' || arg === '-a') {
  console.log('\n--- TÜM TARİFLER ---');
  rows.forEach(printRow);
} else if (arg === '--low') {
  console.log('\n--- DÜŞÜK COVERAGE (<%85) ---');
  rows.filter(function (r) { return r.inference.reason === 'low-coverage'; }).forEach(printRow);
} else if (arg === '--mid') {
  console.log('\n--- MULTI-PORTION (yield çıkarımı yapıldı) ---');
  rows.filter(function (r) { return r.inference.reason === 'multi-portion'; })
      .sort(function (a, b) { return b.inference.ratio - a.inference.ratio; })
      .forEach(printRow);
} else if (arg === '--flag') {
  console.log('\n--- SHADE: stored-too-high VEYA porsiyon gram outlier ---');
  rows.filter(function (r) { return r.inference.flag || !r.servCheck.ok; }).forEach(printRow);
} else if (arg === '--ok') {
  console.log('\n--- STORED ZATEN OK (büyük değişiklik yok) ---');
  rows.filter(function (r) { return r.inference.reason === 'stored-ok'; }).forEach(printRow);
} else {
  // Summary distribution
  console.log('\nKategori bazlı multi-portion sayıları:');
  var byCat = {};
  rows.forEach(function (r) {
    if (r.inference.reason !== 'multi-portion') return;
    byCat[r.cat] = (byCat[r.cat] || 0) + 1;
  });
  Object.keys(byCat).sort().forEach(function (k) {
    console.log('  ' + k.padEnd(10) + ': ' + byCat[k]);
  });
  console.log('\nyield dağılımı (multi-portion):');
  var yDist = {};
  rows.forEach(function (r) {
    if (r.inference.reason !== 'multi-portion') return;
    yDist[r.yieldServings] = (yDist[r.yieldServings] || 0) + 1;
  });
  Object.keys(yDist).sort(function (a, b) { return +a - +b; }).forEach(function (k) {
    console.log('  ' + k + ' porsiyon → ' + yDist[k] + ' tarif');
  });
  console.log('\nFiltreli liste için: --full | --mid | --low | --flag | --ok');
}

// JSON dışa aktarım (sonraki adımda dosyaya yazma için)
require('fs').writeFileSync(
  __dirname + '/calibration-report.json',
  JSON.stringify(rows, null, 2),
  'utf8'
);
console.log('\nDetaylı JSON: scripts/calibration-report.json');
