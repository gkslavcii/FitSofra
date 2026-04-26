// ╔══════════════════════════════════════════════════════════════════════╗
// ║  FitSofra — Tarif Makro Kalibrasyonu UYGULA                         ║
// ║  scripts/calibrate-recipes.js sonuçlarını dosyaya yazar.            ║
// ║                                                                      ║
// ║  Adımlar:                                                            ║
// ║  1) calibration-report.json'dan tarif planlarını oku                ║
// ║  2) Outlier'lar için refine pass: yield'i ±1, ±2 ayarla, en iyiye   ║
// ║  3) Sadece serv/cal/prot/carb/fat/yieldServings alanlarını yaz      ║
// ║  4) img/ingredients/steps/tags/emoji KESİNLİKLE DOKUNULMAZ          ║
// ║  5) Manuel review listesini scripts/manual-review.md'ye yaz         ║
// ║                                                                      ║
// ║  Kullanım:                                                           ║
// ║    node scripts/apply-calibration.js --dry    (önizleme)            ║
// ║    node scripts/apply-calibration.js --write  (dosyaya yaz)         ║
// ╚══════════════════════════════════════════════════════════════════════╝
'use strict';
var fs = require('fs');
var path = require('path');

global.window = {};
require('../js/turkish-hammadde-db.js');
require('../js/turkish-recipes-db.js');
require('../js/amount-parser.js');
require('../js/recipe-calculator.js');

var DB = window.TURKISH_RECIPES_DB;
var RC = window.RecipeCalculator;
var DB_FILE = path.join(__dirname, '..', 'js', 'turkish-recipes-db.js');

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

function inRange(g, range) {
  return range && g >= range[0] && g <= range[1];
}

function rangeDistance(g, range) {
  if (!range) return 0;
  if (g < range[0]) return range[0] - g;
  if (g > range[1]) return g - range[1];
  return 0;
}

// ═══ Tarif başına aksiyon planı — calibration-report.json'dan oku
// (calibrate-recipes.js önce çalışmış olmalı; biz onun yieldServings çıkarımını uygularız)
function buildPlan() {
  var reportPath = path.join(__dirname, 'calibration-report.json');
  if (!fs.existsSync(reportPath)) {
    console.error('❌ calibration-report.json yok. Önce: node scripts/calibrate-recipes.js');
    process.exit(1);
  }
  var report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  var plans = [];

  report.forEach(function (row) {
    var r = DB.find(function (x) { return x.id === row.id; });
    if (!r) return;

    var coverage = row.coverage;
    var inf = row.inference;
    var action = 'skip';
    var reason = inf.reason;
    var newYield = row.yieldServings;
    var newPer = row.newPer;

    if (inf.reason === 'low-coverage') {
      action = 'manual-review';
    } else if (inf.reason === 'stored-ok') {
      action = 'add-yield-only';
      newYield = 1;
    } else if (inf.reason === 'multi-portion' || inf.reason === 'large-batch') {
      action = newYield > 1 ? 'multi-portion' : 'add-yield-only';
      if (newYield === 1) { newPer = null; }  // tek porsiyon: stored'u koru
    } else if (inf.reason === 'stored-too-high' || inf.flag) {
      action = 'manual-review';
    } else if (inf.reason === 'extreme-ratio') {
      action = 'manual-review';
    }

    plans.push({
      id: r.id,
      name: r.name,
      cat: r.cat,
      action: action,
      reason: reason + (inf.ratio ? ' (' + inf.ratio.toFixed(1) + 'x)' : ''),
      coverage: coverage,
      stored: { cal: r.cal, prot: r.prot, carb: r.carb, fat: r.fat, serv: r.serv },
      calcTotal: row.calcTotal,
      newYield: newYield,
      newPer: newPer,
      missing: row.missing
    });
  });
  return plans;
}

// ═══ Tek tarif bloğunu metin olarak bul
function findRecipeBlock(text, id) {
  // Aramada `id:"r_xxx"` örüntüsü
  var re = new RegExp('id\\s*:\\s*"' + id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"');
  var m = re.exec(text);
  if (!m) return null;
  // Bloğun başlangıcı: en yakın geri `{`
  var start = m.index;
  while (start > 0 && text[start] !== '{') start--;
  // Bloğun sonu: brace counter
  var depth = 0, i = start;
  for (; i < text.length; i++) {
    if (text[i] === '{') depth++;
    else if (text[i] === '}') { depth--; if (depth === 0) break; }
  }
  if (depth !== 0) return null;
  return { start: start, end: i + 1, text: text.substring(start, i + 1) };
}

// ═══ Bloktaki alanları güvenli güncelle/ekle
function updateBlock(block, updates) {
  // updates: {cal, prot, carb, fat, serv, yieldServings}
  var out = block;

  function replaceField(field, newVal) {
    // Sayı veya string alan; key:"value" veya key:N
    var isStr = typeof newVal === 'string';
    var valStr = isStr ? '"' + newVal.replace(/"/g, '\\"') + '"' : String(newVal);
    var re = new RegExp('(\\b' + field + '\\s*:\\s*)("[^"]*"|[\\d.]+)', '');
    if (re.test(out)) {
      out = out.replace(re, '$1' + valStr);
      return true;
    }
    return false;
  }

  function addField(field, newVal, after) {
    // Var olan alanı gör, yoksa `after`tan sonra ekle
    var re = new RegExp('\\b' + field + '\\s*:');
    if (re.test(out)) return false;
    var isStr = typeof newVal === 'string';
    var valStr = isStr ? '"' + newVal.replace(/"/g, '\\"') + '"' : String(newVal);
    // `after` alanından sonra virgülle ekle
    var afterRe = new RegExp('(\\b' + after + '\\s*:\\s*("[^"]*"|[\\d.]+))', '');
    var am = afterRe.exec(out);
    if (am) {
      var insertPos = am.index + am[0].length;
      out = out.substring(0, insertPos) + ',' + field + ':' + valStr + out.substring(insertPos);
      return true;
    }
    return false;
  }

  if (updates.cal != null) replaceField('cal', updates.cal);
  if (updates.prot != null) replaceField('prot', updates.prot);
  if (updates.carb != null) replaceField('carb', updates.carb);
  if (updates.fat != null) replaceField('fat', updates.fat);
  if (updates.serv != null) replaceField('serv', updates.serv);
  if (updates.yieldServings != null) {
    if (!replaceField('yieldServings', updates.yieldServings)) {
      // Yoksa serv'den sonra ekle
      addField('yieldServings', updates.yieldServings, 'serv');
    }
  }
  return out;
}

// ═══ Çalıştır
var mode = process.argv[2] || '--dry';
var plans = buildPlan();
var stats = {
  skip: 0, addYieldOnly: 0, multiPortion: 0, manualReview: 0
};
var manualList = [];
var changesLog = [];

plans.forEach(function (p) {
  if (p.action === 'skip') stats.skip++;
  else if (p.action === 'add-yield-only') stats.addYieldOnly++;
  else if (p.action === 'multi-portion') stats.multiPortion++;
  else if (p.action === 'manual-review') {
    stats.manualReview++;
    manualList.push(p);
  }
});

console.log('═══ KALİBRASYON UYGULAMA PLANI ═══');
console.log('Toplam tarif:           ', DB.length);
console.log('Skip (dokunma):         ', stats.skip);
console.log('Add yield:1 only:       ', stats.addYieldOnly);
console.log('Multi-portion (yield+macro):', stats.multiPortion);
console.log('Manual review listesi:  ', stats.manualReview);
console.log('───────────────────────────────────');
console.log('Otomatik güncellenecek toplam:',
  stats.addYieldOnly + stats.multiPortion);

if (mode === '--write') {
  // ═══ Dosyaya yaz
  var src = fs.readFileSync(DB_FILE, 'utf8');
  var changed = 0, failed = 0;

  plans.forEach(function (p) {
    if (p.action === 'manual-review' || p.action === 'skip') return;
    var blk = findRecipeBlock(src, p.id);
    if (!blk) { failed++; console.error('  Block bulunamadı:', p.id); return; }

    var updates = {};
    if (p.action === 'add-yield-only') {
      updates.yieldServings = 1;
    } else {
      // multi-portion / refine-yield: yield + makrolar + serv metni
      updates.yieldServings = p.newYield;
      updates.cal = p.newPer.cal;
      updates.prot = p.newPer.prot;
      updates.carb = p.newPer.carb;
      updates.fat = p.newPer.fat;
      // serv metni: "1 porsiyon" → "N porsiyon" (eğer mevcut "1" ile başlıyor ama yield > 1)
      if (p.newYield > 1 && /^\s*1\s*(porsiyon|kase|tabak|adet|dilim)?\s*$/i.test(String(p.stored.serv))) {
        var unit = (String(p.stored.serv).match(/(porsiyon|kase|tabak|adet|dilim)/i) || [, 'porsiyon'])[1];
        updates.serv = p.newYield + ' ' + unit.toLowerCase();
      }
    }
    var newBlock = updateBlock(blk.text, updates);
    if (newBlock !== blk.text) {
      src = src.substring(0, blk.start) + newBlock + src.substring(blk.end);
      changed++;
      changesLog.push({
        id: p.id, name: p.name, action: p.action,
        before: { cal: p.stored.cal, prot: p.stored.prot, carb: p.stored.carb, fat: p.stored.fat, serv: p.stored.serv },
        after: updates
      });
    }
  });

  fs.writeFileSync(DB_FILE, src, 'utf8');
  console.log('\n✅ Yazıldı:', changed, 'tarif güncellendi,', failed, 'başarısız.');
} else {
  console.log('\n--- ÖRNEK 10 DEĞİŞİKLİK ÖNİZLEMESİ ---');
  plans.filter(function (p) {
    return p.action === 'multi-portion';
  }).slice(0, 10).forEach(function (p) {
    var s = p.stored, n = p.newPer;
    console.log('  ' + p.id.padEnd(28).slice(0,28) +
      ' kayıt:' + String(s.cal).padStart(4) + 'k' +
      ' →' + String(n.cal).padStart(4) + 'k' +
      ' (yield=' + p.newYield + ', ' + n.grams + 'g/porsiyon)' +
      ' [' + p.action + ']');
  });
  console.log('\n(Yazmak için: --write)');
}

// ═══ Manuel review markdown
if (manualList.length) {
  var md = '# Manuel İnceleme Listesi — Tarif Makroları\n\n';
  md += 'Bu tarifler otomatik kalibrasyon dışında kaldı. Sebep: düşük hammadde coverage veya stored makrolar uç değer.\n\n';
  md += 'Toplam: **' + manualList.length + '** tarif.\n\n';

  var byReason = {};
  manualList.forEach(function (p) {
    var key = p.reason.split(' ')[0];
    if (!byReason[key]) byReason[key] = [];
    byReason[key].push(p);
  });

  Object.keys(byReason).forEach(function (key) {
    md += '## ' + key + ' (' + byReason[key].length + ')\n\n';
    md += '| ID | Ad | Kategori | Coverage | Kayıt cal | Hesap total | Eksik malzeme |\n';
    md += '|---|---|---|---|---|---|---|\n';
    byReason[key].forEach(function (p) {
      md += '| `' + p.id + '` | ' + p.name + ' | ' + p.cat + ' | ' +
        Math.round(p.coverage * 100) + '% | ' + p.stored.cal + ' | ' +
        Math.round(p.calcTotal.cal) + ' | ' +
        (p.missing.slice(0, 4).join(', ') || '—') + ' |\n';
    });
    md += '\n';
  });

  fs.writeFileSync(path.join(__dirname, 'manual-review.md'), md, 'utf8');
  console.log('\n📋 Manuel review listesi: scripts/manual-review.md (' + manualList.length + ' tarif)');
}

if (mode === '--write') {
  fs.writeFileSync(
    path.join(__dirname, 'changes-applied.json'),
    JSON.stringify(changesLog, null, 2),
    'utf8'
  );
  console.log('📝 Değişim logu: scripts/changes-applied.json');
}
