// ╔══════════════════════════════════════════════════════════════════════╗
// ║  FitSofra — Mikro Besin Öneri Motoru (Micro Suggester)             ║
// ║                                                                      ║
// ║  Günün mikro besin toplamına bakar, en eksik 1-3 besini tespit eder ║
// ║  ve o besinler bakımından zengin tarifleri önerir.                  ║
// ║                                                                      ║
// ║  Mantık:                                                             ║
// ║   - findGaps(agg)        → boşlukları DV%'ye göre sıralar           ║
// ║   - suggestForNutrient(k)→ k mikrosu yoğun tarifleri çıkarır        ║
// ║   - renderForToday()     → "💡 Bugün düşük X — Y dene" kartı        ║
// ╚══════════════════════════════════════════════════════════════════════╝
(function(){
  'use strict';

  // Sodyum "az olsun" istenir; öneri için bakmıyoruz
  var SUGGEST_KEYS=['fiber','ca','fe','k','mg','vitC','vitA','b12','folat'];

  // Eşik: %70'in altındaki besinler "düşük" sayılır
  var GAP_THRESHOLD=70;
  // Çok-düşük (öncelik): %40 altı
  var CRITICAL_THRESHOLD=40;

  // Tarif mikro indeks cache — ilk çağrıda hesaplanır
  var _recipeIndex=null;     // [{name,id,emoji,img,cal,micro,density,coverage,idx}]
  var _indexBuilt=false;

  function _buildIndex(){
    if(_indexBuilt) return _recipeIndex;
    _indexBuilt=true;
    _recipeIndex=[];
    var RC=window.RecipeCalculator;
    var recipes=window.RECIPES||window.TURKISH_RECIPES_DB||[];
    if(!RC || !recipes.length) return _recipeIndex;

    // Sanity için her zaman üst sınır referansı kullan (DEFAULT) — kişisel DV
    // burada filtre amaçlı değil parse-hatası eleme amaçlı.
    var DV=(window.TuberDV&&window.TuberDV.DEFAULT_DV)||{fiber:28,ca:1000,fe:13,k:3500,mg:400,vitC:90,vitA:900,b12:2.4,folat:400};
    for(var i=0;i<recipes.length;i++){
      var r=recipes[i];
      if(!r || !(r.ingredients||r.ing)) continue;
      try{
        var calc=RC.calcRecipe(r);
        if(!calc || !calc.microPerServing || !calc.microCoverage) continue;
        // Düşük kapsamalı tarifleri eleme
        if(calc.microCoverage.ratio < 0.5) continue;
        var perCal=(calc.perServing && calc.perServing.cal) || 0;
        if(perCal<=0) continue;

        // ── Parse-hata sanity filtresi ──
        // Eğer hesaplanan kalori, DB'deki r.cal değerinden 2x fazlaysa
        // muhtemelen malzeme miktarı parse edilirken şişmiştir → atla
        if(r.cal && r.cal>0 && perCal > r.cal*2.2) continue;
        // Mikrolardan biri DV'nin 3 katından fazlaysa şüpheli (gerçekçi
        // istisna: ciğer/B12, baharat — onları yine kabul et ama density'yi cap'le)
        var implausible=false;
        SUGGEST_KEYS.forEach(function(k){
          if(implausible) return;
          var v=calc.microPerServing[k]||0;
          if(v > DV[k]*5) implausible=true;
        });
        if(implausible) continue;

        // density: mg-µg / 100kcal
        var density={};
        SUGGEST_KEYS.forEach(function(k){
          density[k]= ((calc.microPerServing[k]||0) / perCal) * 100;
        });
        _recipeIndex.push({
          idx:i,
          name:r.name,
          emoji:r.emoji||'🍽️',
          img:r.img||'',
          cal:Math.round(perCal),
          micro:calc.microPerServing,
          density:density,
          coverage:calc.microCoverage.ratio
        });
      }catch(e){ /* tarifte parse hatası — atla */ }
    }
    return _recipeIndex;
  }

  // İndex'i sıfırla (örn. RECIPES yenilenince)
  function invalidate(){
    _indexBuilt=false; _recipeIndex=null;
  }

  /**
   * Günün toplamına bakıp eksikleri sıralı döndürür.
   * @param {object} agg - DailyMicro.aggregate() çıktısı
   * @returns {Array<{key,label,val,dv,pct,critical}>}
   */
  function findGaps(agg){
    if(!agg || !agg.micro) return [];
    var DM=window.DailyMicro;
    var DV=(window.TuberDV&&window.TuberDV.getDV())
        || (DM&&DM.DV)
        || {fiber:28,ca:1000,fe:13,k:3500,mg:400,vitC:90,vitA:900,b12:2.4,folat:400};
    var DEF=(DM&&DM.MICRO_DEF)||{};
    var gaps=[];
    SUGGEST_KEYS.forEach(function(k){
      var dv=DV[k]; if(!dv) return;
      var val=agg.micro[k]||0;
      var pct=Math.round((val/dv)*100);
      if(pct<GAP_THRESHOLD){
        gaps.push({
          key:k,
          label:(DEF[k]&&DEF[k].label)||k,
          icon:(DEF[k]&&DEF[k].icon)||'•',
          unit:(DEF[k]&&DEF[k].unit)||'',
          val:val, dv:dv, pct:pct,
          critical:pct<CRITICAL_THRESHOLD
        });
      }
    });
    // Kritik olanlar üstte, sonra %ye göre artan
    gaps.sort(function(a,b){
      if(a.critical!==b.critical) return a.critical?-1:1;
      return a.pct-b.pct;
    });
    return gaps;
  }

  /**
   * Belirli bir mikro besin için en yoğun tarifleri döndürür.
   * @param {string} nutrientKey - 'fe', 'b12', vb.
   * @param {number} count - kaç tane öneri (default 3)
   * @param {Array<string>} excludeNames - hariç tutulacak tarif adları (örn. bugün yenilenler)
   * @returns {Array<recipe-index-item>}
   */
  function suggestForNutrient(nutrientKey, count, excludeNames){
    var idx=_buildIndex();
    if(!idx.length) return [];
    var skip={};
    (excludeNames||[]).forEach(function(n){ if(n) skip[String(n).toLowerCase().trim()]=true; });
    var sorted=idx
      .filter(function(r){ return r.density[nutrientKey]>0 && !skip[r.name.toLowerCase().trim()]; })
      .slice() // copy
      .sort(function(a,b){ return b.density[nutrientKey]-a.density[nutrientKey]; });
    return sorted.slice(0, count||3);
  }

  // Bugün yenilen tarif/yiyecek isimlerini topla
  function _todayEatenNames(){
    if(typeof window.getDayData!=='function') return [];
    try{
      var data=window.getDayData()||{};
      var names=[];
      Object.keys(data).forEach(function(m){
        (data[m]||[]).forEach(function(f){ if(f&&f.name) names.push(f.name); });
      });
      return names;
    }catch(e){ return []; }
  }

  // Dismiss state — kullanıcı kartı kapatırsa gün sonuna kadar gizli kalır
  function _dismissKey(){
    var d=new Date();
    return 'fs_micro_tip_dismissed_'+d.getFullYear()+'_'+(d.getMonth()+1)+'_'+d.getDate();
  }
  function isDismissed(){
    try{ return localStorage.getItem(_dismissKey())==='1'; }catch(e){ return false; }
  }
  function dismissToday(){
    try{ localStorage.setItem(_dismissKey(),'1'); }catch(e){}
    var slot=document.getElementById('microTipSlot');
    if(slot) slot.innerHTML='';
  }

  /**
   * Günün eksik 1 mikrosu için öneri kartı HTML'i döndürür.
   * Hiç eksik yoksa veya öneri çıkmazsa boş string.
   */
  function renderForToday(){
    if(isDismissed()) return '';
    if(!window.DailyMicro) return '';
    var data;
    try{ data=(typeof window.getDayData==='function')?window.getDayData():null; }catch(e){ return ''; }
    if(!data) return '';
    var agg=window.DailyMicro.aggregate(data);
    if(!agg.coverage || agg.coverage.matched===0) return ''; // gün boş

    var gaps=findGaps(agg);
    if(!gaps.length) return ''; // her şey iyi 🎉

    var topGap=gaps[0];
    var eaten=_todayEatenNames();
    var suggestions=suggestForNutrient(topGap.key, 3, eaten);
    if(!suggestions.length) return '';

    // En iyi 1 öneri büyük, kalanlar küçük chip
    var primary=suggestions[0];
    var others=suggestions.slice(1, 3);

    var pctColor = topGap.critical ? '#ff5c5c' : '#f0a030';
    var pctBg    = topGap.critical ? 'rgba(255,92,92,.10)' : 'rgba(240,160,48,.10)';
    var pctBorder= topGap.critical ? '#ff5c5c33' : '#f0a03033';

    var displayVal = topGap.val<10 ? topGap.val.toFixed(1) : Math.round(topGap.val);

    var primaryRecipeIdx = primary.idx;
    var otherChips = others.map(function(o){
      return '<button onclick="event.stopPropagation();openRecipeDetail('+o.idx+')" style="background:var(--card);border:1px solid var(--border);color:var(--text2);font-size:.62rem;font-weight:600;padding:4px 8px;border-radius:6px;cursor:pointer;font-family:var(--font,system-ui);white-space:nowrap">'
        +o.emoji+' '+escHTML(o.name)+'</button>';
    }).join('');

    var primaryImg = primary.img
      ? '<div style="width:48px;height:48px;border-radius:8px;overflow:hidden;flex-shrink:0;background:var(--glass)"><img src="'+primary.img+'" style="width:100%;height:100%;object-fit:cover" loading="lazy" onerror="this.parentElement.style.display=\'none\'"></div>'
      : '<div style="width:48px;height:48px;border-radius:8px;flex-shrink:0;background:var(--glass);display:flex;align-items:center;justify-content:center;font-size:1.4rem">'+primary.emoji+'</div>';

    return '<div id="microTipCard" style="margin:10px 12px;padding:10px 12px;background:'+pctBg+';border:1px solid '+pctBorder+';border-radius:12px">'
      +'<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px">'
        +'<div style="display:flex;align-items:center;gap:6px;font-size:.72rem;font-weight:700;color:'+pctColor+'">'
          +'<span style="font-size:.95rem">💡</span>'
          +'<span>Bugün '+topGap.icon+' <b>'+escHTML(topGap.label)+'</b> düşük</span>'
          +'<span style="font-size:.62rem;background:'+pctColor+'22;color:'+pctColor+';padding:2px 6px;border-radius:5px;font-weight:800">%'+topGap.pct+'</span>'
        +'</div>'
        +'<button onclick="window.MicroSuggester.dismissToday()" title="Bugünlük gizle" style="background:none;border:none;color:var(--text2);font-size:.95rem;cursor:pointer;padding:2px 4px;line-height:1;opacity:.55">×</button>'
      +'</div>'
      +'<div style="font-size:.62rem;color:var(--text2);margin-bottom:8px">'
        +displayVal+topGap.unit+' / '+topGap.dv+topGap.unit+' hedefin · şu tarif yardım eder:'
      +'</div>'
      +'<div onclick="openRecipeDetail('+primaryRecipeIdx+')" style="display:flex;align-items:center;gap:10px;background:var(--card);border:1px solid var(--border);border-radius:10px;padding:8px;cursor:pointer;transition:transform .15s" onmouseover="this.style.transform=\'translateY(-1px)\'" onmouseout="this.style.transform=\'translateY(0)\'">'
        +primaryImg
        +'<div style="flex:1;min-width:0">'
          +'<div style="font-size:.78rem;font-weight:700;color:var(--text);margin-bottom:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+primary.emoji+' '+escHTML(primary.name)+'</div>'
          +'<div style="font-size:.6rem;color:var(--text2);font-weight:600">'
            +'<span style="color:'+pctColor+';font-weight:800">+'+_fmtVal(primary.micro[topGap.key],topGap.unit)+topGap.unit+' '+topGap.label+'</span>'
            +' · '+primary.cal+' kcal/porsiyon'
          +'</div>'
        +'</div>'
        +'<div style="color:var(--text2);font-size:.95rem;flex-shrink:0">›</div>'
      +'</div>'
      +(otherChips ? '<div style="display:flex;gap:5px;margin-top:8px;flex-wrap:wrap">'+otherChips+'</div>' : '')
      +'</div>';
  }

  function _fmtVal(v,unit){
    if(v==null) return '0';
    if(unit==='µg' || unit==='mg' && v>=10) return Math.round(v);
    return v<10 ? Math.round(v*10)/10 : Math.round(v);
  }

  function escHTML(s){
    return String(s||'').replace(/[&<>"']/g,function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c];
    });
  }

  window.MicroSuggester={
    findGaps:findGaps,
    suggestForNutrient:suggestForNutrient,
    renderForToday:renderForToday,
    dismissToday:dismissToday,
    isDismissed:isDismissed,
    invalidate:invalidate,
    SUGGEST_KEYS:SUGGEST_KEYS,
    GAP_THRESHOLD:GAP_THRESHOLD
  };
})();
