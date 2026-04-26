// ╔══════════════════════════════════════════════════════════════════════╗
// ║  FitSofra — Tarif Makro Hesaplayıcı (Recipe Calculator)             ║
// ║  TURKISH_HAMMADDE_DB + tarif malzemeleri → otomatik makro           ║
// ║                                                                      ║
// ║  Akış:                                                               ║
// ║   1) Malzeme adını TURKISH_HAMMADDE_INDEX'te ara (fuzzy)            ║
// ║   2) Miktarı AmountParser ile parse et (value + unit)               ║
// ║   3) hammadde.units[unit] ile gram'a çevir                          ║
// ║   4) per100g makroyu gram ile çarp                                  ║
// ║   5) Tüm malzemeleri topla → porsiyon başına böl                    ║
// ║                                                                      ║
// ║  Bağımlılıklar: AmountParser, TURKISH_HAMMADDE_DB/INDEX             ║
// ╚══════════════════════════════════════════════════════════════════════╝
(function(){
  'use strict';

  // İsim normalleştirme (hammadde lookup için)
  // NFD + combining-mark sıyırma: JS'nin varsayılan toLowerCase() Türkçe `İ`yi
  // `i̇` (i + U+0307 combining dot above) yapar; bu da DB indeksinde `irmik`
  // yerine `i̇rmik` üretiyor. Bunu temizliyoruz.
  function _norm(s){
    if(!s) return '';
    var t=String(s);
    // Türkçe locale-aware lowercase (varsa) + NFD + combining mark strip
    try { t = t.toLocaleLowerCase('tr-TR'); } catch(e){ t = t.toLowerCase(); }
    if(t.normalize) t = t.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    return t
      .replace(/\([^)]*\)/g,' ')        // parantez içi notları at
      .replace(/[^a-zçğıöşü\s,]/gi,' ') // virgül kalsın (split için)
      .replace(/\s+/g,' ').trim();
  }

  // Türkçe stem: yaygın çekim eklerini sıyır (kaba; tam morfolojik değil)
  function _stem(s){
    var n=_norm(s);
    return n.replace(/(ları|leri|larım|lerim|larin|lerin|ların|nızı|nın|nin|nun|nün|sı|si|su|sü|ı|i|u|ü)$/,'').trim();
  }

  // Niteleyicileri sıyır: "sıcak su"→"su", "ince irmik"→"irmik"
  var QUALIFIERS=[
    'sicak','sıcak','ilik','ılık','soguk','soğuk',
    'taze','kuru','ince','kalin','kalın','iri','küçük','kucuk','büyük','buyuk','orta',
    'haslanmis','haşlanmış','pisirilmis','pişirilmiş','kizarmis','kızarmış',
    'rendelenmis','rendelenmiş','dogranmiş','doğranmış','kiyilmis','kıyılmış',
    'isteğe','isteğe bağlı','istege','istege bagli','tatlandirici','tatlandırıcı'
  ];
  function _stripQualifiers(s){
    var tokens=s.split(/\s+/).filter(function(t){
      return QUALIFIERS.indexOf(t)<0;
    });
    return tokens.join(' ').trim();
  }

  // Yaygın eşdeğerler — DB'de olmayan ama makro açısından yakın olanlar
  var ALIAS_MAP={
    // Ekmek/lavaş artık DB'de var; sadece varyant aliasları
    'tost ekmegi':'ekmek beyaz',
    'tost ekmeği':'ekmek beyaz',
    'ekmek ici':'ekmek beyaz',
    'ekmek içi':'ekmek beyaz',
    'bayat ekmek':'ekmek beyaz',
    'yarim ekmek':'ekmek beyaz',
    'yarım ekmek':'ekmek beyaz',
    'kumru ekmegi':'ekmek beyaz',
    'kumru ekmeği':'ekmek beyaz',
    'sandvic ekmegi':'ekmek beyaz',
    'sandviç ekmeği':'ekmek beyaz',
    'bazlama':'lavaş',
    'yufka':'lavaş',
    'spagetti':'makarna spagetti',
    'spaghetti':'makarna spagetti',
    'penne':'makarna boru',
    'fusilli':'makarna burgu',
    'quinoa':'kinoa',
    'kus uzumu':'kuru uzum',
    'kuş üzümü':'kuru uzum',
    'kusuzumu':'kuru uzum',
    'kuşüzümü':'kuru uzum',
    'parmesan':'kasar peyniri',
    'mozzarella':'kasar peyniri',
    'cheddar':'kasar peyniri',
    'sicak su':'su',
    'ilik su':'su',
    'soguk su':'su',
    'kaynamis su':'su',
    'maden suyu':'su',
    'limon suyu':'limon',
    // Default tariflerde "Un" = Buğday Unu (Beyaz); "Salça" = Domates Salçası
    'un':'buğday unu beyaz',
    'beyaz un':'buğday unu beyaz',
    'tam un':'tam buğday unu',
    'salca':'domates salçası',
    'salça':'domates salçası',
    'biber salcasi':'biber salçası tatlı',
    'biber salçası':'biber salçası tatlı',
    'nisasta':'mısır nişastası',
    'nişasta':'mısır nişastası',
    'protein tozu':'whey protein',
    'whey protein':'whey protein',
    'kizartma yagi':'aycicek yagi',
    'kızartma yağı':'ayçiçek yağı',
    'sivi yag':'aycicek yagi',
    'sıvı yağ':'ayçiçek yağı',
    'sebze suyu':'su',
    'tavuk suyu':'su',
    'et suyu':'su',
    'meyve':'elma',              // jenerik meyve → elma proxy
    'sebze':'kabak',             // jenerik sebze → kabak proxy
    'baharat':'',                // makrosu yok say
    'baharatlar':'',
    'buz':'',                    // 0 kalori
    // 'kekik' silindi — DB'de "Kekik (Kuru)" var
    // 'nane' silindi — DB'de "Nane (Taze)" + "Nane (Kuru)" var
    'roka':'maydanoz',
    'tere':'maydanoz',
    // Default eşlemeler (DB'de birden fazla varyant olduğunda)
    'yumurta':'tavuk yumurtası',
    'yumurtalar':'tavuk yumurtası',
    'beyaz peynir':'beyaz peynir tam yağlı',
    'peynir':'beyaz peynir tam yağlı',
    'kasar':'kaşar peyniri',
    'kaşar':'kaşar peyniri',
    'yogurt':'yoğurt klasik',
    'yoğurt':'yoğurt klasik',
    'sut':'süt tam yağlı',
    'süt':'süt tam yağlı',
    'krema':'sıvı krema',
    'pirinc':'pirinç osmancık',
    'pirinç':'pirinç osmancık',
    'bulgur':'bulgur (pilavlık)',
    'mercimek':'kırmızı mercimek',
    'kiyma':'dana kıyma orta',
    'kıyma':'dana kıyma orta',
    'dana eti':'dana kuşbaşı',
    'kuzu eti':'kuzu kuşbaşı',
    'tavuk':'tavuk göğüs',
    'tavuk eti':'tavuk göğüs',
    'tavuk gögsü':'tavuk göğüs',
    'tavuk göğsü':'tavuk göğüs',
    'arpa sehriye':'makarna şehriye',
    'arpa şehriye':'makarna şehriye',
    'sehriye':'makarna şehriye',
    'şehriye':'makarna şehriye',
    'bulgur (haslanmis)':'bulgur',
    'bulgur (haşlanmış)':'bulgur',
    'nohut (haslanmis)':'nohut',
    'nohut (haşlanmış)':'nohut',
    'kuru fasulye (haslanmis)':'kuru fasulye',
    'kuru fasulye (haşlanmış)':'kuru fasulye',
    'pirinc (haslanmis)':'pirinç',
    'pirinç (haşlanmış)':'pirinç',
    'humus':'nohut',
    'falafel':'nohut',
    'tofu':'tofu sert',
    'sert tofu':'tofu sert',
    'soft tofu':'tofu sert',
    // 'karışık yeşillik' artık DB'de
    'yesil salata':'karışık yeşillik',
    'yeşil salata':'karışık yeşillik',
    'yesil sogan':'taze sogan',
    'yeşil soğan':'taze soğan',
    'muesli':'granola',
    'müsli':'granola',
    'donmus yaban mersini':'yaban mersini',
    'donmuş yaban mersini':'yaban mersini',
    // 'yaban mersini' artık DB'de
    'ton baligi (suda)':'ton baligi konserve suda',
    'ton balığı (suda)':'ton balığı konserve suda'
  };
  // Alias değerlerini de _norm ile aynı seviyeye getir
  // (DB indeksi ASCII-normalize'ın aynısını üretiyor)
  function _resolveAlias(key){
    if(ALIAS_MAP[key]!=null){
      var v=ALIAS_MAP[key];
      return v ? _norm(v) : '';
    }
    return key;
  }

  // Genel "adet → gram" fallback'leri (hammadde'da o birim yoksa)
  // Sadece güvenli, yaygın ortalamalar
  var GENERIC_UNIT_FALLBACK={
    'yk':15,           // yemek kaşığı (sıvı/toz orta)
    'tk':10,           // tatlı kaşığı
    'çk':5,            // çay kaşığı
    'bardak':200,      // su bardağı
    'çay bardağı':100,
    'çimdik':1,
    'avuç':30,
    'demet':50,
    'diş':4,           // diş sarımsak gibi
    'dilim':20,
    'paket':250,
    'porsiyon':150,
    'kase':250,
    'adet':100         // çok jenerik son çare
  };

  // ═══ Yerel İndeks (NFD-temiz) ═══════════════════════════════════════
  // hammadde-db'nin TURKISH_HAMMADDE_INDEX'i Türkçe `İ`yi combining-dot ile
  // indeksliyor — biz NFD-temizlenmiş kendi indeksimizi kuruyoruz.
  var _localIdx=null;
  // Parantezleri iç içeriğiyle birlikte normalize eden ek anahtar üretici
  function _normWithParens(s){
    if(!s) return '';
    var t=String(s);
    try{t=t.toLocaleLowerCase('tr-TR');}catch(e){t=t.toLowerCase();}
    if(t.normalize)t=t.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    return t
      .replace(/[(),]/g,' ')              // parantezleri at, içeriği koru
      .replace(/[^a-zçğıöşü\s]/gi,' ')
      .replace(/\s+/g,' ').trim();
  }
  function _buildLocalIndex(){
    var arr=window.TURKISH_HAMMADDE_DB||[];
    var idx={};
    // 1) Primary key (paren-stripped)
    for(var i=0;i<arr.length;i++){
      var key=_norm(arr[i].name);
      if(key && !idx[key]) idx[key]=arr[i];
    }
    // 2) Alt key (paren-içeriği dahil) — collision yoksa kaydet
    //    "Makarna (Şehriye)" → "makarna sehriye"; "Tavuk Göğsü (Bonfile)" → "tavuk gogus bonfile"
    for(var j=0;j<arr.length;j++){
      var altKey=_normWithParens(arr[j].name);
      if(altKey && !idx[altKey]) idx[altKey]=arr[j];
    }
    return idx;
  }
  function _idx(){
    if(!_localIdx) _localIdx=_buildLocalIndex();
    return _localIdx;
  }

  // ═══ Hammadde Lookup ════════════════════════════════════════════════
  // Sentetik sıfır-makro entry: alias değeri '' olan öğeler için
  // (buz, baharat, kekik vs. olduğunda matched=true ama 0g hesaplanır)
  var ZERO_MACRO_HAMMADDE = {
    name: '(zero-macro alias)',
    per100g: { cal: 0, prot: 0, carb: 0, fat: 0 },
    units: { g: 1, kg: 1000, ml: 1, l: 1000, adet: 1, küp: 10, tutam: 1, çimdik: 1 },
    _synthetic: true
  };
  function _lookupSingle(rawKey){
    var idx=_idx();
    var key=rawKey;
    if(!key) return null;

    // Niteleyicileri temizle ve alias çözümle
    key=_stripQualifiers(key);
    var resolved=_resolveAlias(key);
    if(resolved==='') return ZERO_MACRO_HAMMADDE;  // explicit zero
    key=resolved;
    if(!key) return null;
    if(idx[key]) return idx[key];

    var keys=Object.keys(idx);
    // Anahtarın bir parçası: "kıyma" → "dana kıyma"
    for(var i=0;i<keys.length;i++){
      if(keys[i]===key) return idx[keys[i]];
    }
    // Word-boundary substring (yarım eşleşmeleri önle: "su" ↛ "gogsu")
    function _wordContains(haystack, needle){
      if(!needle || needle.length<3) return false;
      // \b ASCII-only; biz manuel: başta/sonda veya boşluk komşuluğu
      var idx=haystack.indexOf(needle);
      while(idx>=0){
        var before=idx===0 || haystack[idx-1]===' ';
        var after=(idx+needle.length===haystack.length) || haystack[idx+needle.length]===' ';
        if(before && after) return true;
        idx=haystack.indexOf(needle, idx+1);
      }
      return false;
    }
    // 1) DB key tamamen input içinde geçiyor (multi-word DB key, kısa input)
    //    Örn: input "tavuk gogsu bonfile" → DB key "tavuk gogus" ✗ değil ama bunu stem yakalar
    // 2) Input tamamen DB key içinde (input kısa, DB key uzun): "kıyma" → "dana kiyma"
    for(var j=0;j<keys.length;j++){
      if(_wordContains(keys[j], key)) return idx[keys[j]];
    }
    // 3) DB key tamamen input içinde — sadece DB key ≥4 karakter ise (kısa kelime kirlenmesi önle)
    for(var jj=0;jj<keys.length;jj++){
      if(keys[jj].length>=4 && _wordContains(key, keys[jj])) return idx[keys[jj]];
    }

    // Stem
    var stem=_stem(key);
    if(stem && stem!==key && stem.length>=3){
      if(idx[stem]) return idx[stem];
      for(var s=0;s<keys.length;s++){
        if(_wordContains(keys[s], stem)) return idx[keys[s]];
      }
    }

    // Token bazlı (whole-word)
    var tokens=key.split(/\s+/).filter(function(t){return t.length>=3;});
    for(var t=0;t<tokens.length;t++){
      var tok=tokens[t];
      for(var k=0;k<keys.length;k++){
        if(keys[k].split(/\s+/).indexOf(tok)>=0) return idx[keys[k]];
      }
      // Stemli token — "gogsu" → "gogus" gibi yakın varyantları yakalamak için son çare
      var tokStem=tok.replace(/(su|sü|si|sı|i|ü|u|ı)$/,'');
      if(tokStem && tokStem.length>=3 && tokStem!==tok){
        for(var kk=0;kk<keys.length;kk++){
          var keyParts=keys[kk].split(/\s+/);
          for(var kp=0;kp<keyParts.length;kp++){
            if(keyParts[kp].indexOf(tokStem)===0) return idx[keys[kk]];
          }
        }
      }
    }
    return null;
  }

  function lookup(name){
    if(!name) return null;
    var key=_norm(name);
    if(!key) return null;

    // Tek deneme
    var hit=_lookupSingle(key);
    if(hit) return hit;

    // Virgülle birleşik malzeme: "Tuz, karabiber" → ilk eşleşeni döndür
    if(key.indexOf(',')>=0){
      var parts=key.split(',').map(function(p){return p.trim();}).filter(Boolean);
      for(var i=0;i<parts.length;i++){
        var h=_lookupSingle(parts[i]);
        if(h) return h;
      }
    }
    return null;
  }

  // ═══ Miktar → Gram ══════════════════════════════════════════════════
  /**
   * Bir malzeme miktarını grama çevirir.
   * @param {string} amountStr - "150g", "2 adet", "1 yk" vs.
   * @param {object} hammadde - TURKISH_HAMMADDE_DB öğesi
   * @returns {{grams:number, source:'unit'|'fallback'|'weight', unit:string}|null}
   */
  function toGrams(amountStr, hammadde){
    if(!window.AmountParser) return null;
    var p=window.AmountParser.parseOne(amountStr);
    if(!p) return null;

    // Direkt ağırlık birimi
    if(p.unit==='g') return {grams:p.value, source:'weight', unit:'g'};
    if(p.unit==='kg') return {grams:p.value*1000, source:'weight', unit:'kg'};

    // Sıvı: ml/l (su yoğunluğunda kabul; yağ vs. için hammadde.units öncelikli)
    var units=(hammadde&&hammadde.units)||{};
    if(units[p.unit]!=null){
      return {grams:p.value*units[p.unit], source:'unit', unit:p.unit};
    }
    // ml/l fallback (su yoğunluğu)
    if(p.unit==='ml') return {grams:p.value, source:'fallback', unit:'ml'};
    if(p.unit==='l')  return {grams:p.value*1000, source:'fallback', unit:'l'};

    // Generic fallback (adet, yk, bardak vs.)
    if(GENERIC_UNIT_FALLBACK[p.unit]!=null){
      return {grams:p.value*GENERIC_UNIT_FALLBACK[p.unit], source:'fallback', unit:p.unit};
    }
    return null;
  }

  // ═══ Tek Malzeme Hesabı ═════════════════════════════════════════════
  /**
   * @param {{item:string, amount:string}} ing
   * @returns {{matched:bool, grams:number, macro:{cal,prot,carb,fat}, hammadde:object|null, reason:string}}
   */
  function calcIngredient(ing){
    var name=ing&&(ing.item||ing.name);
    var amount=ing&&ing.amount;
    var hm=lookup(name);
    if(!hm){
      return {matched:false, grams:0, macro:{cal:0,prot:0,carb:0,fat:0}, hammadde:null, reason:'no-hammadde'};
    }
    // Miktar boş → "tadına göre" varsayımı: matched ama 0g (genelde tuz/baharat).
    // Yağ/un gibi yüksek-kalorili maddeler için breakdown.note ile uyarı kalır.
    if(amount==null || !String(amount).trim()){
      return {
        matched:true, grams:0,
        macro:{cal:0,prot:0,carb:0,fat:0},
        hammadde:hm, reason:'no-amount-assumed-pinch'
      };
    }
    // "isteğe bağlı / servis için / eritme için / süsleme için" gibi
    // miktarsız açıklamalar → 0g, matched (coverage'ı düşürmesin)
    var amtLow=String(amount).toLocaleLowerCase('tr-TR');
    var OPTIONAL_PHRASES=['istege','isteğe','servis','süsleme','susleme',
      'eritme','tatmak','tat ','tadına','tadina','gerektiği','gerektigi',
      'tadımlık','tadimlik','az miktar'];
    for(var op=0;op<OPTIONAL_PHRASES.length;op++){
      if(amtLow.indexOf(OPTIONAL_PHRASES[op])>=0){
        return {
          matched:true, grams:0,
          macro:{cal:0,prot:0,carb:0,fat:0},
          hammadde:hm, reason:'optional-skipped'
        };
      }
    }
    var g=toGrams(amount, hm);
    if(!g){
      return {matched:false, grams:0, macro:{cal:0,prot:0,carb:0,fat:0}, hammadde:hm, reason:'unparseable-amount'};
    }
    var per=hm.per100g||{cal:0,prot:0,carb:0,fat:0};
    var f=g.grams/100;
    return {
      matched:true,
      grams:g.grams,
      macro:{
        cal:per.cal*f,
        prot:(per.prot||0)*f,
        carb:(per.carb||0)*f,
        fat:(per.fat||0)*f
      },
      hammadde:hm,
      conversion:g,
      reason:'ok'
    };
  }

  // ═══ Porsiyon Sayısı ────────────────────────────────────────────────
  function _parseServings(serv){
    if(!serv) return 1;
    if(typeof serv==='number') return serv;
    var m=String(serv).match(/(\d+(?:[.,]\d+)?)/);
    if(!m) return 1;
    var n=parseFloat(m[1].replace(',','.'));
    return n>0 ? n : 1;
  }

  // ═══ Tarif Toplamı ──────────────────────────────────────────────────
  /**
   * @param {object} recipe
   * @returns {{
   *   total:{cal,prot,carb,fat,grams},
   *   perServing:{cal,prot,carb,fat,grams},
   *   servings:number,
   *   coverage:{matched, total, missing:Array<{name,reason}>},
   *   breakdown:Array
   * }}
   */
  function calcRecipe(recipe){
    var ings=(recipe&&recipe.ingredients)||[];
    var total={cal:0,prot:0,carb:0,fat:0,grams:0};
    var matched=0;
    var missing=[];
    var breakdown=[];

    ings.forEach(function(ing){
      var c=calcIngredient(ing);
      breakdown.push({
        item:ing.item||ing.name,
        amount:ing.amount,
        matched:c.matched,
        grams:c.grams,
        macro:c.macro,
        hammadde:c.hammadde?c.hammadde.name:null,
        reason:c.reason
      });
      if(c.matched){
        matched++;
        total.cal+=c.macro.cal;
        total.prot+=c.macro.prot;
        total.carb+=c.macro.carb;
        total.fat+=c.macro.fat;
        total.grams+=c.grams;
      } else {
        missing.push({name:ing.item||ing.name, reason:c.reason});
      }
    });

    var servings=_parseServings(recipe&&recipe.serv);
    var per={
      cal:total.cal/servings,
      prot:total.prot/servings,
      carb:total.carb/servings,
      fat:total.fat/servings,
      grams:total.grams/servings
    };

    return {
      total:_round(total),
      perServing:_round(per),
      servings:servings,
      coverage:{
        matched:matched,
        total:ings.length,
        missing:missing,
        ratio:ings.length?matched/ings.length:0
      },
      breakdown:breakdown
    };
  }

  function _round(o){
    return {
      cal:Math.round(o.cal),
      prot:Math.round((o.prot||0)*10)/10,
      carb:Math.round((o.carb||0)*10)/10,
      fat:Math.round((o.fat||0)*10)/10,
      grams:Math.round(o.grams||0)
    };
  }

  // ═══ Karşılaştırma & Toplu Doğrulama ────────────────────────────────
  /**
   * Tariften okunan elle yazılmış makrolarla, hesaplananı karşılaştır.
   * @returns {{cal:{stored,calc,diff,pct}, prot:..., carb:..., fat:...}}
   */
  function compareToStored(recipe){
    var calc=calcRecipe(recipe).perServing;
    function pair(stored, c){
      var s=stored||0;
      var d=c-s;
      var pct=s? Math.round((d/s)*100):null;
      return {stored:s, calc:c, diff:Math.round(d*10)/10, pct:pct};
    }
    return {
      cal:pair(recipe.cal, calc.cal),
      prot:pair(recipe.prot, calc.prot),
      carb:pair(recipe.carb, calc.carb),
      fat:pair(recipe.fat, calc.fat),
      coverage:calcRecipe(recipe).coverage
    };
  }

  /**
   * Tüm DB üzerinde toplu rapor — tarif kalitesini denetlemek için.
   */
  function auditAll(){
    var arr=window.TURKISH_RECIPES_DB||[];
    var rows=[];
    var sumCov=0, full=0, partial=0, none=0;
    arr.forEach(function(r){
      var res=calcRecipe(r);
      sumCov+=res.coverage.ratio;
      if(res.coverage.ratio===1) full++;
      else if(res.coverage.ratio>0) partial++;
      else none++;
      rows.push({
        id:r.id, name:r.name, cat:r.cat,
        stored:{cal:r.cal,prot:r.prot,carb:r.carb,fat:r.fat},
        calc:res.perServing,
        coverage:res.coverage.ratio,
        missing:res.coverage.missing.length
      });
    });
    return {
      total:arr.length,
      avgCoverage:arr.length?sumCov/arr.length:0,
      fullCoverage:full, partialCoverage:partial, noCoverage:none,
      rows:rows
    };
  }

  window.RecipeCalculator={
    lookup:lookup,
    toGrams:toGrams,
    calcIngredient:calcIngredient,
    calcRecipe:calcRecipe,
    compareToStored:compareToStored,
    auditAll:auditAll
  };

  if(typeof console!=='undefined'&&console.log){
    console.log('✅ RecipeCalculator yüklendi (TURKISH_HAMMADDE_DB tabanlı)');
  }
})();
