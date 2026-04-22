// ╔══════════════════════════════════════════════════════════════════════╗
// ║  FitSofra — Malzeme Çözümleyici (Ingredient Resolver)              ║
// ║  Bir yemeği alışveriş listesi için hammadde listesine çevirir.     ║
// ║                                                                      ║
// ║  3 durum:                                                            ║
// ║  1) hammadde  — TURKISH_FOOD_DB'de cat:"hammadde" → direkt hammadde ║
// ║  2) recipe    — TURKISH_RECIPES_DB'de tarif → malzemeleri çıkar     ║
// ║  3) unresolved — yemek ama tarif yok → "tanımsız" olarak işaretle   ║
// ╚══════════════════════════════════════════════════════════════════════╝
(function(){
  'use strict';

  // İsim temizleme: aksan + parantez + case-fold
  function _norm(s){
    if(!s) return '';
    return String(s).toLowerCase()
      .replace(/\([^)]*\)/g,' ')       // (1 adet) gibi porsiyon notunu at
      .replace(/[^a-zçğıöşü\s]/gi,' ') // noktalama vs.
      .replace(/\s+/g,' ').trim();
  }

  // İsim bazlı kaba tip tahmini (fallback için):
  // Net "hammadde" görünüyor mu? (domates, süt, peynir gibi basit tek sözcük)
  var _HAMMADDE_HINTS=[
    'domates','soğan','sogan','biber','patlıcan','patlican','sarımsak','sarimsak',
    'maydanoz','dereotu','nane','fesleğen','feslegen','roka','marul','salatalık','salatalik',
    'havuç','havuc','patates','kabak','ıspanak','ispanak','pırasa','pirasa','lahana','brokoli','karnabahar',
    'limon','portakal','mandalina','elma','armut','muz','çilek','cilek','üzüm','uzum','kiraz','erik','kayısı','kayisi','şeftali','seftali','karpuz','kavun','ananas','nar','incir',
    'yumurta','süt','sut','yoğurt','yogurt','peynir','tereyağ','tereyag','kaşar','kasar','beyaz peynir',
    'un','şeker','seker','tuz','yağ','yag','zeytinyağ','zeytinyag','pirinç','pirinc','bulgur','makarna',
    'mercimek','nohut','fasulye','kıyma','kiyma','tavuk','et','balık','balik','somon','hamsi','levrek','karides'
  ];
  function _looksLikeHammadde(norm){
    if(!norm) return false;
    for(var i=0;i<_HAMMADDE_HINTS.length;i++){
      if(norm===_HAMMADDE_HINTS[i]) return true;
    }
    return false;
  }

  function _findInFoodDB(name){
    var arr=window.TURKISH_FOOD_DB||[]; if(!arr.length) return null;
    var target=_norm(name);
    for(var i=0;i<arr.length;i++){
      if(_norm(arr[i].name)===target) return arr[i];
    }
    return null;
  }

  function _findInRecipesDB(name){
    var arr=(window.TURKISH_RECIPES_DB||[]).concat(window.RECIPES||[]);
    if(!arr.length) return null;
    var target=_norm(name);
    for(var i=0;i<arr.length;i++){
      if(arr[i].name && _norm(arr[i].name)===target && arr[i].ingredients) return arr[i];
    }
    return null;
  }

  /**
   * Bir planlayıcı yemeğini hammadde listesine çevirir.
   * @param {object} food - {name, amount, emoji, ...}
   * @returns {{type:'hammadde'|'recipe'|'unresolved', items:Array<{name,amount,raw}>}}
   */
  function resolve(food){
    if(!food||!food.name) return {type:'unresolved', items:[]};

    // 1) Tarifi var mı? (doğrudan hammadde listesi)
    var rec=_findInRecipesDB(food.name);
    if(rec){
      return {
        type:'recipe',
        items:rec.ingredients.map(function(ing){
          return {name:(ing.item||ing.name||String(ing)).trim(), amount:ing.amount||'', raw:false};
        })
      };
    }

    // 2) Food DB'de var mı? cat === "hammadde" → direkt
    var fd=_findInFoodDB(food.name);
    if(fd){
      if(fd.cat==='hammadde'){
        var amt=food.amount?(food.amount+'g'):'';
        return {type:'hammadde', items:[{name:food.name, amount:amt, raw:true}]};
      }
      // Yemek ama tarifi yok → çözümlenemedi
      return {type:'unresolved', items:[{name:food.name, amount:'', raw:false}]};
    }

    // 3) Food DB'de de yok — isim tahmini: basit hammadde mi?
    var n=_norm(food.name);
    if(_looksLikeHammadde(n)){
      var amt2=food.amount?(food.amount+'g'):'';
      return {type:'hammadde', items:[{name:food.name, amount:amt2, raw:true}]};
    }

    // Son çare: çözümlenemedi (yemek ama tarif tanımlı değil)
    return {type:'unresolved', items:[{name:food.name, amount:'', raw:false}]};
  }

  /**
   * Yemek listesinden toplu alışveriş çıkar.
   * @param {Array<object>} foods - planlayıcıdan toplanmış yemek objeleri
   * @returns {{resolved:Array, unresolved:Array, rawCount:number, recipeCount:number}}
   *  resolved: [{name, amounts:[], count, raw:bool, sources:Set<string>}]
   *  unresolved: [{name, count}] — tarifi tanımlı olmayan yemekler
   */
  function buildShoppingList(foods){
    var map={};       // çözümlü malzemeler
    var unmap={};     // çözümsüz yemekler
    (foods||[]).forEach(function(f){
      var r=resolve(f);
      if(r.type==='unresolved'){
        var kn=(f.name||'').toLowerCase();
        if(!unmap[kn]) unmap[kn]={name:f.name, count:0};
        unmap[kn].count++;
        return;
      }
      r.items.forEach(function(it){
        var k=it.name.toLowerCase();
        if(!map[k]) map[k]={name:it.name, amounts:[], count:0, raw:!!it.raw};
        map[k].count++;
        if(it.raw) map[k].raw=true;
        if(it.amount){
          var a=String(it.amount).trim();
          if(a && map[k].amounts.indexOf(a)<0) map[k].amounts.push(a);
        }
      });
    });
    var resolved=Object.keys(map).map(function(k){return map[k];}).sort(function(a,b){
      // Tariften gelenler üstte, hammaddeler altta
      if(a.raw!==b.raw) return a.raw?1:-1;
      return b.count-a.count;
    });
    var unresolved=Object.keys(unmap).map(function(k){return unmap[k];}).sort(function(a,b){return b.count-a.count;});
    var rawCount=resolved.filter(function(x){return x.raw;}).length;
    return {
      resolved:resolved,
      unresolved:unresolved,
      rawCount:rawCount,
      recipeCount:resolved.length-rawCount,
      total:resolved.length
    };
  }

  window.IngredientResolver={resolve:resolve, buildShoppingList:buildShoppingList};
})();
