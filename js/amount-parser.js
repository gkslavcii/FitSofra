// ╔══════════════════════════════════════════════════════════════════════╗
// ║  FitSofra — Miktar Parser & Toplayıcı                              ║
// ║  "2 adet" + "3 adet" = "5 adet"                                     ║
// ║  "1 yk" + "100g" = "1 yk + 100g" (birim çevirme YOK)                ║
// ╚══════════════════════════════════════════════════════════════════════╝
(function(){
  'use strict';

  // Birim takma adları → kanonik forma
  var UNIT_MAP={
    // Ağırlık
    'g':'g','gr':'g','gram':'g','gram':'g',
    'kg':'kg','kilo':'kg','kilogram':'kg',
    // Hacim
    'ml':'ml','mililitre':'ml',
    'l':'l','lt':'l','litre':'l',
    // Kaşık / bardak
    'yk':'yk','yemek kaşığı':'yk','yemek kasigi':'yk','yemek kasıgı':'yk','ykaşığı':'yk',
    'çk':'çk','ck':'çk','çay kaşığı':'çk','cay kasigi':'çk','çay kasigi':'çk',
    'tk':'tk','tatlı kaşığı':'tk','tatli kasigi':'tk','tatlı kasıgı':'tk',
    'su bardağı':'bardak','su bardagi':'bardak','su bardaği':'bardak','bardak':'bardak',
    'çay bardağı':'çay bardağı','çay bardagi':'çay bardağı','cay bardagi':'çay bardağı',
    // Sayım
    'adet':'adet','tane':'adet','parça':'adet','parca':'adet',
    'diş':'diş','dis':'diş',
    'demet':'demet','bağ':'demet','bag':'demet',
    'dilim':'dilim',
    'avuç':'avuç','avuc':'avuç',
    'paket':'paket',
    'şişe':'şişe','sise':'şişe',
    'kutu':'kutu',
    'kase':'kase',
    'çimdik':'çimdik','cimdik':'çimdik','tutam':'çimdik',
    'dal':'çimdik','yaprak':'çimdik',           // 1 dal/yaprak ≈ az miktar
    'ölçek':'çk','olcek':'çk','küp':'adet','kup':'adet',
    'kupa':'bardak','kupası':'bardak','kupasi':'bardak',
    'göbek':'adet','gobek':'adet','baş':'adet','bas':'adet',
    'boy':'adet','iri':'adet','salkim':'demet','salkım':'demet'
  };

  // "yarım", "çeyrek" gibi sayısal niceleyiciler
  var WORD_NUMERALS={
    'yarım':0.5,'yarim':0.5,'yari':0.5,'yarı':0.5,
    'çeyrek':0.25,'ceyrek':0.25,
    'birkaç':2,'birkac':2,'biraz':1,'bir':1,'iki':2,'üç':3,'uc':3,'dört':4,'dort':4,'beş':5,'bes':5
  };

  // Miktar yerine "isteğe bağlı / servis için" gibi açıklamalar — 0 say
  var ZERO_AMOUNT_PHRASES=[
    'istege','isteğe','tadına','tadina','tadımlık','tadimlik',
    'servis','süsleme','susleme','eritme','tatmak','tat',
    'gerektiği','gerektigi','az miktar','az','küçük miktar'
  ];

  // Birim görüntüleme ismi (tek → çok fark yok Türkçe'de, ama süslesek)
  var UNIT_DISPLAY={
    'g':'g','kg':'kg','ml':'ml','l':'L',
    'yk':'yk','çk':'çk','tk':'tk',
    'bardak':'su bardağı','çay bardağı':'çay bardağı',
    'adet':'adet','diş':'diş','demet':'demet','dilim':'dilim',
    'avuç':'avuç','paket':'paket','şişe':'şişe','kutu':'kutu','kase':'kase','çimdik':'çimdik'
  };

  // Unicode kesir karakterleri → decimal
  var FRACTIONS={'½':0.5,'⅓':1/3,'⅔':2/3,'¼':0.25,'¾':0.75,'⅕':0.2,'⅖':0.4,'⅗':0.6,'⅘':0.8,'⅙':1/6,'⅛':0.125};

  function _numFrom(tok){
    if(!tok) return NaN;
    tok=String(tok).trim();
    // Unicode kesir tek başına
    if(FRACTIONS[tok]!==undefined) return FRACTIONS[tok];
    // "1 ½" → 1.5
    var mMix=tok.match(/^(\d+)\s+([½⅓⅔¼¾⅕⅖⅗⅘⅙⅛])$/);
    if(mMix) return parseInt(mMix[1])+FRACTIONS[mMix[2]];
    // "1/2" → 0.5
    var mFrac=tok.match(/^(\d+)\s*\/\s*(\d+)$/);
    if(mFrac) return parseInt(mFrac[1])/parseInt(mFrac[2]);
    // "1.5" veya "1,5"
    tok=tok.replace(',','.');
    // "2-3" aralık → ortalama
    var mRange=tok.match(/^(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)$/);
    if(mRange) return (parseFloat(mRange[1])+parseFloat(mRange[2]))/2;
    var n=parseFloat(tok);
    return isNaN(n)?NaN:n;
  }

  function _normalizeUnit(u){
    if(!u) return '';
    u=String(u).toLowerCase().trim();
    if(UNIT_MAP[u]) return UNIT_MAP[u];
    // Çok-kelimeli birimleri parçala
    return u;
  }

  /**
   * Tek bir miktar string'ini parse eder.
   * @returns {{value:number, unit:string, raw:string}|null}
   */
  function parseOne(str){
    if(str==null) return null;
    var s=String(str).trim();
    if(!s) return null;

    // Açıklama tipi miktarlar ("isteğe bağlı", "servis için", "tadına göre")
    // → null döndür; calculator bunu "no-amount-assumed-pinch" olarak işler
    var sLower=s.toLocaleLowerCase('tr-TR');
    for(var z=0;z<ZERO_AMOUNT_PHRASES.length;z++){
      if(sLower.indexOf(ZERO_AMOUNT_PHRASES[z])===0) return null;
    }

    // "yarım bardak", "çeyrek limon" gibi kelime-numeral varyantları
    // Eğer baştaki kelime WORD_NUMERALS'taysa, onu sayıya çevirip tekrar parse et
    var firstWord=sLower.split(/\s+/)[0];
    if(WORD_NUMERALS[firstWord]!=null){
      var rest=s.replace(/^\S+\s*/,'');
      // "yarım Limon" → "0.5 Limon" → unit yoksa "adet"
      return parseOne(WORD_NUMERALS[firstWord]+(rest?' '+rest:''));
    }

    // "1 adet", "150g", "1/2 demet", "1,5 kg", "2-3 adet", "½ su bardağı", "1 ½ bardak"
    // Regex: sayı (kesir/aralık dahil) + (opsiyonel birim)
    // Önce unicode kesir + sayı kombinasyonlarını düzelt
    // Sayı kısmını yakala
    var numMatch=s.match(/^\s*(\d+\s*\/\s*\d+|\d+(?:[.,]\d+)?(?:\s*-\s*\d+(?:[.,]\d+)?)?|\d+\s*[½⅓⅔¼¾⅕⅖⅗⅘⅙⅛]|[½⅓⅔¼¾⅕⅖⅗⅘⅙⅛])\s*(.*)$/);
    if(!numMatch) return null;
    var numPart=numMatch[1].trim();
    var unitPart=(numMatch[2]||'').trim();

    var n=_numFrom(numPart);
    if(isNaN(n)) return null;

    // Birimin çok kelimeli olabileceğini düşün: "su bardağı", "yemek kaşığı"
    // Direkt eşleşme dene
    var unitLower=unitPart.toLowerCase();
    var canonical=UNIT_MAP[unitLower];
    if(canonical) return {value:n, unit:canonical, raw:s};

    // Kısmi eşleşme: "1 yemek kaşığı salça" gibi, sadece birimi al
    // Birim olarak bilinen kelimeleri baştan kontrol et
    var words=unitLower.split(/\s+/);
    // 2 kelimelik kombinasyon
    for(var i=0;i<words.length-1;i++){
      var two=words[i]+' '+words[i+1];
      if(UNIT_MAP[two]) return {value:n, unit:UNIT_MAP[two], raw:s};
    }
    // 1 kelimelik
    for(var j=0;j<words.length;j++){
      if(UNIT_MAP[words[j]]) return {value:n, unit:UNIT_MAP[words[j]], raw:s};
    }

    // Birim yok/bilinmiyor — sadece sayı varsa "adet" varsay
    if(!unitPart){ return {value:n, unit:'adet', raw:s}; }

    // Bilinmeyen birim — kullanıcı girişi olarak raw'ı koru
    return {value:n, unit:unitPart.toLowerCase(), raw:s};
  }

  /**
   * Birden fazla miktarı toplar. Aynı birim → topla. Farklı birim → ayrı kal.
   * @param {Array<string>} amountStrings
   * @returns {{totals: Array<{value:number,unit:string}>, unparsed: Array<string>}}
   */
  function sum(amountStrings){
    var byUnit={};
    var unparsed=[];
    (amountStrings||[]).forEach(function(s){
      if(!s) return;
      var p=parseOne(s);
      if(!p){ unparsed.push(String(s).trim()); return; }
      if(byUnit[p.unit]===undefined) byUnit[p.unit]=0;
      byUnit[p.unit]+=p.value;
    });
    var totals=Object.keys(byUnit).map(function(u){return {value:byUnit[u], unit:u};});
    // g vs kg, ml vs l — aynı ölçüyse birleştirme OPSİYON: V1'de birleştirmiyoruz
    // Sıralama: ağırlık > hacim > sayım
    var ORDER={'kg':1,'g':2,'l':3,'ml':4,'bardak':5,'çay bardağı':6,'yk':7,'tk':8,'çk':9,'adet':10,'diş':11,'demet':12,'dilim':13,'avuç':14,'paket':15};
    totals.sort(function(a,b){return (ORDER[a.unit]||99)-(ORDER[b.unit]||99);});
    return {totals:totals, unparsed:unparsed};
  }

  function formatValue(v){
    // 1.0 → "1", 2.5 → "2.5", 0.5 → "½"
    if(Math.abs(v-0.5)<0.001) return '½';
    if(Math.abs(v-0.25)<0.001) return '¼';
    if(Math.abs(v-0.75)<0.001) return '¾';
    if(Math.abs(v-Math.round(v))<0.001) return String(Math.round(v));
    return (Math.round(v*10)/10).toString().replace('.',',');
  }

  function formatOne(t){
    var display=UNIT_DISPLAY[t.unit]||t.unit;
    // "adet" küçük sayılarsa ortak Türkçe: "5 adet"
    return formatValue(t.value)+' '+display;
  }

  /**
   * Toplanmış miktarı okunabilir string'e çevir.
   * @param {{totals, unparsed}} agg
   * @returns {string}
   */
  function format(agg){
    if(!agg) return '';
    var parts=(agg.totals||[]).map(formatOne);
    var out=parts.join(' + ');
    if(agg.unparsed&&agg.unparsed.length){
      out += (out?' ':'')+'(+ '+agg.unparsed.join(', ')+')';
    }
    return out;
  }

  window.AmountParser={parseOne:parseOne, sum:sum, format:format, formatOne:formatOne, formatValue:formatValue};
})();
