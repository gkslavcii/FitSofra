// ╔══════════════════════════════════════════════════════════════════════╗
// ║  FitSofra — Günlük Mikro Besin Toplayıcı (Daily Micro Tracker)     ║
// ║                                                                      ║
// ║  Bir günün öğünlerinde yenilen yiyeceklerden mikro besin             ║
// ║  toplamını çıkarır. Her food entry için 3 kanal denenir:            ║
// ║    1) Tarif eşleşmesi  → calcRecipe.microPerServing × (cal-oran)    ║
// ║    2) Hammadde eşleşmesi → micro × (portionUsed/100 veya cal-oran)   ║
// ║    3) Food-DB hammadde → name normalize → HAMMADDE_INDEX             ║
// ║  Çözülemeyenler "unmatched" sayısına katılır (kapsama %)             ║
// ╚══════════════════════════════════════════════════════════════════════╝
(function(){
  'use strict';

  var MICRO_KEYS=['fiber','sodium','ca','fe','k','mg','vitC','vitA','b12','folat'];

  // Yetişkin DV referansı (TÜBER 2022 + USDA DV) — food-search.js MICRO_DV ile aynı
  var DV={fiber:28, sodium:2300, ca:1000, fe:13, k:3500, mg:400, vitC:90, vitA:900, b12:2.4, folat:400};

  // Mikro besin display tanımları (food-search.js MICRO_DV ile uyumlu)
  var MICRO_DEF={
    fiber:{label:'Lif',unit:'g',icon:'🌾',color:'#a7e8a4'},
    sodium:{label:'Sodyum',unit:'mg',icon:'🧂',color:'#ffcc55',warnHigh:true},
    ca:{label:'Kalsiyum',unit:'mg',icon:'🦴',color:'#22d3ee'},
    fe:{label:'Demir',unit:'mg',icon:'🩸',color:'#ff7a7a'},
    k:{label:'Potasyum',unit:'mg',icon:'🍌',color:'#ffd166'},
    mg:{label:'Magnezyum',unit:'mg',icon:'🌿',color:'#7ee787'},
    vitC:{label:'C Vit.',unit:'mg',icon:'🍊',color:'#ff6b3d'},
    vitA:{label:'A Vit.',unit:'µg',icon:'🥕',color:'#f0a030'},
    b12:{label:'B12',unit:'µg',icon:'🥚',color:'#c084fc'},
    folat:{label:'Folat',unit:'µg',icon:'🥬',color:'#3dd68c'}
  };

  function _emptyMicro(){ var o={}; MICRO_KEYS.forEach(function(k){o[k]=0;}); return o; }

  function _norm(s){
    if(!s) return '';
    return String(s).toLowerCase()
      .replace(/\([^)]*\)/g,' ')
      .replace(/[^a-zçğıöşü\s]/gi,' ')
      .replace(/\s+/g,' ').trim();
  }

  // İsimden sonra eklenmiş porsiyon notlarını da kapsa: "Pirinç (çiğ, 100g)" → "pirinç çiğ"
  function _normPlus(s){
    var n=_norm(s);
    // Tek başına bırakılan "çiğ" gibi sözcükleri koru — sadece boşlukla normalize edildi
    return n;
  }

  // calcRecipe sonuçlarını isim bazlı cache'le (ağır işlem)
  var _recipeCache={};
  function _findRecipe(name){
    var key=_norm(name);
    if(_recipeCache[key]!==undefined) return _recipeCache[key];
    var pools=(window.TURKISH_RECIPES_DB||[])
      .concat(window.RECIPES||[])
      .concat(window.COMMUNITY_RECIPES||[]);
    var found=null;
    for(var i=0;i<pools.length;i++){
      if(pools[i] && pools[i].name && _norm(pools[i].name)===key && pools[i].ingredients){
        found=pools[i]; break;
      }
    }
    if(!found){ _recipeCache[key]=null; return null; }
    if(!window.RecipeCalculator){ _recipeCache[key]=null; return null; }
    try{
      var calc=window.RecipeCalculator.calcRecipe(found);
      _recipeCache[key]={recipe:found, calc:calc};
      return _recipeCache[key];
    }catch(e){ _recipeCache[key]=null; return null; }
  }

  // Yaygın yemek/food-DB isimleri → hammadde anahtarı eşleştirmeleri
  var _ALIAS={
    'yumurta':'tavuk yumurtası',
    'haşlanmış yumurta':'tavuk yumurtası',
    'omlet':'tavuk yumurtası',
    'tavuk göğsü':'tavuk göğüs',
    'tavuk göğüs eti':'tavuk göğüs',
    'tavuk göğsü çiğ':'tavuk göğüs',
    'tavuk but eti':'tavuk but',
    'kıyma':'dana kıyma',
    'dana kıyma çiğ':'dana kıyma',
    'kuzu eti':'kuzu kuşbaşı',
    'biftek':'dana antrikot',
    'somon balığı':'somon',
    'levrek balığı':'levrek',
    'çipura balığı':'çipura',
    'hamsi balığı':'hamsi',
    'salatalık':'salatalik',
    'kabak':'kabak (sakız)',
    'patlıcan':'patlıcan',
    'soğan':'soğan',
    'kuru soğan':'soğan',
    'sarımsak':'sarımsak',
    'yeşil biber':'biber (yeşil sivri)',
    'kırmızı biber':'biber (kırmızı dolmalık)',
    'çarliston biber':'biber (yeşil sivri)',
    'pirinç':'pirinç (osmancık)',
    'pirinç çiğ':'pirinç (osmancık)',
    'bulgur':'bulgur (pilavlık)',
    'bulgur çiğ':'bulgur (pilavlık)',
    'mercimek':'kırmızı mercimek',
    'kırmızı mercimek çiğ':'kırmızı mercimek',
    'yeşil mercimek çiğ':'yeşil mercimek',
    'nohut çiğ':'nohut',
    'kuru fasulye çiğ':'kuru fasulye',
    'makarna':'makarna (kuru)',
    'makarna çiğ':'makarna (kuru)',
    'yulaf':'yulaf ezmesi',
    'yulaf ezmesi':'yulaf ezmesi',
    'tereyağı':'tereyağı',
    'zeytinyağı':'zeytinyağı',
    'beyaz peynir':'beyaz peynir',
    'kaşar':'kaşar peyniri',
    'kaşar peyniri':'kaşar peyniri',
    'lor peyniri':'lor peyniri',
    'süt':'süt (inek tam yağlı)',
    'inek sütü':'süt (inek tam yağlı)',
    'yoğurt':'yoğurt (tam yağlı)',
    'yarım yağlı yoğurt':'yoğurt (yarım yağlı)',
    'ayran':'ayran',
    'tahin':'tahin',
    'pekmez':'pekmez (üzüm)',
    'bal':'bal',
    'reçel':'kayısı reçeli',
    'ekmek':'ekmek (beyaz)',
    'tam buğday ekmeği':'ekmek (tam buğday)',
    'kepekli ekmek':'ekmek (kepekli)',
    'roka':'roka',
    'maydanoz':'maydanoz',
    'dereotu':'dereotu',
    'nane':'nane (taze)',
    'kuru nane':'nane (kuru)',
    'salça':'domates salçası',
    'domates salçası':'domates salçası',
    'biber salçası':'biber salçası'
  };

  function _findHammadde(name){
    var idx=window.TURKISH_HAMMADDE_INDEX; if(!idx) return null;
    var key=_norm(name);
    if(!key) return null;
    // 1) Direkt
    if(idx[key]) return idx[key];
    // 2) Alias tablosu
    if(_ALIAS[key] && idx[_ALIAS[key]]) return idx[_ALIAS[key]];
    // 3) Substring: hammadde keys içinde geçiyor mu / tersi
    var keys=Object.keys(idx);
    // Önce: hammadde key'i food adıyla başlıyor (en kuvvetli)
    for(var i=0;i<keys.length;i++){
      if(keys[i].indexOf(key)===0) return idx[keys[i]];
    }
    // Sonra: food adı, hammadde key'iyle başlıyor
    for(var j=0;j<keys.length;j++){
      if(key.indexOf(keys[j])===0) return idx[keys[j]];
    }
    // Son: herhangi bir kelime eşleşmesi (ilk kelime)
    var first=key.split(' ')[0];
    if(first && first.length>3){
      for(var k2=0;k2<keys.length;k2++){
        if(keys[k2].indexOf(first)>=0) return idx[keys[k2]];
      }
    }
    return null;
  }

  /**
   * Tek bir öğün entry'sini mikro besin değerlerine çevirir.
   * @param {object} food - {name, cal, portionUsed?, ...}
   * @returns {{micro:object|null, source:'recipe'|'hammadde'|null, scale:number}}
   */
  function foodMicro(food){
    if(!food||!food.name) return {micro:null, source:null, scale:0};

    // 1) Tarif eşleşmesi
    var rec=_findRecipe(food.name);
    if(rec && rec.calc && rec.calc.microPerServing && rec.calc.microCoverage && rec.calc.microCoverage.matched>0){
      var perCal=(rec.calc.perServing&&rec.calc.perServing.cal)||0;
      var scale=1;
      if(perCal>0 && food.cal!=null){
        scale=food.cal/perCal;
        // Çok aşırı sapmaları engelle: 0.05–10 aralığı
        if(!isFinite(scale) || scale<=0) scale=1;
        if(scale>10) scale=10;
      }
      var m={};
      MICRO_KEYS.forEach(function(k){ m[k]=(rec.calc.microPerServing[k]||0)*scale; });
      return {micro:m, source:'recipe', scale:scale};
    }

    // 2) Hammadde eşleşmesi (HAMMADDE_INDEX)
    var hm=_findHammadde(food.name);
    if(hm && hm.micro){
      // Önce portionUsed bazlı (en doğru), yoksa cal-oran fallback
      var grams=null;
      if(food.portionUsed && isFinite(food.portionUsed) && food.portionUsed>0){
        grams=food.portionUsed;
      } else if(food.cal!=null && hm.per100g && hm.per100g.cal>0){
        grams=(food.cal/hm.per100g.cal)*100;
      } else {
        grams=100; // fallback
      }
      var f=grams/100;
      var m2={};
      MICRO_KEYS.forEach(function(k){ m2[k]=(hm.micro[k]||0)*f; });
      return {micro:m2, source:'hammadde', scale:f};
    }

    // 3) Çözülemedi
    return {micro:null, source:null, scale:0};
  }

  /**
   * Bir günün tüm öğünlerini toplar.
   * @param {object} dayData - {meal_id: [foods...], ...}
   * @returns {{micro:object, coverage:{matched,total,ratio}, byMeal:object}}
   */
  function aggregate(dayData){
    var total=_emptyMicro();
    var matched=0, count=0;
    var byMeal={};

    Object.keys(dayData||{}).forEach(function(mealId){
      var foods=dayData[mealId]||[];
      var mealMicro=_emptyMicro();
      var mealMatched=0;
      foods.forEach(function(f){
        if(!f) return;
        count++;
        var r=foodMicro(f);
        if(r.micro){
          matched++; mealMatched++;
          MICRO_KEYS.forEach(function(k){
            total[k]+=r.micro[k]||0;
            mealMicro[k]+=r.micro[k]||0;
          });
        }
      });
      byMeal[mealId]={micro:mealMicro, matched:mealMatched, total:foods.length};
    });

    return {
      micro:_roundMicro(total),
      coverage:{matched:matched, total:count, ratio:count?matched/count:0},
      byMeal:byMeal
    };
  }

  function _roundMicro(o){
    return {
      fiber:Math.round((o.fiber||0)*10)/10,
      sodium:Math.round(o.sodium||0),
      ca:Math.round(o.ca||0),
      fe:Math.round((o.fe||0)*10)/10,
      k:Math.round(o.k||0),
      mg:Math.round(o.mg||0),
      vitC:Math.round((o.vitC||0)*10)/10,
      vitA:Math.round(o.vitA||0),
      b12:Math.round((o.b12||0)*100)/100,
      folat:Math.round(o.folat||0)
    };
  }

  /**
   * Günlük mikro panel HTML'i üretir (collapsible details).
   * @param {object} agg - aggregate() çıktısı
   * @returns {string} HTML
   */
  function renderPanel(agg){
    if(!agg) return '';
    var m=agg.micro;
    var cov=agg.coverage;
    if(!cov || cov.total===0) return '';
    if(cov.matched===0){
      return '<div class="daily-micro-empty" style="margin:10px 12px;padding:10px 12px;background:var(--glass);border:1px solid var(--border);border-radius:10px;font-size:.7rem;color:var(--text2);text-align:center">'
        +'🧪 Mikro besin verisi için tarif/hammadde eşleşmesi gerekiyor.'
        +'</div>';
    }
    var covPct=Math.round(cov.ratio*100);

    var rows=Object.keys(MICRO_DEF).map(function(k){
      var def=MICRO_DEF[k];
      var dv=DV[k]||1;
      var val=m[k]||0;
      var dvPct=Math.round((val/dv)*100);
      var barColor=def.color;
      if(def.warnHigh){
        if(dvPct>=100) barColor='#ff5c5c';
        else if(dvPct>=75) barColor='#f0a030';
      }
      var barW=Math.min(100,dvPct);
      var displayVal=val<10?val.toFixed(1):Math.round(val);
      var pctTone=def.warnHigh?(dvPct>=100?'#ff5c5c':dvPct>=75?'#f0a030':'var(--text2)')
                              :(dvPct>=100?'#3dd68c':dvPct>=50?'var(--text)':'var(--text2)');
      return '<div style="display:flex;align-items:center;gap:6px;padding:5px 0;font-size:.7rem">'
        +'<div style="width:90px;display:flex;align-items:center;gap:5px;color:var(--text2);font-weight:600">'
        +'<span style="font-size:.85rem">'+def.icon+'</span>'+def.label
        +'</div>'
        +'<div style="flex:1;display:flex;align-items:center;gap:6px;min-width:0">'
        +'<div style="flex:1;height:6px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden">'
        +'<div style="height:100%;width:'+barW+'%;background:'+barColor+';transition:width .3s"></div>'
        +'</div>'
        +'<div style="font-weight:700;color:var(--text);min-width:74px;text-align:right;font-size:.66rem">'
        +displayVal+def.unit+' <span style="color:'+pctTone+'">·'+dvPct+'%</span>'
        +'</div>'
        +'</div>'
        +'</div>';
    }).join('');

    var covWarn=covPct<100
      ? '<div style="font-size:.6rem;color:var(--text2);margin-top:6px;padding:5px 8px;background:rgba(240,160,48,.08);border-left:2px solid #f0a030;border-radius:4px">⚠️ Günün yiyeceklerinin %'+covPct+'\'i için mikro besin verisi mevcut. Geri kalan değerler tahminîdir.</div>'
      : '<div style="font-size:.6rem;color:var(--green);margin-top:6px;padding:5px 8px;background:rgba(61,214,140,.08);border-left:2px solid var(--green);border-radius:4px">✓ Tüm öğeler için mikro besin verisi mevcut.</div>';

    var savedOpen=false;
    try{ savedOpen=(typeof sessionStorage!=='undefined') && sessionStorage.getItem('fs_daily_micro_open')==='1'; }catch(e){}

    return '<details id="dailyMicroDetails" '+(savedOpen?'open':'')+' style="margin:10px 12px;background:var(--glass);border:1px solid var(--border);border-radius:10px;padding:8px 12px" ontoggle="try{sessionStorage.setItem(\'fs_daily_micro_open\',this.open?\'1\':\'0\')}catch(e){}">'
      +'<summary style="cursor:pointer;font-size:.78rem;font-weight:700;color:var(--text);display:flex;align-items:center;justify-content:space-between;list-style:none">'
      +'<span>🧪 Bugünün Mikro Besinleri <span style="opacity:.55;font-weight:500;font-size:.68rem">(günlük · %DV)</span></span>'
      +'<span style="font-size:.7rem;opacity:.6">▾</span>'
      +'</summary>'
      +'<div style="margin-top:8px">'
      +rows
      +covWarn
      +'</div>'
      +'</details>';
  }

  /**
   * Mevcut günün verisini alıp panel HTML'ini döndüren kısayol.
   * meal-manager.js içindeki getDayData()'ya bağlı.
   */
  function renderForToday(){
    if(typeof window.getDayData!=='function') return '';
    try{
      var data=window.getDayData();
      var agg=aggregate(data);
      return renderPanel(agg);
    }catch(e){ return ''; }
  }

  window.DailyMicro={
    foodMicro:foodMicro,
    aggregate:aggregate,
    renderPanel:renderPanel,
    renderForToday:renderForToday,
    MICRO_KEYS:MICRO_KEYS,
    DV:DV,
    MICRO_DEF:MICRO_DEF
  };
})();
