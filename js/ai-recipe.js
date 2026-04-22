// ╔══════════════════════════════════════════════════════════════════════╗
// ║  FitSofra — AI Tarif Üretici (Unresolved yemekler için)            ║
// ║  Butona tıkla → Gemini malzeme üret → Onayla → Firestore'a kaydet  ║
// ║  Tüm kullanıcılar anında faydalanır (community_recipes).            ║
// ╚══════════════════════════════════════════════════════════════════════╝
(function(){
  'use strict';

  window.COMMUNITY_RECIPES = window.COMMUNITY_RECIPES || [];
  var _loaded = false;
  var _unsub = null;

  // Topluluk tariflerini Firestore'dan çek (gerçek zamanlı)
  function loadCommunityRecipes(){
    if(typeof firebase==='undefined' || !firebase.firestore) return;
    if(_unsub) return; // zaten dinliyor
    var db = firebase.firestore();
    _unsub = db.collection('community_recipes').onSnapshot(function(snap){
      var arr=[];
      snap.forEach(function(doc){
        var d=doc.data();
        if(d && d.name && Array.isArray(d.ingredients) && d.ingredients.length){
          arr.push({
            name: d.name,
            ingredients: d.ingredients,
            emoji: d.emoji || '🍽️',
            category: d.category || '',
            _community: true
          });
        }
      });
      window.COMMUNITY_RECIPES = arr;
      _loaded = true;
      // Açık bir alışveriş listesi varsa yenile
      window.dispatchEvent(new CustomEvent('community-recipes-updated'));
    }, function(err){
      console.warn('community_recipes sync failed:', err);
    });
  }

  // AI ile tarif üret
  function generate(foodName, category, emoji){
    if(typeof firebase==='undefined') return Promise.reject(new Error('Firebase yok'));
    var fn = firebase.functions().httpsCallable('generateRecipeIngredients');
    return fn({foodName:foodName, category:category||'', emoji:emoji||''})
      .then(function(r){ return r.data; });
  }

  // Topluluk tarifine ekle
  function submit(foodName, ingredients, category, emoji){
    if(typeof firebase==='undefined') return Promise.reject(new Error('Firebase yok'));
    var fn = firebase.functions().httpsCallable('submitCommunityRecipe');
    return fn({foodName:foodName, ingredients:ingredients, category:category||'', emoji:emoji||''})
      .then(function(r){ return r.data; });
  }

  // Onay modal'ı göster
  function openPreviewModal(foodName, emoji){
    var existing = document.getElementById('aiRecipeModal');
    if(existing) existing.remove();

    var m = document.createElement('div');
    m.id = 'aiRecipeModal';
    m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(4px)';
    m.innerHTML = ''
      + '<div style="background:var(--card,#1a1a1a);border:1px solid var(--border);border-radius:16px;max-width:460px;width:100%;max-height:85vh;overflow:hidden;display:flex;flex-direction:column;font-family:var(--font,system-ui);color:var(--text)">'
      +   '<div style="padding:16px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px">'
      +     '<span style="font-size:1.4rem">'+(emoji||'🍽️')+'</span>'
      +     '<div style="flex:1;min-width:0"><div style="font-size:.95rem;font-weight:800">'+_esc(foodName)+'</div>'
      +     '<div style="font-size:.66rem;color:var(--text2)">🪄 AI tarifi üretiliyor…</div></div>'
      +     '<button onclick="document.getElementById(\'aiRecipeModal\').remove()" style="background:transparent;border:none;color:var(--text2);font-size:1.3rem;cursor:pointer;padding:4px 8px">×</button>'
      +   '</div>'
      +   '<div id="aiRecipeBody" style="padding:16px 18px;overflow-y:auto;flex:1">'
      +     '<div style="text-align:center;padding:30px 0"><span class="spinner" style="width:22px;height:22px;border-width:3px;display:inline-block"></span><div style="margin-top:12px;font-size:.78rem;color:var(--text2)">Malzemeler hazırlanıyor...</div></div>'
      +   '</div>'
      +   '<div id="aiRecipeFooter" style="padding:12px 18px;border-top:1px solid var(--border);display:flex;gap:8px"></div>'
      + '</div>';
    document.body.appendChild(m);
    return m;
  }

  function _esc(s){ var d=document.createElement('div'); d.textContent=s; return d.innerHTML; }

  function _renderIngredientsForm(ingredients){
    var h='<div style="font-size:.72rem;color:var(--text2);margin-bottom:10px;line-height:1.5">AI şu malzemeleri önerdi. Düzenleyebilir veya silip farklı şekilde ekleyebilirsin. Onayladığında topluluk tarif veritabanına eklenir — başka üyeler de faydalanır.</div>';
    h+='<div id="aiIngList" style="display:flex;flex-direction:column;gap:6px">';
    ingredients.forEach(function(ing,idx){
      h+='<div class="ai-ing-row" style="display:flex;gap:6px;align-items:center;background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:6px 8px">';
      h+='<input type="text" value="'+_esc(ing.item)+'" placeholder="Malzeme" style="flex:2;background:transparent;border:none;font-size:.74rem;font-weight:600;color:var(--text);outline:none;font-family:inherit" data-field="item" data-idx="'+idx+'">';
      h+='<input type="text" value="'+_esc(ing.amount||'')+'" placeholder="Miktar" style="flex:1;background:var(--glass);border:1px solid var(--border);border-radius:6px;padding:4px 6px;font-size:.7rem;color:var(--text);outline:none;font-family:inherit" data-field="amount" data-idx="'+idx+'">';
      h+='<button onclick="this.parentNode.remove()" style="background:transparent;border:none;color:#ff4757;font-size:1rem;cursor:pointer;padding:2px 6px" title="Sil">×</button>';
      h+='</div>';
    });
    h+='</div>';
    h+='<button onclick="_aiRecipeAddRow()" style="margin-top:8px;width:100%;padding:8px;background:var(--glass);border:1px dashed var(--border);border-radius:8px;font-size:.7rem;font-weight:700;cursor:pointer;color:var(--text2);font-family:inherit">+ Malzeme Ekle</button>';
    return h;
  }

  window._aiRecipeAddRow = function(){
    var list=document.getElementById('aiIngList'); if(!list)return;
    var row=document.createElement('div');
    row.className='ai-ing-row';
    row.style.cssText='display:flex;gap:6px;align-items:center;background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:6px 8px';
    row.innerHTML='<input type="text" placeholder="Malzeme" style="flex:2;background:transparent;border:none;font-size:.74rem;font-weight:600;color:var(--text);outline:none;font-family:inherit" data-field="item">'
      +'<input type="text" placeholder="Miktar" style="flex:1;background:var(--glass);border:1px solid var(--border);border-radius:6px;padding:4px 6px;font-size:.7rem;color:var(--text);outline:none;font-family:inherit" data-field="amount">'
      +'<button onclick="this.parentNode.remove()" style="background:transparent;border:none;color:#ff4757;font-size:1rem;cursor:pointer;padding:2px 6px" title="Sil">×</button>';
    list.appendChild(row);
  };

  function _collectIngredients(){
    var rows=document.querySelectorAll('#aiIngList .ai-ing-row');
    var out=[];
    rows.forEach(function(r){
      var item=r.querySelector('[data-field="item"]').value.trim();
      var amount=r.querySelector('[data-field="amount"]').value.trim();
      if(item) out.push({item:item, amount:amount});
    });
    return out;
  }

  // Ana giriş noktası — butona basılınca çağrılır
  function startFlow(foodName, category, emoji, onSuccess){
    var modal = openPreviewModal(foodName, emoji);
    var body = modal.querySelector('#aiRecipeBody');
    var footer = modal.querySelector('#aiRecipeFooter');

    generate(foodName, category, emoji).then(function(result){
      var ings = (result && result.ingredients) || [];
      if(!ings.length){
        body.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text2);font-size:.78rem">⚠️ AI malzeme üretemedi. Manuel olarak ekleyebilirsin.</div>';
        ings = [];
      }
      body.innerHTML = _renderIngredientsForm(ings);
      footer.innerHTML =
        '<button onclick="document.getElementById(\'aiRecipeModal\').remove()" style="flex:1;padding:10px;background:transparent;border:1px solid var(--border);border-radius:10px;font-size:.78rem;font-weight:700;cursor:pointer;color:var(--text);font-family:inherit">İptal</button>'
        + '<button id="aiRecipeSaveBtn" style="flex:2;padding:10px;background:var(--accent);border:none;border-radius:10px;font-size:.78rem;font-weight:800;cursor:pointer;color:#fff;font-family:inherit">✅ Onayla ve Paylaş</button>';
      document.getElementById('aiRecipeSaveBtn').addEventListener('click', function(){
        var items = _collectIngredients();
        if(!items.length){
          if(typeof showToast==='function') showToast('⚠️ En az 1 malzeme ekle');
          return;
        }
        var btn = document.getElementById('aiRecipeSaveBtn');
        btn.disabled = true; btn.textContent = 'Kaydediliyor...';
        submit(foodName, items, category, emoji).then(function(r){
          // Anında local cache'e ekle (onSnapshot da haber verecek ama UI hızlansın)
          var exists = (window.COMMUNITY_RECIPES||[]).some(function(x){return x.name && x.name.toLowerCase()===foodName.toLowerCase();});
          if(!exists){
            window.COMMUNITY_RECIPES = (window.COMMUNITY_RECIPES||[]).concat([{
              name: foodName, ingredients: items, emoji: emoji||'🍽️', category: category||'', _community:true
            }]);
          }
          document.getElementById('aiRecipeModal').remove();
          if(typeof showToast==='function') showToast(r.merged?'✨ Tarif topluluğa eklendi (oy ↑)':'✨ Tarif eklendi! Teşekkürler');
          if(onSuccess) onSuccess(items);
          // Listeleri yenile
          window.dispatchEvent(new CustomEvent('community-recipes-updated'));
        }).catch(function(e){
          btn.disabled = false; btn.textContent = '✅ Onayla ve Paylaş';
          if(typeof showToast==='function') showToast('❌ '+(e.message||'Kaydedilemedi'));
        });
      });
    }).catch(function(err){
      var msg = (err && err.message) || 'AI yanıt veremedi';
      body.innerHTML = '<div style="text-align:center;padding:20px;color:#ff4757;font-size:.78rem">❌ '+_esc(msg)+'</div>'
        +'<div style="text-align:center;color:var(--text2);font-size:.7rem;margin-top:10px">Manuel olarak tarif eklemek istersen admin panelden yapabilirsin.</div>';
      footer.innerHTML = '<button onclick="document.getElementById(\'aiRecipeModal\').remove()" style="flex:1;padding:10px;background:var(--glass);border:1px solid var(--border);border-radius:10px;font-size:.78rem;font-weight:700;cursor:pointer;color:var(--text);font-family:inherit">Kapat</button>';
    });
  }

  window.AIRecipe = {
    loadCommunityRecipes: loadCommunityRecipes,
    startFlow: startFlow,
    generate: generate,
    submit: submit
  };

  // Auth hazır olunca otomatik yükle
  if(typeof firebase!=='undefined' && firebase.auth){
    firebase.auth().onAuthStateChanged(function(u){
      if(u) loadCommunityRecipes();
    });
  } else {
    // Geç yükleme: DOMContentLoaded sonrası dene
    document.addEventListener('DOMContentLoaded', function(){
      if(typeof firebase!=='undefined' && firebase.auth){
        firebase.auth().onAuthStateChanged(function(u){ if(u) loadCommunityRecipes(); });
      }
    });
  }
})();
