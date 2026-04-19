// ╔══════════════════════════════════════════════════════════════════════╗
// ║  FitSofra — Sofra (Aile/Ev paylaşımı) modülü                        ║
// ║  Paylaşımlı haftalık plan + market listesi altyapısı                ║
// ║  Mahremiyet: kilo/kalori/makro ASLA paylaşılmaz                      ║
// ╚══════════════════════════════════════════════════════════════════════╝

(function(){
  var _sofras = [];
  var _activeSofraId = null;

  function _uid(){
    return (typeof auth !== 'undefined' && auth.currentUser) ? auth.currentUser.uid : null;
  }

  function _toast(msg){
    if(typeof showToast === 'function') showToast(msg);
    else console.log('[Sofra]', msg);
  }

  function _esc(s){
    if(typeof escHTML === 'function') return escHTML(String(s));
    return String(s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  async function loadMySofras(){
    var uid = _uid();
    if(!uid || typeof db === 'undefined'){
      _sofras = []; renderSofras(); return;
    }
    try{
      var snap = await db.collection('sofras')
        .where('memberIds','array-contains',uid).get();
      _sofras = snap.docs.map(function(d){
        return Object.assign({id:d.id}, d.data());
      });
      var saved = localStorage.getItem('fs_active_sofra_id');
      _activeSofraId = (saved && _sofras.find(function(s){return s.id===saved;})) ? saved : null;
      renderSofras();
    }catch(e){
      console.warn('[Sofra] yüklenemedi:', e.message);
      _sofras = []; renderSofras();
    }
  }

  async function createSofra(){
    var uid = _uid();
    if(!uid){ _toast('Önce Google ile giriş yap.'); return; }
    var name = (prompt('Sofra adı (örn. Yılmaz Ailesi):','Ailem') || '').trim();
    if(!name) return;
    if(name.length > 40){ _toast('Sofra adı en fazla 40 karakter.'); return; }
    var myName = (auth.currentUser.displayName || auth.currentUser.email || 'Ben').substring(0,30);
    var doc = {
      name: name,
      ownerId: uid,
      memberIds: [uid],
      members: {},
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    doc.members[uid] = { role:'owner', name: myName, joinedAt: Date.now() };
    try{
      var ref = await db.collection('sofras').add(doc);
      _toast('✅ Sofra oluşturuldu: ' + name);
      _activeSofraId = ref.id;
      localStorage.setItem('fs_active_sofra_id', ref.id);
      await loadMySofras();
      window.dispatchEvent(new CustomEvent('sofra:changed',{detail:{sofraId:ref.id}}));
    }catch(e){
      _toast('⚠️ Oluşturulamadı: ' + e.message);
    }
  }

  async function leaveSofra(sofraId){
    var uid = _uid();
    if(!uid) return;
    var s = _sofras.find(function(x){ return x.id === sofraId; });
    if(!s) return;
    var isOwner = s.ownerId === uid;
    var memberCount = (s.memberIds || []).length;
    if(isOwner && memberCount > 1){
      _toast('⚠️ Sahipsin. Önce diğer üyelerle koordine ol.');
      return;
    }
    var msg = (isOwner && memberCount === 1)
      ? '"' + s.name + '" Sofra\'sı silinecek. Emin misin?'
      : '"' + s.name + '" Sofra\'sından ayrılmak istiyor musun?';
    if(!confirm(msg)) return;
    try{
      if(isOwner && memberCount === 1){
        await db.collection('sofras').doc(sofraId).delete();
      }else{
        var updates = {};
        updates.memberIds = firebase.firestore.FieldValue.arrayRemove(uid);
        updates['members.' + uid] = firebase.firestore.FieldValue.delete();
        await db.collection('sofras').doc(sofraId).update(updates);
      }
      if(_activeSofraId === sofraId){
        _activeSofraId = null;
        localStorage.removeItem('fs_active_sofra_id');
        window.dispatchEvent(new CustomEvent('sofra:changed',{detail:{sofraId:null}}));
      }
      _toast('Sofra\'dan ayrıldın.');
      await loadMySofras();
    }catch(e){
      _toast('⚠️ Ayrılınamadı: ' + e.message);
    }
  }

  function _appBaseUrl(){
    // Production + dev ortamını otomatik destekle
    try{
      var o = window.location.origin;
      if(/^https?:\/\//.test(o)) return o;
    }catch(_){}
    return 'https://fitsofra-51176.web.app';
  }

  function _buildInviteMessage(code, sofraName){
    var link = _appBaseUrl() + '/?invite=' + code;
    return '🍽️ "' + sofraName + '" Sofra\'sına davetlisin!\n\n' +
           'FitSofra, ailenle paylaşımlı haftalık yemek planı ve market listesi yapmanı sağlar.\n\n' +
           '📨 Davet Kodu: ' + code + '\n' +
           '🔗 Bağlantı: ' + link + '\n\n' +
           '(Uygulamayı aç → bağlantıya tıkla veya Profil → Sofra → Davete Katıl\'a kodu gir)';
  }

  function _showInviteShareModal(code, sofraName, expiryDate){
    var existing = document.getElementById('sofraShareModal');
    if(existing) existing.remove();
    var msg = _buildInviteMessage(code, sofraName);
    var link = _appBaseUrl() + '/?invite=' + code;
    var modal = document.createElement('div');
    modal.id = 'sofraShareModal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(4px)';
    modal.innerHTML =
      '<div style="background:var(--card);border:1px solid var(--border);border-radius:16px;padding:18px;max-width:380px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.3)">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">' +
          '<h3 style="font-size:1rem;font-weight:900;margin:0">📨 Davet Paylaş</h3>' +
          '<button onclick="document.getElementById(\'sofraShareModal\').remove()" style="background:none;border:none;font-size:1.2rem;color:var(--text2);cursor:pointer">✕</button>' +
        '</div>' +
        '<p style="font-size:.74rem;color:var(--text2);margin-bottom:10px">Sofra: <strong style="color:var(--text)">' + _esc(sofraName) + '</strong></p>' +
        '<div style="background:var(--glass);border:2px dashed var(--accent);border-radius:12px;padding:14px;text-align:center;margin-bottom:12px">' +
          '<div style="font-family:monospace;font-size:1.8rem;font-weight:900;letter-spacing:6px;color:var(--accent)">' + _esc(code) + '</div>' +
          '<div style="font-size:.65rem;color:var(--text2);margin-top:4px">📅 ' + expiryDate.toLocaleDateString('tr-TR') + ' tarihine kadar geçerli</div>' +
        '</div>' +
        '<div id="sofraShareBtns" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px"></div>' +
        '<button onclick="window.Sofra._copyInvite(\'' + _esc(code) + '\')" style="width:100%;padding:10px;background:var(--glass);border:1px solid var(--border);border-radius:10px;font-size:.78rem;font-weight:700;color:var(--text);cursor:pointer;font-family:var(--font,system-ui)">📋 Sadece Kodu Kopyala</button>' +
      '</div>';
    document.body.appendChild(modal);

    var btnsEl = document.getElementById('sofraShareBtns');
    var btns = '';
    // Web Share API (iOS/Android native)
    if(navigator.share){
      btns += '<button onclick="window.Sofra._nativeShare(\'' + _esc(code) + '\',\'' + _esc(sofraName) + '\')" style="padding:12px;background:var(--accent);color:#fff;border:none;border-radius:10px;font-size:.82rem;font-weight:800;cursor:pointer;font-family:var(--font,system-ui);grid-column:span 2">📲 Cihazda Paylaş</button>';
    }
    // WhatsApp
    var waHref = 'https://wa.me/?text=' + encodeURIComponent(msg);
    btns += '<a href="' + waHref + '" target="_blank" rel="noopener" style="padding:10px;background:#25d366;color:#fff;border-radius:10px;font-size:.78rem;font-weight:800;text-decoration:none;text-align:center;font-family:var(--font,system-ui)">💬 WhatsApp</a>';
    // SMS
    var smsHref = 'sms:?&body=' + encodeURIComponent(msg);
    btns += '<a href="' + smsHref + '" style="padding:10px;background:var(--glass);color:var(--text);border:1px solid var(--border);border-radius:10px;font-size:.78rem;font-weight:800;text-decoration:none;text-align:center;font-family:var(--font,system-ui)">📱 SMS</a>';
    btnsEl.innerHTML = btns;

    // Arkaplana tıklayınca kapat
    modal.addEventListener('click', function(e){
      if(e.target === modal) modal.remove();
    });
  }

  async function _copyInviteCode(code){
    try{
      await navigator.clipboard.writeText(code);
      _toast('✅ Kod panoya kopyalandı: ' + code);
    }catch(_){
      _toast('Kod: ' + code);
    }
  }

  async function _nativeShare(code, sofraName){
    try{
      await navigator.share({
        title: 'FitSofra — ' + sofraName,
        text: _buildInviteMessage(code, sofraName),
        url: _appBaseUrl() + '/?invite=' + code
      });
    }catch(_){}
  }

  async function createInvite(sofraId){
    var uid = _uid();
    if(!uid){ _toast('Önce giriş yap.'); return; }
    if(typeof firebase === 'undefined' || !firebase.functions){
      _toast('Firebase Functions yüklenmedi.'); return;
    }
    try{
      var fn = firebase.functions().httpsCallable('createSofraInvite');
      var res = await fn({ sofraId: sofraId });
      var code = res.data.code;
      var expiry = new Date(res.data.expiresAt);
      var sofraName = res.data.sofraName || 'Sofra';
      _showInviteShareModal(code, sofraName, expiry);
    }catch(e){
      var m = (e && e.message) || String(e);
      _toast('⚠️ Davet kodu oluşturulamadı: ' + m);
    }
  }

  async function acceptInvite(){
    var uid = _uid();
    if(!uid){ _toast('Önce Google ile giriş yap.'); return; }
    var inp = document.getElementById('sofraJoinCodeInput');
    var raw = inp ? inp.value : '';
    if(!raw) raw = prompt('Davet kodunu gir (6 karakter):') || '';
    var code = raw.toUpperCase().replace(/[^A-Z0-9]/g,'').substring(0,12);
    if(code.length !== 6){ _toast('⚠️ Kod 6 karakter olmalı.'); return; }
    if(typeof firebase === 'undefined' || !firebase.functions){
      _toast('Firebase Functions yüklenmedi.'); return;
    }
    try{
      var fn = firebase.functions().httpsCallable('acceptSofraInvite');
      var res = await fn({ code: code });
      _toast('✅ "' + (res.data.sofraName || 'Sofra') + '" Sofra\'sına katıldın!');
      if(inp) inp.value = '';
      _activeSofraId = res.data.sofraId;
      localStorage.setItem('fs_active_sofra_id', res.data.sofraId);
      await loadMySofras();
      window.dispatchEvent(new CustomEvent('sofra:changed',{detail:{sofraId:res.data.sofraId}}));
    }catch(e){
      var m = (e && e.message) || String(e);
      _toast('⚠️ Katılınamadı: ' + m);
    }
  }

  function setActiveSofra(sofraId){
    if(sofraId && !_sofras.find(function(s){return s.id===sofraId;})) return;
    _activeSofraId = sofraId || null;
    if(sofraId) localStorage.setItem('fs_active_sofra_id', sofraId);
    else localStorage.removeItem('fs_active_sofra_id');
    renderSofras();
    window.dispatchEvent(new CustomEvent('sofra:changed',{detail:{sofraId:_activeSofraId}}));
    _toast(sofraId ? 'Aktif Sofra değişti.' : 'Kendi planına döndün.');
  }

  function renderSofras(){
    var wrap = document.getElementById('sofraListWrap');
    var loginPrompt = document.getElementById('sofraLoginPrompt');
    var content = document.getElementById('sofraContent');
    if(!wrap || !content || !loginPrompt) return;
    var uid = _uid();
    if(!uid){
      loginPrompt.style.display = 'block';
      content.style.display = 'none';
      return;
    }
    loginPrompt.style.display = 'none';
    content.style.display = 'block';

    if(!_sofras.length){
      wrap.innerHTML = '<p style="font-size:.76rem;color:var(--text2);text-align:center;padding:10px 0">Henüz bir Sofra\'n yok. Ailenle / ev arkadaşlarınla paylaşımlı plan için oluştur.</p>';
      return;
    }

    var html = '';
    _sofras.forEach(function(s){
      var isActive = s.id === _activeSofraId;
      var memberCount = (s.memberIds || []).length;
      var isOwner = s.ownerId === uid;
      var borderColor = isActive ? 'var(--accent)' : 'var(--border)';
      var bg = isActive ? 'var(--accent-glow)' : 'var(--glass)';

      html += '<div style="padding:12px;border:1.5px solid ' + borderColor + ';border-radius:10px;margin-bottom:8px;background:' + bg + '">';
      html += '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px">';
      html += '<div style="flex:1;min-width:0">';
      html += '<div style="font-weight:800;font-size:.88rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">';
      html += _esc(s.name) + (isOwner ? ' 👑' : '');
      html += '</div>';
      html += '<div style="font-size:.7rem;color:var(--text2);margin-top:2px">';
      html += memberCount + ' üye' + (isActive ? ' · <span style="color:var(--accent);font-weight:700">Aktif</span>' : '');
      html += '</div></div>';
      html += '<div style="display:flex;gap:6px;flex-shrink:0">';
      if(!isActive){
        html += '<button onclick="window.Sofra.setActive(\'' + s.id + '\')" style="background:var(--accent);color:#fff;border:none;border-radius:8px;padding:6px 10px;font-size:.72rem;font-weight:700;cursor:pointer;font-family:var(--font,system-ui)">Kullan</button>';
      }else{
        html += '<button onclick="window.Sofra.setActive(null)" style="background:var(--glass);color:var(--text2);border:1px solid var(--border);border-radius:8px;padding:6px 10px;font-size:.72rem;font-weight:700;cursor:pointer;font-family:var(--font,system-ui)">Kapat</button>';
      }
      html += '<button onclick="window.Sofra.createInvite(\'' + s.id + '\')" title="Davet kodu üret" style="background:var(--green);color:#fff;border:none;border-radius:8px;padding:6px 10px;font-size:.72rem;font-weight:700;cursor:pointer;font-family:var(--font,system-ui)">➕ Davet</button>';
      html += '<button onclick="window.Sofra.leave(\'' + s.id + '\')" title="Ayrıl" style="background:var(--glass);color:var(--text2);border:1px solid var(--border);border-radius:8px;padding:6px 8px;font-size:.72rem;cursor:pointer;font-family:var(--font,system-ui)">✕</button>';
      html += '</div></div>';

      if(s.members && typeof s.members === 'object'){
        html += '<div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:4px">';
        Object.keys(s.members).forEach(function(mUid){
          var m = s.members[mUid] || {};
          html += '<span style="font-size:.68rem;padding:3px 8px;background:var(--glass);border:1px solid var(--border);border-radius:12px">';
          html += _esc(m.name || 'Üye') + (m.role === 'owner' ? ' 👑' : '');
          html += '</span>';
        });
        html += '</div>';
      }
      html += '</div>';
    });
    wrap.innerHTML = html;
  }

  // URL'deki ?invite=CODE parametresini yakala
  function _pendingInviteFromUrl(){
    try{
      var params = new URLSearchParams(window.location.search);
      var code = params.get('invite');
      if(code){
        code = code.toUpperCase().replace(/[^A-Z0-9]/g,'').substring(0,12);
        if(code.length === 6) return code;
      }
    }catch(_){}
    return null;
  }

  function _clearInviteFromUrl(){
    try{
      var url = new URL(window.location.href);
      url.searchParams.delete('invite');
      window.history.replaceState({}, document.title, url.pathname + url.search + url.hash);
    }catch(_){}
  }

  async function _tryAutoAcceptFromUrl(){
    var code = _pendingInviteFromUrl();
    if(!code) return;
    // Sofra listesi yüklenmiş olmalı
    await loadMySofras();
    // Banner göster ve otomatik kabul dene
    if(confirm('🍽️ "' + code + '" kodlu Sofra davetini kabul etmek ister misin?')){
      try{
        var fn = firebase.functions().httpsCallable('acceptSofraInvite');
        var res = await fn({ code: code });
        _toast('✅ "' + (res.data.sofraName || 'Sofra') + '" Sofra\'sına katıldın!');
        _activeSofraId = res.data.sofraId;
        localStorage.setItem('fs_active_sofra_id', res.data.sofraId);
        await loadMySofras();
        window.dispatchEvent(new CustomEvent('sofra:changed',{detail:{sofraId:res.data.sofraId}}));
      }catch(e){
        var m = (e && e.message) || String(e);
        _toast('⚠️ Katılınamadı: ' + m);
      }
    }
    _clearInviteFromUrl();
  }

  function _showPendingInviteBanner(code){
    // Giriş yapmamışsa banner göster
    if(document.getElementById('sofraPendingInviteBanner')) return;
    var banner = document.createElement('div');
    banner.id = 'sofraPendingInviteBanner';
    banner.style.cssText = 'position:fixed;top:12px;left:12px;right:12px;z-index:9999;background:var(--accent);color:#fff;padding:12px 14px;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.2);display:flex;align-items:center;gap:10px;font-size:.8rem;font-weight:700';
    banner.innerHTML =
      '<span style="font-size:1.2rem">🍽️</span>' +
      '<div style="flex:1;min-width:0"><div>Sofra daveti: <strong>' + _esc(code) + '</strong></div><div style="font-size:.7rem;font-weight:400;opacity:.9;margin-top:2px">Kabul etmek için Google ile giriş yap</div></div>' +
      '<button onclick="firebaseLogin&&firebaseLogin()" style="background:#fff;color:var(--accent);border:none;border-radius:8px;padding:6px 12px;font-size:.75rem;font-weight:800;cursor:pointer;font-family:var(--font,system-ui)">Giriş</button>' +
      '<button onclick="this.parentNode.remove()" style="background:transparent;border:none;color:#fff;font-size:1rem;cursor:pointer;padding:4px">✕</button>';
    document.body.appendChild(banner);
  }

  // Sofra push bildirim tercihi (users/{uid}.sofraPushDisabled)
  function _loadPushPref(){
    try{
      var u = auth.currentUser; if(!u || typeof db==='undefined') return;
      db.collection('users').doc(u.uid).get().then(function(s){
        var disabled = s.exists && s.data() && s.data().sofraPushDisabled === true;
        var el = document.getElementById('sofraPushToggle');
        if(el) el.checked = !disabled; // Varsayılan: açık
      }).catch(function(){});
    }catch(_){}
  }
  function setPushPref(enabled){
    try{
      var u = auth.currentUser; if(!u || typeof db==='undefined') return;
      db.collection('users').doc(u.uid).set({
        sofraPushDisabled: !enabled
      }, {merge:true}).then(function(){
        if(typeof showToast==='function') showToast(enabled ? '🔔 Sofra bildirimleri açık' : '🔕 Sofra bildirimleri kapalı');
      }).catch(function(e){
        if(typeof showToast==='function') showToast('⚠️ ' + e.message);
      });
    }catch(_){}
  }

  if(typeof auth !== 'undefined'){
    auth.onAuthStateChanged(function(u){
      if(u){
        loadMySofras().then(function(){
          _loadPushPref();
          // URL'de davet kodu varsa otomatik kabul akışını başlat
          if(_pendingInviteFromUrl()){
            _tryAutoAcceptFromUrl();
          }
        });
      }else{
        _sofras = [];
        _activeSofraId = null;
        localStorage.removeItem('fs_active_sofra_id');
        renderSofras();
        // Giriş yapmamış ama URL'de davet varsa banner göster
        var pending = _pendingInviteFromUrl();
        if(pending) _showPendingInviteBanner(pending);
      }
    });
  }

  window.Sofra = {
    create: createSofra,
    leave: leaveSofra,
    setActive: setActiveSofra,
    createInvite: createInvite,
    acceptInvite: acceptInvite,
    getActive: function(){ return _activeSofraId; },
    getAll: function(){ return _sofras.slice(); },
    reload: loadMySofras,
    setPushPref: setPushPref,
    // Internal modal helpers (share modal butonlarından çağrılır)
    _copyInvite: _copyInviteCode,
    _nativeShare: _nativeShare
  };
})();
