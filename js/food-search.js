// FitSofra — Food Search, Category Modal & Carousel Module
// Extracted from index.html for modularity

// ═══ KATEGORİ SIRALAMA (Firestore'dan okur) ═══
var _cachedCatOrder=null;

async function loadCatOrderFromFirebase(){
  try{
    var doc=await db.collection('settings').doc('cat_order').get();
    if(doc.exists&&doc.data().order){
      _cachedCatOrder=doc.data().order;
      return _cachedCatOrder;
    }
  }catch(e){console.warn('Cat order yüklenemedi:',e);}
  return null;
}

function getOrderedCats(){
  var saved=_cachedCatOrder;
  if(!saved||!saved.length)return RECIPE_CATS.map(function(c){return{id:c.id,visible:true};});
  var ordered=[];
  saved.forEach(function(s){
    var cat=RECIPE_CATS.find(function(c){return c.id===s.id;});
    if(cat)ordered.push({id:s.id,visible:s.visible!==false});
  });
  RECIPE_CATS.forEach(function(c){
    if(!ordered.find(function(o){return o.id===c.id;}))ordered.push({id:c.id,visible:true});
  });
  return ordered;
}

function renderCategoryRows(){
  const container=document.getElementById('recipeCatRows');
  if(!container)return;
  if(!RECIPES.length){
    container.innerHTML='<div style="text-align:center;padding:30px;color:var(--text2);font-size:.82rem">📭 Henüz tarif eklenmemiş</div>';
    return;
  }
  // Kayıtlı sıralama ve görünürlük
  var orderedCats=getOrderedCats();
  let html='';
  orderedCats.forEach(function(o){
    if(!o.visible)return; // gizli kategoriyi atla
    var cat=RECIPE_CATS.find(function(c){return c.id===o.id;});
    if(!cat)return;
    const items=getRecipesForCat(cat);
    if(!items.length)return;
    html+=`<div style="margin-bottom:16px">
      <div onclick="openRecipeCatModal('${cat.id}')" style="display:flex;justify-content:space-between;align-items:center;padding:0 18px 8px;cursor:pointer">
        <div style="font-weight:800;font-size:.88rem">${cat.label}</div>
        <div style="font-size:.72rem;color:var(--accent);font-weight:700">Tümünü Gör ›</div>
      </div>
      <div style="display:flex;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;gap:12px;padding:0 18px;scroll-snap-type:x mandatory" class="cat-row-track">
        ${items.slice(0,10).map(function(r){
          const idx=RECIPES.findIndex(function(x){return(x.id&&x.id===r.id)||x.name===r.name;});
          return `<div onclick="openRecipeDetail(${idx})" style="flex:0 0 85%;scroll-snap-align:start;cursor:pointer;border-radius:14px;overflow:hidden;background:var(--card2);border:1px solid var(--border);transition:transform .2s;-webkit-tap-highlight-color:transparent" >
            ${r.img
              ?`<div style="height:150px;overflow:hidden;position:relative"><img src="${r.img}" style="width:100%;height:100%;object-fit:cover;display:block" loading="lazy" onerror="this.parentElement.innerHTML='<div style=\\'height:150px;display:flex;align-items:center;justify-content:center;font-size:2.5rem;background:var(--glass)\\'>${r.emoji||'🍽️'}</div>'"><div style="position:absolute;bottom:0;left:0;right:0;height:50px;background:linear-gradient(transparent,rgba(0,0,0,.4))"></div></div>`
              :`<div style="height:150px;display:flex;align-items:center;justify-content:center;font-size:2.5rem;background:var(--glass)">${r.emoji||'🍽️'}</div>`
            }
            <div style="padding:10px 12px">
              <div style="font-weight:700;font-size:.85rem;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escHTML(r.name)}</div>
              <div style="display:flex;gap:6px;align-items:center;font-size:.62rem;font-weight:600">
                <span style="color:var(--accent);font-weight:800">${r.cal||'—'} kcal</span>
                <span style="color:var(--text2)">·</span>
                <span style="color:var(--text2)">⏱ ${r.time||'—'}dk</span>
                ${r.prot?`<span style="color:var(--text2)">·</span><span style="color:#ff7a7a">P${r.prot}g</span>`:''}
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  });
  container.innerHTML=html;
}

// ═══ KATEGORİ MODAL ═══
function openRecipeCatModal(catId){
  const cat=RECIPE_CATS.find(function(c){return c.id===catId;});
  if(!cat)return;
  const items=getRecipesForCat(cat);
  if(!items.length)return;
  document.getElementById('catModalTitle').textContent=(cat?cat.label:'📂 Kategori');
  const list=document.getElementById('catModalList');
  list.innerHTML=items.map(function(r){
    const idx=RECIPES.findIndex(function(x){return(x.id&&x.id===r.id)||x.name===r.name;});
    const score=getRecipeScore(r);
    const sColor=getScoreColor(score);
    return `<div onclick="closeRecipeCatModal();openRecipeDetail(${idx})" style="display:flex;align-items:center;gap:10px;padding:10px 4px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .1s" >
      ${r.img
        ?`<div style="width:56px;height:56px;border-radius:10px;overflow:hidden;flex-shrink:0;background:var(--glass)"><img src="${r.img}" style="width:100%;height:100%;object-fit:cover" loading="lazy"></div>`
        :`<div style="width:56px;height:56px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.6rem;background:var(--glass);flex-shrink:0">${r.emoji||'🍽️'}</div>`
      }
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px">
          <span style="font-weight:700;font-size:.84rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escHTML(r.name)}</span>
          <span style="font-size:.56rem;padding:1px 5px;border-radius:5px;background:${sColor}22;color:${sColor};font-weight:700;flex-shrink:0">${score}</span>
        </div>
        <div style="font-size:.68rem;color:var(--text2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escHTML(r.desc||'')}</div>
        <div style="display:flex;gap:4px;font-size:.58rem;font-weight:600;margin-top:2px">
          ${r.prot?`<span style="color:#ff7a7a">P${r.prot}g</span>`:''}
          ${r.carb?`<span style="color:#22d3ee">K${r.carb}g</span>`:''}
          ${r.fat?`<span style="color:#ffcc55">Y${r.fat}g</span>`:''}
        </div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-weight:800;color:var(--accent);font-size:.88rem">${r.cal||'—'}</div>
        <div style="font-size:.56rem;color:var(--text2)">kcal · ${r.time||'—'}dk</div>
      </div>
    </div>`;
  }).join('');
  document.getElementById('recipeCatModal').style.display='flex';
}
function closeRecipeCatModal(){document.getElementById('recipeCatModal').style.display='none'}

// ═══ ARAMA MODAL ═══
function showRecipeSearchMode(){
  document.getElementById('recipeNormalContent').style.display='none';
  document.getElementById('recipeSearchPanel').style.display='block';
  document.getElementById('recipeSearchCloseBtn').style.display='block';
  document.getElementById('recipeSearchInput').style.borderColor='var(--accent)';
  var q=document.getElementById('recipeSearchInput').value.trim();
  if(!q) document.getElementById('recipeSearchResults').innerHTML='<div style="text-align:center;padding:40px 20px;color:var(--text2);font-size:.82rem">Tarif adı yazarak arayın</div>';
}
function hideRecipeSearchMode(){
  document.getElementById('recipeNormalContent').style.display='block';
  document.getElementById('recipeSearchPanel').style.display='none';
  document.getElementById('recipeSearchCloseBtn').style.display='none';
  document.getElementById('recipeSearchInput').value='';
  document.getElementById('recipeSearchInput').blur();
  document.getElementById('recipeSearchInput').style.borderColor='var(--border)';
}

function onRecipeSearch(){
  const q=(document.getElementById('recipeSearchInput').value||'').toLowerCase().trim();
  const container=document.getElementById('recipeSearchResults');
  if(!q||q.length<2){
    container.innerHTML='<div style="text-align:center;padding:30px;color:var(--text2);font-size:.82rem">En az 2 karakter yazın</div>';
    return;
  }
  const results=RECIPES.filter(function(r){
    return r.name.toLowerCase().includes(q)||(r.desc||'').toLowerCase().includes(q)||(r.tags||[]).some(function(t){return t.includes(q)});
  });
  if(!results.length){
    container.innerHTML='<div style="text-align:center;padding:30px;color:var(--text2);font-size:.82rem">Sonuç bulunamadı</div>';
    return;
  }
  container.innerHTML='<div style="font-size:.72rem;color:var(--text2);margin-bottom:8px;font-weight:600">'+results.length+' sonuç</div>'
    +results.map(function(r){
      const idx=RECIPES.findIndex(function(x){return(x.id&&x.id===r.id)||x.name===r.name;});
      const catLabels={fit:'💪',klasik:'🍲',hizli:'⚡',vegan:'🌱',sebze:'🥬',corba:'🍲',tatli:'🍮',hamur:'🍞'};
      return `<div onclick="hideRecipeSearchMode();openRecipeDetail(${idx})" style="display:flex;align-items:center;gap:10px;padding:9px 4px;border-bottom:1px solid var(--border);cursor:pointer">
        ${r.img
          ?`<div style="width:44px;height:44px;border-radius:8px;overflow:hidden;flex-shrink:0"><img src="${r.img}" style="width:100%;height:100%;object-fit:cover" loading="lazy"></div>`
          :`<div style="width:44px;height:44px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;background:var(--glass);flex-shrink:0">${r.emoji||'🍽️'}</div>`
        }
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:.82rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escHTML(r.name)}</div>
          <div style="font-size:.62rem;color:var(--text2)">${catLabels[r.cat]||''} ${r.cal||'—'} kcal · ${r.time||'—'}dk</div>
        </div>
        <div style="font-size:.75rem;color:var(--text2)">›</div>
      </div>`;
    }).join('');
}

// ═══ CAROUSEL RENDER ═══
let _carouselInterval=null;
// Popülerlik sayacı
function getRecipeViews(){
  try{return JSON.parse(localStorage.getItem('fs_recipe_views')||'{}');}catch(e){return {};}
}
function trackRecipeView(name){
  var views=getRecipeViews();
  views[name]=(views[name]||0)+1;
  localStorage.setItem('fs_recipe_views',JSON.stringify(views));
}

function renderRecipeCarousel(recipes){
  const track=document.getElementById('carouselTrack');
  const dots=document.getElementById('carouselDots');
  if(!track||!dots)return;

  const withImg=recipes.filter(r=>r.img);
  if(!withImg.length){
    track.innerHTML='';dots.innerHTML='';
    document.getElementById('recipeCarousel').style.display='none';
    return;
  }
  document.getElementById('recipeCarousel').style.display='block';

  // Popülerliğe göre sırala (en çok görüntülenen önce), sonra karıştır
  const views=getRecipeViews();
  const sorted=[...withImg].sort(function(a,b){return(views[b.name]||0)-(views[a.name]||0);});
  // En popüler 8'i al, eğer görüntülenme yoksa rastgele
  const hasViews=sorted.some(function(r){return(views[r.name]||0)>0;});
  const picked=hasViews?sorted.slice(0,8):[...withImg].sort(()=>Math.random()-.5).slice(0,8);
  const catLabels={fit:'💪 Fit',klasik:'🍲 Klasik',hizli:'⚡ Pratik',vegan:'🌱 Vegan',sebze:'🥬 Sebze',corba:'🍲 Çorba',tatli:'🍮 Tatlı',meze:'🫒 Meze'};

  track.innerHTML=picked.map((r,i)=>{
    const idx=RECIPES.findIndex(x=>(x.id&&x.id===r.id)||x.name===r.name);
    const score=getRecipeScore(r);
    const sColor=getScoreColor(score);
    return `<div class="rc-card" onclick="openRecipeDetail(${idx})">
      <img src="${r.img}" alt="${escHTML(r.name)}" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 200%22><rect fill=%22%23181b23%22 width=%22400%22 height=%22200%22/><text x=%22200%22 y=%22100%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-size=%2260%22>${r.emoji||'🍽️'}</text></svg>'">
      <div class="rc-cat">${catLabels[r.cat]||r.cat}</div>
      <div class="rc-score" style="background:${sColor}44;color:${sColor};border-color:${sColor}55">${score}</div>
      <div class="rc-overlay">
        <div class="rc-title">${escHTML(r.name)}</div>
        <div class="rc-desc">${escHTML(r.desc||'')}</div>
        <div class="rc-chips">
          <span class="rc-chip" style="background:rgba(255,107,61,.7);color:#fff">${r.cal||'—'} kcal</span>
          ${r.prot?`<span class="rc-chip" style="background:rgba(255,122,122,.25);color:#ff7a7a">P${r.prot}g</span>`:''}
          ${r.carb?`<span class="rc-chip" style="background:rgba(34,211,238,.2);color:#22d3ee">K${r.carb}g</span>`:''}
          ${r.fat?`<span class="rc-chip" style="background:rgba(255,204,85,.2);color:#ffcc55">Y${r.fat}g</span>`:''}
          <span class="rc-chip" style="background:rgba(255,255,255,.1);color:#fff">⏱${r.time||'—'}dk</span>
        </div>
      </div>
    </div>`;
  }).join('');

  dots.innerHTML=picked.map((_,i)=>`<div class="c-dot${i===0?' active':''}" onclick="scrollCarouselTo(${i})"></div>`).join('');

  track.onscroll=function(){
    const scrollLeft=track.scrollLeft;
    const cardWidth=track.querySelector('.rc-card')?.offsetWidth||300;
    const activeIdx=Math.round(scrollLeft/(cardWidth+8));
    dots.querySelectorAll('.c-dot').forEach((d,i)=>{d.classList.toggle('active',i===activeIdx)});
  };

  clearInterval(_carouselInterval);
  let autoIdx=0;
  _carouselInterval=setInterval(()=>{
    if(!document.getElementById('page-oneri')?.classList.contains('active'))return;
    autoIdx=(autoIdx+1)%picked.length;
    scrollCarouselTo(autoIdx);
  },4500);
}

function scrollCarouselTo(idx){
  const track=document.getElementById('carouselTrack');
  if(!track)return;
  const card=track.querySelectorAll('.rc-card')[idx];
  if(card){
    const trackRect=track.getBoundingClientRect();
    const cardRect=card.getBoundingClientRect();
    track.scrollTo({left:track.scrollLeft+(cardRect.left-trackRect.left)-(trackRect.width-cardRect.width)/2,behavior:'smooth'});
  }
}

var _openRecipeIdx = -1;
var _recipeScale = 1; // Tarif ölçekleme çarpanı

function _scaleAmount(amountStr, scale) {
  if (!amountStr || scale === 1) return amountStr;
  return amountStr.replace(/(\d+\.?\d*)/g, function(m) {
    var n = parseFloat(m) * scale;
    return n % 1 === 0 ? String(n) : n.toFixed(1).replace(/\.0$/, '');
  });
}

function setRecipeScale(s) {
  _recipeScale = s;
  var r = RECIPES[_openRecipeIdx]; if (!r) return;
  var ingList = r.ingredients || r.ing || [];
  document.getElementById('rdPanelMalz').innerHTML = buildIngredientList(ingList, _recipeScale);
  // Makro güncelle
  var calEl = document.getElementById('rdScaleCal');
  var protEl = document.getElementById('rdScaleProt');
  var carbEl = document.getElementById('rdScaleCarb');
  var fatEl = document.getElementById('rdScaleFat');
  if (calEl) calEl.textContent = Math.round((r.cal || 0) * s);
  if (protEl) protEl.textContent = Math.round((r.prot || 0) * s) + 'g';
  if (carbEl) carbEl.textContent = Math.round((r.carb || 0) * s) + 'g';
  if (fatEl) fatEl.textContent = Math.round((r.fat || 0) * s) + 'g';
  // Yield (kaç porsiyon çıkıyor) güncelle — yieldServings öncelikli
  var servEl = document.getElementById('rdScaleServ');
  if (servEl) {
    var baseY = r.yieldServings || parseFloat(r.serv) || 1;
    var newY = Math.round(baseY * s * 10) / 10;
    servEl.textContent = '👥 ' + (newY % 1 === 0 ? newY.toFixed(0) : newY.toFixed(1)) + ' porsiyon';
  }
  // Buton aktifliği
  document.querySelectorAll('.scale-btn').forEach(function(b) {
    b.style.background = parseFloat(b.dataset.s) === s ? 'var(--accent)' : 'var(--glass)';
    b.style.color = parseFloat(b.dataset.s) === s ? '#fff' : 'var(--text2)';
  });
}

function openRecipeDetail(idx){
  const r=RECIPES[idx];if(!r)return;
  _openRecipeIdx=idx;
  _recipeScale=1;
  trackRecipeView(r.name);
  const score=getRecipeScore(r);
  const sColor=getScoreColor(score);
  const sLabel=getScoreLabel(score);
  const catLabels={fit:'💪 Fit',klasik:'🍲 Klasik',hizli:'⚡ Pratik',vegan:'🌱 Vegan',sebze:'🥬 Sebze',corba:'🍲 Çorba',tatli:'🍮 Tatlı',meze:'🫒 Meze'};
  const tags=(r.tags||[]).map(t=>({kolay:'⭐ Kolay',hizli:'⚡ Pratik',vejetaryen:'🌿 Vejetaryen',vegan:'🌱 Vegan',proteinli:'💪 Proteinli',ekonomik:'💰 Ekonomik',saglikli:'✅ Sağlıklı'}[t]||t)).join(' · ');
  const ingList = r.ingredients || r.ing || [];

  // Tarif yield bilgisi: kaç porsiyon çıkıyor + per-porsiyon ifadesi
  // r.yieldServings varsa onu kullan, yoksa serv string'inden çıkar
  const yieldN = r.yieldServings || parseFloat(r.serv) || 1;
  const yieldLabel = yieldN > 1
    ? yieldN + ' porsiyon'
    : (r.serv || '1 porsiyon');

  // Makro bar yüzdeleri
  const totalMacroCal=((r.prot||0)*4)+((r.carb||0)*4)+((r.fat||0)*9);
  const pPct=totalMacroCal>0?Math.round(((r.prot||0)*4/totalMacroCal)*100):0;
  const cPct=totalMacroCal>0?Math.round(((r.carb||0)*4/totalMacroCal)*100):0;
  const fPct=totalMacroCal>0?Math.round(((r.fat||0)*9/totalMacroCal)*100):0;

  // Favori kontrolü
  var favs=JSON.parse(localStorage.getItem('fs_fav_foods')||'[]');
  var isFav=favs.indexOf(r.name)>=0;

  const html=`<div class="modal-handle"></div>
    ${r.img?`<div style="margin:-16px -20px 14px;border-radius:26px 26px 0 0;overflow:hidden;max-height:200px;cursor:pointer;position:relative" onclick="openRecipePhoto('${r.img.replace(/'/g,"\\'")}')">
      <img src="${r.img}" alt="${escHTML(r.name)}" style="width:100%;height:200px;object-fit:cover;display:block" onerror="this.parentElement.style.display='none'">
      <div style="position:absolute;bottom:0;left:0;right:0;height:60px;background:linear-gradient(transparent,var(--card))"></div>
      <div style="position:absolute;bottom:8px;right:12px;font-size:.62rem;background:rgba(0,0,0,.5);color:#fff;padding:3px 8px;border-radius:6px;backdrop-filter:blur(4px)">🔍 Büyüt</div>
    </div>`:''}
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
      <div style="font-size:${r.img?'1.4rem':'2.4rem'}">${r.emoji||'🍽️'}</div>
      <div style="flex:1;min-width:0">
        <h2 style="font-size:1rem;margin-bottom:3px">${escHTML(r.name)}</h2>
        <div style="font-size:.72rem;color:var(--text2)">${escHTML(r.desc||'')}</div>
        ${tags?`<div style="font-size:.64rem;color:var(--text2);margin-top:3px">${tags}</div>`:''}
      </div>
      <button onclick="toggleFavFood('${escHTML(r.name)}',this)" style="background:none;border:none;font-size:1.4rem;cursor:pointer;padding:4px;flex-shrink:0" title="Favorilere ekle">${isFav?'❤️':'🤍'}</button>
    </div>

    <!-- Skor ve özet bilgiler -->
    <div style="display:flex;gap:8px;margin-bottom:12px;align-items:stretch">
      <div style="flex-shrink:0;width:60px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:${sColor}15;border:1.5px solid ${sColor}33;border-radius:12px;padding:8px 4px">
        <div style="font-size:1.3rem;font-weight:900;color:${sColor}">${score}</div>
        <div style="font-size:.55rem;font-weight:700;color:${sColor};text-transform:uppercase">${sLabel}</div>
      </div>
      <div style="flex:1;display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">
        <div style="text-align:center;padding:8px 4px;background:var(--glass);border-radius:10px;border:1px solid var(--border)">
          <div id="rdScaleCal" style="font-weight:800;color:var(--accent);font-size:.95rem">${r.cal||'—'}</div>
          <div style="font-size:.56rem;color:var(--text2);font-weight:600">kcal</div>
        </div>
        <div style="text-align:center;padding:8px 4px;background:var(--glass);border-radius:10px;border:1px solid var(--border)">
          <div style="font-weight:800;color:var(--text);font-size:.95rem">⏱ ${r.time||'—'}</div>
          <div style="font-size:.56rem;color:var(--text2);font-weight:600">dakika</div>
        </div>
        <div style="text-align:center;padding:8px 4px;background:var(--glass);border-radius:10px;border:1px solid var(--border)">
          <div id="rdScaleServ" style="font-weight:800;color:var(--text);font-size:.95rem">👥 ${yieldLabel}</div>
          <div style="font-size:.56rem;color:var(--text2);font-weight:600">tarif çıktısı</div>
        </div>
      </div>
    </div>
    ${yieldN>1?`<div style="margin:-4px 0 12px;padding:8px 12px;background:var(--accent-glow);border:1px solid var(--accent);border-radius:10px;font-size:.7rem;color:var(--text);display:flex;align-items:center;gap:8px">
      <span style="font-size:1rem">📊</span>
      <span><b>${r.cal||0} kcal</b> = <b>1 porsiyon</b> · Tarif toplam <b>${yieldN} porsiyon</b> çıkarır (${Math.round((r.cal||0)*yieldN)} kcal toplam)</span>
    </div>`:''}

    <!-- Ölçekleme -->
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:12px;background:var(--glass);border:1px solid var(--border);border-radius:10px;padding:8px 10px">
      <span style="font-size:.72rem;font-weight:700;color:var(--text2);flex-shrink:0">📐 Porsiyon:</span>
      <div style="display:flex;gap:4px;flex:1;justify-content:center">
        ${[0.5,1,2,3,4].map(function(s){return '<button class="scale-btn" data-s="'+s+'" onclick="setRecipeScale('+s+')" style="padding:5px 10px;border-radius:8px;border:1px solid var(--border);font-size:.72rem;font-weight:700;cursor:pointer;font-family:var(--font,system-ui);transition:all .2s;'+(s===1?'background:var(--accent);color:#fff':'background:var(--glass);color:var(--text2)')+'">'+s+'x</button>';}).join('')}
      </div>
    </div>

    <!-- Makro barlar -->
    <div style="background:var(--glass);border:1px solid var(--border);border-radius:10px;padding:10px 12px;margin-bottom:14px">
      <div style="display:flex;height:8px;border-radius:4px;overflow:hidden;margin-bottom:8px;background:rgba(255,255,255,.05)">
        <div style="width:${pPct}%;background:#ff7a7a;transition:width .5s"></div>
        <div style="width:${cPct}%;background:#22d3ee;transition:width .5s"></div>
        <div style="width:${fPct}%;background:#ffcc55;transition:width .5s"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:.7rem;font-weight:700">
        <span style="color:#ff7a7a">P <span id="rdScaleProt">${r.prot||0}g</span> <span style="opacity:.6;font-size:.6rem">${pPct}%</span></span>
        <span style="color:#22d3ee">K <span id="rdScaleCarb">${r.carb||0}g</span> <span style="opacity:.6;font-size:.6rem">${cPct}%</span></span>
        <span style="color:#ffcc55">Y <span id="rdScaleFat">${r.fat||0}g</span> <span style="opacity:.6;font-size:.6rem">${fPct}%</span></span>
      </div>
    </div>

    <!-- Sekmeler -->
    <div style="display:flex;background:var(--glass);border-radius:10px;padding:3px;border:1px solid var(--border);margin-bottom:12px">
      <button id="rdTabMalz" onclick="switchRecipeTab('malz')" style="flex:1;padding:8px;border-radius:8px;border:none;font-family:var(--font,system-ui);font-size:.78rem;font-weight:700;cursor:pointer;background:var(--accent);color:#fff;transition:all .2s">🧾 Malzemeler</button>
      <button id="rdTabYap" onclick="switchRecipeTab('yap')" style="flex:1;padding:8px;border-radius:8px;border:none;font-family:var(--font,system-ui);font-size:.78rem;font-weight:700;cursor:pointer;background:transparent;color:var(--text2);transition:all .2s">👩‍🍳 Yapılışı</button>
    </div>

    <!-- Malzemeler paneli -->
    <div id="rdPanelMalz" style="margin-bottom:14px">
      ${buildIngredientList(ingList, 1)}
    </div>

    <!-- Yapılış paneli -->
    <div id="rdPanelYap" style="display:none;margin-bottom:14px">
      ${buildStepsList(r.steps||[])}
    </div>

    <!-- Butonlar -->
    <div style="display:flex;gap:8px;margin-top:4px">
      <button style="flex:1;padding:12px;background:linear-gradient(135deg,var(--green),#50e0a0);color:#fff;border:none;border-radius:10px;font-family:var(--font,system-ui);font-weight:800;font-size:.84rem;cursor:pointer" onclick="addRecipeToMeal(${idx})">✅ Öğüne Ekle</button>
      <button style="padding:12px 16px;background:var(--glass);border:1px solid var(--border);border-radius:10px;font-family:var(--font,system-ui);font-weight:700;font-size:.84rem;color:var(--text2);cursor:pointer" onclick="document.getElementById('recipeDetailModal').classList.remove('show')">✕</button>
    </div>`;
  document.getElementById('recipeDetailContent').innerHTML=html;
  document.getElementById('recipeDetailModal').classList.add('show');
}

function openRecipePhoto(url){
  var lb=document.getElementById('photoLightbox');
  var img=document.getElementById('lightboxImg');
  if(!lb||!img)return;
  img.src=url;
  lb.style.display='flex';
  document.body.style.overflow='hidden';
}
function closeRecipePhoto(){
  var lb=document.getElementById('photoLightbox');
  if(!lb)return;
  lb.style.display='none';
  document.body.style.overflow='';
}

function switchRecipeTab(tab){
  var isMalz=tab==='malz';
  document.getElementById('rdPanelMalz').style.display=isMalz?'block':'none';
  document.getElementById('rdPanelYap').style.display=isMalz?'none':'block';
  var bm=document.getElementById('rdTabMalz');
  var by=document.getElementById('rdTabYap');
  if(bm){bm.style.background=isMalz?'var(--accent)':'transparent';bm.style.color=isMalz?'#fff':'var(--text2)';}
  if(by){by.style.background=isMalz?'transparent':'var(--accent)';by.style.color=isMalz?'var(--text2)':'#fff';}
}

function buildStepsList(steps){
  if(!steps||!steps.length) return '<div style="color:var(--text2);font-size:.8rem;text-align:center;padding:16px">Yapılış bilgisi henüz eklenmemiş</div>';
  const totalSteps=steps.length;
  return '<div style="display:flex;flex-direction:column;gap:6px;position:relative">'
    // Sol tarafta bağlantı çizgisi
    +steps.map(function(s,i){
      const isLast=i===totalSteps-1;
      // Adım metnindeki ipuçlarını algıla
      const lower=(typeof s==='string'?s:String(s)).toLowerCase();
      let icon='🔪';
      if(lower.includes('kaynat')||lower.includes('haşla')||lower.includes('su '))icon='♨️';
      else if(lower.includes('kavur')||lower.includes('kızart')||lower.includes('sotele')||lower.includes('ateş'))icon='🍳';
      else if(lower.includes('fırın')||lower.includes('pişir'))icon='🔥';
      else if(lower.includes('karıştır')||lower.includes('çırp')||lower.includes('yoğur'))icon='🥄';
      else if(lower.includes('doğra')||lower.includes('kes')||lower.includes('dilimle')||lower.includes('rendeele'))icon='🔪';
      else if(lower.includes('servis')||lower.includes('süsle')||lower.includes('tabağa'))icon='🍽️';
      else if(lower.includes('soğu')||lower.includes('dinlen')||lower.includes('bekle'))icon='⏳';
      else if(lower.includes('ekle')||lower.includes('koy')||lower.includes('ilave'))icon='➕';
      // Süre ipucu
      const timeMatch=(typeof s==='string'?s:'').match(/(\d+)\s*(dk|dakika|saat|saniye)/i);
      const timeHint=timeMatch?'<span style="display:inline-flex;align-items:center;gap:3px;margin-top:4px;font-size:.65rem;padding:2px 7px;border-radius:6px;background:rgba(255,107,61,.08);color:var(--accent);font-weight:600">⏱ '+timeMatch[0]+'</span>':'';
      return '<div style="display:flex;gap:10px;padding:10px 12px;background:var(--glass);border-radius:12px;border:1px solid var(--border);position:relative">'
        +'<div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex-shrink:0">'
          +'<div style="background:var(--accent);color:#fff;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.68rem;font-weight:800;box-shadow:0 2px 6px rgba(255,107,61,.25)">'+(i+1)+'</div>'
          +'<div style="font-size:.85rem">'+icon+'</div>'
        +'</div>'
        +'<div style="flex:1;min-width:0">'
          +'<div style="font-size:.8rem;line-height:1.55;color:var(--text)">'+s+'</div>'
          +timeHint
        +'</div>'
      +'</div>';
    }).join('')
  +'</div>';
}

function buildIngredientList(ing, scale){
  if(!ing||!ing.length) return '<div style="color:var(--text2);font-size:.8rem">Malzeme bilgisi yok</div>';
  var s=scale||1;
  return '<div style="display:flex;flex-direction:column;gap:4px">'+ing.map(function(item){
    var ingName,ingAmount;
    if(typeof item==='string'){ingName=item;ingAmount='';}
    else if(item.item){ingName=item.item;ingAmount=item.amount||'';}
    else{ingName=item.name||'';ingAmount=item.amount||'';}
    var scaledAmt=ingAmount&&s!==1?_scaleAmount(ingAmount,s):ingAmount;
    return '<div style="display:flex;align-items:center;gap:8px;padding:7px 10px;background:var(--glass);border-radius:8px;border:1px solid var(--border)">'
      +'<span style="color:var(--accent);font-size:.9rem;flex-shrink:0">•</span>'
      +'<span style="font-size:.8rem;flex:1">'+escHTML(ingName)+'</span>'
      +(scaledAmt?'<span style="font-size:.7rem;color:var(--text2);font-weight:600;flex-shrink:0">'+escHTML(scaledAmt)+'</span>':'')
      +'</div>';
  }).join('')+'</div>';
}

// ══════════════════════════════════════════════════════════════════
//  FAVORİ YEMEKLERİ SİSTEMİ
// ══════════════════════════════════════════════════════════════════
function toggleFavFood(name, btn){
  var favs=JSON.parse(localStorage.getItem('fs_fav_foods')||'[]');
  var idx=favs.indexOf(name);
  if(idx>=0){favs.splice(idx,1);if(btn)btn.textContent='🤍';if(typeof showToast==='function')showToast('💔 Favorilerden çıkarıldı');}
  else{favs.push(name);if(btn)btn.textContent='❤️';if(typeof showToast==='function')showToast('❤️ Favorilere eklendi');}
  localStorage.setItem('fs_fav_foods',JSON.stringify(favs));
}
function isFavFood(name){
  var favs=JSON.parse(localStorage.getItem('fs_fav_foods')||'[]');
  return favs.indexOf(name)>=0;
}
function getFavFoods(){return JSON.parse(localStorage.getItem('fs_fav_foods')||'[]');}
function generateFriendCode(uid){

  return uid.slice(0,4).toUpperCase()+'-'+uid.slice(4,8).toUpperCase();
}

function renderFriendsPage(){
  if(!currentUser){
    document.getElementById('friendsLoginPrompt').style.display='block';
    document.getElementById('friendsContent').style.display='none';
    return;
  }
  document.getElementById('friendsLoginPrompt').style.display='none';
  document.getElementById('friendsContent').style.display='block';

  const code=generateFriendCode(currentUser.uid);
  document.getElementById('myFriendCode').textContent=code;

  updateMyPublicProfile();
  loadFriendsList();
}

function copyFriendCode(){
  const code=document.getElementById('myFriendCode').textContent;
  navigator.clipboard.writeText(code).then(()=>showToast('📋 Kod kopyalandı: '+code)).catch(()=>{

    const ta=document.createElement('textarea');ta.value=code;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);
    showToast('📋 Kod kopyalandı: '+code);
  });
}

async function updateMyPublicProfile(){
  if(!currentUser)return;
  try{
    const t=getTotals();
    const waterMl=getWaterMl();
    const weightLog=getWeightLog();
    const streak=calculateStreak();
    const _tgt=getTodayTargets();

    await db.collection('profiles').doc(currentUser.uid).set({
      name:escHTML(currentUser.displayName)||'Kullanıcı',
      photo:currentUser.photoURL||'',
      code:generateFriendCode(currentUser.uid),
      todayCal:t.cal,
      todayTarget:_tgt.cal,
      todayProt:Math.round(t.prot),
      todayCarb:Math.round(t.carb),
      todayFat:Math.round(t.fat),
      protTarget:_tgt.prot,
      carbTarget:_tgt.carb,
      fatTarget:_tgt.fat,
      todayWater:waterMl,
      waterTarget:_tgt.water,
      currentWeight:weightLog.length?weightLog[weightLog.length-1].weight:null,
      streak,
      mealCount:Object.values(getDayData(dateKey(new Date()))).filter(function(f){return f.length>0;}).length,
      lastActive:Date.now()
    },{merge:true});
  }catch(e){}
}

function calculateStreak(){
  let streak=0;
  const today=new Date();
  for(let i=0;i<365;i++){
    const d=new Date(today);
    d.setDate(d.getDate()-i);
    const dk=dateKey(d);
    const data=getDayData(dk);
    const hasFoods=Object.values(data).some(f=>f.length>0);
    if(hasFoods)streak++;
    else break;
  }
  return streak;
}

async function addFriend(){
  if(!currentUser){showToast('⚠️ Önce giriş yapın');return}
  const code=document.getElementById('friendCodeInput').value.trim().toUpperCase();
  if(!code){showToast('⚠️ Arkadaş kodu girin');return}
  if(code===generateFriendCode(currentUser.uid)){showToast('⚠️ Kendi kodunuzu ekleyemezsiniz');return}

  try{

    const q=await db.collection('profiles').where('code','==',code).limit(1).get();
    if(q.empty){showToast('❌ Bu kodla kullanıcı bulunamadı');return}

    const friendDoc=q.docs[0];
    const friendUid=friendDoc.id;
    const friendData=friendDoc.data();


    const existing=await db.collection('profiles').doc(currentUser.uid).collection('friends').doc(friendUid).get();
    if(existing.exists){showToast('ℹ️ Bu kişi zaten arkadaş listenizde');return}


    await db.collection('profiles').doc(currentUser.uid).collection('friends').doc(friendUid).set({
      name:friendData.name,
      addedAt:Date.now()
    });
    await db.collection('profiles').doc(friendUid).collection('friends').doc(currentUser.uid).set({
      name:escHTML(currentUser.displayName)||'Kullanıcı',
      addedAt:Date.now()
    });

    document.getElementById('friendCodeInput').value='';
    showToast(`✅ ${friendData.name} arkadaş olarak eklendi!`);
    loadFriendsList();
  }catch(e){
    showToast('⚠️ Hata: '+e.message);
  }
}

async function loadFriendsList(){
  if(!currentUser)return;
  const listEl=document.getElementById('friendsList');
  const lbEl=document.getElementById('leaderboard');

  try{
    const friendsSnap=await db.collection('profiles').doc(currentUser.uid).collection('friends').get();

    if(friendsSnap.empty){
      listEl.innerHTML='<div style="text-align:center;padding:16px;color:var(--text2);font-size:.82rem">Henüz arkadaş eklenmemiş.<br>Kodunu paylaş ve arkadaşlarını ekle!</div>';
      lbEl.innerHTML='<div style="text-align:center;padding:16px;color:var(--text2);font-size:.82rem">Arkadaş ekleyince sıralama görünecek.</div>';
      return;
    }


    const friendIds=friendsSnap.docs.map(d=>d.id);
    const profiles=[];

    for(const fid of friendIds){
      try{
        const pDoc=await db.collection('profiles').doc(fid).get();
        if(pDoc.exists)profiles.push({uid:fid,...pDoc.data()});
      }catch(e){}
    }


    const t=getTotals();
    const myStreak=calculateStreak();
    profiles.push({
      uid:currentUser.uid,
      name:(currentUser.displayName||'Ben')+' (Sen)',
      photo:currentUser.photoURL,
      todayCal:t.cal,
      todayTarget:dailyTarget,
      todayProt:Math.round(t.prot),
      todayWater:getWaterMl(),
      waterTarget:waterTarget,
      streak:myStreak,
      isMe:true
    });


    listEl.innerHTML=profiles.filter(p=>!p.isMe).map(p=>{
      const calPct=p.todayTarget?Math.round((p.todayCal/p.todayTarget)*100):0;
      const waterPct=p.waterTarget?Math.round((p.todayWater/p.waterTarget)*100):0;
      const initial=(p.name||'?')[0].toUpperCase();
      const isOnline=(Date.now()-(p.lastActive||0))<3600000;
      return`<div class="friend-card" onclick="openFriendProfile('${p.uid}')" style="cursor:pointer">
        <div class="friend-header">
          ${p.photo?`<img src="${p.photo}" style="width:36px;height:36px;border-radius:50%">`:`<div class="friend-avatar">${initial}</div>`}
          <div><div class="friend-name">${p.name}</div><div class="friend-status">${isOnline?'🟢 Aktif':'⚪ '+getTimeAgo(p.lastActive||0)}</div></div>
        </div>
        <div class="friend-stats">
          <div class="friend-stat"><div class="fs-val" style="color:var(--accent)">${p.todayCal||0}</div><div class="fs-label">kcal (${calPct}%)</div></div>
          <div class="friend-stat"><div class="fs-val" style="color:#22d3ee">${p.todayWater||0}ml</div><div class="fs-label">su (${waterPct}%)</div></div>
          <div class="friend-stat"><div class="fs-val" style="color:var(--green)">${p.todayProt||0}g</div><div class="fs-label">protein</div></div>
          <div class="friend-stat"><div class="fs-val" style="color:var(--orange)">🔥${p.streak||0}</div><div class="fs-label">gün seri</div></div>
        </div>
        <div class="friend-actions">
          <button class="saved-meal-btn delete" style="font-size:.72rem" onclick="event.stopPropagation();removeFriend('${p.uid}','${(p.name||'').replace(/'/g,"\\'")}')">Çıkar</button>
        </div>
      </div>`;
    }).join('')||'<div style="text-align:center;padding:16px;color:var(--text2);font-size:.82rem">Arkadaş bulunamadı</div>';


    const sorted=[...profiles].sort((a,b)=>{
      const aAdh=a.todayTarget?Math.abs(1-a.todayCal/a.todayTarget):1;
      const bAdh=b.todayTarget?Math.abs(1-b.todayCal/b.todayTarget):1;
      return aAdh-bAdh;
    });

    const medals=['🥇','🥈','🥉'];
    lbEl.innerHTML=sorted.map((p,i)=>{
      const calPct=p.todayTarget?Math.round((p.todayCal/p.todayTarget)*100):0;
      return`<div class="lb-row" ${p.isMe?'style="background:rgba(255,107,61,.06);border-radius:8px;padding:10px"':''}>
        <div class="lb-rank">${medals[i]||i+1}</div>
        <div class="lb-info"><div class="lb-name">${p.name}</div><div class="lb-detail">🔥${p.streak||0} gün seri · ${calPct}% hedefe uyum</div></div>
        <div class="lb-val">${p.todayCal||0} kcal</div>
      </div>`;
    }).join('');

  }catch(e){
    listEl.innerHTML=`<div style="padding:12px;color:var(--red);font-size:.82rem">⚠️ Yüklenirken hata: ${e.message}</div>`;
  }
}

async function removeFriend(friendUid,friendName){
  if(!confirm(`${friendName} arkadaş listenizden çıkarılsın mı?`))return;
  try{
    await db.collection('profiles').doc(currentUser.uid).collection('friends').doc(friendUid).delete();
    await db.collection('profiles').doc(friendUid).collection('friends').doc(currentUser.uid).delete();
    showToast(`👋 ${friendName} çıkarıldı`);
    loadFriendsList();
  }catch(e){showToast('⚠️ Hata: '+e.message)}
}

async function openFriendProfile(uid){
  try{
    var doc=await db.collection('profiles').doc(uid).get();
    if(!doc.exists){showToast('Profil bulunamadı');return;}
    var p=doc.data();
    var isOnline=(Date.now()-(p.lastActive||0))<3600000;
    var calPct=p.todayTarget?Math.min(100,Math.round((p.todayCal/p.todayTarget)*100)):0;
    var waterPct=p.waterTarget?Math.min(100,Math.round((p.todayWater/p.waterTarget)*100)):0;
    var protPct=p.protTarget?Math.min(100,Math.round((p.todayProt/p.protTarget)*100)):0;
    var carbPct=p.carbTarget?Math.min(100,Math.round((p.todayCarb||0)/(p.carbTarget||1)*100)):0;
    var fatPct=p.fatTarget?Math.min(100,Math.round((p.todayFat||0)/(p.fatTarget||1)*100)):0;
    var ringDash=Math.round((calPct/100)*283);
    var ringColor=calPct>100?'var(--red)':calPct>=80?'var(--green)':'var(--accent)';
    var initial=(p.name||'?')[0].toUpperCase();

    var html='<div class="modal-overlay show" id="friendProfileModal" onclick="if(event.target===this)this.remove()" style="z-index:180">'
      +'<div class="modal-content" style="width:100%"><div class="modal" style="max-height:92vh;padding:20px">'
      +'<div class="modal-handle"></div>'
      // Header
      +'<div style="display:flex;align-items:center;gap:14px;margin-bottom:16px">'
      +(p.photo?'<img src="'+p.photo+'" style="width:52px;height:52px;border-radius:50%;border:2.5px solid '+ringColor+'">':'<div style="width:52px;height:52px;border-radius:50%;background:var(--accent-glow);display:flex;align-items:center;justify-content:center;font-size:1.3rem;font-weight:800;color:var(--accent);border:2.5px solid '+ringColor+'">'+initial+'</div>')
      +'<div style="flex:1"><div style="font-weight:800;font-size:1rem">'+escHTML(p.name)+'</div>'
      +'<div style="font-size:.72rem;color:var(--text2)">'+(isOnline?'🟢 Şu an aktif':'⚪ Son: '+getTimeAgo(p.lastActive||0))+'</div>'
      +'<div style="font-size:.68rem;color:var(--orange);font-weight:700;margin-top:2px">🔥 '+( p.streak||0)+' gün seri</div></div>'
      +'<button onclick="this.closest(\'.modal-overlay\').remove()" style="background:var(--glass);border:1px solid var(--border);border-radius:10px;padding:5px 12px;font-size:.75rem;font-weight:700;color:var(--text2);cursor:pointer">Kapat</button>'
      +'</div>'
      // Kalori halkası
      +'<div style="display:flex;align-items:center;gap:20px;margin-bottom:18px;padding:16px;background:var(--glass);border:1px solid var(--border);border-radius:16px">'
      +'<div style="position:relative;width:90px;height:90px;flex-shrink:0">'
      +'<svg viewBox="0 0 100 100" style="transform:rotate(-90deg);width:100%;height:100%">'
      +'<circle cx="50" cy="50" r="45" fill="none" stroke="var(--border)" stroke-width="7"/>'
      +'<circle cx="50" cy="50" r="45" fill="none" stroke="'+ringColor+'" stroke-width="7" stroke-linecap="round" stroke-dasharray="283" stroke-dashoffset="'+(283-ringDash)+'" style="transition:stroke-dashoffset 1s"/>'
      +'</svg>'
      +'<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">'
      +'<div style="font-size:1.3rem;font-weight:900;color:'+ringColor+'">'+(p.todayCal||0)+'</div>'
      +'<div style="font-size:.55rem;color:var(--text2);font-weight:600">/ '+(p.todayTarget||'?')+' kcal</div>'
      +'</div></div>'
      +'<div style="flex:1;display:flex;flex-direction:column;gap:6px">'
      +macroBarHTML('Protein',p.todayProt||0,p.protTarget||0,'#ff7a7a',protPct)
      +macroBarHTML('Karb',p.todayCarb||0,p.carbTarget||0,'#22d3ee',carbPct)
      +macroBarHTML('Yağ',p.todayFat||0,p.fatTarget||0,'#ffcc55',fatPct)
      +'</div></div>'
      // Su + Kilo + Öğün
      +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px">'
      +'<div style="background:var(--glass);border:1px solid var(--border);border-radius:12px;padding:12px;text-align:center">'
      +'<div style="font-size:1.1rem;margin-bottom:4px">💧</div>'
      +'<div style="font-size:.95rem;font-weight:800;color:var(--blue)">'+(p.todayWater||0)+'ml</div>'
      +'<div style="font-size:.62rem;color:var(--text2)">/ '+(p.waterTarget||'?')+'ml ('+waterPct+'%)</div></div>'
      +'<div style="background:var(--glass);border:1px solid var(--border);border-radius:12px;padding:12px;text-align:center">'
      +'<div style="font-size:1.1rem;margin-bottom:4px">⚖️</div>'
      +'<div style="font-size:.95rem;font-weight:800;color:var(--text)">'+(p.currentWeight?p.currentWeight+' kg':'—')+'</div>'
      +'<div style="font-size:.62rem;color:var(--text2)">mevcut kilo</div></div>'
      +'<div style="background:var(--glass);border:1px solid var(--border);border-radius:12px;padding:12px;text-align:center">'
      +'<div style="font-size:1.1rem;margin-bottom:4px">🍽️</div>'
      +'<div style="font-size:.95rem;font-weight:800;color:var(--green)">'+(p.mealCount||0)+'</div>'
      +'<div style="font-size:.62rem;color:var(--text2)">öğün kaydı</div></div>'
      +'</div>'
      +'</div></div></div>';

    document.body.insertAdjacentHTML('beforeend',html);
  }catch(e){showToast('⚠️ Profil yüklenemedi');}
}

function macroBarHTML(label,val,target,color,pct){
  return '<div>'
    +'<div style="display:flex;justify-content:space-between;font-size:.68rem;margin-bottom:2px">'
    +'<span style="font-weight:600;color:var(--text)">'+label+'</span>'
    +'<span style="font-weight:700;color:'+color+'">'+val+'g / '+(target||'?')+'g</span></div>'
    +'<div style="height:5px;background:var(--glass);border-radius:4px;overflow:hidden;border:1px solid var(--border)">'
    +'<div style="height:100%;width:'+Math.min(100,pct)+'%;background:'+color+';border-radius:4px;transition:width .6s"></div>'
    +'</div></div>';
}

// ═══ Profil içi Arkadaşlar ═══
function renderFriendsInline(){
  if(!currentUser){
    document.getElementById('friendsLoginPromptInline').style.display='block';
    document.getElementById('friendsContentInline').style.display='none';
    return;
  }
  document.getElementById('friendsLoginPromptInline').style.display='none';
  document.getElementById('friendsContentInline').style.display='block';
  var code=generateFriendCode(currentUser.uid);
  document.getElementById('myFriendCodeInline').textContent=code;
  updateMyPublicProfile();
  loadFriendsListInline();
}

function copyFriendCodeInline(){
  var code=document.getElementById('myFriendCodeInline').textContent;
  navigator.clipboard.writeText(code).then(function(){showToast('📋 Kod kopyalandı: '+code);}).catch(function(){
    var ta=document.createElement('textarea');ta.value=code;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);
    showToast('📋 Kod kopyalandı: '+code);
  });
}

async function addFriendInline(){
  if(!currentUser){showToast('Önce giriş yapın');return;}
  var code=document.getElementById('friendCodeInputInline').value.trim().toUpperCase();
  if(!code){showToast('Arkadaş kodu girin');return;}
  if(code===generateFriendCode(currentUser.uid)){showToast('Kendi kodunuzu ekleyemezsiniz');return;}
  try{
    var q=await db.collection('profiles').where('code','==',code).limit(1).get();
    if(q.empty){showToast('Bu kodla kullanıcı bulunamadı');return;}
    var friendDoc=q.docs[0];var friendUid=friendDoc.id;var friendData=friendDoc.data();
    var existing=await db.collection('profiles').doc(currentUser.uid).collection('friends').doc(friendUid).get();
    if(existing.exists){showToast('Bu kişi zaten arkadaş listenizde');return;}
    await db.collection('profiles').doc(currentUser.uid).collection('friends').doc(friendUid).set({name:friendData.name,addedAt:Date.now()});
    await db.collection('profiles').doc(friendUid).collection('friends').doc(currentUser.uid).set({name:escHTML(currentUser.displayName)||'Kullanıcı',addedAt:Date.now()});
    document.getElementById('friendCodeInputInline').value='';
    showToast('✅ '+friendData.name+' arkadaş olarak eklendi!');
    loadFriendsListInline();
  }catch(e){showToast('Hata: '+e.message);}
}

async function loadFriendsListInline(){
  if(!currentUser)return;
  var listEl=document.getElementById('friendsListInline');
  var lbEl=document.getElementById('leaderboardInline');
  try{
    var friendsSnap=await db.collection('profiles').doc(currentUser.uid).collection('friends').get();
    if(friendsSnap.empty){
      listEl.innerHTML='<div style="text-align:center;padding:12px;color:var(--text2);font-size:.78rem">Henüz arkadaş yok. Kodunu paylaş!</div>';
      lbEl.innerHTML='';return;
    }
    var friendIds=friendsSnap.docs.map(function(d){return d.id;});
    var profiles=[];
    for(var i=0;i<friendIds.length;i++){
      try{var pDoc=await db.collection('profiles').doc(friendIds[i]).get();if(pDoc.exists)profiles.push({uid:friendIds[i],data:pDoc.data()});}catch(e){}
    }
    var t=getTotals();var myStreak=calculateStreak();
    var allProfiles=profiles.map(function(p){return Object.assign({uid:p.uid},p.data);});
    allProfiles.push({uid:currentUser.uid,name:(currentUser.displayName||'Ben')+' (Sen)',photo:currentUser.photoURL,todayCal:t.cal,todayTarget:dailyTarget,todayProt:Math.round(t.prot),todayWater:getWaterMl(),waterTarget:waterTarget,streak:myStreak,isMe:true});

    listEl.innerHTML=allProfiles.filter(function(p){return !p.isMe;}).map(function(p){
      var calPct=p.todayTarget?Math.round((p.todayCal/p.todayTarget)*100):0;
      var initial=(p.name||'?')[0].toUpperCase();
      var isOnline=(Date.now()-(p.lastActive||0))<3600000;
      return '<div class="friend-card" onclick="openFriendProfile(\''+p.uid+'\')" style="cursor:pointer">'
        +'<div class="friend-header">'
        +(p.photo?'<img src="'+p.photo+'" style="width:32px;height:32px;border-radius:50%">':'<div class="friend-avatar">'+initial+'</div>')
        +'<div><div class="friend-name" style="font-size:.82rem">'+p.name+'</div>'
        +'<div class="friend-status" style="font-size:.62rem">'+(isOnline?'🟢 Aktif':'⚪ '+getTimeAgo(p.lastActive||0))+'</div></div></div>'
        +'<div style="display:flex;gap:12px;margin-top:8px;font-size:.72rem">'
        +'<span style="color:var(--accent);font-weight:700">'+(p.todayCal||0)+' kcal ('+calPct+'%)</span>'
        +'<span style="color:var(--green);font-weight:700">'+(p.todayProt||0)+'g prot</span>'
        +'<span style="color:var(--orange);font-weight:700">🔥'+(p.streak||0)+'</span>'
        +'</div>'
        +'<button onclick="event.stopPropagation();removeFriend(\''+p.uid+'\',\''+((p.name||'').replace(/'/g,"\\'"))+'\');setTimeout(loadFriendsListInline,500)" style="position:absolute;top:8px;right:8px;background:none;border:none;font-size:.65rem;color:var(--text2);cursor:pointer">✕</button>'
        +'</div>';
    }).join('')||'<div style="text-align:center;padding:12px;color:var(--text2);font-size:.78rem">Arkadaş bulunamadı</div>';

    // Sıralama
    var sorted=allProfiles.slice().sort(function(a,b){
      var aAdh=a.todayTarget?Math.abs(1-a.todayCal/a.todayTarget):1;
      var bAdh=b.todayTarget?Math.abs(1-b.todayCal/b.todayTarget):1;
      return aAdh-bAdh;
    });
    var medals=['🥇','🥈','🥉'];
    lbEl.innerHTML=sorted.map(function(p,i){
      var calPct=p.todayTarget?Math.round((p.todayCal/p.todayTarget)*100):0;
      return '<div style="display:flex;align-items:center;gap:10px;padding:6px 0;'+(p.isMe?'background:rgba(255,107,61,.06);border-radius:6px;padding:8px':'')+'"><div style="font-size:1rem;width:24px;text-align:center">'+(medals[i]||(i+1))+'</div><div style="flex:1;min-width:0"><div style="font-size:.78rem;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+p.name+'</div><div style="font-size:.62rem;color:var(--text2)">🔥'+(p.streak||0)+' · '+calPct+'% hedefe uyum</div></div><div style="font-size:.78rem;font-weight:700;color:var(--accent)">'+(p.todayCal||0)+'</div></div>';
    }).join('');
  }catch(e){listEl.innerHTML='<div style="padding:8px;color:var(--red);font-size:.78rem">Hata: '+e.message+'</div>';}
}
let notifEnabled=false;
let notifTimers=[];

function getNotifSettings(){
  const raw=localStorage.getItem('fs_notif');
  return raw?JSON.parse(raw):{enabled:false,kahvalti:'08:00',ogle:'12:30',aksam:'19:00',water:0,summary:'21:00',weekly:0,weeklyTime:'10:00'};
}

function saveNotifSettings(){
  const s={
    enabled:notifEnabled,
    kahvalti:document.getElementById('notifKahvalti').value,
    ogle:document.getElementById('notifOgle').value,
    aksam:document.getElementById('notifAksam').value,
    water:parseInt(document.getElementById('notifWater').value)||0,
    summary:document.getElementById('notifSummary').value,
    weekly:parseInt(document.getElementById('notifWeekly').value)||0,
    weeklyTime:document.getElementById('notifWeeklyTime').value||'10:00'
  };
  localStorage.setItem('fs_notif',JSON.stringify(s));
  scheduleNotifications();
  // Firestore'a da kaydet (uygulama kapalıyken bildirim için)
  if(typeof db!=='undefined'&&currentUser){
    try{
      db.collection('users').doc(currentUser.uid).set({
        notifSettings:s,
        timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||'Europe/Istanbul'
      },{merge:true}).catch(function(){});
    }catch(e){}
  }
}

function loadNotifSettings(){
  const s=getNotifSettings();
  notifEnabled=s.enabled;
  document.getElementById('notifKahvalti').value=s.kahvalti||'08:00';
  document.getElementById('notifOgle').value=s.ogle||'12:30';
  document.getElementById('notifAksam').value=s.aksam||'19:00';
  document.getElementById('notifWater').value=s.water||0;
  document.getElementById('notifSummary').value=s.summary||'21:00';
  document.getElementById('notifWeekly').value=s.weekly||0;
  document.getElementById('notifWeeklyTime').value=s.weeklyTime||'10:00';
  updateNotifUI();
  if(notifEnabled)scheduleNotifications();
  // Admin bildirimlerini kontrol et
  checkAdminNotifications();
}

function updateNotifUI(){
  const btn=document.getElementById('notifToggle');
  const panel=document.getElementById('notifSettings');
  if(notifEnabled){
    btn.textContent='✅ Aktif';
    btn.style.borderColor='var(--green)';
    btn.style.color='var(--green)';
    btn.style.background='rgba(61,214,140,.1)';
    panel.style.display='block';
  }else{
    btn.textContent='Aktifleştir';
    btn.style.borderColor='var(--green)';
    btn.style.color='var(--green)';
    btn.style.background='var(--card)';
    panel.style.display='none';
  }
}

async function toggleNotifications(){
  if(notifEnabled){
    notifEnabled=false;
    clearAllNotifTimers();
    saveNotifSettings();
    updateNotifUI();
    showToast('🔕 Bildirimler kapatıldı');
    return;
  }

  if(!('Notification' in window)){
    showToast('⚠️ Bu tarayıcı bildirimleri desteklemiyor');
    return;
  }

  const perm=await Notification.requestPermission();
  if(perm==='granted'){
    notifEnabled=true;
    saveNotifSettings();
    updateNotifUI();
    scheduleNotifications();
    // FCM push token al ve kaydet (uygulama kapalıyken bildirim için)
    setTimeout(initFCM, 500);
    showToast('🔔 Bildirimler aktifleştirildi!');
  }else{
    showToast('⚠️ Bildirim izni reddedildi. Tarayıcı ayarlarından izin verin.');
  }
}

function clearAllNotifTimers(){
  notifTimers.forEach(t=>clearTimeout(t));
  notifTimers=[];
}

function scheduleNotifications(){
  clearAllNotifTimers();
  if(!notifEnabled)return;

  const s=getNotifSettings();
  const now=new Date();

  // Öğün hatırlatıcılar
  const meals=[
    {time:s.kahvalti,title:'🌅 Kahvaltı Zamanı!',body:'Günün en önemli öğününü atlamayın.'},
    {time:s.ogle,title:'☀️ Öğle Yemeği',body:'Öğle yemeğinizi girmeyi unutmayın.'},
    {time:s.aksam,title:'🌙 Akşam Yemeği',body:'Akşam öğününüzü kaydetmeyi unutmayın.'}
  ];

  meals.forEach(m=>{
    if(!m.time)return;
    const [h,min]=m.time.split(':').map(Number);
    const target=new Date(now);
    target.setHours(h,min,0,0);
    if(target<=now)target.setDate(target.getDate()+1);
    const delay=target-now;
    if(delay>0&&delay<86400000){
      const timer=setTimeout(()=>{
        sendNotification(m.title,m.body);
        scheduleNotifications();
      },delay);
      notifTimers.push(timer);
    }
  });

  // Günlük kalori özeti (gerçek verili)
  if(s.summary){
    const [sh,sm]=s.summary.split(':').map(Number);
    const summaryTarget=new Date(now);
    summaryTarget.setHours(sh,sm,0,0);
    if(summaryTarget<=now)summaryTarget.setDate(summaryTarget.getDate()+1);
    const summaryDelay=summaryTarget-now;
    if(summaryDelay>0&&summaryDelay<86400000){
      const timer=setTimeout(()=>{
        sendDailySummaryNotif();
        scheduleNotifications();
      },summaryDelay);
      notifTimers.push(timer);
    }
  }

  // Su hatırlatma
  if(s.water>0){
    const waterInterval=s.water*60*1000;
    const waterTimer=setInterval(()=>{
      const h=new Date().getHours();
      if(h>=7&&h<=23){
        const currentMl=getWaterMl();
        const targetMl=waterTarget;
        if(currentMl<targetMl){
          const remaining=targetMl-currentMl;
          sendNotification('💧 Su İçme Zamanı!','Bugün '+currentMl+'ml içtiniz. Hedefe '+remaining+'ml kaldı.');
        }
      }
    },waterInterval);
    notifTimers.push(waterTimer);
  }

  // Haftalık rapor
  if(s.weekly>0){
    const [wh,wm]=(s.weeklyTime||'10:00').split(':').map(Number);
    const weeklyTarget=new Date(now);
    // Hedef gün: 1=Pazartesi, 5=Cuma, 7=Pazar
    var targetDay=s.weekly===7?0:s.weekly; // JS'de 0=Pazar
    var daysUntil=(targetDay-now.getDay()+7)%7;
    if(daysUntil===0&&(now.getHours()>wh||(now.getHours()===wh&&now.getMinutes()>=wm)))daysUntil=7;
    weeklyTarget.setDate(now.getDate()+daysUntil);
    weeklyTarget.setHours(wh,wm,0,0);
    const weeklyDelay=weeklyTarget-now;
    if(weeklyDelay>0){
      const timer=setTimeout(()=>{
        sendWeeklyReportNotif();
        scheduleNotifications();
      },weeklyDelay);
      notifTimers.push(timer);
    }
  }

  // Aralıklı Oruç bildirimleri
  var ifRaw=localStorage.getItem('fs_if');
  if(ifRaw){
    var ifS=JSON.parse(ifRaw);
    if(ifS.protocol!=='off'&&ifS.protocol!=='5:2'&&ifS.eatStart&&ifS.eatEnd){
      var eParts=ifS.eatStart.split(':').map(Number);
      var eatStartTarget=new Date(now);
      eatStartTarget.setHours(eParts[0],eParts[1],0,0);
      if(eatStartTarget<=now)eatStartTarget.setDate(eatStartTarget.getDate()+1);
      var eatStartDelay=eatStartTarget-now;
      if(eatStartDelay>0&&eatStartDelay<86400000){
        var t1=setTimeout(function(){sendNotification('🟢 Yeme Penceresi Açıldı!','IF ('+ifS.protocol+') — pencere: '+ifS.eatStart+' – '+ifS.eatEnd);scheduleNotifications();},eatStartDelay);
        notifTimers.push(t1);
      }
      var eeParts=ifS.eatEnd.split(':').map(Number);
      var eatEndTarget=new Date(now);
      eatEndTarget.setHours(eeParts[0],eeParts[1]-15,0,0);
      if(eatEndTarget<=now)eatEndTarget.setDate(eatEndTarget.getDate()+1);
      var eatEndDelay=eatEndTarget-now;
      if(eatEndDelay>0&&eatEndDelay<86400000){
        var t2=setTimeout(function(){sendNotification('🔴 Oruç 15dk Sonra!','Yeme penceren kapanıyor ('+ifS.eatEnd+'). Son yemeğini şimdi ye!');scheduleNotifications();},eatEndDelay);
        notifTimers.push(t2);
      }
    }
  }
}

function sendNotification(title,body){
  if(!notifEnabled||Notification.permission!=='granted')return;
  // Eğer sayfa görünürse sadece in-app banner göster (sistem bildirimi gösterme — çift bildirim olmasın)
  // Sayfa arka plandaysa sistem bildirimi göster
  if(document.visibilityState==='visible'){
    showNotifBanner(title,body);
    return;
  }
  try{
    const n=new Notification(title,{
      body,
      icon:'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23ff6b3d" width="100" height="100" rx="20"/><text x="50" y="68" text-anchor="middle" font-size="55">🥗</text></svg>',
      badge:'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23ff6b3d" width="100" height="100" rx="50"/></svg>',
      tag:'fitsofra-'+Date.now(),
      requireInteraction:false
    });
    n.onclick=()=>{window.focus();n.close()};
  }catch(e){}
}

// Uygulama içi bildirim banner'ı
function showNotifBanner(title,body){
  var existing=document.getElementById('notifBanner');
  if(existing)existing.remove();
  var banner=document.createElement('div');
  banner.id='notifBanner';
  banner.style.cssText='position:fixed;top:max(12px,env(safe-area-inset-top));left:50%;transform:translateX(-50%);width:calc(100% - 32px);max-width:400px;background:var(--card);border:1.5px solid var(--border);border-radius:14px;padding:12px 16px;z-index:300;box-shadow:0 8px 30px rgba(0,0,0,.3);backdrop-filter:blur(20px);animation:slideDown .3s ease;cursor:pointer';
  banner.innerHTML='<div style="display:flex;align-items:start;gap:10px"><div style="flex:1"><div style="font-weight:800;font-size:.82rem;color:var(--text);margin-bottom:2px">'+title+'</div><div style="font-size:.72rem;color:var(--text2);line-height:1.4">'+body+'</div></div><button onclick="this.parentElement.parentElement.remove()" style="background:none;border:none;color:var(--text2);font-size:.9rem;cursor:pointer;flex-shrink:0;padding:0">✕</button></div>';
  document.body.appendChild(banner);
  banner.onclick=function(e){if(e.target.tagName!=='BUTTON')banner.remove()};
  setTimeout(function(){if(banner.parentElement)banner.remove()},6000);
}

// Günlük kalori özet bildirimi (gerçek verili)
function sendDailySummaryNotif(){
  var t=getTotals();
  var pct=Math.round((t.cal/dailyTarget)*100);
  var waterMl=getWaterMl();
  var title='📊 Günlük Beslenme Özeti';
  var body='Kalori: '+t.cal+'/'+dailyTarget+' kcal (%'+pct+') · P:'+t.prot+'g K:'+t.carb+'g Y:'+t.fat+'g · Su: '+(waterMl/1000).toFixed(1)+'L';
  if(pct<80) body+=' — Biraz daha yemelisiniz!';
  else if(pct<=110) body+=' — Harika gün!';
  else body+=' — Biraz fazla kaçmış!';
  sendNotification(title,body);
}

// Haftalık ilerleme raporu
function sendWeeklyReportNotif(){
  var days=[];
  for(var i=6;i>=0;i--){
    var d=new Date();d.setDate(d.getDate()-i);
    var key='fs_day_'+d.toISOString().split('T')[0];
    var raw=localStorage.getItem(key);
    if(raw){
      try{
        var data=JSON.parse(raw);
        var dayCal=0;
        ['kahvalti','ogle','aksam','atistirmalik'].forEach(function(m){
          if(data[m])data[m].forEach(function(f){dayCal+=(f.cal||0)});
        });
        days.push(dayCal);
      }catch(e){days.push(0);}
    }else{days.push(0);}
  }
  var avg=days.length?Math.round(days.reduce(function(a,b){return a+b},0)/days.length):0;
  var loggedDays=days.filter(function(d){return d>0}).length;
  var title='📅 Haftalık İlerleme Raporu';
  var body='Son 7 gün: Ort. '+avg+' kcal/gün · '+loggedDays+'/7 gün kayıt · Hedef: '+dailyTarget+' kcal';
  if(avg>0&&avg<=dailyTarget*1.1) body+=' — Harika tempo!';
  else if(avg>dailyTarget*1.1) body+=' — Biraz dikkat!';
  sendNotification(title,body);
}

// Admin bildirimlerini kontrol et (Firestore'dan)
async function checkAdminNotifications(){
  try{
    var lastCheck=parseInt(localStorage.getItem('fs_last_admin_notif')||'0');
    var snap=await db.collection('settings').doc('notifications').get();
    if(!snap.exists)return;
    var data=snap.data();
    if(!data.messages||!data.messages.length)return;
    // Sadece en son görülmemiş mesajı göster (çift bildirim önleme)
    var unseenMsgs=data.messages.filter(function(msg){return msg.timestamp>lastCheck;});
    if(unseenMsgs.length>0){
      var latest=unseenMsgs[unseenMsgs.length-1];
      setTimeout(function(){
        showNotifBanner(latest.title||'📢 Bildirim',latest.body||'');
      },2000);
      // Birden fazla varsa sayısını göster
      if(unseenMsgs.length>1){
        setTimeout(function(){
          showToast('📢 '+(unseenMsgs.length-1)+' eski bildirim daha var');
        },5000);
      }
    }
    localStorage.setItem('fs_last_admin_notif',String(Date.now()));
  }catch(e){}
}
function checkCalorieMilestone(){
  const t=getTotals();
  const pct=Math.round((t.cal/dailyTarget)*100);
  if(pct===50&&!sessionStorage.getItem('fs_m50')){sessionStorage.setItem('fs_m50','1');showToast('📊 Günlük hedefinizin %50\'sine ulaştınız!')}
  else if(pct===75&&!sessionStorage.getItem('fs_m75')){sessionStorage.setItem('fs_m75','1');showToast('📊 Günlük hedefinizin %75\'ine ulaştınız!')}
  else if(pct>=100&&!sessionStorage.getItem('fs_m100')){sessionStorage.setItem('fs_m100','1');showToast('🎯 Günlük kalori hedefinize ulaştınız!')}
  else if(pct>=120&&!sessionStorage.getItem('fs_m120')){sessionStorage.setItem('fs_m120','1');showToast('⚠️ Günlük hedefinizi %20 aştınız!')}
}
let barcodeScanner=null;

function openBarcodeScanner(){
  closeModal();
  document.getElementById('barcodeStatus').textContent='Ürünün barkodunu kameraya gösterin...';
  document.getElementById('barcodeStatus').style.color='var(--text2)';
  document.getElementById('manualBarcode').value='';
  document.getElementById('barcodeModal').classList.add('show');

  setTimeout(()=>{
    try{
      if(typeof Html5Qrcode==='undefined'){
        document.getElementById('barcodeStatus').innerHTML='⚠️ Barkod kütüphanesi yüklenemedi. <br>Barkodu elle girebilirsiniz.';
        return;
      }
      barcodeScanner=new Html5Qrcode('barcodeScannerContainer');

      // 8 saniye içinde okuma olmazsa kullanıcıyı bilgilendir
      window._barcodeTimeout=setTimeout(()=>{
        const st=document.getElementById('barcodeStatus');
        if(st&&st.textContent==='Ürünün barkodunu kameraya gösterin...'){
          st.innerHTML='🔍 Barkod okunamadı — ürünü kameraya yaklaştırın ya da barkod numarasını elle girebilirsiniz.';
        }
      },8000);

      barcodeScanner.start(
        {facingMode:'environment'},
        {fps:10,qrbox:{width:280,height:150},aspectRatio:1.7,formatsToSupport:[0,12,13,14,15,16,7,4,5,6]},
        (code)=>{clearTimeout(window._barcodeTimeout);onBarcodeDetected(code);},
        ()=>{}
      ).catch(err=>{
        clearTimeout(window._barcodeTimeout);

        if(err.name==='NotAllowedError'||err.toString().includes('NotAllowedError')){
          document.getElementById('barcodeStatus').innerHTML='📷 Kamera izni reddedildi.<br><span style="font-size:.72rem">Tarayıcı ayarlarından kamera iznini etkinleştirin.</span><br>Barkodu elle girebilirsiniz.';
        } else if(err.name==='NotFoundError'||err.toString().includes('NotFoundError')){
          document.getElementById('barcodeStatus').innerHTML='📷 Kamera bulunamadı.<br><span style="font-size:.72rem">Cihazınızda kullanılabilir kamera yok.</span><br>Barkodu elle girebilirsiniz.';
        } else {
          document.getElementById('barcodeStatus').innerHTML='⚠️ Kamera erişimi sağlanamadı.<br><span style="font-size:.72rem">Tarayıcı ayarlarından kamera iznini kontrol edin.</span><br>Barkodu elle girebilirsiniz.';
        }
      });
    }catch(e){

      document.getElementById('barcodeStatus').innerHTML='⚠️ Barkod tarayıcı başlatılamadı.<br>Barkodu elle girebilirsiniz.';
    }
  },500);
}

function closeBarcodeScanner(){
  clearTimeout(window._barcodeTimeout);
  try{
    if(barcodeScanner){
      barcodeScanner.stop().then(()=>{
        try{barcodeScanner.clear()}catch(e){}
        barcodeScanner=null;
      }).catch(()=>{
        try{barcodeScanner.clear()}catch(e){}
        barcodeScanner=null;
      });
    }
  }catch(e){barcodeScanner=null}
  document.getElementById('barcodeScannerContainer').innerHTML='';
  document.getElementById('barcodeModal').classList.remove('show');
}

function onBarcodeDetected(code){
  try{if(barcodeScanner)barcodeScanner.stop().catch(()=>{})}catch(e){}
  document.getElementById('barcodeStatus').innerHTML='<div class="spinner"></div><br>Barkod bulundu: '+code+'<br>Ürün aranıyor...';
  lookupBarcode(code);
}

async function lookupBarcode(code){
  if(!code||!code.trim()){showToast('⚠️ Barkod numarası girin');return}
  code=code.trim();
  document.getElementById('barcodeStatus').innerHTML='<div class="spinner"></div><br>Ürün aranıyor...';
  document.getElementById('barcodeStatus').style.display='block';

  try{
    const res=await fetch(`https://world.openfoodfacts.org/api/v2/product/${code}.json?fields=product_name,nutriments,brands,quantity,image_small_url`);
    const data=await res.json();

    if(data.status===1&&data.product){
      const p=data.product;
      const n=p.nutriments||{};
      const name=p.product_name||'Bilinmeyen Ürün';
      const brand=p.brands?p.brands.split(',')[0]:'';
      const cal=Math.round(n['energy-kcal_100g']||n['energy-kcal']||0);
      const prot=Math.round(n.proteins_100g||0);
      const carb=Math.round(n.carbohydrates_100g||0);
      const fat=Math.round(n.fat_100g||0);
      const fullName=brand?brand+' '+name:name;


      window._barcodeFood={name:fullName,emoji:'🏷️',cal,prot,carb,fat,portion:100,cat:'ambalajli'};

      document.getElementById('barcodeStatus').innerHTML=`
        <div class="barcode-result">
          <div class="br-name">${name}</div>
          ${brand?'<div class="br-brand">'+brand+'</div>':''}
          <div class="br-macros">🔥 ${cal} kcal • P:${prot}g K:${carb}g Y:${fat}g (100g başına)${p.quantity?' • '+p.quantity:''}</div>
        </div>
        <p style="font-size:.78rem;color:var(--text2);margin:8px 0 6px">Hangi öğüne eklemek istersiniz?</p>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${MEAL_DEFS.map(m=>`<button class="unit-btn" onclick="addBarcodeToMeal('${m.id}')" style="flex:1;min-width:80px">${m.icon} ${m.name}</button>`).join('')}
        </div>
      `;

    }else{
      document.getElementById('barcodeStatus').innerHTML='❌ Ürün bulunamadı (Barkod: '+code+')<br><span style="font-size:.72rem">Bu ürün Open Food Facts veritabanında kayıtlı değil.</span>';
      document.getElementById('barcodeStatus').style.color='var(--red)';
    }
  }catch(e){
    document.getElementById('barcodeStatus').innerHTML='⚠️ Bağlantı hatası. İnternet bağlantınızı kontrol edin.';
    document.getElementById('barcodeStatus').style.color='var(--red)';
  }
}

function addBarcodeToMeal(mealId){
  const food=window._barcodeFood;
  if(!food)return;
  currentMealId=mealId;
  pendingFood={...food};
  closeBarcodeScanner();
  openPortionModal();
}

let voiceRecognition=null;
function startVoiceSearch(){
  if(!('webkitSpeechRecognition' in window)&&!('SpeechRecognition' in window)){
    showToast('⚠️ Tarayıcınız sesli aramayı desteklemiyor');return;
  }
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(voiceRecognition){voiceRecognition.stop();voiceRecognition=null;document.getElementById('voiceBtn').style.background='var(--purple)';return}
  voiceRecognition=new SR();
  voiceRecognition.lang='tr-TR';
  voiceRecognition.continuous=false;
  voiceRecognition.interimResults=true;
  document.getElementById('voiceBtn').style.background='var(--red)';
  document.getElementById('foodSearch').placeholder='🎤 Dinliyorum...';
  showToast('🎤 Konuşun... (örn: "yüz gram tavuk göğsü")');
  voiceRecognition.onresult=function(e){
    let transcript='';
    for(let i=0;i<e.results.length;i++)transcript+=e.results[i][0].transcript;
    document.getElementById('foodSearch').value=transcript;
    if(e.results[0].isFinal){
      var parsed=parseVoiceInput(transcript);
      if(parsed&&parsed.length){
        parsed.forEach(function(p){_addParsedVoiceFood(p)});
        showToast('✅ '+parsed.map(function(p){return p.name}).join(', ')+' eklendi!');
        setTimeout(function(){if(document.getElementById('addFoodModal').classList.contains('show'))closeModal()},600);
      } else {
        handleSearch();showToast('🔍 "'+transcript+'" aranıyor...');
      }
    }
  };
  voiceRecognition.onerror=function(e){
    document.getElementById('voiceBtn').style.background='var(--purple)';
    document.getElementById('foodSearch').placeholder='🔍 Yemek ara...';
    if(e.error==='not-allowed')showToast('⚠️ Mikrofon izni gerekli');
    else showToast('⚠️ Ses tanıma hatası');
    voiceRecognition=null;
  };
  voiceRecognition.onend=function(){
    document.getElementById('voiceBtn').style.background='var(--purple)';
    document.getElementById('foodSearch').placeholder='🔍 Yemek ara...';
    voiceRecognition=null;
  };
  voiceRecognition.start();
}

function getWaterMl(){const raw=localStorage.getItem('fs_water_'+dateKey());return raw?parseInt(raw):0}
function setWaterMl(ml){localStorage.setItem('fs_water_'+dateKey(),Math.max(0,ml));triggerAutoSync()}

function addWater(ml){
  let current=getWaterMl();
  current=Math.max(0,current+ml);
  setWaterMl(current);
  renderWater();
  updateWaterHeader();
  if(ml>0)showToast(`💧 +${ml}ml eklendi`);
  else showToast(`💧 ${ml}ml çıkarıldı`);
}

function removeWater(){
  let current=getWaterMl();
  if(current<=0)return;
  current=Math.max(0,current-250);
  setWaterMl(current);
  renderWater();
  updateWaterHeader();
  showToast('💧 −1 bardak çıkarıldı');
}

function renderWater(){
  const el=document.getElementById('waterCard');
  if(!el)return;
  const currentMl=getWaterMl();
  const targetMl=getTodayTargets().water;
  const rawPct=(currentMl/targetMl)*100;
  const pctLabel=Math.round(rawPct);
  const isCollapsed=el.dataset.collapsed==='1';
  var borderR=isCollapsed?'var(--radius)':'var(--radius) var(--radius) 0 0';

  // Çok katmanlı bar hesapları
  const layer1=Math.min(100,rawPct);
  const layer2=rawPct>100?Math.min(100,((rawPct-100)/50)*100):0;
  const layer3=rawPct>150?Math.min(100,((rawPct-150)/50)*100):0;

  // Renk ve etiket
  let pctColor='#22d3ee';
  let pctExtra='';
  if(rawPct>=200){pctColor='#ff5c5c';pctExtra=' 🔥';}
  else if(rawPct>=150){pctColor='#ff8c3a';pctExtra=' 🌊';}
  else if(rawPct>=100){pctColor='#3dd68c';pctExtra=' ✅';}

  el.innerHTML='<div class="meal-header" onclick="toggleWaterCard()" style="cursor:pointer;border-radius:'+borderR+'">'
    +'<div class="meal-title"><div class="meal-icon" style="background:rgba(34,211,238,.12)">💧</div>Su Takibi</div>'
    +'<div class="meal-right">'
    +(currentMl?'<div class="meal-kcal" style="color:'+pctColor+'">'+currentMl+'ml</div><div class="meal-pct" style="color:'+pctColor+'">%'+pctLabel+pctExtra+'</div>':'')
    +'<span class="meal-chevron" style="transition:transform .25s;'+(isCollapsed?'transform:rotate(-90deg)':'')+'">‹</span>'
    +'</div></div>'
    +'<div style="overflow:hidden;transition:max-height .3s ease;max-height:'+(isCollapsed?'0':'500px')+'">'
    +'<div class="meal-card" style="border-radius:0 0 var(--radius) var(--radius)">'
    +'<div style="padding:12px 14px 8px">'
    // Çok katmanlı progress bar
    +'<div style="position:relative;height:10px;background:rgba(34,211,238,.06);border-radius:6px;overflow:hidden;margin-bottom:4px">'
    +'<div style="position:absolute;top:0;left:0;height:100%;width:'+layer1+'%;background:linear-gradient(90deg,#3aaff0,#22d3ee,#8ddfff);border-radius:6px;transition:width .6s cubic-bezier(.25,1,.5,1);box-shadow:0 0 8px rgba(34,211,238,.3)"></div>'
    +(layer2>0?'<div style="position:absolute;top:0;left:0;height:100%;width:'+layer2+'%;background:linear-gradient(90deg,#0ea5d4,#3dd68c);border-radius:6px;transition:width .6s cubic-bezier(.25,1,.5,1);opacity:.9"></div>':'')
    +(layer3>0?'<div style="position:absolute;top:0;left:0;height:100%;width:'+layer3+'%;background:linear-gradient(90deg,#ff8c3a,#ff5c5c);border-radius:6px;transition:width .6s cubic-bezier(.25,1,.5,1);opacity:.85"></div>':'')
    +'</div>'
    // Hedef etiketleri
    +'<div style="display:flex;justify-content:space-between;font-size:.62rem;color:var(--text2);margin-bottom:10px">'
    +'<span>0</span>'
    +(rawPct>=100?'<span style="color:var(--green);font-weight:700">🎯 '+( targetMl/1000).toFixed(1)+'L</span>':'<span>'+( targetMl/1000).toFixed(1)+'L</span>')
    +(rawPct>=150?'<span style="color:#ff8c3a;font-weight:700">×1.5</span>':'')
    +(rawPct>=200?'<span style="color:#ff5c5c;font-weight:700">×2.0 🔥</span>':'')
    +'</div>'
    +'<div class="water-actions" style="flex-wrap:wrap;gap:6px">'
    +'<button class="water-btn add" onclick="addWater(150)" style="flex:1;min-width:60px;padding:10px 4px;font-size:.74rem">+150ml</button>'
    +'<button class="water-btn add" onclick="addWater(200)" style="flex:1;min-width:60px;padding:10px 4px;font-size:.74rem">+200ml</button>'
    +'<button class="water-btn add" onclick="addWater(250)" style="flex:1;min-width:60px;padding:10px 4px;font-size:.74rem">+250ml</button>'
    +'<button class="water-btn add" onclick="addWater(330)" style="flex:1;min-width:60px;padding:10px 4px;font-size:.74rem">+330ml</button>'
    +'<button class="water-btn add" onclick="addWater(500)" style="flex:1;min-width:60px;padding:10px 4px;font-size:.74rem">+500ml</button>'
    +'</div>'
    +'<div class="water-actions" style="margin-top:6px;gap:6px">'
    +'<button class="water-btn remove" onclick="addWater(-150)" style="flex:1;padding:8px 4px;font-size:.72rem">−150ml</button>'
    +'<button class="water-btn remove" onclick="addWater(-250)" style="flex:1;padding:8px 4px;font-size:.72rem">−250ml</button>'
    +'<button class="water-btn remove" onclick="addWater(-330)" style="flex:1;padding:8px 4px;font-size:.72rem">−330ml</button>'
    +'<button class="water-btn remove" onclick="addWater(-500)" style="flex:1;padding:8px 4px;font-size:.72rem">−500ml</button>'
    +'</div></div></div></div>';
}

function toggleWaterCard(){
  const el=document.getElementById('waterCard');
  if(!el)return;
  el.dataset.collapsed=el.dataset.collapsed==='1'?'0':'1';
  renderWater();
}

function setWaterDirect(ml){
  setWaterMl(ml);
  renderWater();
  updateWaterHeader();
}

function updateWaterHeader(){
  const currentMl=getWaterMl();
  const targetMl=getTodayTargets().water;
  const rawPct=(currentMl/targetMl)*100;
  const totalL=(currentMl/1000).toFixed(1);

  // Katman 1: %0–100 normal (cyan gradient)
  const layer1=Math.min(100,rawPct);
  // Katman 2: %100–150 aşım (koyu cyan)
  const layer2=rawPct>100?Math.min(100,((rawPct-100)/50)*100):0;
  // Katman 3: >%150 üçüncü katman (turuncu)
  const layer3=rawPct>150?Math.min(100,((rawPct-150)/50)*100):0;

  const barEl=document.getElementById('waterBar');
  const over1El=document.getElementById('waterBarOver');
  const over2El=document.getElementById('waterBarOver2');
  if(barEl)barEl.style.width=layer1+'%';
  if(over1El)over1El.style.width=layer2+'%';
  if(over2El)over2El.style.width=layer3+'%';
  document.getElementById('waterVal').textContent=totalL+'L';
}
function renderStats(){
  const t=getTotals();
  const todayWater=getWaterMl();
  const _tgtNow=getTodayTargets();
  const dailyTarget=_tgtNow.cal,protTarget=_tgtNow.prot,carbTarget=_tgtNow.carb,fatTarget=_tgtNow.fat,waterTarget=_tgtNow.water;
  const days=['Paz','Pzt','Sal','Çar','Per','Cum','Cmt'];

  // 7 günlük veri topla
  const weekDays=[];
  for(let i=6;i>=0;i--){
    const d=new Date();d.setDate(d.getDate()-i);
    const dk=dateKey(d);
    const dayData=getDayData(dk);
    let dayCal=0,dayProt=0,dayCarb=0,dayFat=0;
    const allFoods=[];
    Object.entries(dayData).forEach(([meal,foods])=>foods.forEach(f=>{
      dayCal+=f.cal;dayProt+=f.prot||0;dayCarb+=f.carb||0;dayFat+=f.fat||0;
      allFoods.push({...f,meal});
    }));
    const dayWater=parseInt(localStorage.getItem('fs_water_'+dk))||0;
    weekDays.push({day:days[d.getDay()],cal:Math.round(dayCal),prot:Math.round(dayProt),carb:Math.round(dayCarb),fat:Math.round(dayFat),water:dayWater,foods:allFoods,dateStr:d.toLocaleDateString('tr-TR'),isToday:i===0,dk});
  }
  const maxCal=Math.max(dailyTarget,...weekDays.map(d=>d.cal),100);

  // Haftalık ortalamalar (sadece veri olan günler)
  const activeDays=weekDays.filter(d=>d.cal>0);
  const avgCal=activeDays.length?Math.round(activeDays.reduce((s,d)=>s+d.cal,0)/activeDays.length):0;
  const avgProt=activeDays.length?Math.round(activeDays.reduce((s,d)=>s+d.prot,0)/activeDays.length):0;
  const avgCarb=activeDays.length?Math.round(activeDays.reduce((s,d)=>s+d.carb,0)/activeDays.length):0;
  const avgFat=activeDays.length?Math.round(activeDays.reduce((s,d)=>s+d.fat,0)/activeDays.length):0;
  const avgWater=activeDays.length?Math.round(activeDays.reduce((s,d)=>s+d.water,0)/activeDays.length):0;
  const calScore=dailyTarget?Math.round((avgCal/dailyTarget)*100):0;
  const waterScore=waterTarget?Math.round((avgWater/waterTarget)*100):0;

  // Mikro besin tahmini (bugün için)
  function estimateMicro(foods){
    let vC=0,vD=0,vB12=0,demir=0,kalsiyum=0,lif=0,sodyum=0;
    foods.forEach(f=>{
      const n=(f.name||'').toLowerCase();
      const g=(f.portionUsed||100)/100;
      const cal=f.cal||0;
      // Kaba tahmin — kategori bazlı
      if(n.includes('portakal')||n.includes('limon')||n.includes('çilek')||n.includes('kivi'))vC+=40*g;
      else if(n.includes('domates')||n.includes('biber'))vC+=15*g;
      else if(n.includes('brokoli')||n.includes('lahana'))vC+=50*g;
      else vC+=3*g;
      if(n.includes('somon')||n.includes('ton')||n.includes('hamsi')||n.includes('sardalya'))vD+=8*g;
      else if(n.includes('yumurta'))vD+=1.1*g;
      else vD+=0.2*g;
      if(n.includes('et')||n.includes('tavuk')||n.includes('köfte')||n.includes('sucuk')||n.includes('pastırma'))vB12+=1.5*g;
      else if(n.includes('süt')||n.includes('yoğurt')||n.includes('peynir'))vB12+=0.8*g;
      else vB12+=0.05*g;
      if(n.includes('kırmızı et')||n.includes('kuzu')||n.includes('dana')||n.includes('kıyma')||n.includes('ciğer'))demir+=3*g;
      else if(n.includes('tavuk')||n.includes('hindi'))demir+=1.2*g;
      else if(n.includes('mercimek')||n.includes('nohut')||n.includes('fasulye')||n.includes('ıspanak'))demir+=2.5*g;
      else demir+=0.4*g;
      if(n.includes('peynir')||n.includes('süt')||n.includes('yoğurt'))kalsiyum+=120*g;
      else if(n.includes('brokoli')||n.includes('lahana'))kalsiyum+=40*g;
      else kalsiyum+=15*g;
      if(n.includes('bulgur')||n.includes('tam buğday')||n.includes('kepek'))lif+=4*g;
      else if(n.includes('sebze')||n.includes('meyve')||n.includes('baklagil')||n.includes('fasulye')||n.includes('mercimek')||n.includes('nohut'))lif+=3*g;
      else lif+=0.8*g;
      if(n.includes('turşu')||n.includes('salça')||n.includes('sucuk')||n.includes('pastırma'))sodyum+=400*g;
      else if(n.includes('peynir')||n.includes('zeytin'))sodyum+=200*g;
      else sodyum+=80*g;
    });
    return{vC:Math.round(vC),vD:Math.round(vD*10)/10,vB12:Math.round(vB12*10)/10,demir:Math.round(demir),kalsiyum:Math.round(kalsiyum),lif:Math.round(lif),sodyum:Math.round(sodyum)};
  }

  function pBar(val,max,color){
    const p=Math.min(100,Math.round((val/max)*100));
    return `<div style="height:6px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden;margin-top:3px"><div style="height:100%;width:${p}%;background:${color};border-radius:4px;transition:width .5s"></div></div>`;
  }

  function dayFoodList(dayObj){
    if(!dayObj.foods.length) return '<p style="color:var(--text2);font-size:.78rem;padding:8px 0">Bu gün için kayıt yok</p>';
    const mealLabels={kahvalti:'🌅 Kahvaltı',ogle:'☀️ Öğle',aksam:'🌙 Akşam',atistirmalik:'🍿 Ara'};
    const byMeal={};
    dayObj.foods.forEach(f=>{if(!byMeal[f.meal])byMeal[f.meal]=[];byMeal[f.meal].push(f);});
    let html='';
    Object.entries(byMeal).forEach(([meal,foods])=>{
      html+=`<div style="margin-top:8px"><div style="font-size:.72rem;font-weight:700;color:var(--text2);margin-bottom:4px">${mealLabels[meal]||meal}</div>`;
      foods.forEach(f=>{
        html+=`<div style="display:flex;justify-content:space-between;font-size:.76rem;padding:3px 0;border-bottom:1px solid var(--border)"><span>${f.emoji||'🍽️'} ${escHTML(f.name)}</span><span style="color:var(--accent);font-weight:700">${Math.round(f.cal)} kal</span></div>`;
      });
      html+='</div>';
    });
    return html;
  }

  const todayObj=weekDays[weekDays.length-1];
  const micro=estimateMicro(todayObj.foods);

  // HTML oluştur
  let html='';

  // ═══ VÜCUT SKORU ═══
  var bs={nutrition:0,macro:0,water:0,weight:0,exercise:0,streak:0,meals:0};
  // 1. Beslenme tutarlılığı (25p) — son 7 günde hedefe yakınlık
  if(activeDays.length>0&&dailyTarget>0){
    var calAccuracy=activeDays.reduce(function(s,d){
      var ratio=d.cal/dailyTarget;
      // 0.85-1.15 arası ideal
      if(ratio>=0.85&&ratio<=1.15)return s+1;
      if(ratio>=0.7&&ratio<=1.3)return s+0.6;
      return s+0.2;
    },0)/7;
    bs.nutrition=Math.round(calAccuracy*25);
  }
  // 2. Makro dengesi (20p)
  if(t.cal>0&&protTarget>0){
    var protR=Math.min(1,t.prot/protTarget);
    var carbR=Math.min(1,t.carb/carbTarget);
    var fatR=Math.min(1,t.fat/fatTarget);
    var macroAvg=(protR+carbR+fatR)/3;
    bs.macro=Math.round(macroAvg*20);
  }
  // 3. Su tüketimi (15p)
  if(waterTarget>0){
    var waterR=Math.min(1,todayWater/waterTarget);
    var weekWaterR=activeDays.length?activeDays.reduce(function(s,d){return s+Math.min(1,d.water/waterTarget);},0)/7:0;
    bs.water=Math.round(((waterR+weekWaterR)/2)*15);
  }
  // 4. Kilo trendi (15p)
  var wLog=typeof getWeightLog==='function'?getWeightLog():[];
  if(wLog.length>=2){
    var prof=JSON.parse(localStorage.getItem('fs_profile')||'{}');
    var goalW=parseFloat(prof.goalWeight)||parseFloat(prof.weight)||70;
    var currentW=wLog[wLog.length-1].weight;
    var prevW=wLog[Math.max(0,wLog.length-7)].weight;
    var needLose=currentW>goalW;
    var moved=needLose?(prevW-currentW):(currentW-prevW);
    if(Math.abs(currentW-goalW)<1)bs.weight=15;
    else if(moved>0)bs.weight=Math.min(15,Math.round((moved/2)*15));
    else bs.weight=3;
  }else{bs.weight=5;}
  // 5. Egzersiz (10p)
  var exData=JSON.parse(localStorage.getItem('fs_ex_'+dateKey(new Date()))||'[]');
  var weekEx=0;
  for(var ei=0;ei<7;ei++){var ed=new Date();ed.setDate(ed.getDate()-ei);var exd=JSON.parse(localStorage.getItem('fs_ex_'+dateKey(ed))||'[]');if(exd.length)weekEx++;}
  bs.exercise=Math.min(10,Math.round((weekEx/3)*10));
  // 6. Seri (10p)
  var streakN=parseInt(document.getElementById('streakCount')?.textContent)||0;
  if(streakN>=30)bs.streak=10;
  else if(streakN>=14)bs.streak=8;
  else if(streakN>=7)bs.streak=6;
  else if(streakN>=3)bs.streak=4;
  else if(streakN>=1)bs.streak=2;
  else bs.streak=0;
  // 7. Öğün düzeni (5p)
  var todayMeals=Object.keys(todayObj.foods.reduce(function(a,f){a[f.meal]=1;return a;},{})).length;
  bs.meals=Math.min(5,Math.round((todayMeals/3)*5));

  var totalScore=bs.nutrition+bs.macro+bs.water+bs.weight+bs.exercise+bs.streak+bs.meals;
  var scoreColor=totalScore>=80?'var(--green)':totalScore>=60?'var(--orange)':totalScore>=40?'var(--accent)':'var(--red)';
  var scoreLabel=totalScore>=80?'Mükemmel! 🌟':totalScore>=60?'İyi gidiyorsun! 💪':totalScore>=40?'Geliştirebilirsin 📈':'Harekete geç! 🔥';
  var scorePct=Math.round((totalScore/100)*283);

  // En düşük kategoriyi bul — öneri için
  var categories=[
    {name:'Beslenme tutarlılığı',score:bs.nutrition,max:25,tip:'Günlük kalori hedefinize yakın kalmaya çalışın'},
    {name:'Makro dengesi',score:bs.macro,max:20,tip:'Protein, karb ve yağ dengesini gözden geçirin'},
    {name:'Su tüketimi',score:bs.water,max:15,tip:'Günlük su hedefinizi tamamlamaya özen gösterin'},
    {name:'Kilo trendi',score:bs.weight,max:15,tip:'Düzenli tartılın ve hedef kilonuza odaklanın'},
    {name:'Egzersiz',score:bs.exercise,max:10,tip:'Haftada en az 3 gün egzersiz kaydedin'},
    {name:'Seri',score:bs.streak,max:10,tip:'Her gün kalori kaydı yaparak serinizi koruyun'},
    {name:'Öğün düzeni',score:bs.meals,max:5,tip:'3 ana öğün kaydetmeye özen gösterin'}
  ];
  categories.sort(function(a,b){return(a.score/a.max)-(b.score/b.max);});
  var topTip=categories[0];

  var bodyScoreHtml=''
    +'<div style="background:var(--card);border-radius:var(--radius);padding:20px 16px;margin-bottom:14px;border:1px solid var(--border);text-align:center">'
    +'<div style="font-weight:800;font-size:.95rem;margin-bottom:14px;display:flex;align-items:center;justify-content:center;gap:8px">🏆 Vücut Skoru</div>'
    // Skor halkası
    +'<div style="position:relative;width:130px;height:130px;margin:0 auto 16px">'
    +'<svg viewBox="0 0 100 100" style="transform:rotate(-90deg);width:100%;height:100%">'
    +'<circle cx="50" cy="50" r="45" fill="none" stroke="var(--border)" stroke-width="8"/>'
    +'<circle cx="50" cy="50" r="45" fill="none" stroke="'+scoreColor+'" stroke-width="8" stroke-linecap="round" stroke-dasharray="283" stroke-dashoffset="'+(283-scorePct)+'" style="transition:stroke-dashoffset 1.2s ease"/>'
    +'</svg>'
    +'<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">'
    +'<div style="font-size:2rem;font-weight:900;color:'+scoreColor+'">'+totalScore+'</div>'
    +'<div style="font-size:.65rem;color:var(--text2);font-weight:600">/100</div>'
    +'</div></div>'
    +'<div style="font-size:.85rem;font-weight:700;color:'+scoreColor+';margin-bottom:14px">'+scoreLabel+'</div>'
    // Kategori barları
    +'<div style="text-align:left;display:flex;flex-direction:column;gap:8px">';

  categories.sort(function(a,b){return b.max-a.max;});
  categories.forEach(function(c){
    var pct=Math.round((c.score/c.max)*100);
    var barColor=pct>=80?'var(--green)':pct>=50?'var(--orange)':'var(--red)';
    bodyScoreHtml+='<div>'
      +'<div style="display:flex;justify-content:space-between;font-size:.72rem;margin-bottom:3px">'
      +'<span style="font-weight:600;color:var(--text)">'+c.name+'</span>'
      +'<span style="font-weight:700;color:'+barColor+'">'+c.score+'/'+c.max+'</span></div>'
      +'<div style="height:5px;background:var(--glass);border-radius:4px;overflow:hidden;border:1px solid var(--border)">'
      +'<div style="height:100%;width:'+pct+'%;background:'+barColor+';border-radius:4px;transition:width .8s ease"></div>'
      +'</div></div>';
  });

  bodyScoreHtml+='</div>'
    // Öneri
    +'<div style="margin-top:14px;padding:10px 12px;background:var(--accent-glow);border:1px solid var(--accent);border-radius:10px;text-align:left">'
    +'<div style="font-size:.72rem;font-weight:700;color:var(--accent);margin-bottom:2px">💡 Öneri</div>'
    +'<div style="font-size:.76rem;color:var(--text2);line-height:1.5">'+topTip.tip+'</div>'
    +'</div></div>';

  // --- GRAFİKLER: trend + makro pasta ---
  var statsHtml=`
  <div style="padding:0 0 16px;overflow:hidden;box-sizing:border-box">

    <!-- Kalori Trend Grafiği — tam genişlik -->
    <div style="background:var(--card);border-radius:var(--radius);padding:16px;margin-bottom:14px;border:1px solid var(--border)">
      <div style="font-weight:700;font-size:.88rem;margin-bottom:12px">📈 Kalori Trendi (7 Gün)</div>
      <div style="position:relative;height:160px;width:100%">
        <canvas id="calTrendChart"></canvas>
      </div>
    </div>

    <!-- Makro Dağılım — yan yana, tam genişlik -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px">
      <div style="background:var(--card);border-radius:var(--radius-sm);padding:12px;border:1px solid var(--border)">
        <div style="font-weight:700;font-size:.74rem;margin-bottom:8px;text-align:center">🥗 Bugün</div>
        <div style="position:relative;height:100px;width:100px;margin:0 auto">
          <canvas id="macroDonutChart"></canvas>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:3px;margin-top:8px;font-size:.62rem;justify-content:center">
          <span style="color:#ff7a7a">P ${Math.round(t.prot)}g</span>
          <span style="color:var(--text2)">·</span>
          <span style="color:#60a5fa">K ${Math.round(t.carb)}g</span>
          <span style="color:var(--text2)">·</span>
          <span style="color:#ffcc55">Y ${Math.round(t.fat)}g</span>
        </div>
      </div>
      <div style="background:var(--card);border-radius:var(--radius-sm);padding:12px;border:1px solid var(--border)">
        <div style="font-weight:700;font-size:.74rem;margin-bottom:8px;text-align:center">📊 Hafta Ort.</div>
        <div style="position:relative;height:100px;width:100px;margin:0 auto">
          <canvas id="weeklyMacroChart"></canvas>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:3px;margin-top:8px;font-size:.62rem;justify-content:center">
          <span style="color:#ff7a7a">P ${avgProt}g</span>
          <span style="color:var(--text2)">·</span>
          <span style="color:#60a5fa">K ${avgCarb}g</span>
          <span style="color:var(--text2)">·</span>
          <span style="color:#ffcc55">Y ${avgFat}g</span>
        </div>
      </div>
    </div>
  </div>
  `;

  // --- Günlük Özet ---
  const remaining=dailyTarget-t.cal;
  const calPct=dailyTarget?Math.min(100,Math.round((t.cal/dailyTarget)*100)):0;
  const waterPct=waterTarget?Math.min(100,Math.round((todayWater/waterTarget)*100)):0;
  html+=`<div class="stat-card" style="animation-delay:.04s">
    <h3>🎯 Günlük Özet <span style="font-size:.68rem;color:var(--text2);font-weight:500">${new Date().toLocaleDateString('tr-TR')}</span></h3>
    <div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap">
      <div style="flex:1;min-width:130px;padding:10px;background:var(--glass);border-radius:10px;border:1px solid var(--border)">
        <div style="font-size:.68rem;color:var(--text2);font-weight:600">Alınan / Hedef</div>
        <div style="font-size:1.2rem;font-weight:900;color:var(--accent)">${t.cal} <span style="font-size:.7rem;font-weight:600;color:var(--text2)">/ ${dailyTarget} kcal</span></div>
        ${pBar(t.cal,dailyTarget,'var(--accent)')}
      </div>
      <div style="flex:1;min-width:100px;padding:10px;background:var(--glass);border-radius:10px;border:1px solid var(--border)">
        <div style="font-size:.68rem;color:var(--text2);font-weight:600">Kalan</div>
        <div style="font-size:1.1rem;font-weight:900;color:${remaining<0?'var(--red)':'var(--green)'}">${remaining} kcal</div>
        <div style="font-size:.62rem;color:var(--text2);margin-top:2px">${calPct}% dolu</div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
      <div style="padding:8px;background:rgba(255,122,122,.06);border-radius:8px;border:1px solid rgba(255,122,122,.1)">
        <div style="font-size:.66rem;color:var(--text2)">🥩 Protein</div>
        <div style="font-weight:800;font-size:.95rem;color:#ff7a7a">${Math.round(t.prot)}g <span style="font-size:.62rem;color:var(--text2)">/ ${protTarget}g</span></div>
        ${pBar(t.prot,protTarget,'#ff7a7a')}
      </div>
      <div style="padding:8px;background:rgba(34,211,238,.06);border-radius:8px;border:1px solid rgba(34,211,238,.1)">
        <div style="font-size:.66rem;color:var(--text2)">🌾 Karbonhidrat</div>
        <div style="font-weight:800;font-size:.95rem;color:#22d3ee">${Math.round(t.carb)}g <span style="font-size:.62rem;color:var(--text2)">/ ${carbTarget}g</span></div>
        ${pBar(t.carb,carbTarget,'#22d3ee')}
      </div>
      <div style="padding:8px;background:rgba(255,204,85,.06);border-radius:8px;border:1px solid rgba(255,204,85,.1)">
        <div style="font-size:.66rem;color:var(--text2)">🫒 Yağ</div>
        <div style="font-weight:800;font-size:.95rem;color:#ffcc55">${Math.round(t.fat)}g <span style="font-size:.62rem;color:var(--text2)">/ ${fatTarget}g</span></div>
        ${pBar(t.fat,fatTarget,'#ffcc55')}
      </div>
      <div style="padding:8px;background:rgba(34,211,238,.06);border-radius:8px;border:1px solid rgba(34,211,238,.1)">
        <div style="font-size:.66rem;color:var(--text2)">💧 Su</div>
        <div style="font-weight:800;font-size:.95rem;color:#22d3ee">${todayWater}ml <span style="font-size:.62rem;color:var(--text2)">/ ${waterTarget}ml</span></div>
        ${pBar(todayWater,waterTarget,'#22d3ee')}
      </div>
    </div>
    ${todayObj.foods.length?`
    <div style="border-top:1px solid var(--border);padding-top:10px">
      <div style="display:flex;justify-content:space-between;align-items:center;cursor:pointer" onclick="toggleDayDetail('todayFoodList')">
        <span style="font-size:.8rem;font-weight:700">📋 Bugün Yenenler (${todayObj.foods.length} kalem)</span>
        <span style="color:var(--text2);font-size:.8rem">›</span>
      </div>
      <div id="todayFoodList" style="display:none;margin-top:8px">${dayFoodList(todayObj)}</div>
    </div>`:''}
  </div>`;

  // --- Mikro Besinler ---
  if(todayObj.foods.length){
    html+=`<div class="stat-card" style="animation-delay:.06s">
      <h3>🔬 Mikro Besin Tahmini <span style="font-size:.62rem;color:var(--text2);font-weight:400">(yaklaşık)</span></h3>
      <p style="font-size:.7rem;color:var(--text2);margin-bottom:10px">Besin verisi mevcut olmadığından kategori bazlı tahmindir. Gerçek değerler farklılık gösterebilir.</p>
      <div style="display:flex;flex-direction:column;gap:8px">
        <div>
          <div style="display:flex;justify-content:space-between;font-size:.78rem"><span>🍊 C Vitamini</span><span style="font-weight:700">${micro.vC}mg <span style="color:var(--text2);font-weight:400">/ 90mg</span></span></div>
          ${pBar(micro.vC,90,'#ff9a3c')}
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;font-size:.78rem"><span>☀️ D Vitamini</span><span style="font-weight:700">${micro.vD}mcg <span style="color:var(--text2);font-weight:400">/ 20mcg</span></span></div>
          ${pBar(micro.vD,20,'#ffd700')}
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;font-size:.78rem"><span>🩸 B12 Vitamini</span><span style="font-weight:700">${micro.vB12}mcg <span style="color:var(--text2);font-weight:400">/ 2.4mcg</span></span></div>
          ${pBar(micro.vB12,2.4,'#a07cf8')}
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;font-size:.78rem"><span>⚙️ Demir</span><span style="font-weight:700">${micro.demir}mg <span style="color:var(--text2);font-weight:400">/ 18mg</span></span></div>
          ${pBar(micro.demir,18,'#e87a5a')}
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;font-size:.78rem"><span>🦴 Kalsiyum</span><span style="font-weight:700">${micro.kalsiyum}mg <span style="color:var(--text2);font-weight:400">/ 1000mg</span></span></div>
          ${pBar(micro.kalsiyum,1000,'#22d3ee')}
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;font-size:.78rem"><span>🌾 Lif</span><span style="font-weight:700">${micro.lif}g <span style="color:var(--text2);font-weight:400">/ 30g</span></span></div>
          ${pBar(micro.lif,30,'#3dd68c')}
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;font-size:.78rem"><span>🧂 Sodyum</span><span style="font-weight:700">${micro.sodyum}mg <span style="color:var(--text2);font-weight:400">/ 2300mg</span></span></div>
          ${pBar(micro.sodyum,2300,'#f0a030')}
        </div>
      </div>
    </div>`;
  }

  document.getElementById('statsContainer').innerHTML=bodyScoreHtml+statsHtml+html+generateReportSection();

  // Init report date defaults
  requestAnimationFrame(function(){
    var today=new Date();
    var todayStr=today.getFullYear()+'-'+String(today.getMonth()+1).padStart(2,'0')+'-'+String(today.getDate()).padStart(2,'0');
    var weekAgo=new Date(today);weekAgo.setDate(weekAgo.getDate()-7);
    var weekAgoStr=weekAgo.getFullYear()+'-'+String(weekAgo.getMonth()+1).padStart(2,'0')+'-'+String(weekAgo.getDate()).padStart(2,'0');
    var rStart=document.getElementById('reportStartDate');
    var rEnd=document.getElementById('reportEndDate');
    if(rStart)rStart.value=weekAgoStr;
    if(rEnd)rEnd.value=todayStr;
    onReportPeriodChange();
  });

  // Grafikleri çiz — innerHTML set edildikten sonra
  requestAnimationFrame(function(){
    var isDark=document.documentElement.getAttribute('data-theme')!=='light';
    var gridColor=isDark?'rgba(255,255,255,.06)':'rgba(0,0,0,.06)';
    var textColor=isDark?'#6b7094':'#6b7084';
    Chart.defaults.color=textColor;

    // 1. Kalori Trend Çizgi Grafiği
    var ctx1=document.getElementById('calTrendChart');
    if(ctx1){
      if(ctx1._chart) ctx1._chart.destroy();
      var calData=weekDays.map(function(d){return d.cal;});
      var labels=weekDays.map(function(d){return d.day;});
      var protData=weekDays.map(function(d){return d.prot*4;}); // kcal cinsinden
      var carbData=weekDays.map(function(d){return d.carb*4;});
      var fatData=weekDays.map(function(d){return d.fat*9;});
      ctx1._chart=new Chart(ctx1,{
        type:'line',
        data:{
          labels:labels,
          datasets:[
            {label:'Kalori',data:calData,borderColor:'#ff6b3d',backgroundColor:'rgba(255,107,61,.08)',tension:.4,fill:true,pointBackgroundColor:'#ff6b3d',pointRadius:3,pointHoverRadius:5,borderWidth:2},
            {label:'Hedef',data:Array(7).fill(dailyTarget),borderColor:'rgba(255,255,255,.15)',borderDash:[4,4],pointRadius:0,fill:false,borderWidth:1},
            {label:'Protein',data:protData,borderColor:'#ff7a7a',backgroundColor:'transparent',tension:.4,fill:false,pointRadius:2,pointHoverRadius:4,borderWidth:1.5,borderDash:[],hidden:false},
            {label:'Karb',data:carbData,borderColor:'#60a5fa',backgroundColor:'transparent',tension:.4,fill:false,pointRadius:2,pointHoverRadius:4,borderWidth:1.5},
            {label:'Yağ',data:fatData,borderColor:'#ffcc55',backgroundColor:'transparent',tension:.4,fill:false,pointRadius:2,pointHoverRadius:4,borderWidth:1.5}
          ]
        },
        options:{
          responsive:true,maintainAspectRatio:false,
          plugins:{
            legend:{
              display:true,
              position:'bottom',
              labels:{boxWidth:10,font:{size:10},padding:8,color:textColor}
            },
            tooltip:{callbacks:{label:function(c){
              var u=c.dataset.label==='Kalori'||c.dataset.label==='Hedef'?'kcal':' kcal (makro)';
              return c.dataset.label+': '+c.parsed.y+u;
            }}}
          },
          scales:{
            x:{grid:{color:gridColor},ticks:{font:{size:10}}},
            y:{grid:{color:gridColor},ticks:{font:{size:10}},beginAtZero:true}
          }
        }
      });
    }

    // 2. Bugünkü Makro Donut
    var ctx2=document.getElementById('macroDonutChart');
    if(ctx2){
      if(ctx2._chart) ctx2._chart.destroy();
      var protCal=t.prot*4, carbCal=t.carb*4, fatCal=t.fat*9;
      var total=protCal+carbCal+fatCal||1;
      ctx2._chart=new Chart(ctx2,{
        type:'doughnut',
        data:{
          datasets:[{data:[protCal,carbCal,fatCal],backgroundColor:['#ff7a7a','#60a5fa','#ffcc55'],borderWidth:0,hoverOffset:4}]
        },
        options:{
          responsive:true,maintainAspectRatio:false,
          plugins:{legend:{display:false},tooltip:{callbacks:{label:function(c){var pct=Math.round(c.parsed/total*100);return ['Protein','Karb','Yağ'][c.dataIndex]+': '+pct+'%';}}}}
        }
      });
    }

    // 3. Haftalık Ortalama Makro Donut
    var ctx3=document.getElementById('weeklyMacroChart');
    if(ctx3){
      if(ctx3._chart) ctx3._chart.destroy();
      var wProtCal=avgProt*4, wCarbCal=avgCarb*4, wFatCal=avgFat*9;
      var wTotal=wProtCal+wCarbCal+wFatCal||1;
      ctx3._chart=new Chart(ctx3,{
        type:'doughnut',
        data:{
          datasets:[{data:[wProtCal,wCarbCal,wFatCal],backgroundColor:['#ff7a7a','#60a5fa','#ffcc55'],borderWidth:0,hoverOffset:4}]
        },
        options:{
          responsive:true,maintainAspectRatio:false,
          plugins:{legend:{display:false},tooltip:{callbacks:{label:function(c){var pct=Math.round(c.parsed/wTotal*100);return ['Protein','Karb','Yağ'][c.dataIndex]+': '+pct+'%';}}}}
        }
      });
    }
  });
}

function generateReportSection(){
  return `<div class="stat-card" style="animation-delay:.12s">
    <h3>📄 Rapor Oluştur</h3>
    <p style="font-size:.74rem;color:var(--text2);margin-bottom:10px">Günlük, haftalık, aylık veya özel tarih aralığında raporunuzu çıkartın.</p>
    <div style="display:flex;gap:4px;margin-bottom:10px;background:var(--glass);border-radius:10px;padding:3px;border:1px solid var(--border)">
      <button onclick="setReportPeriod('weekly')" id="rp-weekly" class="cat-pill active" style="flex:1;text-align:center;border:none;margin:0;border-radius:8px;padding:8px 4px;font-size:.72rem">📆 Haftalık</button>
      <button onclick="setReportPeriod('monthly')" id="rp-monthly" class="cat-pill" style="flex:1;text-align:center;border:none;margin:0;border-radius:8px;padding:8px 4px;font-size:.72rem">🗓️ Aylık</button>
      <button onclick="setReportPeriod('custom')" id="rp-custom" class="cat-pill" style="flex:1;text-align:center;border:none;margin:0;border-radius:8px;padding:8px 4px;font-size:.72rem">📐 Özel</button>
    </div>
    <div id="reportDateRange" style="display:none;margin-bottom:10px">
      <div style="display:flex;gap:12px">
        <div style="flex:1;min-width:0">
          <label style="font-size:.68rem;color:var(--text2);font-weight:600;display:block;margin-bottom:4px">📅 Başlangıç</label>
          <input type="date" id="reportStartDate" style="width:100%;padding:10px 8px;background:var(--glass);border:1.5px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font,system-ui);font-size:.78rem;box-sizing:border-box;min-width:0">
        </div>
        <div style="flex:1;min-width:0">
          <label style="font-size:.68rem;color:var(--text2);font-weight:600;display:block;margin-bottom:4px">📅 Bitiş</label>
          <input type="date" id="reportEndDate" style="width:100%;padding:10px 8px;background:var(--glass);border:1.5px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font,system-ui);font-size:.78rem;box-sizing:border-box;min-width:0">
        </div>
      </div>
    </div>
    <div id="reportEmptyOption" style="display:none;margin-bottom:10px">
      <label style="display:flex;align-items:center;gap:6px;font-size:.76rem;font-weight:600;padding:8px 10px;background:var(--glass);border:1px solid var(--border);border-radius:8px;cursor:pointer">
        <input type="checkbox" id="reportIncludeEmpty" checked> Boş günleri dahil et
      </label>
    </div>
    <button onclick="generateReport()" style="width:100%;padding:11px;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;border:none;border-radius:var(--radius-sm);font-family:var(--font,system-ui);font-weight:800;font-size:.85rem;cursor:pointer;box-shadow:0 4px 12px rgba(255,107,61,.2)">📊 Rapor Oluştur</button>
    <div id="reportResult" style="margin-top:12px"></div>
  </div>`;
}

var _reportPeriod='weekly';

function setReportPeriod(p){
  _reportPeriod=p;
  ['weekly','monthly','custom'].forEach(function(k){
    var btn=document.getElementById('rp-'+k);
    if(btn){
      btn.classList.toggle('active',k===p);
      btn.style.background=k===p?'var(--accent)':'transparent';
      btn.style.color=k===p?'#fff':'var(--text2)';
      btn.style.borderColor=k===p?'var(--accent)':'var(--border)';
    }
  });
  onReportPeriodChange();
}

function onReportPeriodChange(){
  var dateRange=document.getElementById('reportDateRange');
  var emptyOpt=document.getElementById('reportEmptyOption');
  if(dateRange)dateRange.style.display=_reportPeriod==='custom'?'block':'none';
  if(emptyOpt)emptyOpt.style.display='block';
}

function getReportDateRange(){
  var today=new Date();
  var start,end;
  if(_reportPeriod==='weekly'){
    end=new Date(today);start=new Date(today);start.setDate(start.getDate()-6);
  } else if(_reportPeriod==='monthly'){
    end=new Date(today);start=new Date(today.getFullYear(),today.getMonth(),1);
  } else {
    var sv=document.getElementById('reportStartDate').value;
    var ev=document.getElementById('reportEndDate').value;
    start=sv?new Date(sv):new Date(today);
    end=ev?new Date(ev):new Date(today);
  }
  start.setHours(0,0,0,0);end.setHours(23,59,59,999);
  return{start:start,end:end};
}

function generateReport(){
  var range=getReportDateRange();
  var includeEmpty=!!(document.getElementById('reportIncludeEmpty')&&document.getElementById('reportIncludeEmpty').checked);
  var container=document.getElementById('reportResult');
  if(!container)return;

  var allDays=[];var d=new Date(range.start);
  while(d<=range.end){
    var dk=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
    var dayData=getDayData(dk);
    var dayCal=0,dayProt=0,dayCarb=0,dayFat=0,foodCount=0;
    var dayFoods=[];
    Object.entries(dayData).forEach(function(entry){var meal=entry[0];var foods=entry[1];foods.forEach(function(f){dayCal+=f.cal;dayProt+=f.prot||0;dayCarb+=f.carb||0;dayFat+=f.fat||0;foodCount++;dayFoods.push({name:f.name,emoji:f.emoji||'🍽️',cal:f.cal,prot:f.prot||0,carb:f.carb||0,fat:f.fat||0,meal:meal});});});
    var dayWater=parseInt(localStorage.getItem('fs_water_'+dk))||0;
    var isEmpty=dayCal===0&&foodCount===0;
    allDays.push({dk:dk,date:new Date(d),cal:Math.round(dayCal),prot:Math.round(dayProt),carb:Math.round(dayCarb),fat:Math.round(dayFat),water:dayWater,foods:foodCount,isEmpty:isEmpty,foodList:dayFoods});
    d.setDate(d.getDate()+1);
  }

  // Filter for display based on includeEmpty
  var days=includeEmpty?allDays:allDays.filter(function(d){return !d.isEmpty;});

  if(!days.length){
    container.innerHTML='<div style="text-align:center;padding:16px;color:var(--text2);font-size:.82rem">Seçilen aralıkta veri bulunamadı.</div>';
    return;
  }

  var tgt=getTodayTargets();
  var activeDays=allDays.filter(function(d){return !d.isEmpty;});
  var totalDays=days.length;
  var totalCal=days.reduce(function(s,d){return s+d.cal;},0);
  var totalProt=days.reduce(function(s,d){return s+d.prot;},0);
  var totalCarb=days.reduce(function(s,d){return s+d.carb;},0);
  var totalFat=days.reduce(function(s,d){return s+d.fat;},0);
  var totalWater=days.reduce(function(s,d){return s+d.water;},0);
  var totalFoods=days.reduce(function(s,d){return s+d.foods;},0);

  // Ortalama: boş günler dahilse tüm günlere böl, değilse sadece aktif günlere
  var avgBase=includeEmpty?totalDays:(activeDays.length||1);
  var avgCal=Math.round(totalCal/avgBase);
  var avgProt=Math.round(totalProt/avgBase);
  var avgCarb=Math.round(totalCarb/avgBase);
  var avgFat=Math.round(totalFat/avgBase);
  var avgWater=Math.round(totalWater/avgBase);
  var maxCalDay=days.reduce(function(m,d){return d.cal>m.cal?d:m;},days[0]);
  var minCalDay=activeDays.length?activeDays.reduce(function(m,d){return d.cal<m.cal?d:m;},activeDays[0]):days[0];
  var onTargetDays=activeDays.filter(function(d){return d.cal>=tgt.cal*0.85&&d.cal<=tgt.cal*1.15;}).length;
  var overDays=activeDays.filter(function(d){return d.cal>tgt.cal*1.15;}).length;
  var underDays=activeDays.filter(function(d){return d.cal<tgt.cal*0.85;}).length;

  var periodLabel=_reportPeriod==='weekly'?'Haftalık':_reportPeriod==='monthly'?'Aylık':'Özel Aralık';
  var dateLabel=days.length===1?days[0].date.toLocaleDateString('tr-TR'):days[0].date.toLocaleDateString('tr-TR')+' — '+days[days.length-1].date.toLocaleDateString('tr-TR');
  var avgNote=includeEmpty?' <span style="font-size:.58rem;color:var(--text2)">(boş günler dahil)</span>':' <span style="font-size:.58rem;color:var(--text2)">(aktif günler)</span>';

  var html='<div style="background:var(--glass);border:1px solid var(--border);border-radius:12px;padding:14px;animation:fadeUp .3s ease">';
  html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">';
  html+='<div style="font-weight:800;font-size:.9rem">📄 '+periodLabel+' Rapor</div>';
  html+='<span style="font-size:.68rem;color:var(--text2)">'+dateLabel+'</span>';
  html+='</div>';

  // Özet kartlar
  html+='<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;margin-bottom:12px">';
  html+='<div style="padding:8px;background:var(--glass);border-radius:8px;border:1px solid var(--border);text-align:center"><div style="font-size:.62rem;color:var(--text2)">Toplam Kalori</div><div style="font-weight:900;font-size:1rem;color:var(--accent)">'+totalCal+'</div><div style="font-size:.58rem;color:var(--text2)">kcal</div></div>';
  html+='<div style="padding:8px;background:var(--glass);border-radius:8px;border:1px solid var(--border);text-align:center"><div style="font-size:.62rem;color:var(--text2)">Ort. Kalori/Gün'+avgNote+'</div><div style="font-weight:900;font-size:1rem;color:var(--accent)">'+avgCal+'</div><div style="font-size:.58rem;color:var(--text2)">kcal ('+avgBase+' gün)</div></div>';
  html+='<div style="padding:8px;background:var(--glass);border-radius:8px;border:1px solid var(--border);text-align:center"><div style="font-size:.62rem;color:var(--text2)">Toplam Yemek</div><div style="font-weight:900;font-size:1rem;color:var(--blue)">'+totalFoods+'</div><div style="font-size:.58rem;color:var(--text2)">kalem</div></div>';
  html+='<div style="padding:8px;background:var(--glass);border-radius:8px;border:1px solid var(--border);text-align:center"><div style="font-size:.62rem;color:var(--text2)">Ort. Su/Gün</div><div style="font-weight:900;font-size:1rem;color:#22d3ee">'+(avgWater/1000).toFixed(1)+'L</div><div style="font-size:.58rem;color:var(--text2)">'+(totalWater/1000).toFixed(1)+'L toplam</div></div>';
  html+='</div>';

  // ───── GRAFİKLER ─────
  if(days.length>1){
    // Kalori trend çizgi grafiği
    html+='<div style="background:var(--card);border-radius:var(--radius-sm);padding:12px;margin-bottom:10px;border:1px solid var(--border)">';
    html+='<div style="font-weight:700;font-size:.78rem;margin-bottom:8px">📈 Kalori Trendi</div>';
    html+='<div style="position:relative;height:140px;width:100%"><canvas id="reportTrendChart"></canvas></div>';
    html+='</div>';

    // Makro dağılım donut + günlük bar yan yana
    html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">';
    // Makro donut
    html+='<div style="background:var(--card);border-radius:var(--radius-sm);padding:10px;border:1px solid var(--border)">';
    html+='<div style="font-weight:700;font-size:.72rem;margin-bottom:6px;text-align:center">🥗 Makro Dağılım</div>';
    html+='<div style="position:relative;height:90px;width:90px;margin:0 auto"><canvas id="reportMacroDonut"></canvas></div>';
    html+='<div style="display:flex;gap:3px;margin-top:6px;font-size:.58rem;justify-content:center;flex-wrap:wrap">';
    html+='<span style="color:#ff7a7a">P '+avgProt+'g</span><span style="color:var(--text2)">·</span>';
    html+='<span style="color:#60a5fa">K '+avgCarb+'g</span><span style="color:var(--text2)">·</span>';
    html+='<span style="color:#ffcc55">Y '+avgFat+'g</span>';
    html+='</div></div>';
    // Hedef uyum donut
    html+='<div style="background:var(--card);border-radius:var(--radius-sm);padding:10px;border:1px solid var(--border)">';
    html+='<div style="font-weight:700;font-size:.72rem;margin-bottom:6px;text-align:center">🎯 Hedef Uyum</div>';
    html+='<div style="position:relative;height:90px;width:90px;margin:0 auto"><canvas id="reportTargetDonut"></canvas></div>';
    html+='<div style="display:flex;gap:3px;margin-top:6px;font-size:.58rem;justify-content:center;flex-wrap:wrap">';
    html+='<span style="color:var(--green)">✅'+onTargetDays+'</span><span style="color:var(--text2)">·</span>';
    html+='<span style="color:var(--red)">⬆️'+overDays+'</span><span style="color:var(--text2)">·</span>';
    html+='<span style="color:var(--orange)">⬇️'+underDays+'</span>';
    if(includeEmpty&&days.length>activeDays.length) html+='<span style="color:var(--text2)">·</span><span style="color:var(--text2)">⚪'+(days.length-activeDays.length)+'</span>';
    html+='</div></div>';
    html+='</div>';

    // Su grafiği - bar chart
    html+='<div style="background:var(--card);border-radius:var(--radius-sm);padding:12px;margin-bottom:10px;border:1px solid var(--border)">';
    html+='<div style="font-weight:700;font-size:.78rem;margin-bottom:8px">💧 Su Tüketimi</div>';
    html+='<div style="position:relative;height:110px;width:100%"><canvas id="reportWaterChart"></canvas></div>';
    html+='</div>';
  }

  // Makro özet
  html+='<div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap">';
  html+='<div style="flex:1;min-width:70px;padding:6px;background:rgba(255,122,122,.06);border-radius:8px;text-align:center"><div style="font-size:.58rem;color:var(--text2)">Ort. Protein</div><div style="font-weight:800;font-size:.88rem;color:#ff7a7a">'+avgProt+'g</div></div>';
  html+='<div style="flex:1;min-width:70px;padding:6px;background:rgba(34,211,238,.06);border-radius:8px;text-align:center"><div style="font-size:.58rem;color:var(--text2)">Ort. Karb</div><div style="font-weight:800;font-size:.88rem;color:#22d3ee">'+avgCarb+'g</div></div>';
  html+='<div style="flex:1;min-width:70px;padding:6px;background:rgba(255,204,85,.06);border-radius:8px;text-align:center"><div style="font-size:.58rem;color:var(--text2)">Ort. Yağ</div><div style="font-weight:800;font-size:.88rem;color:#ffcc55">'+avgFat+'g</div></div>';
  html+='</div>';

  // Hedef uyum (text)
  if(totalDays>1){
    html+='<div style="padding:10px;background:var(--glass);border-radius:8px;border:1px solid var(--border);margin-bottom:12px">';
    html+='<div style="font-size:.74rem;font-weight:700;margin-bottom:6px">🎯 Hedef Uyumu (±%15)</div>';
    html+='<div style="display:flex;gap:8px;font-size:.76rem;flex-wrap:wrap">';
    html+='<span style="color:var(--green)">✅ '+onTargetDays+' hedefe uygun</span>';
    html+='<span style="color:var(--red)">⬆️ '+overDays+' aşım</span>';
    html+='<span style="color:var(--orange)">⬇️ '+underDays+' düşük</span>';
    if(includeEmpty&&days.length>activeDays.length) html+='<span style="color:var(--text2)">⚪ '+(days.length-activeDays.length)+' boş</span>';
    html+='</div>';
    html+='</div>';
  }

  // En yüksek/düşük gün
  if(activeDays.length>1){
    html+='<div style="display:flex;gap:6px;margin-bottom:12px">';
    html+='<div style="flex:1;padding:8px;background:rgba(255,92,92,.06);border-radius:8px;border:1px solid rgba(255,92,92,.1)"><div style="font-size:.62rem;color:var(--text2)">📈 En Yüksek</div><div style="font-weight:800;font-size:.85rem;color:var(--red)">'+maxCalDay.cal+' kcal</div><div style="font-size:.58rem;color:var(--text2)">'+maxCalDay.date.toLocaleDateString('tr-TR')+'</div></div>';
    html+='<div style="flex:1;padding:8px;background:rgba(61,214,140,.06);border-radius:8px;border:1px solid rgba(61,214,140,.1)"><div style="font-size:.62rem;color:var(--text2)">📉 En Düşük</div><div style="font-weight:800;font-size:.85rem;color:var(--green)">'+minCalDay.cal+' kcal</div><div style="font-size:.58rem;color:var(--text2)">'+minCalDay.date.toLocaleDateString('tr-TR')+'</div></div>';
    html+='</div>';
  }

  // Günlük detay listesi
  if(totalDays>1){
    html+='<div style="border-top:1px solid var(--border);padding-top:10px">';
    html+='<div style="font-size:.78rem;font-weight:700;margin-bottom:8px">📋 Günlük Detaylar ('+totalDays+' gün)</div>';
    html+='<div style="max-height:400px;overflow-y:auto">';
    days.forEach(function(day,idx){
      var dayNames=['Paz','Pzt','Sal','Çar','Per','Cum','Cmt'];
      var dn=dayNames[day.date.getDay()];
      var pctCal=tgt.cal?Math.round((day.cal/tgt.cal)*100):0;
      var barColor=day.isEmpty?'var(--text2)':pctCal>115?'var(--red)':pctCal>85?'var(--green)':'var(--orange)';
      var todayCheck=day.date.toDateString()===new Date().toDateString();
      var dayBg=todayCheck?'var(--accent)':day.isEmpty?'var(--glass)':day.cal>tgt.cal?'rgba(255,92,92,.15)':'rgba(61,214,140,.1)';
      var dayCol=todayCheck?'#fff':day.isEmpty?'var(--text2)':day.cal>tgt.cal?'var(--red)':'var(--green)';
      html+='<div style="cursor:pointer;padding:6px 0;border-bottom:1px solid var(--border);opacity:'+(day.isEmpty?'0.5':'1')+'" onclick="toggleDayDetail(\'rpt-day-'+idx+'\')">';
      html+='<div style="display:flex;justify-content:space-between;align-items:center">';
      html+='<div style="display:flex;align-items:center;gap:8px">';
      html+='<div style="width:28px;height:28px;border-radius:8px;background:'+dayBg+';display:flex;align-items:center;justify-content:center;font-size:.68rem;font-weight:700;color:'+dayCol+'">'+dn+'</div>';
      html+='<div>';
      html+='<div style="font-size:.78rem;font-weight:600">'+day.date.toLocaleDateString('tr-TR')+(todayCheck?' <span style="color:var(--accent);font-size:.62rem">bugün</span>':'')+'</div>';
      if(!day.isEmpty) html+='<div style="font-size:.6rem;color:var(--text2)">P:'+day.prot+'g K:'+day.carb+'g Y:'+day.fat+'g 💧'+(day.water/1000).toFixed(1)+'L</div>';
      html+='</div></div>';
      html+='<div style="text-align:right;display:flex;align-items:center;gap:6px">';
      html+='<div><div style="font-weight:800;font-size:.88rem;color:'+barColor+'">'+(day.isEmpty?'—':day.cal)+'</div>';
      if(!day.isEmpty) html+='<div style="font-size:.56rem;color:var(--text2)">%'+pctCal+'</div>';
      html+='</div>';
      if(!day.isEmpty) html+='<span style="color:var(--text2);font-size:.7rem;transition:transform .2s">›</span>';
      html+='</div></div></div>';
      // Yemek detayları (gizli)
      if(!day.isEmpty&&day.foodList&&day.foodList.length){
        html+='<div id="rpt-day-'+idx+'" style="display:none;padding:8px 10px;background:var(--glass);border-radius:8px;margin-bottom:4px;border:1px solid var(--border)">';
        var mealLabels={kahvalti:'🌅 Kahvaltı',ogle:'☀️ Öğle',aksam:'🌙 Akşam',atistirmalik:'🍿 Ara'};
        var byMeal={};
        day.foodList.forEach(function(f){if(!byMeal[f.meal])byMeal[f.meal]=[];byMeal[f.meal].push(f);});
        Object.keys(byMeal).forEach(function(meal){
          html+='<div style="margin-top:6px"><div style="font-size:.7rem;font-weight:700;color:var(--text2);margin-bottom:3px">'+(mealLabels[meal]||meal)+'</div>';
          byMeal[meal].forEach(function(f){
            html+='<div style="display:flex;justify-content:space-between;font-size:.74rem;padding:2px 0;border-bottom:1px solid var(--border)">';
            html+='<span>'+f.emoji+' '+escHTML(f.name)+'</span>';
            html+='<span style="color:var(--accent);font-weight:700;flex-shrink:0;margin-left:8px">'+Math.round(f.cal)+' kal</span>';
            html+='</div>';
          });
          html+='</div>';
        });
        html+='</div>';
      }
    });
    html+='</div></div>';
  }

  html+='</div>';
  container.innerHTML=html;

  // ───── GRAFİKLERİ ÇİZ ─────
  if(days.length>1){
    requestAnimationFrame(function(){
      var isDark=document.documentElement.getAttribute('data-theme')!=='light';
      var gridColor=isDark?'rgba(255,255,255,.06)':'rgba(0,0,0,.06)';
      var textColor=isDark?'#6b7094':'#6b7084';

      // Etiketler: gün sayısına göre kısalt
      var labels=days.map(function(dd){
        if(days.length<=14) return dd.date.getDate()+'/'+(dd.date.getMonth()+1);
        return dd.date.getDate()+'';
      });

      // 1. Kalori Trend Çizgi Grafiği
      var ctx1=document.getElementById('reportTrendChart');
      if(ctx1){
        new Chart(ctx1,{
          type:'line',
          data:{
            labels:labels,
            datasets:[
              {label:'Kalori',data:days.map(function(dd){return dd.cal;}),borderColor:'#ff6b3d',backgroundColor:'rgba(255,107,61,.08)',tension:.4,fill:true,pointBackgroundColor:days.map(function(dd){return dd.isEmpty?'rgba(255,107,61,.2)':'#ff6b3d';}),pointRadius:days.length>20?1:3,pointHoverRadius:5,borderWidth:2},
              {label:'Hedef',data:days.map(function(){return tgt.cal;}),borderColor:'rgba(255,255,255,.15)',borderDash:[4,4],pointRadius:0,fill:false,borderWidth:1}
            ]
          },
          options:{
            responsive:true,maintainAspectRatio:false,
            plugins:{legend:{display:true,position:'bottom',labels:{boxWidth:8,font:{size:9},padding:6,color:textColor}},
              tooltip:{callbacks:{label:function(c){return c.dataset.label+': '+c.parsed.y+' kcal';}}}},
            scales:{x:{grid:{color:gridColor},ticks:{font:{size:8},maxRotation:0,autoSkip:true,maxTicksLimit:10}},
              y:{grid:{color:gridColor},ticks:{font:{size:9}},beginAtZero:true}}
          }
        });
      }

      // 2. Makro Donut
      var ctx2=document.getElementById('reportMacroDonut');
      if(ctx2){
        var protCal=avgProt*4,carbCal=avgCarb*4,fatCal=avgFat*9;
        var total=protCal+carbCal+fatCal||1;
        new Chart(ctx2,{
          type:'doughnut',
          data:{datasets:[{data:[protCal,carbCal,fatCal],backgroundColor:['#ff7a7a','#60a5fa','#ffcc55'],borderWidth:0,hoverOffset:4}]},
          options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},
            tooltip:{callbacks:{label:function(c){var pct=Math.round(c.parsed/total*100);return ['Protein','Karb','Yağ'][c.dataIndex]+': '+pct+'%';}}}}}
        });
      }

      // 3. Hedef Uyum Donut
      var ctx3=document.getElementById('reportTargetDonut');
      if(ctx3){
        var emptyCount=includeEmpty?(days.length-activeDays.length):0;
        var dData=[onTargetDays,overDays,underDays];
        var dColors=['#3dd68c','#ff5c5c','#f0a030'];
        var dLabels=['Hedefe Uygun','Aşım','Düşük'];
        if(emptyCount>0){dData.push(emptyCount);dColors.push('rgba(255,255,255,.1)');dLabels.push('Boş');}
        new Chart(ctx3,{
          type:'doughnut',
          data:{datasets:[{data:dData,backgroundColor:dColors,borderWidth:0,hoverOffset:4}]},
          options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},
            tooltip:{callbacks:{label:function(c){return dLabels[c.dataIndex]+': '+c.parsed+' gün';}}}}}
        });
      }

      // 4. Su Bar Chart
      var ctx4=document.getElementById('reportWaterChart');
      if(ctx4){
        new Chart(ctx4,{
          type:'bar',
          data:{
            labels:labels,
            datasets:[
              {label:'Su (ml)',data:days.map(function(dd){return dd.water;}),backgroundColor:days.map(function(dd){return dd.isEmpty?'rgba(34,211,238,.08)':'rgba(34,211,238,.4)';}),borderColor:days.map(function(dd){return dd.isEmpty?'rgba(34,211,238,.1)':'rgba(34,211,238,.7)';}),borderWidth:1,borderRadius:3},
              {label:'Hedef',data:days.map(function(){return tgt.water;}),type:'line',borderColor:'rgba(34,211,238,.2)',borderDash:[4,4],pointRadius:0,fill:false,borderWidth:1}
            ]
          },
          options:{
            responsive:true,maintainAspectRatio:false,
            plugins:{legend:{display:true,position:'bottom',labels:{boxWidth:8,font:{size:9},padding:6,color:textColor}},
              tooltip:{callbacks:{label:function(c){return c.dataset.label+': '+c.parsed.y+'ml';}}}},
            scales:{x:{grid:{color:gridColor},ticks:{font:{size:8},maxRotation:0,autoSkip:true,maxTicksLimit:10}},
              y:{grid:{color:gridColor},ticks:{font:{size:9}},beginAtZero:true}}
          }
        });
      }
    });
  }
}

function toggleDayDetail(id){
  const el=document.getElementById(id);
  if(el) el.style.display=el.style.display==='none'?'block':'none';
}

function calculateTDEE(){const gender=document.getElementById('pGender').value;const age=parseInt(document.getElementById('pAge').value);const height=parseInt(document.getElementById('pHeight').value);const weight=parseInt(document.getElementById('pWeight').value);const activity=parseFloat(document.getElementById('pActivity').value);const goal=parseInt(document.getElementById('pGoal').value);let bmr;if(gender==='male')bmr=10*weight+6.25*height-5*age+5;else bmr=10*weight+6.25*height-5*age-161;const tdee=Math.round(bmr*activity+goal);dailyTarget=tdee;protTarget=Math.round((tdee*.30)/4);carbTarget=Math.round((tdee*.45)/4);fatTarget=Math.round((tdee*.25)/9);waterTarget=parseInt(document.getElementById('pWater').value)||2000;document.getElementById('tdeeNum').textContent=tdee;document.getElementById('calResult').classList.add('show');saveProfile();updateHeader();updateWaterHeader();renderMeals();calculateBMI(weight,height);updateProfileInsight();showToast(`🎯 Günlük hedef: ${tdee} kcal`)}

function calculateBMI(weight,height){
  if(!weight||!height)return;
  const h=height/100;
  const bmi=weight/(h*h);
  const bmiRound=Math.round(bmi*10)/10;
  document.getElementById('bmiValue').textContent=bmiRound;
  // Pointer position (BMI 15-40 maps to 0-100%)
  const pct=Math.min(100,Math.max(0,((bmi-15)/25)*100));
  document.getElementById('bmiPointer').style.left=pct+'%';

  let cat='',color='',comment='';
  const goalW=parseFloat(document.getElementById('pGoalWeight').value)||weight;
  const diff=Math.round(weight-goalW);

  if(bmi<18.5){cat='Zayıf';color='#22d3ee';comment=`VKİ'niz ${bmiRound} — normal aralığın altındasınız. ${diff<0?'Hedefinize '+Math.abs(diff)+' kg kaldı. Sağlıklı kilo almak için günlük kalori alımınızı artırmanız ve protein ağırlıklı beslenmeniz önerilir.':'Dengeli ve yeterli kalori alarak sağlıklı bir kiloya ulaşabilirsiniz.'}`}
  else if(bmi<25){cat='Normal';color='var(--green)';comment=`VKİ'niz ${bmiRound} — ideal aralıktasınız! ${diff>0?'Hedefinize '+diff+' kg kaldı. Mevcut dengenizi koruyarak hedefe ulaşabilirsiniz.':diff<0?'Hedefinize '+Math.abs(diff)+' kg kaldı.':'Hedefteki kilonuzdasınız, harika!'}`}
  else if(bmi<30){cat='Kilolu';color='var(--orange)';comment=`VKİ'niz ${bmiRound} — normal aralığın üzerinde. ${diff>0?'Hedefinize '+diff+' kg kaldı. Günlük 300-500 kcal açık vererek sağlıklı tempoda kilo verebilirsiniz. Ani diyetlerden kaçının.':'Protein ağırlıklı beslenme ve düzenli fiziksel aktivite ile dengeye ulaşabilirsiniz.'}`}
  else{cat='Obez';color='var(--red)';comment=`VKİ'niz ${bmiRound} — sağlık riskleri artmış durumda. ${diff>0?'Hedefinize '+diff+' kg kaldı. ':''}Bir sağlık uzmanıyla görüşmeniz ve kademeli kilo verme planı oluşturmanız önerilir.`}

  document.getElementById('bmiValue').style.color=color;
  document.getElementById('bmiComment').innerHTML=`<strong style="color:${color}">${cat}</strong> — ${comment}`;
  document.getElementById('bmiResult').style.display='block';
}




function openPrepModal(){document.getElementById('prepModal').classList.add('show')}
function closePrepModal(){
  var el=document.getElementById('prepModal');
  el.querySelectorAll('input,textarea,select').forEach(function(i){i.blur()});
  el.classList.remove('show');
}
function switchPrepTab(tab){
  document.getElementById('prepPanelCombo').style.display=tab==='combo'?'block':'none';
  document.getElementById('prepPanelDaily').style.display=tab==='daily'?'block':'none';
  document.getElementById('prepPanelWeekly').style.display=tab==='weekly'?'block':'none';
  var tabs={combo:'prepTabCombo',daily:'prepTabDaily',weekly:'prepTabWeekly'};
  Object.keys(tabs).forEach(function(t){
    var btn=document.getElementById(tabs[t]);
    if(!btn)return;
    btn.style.background=t===tab?'var(--accent)':'transparent';
    btn.style.color=t===tab?'#fff':'var(--text2)';
  });
  if(tab==='weekly')prepRenderWeeklyDays();
}
