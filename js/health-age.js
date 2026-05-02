// ╔══════════════════════════════════════════════════════════════════════╗
// ║  FitSofra — Sağlık Yaşı (Bio Age)                                   ║
// ║                                                                      ║
// ║  Kronolojik yaşa kıyasla "biyolojik yaş" tahmini.                    ║
// ║  Beslenme tutarlılığı, mikro kapsama, makro denge, su, kilo trendi, ║
// ║  egzersiz ve seri verilerinden ±10 yıl modifier hesaplar.           ║
// ║                                                                      ║
// ║  Not: Bu klinik bir teşhis değildir, motivasyon amaçlı tahmindir.   ║
// ╚══════════════════════════════════════════════════════════════════════╝
(function(){
  'use strict';

  function _profile(){
    try{ return JSON.parse(localStorage.getItem('fs_profile')||'{}')||{}; }catch(e){ return {}; }
  }

  function _dateKey(d){
    return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  }

  function _dayData(dk){
    try{
      var raw=localStorage.getItem('fs_day_'+dk);
      if(!raw) return null;
      return JSON.parse(raw);
    }catch(e){ return null; }
  }

  function _dayTotals(dk){
    var d=_dayData(dk);
    if(!d) return null;
    var cal=0,p=0,c=0,f=0,count=0;
    Object.values(d).forEach(function(meal){
      if(!Array.isArray(meal)) return;
      meal.forEach(function(food){
        cal+=food.cal||0; p+=food.prot||0; c+=food.carb||0; f+=food.fat||0; count++;
      });
    });
    return {cal:cal, prot:p, carb:c, fat:f, count:count};
  }

  function _weightLog(){
    try{
      var raw=localStorage.getItem('fs_weight_log');
      if(!raw) return [];
      return JSON.parse(raw)||[];
    }catch(e){ return []; }
  }

  /**
   * Sağlık Yaşı hesapla.
   * @param {object} opts - {days:30, profile?, todayMicroPct?}
   * @returns {object} {chronological, healthAge, delta, breakdown:[]}
   */
  function compute(opts){
    opts=opts||{};
    var days=opts.days||30;
    var profile=opts.profile||_profile();
    var chrono=parseFloat(profile.age)||25;

    // Hedefler
    var calTarget=parseFloat(profile.dailyTarget)||0;
    if(!calTarget){
      // BMR'den kaba tahmin — tutarlılık skorlaması için
      var w=parseFloat(profile.weight)||70;
      var h=parseFloat(profile.height)||170;
      var act=parseFloat(profile.activity)||1.375;
      var goalAdj=parseFloat(profile.goal)||0;
      var bmr=(profile.gender==='female')
        ? 10*w + 6.25*h - 5*chrono - 161
        : 10*w + 6.25*h - 5*chrono + 5;
      calTarget=Math.round(bmr*act + goalAdj);
    }
    var waterTarget=parseFloat(profile.water)||2000;

    // Son N günü topla
    var totals=[];
    var today=new Date();
    for(var i=0;i<days;i++){
      var d=new Date(today); d.setDate(d.getDate()-i);
      var dk=_dateKey(d);
      var t=_dayTotals(dk);
      var water=parseInt(localStorage.getItem('fs_water_'+dk))||0;
      var ex=[];
      try{ ex=JSON.parse(localStorage.getItem('fs_ex_'+dk)||'[]'); }catch(e){}
      totals.push({dk:dk, totals:t, water:water, exercise:ex.length>0});
    }
    var activeDays=totals.filter(function(d){ return d.totals && d.totals.count>0; });

    var breakdown=[];
    var delta=0;

    // 1. Beslenme tutarlılığı (-3..+3)
    if(calTarget>0 && activeDays.length>=3){
      var consist=activeDays.filter(function(d){
        var ratio=d.totals.cal/calTarget;
        return ratio>=0.85 && ratio<=1.15;
      }).length;
      var consistRate=consist/Math.min(activeDays.length, days);
      var consistDelta=(0.5-consistRate)*6; // 100% → -3, 0% → +3
      consistDelta=Math.max(-3,Math.min(3,consistDelta));
      delta+=consistDelta;
      breakdown.push({
        key:'consistency',
        label:'Beslenme tutarlılığı',
        icon:'🎯',
        years:Math.round(consistDelta*10)/10,
        detail:Math.round(consistRate*100)+'% gün hedefte (±15%)'
      });
    } else {
      breakdown.push({key:'consistency',label:'Beslenme tutarlılığı',icon:'🎯',years:0,detail:'Yeterli veri yok'});
    }

    // 2. Mikro besin kapsama (-2..+2) — son 7 gün ortalaması (DailyMicro varsa)
    var microDelta=0, microPctAvg=null;
    if(window.DailyMicro && window.DailyMicro.aggregate){
      var DV=(window.TuberDV && window.TuberDV.getDV()) || window.DailyMicro.DV || {};
      var microKeys=['fe','ca','b12','folat','vitC','fiber'];
      var pcts=[];
      for(var di=0; di<7; di++){
        var dd=new Date(today); dd.setDate(dd.getDate()-di);
        var dkk=_dateKey(dd);
        var dayD=_dayData(dkk);
        if(!dayD) continue;
        var allFoods=[];
        Object.values(dayD).forEach(function(m){ if(Array.isArray(m)) allFoods=allFoods.concat(m); });
        if(!allFoods.length) continue;
        try{
          var agg=window.DailyMicro.aggregate(allFoods);
          if(!agg||!agg.micro) continue;
          var dayPct=microKeys.map(function(k){
            var dv=DV[k]||1;
            return Math.min(120,(agg.micro[k]||0)/dv*100);
          });
          var dayAvg=dayPct.reduce(function(a,b){return a+b;},0)/dayPct.length;
          pcts.push(dayAvg);
        }catch(e){}
      }
      if(pcts.length>=2){
        microPctAvg=pcts.reduce(function(a,b){return a+b;},0)/pcts.length;
        // %85+ → -2, %50 → 0, %15 → +2
        microDelta=(0.5 - microPctAvg/100)*4;
        microDelta=Math.max(-2,Math.min(2,microDelta));
        delta+=microDelta;
      }
    }
    breakdown.push({
      key:'micro',
      label:'Mikro besin kapsama',
      icon:'🥬',
      years:Math.round(microDelta*10)/10,
      detail:microPctAvg!==null ? '7 gün ort. %'+Math.round(microPctAvg) : 'Yeterli veri yok'
    });

    // 3. Makro denge (-1.5..+1.5) — protein hedefi yakınlığı
    var macroDelta=0, macroDetail='Yeterli veri yok';
    var protTarget=parseFloat(profile.protTarget)||0;
    if(!protTarget && profile.weight) protTarget=Math.round(parseFloat(profile.weight)*1.6);
    if(activeDays.length>=3 && protTarget>0){
      var protAvg=activeDays.reduce(function(s,d){return s+(d.totals.prot||0);},0)/activeDays.length;
      var protRatio=protAvg/protTarget;
      // 0.9-1.2 ideal, dışı kötü
      if(protRatio>=0.9 && protRatio<=1.2) macroDelta=-1.5;
      else if(protRatio>=0.75 && protRatio<=1.35) macroDelta=-0.5;
      else if(protRatio>=0.6) macroDelta=0.5;
      else macroDelta=1.5;
      delta+=macroDelta;
      macroDetail='Protein ort. '+Math.round(protAvg)+'g / '+protTarget+'g';
    }
    breakdown.push({key:'macro',label:'Protein dengesi',icon:'💪',years:macroDelta,detail:macroDetail});

    // 4. Su (-1..+1)
    var waterDelta=0, waterDetail='Yeterli veri yok';
    var waterDays=totals.filter(function(d){ return d.water>0; });
    if(waterDays.length>=3){
      var waterAvg=waterDays.reduce(function(s,d){return s+d.water;},0)/waterDays.length;
      var waterRatio=Math.min(1.2, waterAvg/waterTarget);
      waterDelta=(0.6 - waterRatio)*2; // 1.2x → -1.2, 0.6x → 0, 0.0 → +1.2
      waterDelta=Math.max(-1,Math.min(1,waterDelta));
      delta+=waterDelta;
      waterDetail=Math.round(waterAvg)+' ml ort. (hedef '+waterTarget+')';
    }
    breakdown.push({key:'water',label:'Su tüketimi',icon:'💧',years:Math.round(waterDelta*10)/10,detail:waterDetail});

    // 5. Kilo trendi (-2..+2)
    var weightDelta=0, weightDetail='Tartı kaydı yetersiz';
    var wlog=_weightLog();
    if(wlog.length>=2){
      var goalW=parseFloat(profile.goalWeight)||parseFloat(profile.weight)||70;
      var startW=wlog[Math.max(0,wlog.length-Math.min(wlog.length,30))].weight;
      var nowW=wlog[wlog.length-1].weight;
      var goalDir=Math.sign(goalW-startW); // -1 zayıflama, +1 alım, 0 koruma
      var actualDir=Math.sign(nowW-startW);
      var diff=Math.abs(nowW-startW);
      if(goalDir===0){
        // Koruma: sabit kalış iyi
        weightDelta = diff<1 ? -2 : diff<2.5 ? -0.5 : 1.5;
      } else if(goalDir===actualDir){
        // Doğru yönde
        weightDelta = diff>=2 ? -2 : diff>=0.5 ? -1 : 0;
      } else {
        // Ters yönde
        weightDelta = diff>=1 ? 2 : 0.5;
      }
      weightDelta=Math.max(-2,Math.min(2,weightDelta));
      delta+=weightDelta;
      var diffSigned=Math.round((nowW-startW)*10)/10;
      weightDetail=(diffSigned>=0?'+':'')+diffSigned+' kg ('+wlog.length+' tartı)';
    }
    breakdown.push({key:'weight',label:'Kilo trendi',icon:'⚖️',years:Math.round(weightDelta*10)/10,detail:weightDetail});

    // 6. Egzersiz (-1.5..+1.5)
    var exDays=totals.slice(0,7).filter(function(d){ return d.exercise; }).length;
    var exDelta=(2.5 - exDays)*0.5; // 5+ gün → -1.25, 0 gün → +1.25
    exDelta=Math.max(-1.5,Math.min(1.5,exDelta));
    delta+=exDelta;
    breakdown.push({key:'exercise',label:'Egzersiz (7 gün)',icon:'🏃',years:Math.round(exDelta*10)/10,detail:exDays+'/7 gün aktif'});

    // 7. Seri / habit (-1..+1)
    var streakN=parseInt(localStorage.getItem('fs_streak_count'))||0;
    if(!streakN){
      try{
        var sEl=document.getElementById('streakCount');
        if(sEl) streakN=parseInt(sEl.textContent)||0;
      }catch(e){}
    }
    var streakDelta=0;
    if(streakN>=30) streakDelta=-1;
    else if(streakN>=14) streakDelta=-0.7;
    else if(streakN>=7) streakDelta=-0.4;
    else if(streakN>=3) streakDelta=0;
    else if(streakN>=1) streakDelta=0.3;
    else streakDelta=1;
    delta+=streakDelta;
    breakdown.push({key:'streak',label:'Tutarlılık serisi',icon:'🔥',years:streakDelta,detail:streakN+' günlük seri'});

    // Toplam clamp: ±8 yıl
    delta=Math.max(-8,Math.min(8,delta));

    var healthAge=Math.round(chrono+delta);
    if(healthAge<16) healthAge=16;

    return {
      chronological:chrono,
      healthAge:healthAge,
      delta:Math.round(delta*10)/10,
      breakdown:breakdown,
      computedAt:Date.now()
    };
  }

  // 30 günlük geriye dönük trend (sparkline için)
  function trendHistory(daysBack){
    daysBack=daysBack||14;
    var profile=_profile();
    var hist=[];
    var today=new Date();
    // Geçmiş günler için tam yeniden hesap pahalı — basit bir cache anahtarı kullan
    // ve sadece anlık + son birkaç noktanın iz bırakmasını sağla.
    // V1: sadece bugün için detay döner; trend için snapshot store'undan oku.
    try{
      var snap=JSON.parse(localStorage.getItem('fs_health_age_snap')||'[]')||[];
      hist=snap.slice(-daysBack);
    }catch(e){}
    return hist;
  }

  // Günlük snapshot kaydet — anlık değişimi izlemek için
  function snapshotToday(result){
    try{
      var arr=JSON.parse(localStorage.getItem('fs_health_age_snap')||'[]')||[];
      var todayKey=_dateKey(new Date());
      // Aynı gün için son kaydı güncelle
      var last=arr[arr.length-1];
      var entry={date:todayKey, healthAge:result.healthAge, delta:result.delta};
      if(last && last.date===todayKey){
        arr[arr.length-1]=entry;
      } else {
        arr.push(entry);
      }
      // Son 60 günü tut
      if(arr.length>60) arr=arr.slice(-60);
      localStorage.setItem('fs_health_age_snap',JSON.stringify(arr));
    }catch(e){}
  }

  function renderCard(){
    var res;
    try{ res=compute(); }catch(e){ console.warn('[HealthAge]',e); return ''; }
    snapshotToday(res);

    var d=res.delta;
    var color, emoji, msg;
    if(d<=-3){ color='var(--green)'; emoji='🌟'; msg='Harika gidiyorsun! Yaşından genç!'; }
    else if(d<=-1){ color='#3dd68c'; emoji='💚'; msg='İyi yoldasın, devam!'; }
    else if(d<1){ color='var(--accent)'; emoji='⚖️'; msg='Yaşınla aynı tempodasın'; }
    else if(d<3){ color='#f0a030'; emoji='⚠️'; msg='Geliştirebilirsin'; }
    else { color='#ff5c5c'; emoji='🚨'; msg='Sağlık alışkanlıklarını gözden geçir'; }

    var deltaText;
    if(d<=-0.5) deltaText='<span style="color:var(--green);font-weight:800">'+Math.abs(d)+' yıl genç</span>';
    else if(d>=0.5) deltaText='<span style="color:#ff5c5c;font-weight:800">+'+d+' yıl yaşlı</span>';
    else deltaText='<span style="color:var(--text2);font-weight:700">yaşıyla aynı</span>';

    // Breakdown rows
    var rows=res.breakdown.map(function(b){
      var bColor=b.years<=-0.5?'var(--green)':b.years>=0.5?'#ff5c5c':'var(--text2)';
      var sign=b.years>0?'+':b.years<0?'':'±';
      var yearsTxt=b.years===0?'±0':(sign+b.years);
      return '<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px dashed var(--border);font-size:.72rem">'
        +'<span style="font-size:.95rem">'+b.icon+'</span>'
        +'<div style="flex:1;min-width:0">'
        +'<div style="font-weight:700;color:var(--text)">'+b.label+'</div>'
        +'<div style="color:var(--text2);font-size:.65rem">'+b.detail+'</div>'
        +'</div>'
        +'<div style="font-weight:800;color:'+bColor+';font-size:.78rem;white-space:nowrap">'+yearsTxt+' yıl</div>'
        +'</div>';
    }).join('');

    // Trend sparkline
    var trend=trendHistory(14);
    var spark='';
    if(trend.length>=2){
      var vals=trend.map(function(t){return t.healthAge;});
      var minV=Math.min.apply(null,vals)-1;
      var maxV=Math.max.apply(null,vals)+1;
      var rng=maxV-minV||1;
      var pts=trend.map(function(t,i){
        var x=(i/(trend.length-1))*100;
        var y=100-((t.healthAge-minV)/rng)*100;
        return x+','+y;
      }).join(' ');
      spark='<div style="margin-top:10px;padding:8px;background:var(--glass);border-radius:8px;border:1px solid var(--border)">'
        +'<div style="font-size:.62rem;color:var(--text2);font-weight:600;margin-bottom:4px">📈 Son '+trend.length+' gün trend</div>'
        +'<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="width:100%;height:36px">'
        +'<polyline points="'+pts+'" fill="none" stroke="'+color+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>'
        +'</svg></div>';
    }

    return '<div class="stat-card" style="animation-delay:.05s">'
      +'<h3 style="display:flex;align-items:center;gap:6px">🧬 Sağlık Yaşı '
      +'<span style="font-size:.6rem;color:var(--text2);font-weight:400">(motivasyon tahmini)</span>'
      +'<button onclick="HealthAge.showInfo()" title="Skor nasıl hesaplanıyor?" aria-label="Skor bilgisi" style="margin-left:auto;background:var(--glass);border:1px solid var(--border);border-radius:50%;width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;color:var(--accent);font-size:.8rem;font-weight:800;font-family:var(--font,system-ui);padding:0">i</button>'
      +'</h3>'
      +'<div style="display:flex;align-items:center;gap:14px;padding:14px 4px 8px">'
      +'<div style="flex:0 0 auto;text-align:center">'
      +'<div style="font-size:2.5rem;font-weight:900;color:'+color+';line-height:1">'+res.healthAge+'</div>'
      +'<div style="font-size:.6rem;color:var(--text2);font-weight:600;margin-top:2px">SAĞLIK YAŞI</div>'
      +'</div>'
      +'<div style="flex:1;min-width:0">'
      +'<div style="font-size:.78rem;color:var(--text2);margin-bottom:2px">Kronolojik: <b style="color:var(--text)">'+res.chronological+'</b> yaş</div>'
      +'<div style="font-size:.85rem;margin-bottom:4px">'+deltaText+'</div>'
      +'<div style="font-size:.72rem;color:var(--text2);line-height:1.4">'+emoji+' '+msg+'</div>'
      +'</div></div>'
      +spark
      +'<details style="margin-top:10px"><summary style="cursor:pointer;font-size:.7rem;color:var(--text2);font-weight:600;padding:6px 0;user-select:none">🔍 Hesap detayını göster</summary>'
      +'<div style="margin-top:6px">'+rows+'</div>'
      +'<div style="margin-top:8px;padding:8px;background:var(--glass);border-radius:6px;font-size:.62rem;color:var(--text2);line-height:1.5">'
      +'⚠️ Bu klinik bir teşhis değildir. Beslenme alışkanlıklarınızdan türetilen motivasyon amaçlı bir göstergedir.'
      +'</div></details>'
      +'</div>';
  }

  function showInfo(){
    var existing = document.getElementById('healthAgeInfoModal');
    if(existing){ existing.remove(); }
    var modal = document.createElement('div');
    modal.id = 'healthAgeInfoModal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:9990;background:rgba(0,0,0,.65);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);display:flex;align-items:flex-start;justify-content:center;padding:16px;overflow-y:auto;animation:fadeIn .2s ease';
    modal.addEventListener('click', function(e){ if(e.target===modal) modal.remove(); });

    var factors = [
      { icon:'🎯', name:'Beslenme tutarlılığı', range:'±3 yıl', detail:'Günlük kalori hedefini ±%15 dahilinde tutturduğun gün oranı. Tutturma %\'si arttıkça yaşın gençleşir, sürekli sapma yaşlandırır.', tip:'30 günün en az 20\'sini hedefin ±%15 aralığında tut.' },
      { icon:'🥬', name:'Mikro besin kapsama', range:'±2 yıl', detail:'Son 7 günün ortalama Demir, Kalsiyum, B12, Folat, C Vitamini ve Lif kapsama yüzdesi (TÜBER 2022 DV).', tip:'Yeşillik, baklagil, yumurta, süt ve turunçgil çeşitlendir.' },
      { icon:'💪', name:'Protein dengesi', range:'±1.5 yıl', detail:'Günlük ortalama protein alımı, hedefin %90-120\'si arasında olmalı. Eksik veya aşırı protein dengeyi bozar.', tip:'Hedef yoksa kg×1.6g protein iyi bir başlangıç.' },
      { icon:'💧', name:'Su tüketimi', range:'±1 yıl', detail:'Günlük su hedefini yakalama oranın. Hedefin altı yaşlandırır, tutturmak veya hafif aşmak gençleştirir.', tip:'Sabah uyandığında 1 bardak + her öğüne 1 bardak.' },
      { icon:'⚖️', name:'Kilo trendi', range:'±2 yıl', detail:'Hedef yönüne (vermek/koruma/almak) doğru ilerleyişin. Doğru yönde değişim gençleştirir, ters yön yaşlandırır.', tip:'Tartı kayıtlarını düzenli tut — haftada 1-2 kez yeterli.' },
      { icon:'🏃', name:'Egzersiz (son 7 gün)', range:'±1.5 yıl', detail:'Son 7 gün içinde egzersiz logladığın gün sayısı. 5+ gün gençleştirir, sıfır gün yaşlandırır.', tip:'Günlük 30dk yürüyüş bile pozitif katkı yapar.' },
      { icon:'🔥', name:'Tutarlılık serisi (streak)', range:'±1 yıl', detail:'Üst üste log tuttuğun gün sayısı. Habit oluştuğunda gençleştirici etki en yüksek (30+ gün).', tip:'Bugün loglamayı atlamak serini sıfırlar — 1 yemek bile yeterli.' }
    ];

    var rowsHtml = factors.map(function(f){
      return '<div style="background:var(--glass);border:1px solid var(--border);border-radius:10px;padding:10px 12px;margin-bottom:8px">'+
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">'+
          '<span style="font-size:1.2rem">'+f.icon+'</span>'+
          '<div style="flex:1"><div style="font-size:.84rem;font-weight:800">'+f.name+'</div></div>'+
          '<span style="font-size:.65rem;font-weight:700;color:var(--accent);background:var(--accent-glow);padding:2px 8px;border-radius:6px">'+f.range+'</span>'+
        '</div>'+
        '<div style="font-size:.72rem;color:var(--text2);line-height:1.5;margin-bottom:4px">'+f.detail+'</div>'+
        '<div style="font-size:.68rem;color:var(--text);background:rgba(61,214,140,.06);border-left:2px solid var(--green);padding:5px 8px;border-radius:4px;line-height:1.4">💡 '+f.tip+'</div>'+
      '</div>';
    }).join('');

    modal.innerHTML =
      '<div style="background:var(--card);border:1.5px solid var(--border);border-radius:16px;max-width:480px;width:100%;padding:18px;box-shadow:0 20px 60px rgba(0,0,0,.4);margin-top:20px;margin-bottom:20px">'+
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:14px">'+
          '<div><h2 style="margin:0;font-size:1.05rem;font-weight:800;display:flex;align-items:center;gap:6px">🧬 Sağlık Yaşı Nasıl Hesaplanır?</h2><div style="font-size:.7rem;color:var(--text2);margin-top:3px">Kronolojik yaşına 7 etken üzerinden ±8 yıl uygulanır.</div></div>'+
          '<button onclick="document.getElementById(\'healthAgeInfoModal\').remove()" style="background:var(--glass);border:1px solid var(--border);border-radius:8px;padding:5px 11px;font-family:var(--font,system-ui);font-size:.78rem;font-weight:700;color:var(--text2);cursor:pointer">Kapat</button>'+
        '</div>'+
        rowsHtml+
        '<div style="margin-top:8px;padding:10px 12px;background:rgba(255,193,7,.06);border:1px solid rgba(255,193,7,.25);border-radius:10px;font-size:.7rem;color:var(--text2);line-height:1.5">'+
          '⚠️ <strong style="color:var(--text)">Bu klinik bir teşhis değildir.</strong> Beslenme alışkanlıklarından türetilen motivasyon amaçlı bir göstergedir. Sağlık kararları için uzman desteği al.'+
        '</div>'+
      '</div>';

    document.body.appendChild(modal);
  }

  window.HealthAge = {
    compute: compute,
    renderCard: renderCard,
    snapshotToday: snapshotToday,
    trendHistory: trendHistory,
    showInfo: showInfo
  };

})();
