/* FitSofra — Haftalık Koç Raporu
 * window.WeeklyCoach API:
 *   open()                — modal'ı aç (mevcut hafta verisiyle)
 *   computeWeek(endDate)  — son 7 günün analizi (test/standalone)
 *   maybeAutoShow()       — kullanıcı tercihine göre otomatik gösterim
 *   resetSeen(yyyyww)     — tekrar gösterim için flag temizle
 *
 * Storage:
 *   fs_weekly_coach_seen — son gösterilen hafta anahtarı (YYYY-WW)
 *
 * Bağımlılıklar (varsa kullanır, yoksa atlar):
 *   getDayData(dk), dateKey(d), getTodayTargets(),
 *   FOOD_DB, getWaterMl(dk), MICRO_DB
 */
(function(){
  'use strict';

  function _key(d){
    d = d || new Date();
    return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  }

  // ISO hafta numarası (yıl-hafta)
  function _isoWeek(d){
    var dt = new Date(d.valueOf());
    dt.setHours(0,0,0,0);
    dt.setDate(dt.getDate() + 3 - (dt.getDay()+6)%7);
    var yearStart = new Date(dt.getFullYear(),0,4);
    var week = 1 + Math.round(((dt-yearStart)/86400000 - 3 + (yearStart.getDay()+6)%7) / 7);
    return dt.getFullYear()+'-W'+String(week).padStart(2,'0');
  }

  function _getWaterFor(dk){
    try{
      // index.html'de fs_water_YYYY-MM-DD kullanılıyor olabilir
      var keys = ['fs_water_'+dk, 'fs_w_'+dk];
      for(var i=0;i<keys.length;i++){
        var raw = localStorage.getItem(keys[i]);
        if(raw){
          var v = parseInt(raw,10);
          if(!isNaN(v)) return v;
          try{ var o = JSON.parse(raw); if(o && typeof o.ml==='number') return o.ml; }catch(_){}
        }
      }
    }catch(_){}
    return 0;
  }

  function _hasMeals(d){
    if(!d) return false;
    return ((d.kahvalti||[]).length + (d.ogle||[]).length + (d.aksam||[]).length + (d.atistirmalik||[]).length) > 0;
  }

  function _sumDay(d){
    var s = { cal:0, prot:0, carb:0, fat:0, items:0 };
    if(!d) return s;
    ['kahvalti','ogle','aksam','atistirmalik'].forEach(function(m){
      (d[m]||[]).forEach(function(f){
        s.cal += f.cal||0;
        s.prot += f.prot||0;
        s.carb += f.carb||0;
        s.fat += f.fat||0;
        s.items++;
      });
    });
    return s;
  }

  function computeWeek(endDate){
    var end = endDate || new Date();
    var days = [];
    for(var i=6;i>=0;i--){
      var d = new Date(end);
      d.setDate(d.getDate()-i);
      var dk = _key(d);
      var data = (typeof getDayData === 'function') ? getDayData(dk) : null;
      var sum = _sumDay(data);
      var water = _getWaterFor(dk);
      days.push({
        date: dk,
        dow: d.getDay(),
        label: ['Pzr','Pzt','Sal','Çar','Per','Cum','Cmt'][d.getDay()],
        sum: sum,
        water: water,
        logged: _hasMeals(data)
      });
    }

    var loggedDays = days.filter(function(d){return d.logged;});
    var n = loggedDays.length || 1;
    var totals = days.reduce(function(a,d){
      a.cal += d.sum.cal; a.prot += d.sum.prot; a.carb += d.sum.carb; a.fat += d.sum.fat; a.water += d.water;
      return a;
    }, {cal:0,prot:0,carb:0,fat:0,water:0});
    var avg = {
      cal: Math.round(totals.cal/n),
      prot: Math.round(totals.prot/n),
      carb: Math.round(totals.carb/n),
      fat: Math.round(totals.fat/n),
      water: Math.round(totals.water/n)
    };

    // Hedef
    var tgt = {cal:2000, prot:120, carb:225, fat:60, water:2000};
    try{
      if(typeof getTodayTargets === 'function'){
        var t = getTodayTargets();
        tgt = {
          cal: t.cal||tgt.cal,
          prot: t.prot||tgt.prot,
          carb: t.carb||tgt.carb,
          fat: t.fat||tgt.fat,
          water: t.water||tgt.water
        };
      }else{
        var pw = parseInt((document.getElementById('pWater')||{}).value);
        if(pw) tgt.water = pw;
      }
    }catch(_){}

    // Hedef tutma
    var calOnTarget = days.filter(function(d){
      if(!d.logged) return false;
      var pct = tgt.cal ? (d.sum.cal/tgt.cal)*100 : 0;
      return pct >= 85 && pct <= 115;
    }).length;
    var waterOnTarget = days.filter(function(d){return d.water >= (tgt.water*0.85);}).length;
    var protOnTarget = days.filter(function(d){
      return d.logged && d.sum.prot >= (tgt.prot*0.85);
    }).length;

    return {
      isoWeek: _isoWeek(end),
      days: days,
      loggedDays: loggedDays.length,
      totals: totals,
      avg: avg,
      target: tgt,
      calOnTarget: calOnTarget,
      waterOnTarget: waterOnTarget,
      protOnTarget: protOnTarget,
      adherence: Math.round((loggedDays.length/7)*100)
    };
  }

  function _suggestions(r){
    var out = [];
    var avgCalPct = r.target.cal ? Math.round((r.avg.cal/r.target.cal)*100) : 0;
    var protPct = r.target.prot ? Math.round((r.avg.prot/r.target.prot)*100) : 0;
    var waterPct = r.target.water ? Math.round((r.avg.water/r.target.water)*100) : 0;

    // Adherence bazlı
    if(r.loggedDays < 4){
      out.push({icon:'📝', title:'Tutarlılık ilk önceliğin', text:'Bu hafta '+r.loggedDays+' gün log tutmuşsun. Hedef en az 5 gün — telefon hatırlatıcılarını kullan, "anlamlı 3 öğün" yeter.'});
    }

    // Kalori
    if(avgCalPct < 85){
      out.push({icon:'⚠️', title:'Kalori düşük', text:'Ortalaman hedefin %'+avgCalPct+'\'i. Aşırı kısıtlama metabolizmanı yavaşlatır. Yarın bir öğüne avokado/kuruyemiş ekle.'});
    } else if(avgCalPct > 115){
      out.push({icon:'⚠️', title:'Kalori fazla', text:'Hedefin %'+avgCalPct+'\'inde gitmişsin. Atıştırmalıkları gözden geçir; tatlı/içecek kalorisi sandığından fazla olabilir.'});
    } else {
      out.push({icon:'✅', title:'Kalori dengen iyi', text:'Hedefin etrafında ('+avgCalPct+'%) gittin. Bu tempoyu koru.'});
    }

    // Protein
    if(protPct < 80){
      out.push({icon:'🥩', title:'Protein az', text:'Günlük ortalama '+r.avg.prot+'g (hedef '+r.target.prot+'g, %'+protPct+'). Yumurta, yoğurt, tavuk, mercimek çorbası ile +20g/gün yakalayabilirsin.'});
    } else if(protPct >= 100){
      out.push({icon:'💪', title:'Protein hedefi tam', text:'Ortalama '+r.avg.prot+'g — kas/açlık kontrolü için ideal. Aynı tempoyu koru.'});
    }

    // Su
    if(waterPct < 75){
      out.push({icon:'💧', title:'Su tüketimi düşük', text:'Günlük ortalama '+r.avg.water+'ml (hedef '+r.target.water+'ml). Kahvaltı yanında 1 bardak + her öğünde 1 bardak alışkanlığı dene.'});
    }

    // Mikro besin uyarısı (basit) — varsa
    try{
      if(typeof MICRO_DB !== 'undefined' && r.loggedDays >= 3){
        // Sadece görsel uyarı — detaylı analiz mevcut Daily Micro modülünde
        out.push({icon:'🍊', title:'Mikro besinleri kontrol et', text:'Profil → mikro besin paneline bak. Bu hafta düşük kalanları sonraki haftaya not olarak al.'});
      }
    }catch(_){}

    // Streak motivasyon
    try{
      if(window.Streaks){
        var cur = window.Streaks.getCurrent();
        if(cur >= 7) out.unshift({icon:'🔥', title:cur+' günlük serideyiz!', text:'Mükemmel disiplin. En zor kısım ilk hafta — onu geçtin. Şimdi alışkanlık moduna geçtin.'});
      }
    }catch(_){}

    return out.slice(0, 5);
  }

  function _renderModal(r){
    var sug = _suggestions(r);
    var bars = r.days.map(function(d){
      var pct = r.target.cal ? Math.min(100, Math.round((d.sum.cal/r.target.cal)*100)) : 0;
      var color = !d.logged ? 'var(--border)' : (pct < 60 ? '#5998f2' : pct > 115 ? '#ff5c5c' : '#3dd68c');
      var h = !d.logged ? 6 : Math.max(8, pct);
      return '<div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1">'+
        '<div style="width:100%;height:80px;display:flex;align-items:flex-end">'+
          '<div title="'+d.label+': '+(d.logged ? Math.round(d.sum.cal)+' kcal' : 'log yok')+'" style="width:100%;background:'+color+';border-radius:5px 5px 2px 2px;height:'+h+'%;transition:height .4s ease;opacity:'+(d.logged?'1':'.5')+'"></div>'+
        '</div>'+
        '<div style="font-size:.62rem;color:var(--text2);font-weight:700">'+d.label+'</div>'+
      '</div>';
    }).join('');

    var sugHTML = sug.map(function(s){
      return '<div style="display:flex;gap:10px;padding:10px;background:var(--glass);border:1px solid var(--border);border-radius:10px;margin-bottom:8px">'+
        '<div style="font-size:1.4rem;flex-shrink:0">'+s.icon+'</div>'+
        '<div style="flex:1"><div style="font-size:.78rem;font-weight:800;margin-bottom:2px">'+s.title+'</div>'+
        '<div style="font-size:.72rem;color:var(--text2);line-height:1.5">'+s.text+'</div></div>'+
      '</div>';
    }).join('');

    return ''+
      '<div style="text-align:center;margin-bottom:12px">'+
        '<div style="font-size:2rem;margin-bottom:2px">📊</div>'+
        '<h2 style="margin:0;font-size:1.1rem;font-weight:800">Haftalık Koç Raporu</h2>'+
        '<div style="font-size:.7rem;color:var(--text2);margin-top:2px">Son 7 gün · '+r.loggedDays+'/7 gün loglandı</div>'+
      '</div>'+

      '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:14px">'+
        '<div style="background:var(--accent-glow);border:1px solid var(--accent);border-radius:10px;padding:8px 4px;text-align:center"><div style="font-size:.62rem;color:var(--text2);font-weight:600">ORT KAL</div><div style="font-size:1rem;font-weight:900;color:var(--accent)">'+r.avg.cal+'</div><div style="font-size:.55rem;color:var(--text2)">/'+r.target.cal+'</div></div>'+
        '<div style="background:rgba(61,214,140,.08);border:1px solid rgba(61,214,140,.3);border-radius:10px;padding:8px 4px;text-align:center"><div style="font-size:.62rem;color:var(--text2);font-weight:600">PROTEİN</div><div style="font-size:1rem;font-weight:900;color:#3dd68c">'+r.avg.prot+'g</div><div style="font-size:.55rem;color:var(--text2)">/'+r.target.prot+'g</div></div>'+
        '<div style="background:rgba(240,192,48,.08);border:1px solid rgba(240,192,48,.3);border-radius:10px;padding:8px 4px;text-align:center"><div style="font-size:.62rem;color:var(--text2);font-weight:600">KARB</div><div style="font-size:1rem;font-weight:900;color:#f0c030">'+r.avg.carb+'g</div><div style="font-size:.55rem;color:var(--text2)">/'+r.target.carb+'g</div></div>'+
        '<div style="background:rgba(89,152,242,.08);border:1px solid rgba(89,152,242,.3);border-radius:10px;padding:8px 4px;text-align:center"><div style="font-size:.62rem;color:var(--text2);font-weight:600">SU (ml)</div><div style="font-size:1rem;font-weight:900;color:#5998f2">'+r.avg.water+'</div><div style="font-size:.55rem;color:var(--text2)">/'+r.target.water+'</div></div>'+
      '</div>'+

      '<div style="background:var(--glass);border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:14px">'+
        '<div style="font-size:.74rem;font-weight:800;margin-bottom:8px;color:var(--text2)">📈 GÜNLÜK KALORİ DAĞILIMI</div>'+
        '<div style="display:flex;gap:6px;align-items:flex-end;height:100px">'+bars+'</div>'+
        '<div style="display:flex;justify-content:space-around;margin-top:8px;font-size:.62rem;color:var(--text2);font-weight:600">'+
          '<span>🟢 Hedefe yakın</span><span>🔵 Düşük</span><span>🔴 Yüksek</span>'+
        '</div>'+
      '</div>'+

      '<div style="font-size:.78rem;font-weight:800;margin-bottom:8px">💡 Bu hafta için öneriler</div>'+
      sugHTML+

      '<div style="text-align:center;margin-top:12px">'+
        '<button onclick="WeeklyCoach.close()" style="padding:11px 28px;background:linear-gradient(135deg,var(--accent),var(--accent2));border:none;border-radius:12px;font-family:var(--font,system-ui);font-size:.85rem;font-weight:800;color:#fff;cursor:pointer">Anladım, Devam ✨</button>'+
      '</div>';
  }

  function open(){
    var r = computeWeek();
    var modal = document.getElementById('weeklyCoachModal');
    if(!modal){
      modal = document.createElement('div');
      modal.id = 'weeklyCoachModal';
      modal.style.cssText = 'position:fixed;inset:0;z-index:9990;background:rgba(0,0,0,.65);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);display:none;align-items:flex-start;justify-content:center;padding:16px;overflow-y:auto';
      modal.innerHTML = '<div style="background:var(--card);border:1.5px solid var(--border);border-radius:16px;max-width:480px;width:100%;padding:18px;box-shadow:0 20px 60px rgba(0,0,0,.4);margin-top:20px;margin-bottom:20px" id="weeklyCoachContent"></div>';
      modal.addEventListener('click', function(e){ if(e.target===modal) close(); });
      document.body.appendChild(modal);
    }
    var content = document.getElementById('weeklyCoachContent');
    if(content) content.innerHTML = _renderModal(r);
    modal.style.display = 'flex';
    // Görüldü olarak işaretle
    try{ localStorage.setItem('fs_weekly_coach_seen', r.isoWeek); }catch(_){}
  }

  function close(){
    var modal = document.getElementById('weeklyCoachModal');
    if(modal) modal.style.display = 'none';
  }

  function maybeAutoShow(){
    try{
      var now = new Date();
      // Profile'da notifWeekly ayarı: 0 kapalı, 1=Pzt, 5=Cum, 7=Pzr
      var wkPref = parseInt(localStorage.getItem('fs_notif_weekly')||(document.getElementById('notifWeekly')||{}).value||'0');
      // Pazar günü 18:00 sonrası otomatik aç (varsayılan)
      var triggerDow = wkPref || 0;  // 0=hiç (kullanıcı kapatmış), 7=Pzr
      if(triggerDow === 0) return;

      var dow = now.getDay() === 0 ? 7 : now.getDay();  // Pzr=7
      if(dow !== triggerDow) return;

      // Aynı haftada birden fazla gösterme
      var thisWeek = _isoWeek(now);
      var seen = localStorage.getItem('fs_weekly_coach_seen');
      if(seen === thisWeek) return;

      // En az 3 gün loglanmış olmalı (anlamsız rapordan kaçın)
      var r = computeWeek(now);
      if(r.loggedDays < 3) return;

      // Saat 18:00 sonrası
      if(now.getHours() < 18) return;

      open();
    }catch(_){}
  }

  function resetSeen(){ try{ localStorage.removeItem('fs_weekly_coach_seen'); }catch(_){} }

  window.WeeklyCoach = {
    open: open,
    close: close,
    computeWeek: computeWeek,
    maybeAutoShow: maybeAutoShow,
    resetSeen: resetSeen
  };

  // Sayfa yüklendiğinde 5 saniye sonra otomatik kontrol
  setTimeout(maybeAutoShow, 5000);
})();
