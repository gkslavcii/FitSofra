// ╔══════════════════════════════════════════════════════════════════════╗
// ║  FitSofra — Kişiselleştirilmiş Günlük Mikro Besin Referansı (DV)    ║
// ║                                                                      ║
// ║  TÜBER 2022 + USDA DRI tablosuna göre yaş + cinsiyete göre          ║
// ║  Daily Value (DV) hesaplar. Profilden okunan veri:                   ║
// ║    fs_profile.gender ('male' | 'female')                             ║
// ║    fs_profile.age    (number)                                         ║
// ║                                                                      ║
// ║  Kullanım:                                                            ║
// ║    var dv = TuberDV.getDV();          // profilden cache'li         ║
// ║    var dv2 = TuberDV.computeDV({age:30,gender:'female'});           ║
// ║    TuberDV.invalidate();              // profil değişince          ║
// ║                                                                      ║
// ║  V1: gebelik / emzirme / sigara bayrakları yok (profilde alan yok)  ║
// ╚══════════════════════════════════════════════════════════════════════╝
(function(){
  'use strict';

  // Yetişkin "default" — profil yoksa bunu döndür (mevcut sabit DV ile uyumlu)
  var DEFAULT_DV={fiber:28, sodium:2300, ca:1000, fe:13, k:3500, mg:400, vitC:90, vitA:900, b12:2.4, folat:400};

  function _num(v){ var n=parseFloat(v); return isFinite(n)?n:0; }

  // Ana hesap: yaş + cinsiyet → DV objesi
  function computeDV(profile){
    profile=profile||{};
    var age=_num(profile.age);
    var gender=String(profile.gender||'').toLowerCase();
    if(gender!=='male' && gender!=='female') gender='';

    // Profil eksikse default
    if(!age || !gender){
      return Object.assign({}, DEFAULT_DV);
    }

    var dv={};

    // ── Sodyum (üst sınır referansı, herkes için sabit) ──
    dv.sodium = 2300;

    // ── Lif (USDA: 14 g / 1000 kcal yaklaşımı; TÜBER yaş bantları) ──
    if(age<=18){
      dv.fiber = (gender==='male') ? 31 : 26;
    } else if(age<=50){
      dv.fiber = (gender==='male') ? 38 : 25;
    } else {
      dv.fiber = (gender==='male') ? 30 : 21;
    }

    // ── Kalsiyum (mg) ──
    if(age>=9 && age<=18) dv.ca = 1300;
    else if(age<=50)      dv.ca = 1000;
    else if(gender==='female' && age>=51) dv.ca = 1200;
    else if(gender==='male'   && age>=71) dv.ca = 1200;
    else                   dv.ca = 1000;

    // ── Demir (mg) ──
    if(age>=9 && age<=13)      dv.fe = 8;
    else if(age>=14 && age<=18) dv.fe = (gender==='male') ? 11 : 15;
    else if(gender==='female' && age>=19 && age<=50) dv.fe = 18;
    else                        dv.fe = 8;

    // ── Potasyum (mg) ──
    if(age<=18) dv.k = (gender==='male') ? 3000 : 2300;
    else        dv.k = (gender==='male') ? 3400 : 2600;

    // ── Magnezyum (mg) ──
    if(age>=14 && age<=18) dv.mg = (gender==='male') ? 410 : 360;
    else if(age>=19 && age<=30) dv.mg = (gender==='male') ? 400 : 310;
    else if(age>=31)            dv.mg = (gender==='male') ? 420 : 320;
    else                        dv.mg = 240; // 9-13

    // ── C Vitamini (mg) ──
    if(age>=9 && age<=13)       dv.vitC = 45;
    else if(age>=14 && age<=18) dv.vitC = (gender==='male') ? 75 : 65;
    else                        dv.vitC = (gender==='male') ? 90 : 75;

    // ── A Vitamini (µg RAE) ──
    if(age>=9 && age<=13)       dv.vitA = 600;
    else if(age>=14 && age<=18) dv.vitA = (gender==='male') ? 900 : 700;
    else                        dv.vitA = (gender==='male') ? 900 : 700;

    // ── B12 (µg) — yetişkin sabit ──
    dv.b12 = (age>=14) ? 2.4 : 1.8;

    // ── Folat (µg DFE) ──
    dv.folat = (age>=14) ? 400 : 300;

    return dv;
  }

  // Profil cache'i — invalidate çağrılınca sıfırlanır
  var _cache=null;
  var _cacheKey=null;

  function _readProfile(){
    try{
      if(typeof localStorage==='undefined') return {};
      return JSON.parse(localStorage.getItem('fs_profile')||'{}')||{};
    }catch(e){ return {}; }
  }

  function getDV(){
    var p=_readProfile();
    var key=(p.gender||'')+'|'+(p.age||'');
    if(_cache && _cacheKey===key) return _cache;
    _cache=computeDV(p);
    _cacheKey=key;
    return _cache;
  }

  function invalidate(){
    _cache=null; _cacheKey=null;
  }

  // Etiket — UI'da "30 yaş kadın için referans" gibi göstermek için
  function describe(profile){
    profile=profile||_readProfile();
    var age=_num(profile.age);
    var g=String(profile.gender||'').toLowerCase();
    if(!age || (g!=='male' && g!=='female')) return 'yetişkin ortalaması';
    return age+' yaş '+(g==='male'?'erkek':'kadın');
  }

  window.TuberDV = {
    DEFAULT_DV: DEFAULT_DV,
    computeDV: computeDV,
    getDV: getDV,
    invalidate: invalidate,
    describe: describe
  };

})();
