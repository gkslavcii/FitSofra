/* FitSofra — Streaks & Badges
 * window.Streaks API:
 *   recordToday()       — bugün için yemek loglandı, streak güncelle
 *   getCurrent()        — aktif streak (gün)
 *   getLongest()        — rekor streak
 *   isAlive()           — streak hala aktif mi (bugün ya da dün loglanmış)
 *   getBadges()         — rozetler (earned + locked)
 *   getEarnedCount()    — kazanılan rozet sayısı
 *   grantBadge(id)      — manuel rozet ver (Sofra katılma vb. için)
 *   renderStreakBadge() — küçük chip HTML
 *   renderBadgesPanel(containerId) — Profile accordion içeriği
 *
 * Storage:
 *   fs_streaks — { current, longest, lastDate, totalDays }
 *   fs_badges  — { badge_id: { at: timestamp } }
 */
(function(){
  'use strict';

  function _key(d){
    d = d || new Date();
    return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  }
  function _yesterdayKey(){
    var x = new Date();
    x.setDate(x.getDate()-1);
    return _key(x);
  }
  function _get(){
    try{
      var raw = localStorage.getItem('fs_streaks');
      var s = raw ? JSON.parse(raw) : null;
      if(!s) s = { current:0, longest:0, lastDate:null, totalDays:0 };
      return s;
    }catch(_){ return { current:0, longest:0, lastDate:null, totalDays:0 }; }
  }
  function _set(s){
    try{ localStorage.setItem('fs_streaks', JSON.stringify(s)); }catch(_){}
  }
  function _getBadges(){
    try{ return JSON.parse(localStorage.getItem('fs_badges')||'{}'); }
    catch(_){ return {}; }
  }
  function _setBadges(b){
    try{ localStorage.setItem('fs_badges', JSON.stringify(b)); }catch(_){}
  }
  function _toast(msg){
    if(typeof showToast === 'function') showToast(msg);
  }

  var BADGES = [
    { id:'first_log',     icon:'🌱',  name:'İlk Adım',         desc:'İlk yemeğini logladın' },
    { id:'streak_3',      icon:'✨',  name:'Üç Günlük',        desc:'3 gün üst üste log' },
    { id:'streak_7',      icon:'🔥',  name:'Bir Haftalık Seri',desc:'7 gün üst üste' },
    { id:'streak_14',     icon:'⚡',  name:'İki Hafta',        desc:'14 gün üst üste' },
    { id:'streak_30',     icon:'🏆',  name:'Aylık Şampiyon',   desc:'30 gün üst üste' },
    { id:'streak_100',    icon:'💯',  name:'Centurion',        desc:'100 gün üst üste' },
    { id:'total_30',      icon:'📅',  name:'Bir Ay Toplam',    desc:'Toplam 30 günlük log' },
    { id:'total_100',     icon:'🎯',  name:'Yüz Gün',          desc:'Toplam 100 günlük log' },
    { id:'sofra_first',   icon:'🍽️',  name:'Sofra Üyesi',      desc:'Bir Sofra\'ya katıldın' },
    { id:'protein_week',  icon:'🥩',  name:'Protein Haftası',  desc:'7 gün protein hedefini tutturdun' },
    { id:'water_week',    icon:'💧',  name:'Su Disiplini',     desc:'7 gün su hedefini tutturdun' },
    { id:'goal_reached',  icon:'🎯',  name:'Hedefe Ulaştım',   desc:'Hedef kiloya ulaştın' },
    { id:'first_export',  icon:'📥',  name:'Veri Yedeği',      desc:'İlk veri yedeği aldın' },
    { id:'first_recipe',  icon:'📖',  name:'Tarif Aşçısı',     desc:'İlk topluluk tarifini paylaştın' },
  ];

  function _grant(id){
    var b = _getBadges();
    if(b[id]) return false;
    b[id] = { at: Date.now() };
    _setBadges(b);
    var def = BADGES.find(function(x){return x.id===id;});
    if(def) _toast('🏅 Yeni Rozet: '+def.icon+' '+def.name);
    return true;
  }

  function _checkAutoBadges(s){
    if(s.totalDays >= 1) _grant('first_log');
    if(s.current >= 3) _grant('streak_3');
    if(s.current >= 7) _grant('streak_7');
    if(s.current >= 14) _grant('streak_14');
    if(s.current >= 30) _grant('streak_30');
    if(s.current >= 100) _grant('streak_100');
    if(s.totalDays >= 30) _grant('total_30');
    if(s.totalDays >= 100) _grant('total_100');
  }

  function recordToday(){
    var today = _key();
    var s = _get();
    if(s.lastDate === today) return s; // zaten bugün kaydedildi

    if(s.lastDate === _yesterdayKey()){
      s.current = (s.current||0) + 1;
    } else {
      s.current = 1; // boşluk var, yeniden başla
    }
    if(s.current > (s.longest||0)) s.longest = s.current;
    s.lastDate = today;
    s.totalDays = (s.totalDays||0) + 1;
    _set(s);

    _checkAutoBadges(s);
    return s;
  }

  function isAlive(){
    var s = _get();
    if(!s.lastDate) return false;
    return s.lastDate === _key() || s.lastDate === _yesterdayKey();
  }

  function getCurrent(){
    var s = _get();
    return isAlive() ? (s.current||0) : 0;
  }
  function getLongest(){ return (_get().longest||0); }
  function getTotalDays(){ return (_get().totalDays||0); }

  function getBadges(){
    var b = _getBadges();
    return BADGES.map(function(def){
      var got = b[def.id];
      return Object.assign({}, def, { earned: !!got, earnedAt: got && got.at });
    });
  }
  function getEarnedCount(){ return Object.keys(_getBadges()).length; }

  function renderStreakBadge(){
    var cur = getCurrent();
    if(cur === 0) return '';
    var icon = cur >= 30 ? '🏆' : (cur >= 7 ? '🔥' : (cur >= 3 ? '✨' : '⭐'));
    var bg = cur >= 30 ? 'linear-gradient(135deg,#ffd700,#ffa500)'
            : (cur >= 7 ? 'linear-gradient(135deg,#ff8c42,#ffa56b)'
            : 'linear-gradient(135deg,#a07cf8,#8b6ce8)');
    return '<button onclick="Streaks.openBadgesPanel()" style="cursor:pointer;display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:14px;background:'+bg+';color:#fff;font-size:.72rem;font-weight:800;border:none;box-shadow:0 3px 10px rgba(0,0,0,.18);font-family:var(--font,system-ui)" title="'+cur+' günlük seri">'+icon+' '+cur+' gün</button>';
  }

  function openBadgesPanel(){
    if(typeof switchTab === 'function') switchTab('profil');
    setTimeout(function(){
      var hdr = document.querySelector('[data-acc-id=badges]');
      if(hdr){
        var body = hdr.nextElementSibling;
        if(body && !body.classList.contains('open')){ try{ hdr.click(); }catch(_){} }
        try{ hdr.scrollIntoView({behavior:'smooth', block:'start'}); }catch(_){}
      }
    }, 250);
  }

  function renderBadgesPanel(){
    var s = _get();
    var alive = isAlive();
    var cur = alive ? (s.current||0) : 0;
    var longest = s.longest||0;
    var total = s.totalDays||0;
    var badges = getBadges();
    var earnedCount = badges.filter(function(b){return b.earned;}).length;

    var streakHTML =
      '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:14px">'+
        '<div style="background:linear-gradient(135deg,var(--accent-glow),rgba(160,124,248,.05));border:1px solid var(--accent);border-radius:10px;padding:10px;text-align:center">'+
          '<div style="font-size:1.5rem">'+(cur>=7?'🔥':cur>=3?'✨':cur>0?'⭐':'⏳')+'</div>'+
          '<div style="font-size:1.2rem;font-weight:900;color:var(--accent);line-height:1">'+cur+'</div>'+
          '<div style="font-size:.62rem;color:var(--text2);font-weight:600;margin-top:2px">AKTİF SERİ</div>'+
        '</div>'+
        '<div style="background:var(--glass);border:1px solid var(--border);border-radius:10px;padding:10px;text-align:center">'+
          '<div style="font-size:1.5rem">🏆</div>'+
          '<div style="font-size:1.2rem;font-weight:900;color:var(--text);line-height:1">'+longest+'</div>'+
          '<div style="font-size:.62rem;color:var(--text2);font-weight:600;margin-top:2px">EN UZUN SERİ</div>'+
        '</div>'+
        '<div style="background:var(--glass);border:1px solid var(--border);border-radius:10px;padding:10px;text-align:center">'+
          '<div style="font-size:1.5rem">📅</div>'+
          '<div style="font-size:1.2rem;font-weight:900;color:var(--text);line-height:1">'+total+'</div>'+
          '<div style="font-size:.62rem;color:var(--text2);font-weight:600;margin-top:2px">TOPLAM GÜN</div>'+
        '</div>'+
      '</div>';

    if(!alive && (s.lastDate)){
      streakHTML += '<div style="background:rgba(255,193,7,.08);border:1px solid rgba(255,193,7,.3);border-radius:10px;padding:8px 12px;margin-bottom:14px;font-size:.72rem;color:var(--text2)">⚠️ Serin koptu — bugün bir yemek logla, yeniden başlasın!</div>';
    }

    var grid = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(95px,1fr));gap:8px">';
    badges.forEach(function(b){
      var styleEarned = 'background:linear-gradient(135deg,#fff4e6,#ffe7d0);border:1.5px solid #ff8c42;color:#333';
      var styleLocked = 'background:var(--glass);border:1px dashed var(--border);color:var(--text2);opacity:.55;filter:grayscale(.4)';
      var s2 = b.earned ? styleEarned : styleLocked;
      var lockOverlay = b.earned ? '' : '<div style="position:absolute;top:4px;right:5px;font-size:.7rem">🔒</div>';
      grid +=
        '<div title="'+b.desc+'" style="position:relative;border-radius:10px;padding:10px 6px 8px;text-align:center;'+s2+'">'+
          lockOverlay+
          '<div style="font-size:1.6rem;margin-bottom:2px">'+b.icon+'</div>'+
          '<div style="font-size:.66rem;font-weight:800;line-height:1.2;margin-bottom:2px">'+b.name+'</div>'+
          '<div style="font-size:.58rem;line-height:1.3;'+(b.earned?'color:#a55c2a':'color:var(--text2)')+'">'+b.desc+'</div>'+
        '</div>';
    });
    grid += '</div>';

    return streakHTML +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">'+
        '<span style="font-size:.78rem;font-weight:700">🏅 Rozetler</span>'+
        '<span style="font-size:.7rem;color:var(--text2)">'+earnedCount+' / '+BADGES.length+' kazanıldı</span>'+
      '</div>'+
      grid;
  }

  // localStorage'dan log geçmişini taraya streak'i ilk açılışta hesapla
  // (eski kullanıcılar için seed)
  function _seedFromHistory(){
    var s = _get();
    if(s.totalDays > 0) return; // zaten seed'lenmiş
    try{
      var keys = Object.keys(localStorage).filter(function(k){return k.indexOf('fs_day_')===0;});
      if(!keys.length) return;
      var dates = [];
      keys.forEach(function(k){
        try{
          var data = JSON.parse(localStorage.getItem(k)||'{}');
          var has = (data.kahvalti||[]).length || (data.ogle||[]).length || (data.aksam||[]).length || (data.atistirmalik||[]).length;
          if(has){ dates.push(k.replace('fs_day_','')); }
        }catch(_){}
      });
      if(!dates.length) return;
      dates.sort();
      var totalDays = dates.length;
      var lastDate = dates[dates.length-1];
      // Bugüne uzanan en uzun ardışık seri
      var current = 0;
      var d = new Date();
      var todayKey = _key(d);
      var checkKey = todayKey;
      // Aktif seri: bugün veya dünden başlayarak geriye doğru ardışık
      var idx = dates.indexOf(todayKey) >= 0 ? todayKey : (dates.indexOf(_yesterdayKey()) >= 0 ? _yesterdayKey() : null);
      if(idx){
        var dt = new Date(idx);
        while(dates.indexOf(_key(dt)) >= 0){
          current++;
          dt.setDate(dt.getDate()-1);
        }
      }
      // En uzun seri
      var longest = 0, run = 1;
      for(var i=1;i<dates.length;i++){
        var prev = new Date(dates[i-1]); prev.setDate(prev.getDate()+1);
        if(_key(prev) === dates[i]) run++;
        else { if(run>longest) longest=run; run=1; }
      }
      if(run>longest) longest=run;

      _set({ current: current, longest: Math.max(longest, current), lastDate: lastDate, totalDays: totalDays });
      _checkAutoBadges(_get());
    }catch(_){}
  }

  // İlk yüklemede seed
  try{ _seedFromHistory(); }catch(_){}

  window.Streaks = {
    recordToday: recordToday,
    isAlive: isAlive,
    getCurrent: getCurrent,
    getLongest: getLongest,
    getTotalDays: getTotalDays,
    getBadges: getBadges,
    getEarnedCount: getEarnedCount,
    grantBadge: _grant,
    renderStreakBadge: renderStreakBadge,
    renderBadgesPanel: renderBadgesPanel,
    openBadgesPanel: openBadgesPanel,
    BADGES: BADGES
  };
})();
