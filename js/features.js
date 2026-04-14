// FitSofra — Exercise, Bottom Sheet, App Tour & AI Assistant Module
// Extracted from index.html for modularity

// ══════════════════════════════════════════════════════════════════
//  EGZERSİZ TAKİBİ
//  Formül: kcal = MET × 3.5 × kilo(kg) ÷ 200 × süre(dk)
//  Referans ağırlık: profildeki kilo, yoksa 70 kg
// ══════════════════════════════════════════════════════════════════

// MET kaynağı: Compendium of Physical Activities (2024) + Türkçe kaynaklar
const EXERCISE_DB = [
  // KARDİO
  {name:'Yavaş Yürüyüş (3 km/s)',emoji:'🚶',cat:'kardio',met:2.8,desc:'Rahat tempoda yürüyüş'},
  {name:'Orta Yürüyüş (5 km/s)',emoji:'🚶',cat:'kardio',met:3.5,desc:'Normal tempo'},
  {name:'Pratik Yürüyüş (6 km/s)',emoji:'🚶',cat:'kardio',met:4.8,desc:'Tempolu yürüyüş'},
  {name:'Hafif Koşu (8 km/s)',emoji:'🏃',cat:'kardio',met:8.0,desc:'Jogging'},
  {name:'Orta Koşu (10 km/s)',emoji:'🏃',cat:'kardio',met:10.0,desc:'Kondisyon koşusu'},
  {name:'Pratik Koşu (12 km/s)',emoji:'🏃',cat:'kardio',met:12.0,desc:'Hız koşusu'},
  {name:'Düşük Tempo Bisiklet',emoji:'🚴',cat:'kardio',met:5.5,desc:'15 km/s, rahat'},
  {name:'Orta Tempo Bisiklet',emoji:'🚴',cat:'kardio',met:7.5,desc:'20 km/s'},
  {name:'Yüksek Tempo Bisiklet',emoji:'🚴',cat:'kardio',met:10.0,desc:'25+ km/s'},
  {name:'Kondisyon Bisikleti (hafif)',emoji:'🚴',cat:'kardio',met:5.5,desc:'Sabit bisiklet'},
  {name:'Kondisyon Bisikleti (yoğun)',emoji:'🚴',cat:'kardio',met:8.5,desc:'Sabit bisiklet, zor'},
  {name:'Yüzme (hafif)',emoji:'🏊',cat:'su',met:6.0,desc:'Serbest stil, yavaş'},
  {name:'Yüzme (orta)',emoji:'🏊',cat:'su',met:8.0,desc:'Serbest stil, orta'},
  {name:'Yüzme (yoğun)',emoji:'🏊',cat:'su',met:10.0,desc:'Serbest stil, hızlı'},
  {name:'İp Atlama (orta)',emoji:'🪢',cat:'kardio',met:10.0,desc:'Orta tempo'},
  {name:'İp Atlama (hızlı)',emoji:'🪢',cat:'kardio',met:12.0,desc:'Pratik tempo'},
  {name:'Aerobik (hafif)',emoji:'💃',cat:'kardio',met:4.5,desc:'Low impact aerobik'},
  {name:'Aerobik (yoğun)',emoji:'💃',cat:'kardio',met:7.0,desc:'High impact aerobik'},
  {name:'HIIT',emoji:'⚡',cat:'kardio',met:10.0,desc:'Yüksek yoğunluklu interval'},
  {name:'Elliptical (orta)',emoji:'🏋️',cat:'kardio',met:5.0,desc:'Eliptik bisiklet'},
  {name:'Kürek Makinesi',emoji:'🚣',cat:'kardio',met:7.0,desc:'Rowing machine'},
  {name:'Step Aerobik',emoji:'🪜',cat:'kardio',met:8.5,desc:'Basamak aerobiği'},
  {name:'Dans (orta)',emoji:'💃',cat:'kardio',met:4.8,desc:'Sosyal dans'},
  {name:'Zumba',emoji:'💃',cat:'kardio',met:6.5,desc:'Zumba dersi'},
  {name:'Kickboks',emoji:'🥊',cat:'kuvvet',met:7.5,desc:'Kickboxing antrenmanı'},
  {name:'Boks (torba)',emoji:'🥊',cat:'kuvvet',met:6.0,desc:'Kum torbası'},
  {name:'Yürüyüş (merdiven)',emoji:'🪜',cat:'kardio',met:8.0,desc:'Merdiven çıkma'},
  {name:'Dağ Yürüyüşü',emoji:'🥾',cat:'kardio',met:7.0,desc:'Hiking / doğa yürüyüşü'},
  // KUVVET
  {name:'Ağırlık Antrenmanı (hafif)',emoji:'🏋️',cat:'kuvvet',met:3.5,desc:'Hafif ağırlıklar'},
  {name:'Ağırlık Antrenmanı (orta)',emoji:'🏋️',cat:'kuvvet',met:5.0,desc:'Orta ağırlıklar'},
  {name:'Ağırlık Antrenmanı (yoğun)',emoji:'🏋️',cat:'kuvvet',met:6.0,desc:'Ağır ağırlıklar'},
  {name:'Şınav / Mekik / Squat',emoji:'💪',cat:'kuvvet',met:3.8,desc:'Vücut ağırlığı egz.'},
  {name:'Plank',emoji:'💪',cat:'kuvvet',met:4.0,desc:'Core stabilizasyon'},
  {name:'CrossFit',emoji:'🏋️',cat:'kuvvet',met:8.0,desc:'CrossFit WOD'},
  {name:'TRX / Suspension',emoji:'💪',cat:'kuvvet',met:5.0,desc:'Suspension antrenmanı'},
  {name:'Kettlebell',emoji:'🏋️',cat:'kuvvet',met:7.0,desc:'Kettlebell swing'},
  {name:'Pilates (mat)',emoji:'🧘',cat:'esneme',met:3.0,desc:'Mat Pilates'},
  {name:'Pilates (reformer)',emoji:'🧘',cat:'esneme',met:4.0,desc:'Reformer Pilates'},
  // ESNEME / YOGA
  {name:'Yoga (hafif)',emoji:'🧘',cat:'esneme',met:2.5,desc:'Hatha yoga'},
  {name:'Yoga (orta)',emoji:'🧘',cat:'esneme',met:3.5,desc:'Vinyasa yoga'},
  {name:'Yoga (yoğun)',emoji:'🧘',cat:'esneme',met:4.0,desc:'Power yoga'},
  {name:'Germe / Esneme',emoji:'🧘',cat:'esneme',met:2.3,desc:'Statik esneme'},
  // TAKIM SPORLARI
  {name:'Futbol',emoji:'⚽',cat:'takim',met:7.0,desc:'Futbol maçı'},
  {name:'Basketbol',emoji:'🏀',cat:'takim',met:6.5,desc:'Basketbol maçı'},
  {name:'Voleybol',emoji:'🏐',cat:'takim',met:4.0,desc:'Voleybol'},
  {name:'Tenis (tekli)',emoji:'🎾',cat:'takim',met:7.0,desc:'Tekli tenis'},
  {name:'Tenis (çiftli)',emoji:'🎾',cat:'takim',met:5.0,desc:'Çiftli tenis'},
  {name:'Masa Tenisi',emoji:'🏓',cat:'takim',met:4.0,desc:'Masa tenisi'},
  {name:'Badminton',emoji:'🏸',cat:'takim',met:5.5,desc:'Badminton'},
  {name:'Yüzme (su polosu)',emoji:'🤽',cat:'su',met:8.0,desc:'Su topu'},
  {name:'Kano / Kürek',emoji:'🚣',cat:'su',met:5.0,desc:'Düz su küreği'},
];

let selectedExercise=null;
let manualCalChanged=false;
let currentExCat='all';

function getExerciseLog(){
  const raw=localStorage.getItem('fs_exercise_'+dateKey());
  return raw?JSON.parse(raw):[];
}
function saveExerciseLog(log){
  localStorage.setItem('fs_exercise_'+dateKey(),JSON.stringify(log));
}
function getTotalBurned(){
  return getExerciseLog().reduce((s,e)=>s+e.cal,0);
}

// Günlük kalori hedefine yakılan egzersiz kalorisi ekle
function getEffectiveDailyTarget(){
  const tgt=getTodayTargets();
  return tgt.cal + (exBurnActive?getTotalBurned():0);
}

function renderExerciseCard(){
  var el=document.getElementById('exerciseCard');
  if(!el)return;
  var log=getExerciseLog();
  var totalBurned=getTotalBurned();
  var isCollapsed=el.dataset.collapsed==='1';
  var headerR=isCollapsed?'var(--radius)':'var(--radius) var(--radius) 0 0';

  // Toggle buton stili
  var btnBg=exBurnActive?'rgba(61,214,140,.12)':'rgba(107,112,148,.08)';
  var btnBorder=exBurnActive?'rgba(61,214,140,.3)':'rgba(107,112,148,.2)';
  var btnColor=exBurnActive?'#3dd68c':'var(--text2)';
  var btnLabel=exBurnActive?'📈 Hedefe ekle':'📉 Pasif';

  var html='<div class="meal-header" style="cursor:pointer;border-radius:'+headerR+'">'
    +'<div class="meal-title" onclick="toggleExerciseCard()" style="flex:1;min-width:0">'
    +'<div class="meal-icon" style="background:rgba(160,124,248,.15)">🏃</div>'
    +'Egzersiz Takibi'
    +'</div>'
    +'<div class="meal-right" style="gap:6px;flex-shrink:0">';

  if(totalBurned){
    var burnColor=exBurnActive?'#3dd68c':'var(--text2)';
    html+='<div class="meal-kcal" style="color:'+burnColor+'">'+(exBurnActive?'+':'')+totalBurned+'</div>'
         +'<div class="meal-pct">kcal</div>';
  }

  html+='<button onclick="toggleExBurn(event)"'
    +' style="padding:3px 8px;border-radius:6px;border:1.5px solid '+btnBorder+';background:'+btnBg
    +';color:'+btnColor+';font-size:.63rem;font-weight:700;cursor:pointer;white-space:nowrap;font-family:var(--font);flex-shrink:0">'
    +btnLabel+'</button>';

  html+='<span class="meal-chevron" onclick="toggleExerciseCard()" style="transition:transform .25s;'+(isCollapsed?'transform:rotate(-90deg)':'')+'">\u2039</span>'
    +'</div></div>';

  // Body
  var bodyMax=isCollapsed?'0':'600px';
  html+='<div style="overflow:hidden;transition:max-height .3s ease;max-height:'+bodyMax+'">'
    +'<div class="meal-card" style="border-radius:0 0 var(--radius) var(--radius)">'
    +'<div class="exercise-list" style="padding:4px 0">';

  if(log.length){
    for(var i=0;i<log.length;i++){
      var e=log[i];
      html+='<div class="exercise-item">'
        +'<span class="exercise-item-icon">'+(e.emoji||'🏃')+'</span>'
        +'<div class="exercise-item-info">'
        +'<div class="exercise-item-name">'+e.name+'</div>'
        +'<div class="exercise-item-detail">'+(e.duration?e.duration+' dk':'')+(e.met?' • MET '+e.met:'')+'</div>'
        +'</div>'
        +'<div class="exercise-item-cal">+'+e.cal+' kcal</div>'
        +'<button class="exercise-item-del" onclick="removeExercise('+i+')">&#x2715;</button>'
        +'</div>';
    }
  } else {
    html+='<div style="text-align:center;color:var(--text2);font-size:.78rem;padding:12px 0">Bugün egzersiz kaydı yok</div>';
  }

  html+='</div>'
    +'<div class="ex-add-btn" onclick="openExerciseModal()">＋ Egzersiz Ekle</div>'
    +'</div></div>';

  el.innerHTML=html;
}

function toggleExBurn(e){
  if(e)e.stopPropagation();
  exBurnActive=!exBurnActive;
  saveProfile();
  renderExerciseCard();
  updateHeader();
  renderMeals();
  showToast(exBurnActive?'🔥 Egzersiz kalorisi hedefe ekleniyor':'💤 Egzersiz kalorisi pasif');
}

function toggleExerciseCard(){
  const el=document.getElementById('exerciseCard');
  if(!el)return;
  el.dataset.collapsed=el.dataset.collapsed==='1'?'0':'1';
  renderExerciseCard();
}


function removeExercise(idx){
  const log=getExerciseLog();
  log.splice(idx,1);
  saveExerciseLog(log);
  renderExerciseCard();
  updateHeader();
  showToast('🗑️ Egzersiz silindi');
}

function scrollToManualExercise(){
  var el=document.getElementById('exManualSection');
  if(el) setTimeout(function(){el.scrollIntoView({behavior:'smooth',block:'start'});},100);
}

function openExerciseModal(){
  selectedExercise=null;
  manualCalChanged=false;
  currentExCat='all';
  // Önce modalı göster
  document.getElementById('exerciseModal').classList.add('show');
  // DOM hazır olduktan sonra içeriği doldur
  requestAnimationFrame(function(){
    const si=document.getElementById('exSearchInput');
    const sp=document.getElementById('exSelectedPanel');
    if(si)si.value='';
    if(sp)sp.style.display='none';
    document.querySelectorAll('#exCatPills .cat-pill').forEach(function(b,i){b.classList.toggle('active',i===0);});
    renderExerciseList();
  });
}

function closeExerciseModal(){
  document.getElementById('exerciseModal').classList.remove('show');
}

function renderExerciseList(){
  var listEl=document.getElementById('exDbList');
  var searchEl=document.getElementById('exSearchInput');
  if(!listEl)return;
  var q=searchEl?searchEl.value.toLowerCase().trim():'';

  // Filtrele
  var list=[];
  for(var i=0;i<EXERCISE_DB.length;i++){
    var ex=EXERCISE_DB[i];
    if(currentExCat!=='all'&&ex.cat!==currentExCat)continue;
    if(q&&!ex.name.toLowerCase().includes(q)&&!ex.desc.toLowerCase().includes(q))continue;
    list.push({idx:i,ex:ex});
  }

  // DOM'u temizle
  while(listEl.firstChild)listEl.removeChild(listEl.firstChild);

  if(!list.length){
    var empty=document.createElement('div');
    empty.style.cssText='text-align:center;padding:16px;font-size:.82rem;opacity:.6';
    empty.textContent='Sonuç bulunamadı';
    listEl.appendChild(empty);
    return;
  }

  // Her öğeyi DOM olarak oluştur
  var isDark=document.documentElement.getAttribute('data-theme')!=='light';
  var borderColor=isDark?'rgba(255,255,255,.06)':'rgba(0,0,0,.06)';
  var subColor=isDark?'#6b7094':'#6b7084';

  for(var j=0;j<list.length;j++){
    var item=list[j];
    var ex=item.ex;
    var isSelected=selectedExercise&&selectedExercise.name===ex.name;

    var row=document.createElement('div');
    row.setAttribute('data-exidx',item.idx);
    row.style.cssText='display:flex;align-items:center;gap:10px;padding:10px 8px;border-bottom:1px solid '+borderColor+';cursor:pointer;border-radius:6px;'+(isSelected?'background:rgba(160,124,248,.12);':'');

    // Emoji
    var emojiSpan=document.createElement('span');
    emojiSpan.style.cssText='font-size:1.3rem;flex-shrink:0;width:32px;text-align:center';
    emojiSpan.textContent=ex.emoji;

    // Info
    var info=document.createElement('div');
    info.style.cssText='flex:1;min-width:0';
    var name=document.createElement('div');
    name.style.cssText='font-weight:600;font-size:.83rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis';
    name.textContent=ex.name;
    var desc=document.createElement('div');
    desc.style.cssText='font-size:.65rem;color:'+subColor+';margin-top:1px';
    desc.textContent=ex.desc+' · MET '+ex.met;
    info.appendChild(name);
    info.appendChild(desc);

    // Kalori preview
    var calPrev=document.createElement('div');
    var w=70;try{var el=document.getElementById('pWeight');if(el&&el.value)w=parseFloat(el.value)||70;}catch(e){}
    calPrev.style.cssText='font-size:.72rem;color:#a07cf8;font-weight:700;flex-shrink:0;white-space:nowrap';
    calPrev.textContent=Math.round(ex.met*3.5*w/200*30)+' kcal';

    row.appendChild(emojiSpan);
    row.appendChild(info);
    row.appendChild(calPrev);

    // Click handler — closure ile index kaydet
    (function(idx){
      row.addEventListener('click',function(){selectExercise(idx);});
    })(item.idx);

    listEl.appendChild(row);
  }
}

function filterExercises(){renderExerciseList()}

function filterExCat(cat,btn){
  currentExCat=cat;
  document.querySelectorAll('#exCatPills .cat-pill').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderExerciseList();
}

function calcExCalPreview(met,min){
  try{
    const el=document.getElementById('pWeight');
    const w=el?parseFloat(el.value)||70:70;
    return Math.round(met*3.5*w/200*min);
  }catch(e){return Math.round(met*3.5*70/200*min)}
}

function selectExercise(idx){
  selectedExercise=EXERCISE_DB[idx];
  if(!selectedExercise)return;
  manualCalChanged=false;
  document.getElementById('exSelEmoji').textContent=selectedExercise.emoji;
  document.getElementById('exSelName').textContent=selectedExercise.name;
  document.getElementById('exSelMET').textContent='MET: '+selectedExercise.met+' • '+selectedExercise.desc;
  document.getElementById('exSelectedPanel').style.display='block';
  calcExerciseCal();
  // Seçilen satırı vurgula
  document.querySelectorAll('#exDbList [data-exidx]').forEach(d=>{
    d.style.background=d.dataset.exidx==idx?'rgba(160,124,248,.1)':'';
  });
  // Seçili panele scroll
  document.getElementById('exSelectedPanel').scrollIntoView({behavior:'smooth',block:'nearest'});
}

function calcExerciseCal(){
  if(!selectedExercise||manualCalChanged)return;
  const min=parseInt(document.getElementById('exDuration').value)||30;
  const w=parseFloat(document.getElementById('pWeight')?.value)||70;
  const cal=Math.round(selectedExercise.met*3.5*w/200*min);
  document.getElementById('exCalBurned').value=cal;
  const note=`${w}kg referans • MET×3.5×${w}÷200×${min}dk = ${cal} kcal`;
  document.getElementById('exCalNote').textContent=note;
}

function onManualCalChange(){
  manualCalChanged=true;
}

function addExerciseEntry(){
  if(!selectedExercise)return;
  const cal=parseInt(document.getElementById('exCalBurned').value)||0;
  const dur=parseInt(document.getElementById('exDuration').value)||30;
  if(!cal){showToast('⚠️ Kalori değeri girin');return;}
  const log=getExerciseLog();
  log.push({name:selectedExercise.name,emoji:selectedExercise.emoji,cat:selectedExercise.cat,met:selectedExercise.met,duration:dur,cal,date:Date.now()});
  saveExerciseLog(log);
  closeExerciseModal();
  renderExerciseCard();
  updateHeader();
  showToast(`🏃 ${selectedExercise.name} eklendi! +${cal} kcal hedefe eklendi`);
}

function addManualExercise(){
  const name=document.getElementById('exManualName').value.trim();
  const cal=parseInt(document.getElementById('exManualCal').value)||0;
  if(!name){showToast('⚠️ Egzersiz adı girin');return;}
  if(!cal){showToast('⚠️ Kalori değeri girin');return;}
  const log=getExerciseLog();
  log.push({name,emoji:'🏃',cat:'other',met:null,duration:null,cal,date:Date.now()});
  saveExerciseLog(log);
  closeExerciseModal();
  renderExerciseCard();
  updateHeader();
  showToast(`✅ ${escHTML(name)} eklendi! +${cal} kcal hedefe eklendi`);
}


// ══════════════════════════════════════════════════════════════════
//  BOTTOM SHEET SWIPE — Tüm .modal-overlay'ler için
//  Aşağı sürükle → kapat | Yukarı sürükle → tam ekran
// ══════════════════════════════════════════════════════════════════
(function initModalSwipe(){
  let startY=0, currentY=0, dragging=false, activeOverlay=null, activeModal=null;
  const CLOSE_THRESHOLD=120;  // px aşağı → kapat
  const EXPAND_THRESHOLD=80;  // px yukarı → genişlet

  function getCloseHandler(overlay){
    // Her overlay'in ID'sine göre close fonksiyonunu bul
    const id=overlay.id;
    if(id==='addFoodModal')return ()=>closeModal&&closeModal();
    if(id==='portionModal')return ()=>closePortionModal&&closePortionModal();
    if(id==='tplModal')return ()=>closeTplModal&&closeTplModal();
    if(id==='copyMealModal')return ()=>closeCopyMealModal&&closeCopyMealModal();
    if(id==='datePickerModal')return ()=>closeDatePicker&&closeDatePicker();
    if(id==='barcodeModal')return ()=>closeBarcodeScanner&&closeBarcodeScanner();
    if(id==='editFoodModal')return ()=>closeEditFood&&closeEditFood();
    if(id==='recipeDetailModal')return ()=>overlay.classList.remove('show');
    if(id==='addRecipeModal')return ()=>closeAddRecipeModal&&closeAddRecipeModal();
    if(id==='insightModal')return ()=>closeInsightModal&&closeInsightModal();
    if(id==='goalsModal')return ()=>closeGoalsModal&&closeGoalsModal();
    if(id==='prepModal')return ()=>closePrepModal&&closePrepModal();
    if(id==='exerciseModal')return ()=>closeExerciseModal&&closeExerciseModal();
    return ()=>overlay.classList.remove('show');
  }

  document.addEventListener('touchstart',function(e){
    const overlay=e.target.closest('.modal-overlay.show');
    if(!overlay)return;
    const modal=overlay.querySelector('.modal');
    if(!modal)return;
    // Sadece handle veya modalın üst 60px'inde başlayan swipe'ı yakala
    const touch=e.touches[0];
    const rect=modal.getBoundingClientRect();
    const relY=touch.clientY-rect.top;
    // Modal içinde scroll varsa en üstte olmadıkça sadece handle'dan başla
    if(modal.scrollTop>0&&relY>60)return;
    startY=touch.clientY;
    currentY=startY;
    dragging=true;
    activeOverlay=overlay;
    activeModal=modal;
    modal.style.transition='none';
  },{passive:true});

  document.addEventListener('touchmove',function(e){
    if(!dragging||!activeModal)return;
    const touch=e.touches[0];
    currentY=touch.clientY;
    const dy=currentY-startY;
    // Sadece aşağı sürükleme için direnç uygula (yukarı serbes)
    if(dy>0){
      activeModal.style.transform=`translateY(${dy}px)`;
      // Overlay opacity'yi azalt
      const progress=Math.min(1,dy/200);
      activeOverlay.style.background=`rgba(0,0,0,${0.5*(1-progress*0.7)})`;
    } else if(dy<-EXPAND_THRESHOLD){
      // Yukarı genişletme — max-height arttır
      activeModal.style.transform=`translateY(${Math.max(-40,dy*0.2)}px)`;
    }
  },{passive:true});

  document.addEventListener('touchend',function(e){
    if(!dragging||!activeModal)return;
    const dy=currentY-startY;
    activeModal.style.transition='transform .3s cubic-bezier(.25,1,.5,1)';

    if(dy>CLOSE_THRESHOLD){
      // Kapat — aşağı fırlat
      activeModal.style.transform='translateY(100%)';
      activeOverlay.style.transition='opacity .25s';
      activeOverlay.style.opacity='0';
      activeOverlay.style.pointerEvents='none';
      var overlayRef=activeOverlay;
      var modalRef=activeModal;
      dragging=false; activeOverlay=null; activeModal=null;
      // Input'ları blur et
      overlayRef.querySelectorAll('input,textarea,select').forEach(function(i){i.blur()});
      setTimeout(function(){
        var closeFn=getCloseHandler(overlayRef);
        closeFn();
        // Transform/transition sıfırla
        modalRef.style.transform='';
        modalRef.style.transition='';
        modalRef.style.opacity='';
        overlayRef.style.background='';
        overlayRef.style.opacity='';
        overlayRef.style.transition='';
        overlayRef.style.pointerEvents='';
      },280);
    } else if(dy<-EXPAND_THRESHOLD){
      // Genişlet
      activeModal.style.transform='';
      activeModal.style.maxHeight='92vh';
      dragging=false; activeOverlay=null; activeModal=null;
    } else {
      // Geri döndür
      activeModal.style.transform='';
      activeOverlay.style.background='';
      dragging=false; activeOverlay=null; activeModal=null;
    }
  },{passive:true});
})();

function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),2000)}
document.getElementById('addFoodModal').addEventListener('click',e=>{if(e.target.id==='addFoodModal')closeModal()});
document.getElementById('portionModal').addEventListener('click',e=>{if(e.target.id==='portionModal')closePortionModal()});
document.getElementById('tplModal').addEventListener('click',e=>{if(e.target.id==='tplModal')closeTplModal()});
document.getElementById('barcodeModal').addEventListener('click',e=>{if(e.target.id==='barcodeModal')closeBarcodeScanner()});
document.getElementById('editFoodModal').addEventListener('click',e=>{if(e.target.id==='editFoodModal')closeEditFood()});
document.getElementById('recipeDetailModal').addEventListener('click',e=>{if(e.target.id==='recipeDetailModal')e.target.classList.remove('show')});
function setupPWA(){
  // Manifest
  const manifest={name:"FitSofra - Beslenme Takibi",short_name:"FitSofra",description:"Günlük kalori ve beslenme takip uygulaması",start_url:'./',display:"standalone",background_color:"#0d0f14",theme_color:"#0d0f14",orientation:"portrait",icons:[{src:"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%25' stop-color='%23ff6b3d'/><stop offset='100%25' stop-color='%23e85530'/></linearGradient></defs><rect fill='url(%23g)' width='512' height='512' rx='110'/><circle cx='256' cy='230' r='120' fill='none' stroke='%23fff' stroke-width='12' opacity='.9'/><line x1='256' y1='110' x2='256' y2='170' stroke='%23fff' stroke-width='12' stroke-linecap='round' opacity='.9'/><text x='256' y='400' text-anchor='middle' font-family='sans-serif' font-size='72' font-weight='900' fill='%23fff'>FitSofra</text></svg>",sizes:"512x512",type:"image/svg+xml",purpose:"any maskable"}]};
  const blob=new Blob([JSON.stringify(manifest)],{type:'application/json'});
  document.getElementById('manifestLink').href=URL.createObjectURL(blob);

  if('serviceWorker' in navigator){
    // FCM için Service Worker — domain kökünde /firebase-messaging-sw.js olmalı
    navigator.serviceWorker.register('./firebase-messaging-sw.js')
      .then(reg=>{
        console.log('[PWA] FCM Service Worker kayıtlı:', reg.scope);
        window._swRegistration = reg;
        // SW'den gelen mesajları dinle (bildirim tıklaması vs)
        navigator.serviceWorker.addEventListener('message', e=>{
          if(e.data?.type === 'NOTIFICATION_CLICK'){
            const tab = e.data?.data?.tab;
            if(tab) switchTab(tab);
          }
        });
      })
      .catch(err=>{
        console.warn('[PWA] SW kaydedilemedi (geliştirme ortamı?):', err.message);
        // Fallback: blob SW (FCM çalışmaz ama offline cache çalışır)
        const swCode=`const CACHE_NAME='fitsofra-v4';self.addEventListener('install',e=>{self.skipWaiting()});self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(n=>Promise.all(n.filter(n=>n!==CACHE_NAME).map(n=>caches.delete(n)))));self.clients.claim()});self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request).then(r=>{if(r&&r.status===200){var c=r.clone();caches.open(CACHE_NAME).then(cache=>{cache.put(e.request,c)})}return r}).catch(()=>caches.match(e.request)))})`;
        const swBlob=new Blob([swCode],{type:'application/javascript'});
        navigator.serviceWorker.register(URL.createObjectURL(swBlob)).catch(()=>{});
      });
  }
}

// ── FCM Push Token alma ve kaydetme ──────────────────────────────────────────
// VAPID_KEY: APP_CONFIG'den okunur
const VAPID_KEY = APP_CONFIG.vapidKey;

async function initFCM(){
  try{
    if(!window.firebase || !firebase.messaging) return;
    const messaging = firebase.messaging();

    // FCM token al
    const currentToken = await messaging.getToken({ vapidKey: VAPID_KEY, serviceWorkerRegistration: window._swRegistration });
    if(currentToken){
      console.log('[FCM] Token alındı:', currentToken);
      await saveFCMTokenToFirestore(currentToken);
    } else {
      console.warn('[FCM] Token alınamadı — bildirim izni gerekli');
    }

    // Uygulama ÖN PLANDA iken gelen FCM mesajlarını yakala
    // Sadece toast göster — lokal scheduleNotifications zaten banner/sistem bildirimi gösteriyor
    // FCM mesajları "reminder" tipindeyse atla (lokal scheduler zaten işliyor)
    messaging.onMessage(payload=>{
      console.log('[FCM] Ön plan mesajı:', payload);
      const n = payload.notification || payload.data || {};
      const msgType = (payload.data && payload.data.type) || '';
      // Zamanlanmış bildirimler (reminder) lokal scheduler tarafından zaten gösterildiği için
      // FCM ön plan mesajını atla — sadece admin/genel bildirimleri göster
      if(msgType === 'reminder') {
        console.log('[FCM] Reminder tipi — lokal scheduler zaten gösteriyor, atlandı');
        return;
      }
      showNotifBanner((n.title||'📢 Bildirim'), (n.body||''));
    });
  } catch(err){
    console.warn('[FCM] initFCM hatası:', err.message);
  }
}

async function saveFCMTokenToFirestore(token){
  try{
    if(!db || !auth.currentUser) return;
    const uid = auth.currentUser.uid;
    var notifS=getNotifSettings();
    await db.collection('users').doc(uid).set({
      fcmToken: token,
      fcmUpdatedAt: Date.now(),
      platform: 'web',
      notifSettings:notifS,
      timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||'Europe/Istanbul'
    }, { merge: true });
    console.log('[FCM] Token + ayarlar Firestore\'a kaydedildi');
  } catch(err){
    console.warn('[FCM] Token kaydetme hatası:', err.message);
  }
}

// Auth değişince FCM token kaydet
if(typeof auth !== 'undefined'){
  auth.onAuthStateChanged(user=>{
    if(user && notifEnabled && Notification.permission==='granted'){
      setTimeout(initFCM, 1000);
    }
  });
}
function loadTheme(){
  const saved=localStorage.getItem('fs_theme');
  if(saved==='light'){document.documentElement.setAttribute('data-theme','light');document.getElementById('themeBtn').textContent='☀️'}
  else{document.documentElement.removeAttribute('data-theme');document.getElementById('themeBtn').textContent='🌙'}
}
function toggleTheme(){
  const isLight=document.documentElement.getAttribute('data-theme')==='light';
  if(isLight){document.documentElement.removeAttribute('data-theme');localStorage.setItem('fs_theme','dark');document.getElementById('themeBtn').textContent='🌙';showToast('🌙 Gece modu')}
  else{document.documentElement.setAttribute('data-theme','light');localStorage.setItem('fs_theme','light');document.getElementById('themeBtn').textContent='☀️';showToast('☀️ Gündüz modu')}
  fixLightModeRings();
}
function fixLightModeRings(){
  var isLight=document.documentElement.getAttribute('data-theme')==='light';
  // Header'daki ring arka plan çemberlerini güncelle
  document.querySelectorAll('.ring-container svg circle, .calorie-ring-section svg circle').forEach(function(c){
    var s=c.getAttribute('stroke');
    if(s==='rgba(255,255,255,.12)')c.setAttribute('stroke',isLight?'rgba(0,0,0,.12)':'rgba(255,255,255,.12)');
    if(s==='rgba(0,0,0,.12)')c.setAttribute('stroke',isLight?'rgba(0,0,0,.12)':'rgba(255,255,255,.12)');
    if(s==='rgba(255,107,61,.1)')c.setAttribute('stroke',isLight?'rgba(232,93,58,.18)':'rgba(255,107,61,.1)');
    if(s==='rgba(232,93,58,.18)')c.setAttribute('stroke',isLight?'rgba(232,93,58,.18)':'rgba(255,107,61,.1)');
  });
}
loadTheme();setHeaderDate();loadProfile();loadNotifSettings();updateDateNav();updateWaterHeader();setupPWA();
initFoodDB()
  .then(()=>{renderMeals();updateHeader();loadCloudFoods();loadRecipesFromFirebase();fixLightModeRings();})
  .catch(()=>{
    FOOD_DB=getBuiltinFoodDB();
    rebuildSearchIndex();
    renderMeals();
    updateHeader();
    showOfflineBanner();
  });

function showOfflineBanner(){
  if(document.getElementById('offlineBanner'))return;
  const b=document.createElement('div');
  b.id='offlineBanner';
  b.style.cssText='position:fixed;top:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:#f0a030;color:#fff;text-align:center;padding:9px 12px;font-size:.76rem;font-weight:700;z-index:999;letter-spacing:.2px;';
  b.innerHTML='⚠️ Çevrimdışı mod — bulut verilere erişilemiyor, değişiklikler senkronize edilmiyor. <span onclick="this.parentElement.remove()" style="margin-left:8px;cursor:pointer;opacity:.8">✕</span>';
  document.body.prepend(b);
}

/* ═══════════════════════════════════════════
   ① SWIPE-TO-DELETE GESTURE + UNDO TOAST
═══════════════════════════════════════════ */
(function initSwipeToDelete(){
  var SWIPE_THRESHOLD=80;
  var activeEl=null,startX=0,startY=0,swiping=false,moved=false;

  document.addEventListener('touchstart',function(e){
    var wrapper=e.target.closest('.swipe-wrapper');
    // Başka yere dokunulunca açık kalanları kapat
    if(!wrapper||wrapper!==activeEl){
      document.querySelectorAll('.swipe-wrapper').forEach(function(w){
        var f=w.querySelector('.food-item');var b=w.querySelector('.swipe-delete-bg');
        if(f&&f.style.transform&&f.style.transform!==''){f.style.transition='transform .25s ease';f.style.transform='';f.style.pointerEvents='';}
        if(b){b.style.opacity='0';b.style.pointerEvents='none';}
      });
    }
    if(!wrapper)return;
    activeEl=wrapper;
    startX=e.touches[0].clientX;
    startY=e.touches[0].clientY;
    swiping=false;moved=false;
    var fi=wrapper.querySelector('.food-item');
    if(fi)fi.style.transition='none';
  },{passive:true});

  document.addEventListener('touchmove',function(e){
    if(!activeEl)return;
    var dx=e.touches[0].clientX-startX;
    var dy=e.touches[0].clientY-startY;
    if(!moved){
      if(Math.abs(dy)>Math.abs(dx)){activeEl=null;return;}
      if(Math.abs(dx)>8)moved=true;
    }
    if(!moved)return;
    swiping=true;
    dx=Math.min(0,dx); // only left swipe
    var fi=activeEl.querySelector('.food-item');
    var bg=activeEl.querySelector('.swipe-delete-bg');
    if(fi)fi.style.transform='translateX('+dx+'px)';
    if(bg)bg.style.opacity=Math.min(1,Math.abs(dx)/SWIPE_THRESHOLD);
    if(Math.abs(dx)>10)e.preventDefault();
  },{passive:false});

  document.addEventListener('touchend',function(e){
    if(!activeEl||!swiping){activeEl=null;return;}
    var fi=activeEl.querySelector('.food-item');
    var bg=activeEl.querySelector('.swipe-delete-bg');
    var dx=e.changedTouches[0].clientX-startX;
    dx=Math.min(0,dx);

    if(Math.abs(dx)>=SWIPE_THRESHOLD/2){
      // Sil butonunu göster — iPhone tarzı (75px açık bırak)
      if(fi){fi.style.transition='transform .25s cubic-bezier(.25,1,.5,1)';fi.style.transform='translateX(-75px)';fi.style.pointerEvents='none';}
      if(bg){bg.style.opacity='1';bg.style.pointerEvents='auto';bg.style.cursor='pointer';}
      var mealId=activeEl.getAttribute('data-meal');
      var idx=parseInt(activeEl.getAttribute('data-idx'));
      var wrapRef=activeEl;
      // Sil butonuna tıklama — hem click hem touchend
      var deleteHandler=function(ev){
        ev.stopPropagation();ev.preventDefault();
        bg.removeEventListener('click',deleteHandler);
        bg.removeEventListener('touchend',deleteHandler);
        if(fi){fi.style.transition='transform .25s ease,opacity .25s';fi.style.transform='translateX(-120%)';fi.style.opacity='0';}
        wrapRef.style.transition='max-height .3s ease,margin .3s ease,padding .3s ease';
        wrapRef.style.overflow='hidden';
        setTimeout(function(){wrapRef.style.maxHeight='0';wrapRef.style.margin='0';wrapRef.style.padding='0';},100);
        setTimeout(function(){swipeDeleteFood(mealId,idx);},350);
      };
      bg.addEventListener('click',deleteHandler);
      bg.addEventListener('touchend',deleteHandler);
    } else {
      // Snap back
      if(fi){fi.style.transition='transform .25s cubic-bezier(.25,1,.5,1)';fi.style.transform='';fi.style.pointerEvents='';}
      if(bg){bg.style.opacity='0';bg.style.pointerEvents='none';}
    }
    activeEl=null;swiping=false;moved=false;
  },{passive:true});
})();

var _undoData=null,_undoTimer=null;
function swipeDeleteFood(mealId,idx){
  var data=getDayData();
  if(!data[mealId]||!data[mealId][idx]){renderMeals();updateHeader();return;}
  var rm=data[mealId].splice(idx,1)[0];
  saveDayData(null,data);
  _undoData={mealId:mealId,idx:idx,food:rm};
  renderMeals();updateHeader();
  showUndoToast('🗑️ '+escHTML(rm.name)+' silindi');
}

function showUndoToast(msg){
  var el=document.getElementById('undoToast');
  var msgEl=document.getElementById('undoMsg');
  if(!el||!msgEl)return;
  msgEl.textContent=msg;
  el.classList.add('show');
  clearTimeout(_undoTimer);
  _undoTimer=setTimeout(function(){
    el.classList.remove('show');
    _undoData=null;
  },5000);
}

function undoDelete(){
  if(!_undoData)return;
  var data=getDayData();
  if(!data[_undoData.mealId])data[_undoData.mealId]=[];
  data[_undoData.mealId].splice(_undoData.idx,0,_undoData.food);
  saveDayData(null,data);
  renderMeals();updateHeader();
  document.getElementById('undoToast').classList.remove('show');
  showToast('↩️ '+_undoData.food.name+' geri alındı');
  clearTimeout(_undoTimer);
  _undoData=null;
}

/* ═══════════════════════════════════════════
   ② PORSİYON HAFIZASI
═══════════════════════════════════════════ */
var _origOpenPortionModal=openPortionModal;
openPortionModal=function(){
  _origOpenPortionModal();
  // Apply last used portion if available
  if(pendingFood){
    var freq=JSON.parse(localStorage.getItem('fs_food_freq')||'{}');
    var key=(pendingFood.name||'').toLowerCase().trim();
    if(freq[key]&&freq[key].lastPortion){
      var lp=freq[key].lastPortion;
      // Find matching unit or set gram directly
      var matched=false;
      if(typeof currentUnits!=='undefined'&&currentUnits.length){
        for(var u=0;u<currentUnits.length;u++){
          if(Math.abs(currentUnits[u].g-lp)<2){
            selectUnit(u);matched=true;break;
          }
        }
      }
      if(!matched){
        document.getElementById('portionInput').value=Math.round(lp);
        updatePortionPreview();
      }
      // Show hint
      var hint=document.getElementById('portionMemoryHint');
      if(!hint){
        hint=document.createElement('div');
        hint.id='portionMemoryHint';
        hint.style.cssText='font-size:.68rem;color:var(--accent);font-weight:600;text-align:center;padding:4px 0;opacity:.8';
        var pModal=document.querySelector('#portionModal .modal');
        if(pModal){
          var previewEl=document.getElementById('portionPreview');
          if(previewEl&&previewEl.parentNode)previewEl.parentNode.insertBefore(hint,previewEl);
        }
      }
      hint.textContent='💡 Son kullandığın porsiyon: '+Math.round(lp)+'g';
      hint.style.display='block';
    } else {
      var hint2=document.getElementById('portionMemoryHint');
      if(hint2)hint2.style.display='none';
    }
  }
};

/* ═══════════════════════════════════════════
   ③ DÜNÜ KOPYALA — Boş gün için hızlı aksiyon
═══════════════════════════════════════════ */
var _origUpdateDailyBanner=updateDailyBanner;
updateDailyBanner=function(){
  _origUpdateDailyBanner();
  // Check if today is empty and yesterday has data
  var t=getTotals();
  if(t.cal>0)return; // already has food
  var yesterday=new Date(currentDate);
  yesterday.setDate(yesterday.getDate()-1);
  var ydKey=dateKey(yesterday);
  var ydRaw=localStorage.getItem('fs_day_'+ydKey);
  if(!ydRaw)return;
  var ydData=JSON.parse(ydRaw);
  var ydHasFoods=Object.values(ydData).some(function(f){return f.length>0;});
  if(!ydHasFoods)return;
  // Count yesterday's foods
  var ydCount=0,ydCal=0;
  Object.values(ydData).forEach(function(foods){foods.forEach(function(f){ydCount++;ydCal+=f.cal||0;});});
  // Show copy yesterday button in banner
  var banner=document.getElementById('dailyBanner');
  if(banner&&banner.style.display!=='none'){
    banner.innerHTML+='<div style="margin-top:8px"><button onclick="quickCopyYesterday()" style="width:100%;padding:10px;background:linear-gradient(135deg,var(--blue),var(--purple));border:none;border-radius:10px;color:#fff;font-family:var(--font,system-ui);font-size:.8rem;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px">📋 Dünü Kopyala <span style="font-weight:400;opacity:.7">'+ydCount+' yemek · '+Math.round(ydCal)+' kcal</span></button></div>';
  }
};

function quickCopyYesterday(){
  var yesterday=new Date(currentDate);
  yesterday.setDate(yesterday.getDate()-1);
  var ydKey=dateKey(yesterday);
  var ydRaw=localStorage.getItem('fs_day_'+ydKey);
  if(!ydRaw){showToast('⚠️ Dünün verisi bulunamadı');return;}
  var ydData=JSON.parse(ydRaw);
  var todayData=getDayData();
  var count=0;
  MEAL_DEFS.forEach(function(meal){
    var foods=ydData[meal.id]||[];
    if(foods.length){
      todayData[meal.id]=(todayData[meal.id]||[]).concat(JSON.parse(JSON.stringify(foods)));
      count+=foods.length;
    }
  });
  saveDayData(null,todayData);
  renderMeals();updateHeader();
  showToast('📋 Dünden '+count+' yemek kopyalandı!');
}

/* ═══════════════════════════════════════════
   ④ STREAK ANA EKRANDA
═══════════════════════════════════════════ */
function updateStreakBadge(){
  var badge=document.getElementById('streakBadge');
  var countEl=document.getElementById('streakCount');
  if(!badge||!countEl)return;
  var streak=calculateStreak();
  if(streak>0){
    countEl.textContent=streak;
    badge.style.display='block';
    badge.classList.remove('pop');
    void badge.offsetWidth;
    badge.classList.add('pop');
  } else {
    badge.style.display='none';
  }
}
// Hook into updateHeader to also update streak
var _origUpdateHeader=updateHeader;
updateHeader=function(){
  _origUpdateHeader();
  updateStreakBadge();
};

/* ═══════════════════════════════════════════
   ⑤ KİLO GRAFİĞİ İSTATİSTİK SEKMESİNE
═══════════════════════════════════════════ */
var _origRenderStats=renderStats;
renderStats=function(){
  _origRenderStats();
  // Append weight chart to stats container
  var container=document.getElementById('statsContainer');
  if(!container)return;
  var log=getWeightLog();
  if(log.length<2)return; // Need at least 2 entries

  var goalWeight=70;
  try{goalWeight=parseFloat(document.getElementById('pGoalWeight').value)||70;}catch(e){}

  var chartData=log.slice(-30);
  var weights=chartData.map(function(e){return e.weight;});
  var minW=Math.min.apply(null,weights.concat([goalWeight]))-1;
  var maxW=Math.max.apply(null,weights)+1;
  var range=maxW-minW||1;
  var startW=chartData[0].weight;
  var endW=chartData[chartData.length-1].weight;
  var diff=Math.round((endW-startW)*10)/10;
  var toGoal=Math.round((endW-goalWeight)*10)/10;

  var goalY=100-((goalWeight-minW)/range)*100;
  var points=chartData.map(function(e,i){
    var x=(i/(chartData.length-1))*100;
    var y=100-((e.weight-minW)/range)*100;
    return x+','+y;
  }).join(' ');

  var dots=chartData.map(function(e,i){
    var x=(i/(chartData.length-1))*100;
    var y=100-((e.weight-minW)/range)*100;
    var isLast=i===chartData.length-1;
    return '<circle cx="'+x+'" cy="'+y+'" r="'+(isLast?'3':'1.8')+'" fill="'+(isLast?'var(--accent)':'var(--purple)')+'"/>';
  }).join('');

  var weightStatHtml='<div class="stat-card" style="animation-delay:.1s">'
    +'<h3>⚖️ Kilo Trendi <span style="font-size:.68rem;color:var(--text2);font-weight:400">('+chartData.length+' kayıt)</span></h3>'
    +'<div style="display:flex;gap:8px;margin-bottom:12px">'
    +'<div style="flex:1;padding:10px;background:var(--glass);border-radius:10px;border:1px solid var(--border);text-align:center"><div style="font-size:.66rem;color:var(--text2)">Şu an</div><div style="font-weight:800;font-size:1.05rem;color:var(--accent)">'+endW+' kg</div></div>'
    +'<div style="flex:1;padding:10px;background:var(--glass);border-radius:10px;border:1px solid var(--border);text-align:center"><div style="font-size:.66rem;color:var(--text2)">Değişim</div><div style="font-weight:800;font-size:1.05rem;color:'+(diff<=0?'var(--green)':'var(--red)')+'">'+(diff>0?'+':'')+diff+' kg</div></div>'
    +'<div style="flex:1;padding:10px;background:var(--glass);border-radius:10px;border:1px solid var(--border);text-align:center"><div style="font-size:.66rem;color:var(--text2)">Hedefe</div><div style="font-weight:800;font-size:1.05rem;color:'+(toGoal<=0?'var(--green)':'var(--orange)')+'">'+(toGoal>0?'-':'+')+Math.abs(toGoal)+' kg</div></div>'
    +'</div>'
    +'<div style="position:relative;margin:0 -4px">'
    +'<svg viewBox="-2 -8 104 120" preserveAspectRatio="none" style="width:100%;height:160px">'
    +'<defs><linearGradient id="wgFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--purple)" stop-opacity="0.15"/><stop offset="100%" stop-color="var(--purple)" stop-opacity="0"/></linearGradient></defs>'
    +'<polygon points="0,100 '+points+' 100,100" fill="url(#wgFill)"/>'
    +'<line x1="0" y1="'+goalY+'" x2="100" y2="'+goalY+'" stroke="var(--green)" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.6"/>'
    +'<text x="101" y="'+(goalY+3)+'" font-size="4" fill="var(--green)" opacity="0.7">'+goalWeight+'</text>'
    +'<polyline points="'+points+'" fill="none" stroke="var(--purple)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
    +dots
    +'</svg>'
    +'<div style="display:flex;justify-content:space-between;font-size:.6rem;color:var(--text2);margin-top:2px;padding:0 4px">'
    +'<span>'+chartData[0].date.slice(5).replace('-','/')+'</span>'
    +'<span style="color:var(--green)">🎯 Hedef: '+goalWeight+'kg</span>'
    +'<span>'+chartData[chartData.length-1].date.slice(5).replace('-','/')+'</span>'
    +'</div></div></div>';

  // Insert before the weekly summary card (last stat-card)
  var cards=container.querySelectorAll('.stat-card');
  if(cards.length>0){
    var lastCard=cards[cards.length-1];
    lastCard.insertAdjacentHTML('beforebegin',weightStatHtml);
  } else {
    container.insertAdjacentHTML('beforeend',weightStatHtml);
  }
};

// Initial streak update
setTimeout(updateStreakBadge,100);

/* ═══════════════════════════════════════════
   ⑥ ONBOARDING (İlk Google girişinde)
═══════════════════════════════════════════ */
function checkOnboarding(){
  // Show onboarding if no profile was ever saved
  if(localStorage.getItem('fs_onboarding_done'))return;
  if(localStorage.getItem('fs_profile'))return; // already has profile
  setTimeout(function(){
    document.getElementById('onboardingModal').classList.add('show');
  },3500); // After splash screen
}

function nextOnboardStep(step){
  document.querySelectorAll('.onboard-step').forEach(function(el){el.style.display='none';});
  var el=document.getElementById('onboardStep'+step);
  if(el){el.style.display='block';el.style.animation='fadeUp .3s ease';}
}

function skipOnboarding(){
  localStorage.setItem('fs_onboarding_done','1');
  document.getElementById('onboardingModal').classList.remove('show');
}

function completeOnboarding(){
  // Read values from onboarding form
  var gender=document.getElementById('obGender').value;
  var age=parseInt(document.getElementById('obAge').value)||25;
  var height=parseInt(document.getElementById('obHeight').value)||175;
  var weight=parseInt(document.getElementById('obWeight').value)||75;
  var goalWeight=parseInt(document.getElementById('obGoalWeight').value)||70;
  var activity=parseFloat(document.getElementById('obActivity').value)||1.375;
  var goal=parseInt(document.getElementById('obGoal').value)||0;

  // Set profile fields
  document.getElementById('pGender').value=gender;
  document.getElementById('pAge').value=age;
  document.getElementById('pHeight').value=height;
  document.getElementById('pWeight').value=weight;
  document.getElementById('pGoalWeight').value=goalWeight;
  document.getElementById('pActivity').value=activity;
  document.getElementById('pGoal').value=goal;

  // Calculate TDEE
  var bmr;
  if(gender==='male')bmr=10*weight+6.25*height-5*age+5;
  else bmr=10*weight+6.25*height-5*age-161;
  var tdee=Math.round(bmr*activity+goal);
  dailyTarget=tdee;
  protTarget=Math.round((tdee*.30)/4);
  carbTarget=Math.round((tdee*.45)/4);
  fatTarget=Math.round((tdee*.25)/9);

  // Save initial weight
  var log=getWeightLog();
  var today=dateKey(new Date());
  if(!log.find(function(e){return e.date===today;})){
    log.push({date:today,weight:weight,time:Date.now()});
    setWeightLog(log);
  }

  saveProfile();
  updateHeader();
  renderMeals();
  calculateBMI(weight,height);

  localStorage.setItem('fs_onboarding_done','1');
  document.getElementById('onboardingModal').classList.remove('show');

  showToast('🎉 Profil oluşturuldu! Günlük hedef: '+tdee+' kcal');

  // After short delay, check PWA prompt
  setTimeout(checkPWAInstallPrompt,1500);
}

// Onboarding check on page load (for non-logged-in users)
setTimeout(checkOnboarding,2800);

/* ═══════════════════════════════════════════
   ⑦ BİLDİRİM PWA UYARISI
═══════════════════════════════════════════ */
var deferredPWAPrompt=null;
window.addEventListener('beforeinstallprompt',function(e){
  e.preventDefault();
  deferredPWAPrompt=e;
});

function checkPWAInstallPrompt(){
  // Don't show if already dismissed or in standalone mode
  if(localStorage.getItem('fs_pwa_dismissed'))return;
  if(window.matchMedia('(display-mode: standalone)').matches)return;
  if(window.navigator.standalone)return;

  // Show after a delay on first meaningful interaction
  setTimeout(showPWABanner,3000);
}

function showPWABanner(){
  if(document.getElementById('pwaBanner'))return;
  if(localStorage.getItem('fs_pwa_dismissed'))return;

  var banner=document.createElement('div');
  banner.id='pwaBanner';
  banner.style.cssText='position:fixed;bottom:70px;left:50%;transform:translateX(-50%);width:calc(100% - 32px);max-width:400px;background:var(--card);border:1px solid var(--border);border-radius:16px;padding:14px 16px;z-index:100;box-shadow:var(--shadow-lg);backdrop-filter:blur(20px);animation:fadeUp .4s cubic-bezier(.25,1,.5,1)';

  var isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent);

  var installAction=deferredPWAPrompt?
    '<button onclick="installPWA()" style="flex:1;padding:10px;background:linear-gradient(135deg,var(--accent),var(--accent2));border:none;border-radius:10px;font-family:var(--font,system-ui);font-size:.8rem;font-weight:800;color:#fff;cursor:pointer">📲 Yükle</button>':
    '';

  var notifAction='<button onclick="enableNotifFromBanner()" style="flex:1;padding:10px;background:linear-gradient(135deg,var(--blue),var(--purple));border:none;border-radius:10px;font-family:var(--font,system-ui);font-size:.8rem;font-weight:800;color:#fff;cursor:pointer">🔔 Bildirim Aç</button>';

  var iosHint=isIOS&&!deferredPWAPrompt?
    '<div style="font-size:.72rem;color:var(--text2);margin-top:8px;line-height:1.4">📱 Ana ekrana eklemek için Safari\'de <strong>Paylaş</strong> → <strong>Ana Ekrana Ekle</strong> seçin</div>':'';

  banner.innerHTML=
    '<div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px">'
    +'<div style="font-size:1.5rem;flex-shrink:0">📱</div>'
    +'<div style="flex:1"><div style="font-weight:800;font-size:.88rem;margin-bottom:2px">FitSofra\'yı telefonuna ekle</div>'
    +'<div style="font-size:.74rem;color:var(--text2);line-height:1.4">Uygulama gibi kullan, bildirimlerle öğün hatırlatması al</div></div>'
    +'<button onclick="dismissPWABanner()" style="background:none;border:none;color:var(--text2);font-size:1rem;cursor:pointer;padding:0 4px">✕</button></div>'
    +'<div style="display:flex;gap:8px">'+installAction+notifAction+'</div>'
    +iosHint;

  document.body.appendChild(banner);
}

function installPWA(){
  if(deferredPWAPrompt){
    deferredPWAPrompt.prompt();
    deferredPWAPrompt.userChoice.then(function(choice){
      if(choice.outcome==='accepted')showToast('✅ FitSofra yüklendi!');
      deferredPWAPrompt=null;
      dismissPWABanner();
    });
  }
}

function enableNotifFromBanner(){
  toggleNotifications();
  dismissPWABanner();
}

function dismissPWABanner(){
  var el=document.getElementById('pwaBanner');
  if(el){
    el.style.transition='opacity .3s,transform .3s';
    el.style.opacity='0';
    el.style.transform='translateX(-50%) translateY(20px)';
    setTimeout(function(){el.remove();},300);
  }
  localStorage.setItem('fs_pwa_dismissed','1');
}

// Show PWA banner after 60s of use if not dismissed
setTimeout(function(){
  if(!localStorage.getItem('fs_pwa_dismissed')&&!window.matchMedia('(display-mode: standalone)').matches){
    checkPWAInstallPrompt();
  }
},60000);

/* ═══════════════════════════════════════════
   ⑧ PAYLAŞIM KARTI (Günlük özet görsel)
═══════════════════════════════════════════ */
var _shareCanvas=null;

function openShareCard(){
  generateShareCardHTML();
  document.getElementById('shareCardModal').classList.add('show');
  // Check native share API
  if(!navigator.share){
    var btn=document.getElementById('nativeShareBtn');
    if(btn)btn.style.display='none';
  }
}

function closeShareCard(){
  document.getElementById('shareCardModal').classList.remove('show');
}

function generateShareCardHTML(){
  var t=getTotals();
  var tgt=getTodayTargets();
  var streak=calculateStreak();
  var calPct=Math.min(100,Math.round((t.cal/tgt.cal)*100));
  var waterMl=typeof getWaterMl==='function'?getWaterMl():0;
  var waterPct=Math.min(100,Math.round((waterMl/tgt.water)*100));
  var burned=typeof getTotalBurned==='function'&&exBurnActive?getTotalBurned():0;

  var now=new Date();
  var dateStr=now.toLocaleDateString('tr-TR',{day:'numeric',month:'long',year:'numeric'});

  // Ring SVG
  var circ=2*Math.PI*40;
  var protCal=t.prot*4,carbCal=t.carb*4,fatCal=t.fat*9;
  var protArc=Math.min(circ,(protCal/tgt.cal)*circ);
  var carbArc=Math.min(circ,(carbCal/tgt.cal)*circ);
  var fatArc=Math.min(circ,(fatCal/tgt.cal)*circ);
  var protOff=circ-protArc;
  var carbOff=circ-carbArc;
  var fatOff=circ-fatArc;
  var protRot=-90;
  var carbRot=-90+(protCal/tgt.cal)*360;
  var fatRot=-90+((protCal+carbCal)/tgt.cal)*360;

  var ringHtml='<svg width="100" height="100" viewBox="0 0 100 100">'
    +'<circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="8"/>'
    +'<circle cx="50" cy="50" r="40" fill="none" stroke="#ff7a7a" stroke-width="8" stroke-dasharray="'+circ+'" stroke-dashoffset="'+protOff+'" stroke-linecap="round" transform="rotate('+protRot+' 50 50)"/>'
    +'<circle cx="50" cy="50" r="40" fill="none" stroke="#22d3ee" stroke-width="8" stroke-dasharray="'+circ+'" stroke-dashoffset="'+carbOff+'" stroke-linecap="round" transform="rotate('+carbRot+' 50 50)"/>'
    +'<circle cx="50" cy="50" r="40" fill="none" stroke="#ffcc55" stroke-width="8" stroke-dasharray="'+circ+'" stroke-dashoffset="'+fatOff+'" stroke-linecap="round" transform="rotate('+fatRot+' 50 50)"/>'
    +'<text x="50" y="46" text-anchor="middle" fill="#fff" font-weight="900" font-size="18" font-family="Outfit,sans-serif">'+Math.round(t.cal)+'</text>'
    +'<text x="50" y="60" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="8" font-weight="600" letter-spacing="1">KCAL</text>'
    +'</svg>';

  var preview=document.getElementById('shareCardPreview');
  preview.innerHTML=
    '<div id="shareCardContent" style="background:linear-gradient(165deg,#1a0e28 0%,#0d1018 40%,#081520 100%);padding:20px;border-radius:16px;color:#fff;font-family:\'Plus Jakarta Sans\',system-ui,sans-serif;position:relative;overflow:hidden">'
    +'<div style="position:absolute;top:-40px;right:-30px;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(255,107,61,.1),transparent 60%);pointer-events:none"></div>'

    // Header
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">'
    +'<div style="display:flex;align-items:center;gap:8px"><div style="width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#ff6b3d,#ff3d6b);display:flex;align-items:center;justify-content:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9" r="1.5" fill="#fff"/><path d="M8 14c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg></div><div><div style="font-weight:900;font-size:.82rem">FitSofra</div><div style="font-size:.6rem;opacity:.5">'+dateStr+'</div></div></div>'
    +(streak>0?'<div style="background:rgba(255,107,61,.15);padding:3px 8px;border-radius:6px;font-size:.68rem;font-weight:800">🔥 '+streak+' gün</div>':'')
    +'</div>'

    // Ring + macros
    +'<div style="display:flex;align-items:center;gap:16px;margin-bottom:16px">'
    +'<div style="flex-shrink:0">'+ringHtml+'</div>'
    +'<div style="flex:1;display:flex;flex-direction:column;gap:6px">'
    +'<div style="display:flex;align-items:center;gap:6px"><div style="width:8px;height:8px;border-radius:50%;background:#ff7a7a"></div><span style="font-size:.7rem;opacity:.6;width:40px">Protein</span><div style="flex:1;height:5px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden"><div style="height:100%;background:#ff7a7a;border-radius:3px;width:'+Math.min(100,(t.prot/tgt.prot)*100)+'%"></div></div><span style="font-size:.7rem;font-weight:700">'+Math.round(t.prot)+'g</span></div>'
    +'<div style="display:flex;align-items:center;gap:6px"><div style="width:8px;height:8px;border-radius:50%;background:#22d3ee"></div><span style="font-size:.7rem;opacity:.6;width:40px">Karb</span><div style="flex:1;height:5px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden"><div style="height:100%;background:#22d3ee;border-radius:3px;width:'+Math.min(100,(t.carb/tgt.carb)*100)+'%"></div></div><span style="font-size:.7rem;font-weight:700">'+Math.round(t.carb)+'g</span></div>'
    +'<div style="display:flex;align-items:center;gap:6px"><div style="width:8px;height:8px;border-radius:50%;background:#ffcc55"></div><span style="font-size:.7rem;opacity:.6;width:40px">Yağ</span><div style="flex:1;height:5px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden"><div style="height:100%;background:#ffcc55;border-radius:3px;width:'+Math.min(100,(t.fat/tgt.fat)*100)+'%"></div></div><span style="font-size:.7rem;font-weight:700">'+Math.round(t.fat)+'g</span></div>'
    +'</div></div>'

    // Stats row
    +'<div style="display:flex;gap:6px">'
    +'<div style="flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:8px;text-align:center"><div style="font-size:.6rem;opacity:.5;margin-bottom:2px">Kalori</div><div style="font-weight:800;font-size:.9rem;color:#ff6b3d">%'+calPct+'</div></div>'
    +'<div style="flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:8px;text-align:center"><div style="font-size:.6rem;opacity:.5;margin-bottom:2px">Su</div><div style="font-weight:800;font-size:.9rem;color:#22d3ee">'+(waterMl/1000).toFixed(1)+'L</div></div>'
    +(burned>0?'<div style="flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:8px;text-align:center"><div style="font-size:.6rem;opacity:.5;margin-bottom:2px">Yakılan</div><div style="font-weight:800;font-size:.9rem;color:#3dd68c">'+burned+'</div></div>':'')
    +'<div style="flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:8px;text-align:center"><div style="font-size:.6rem;opacity:.5;margin-bottom:2px">Hedef</div><div style="font-weight:800;font-size:.9rem">'+tgt.cal+'</div></div>'
    +'</div>'

    +'</div>';
}

function downloadShareCard(){
  var el=document.getElementById('shareCardContent');
  if(!el){showToast('⚠️ Kart bulunamadı');return;}

  // Use canvas approach with html2canvas-like manual rendering
  // Since we don't have html2canvas, we'll use SVG foreignObject
  var width=el.offsetWidth;
  var height=el.offsetHeight;
  var html=el.outerHTML;

  // Create SVG with foreignObject
  var svgData='<svg xmlns="http://www.w3.org/2000/svg" width="'+width+'" height="'+height+'">'
    +'<foreignObject width="100%" height="100%">'
    +'<div xmlns="http://www.w3.org/1999/xhtml" style="font-family:system-ui,sans-serif">'+html+'</div>'
    +'</foreignObject></svg>';

  var svgBlob=new Blob([svgData],{type:'image/svg+xml;charset=utf-8'});
  var url=URL.createObjectURL(svgBlob);

  var canvas=document.createElement('canvas');
  canvas.width=width*2;
  canvas.height=height*2;
  var ctx=canvas.getContext('2d');

  var img=new Image();
  img.onload=function(){
    ctx.scale(2,2);
    ctx.drawImage(img,0,0,width,height);
    URL.revokeObjectURL(url);

    canvas.toBlob(function(blob){
      if(!blob){
        // Fallback: download as SVG
        var a=document.createElement('a');
        a.download='fitsofra-'+dateKey()+'.svg';
        a.href=URL.createObjectURL(svgBlob);
        a.click();
        showToast('📥 SVG olarak indirildi');
        return;
      }
      var a=document.createElement('a');
      a.download='fitsofra-'+dateKey()+'.png';
      a.href=URL.createObjectURL(blob);
      a.click();
      URL.revokeObjectURL(a.href);
      showToast('📥 Kart indirildi!');
      _shareCanvas=canvas;
    },'image/png');
  };
  img.onerror=function(){
    // Fallback: just download SVG
    var a=document.createElement('a');
    a.download='fitsofra-'+dateKey()+'.svg';
    a.href=url;
    a.click();
    showToast('📥 SVG olarak indirildi');
  };
  img.src=url;
}

function nativeShareCard(){
  // Try native Web Share API
  if(!navigator.share){showToast('⚠️ Paylaşım bu tarayıcıda desteklenmiyor');return;}

  var el=document.getElementById('shareCardContent');
  if(!el){showToast('⚠️ Kart bulunamadı');return;}

  // First try to create blob for sharing
  var width=el.offsetWidth;
  var height=el.offsetHeight;
  var svgData='<svg xmlns="http://www.w3.org/2000/svg" width="'+width+'" height="'+height+'">'
    +'<foreignObject width="100%" height="100%">'
    +'<div xmlns="http://www.w3.org/1999/xhtml" style="font-family:system-ui,sans-serif">'+el.outerHTML+'</div>'
    +'</foreignObject></svg>';

  var canvas=document.createElement('canvas');
  canvas.width=width*2;
  canvas.height=height*2;
  var ctx=canvas.getContext('2d');

  var img=new Image();
  img.onload=function(){
    ctx.scale(2,2);
    ctx.drawImage(img,0,0,width,height);

    canvas.toBlob(function(blob){
      if(blob&&navigator.canShare){
        var file=new File([blob],'fitsofra-'+dateKey()+'.png',{type:'image/png'});
        var shareData={files:[file],title:'FitSofra Günlük Özet',text:'Bugünkü beslenme özetim 🍽️'};
        if(navigator.canShare(shareData)){
          navigator.share(shareData).then(function(){
            showToast('✅ Paylaşıldı!');
          }).catch(function(){});
          return;
        }
      }
      // Fallback: share as text
      navigator.share({
        title:'FitSofra Günlük Özet',
        text:'🍽️ Bugün '+Math.round(getTotals().cal)+' kcal aldım! (Hedef: '+getTodayTargets().cal+' kcal) #FitSofra'
      }).catch(function(){});
    },'image/png');
  };
  img.onerror=function(){
    // Fallback text share
    navigator.share({
      title:'FitSofra Günlük Özet',
      text:'🍽️ Bugün '+Math.round(getTotals().cal)+' kcal aldım! (Hedef: '+getTodayTargets().cal+' kcal) #FitSofra'
    }).catch(function(){});
  };

  var svgBlob=new Blob([svgData],{type:'image/svg+xml;charset=utf-8'});
  img.src=URL.createObjectURL(svgBlob);
}

/* ═══════════════════════════════════════════
   KONFETİ ANİMASYONU
═══════════════════════════════════════════ */
function fireConfetti(count){
  count=count||40;
  var container=document.createElement('div');
  container.className='confetti-container';
  document.body.appendChild(container);
  var colors=['#ff6b3d','#ff8f5a','#3dd68c','#5b9cf6','#ffcc55','#a07cf8','#ff5c5c','#22d3ee'];
  for(var i=0;i<count;i++){
    var p=document.createElement('div');
    p.className='confetti-piece';
    p.style.left=Math.random()*100+'%';
    p.style.background=colors[Math.floor(Math.random()*colors.length)];
    p.style.width=(6+Math.random()*8)+'px';
    p.style.height=(6+Math.random()*8)+'px';
    p.style.borderRadius=Math.random()>.5?'50%':'2px';
    p.style.animationDuration=(2+Math.random()*1.5)+'s';
    p.style.animationDelay=(Math.random()*.6)+'s';
    container.appendChild(p);
  }
  setTimeout(function(){container.remove();},4000);
  if(navigator.vibrate)navigator.vibrate([30,50,30]);
}

/* ═══════════════════════════════════════════
   BAŞARIM ROZETLERİ
═══════════════════════════════════════════ */
var ACHIEVEMENTS=[
  {id:'first_food',icon:'🍽️',name:'İlk Adım',desc:'İlk yemeğini kaydet',check:function(){return getTotalFoodCount()>=1;}},
  {id:'food_10',icon:'📝',name:'10 Kayıt',desc:'10 yemek kaydet',check:function(){return getTotalFoodCount()>=10;}},
  {id:'food_50',icon:'📋',name:'50 Kayıt',desc:'50 yemek kaydet',check:function(){return getTotalFoodCount()>=50;}},
  {id:'food_100',icon:'📚',name:'100 Kayıt',desc:'100 yemek kaydet',check:function(){return getTotalFoodCount()>=100;}},
  {id:'food_500',icon:'🗂️',name:'500 Kayıt',desc:'500 yemek kaydet',check:function(){return getTotalFoodCount()>=500;}},
  {id:'streak_3',icon:'🔥',name:'3 Gün Seri',desc:'3 gün üst üste kayıt',check:function(){return calculateStreak()>=3;}},
  {id:'streak_7',icon:'⚡',name:'7 Gün Seri',desc:'1 hafta boyunca kayıt',check:function(){return calculateStreak()>=7;}},
  {id:'streak_14',icon:'🌟',name:'14 Gün Seri',desc:'2 hafta boyunca kayıt',check:function(){return calculateStreak()>=14;}},
  {id:'streak_30',icon:'🏆',name:'30 Gün Seri',desc:'1 ay boyunca kayıt',check:function(){return calculateStreak()>=30;}},
  {id:'streak_100',icon:'💎',name:'100 Gün',desc:'100 gün boyunca kayıt',check:function(){return calculateStreak()>=100;}},
  {id:'target_hit',icon:'🎯',name:'Hedefe Ulaş',desc:'Kalori hedefinle ±%10 farkla bitir',check:function(){var t=getTotals(),tgt=getTodayTargets();var pct=t.cal/tgt.cal*100;return t.cal>0&&pct>=90&&pct<=110;}},
  {id:'water_3',icon:'💧',name:'Su İçici',desc:'Su hedefini 3 gün üst üste tamamla',check:function(){return getWaterStreak()>=3;}},
  {id:'water_champ',icon:'🌊',name:'Su Şampiyonu',desc:'Su hedefini 7 gün üst üste tamamla',check:function(){return getWaterStreak()>=7;}},
  {id:'under_1500',icon:'🥗',name:'Hafif Gün',desc:'1500 kcal altı gün tamamla',check:function(){var t=getTotals();return t.cal>0&&t.cal<1500;}},
  {id:'under_1000',icon:'🌿',name:'Detoks Günü',desc:'1000 kcal altı gün tamamla',check:function(){var t=getTotals();return t.cal>0&&t.cal<1000;}},
  {id:'protein_pro',icon:'💪',name:'Protein Pro',desc:'Protein hedefini tamamla',check:function(){var t=getTotals(),tgt=getTodayTargets();return t.prot>=tgt.prot&&t.prot>0;}},
  {id:'balanced',icon:'⚖️',name:'Dengeci',desc:'Tüm makro hedeflerini ±%15 farkla tamamla',check:function(){var t=getTotals(),g=getTodayTargets();if(t.cal<=0)return false;var pp=t.prot/g.prot*100,cp=t.carb/g.carb*100,fp=t.fat/g.fat*100;return pp>=85&&pp<=115&&cp>=85&&cp<=115&&fp>=85&&fp<=115;}},
  {id:'weight_start',icon:'📊',name:'Kilo Takibi',desc:'İlk kilo kaydını yap',check:function(){return getWeightLog().length>=1;}},
  {id:'weight_5',icon:'📈',name:'Kilo Yolcusu',desc:'5 kilo kaydı yap',check:function(){return getWeightLog().length>=5;}},
  {id:'early_bird',icon:'🌅',name:'Erken Kuş',desc:'Sabah 9 öncesi yemek kaydet',check:function(){return new Date().getHours()<9&&getTotals().cal>0;}},
  {id:'night_owl',icon:'🦉',name:'Gece Kuşu',desc:'Gece 22 sonrası yemek kaydet',check:function(){return new Date().getHours()>=22&&getTotals().cal>0;}},
  {id:'if_starter',icon:'⏱️',name:'Oruç Başlangıcı',desc:'Aralıklı oruç aktifleştir',check:function(){var s=localStorage.getItem('fs_if');return s&&JSON.parse(s).protocol!=='off';}},
];

function getTotalFoodCount(){
  var count=0;
  for(var i=0;i<365;i++){
    var d=new Date();d.setDate(d.getDate()-i);
    var data=getDayData(dateKey(d));
    Object.values(data).forEach(function(foods){count+=foods.length;});
  }
  return count;
}

function getWaterStreak(){
  var streak=0;
  var tgt=getTodayTargets().water||2000;
  for(var i=0;i<365;i++){
    var d=new Date();d.setDate(d.getDate()-i);
    var wml=parseInt(localStorage.getItem('fs_water_'+dateKey(d)))||0;
    if(wml>=tgt)streak++;else break;
  }
  return streak;
}

function getEarnedBadges(){
  var raw=localStorage.getItem('fs_badges');
  return raw?JSON.parse(raw):{};
}
function saveEarnedBadges(b){localStorage.setItem('fs_badges',JSON.stringify(b));}

function checkAchievements(silent){
  var earned=getEarnedBadges();
  var newBadges=[];
  ACHIEVEMENTS.forEach(function(a){
    if(earned[a.id])return;
    try{
      if(a.check()){
        earned[a.id]={date:dateKey(),time:Date.now()};
        newBadges.push(a);
      }
    }catch(e){}
  });
  if(newBadges.length){
    saveEarnedBadges(earned);
    if(!silent){
      newBadges.forEach(function(b,i){
        setTimeout(function(){
          showToast(b.icon+' Rozet kazandın: '+b.name+'!');
          fireConfetti(50);
        },i*1500);
      });
    }
  }
  return earned;
}

function renderBadgesInProfile(){
  var container=document.getElementById('badgesContainer');
  if(!container)return;
  var earned=checkAchievements(true);
  var html='<div class="badge-grid">';
  ACHIEVEMENTS.forEach(function(a){
    var e=earned[a.id];
    html+='<div class="badge-item'+(e?' earned':'')+'" title="'+escHTML(a.desc)+'">'
      +'<span class="badge-icon">'+a.icon+'</span>'
      +'<div class="badge-name">'+escHTML(a.name)+'</div>'
      +(e?'<div class="badge-date">'+e.date.slice(5).replace('-','/')+'</div>':'<div class="badge-date" style="opacity:.3">🔒</div>')
      +'</div>';
  });
  html+='</div>';
  container.innerHTML=html;
}

// Hook: yemek eklendiğinde, su eklendiğinde rozet kontrol et
var _origSaveDayDataForBadges=saveDayData;
saveDayData=function(dk,data){
  _origSaveDayDataForBadges(dk,data);
  setTimeout(function(){checkAchievements();if(typeof checkChallengeProgress==='function')checkChallengeProgress();},500);
};

// Hedefe ulaşınca konfeti
var _lastCalPct=0;
function checkGoalConfetti(){
  var t=getTotals(),tgt=getTodayTargets();
  var pct=Math.round(t.cal/tgt.cal*100);
  if(pct>=95&&pct<=105&&_lastCalPct<95){
    fireConfetti(60);
    showToast('🎉 Günlük hedefe ulaştın!');
  }
  _lastCalPct=pct;
}

/* ═══════════════════════════════════════════
   PULL-TO-REFRESH
═══════════════════════════════════════════ */
(function initPTR(){
  var startY=0,pulling=false,indicator=null;
  indicator=document.createElement('div');
  indicator.className='ptr-indicator';
  indicator.textContent='🔄';
  document.body.appendChild(indicator);

  document.addEventListener('touchstart',function(e){
    if(window.scrollY>10)return;
    if(e.target.closest('.modal-overlay,.meal-card,.swipe-wrapper'))return;
    startY=e.touches[0].clientY;
    pulling=true;
  },{passive:true});

  document.addEventListener('touchmove',function(e){
    if(!pulling)return;
    var dy=e.touches[0].clientY-startY;
    if(dy>20&&dy<120&&window.scrollY<=0){
      indicator.style.top=(dy-30)+'px';
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  },{passive:true});

  document.addEventListener('touchend',function(e){
    if(!pulling)return;
    pulling=false;
    var dy=e.changedTouches[0].clientY-startY;
    if(dy>70&&window.scrollY<=0){
      indicator.classList.add('refreshing');
      renderMeals();updateHeader();updateWaterHeader();
      if(typeof renderExerciseCard==='function')renderExerciseCard();
      setTimeout(function(){
        indicator.classList.remove('active','refreshing');
        showToast('✅ Yenilendi');
      },600);
    } else {
      indicator.classList.remove('active');
    }
  },{passive:true});
})();

/* ═══════════════════════════════════════════
   SKELETON LOADING
═══════════════════════════════════════════ */
function showSkeleton(){
  var c=document.getElementById('mealsContainer');
  if(!c)return;
  c.innerHTML='<div class="skeleton skeleton-meal" style="animation-delay:0s"></div>'
    +'<div class="skeleton skeleton-meal" style="animation-delay:.1s"></div>'
    +'<div class="skeleton skeleton-meal" style="animation-delay:.2s"></div>'
    +'<div class="skeleton skeleton-meal" style="animation-delay:.3s"></div>';
}

/* ═══════════════════════════════════════════
   ALERJEN / İNTOLERANS SİSTEMİ
═══════════════════════════════════════════ */
var ALLERGEN_MAP={
  gluten:['ekmek','makarna','börek','simit','pide','lahmacun','poğaça','krep','kruvasan','gözleme','mantı','erişte','bulgur','buğday','un ','pasta','kek','kurabiye','bisküvi','çörek','tost','sandviç','wrap','pizza','tart','waffle','pankek','bazlama','kadayıf','baklava','künefe','revani','irmik','galeta'],
  laktoz:['süt','yoğurt','peynir','kaşar','ayran','lor','kefir','tereyağı','krema','dondurma','puding','sütlaç','kaymak','çökelek','labne','tulum','hellim'],
  fistik:['fıstık','fıstıklı'],
  yumurta:['yumurta','omlet','menemen','sahanda'],
  deniz:['karides','midye','kalamar','ahtapot','istakoz','yengeç'],
  soya:['soya','edamame','tofu'],
  kuruyemis:['ceviz','badem','fındık','antep fıstığı','kaju','yer fıstığı','pekan'],
  susam:['susam','susamlı','tahin','tahini']
};

function saveAllergens(){
  var checked=[];
  document.querySelectorAll('#allergenCheckboxes input:checked').forEach(function(cb){
    checked.push(cb.value);
  });
  localStorage.setItem('fs_allergens',JSON.stringify(checked));
}

function loadAllergens(){
  var raw=localStorage.getItem('fs_allergens');
  var allergens=raw?JSON.parse(raw):[];
  document.querySelectorAll('#allergenCheckboxes input').forEach(function(cb){
    cb.checked=allergens.indexOf(cb.value)>=0;
  });
  return allergens;
}

function checkAllergen(foodName){
  var allergens=JSON.parse(localStorage.getItem('fs_allergens')||'[]');
  if(!allergens.length)return null;
  var name=(foodName||'').toLowerCase();
  var found=[];
  allergens.forEach(function(a){
    var keywords=ALLERGEN_MAP[a]||[];
    keywords.forEach(function(kw){
      if(name.indexOf(kw)>=0&&found.indexOf(a)<0)found.push(a);
    });
  });
  return found.length?found:null;
}

var ALLERGEN_LABELS={gluten:'🌾 Glüten',laktoz:'🥛 Laktoz',fistik:'🥜 Fıstık',yumurta:'🥚 Yumurta',deniz:'🦐 Deniz Ürünü',soya:'🫘 Soya',kuruyemis:'🌰 Kuruyemiş',susam:'🫓 Susam'};

// Hook into food selection — warn on allergen
var _origSelectDbFood=selectDbFood;
selectDbFood=function(name){
  var warns=checkAllergen(name);
  if(warns){
    var labels=warns.map(function(w){return ALLERGEN_LABELS[w]||w;}).join(', ');
    if(!confirm('⚠️ DİKKAT — Alerjen uyarısı!\n\n"'+name+'" → '+labels+' içerebilir.\n\nYine de eklemek istiyor musun?'))return;
  }
  _origSelectDbFood(name);
};

/* ═══════════════════════════════════════════
   ARALIKLI ORUÇ (IF) TAKİBİ
═══════════════════════════════════════════ */
var IF_PROTOCOLS={
  '12:12':{fast:12,eat:12,defStart:'08:00',defEnd:'20:00',desc:'Başlangıç seviyesi. 12 saat oruç, 12 saat yeme penceresi. Gece yemeklerini kesmek için ideal.'},
  '14:10':{fast:14,eat:10,defStart:'09:00',defEnd:'19:00',desc:'Hafif protokol. Metabolizmayı hızlandırmak için güzel bir başlangıç. Kahvaltıyı biraz geciktir.'},
  '16:8':{fast:16,eat:8,defStart:'12:00',defEnd:'20:00',desc:'En popüler protokol. Öğle - akşam yeme penceresi. Araştırmalarca en çok desteklenen yöntem.'},
  '18:6':{fast:18,eat:6,defStart:'13:00',defEnd:'19:00',desc:'Orta düzey. Günde 2 ana öğün. Daha yoğun yağ yakımı ve insülin duyarlılığı artışı.'},
  '20:4':{fast:20,eat:4,defStart:'16:00',defEnd:'20:00',desc:'Savaşçı diyeti. Günde 1 büyük öğün + hafif atıştırmalık. İleri düzey, başlangıç için önerilmez.'},
  'omad':{fast:23,eat:1,defStart:'18:00',defEnd:'19:00',desc:'Günde tek öğün. En sıkı protokol. Tüm kaloriyi 1 saatte almak beslenme planlama gerektirir.'},
  '5:2':{fast:0,eat:24,defStart:'',defEnd:'',desc:'Haftada 2 gün max 500 kcal, 5 gün normal yeme. Oruç günleri ardışık olmamalı.'}
};

function getIFStatus(){
  var raw=localStorage.getItem('fs_if');
  var s=raw?JSON.parse(raw):null;
  if(!s||s.protocol==='off')return null;
  var now=new Date();
  if(s.protocol==='5:2'){
    var isOruçDay=s.days52&&s.days52.indexOf(now.getDay())>=0;
    return{active:true,type:'5:2',isFasting:isOruçDay,eatStart:'',eatEnd:'',calLimit:isOruçDay?500:0};
  }
  var eatStart=s.eatStart||'12:00';
  var eatEnd=s.eatEnd||'20:00';
  var hm=now.getHours()*60+now.getMinutes();
  var startMin=parseInt(eatStart.split(':')[0])*60+parseInt(eatStart.split(':')[1]);
  var endMin=parseInt(eatEnd.split(':')[0])*60+parseInt(eatEnd.split(':')[1]);
  var isEating=hm>=startMin&&hm<endMin;
  // Time remaining
  var nextEvent,nextLabel;
  if(isEating){
    nextEvent=endMin-hm;nextLabel='Oruç başlangıcına';
  } else if(hm<startMin){
    nextEvent=startMin-hm;nextLabel='Yeme penceresine';
  } else {
    nextEvent=1440-hm+startMin;nextLabel='Yeme penceresine';
  }
  var nextH=Math.floor(nextEvent/60);
  var nextM=nextEvent%60;
  return{active:true,type:s.protocol,isFasting:!isEating,eatStart:eatStart,eatEnd:eatEnd,remaining:nextH+'s '+nextM+'dk',remainLabel:nextLabel,remainMin:nextEvent,proto:IF_PROTOCOLS[s.protocol]};
}

function renderIFTimerInMeals(){
  var slot=document.getElementById('ifTimerSlot');
  if(!slot)return;
  if(typeof window._ifCardCollapsed==='undefined')window._ifCardCollapsed=true;
  var isCollapsed=window._ifCardCollapsed;
  var raw=localStorage.getItem('fs_if');
  var s=raw?JSON.parse(raw):{protocol:'off',eatStart:'12:00',eatEnd:'20:00',days52:[]};
  var proto=s.protocol||'off';
  var status=getIFStatus();

  var statusBadge='';
  if(status){
    var bc=status.isFasting?'fasting':'eating';
    var bt=status.type==='5:2'?(status.isFasting?'🔴 Oruç Günü':'🟢 Normal Gün'):(status.isFasting?'🔴 Oruç':'🟢 Yeme');
    statusBadge='<span class="if-status '+bc+'" style="font-size:.72rem">'+bt+'</span>';
  } else {
    statusBadge='<span style="font-size:.72rem;color:var(--text2);font-weight:600;padding:3px 8px;background:var(--glass);border-radius:6px">Kapalı</span>';
  }

  var headerR=isCollapsed?'var(--radius)':'var(--radius) var(--radius) 0 0';
  var chevronStyle='transition:transform .25s;'+(isCollapsed?'transform:rotate(-90deg)':'');

  var html='<div class="exercise-card" id="ifCard" style="animation-delay:.3s">'
    // Renk efektini inline style ile override
    +'<style>#ifCard::before{background:linear-gradient(90deg,#22d3ee,#3dd68c)!important}</style>'
    +'<div class="meal-header" onclick="toggleIFCard()" style="cursor:pointer;border-radius:'+headerR+';margin:-16px -16px '+(isCollapsed?'-16px':'0')+'px -16px;padding:12px 16px">'
      +'<div class="meal-title">'
        +'<div class="meal-icon" style="background:rgba(34,211,238,.15)">⏱️</div>'
        +'Aralıklı Oruç'
      +'</div>'
      +'<div class="meal-right" style="gap:8px">'+statusBadge
        +'<span class="meal-chevron" style="'+chevronStyle+'">‹</span>'
      +'</div>'
    +'</div>'
    +'<div style="overflow:hidden;transition:max-height .35s ease;max-height:'+(isCollapsed?'0':'1000px')+'">'
    +'<div style="padding-top:16px">';

  // Timer içeriği
  if(status){
    if(status.type==='5:2'){
      if(status.isFasting)html+='<div style="padding:8px 10px;background:rgba(255,92,92,.06);border:1px solid rgba(255,92,92,.12);border-radius:10px;font-size:.76rem;color:var(--text2);line-height:1.5;margin-bottom:12px">Bugün oruç günü — maksimum <strong style="color:var(--red)">500 kcal</strong> alımı önerilir.</div>';
    } else {
      var p=status.proto||{};
      var totalMin2=p.eat?p.eat*60:480;
      var elapsed2=totalMin2-(status.isFasting?0:(status.remainMin));
      var pct2=status.isFasting?100:Math.min(100,Math.max(0,(elapsed2/totalMin2)*100));
      var circ2=2*Math.PI*28;
      var offset2=circ2-(pct2/100)*circ2;
      var rc=status.isFasting?'var(--red)':'var(--green)';
      html+='<div style="display:flex;align-items:center;gap:14px;margin-bottom:12px">'
        +'<svg viewBox="0 0 64 64" width="68" height="68"><circle cx="32" cy="32" r="28" fill="none" stroke="var(--border)" stroke-width="5"/><circle cx="32" cy="32" r="28" fill="none" stroke="'+rc+'" stroke-width="5" stroke-dasharray="'+circ2+'" stroke-dashoffset="'+offset2+'" stroke-linecap="round" transform="rotate(-90 32 32)" style="transition:stroke-dashoffset .8s ease"/><text x="32" y="30" text-anchor="middle" fill="var(--text)" font-size="10" font-weight="800">'+escHTML(status.type)+'</text><text x="32" y="41" text-anchor="middle" fill="var(--text2)" font-size="7">'+(status.isFasting?'oruç':'yeme')+'</text></svg>'
        +'<div style="flex:1">'
          +'<div style="font-size:.82rem;font-weight:700;margin-bottom:4px;color:var(--text)">'+status.remainLabel+'</div>'
          +'<div style="font-size:1.1rem;font-weight:900;color:'+(status.isFasting?'var(--red)':'var(--green)')+'">'+status.remaining+'</div>'
          +'<div style="margin-top:6px;display:flex;gap:8px;font-size:.7rem;color:var(--text2)">'
            +'<span>🍽️ '+status.eatStart+' – '+status.eatEnd+'</span>'
            +'<span>⏸️ '+(p.fast||0)+'s oruç</span>'
          +'</div>'
        +'</div>'
      +'</div>';
      if(p.desc)html+='<div style="font-size:.7rem;color:var(--text2);line-height:1.4;padding:8px 10px;background:var(--glass);border-radius:8px;border:1px solid var(--border);margin-bottom:12px">'+escHTML(p.desc)+'</div>';
    }
  }

  // Ayarlar bölümü
  html+='<div style="border-top:1px solid var(--border);padding-top:12px">'
    +'<div style="font-size:.74rem;font-weight:700;color:var(--text2);margin-bottom:8px">⚙️ Protokol Ayarları</div>'
    // Select — yüksek padding
    +'<select id="ifProtocol" onchange="onIFProtocolChange()" style="width:100%;font-family:var(--font,system-ui);font-size:.82rem;padding:16px 14px;border:1.5px solid var(--border);border-radius:10px;background:var(--glass);color:var(--text);margin-bottom:12px;appearance:auto;min-height:56px;max-width:100%;box-sizing:border-box;overflow:hidden;text-overflow:ellipsis">'
      +'<option value="off"'+(proto==='off'?' selected':'')+'>⭕ Kapalı</option>'
      +'<option value="12:12"'+(proto==='12:12'?' selected':'')+'>12:12 — Başlangıç (12s oruç / 12s yeme)</option>'
      +'<option value="14:10"'+(proto==='14:10'?' selected':'')+'>14:10 — Hafif (14s oruç / 10s yeme)</option>'
      +'<option value="16:8"'+(proto==='16:8'?' selected':'')+'>16:8 — Klasik (16s oruç / 8s yeme) ⭐</option>'
      +'<option value="18:6"'+(proto==='18:6'?' selected':'')+'>18:6 — Orta (18s oruç / 6s yeme)</option>'
      +'<option value="20:4"'+(proto==='20:4'?' selected':'')+'>20:4 — Savaşçı (20s oruç / 4s yeme)</option>'
      +'<option value="omad"'+(proto==='omad'?' selected':'')+'>OMAD — Günde tek öğün (23s oruç / 1s yeme)</option>'
      +'<option value="5:2"'+(proto==='5:2'?' selected':'')+'>5:2 — Haftada 2 gün 500 kcal</option>'
    +'</select>'
    // Saat ayarları — ayrı satırlarda, iç içe geçmesin
    +'<div id="ifTimeSettings" style="display:'+(proto!=='off'&&proto!=='5:2'?'block':'none')+';margin-bottom:10px">'
      +'<div style="display:flex;gap:12px;margin-bottom:10px;max-width:100%">'
        +'<div style="flex:1;min-width:0">'
          +'<label style="font-size:.68rem;color:var(--text2);font-weight:600;display:block;margin-bottom:4px">🍽️ Başlangıç</label>'
          +'<input type="time" id="ifEatStart" value="'+(s.eatStart||'12:00')+'" onchange="onIFTimeChange(\'start\')" style="width:100%;padding:10px 8px;background:var(--glass);border:1.5px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font,system-ui);font-size:.82rem;font-weight:600;box-sizing:border-box;min-width:0">'
        +'</div>'
        +'<div style="flex:1;min-width:0">'
          +'<label style="font-size:.68rem;color:var(--text2);font-weight:600;display:block;margin-bottom:4px">🔒 Bitiş</label>'
          +'<input type="time" id="ifEatEnd" value="'+(s.eatEnd||'20:00')+'" onchange="onIFTimeChange(\'end\')" style="width:100%;padding:10px 8px;background:var(--glass);border:1.5px solid var(--border);border-radius:8px;color:var(--text);font-family:var(--font,system-ui);font-size:.82rem;font-weight:600;box-sizing:border-box;min-width:0">'
        +'</div>'
      +'</div>'
      +'<div id="ifProtocolInfo" style="font-size:.72rem;color:var(--text2);padding:8px;background:var(--glass);border-radius:8px;border:1px solid var(--border);line-height:1.5"></div>'
    +'</div>'
    // 5:2 gün seçimi
    +'<div id="if52Settings" style="display:'+(proto==='5:2'?'block':'none')+'">'
      +'<p style="font-size:.72rem;color:var(--text2);margin-bottom:8px">Oruç günlerini seç (haftada 2, ardışık olmamalı):</p>'
      +'<div style="display:flex;gap:5px;flex-wrap:wrap" id="if52Days">'
        +[{v:1,n:'Pzt'},{v:2,n:'Sal'},{v:3,n:'Çar'},{v:4,n:'Per'},{v:5,n:'Cum'},{v:6,n:'Cmt'},{v:0,n:'Paz'}].map(function(d){
          var chk=s.days52&&s.days52.indexOf(d.v)>=0?' checked':'';
          return'<label style="font-size:.76rem;padding:7px 11px;background:var(--glass);border:1.5px solid var(--border);border-radius:8px;cursor:pointer;display:flex;align-items:center;gap:4px"><input type="checkbox" value="'+d.v+'"'+chk+' onchange="saveIFSettings()"> '+d.n+'</label>';
        }).join('')
      +'</div>'
    +'</div>'
  +'</div>'
  +'</div></div></div>';

  slot.innerHTML=html;

  // Protocol info güncelle
  if(proto!=='off'&&proto!=='5:2'){
    var infoDiv=document.getElementById('ifProtocolInfo');
    var pp=IF_PROTOCOLS[proto];
    if(pp&&infoDiv)infoDiv.innerHTML='<strong>'+proto+'</strong> — '+pp.fast+'s oruç / '+pp.eat+'s yeme<br>'+pp.desc;
  }
}

function toggleIFCard(){
  window._ifCardCollapsed=!window._ifCardCollapsed;
  renderIFTimerInMeals();
}

function onIFProtocolChange(){
  var protoEl=document.getElementById('ifProtocol');
  if(!protoEl)return;
  var proto=protoEl.value;
  var p=IF_PROTOCOLS[proto];
  if(p&&p.defStart&&p.defEnd){
    var startEl=document.getElementById('ifEatStart');
    var endEl=document.getElementById('ifEatEnd');
    if(startEl)startEl.value=p.defStart;
    if(endEl)endEl.value=p.defEnd;
  }
  saveIFSettings();
}

function onIFTimeChange(changed){
  var protoEl=document.getElementById('ifProtocol');
  if(!protoEl)return;
  var proto=protoEl.value;
  var p=IF_PROTOCOLS[proto];
  if(!p||!p.eat)return saveIFSettings();
  var startEl=document.getElementById('ifEatStart');
  var endEl=document.getElementById('ifEatEnd');
  if(!startEl||!endEl)return saveIFSettings();
  var eatHours=p.eat;
  if(changed==='start'){
    var parts=startEl.value.split(':');
    var h=parseInt(parts[0]),m=parseInt(parts[1]||0);
    var endH=(h+eatHours)%24;
    endEl.value=String(endH).padStart(2,'0')+':'+String(m).padStart(2,'0');
  } else {
    var parts=endEl.value.split(':');
    var h=parseInt(parts[0]),m=parseInt(parts[1]||0);
    var startH=(h-eatHours+24)%24;
    startEl.value=String(startH).padStart(2,'0')+':'+String(m).padStart(2,'0');
  }
  saveIFSettings();
}

function saveIFSettings(){
  var protoEl=document.getElementById('ifProtocol');
  if(!protoEl)return;
  var proto=protoEl.value;
  var eatStartEl=document.getElementById('ifEatStart');
  var eatEndEl=document.getElementById('ifEatEnd');
  var settings={protocol:proto,eatStart:eatStartEl?eatStartEl.value:'12:00',eatEnd:eatEndEl?eatEndEl.value:'20:00',days52:[]};
  if(proto==='5:2'){
    document.querySelectorAll('#if52Days input:checked').forEach(function(cb){settings.days52.push(parseInt(cb.value));});
  }
  localStorage.setItem('fs_if',JSON.stringify(settings));
  updateIFUI();
  renderIFTimerInMeals();
}

function loadIFSettings(){
  return JSON.parse(localStorage.getItem('fs_if')||'{"protocol":"off","eatStart":"12:00","eatEnd":"20:00","days52":[]}');
}

function updateIFUI(){
  var proto=document.getElementById('ifProtocol');if(!proto)return;
  var val=proto.value;
  var timeDiv=document.getElementById('ifTimeSettings');
  var div52=document.getElementById('if52Settings');
  var infoDiv=document.getElementById('ifProtocolInfo');
  if(timeDiv)timeDiv.style.display=(val!=='off'&&val!=='5:2')?'block':'none';
  if(div52)div52.style.display=(val==='5:2')?'block':'none';
  if(val!=='off'&&val!=='5:2'){var p=IF_PROTOCOLS[val];if(p&&infoDiv)infoDiv.innerHTML='<strong>'+val+'</strong> — '+p.fast+'s oruç / '+p.eat+'s yeme<br>'+p.desc;}
  else if(infoDiv)infoDiv.innerHTML='';
}

// IF check when adding food
var _origOpenAddFood=openAddFood;
openAddFood=function(mealId){
  var status=getIFStatus();
  if(status&&status.isFasting){
    if(status.type==='5:2'){
      var t=getTotals();
      if(t.cal>=500){
        if(!confirm('⚠️ 5:2 Oruç günü — 500 kcal limitine ulaştın.\nYine de yemek eklemek istiyor musun?'))return;
      }
    } else {
      if(!confirm('⏱️ Şu an oruç periyodundasın ('+status.type+').\nYeme penceren: '+status.eatStart+' – '+status.eatEnd+'\n\nYine de yemek eklemek istiyor musun?'))return;
    }
  }
  _origOpenAddFood(mealId);
};

// Render badges in profile (hook switchTab)
var _origSwitchTab=switchTab;
var _planLoaded=false;
var _communityLoaded=false;
switchTab=function(tab){
  _origSwitchTab(tab);
  if(tab==='profil'){
    renderBadgesInProfile();
  }
  if(tab==='plan'){
    // Plan sekmesinde header/date-nav gizle
    var h=document.querySelector('.header');var dn=document.querySelector('.date-nav');
    if(h)h.style.display='none';if(dn)dn.style.display='none';
    // Nav'da aktif butonu gösterme (plan nav'da yok)
    document.querySelectorAll('.nav-item').forEach(function(n){n.classList.remove('active');});
    document.getElementById('nav-gunluk').classList.add('active');
    if(!_planLoaded){
      _planLoaded=true;
      loadModulePage('planner.html','planContainer');
    }
  }
  if(tab==='topluluk'&&!_communityLoaded){
    _communityLoaded=true;
    loadModulePage('community.html','communityContainer');
  }
};

// Modüler sayfa yükleme — ayrı HTML dosyasını fetch edip container'a inject eder
async function loadModulePage(filename,containerId){
  try{
    var resp=await fetch(filename);
    if(!resp.ok)throw new Error(resp.status);
    var html=await resp.text();
    var container=document.getElementById(containerId);
    container.innerHTML=html;
    // Inject edilen HTML içindeki script'leri çalıştır
    container.querySelectorAll('script').forEach(function(oldScript){
      var newScript=document.createElement('script');
      if(oldScript.src){newScript.src=oldScript.src;}
      else{newScript.textContent=oldScript.textContent;}
      oldScript.parentNode.replaceChild(newScript,oldScript);
    });
  }catch(e){
    document.getElementById(containerId).innerHTML='<div style="text-align:center;padding:40px 16px;color:var(--text2)"><div style="font-size:2rem;margin-bottom:12px">⚠️</div><div style="font-size:.85rem;font-weight:700;margin-bottom:6px">Modül yüklenemedi</div><div style="font-size:.72rem">'+filename+' dosyası bulunamadı. Dosyanın aynı dizinde olduğundan emin olun.</div></div>';
  }
}

// Init
setTimeout(function(){
  loadAllergens();
  loadIFSettings();
  renderIFTimerInMeals();
  onTicketTypeChange();
  setTimeout(function(){checkUnreadFeedbacks();},2000);
  // Update IF timer every minute
  setInterval(renderIFTimerInMeals,60000);
  // Check achievements on load
  checkAchievements(true);
  // Hook goal confetti into updateHeader
  var _origUH2=updateHeader;
  updateHeader=function(){_origUH2();checkGoalConfetti();};
},200);

// ═══════════════════════════════════════════
//  UYGULAMA REHBERİ (İnteraktif Tur)
// ═══════════════════════════════════════════

var tourSteps=[
  {title:'FitSofra\'ya Hoş Geldin!',text:'Sağlıklı beslenme yolculuğunda dijital yol arkadaşın. Bu rehber sana uygulamanın tüm özelliklerini adım adım tanıtacak.',icon:'👋',target:null},
  {title:'Kalori Halkası',text:'Günlük kalori hedefinizi ve ne kadar tükettiğinizi anlık olarak gösterir. Altındaki renkli çubuklar protein, karbonhidrat ve yağ dengesini takip eder.',icon:'🎯',target:'.calorie-ring-section',tab:'gunluk',scroll:'none'},
  {title:'Gün Seri Takibi',text:'Üst kısımdaki 🔥 seri sayacı art arda kaç gün kalori kaydı yaptığını gösterir. Seriyi koruyarak motivasyonunu yüksek tut!',icon:'🔥',target:'#streakBadge',tab:'gunluk',scroll:'none'},
  {title:'Öğün Takibi',text:'Kahvaltı, öğle, akşam ve ara öğünlerine yemek ekle. Her öğünün toplam kalori ve makro dağılımını anlık gör. Yemekleri sola kaydırarak silebilirsin.',icon:'🥗',target:'.meal-section:first-child',tab:'gunluk'},
  {title:'Yemek Ekleme',text:'Öğüne dokunarak yemek ekle. 1000+ yerel Türk yemeği, FatSecret global veritabanı, OpenFoodFacts ve barkod tarama ile istediğin yemeği kolayca bul.',icon:'🔍',target:'.meal-section:first-child .add-food-btn',tab:'gunluk'},
  {title:'Barkod & Sesli Arama',text:'Yemek ekleme ekranında 📷 barkod tarayıcı ile ambalajlı ürünleri anında tanı. 🎤 Sesli arama ile konuşarak yemek arayabilirsin.',icon:'📷',target:null},
  {title:'Anlık Beslenme Yorumu',text:'Günlük sayfanın üstündeki renkli banner, o anki beslenme durumuna göre kişisel yorum ve öneriler sunar. Yemek ekledikçe güncellenir.',icon:'💬',target:'#dailyBanner',tab:'gunluk'},
  {title:'Su Takibi',text:'Günlük su tüketimini bardak bardak kaydet. İlerleme çubuğu hedefe ne kadar yaklaştığını gösterir. Bildirimlerle hatırlatma alabilirsin.',icon:'💧',target:'#waterCard',tab:'gunluk'},
  {title:'Egzersiz Kaydı',text:'Yaptığın egzersizleri kaydet ve yakılan kalorileri hesapla. Net kalori hesabına egzersiz de dahil edilir.',icon:'🏋️',target:'#exerciseCard',tab:'gunluk'},
  {title:'Aralıklı Oruç (IF)',text:'16:8, 18:6, 20:4 ve 5:2 gibi oruç protokollerini ayarla. Yeme/oruç pencereni canlı zamanlayıcıyla takip et.',icon:'⏱️',target:'#ifTimerSlot',tab:'gunluk'},
  {title:'Tarifler',text:'Sağlıklı ve lezzetli tarif önerilerini keşfet. Malzemeleri, pişirme adımlarını ve besin değerlerini gör. Tarifi direkt öğününe ekle!',icon:'📖',target:null,tab:'oneri',tabTarget:'#nav-oneri'},
  {title:'Akıllı Öğün Önerici',text:'Tarifler sekmesinde kalan kalori ve makro değerlerine göre akıllı öğün önerileri alabilirsin. İhtiyacına uygun yemekler otomatik önerilir.',icon:'🤖',target:null,tab:'oneri'},
  {title:'Arkadaşlar',text:'Arkadaşlarını ekle ve birlikte motive ol! Birbirinizin günlük kalori durumunu görebilir, sağlıklı rekabet ortamı oluşturabilirsiniz.',icon:'👥',target:null,tab:'arkadaslar',tabTarget:'#nav-arkadaslar'},
  {title:'İstatistikler',text:'Haftalık-aylık kalori trendleri, makro dağılım grafikleri, kilo değişim tablosu ve detaylı beslenme analizleri.',icon:'📊',target:null,tab:'istatistik',tabTarget:'#nav-istatistik'},
  {title:'Haftalık Kalori Planı',text:'Profil ayarlarından haftalık plan oluşturabilirsin. Her güne farklı kalori ve makro hedefi belirle — pazartesi düşük karbonhidrat, cumartesi serbest gün gibi.',icon:'📆',target:null,tab:'profil'},
  {title:'Profil & Hedefler',text:'Kişisel bilgilerini gir, TDEE otomatik hesaplansın. VKİ takibi, kilo hedefi ve aktivite seviyeni buradan yönet.',icon:'👤',target:null,tab:'profil',tabTarget:'#nav-profil'},
  {title:'Bulut Senkronizasyon',text:'Google hesabınla giriş yap, tüm verilerin otomatik yedeklensin. Farklı cihazlardan aynı verilere erişebilirsin.',icon:'☁️',target:null},
  {title:'Bildirimler',text:'Öğün hatırlatıcıları, su içme uyarıları, günlük özet ve haftalık rapor. Uygulama kapalıyken bile push bildirim alırsın!',icon:'🔔',target:null},
  {title:'Tema Değiştirme',text:'Sağ üstteki ay/güneş ikonuyla karanlık ve aydınlık tema arasında geçiş yap.',icon:'🎨',target:'#themeBtn',tab:'gunluk',scroll:'none'},
  {title:'Başarım Rozetleri',text:'Hedeflerini tuttur, serileri sürdür ve özel rozetler kazan! İlk giriş, 7 günlük seri, su şampiyonu, makro ustası ve daha fazlası.',icon:'🏆',target:null},
  {title:'Alerjen Uyarıları',text:'Profil → Alerjen ayarlarından hassasiyetlerini belirle. İşaretlediğin alerjenleri içerebilecek yemeklerde otomatik uyarı alırsın.',icon:'⚠️',target:null},
  {title:'Hazırsın!',text:'Artık FitSofra\'nın tüm özelliklerini biliyorsun! Bu rehberi istediğin zaman Profil → Uygulama Rehberi\'nden tekrar açabilirsin. Sağlıklı günler!',icon:'🚀',target:null}
];

var currentTourStep=0;

function startAppTour(){
  currentTourStep=0;
  switchTab('gunluk');
  window.scrollTo(0,0);
  setTimeout(function(){showTourStep(0);},400);
}

function showTourStep(idx){
  currentTourStep=idx;
  var step=tourSteps[idx];
  if(!step)return endTour();

  // Sekme değiştir
  if(step.tab){
    switchTab(step.tab);
    if(step.tabTarget){
      var navEl=document.querySelector(step.tabTarget);
      if(navEl)navEl.classList.add('active');
    }
  }

  removeTourOverlay();

  // Ana container
  var overlay=document.createElement('div');
  overlay.id='tourOverlay';
  overlay.style.cssText='position:fixed;inset:0;z-index:200;';

  // SVG mask ile spotlight deliği
  var svgNS='http://www.w3.org/2000/svg';
  var svg=document.createElementNS(svgNS,'svg');
  svg.setAttribute('width','100%');
  svg.setAttribute('height','100%');
  svg.style.cssText='position:absolute;inset:0;z-index:1';

  var defs=document.createElementNS(svgNS,'defs');
  var mask=document.createElementNS(svgNS,'mask');
  mask.id='tourMask';

  // Beyaz arkaplan (tümü görünür)
  var fullRect=document.createElementNS(svgNS,'rect');
  fullRect.setAttribute('width','100%');fullRect.setAttribute('height','100%');
  fullRect.setAttribute('fill','white');
  mask.appendChild(fullRect);

  // Siyah delik (spotlight)
  var hole=document.createElementNS(svgNS,'rect');
  hole.id='tourHole';
  hole.setAttribute('rx','16');hole.setAttribute('ry','16');
  hole.setAttribute('fill','black');
  hole.setAttribute('x','0');hole.setAttribute('y','0');
  hole.setAttribute('width','0');hole.setAttribute('height','0');
  mask.appendChild(hole);
  defs.appendChild(mask);
  svg.appendChild(defs);

  var bgRect=document.createElementNS(svgNS,'rect');
  bgRect.setAttribute('width','100%');bgRect.setAttribute('height','100%');
  bgRect.setAttribute('fill','rgba(0,0,0,0.75)');
  bgRect.setAttribute('mask','url(#tourMask)');
  svg.appendChild(bgRect);
  overlay.appendChild(svg);

  // Hedef elemana spotlight aç
  if(step.target){
    setTimeout(function(){
      var el=document.querySelector(step.target);
      if(el){
        if(step.scroll!=='none')el.scrollIntoView({behavior:'smooth',block:'center'});
        setTimeout(function(){
          var r=el.getBoundingClientRect();
          var pad=10;
          var h=document.getElementById('tourHole');
          if(h){
            h.setAttribute('x',r.left-pad);
            h.setAttribute('y',r.top-pad);
            h.setAttribute('width',r.width+pad*2);
            h.setAttribute('height',r.height+pad*2);
          }
        },step.scroll==='none'?50:400);
      }
    },150);
  }

  // Tooltip kartı
  var card=document.createElement('div');
  var isTop=step.target?true:false;
  if(step.target){
    var el=document.querySelector(step.target);
    if(el){
      var r=el.getBoundingClientRect();
      isTop=r.top>window.innerHeight*0.5;
    }
  }
  card.style.cssText='position:fixed;'+(isTop?'top:60px':'bottom:90px')+';left:12px;right:12px;z-index:2;'
    +'background:var(--card,#181b23);border:1.5px solid var(--border,#2a2d38);border-radius:20px;'
    +'padding:22px 18px 18px;box-shadow:0 16px 48px rgba(0,0,0,.6);animation:fadeUp .35s ease';

  // Progress bar
  var prog=document.createElement('div');
  prog.style.cssText='position:absolute;top:0;left:0;height:3px;border-radius:20px 20px 0 0;'
    +'background:linear-gradient(90deg,#ff6b3d,#ff8f5a);transition:width .4s;'
    +'width:'+((idx+1)/tourSteps.length*100)+'%';
  card.appendChild(prog);

  // Header: icon + title + step count
  var hdr=document.createElement('div');
  hdr.style.cssText='display:flex;align-items:center;gap:12px;margin-bottom:10px';
  hdr.innerHTML='<div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,rgba(255,107,61,.15),rgba(160,124,248,.1));display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0">'+step.icon+'</div>'
    +'<div style="flex:1;min-width:0"><div style="font-weight:800;font-size:.95rem;color:var(--text,#f0f0f5)">'+step.title+'</div>'
    +'<div style="font-size:.65rem;color:var(--text2,#6b7094);margin-top:2px">Adım '+(idx+1)+' / '+tourSteps.length+'</div></div>';
  card.appendChild(hdr);

  // Body text
  var body=document.createElement('p');
  body.style.cssText='font-size:.82rem;line-height:1.65;color:var(--text2,#6b7094);margin:0 0 16px';
  body.textContent=step.text;
  card.appendChild(body);

  // Buttons
  var btns=document.createElement('div');
  btns.style.cssText='display:flex;gap:8px;align-items:center';

  if(idx>0){
    var prev=document.createElement('button');
    prev.innerHTML='&#8592;';
    prev.style.cssText='width:40px;height:40px;border-radius:12px;background:var(--glass,rgba(255,255,255,.04));border:1px solid var(--border,#2a2d38);color:var(--text2,#6b7094);font-size:1.1rem;cursor:pointer;display:flex;align-items:center;justify-content:center';
    prev.onclick=function(){showTourStep(idx-1);};
    btns.appendChild(prev);
  }

  var skip=document.createElement('button');
  skip.textContent='Atla';
  skip.style.cssText='padding:8px 12px;background:none;border:none;font-family:inherit;font-size:.75rem;font-weight:600;color:var(--text2,#6b7094);cursor:pointer;margin-left:auto';
  skip.onclick=endTour;
  btns.appendChild(skip);

  var next=document.createElement('button');
  next.textContent=idx===tourSteps.length-1?'Tamamla ✓':'Sonraki →';
  next.style.cssText='flex:1;max-width:180px;padding:11px 16px;background:linear-gradient(135deg,#ff6b3d,#ff8f5a);border:none;border-radius:12px;font-family:inherit;font-size:.82rem;font-weight:800;color:#fff;cursor:pointer';
  next.onclick=function(){idx===tourSteps.length-1?endTour():showTourStep(idx+1);};
  btns.appendChild(next);

  card.appendChild(btns);
  overlay.appendChild(card);

  // Overlay'a tıklayınca sonraki adıma geç (spotlight dışı)
  svg.style.cursor='pointer';
  svg.onclick=function(){idx===tourSteps.length-1?endTour():showTourStep(idx+1);};

  document.body.appendChild(overlay);
}

function removeTourOverlay(){
  var old=document.getElementById('tourOverlay');
  if(old)old.remove();
}

function endTour(){
  removeTourOverlay();
  switchTab('gunluk');
  window.scrollTo(0,0);
  showToast('🎉 Rehber tamamlandı! İyi kullanımlar.');
}

// İlk onboarding sonrası tur teklifi
var _origCompleteOnboarding=completeOnboarding;
completeOnboarding=function(){
  _origCompleteOnboarding();
  setTimeout(function(){
    if(confirm('Uygulamanın özelliklerini tanıtan bir tur ister misin?')){
      startAppTour();
    }
  },1500);
};

// ═══════════════════════════════════════════
//  AI BESLENME ASİSTANI (Floating Bubble)
// ═══════════════════════════════════════════
(function(){
  var bubble=document.createElement('div');
  bubble.id='aiBubble';
  bubble.innerHTML='🤖';
  bubble.style.cssText='position:fixed;bottom:80px;right:14px;width:58px;height:58px;border-radius:50%;'
    +'background:rgba(20,18,35,.85);backdrop-filter:blur(12px);'
    +'display:flex;align-items:center;justify-content:center;'
    +'cursor:pointer;z-index:150;'
    +'box-shadow:0 4px 24px rgba(107,79,207,.35),inset 0 0 0 1.5px rgba(160,124,248,.25);'
    +'transition:transform .2s,box-shadow .2s;touch-action:none;user-select:none;overflow:hidden';
  // Custom AI logo SVG — uygulama logosuna benzer konsept
  bubble.innerHTML='<svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">'
    +'<defs><linearGradient id="aig" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a07cf8"/><stop offset="100%" stop-color="#6b4fcf"/></linearGradient></defs>'
    // Beyin/AI daire
    +'<circle cx="50" cy="45" r="28" fill="none" stroke="url(#aig)" stroke-width="4"/>'
    // Nöron noktaları
    +'<circle cx="40" cy="38" r="4" fill="#a07cf8"/>'
    +'<circle cx="60" cy="38" r="4" fill="#8b6cf0"/>'
    +'<circle cx="50" cy="52" r="4" fill="#6b4fcf"/>'
    // Bağlantı çizgileri
    +'<line x1="40" y1="38" x2="60" y2="38" stroke="#a07cf8" stroke-width="1.5" opacity=".5"/>'
    +'<line x1="40" y1="38" x2="50" y2="52" stroke="#a07cf8" stroke-width="1.5" opacity=".5"/>'
    +'<line x1="60" y1="38" x2="50" y2="52" stroke="#8b6cf0" stroke-width="1.5" opacity=".5"/>'
    // Çatal-kaşık alt kısım (beslenme teması)
    +'<line x1="42" y1="72" x2="42" y2="82" stroke="#a07cf8" stroke-width="2.5" stroke-linecap="round" opacity=".7"/>'
    +'<line x1="50" y1="72" x2="50" y2="82" stroke="#8b6cf0" stroke-width="2.5" stroke-linecap="round" opacity=".7"/>'
    +'<line x1="58" y1="72" x2="58" y2="82" stroke="#6b4fcf" stroke-width="2.5" stroke-linecap="round" opacity=".7"/>'
    +'<path d="M38 68 Q50 64 62 68" fill="none" stroke="url(#aig)" stroke-width="2" stroke-linecap="round"/>'
    +'</svg>';

  var isDragging=false,dragSX=0,dragSY=0,bSX=0,bSY=0,hasMoved=false;
  bubble.addEventListener('touchstart',function(e){isDragging=true;hasMoved=false;var t=e.touches[0];dragSX=t.clientX;dragSY=t.clientY;var r=bubble.getBoundingClientRect();bSX=r.left;bSY=r.top;bubble.style.transition='none';},{passive:true});
  document.addEventListener('touchmove',function(e){if(!isDragging)return;var t=e.touches[0];var dx=t.clientX-dragSX,dy=t.clientY-dragSY;if(Math.abs(dx)>5||Math.abs(dy)>5)hasMoved=true;bubble.style.left=Math.max(0,Math.min(window.innerWidth-56,bSX+dx))+'px';bubble.style.top=Math.max(0,Math.min(window.innerHeight-56,bSY+dy))+'px';bubble.style.right='auto';bubble.style.bottom='auto';},{passive:true});
  document.addEventListener('touchend',function(){if(!isDragging)return;isDragging=false;bubble.style.transition='transform .2s,box-shadow .2s,left .3s,right .3s';var r=bubble.getBoundingClientRect();if(r.left+26>window.innerWidth/2){bubble.style.left='auto';bubble.style.right='14px';}else{bubble.style.right='auto';bubble.style.left='14px';}});
  bubble.addEventListener('click',function(){if(!hasMoved)toggleAIChat();});
  document.body.appendChild(bubble);

  var chatModal=document.createElement('div');
  chatModal.id='aiChatModal';
  chatModal.style.cssText='position:fixed;bottom:0;left:0;right:0;max-width:430px;margin:0 auto;z-index:160;display:none;flex-direction:column;height:70vh;max-height:500px;background:var(--bg,#080a10);border-top-left-radius:24px;border-top-right-radius:24px;border:1px solid var(--border);border-bottom:none;box-shadow:0 -8px 40px rgba(0,0,0,.5);transition:transform .3s ease;transform:translateY(100%)';
  chatModal.innerHTML='<div style="padding:14px 16px 10px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;flex-shrink:0"><div style="width:36px;height:36px;border-radius:50%;background:rgba(20,18,35,.85);display:flex;align-items:center;justify-content:center;box-shadow:inset 0 0 0 1px rgba(160,124,248,.25)"><svg width="22" height="22" viewBox="0 0 100 100" fill="none"><defs><linearGradient id="aig2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a07cf8"/><stop offset="100%" stop-color="#6b4fcf"/></linearGradient></defs><circle cx="50" cy="45" r="28" fill="none" stroke="url(#aig2)" stroke-width="4.5"/><circle cx="40" cy="38" r="4.5" fill="#a07cf8"/><circle cx="60" cy="38" r="4.5" fill="#8b6cf0"/><circle cx="50" cy="52" r="4.5" fill="#6b4fcf"/><line x1="40" y1="38" x2="60" y2="38" stroke="#a07cf8" stroke-width="1.5" opacity=".5"/><line x1="40" y1="38" x2="50" y2="52" stroke="#a07cf8" stroke-width="1.5" opacity=".5"/><line x1="60" y1="38" x2="50" y2="52" stroke="#8b6cf0" stroke-width="1.5" opacity=".5"/><line x1="42" y1="72" x2="42" y2="82" stroke="#a07cf8" stroke-width="2.5" stroke-linecap="round" opacity=".7"/><line x1="50" y1="72" x2="50" y2="82" stroke="#8b6cf0" stroke-width="2.5" stroke-linecap="round" opacity=".7"/><line x1="58" y1="72" x2="58" y2="82" stroke="#6b4fcf" stroke-width="2.5" stroke-linecap="round" opacity=".7"/><path d="M38 68 Q50 64 62 68" fill="none" stroke="url(#aig2)" stroke-width="2" stroke-linecap="round"/></svg></div><div style="flex:1"><div style="font-weight:800;font-size:.88rem">FitSofra AI Asistan</div><div style="font-size:.65rem;color:var(--text2)">Beslenme danışmanın</div></div><button onclick="toggleAIChat()" style="background:var(--glass);border:1px solid var(--border);border-radius:10px;padding:5px 12px;font-size:.75rem;font-weight:700;color:var(--text2);cursor:pointer">✕</button></div>'
    +'<div id="aiChatMessages" style="flex:1;overflow-y:auto;padding:12px 14px;display:flex;flex-direction:column;gap:10px;-webkit-overflow-scrolling:touch"><div style="background:linear-gradient(135deg,rgba(107,79,207,.1),rgba(160,124,248,.05));border:1px solid rgba(107,79,207,.15);border-radius:14px;padding:12px;font-size:.8rem;line-height:1.6;color:var(--text2)">Merhaba! 👋 Ben FitSofra AI asistanıyım. Beslenme hedeflerin, yemek önerileri veya günlük analiz hakkında sorabilirsin.<br><br><span style="font-size:.7rem;opacity:.7">Günlük 5 mesaj hakkın var</span></div></div>'
    +'<div style="padding:10px 14px 14px;border-top:1px solid var(--border);display:flex;gap:8px;flex-shrink:0;padding-bottom:max(14px,env(safe-area-inset-bottom))"><input type="text" id="aiChatInput" placeholder="Bir şey sor..." style="flex:1;padding:10px 14px;border:1.5px solid var(--border);border-radius:12px;background:var(--glass);color:var(--text);font-family:inherit;font-size:.84rem;outline:none"><button onclick="sendAIMessage()" style="background:linear-gradient(135deg,#6b4fcf,#a07cf8);color:#fff;border:none;border-radius:12px;padding:10px 16px;font-size:.85rem;font-weight:700;cursor:pointer">➤</button></div>';
  document.body.appendChild(chatModal);
  setTimeout(function(){var inp=document.getElementById('aiChatInput');if(inp)inp.addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendAIMessage();}});},500);
})();

var aiChatOpen=false;
window._aiHistory=[];
function toggleAIChat(){
  var modal=document.getElementById('aiChatModal');var bubble=document.getElementById('aiBubble');if(!modal)return;
  aiChatOpen=!aiChatOpen;
  if(aiChatOpen){
    modal.style.display='flex';setTimeout(function(){modal.style.transform='translateY(0)';},10);bubble.style.display='none';
    window._aiHistory=[];  // Her sohbet açılışında geçmiş sıfırlanır
    setTimeout(function(){var inp=document.getElementById('aiChatInput');if(inp)inp.focus();},400);
  }
  else{modal.style.transform='translateY(100%)';setTimeout(function(){modal.style.display='none';},300);bubble.style.display='flex';}
}

var aiDailyCount=parseInt(localStorage.getItem('fs_ai_count_'+dateKey(new Date())))||0;
function sendAIMessage(){
  var input=document.getElementById('aiChatInput');var msg=(input.value||'').trim();if(!msg)return;
  if(aiDailyCount>=5){showToast('Günlük 5 mesaj limitine ulaştın!');return;}
  input.value='';var container=document.getElementById('aiChatMessages');
  container.innerHTML+='<div style="align-self:flex-end;background:var(--accent);color:#fff;border-radius:14px 14px 4px 14px;padding:10px 14px;font-size:.82rem;max-width:85%;line-height:1.5">'+escHTML(msg)+'</div>';
  container.innerHTML+='<div id="aiTyping" style="align-self:flex-start;background:var(--glass);border:1px solid var(--border);border-radius:14px 14px 14px 4px;padding:10px 14px;font-size:.78rem;color:var(--text2)"><span class="spinner" style="width:14px;height:14px;border-width:2px;vertical-align:middle"></span> Düşünüyor...</div>';
  container.scrollTop=container.scrollHeight;
  aiDailyCount++;localStorage.setItem('fs_ai_count_'+dateKey(new Date()),aiDailyCount);

  // Sohbet geçmişine kullanıcı mesajını ekle
  if(!window._aiHistory)window._aiHistory=[];
  window._aiHistory.push({role:'user',text:msg});

  // Zengin beslenme bağlamı hazırla
  var t=getTotals();var _tgt=getTodayTargets();var waterMl=typeof getWaterMl==='function'?getWaterMl():0;
  var remaining=_tgt.cal-t.cal;
  var calPct=_tgt.cal?Math.round(t.cal/_tgt.cal*100):0;
  var ctx='=== BUGÜNKÜ BESLENME ===\n';
  ctx+='Kalori: '+t.cal+'/'+_tgt.cal+' kcal ('+calPct+'%, '+remaining+(remaining>=0?' kalan':' fazla')+').\n';
  ctx+='Protein: '+Math.round(t.prot)+'/'+_tgt.prot+'g. Karbonhidrat: '+Math.round(t.carb)+'/'+_tgt.carb+'g. Yağ: '+Math.round(t.fat)+'/'+_tgt.fat+'g.\n';
  ctx+='Su: '+waterMl+'/'+_tgt.water+'ml ('+(_tgt.water?Math.round(waterMl/_tgt.water*100):0)+'%).\n';
  var streakEl=document.getElementById('streakCount');if(streakEl&&streakEl.textContent!=='0')ctx+='Günlük seri: '+streakEl.textContent+' gün.\n';
  // Öğün detayları
  try{
    var dayData=getDayData();var mealNames={kahvalti:'Kahvaltı',ogle:'Öğle',aksam:'Akşam',atistirmalik:'Ara Öğün'};
    var mealLines=[];
    Object.keys(mealNames).forEach(function(k){var foods=dayData[k]||[];if(foods.length){mealLines.push(mealNames[k]+': '+foods.map(function(f){return f.name+' ('+Math.round(f.cal)+' kcal)'}).join(', '));}});
    if(mealLines.length)ctx+='\n=== YEDİKLERİ ===\n'+mealLines.join('\n')+'\n';
  }catch(e){}
  // Profil
  try{
    var raw=localStorage.getItem('fs_profile');if(raw){var p=JSON.parse(raw);if(p.weight&&p.height)ctx+='\n=== PROFİL ===\nYaş: '+(p.age||'?')+', Cinsiyet: '+(p.gender==='male'?'Erkek':'Kadın')+', Kilo: '+p.weight+'kg, Boy: '+p.height+'cm, Hedef: '+(p.goal==='lose'?'Kilo vermek':p.goal==='gain'?'Kilo almak':'Kilo korumak')+'.\n';}
  }catch(e){}

  // Son 6 mesajı geçmiş olarak gönder (mevcut mesaj hariç)
  var historyToSend=window._aiHistory.slice(-7,-1).map(function(h){return{role:h.role,text:h.text};});

  // Gemini Cloud Function (callable)
  var geminiCall=firebase.functions().httpsCallable('geminiChat');
  geminiCall({message:msg,nutritionContext:ctx,history:historyToSend}).then(function(result){
    var typing=document.getElementById('aiTyping');if(typing)typing.remove();
    var data=result.data||{};
    var reply=data.reply||getLocalAIReply(msg);
    if(data.limited)aiDailyCount=APP_CONFIG.limits.aiDailyLimit;
    if(window._aiHistory&&reply)window._aiHistory.push({role:'model',text:reply});
    showAIReply(container,reply);
  }).catch(function(){
    var typing=document.getElementById('aiTyping');if(typing)typing.remove();
    var fallback=getLocalAIReply(msg);
    if(window._aiHistory)window._aiHistory.push({role:'model',text:fallback});
    showAIReply(container,fallback);
  });
}

function showAIReply(container,reply){
  // Markdown bold/italic basit dönüşüm — önce XSS koruması için escape et, sonra markdown uygula
  reply=escHTML(reply);
  reply=reply.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>');
  container.innerHTML+='<div style="align-self:flex-start;background:linear-gradient(135deg,rgba(107,79,207,.08),rgba(160,124,248,.04));border:1px solid rgba(107,79,207,.12);border-radius:14px 14px 14px 4px;padding:10px 14px;font-size:.82rem;max-width:90%;line-height:1.6;color:var(--text)">'+reply+'<div style="font-size:.6rem;color:var(--text2);margin-top:6px;text-align:right">'+(5-aiDailyCount)+' mesaj kaldı</div></div>';
  container.scrollTop=container.scrollHeight;
}

// ══════════════════════════════════════════════════════════════════
//  SESLİ GİRİŞ — DOĞAL DİL AYRIŞTIRMA (NLP)
//  "iki yumurta bir simit" → [{name:"Yumurta",qty:2},{name:"Simit",qty:1}]
// ══════════════════════════════════════════════════════════════════
var _voiceNumbers={'bir':1,'iki':2,'üç':3,'dört':4,'beş':5,'altı':6,'yedi':7,'sekiz':8,'dokuz':9,'on':10,
  'yarım':0.5,'buçuk':1.5,'çeyrek':0.25,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10};

function parseVoiceInput(text){
  if(!text||!FOOD_DB||!FOOD_DB.length)return null;
  var t=text.toLowerCase().replace(/[.,!?]/g,'').trim();
  // "ekle" "koy" gibi fiilleri temizle
  t=t.replace(/\b(ekle|ekleyin|koy|koyun|yedim|yedik|içtim|aldım)\b/g,'').trim();
  // "ve", "ile", "bir de" ile böl
  var parts=t.split(/\s+(?:ve|ile|bir\s+de|ayrıca)\s+/);
  var results=[];
  parts.forEach(function(part){
    part=part.trim();if(!part)return;
    var words=part.split(/\s+/);
    var qty=1;
    // İlk kelime sayı mı?
    if(words.length>1&&_voiceNumbers[words[0]]!==undefined){
      qty=_voiceNumbers[words[0]];words.shift();
    }
    // Gram belirtimi: "yüz gram tavuk" veya "150 gram"
    var gramMatch=part.match(/(\d+)\s*(?:gram|gr|g)\b/i);
    var portionG=gramMatch?parseInt(gramMatch[1]):null;
    if(gramMatch){words=part.replace(gramMatch[0],'').trim().split(/\s+/).filter(Boolean);}
    var searchTerm=words.join(' ').trim();
    if(!searchTerm)return;
    // FOOD_DB'de ara
    var match=FOOD_DB.find(function(f){return f.name.toLowerCase().includes(searchTerm)});
    if(!match){
      // Kısmi arama
      var searchWords=searchTerm.split(/\s+/);
      match=FOOD_DB.find(function(f){var fn=f.name.toLowerCase();return searchWords.every(function(w){return fn.includes(w)})});
    }
    if(match)results.push({name:match.name,food:match,qty:qty,portionG:portionG});
  });
  return results.length?results:null;
}

function _addParsedVoiceFood(parsed){
  if(!parsed||!parsed.food||!currentMealId)return;
  var f=parsed.food;
  var portion=parsed.portionG||100;
  var mult=(portion/100)*parsed.qty;
  var entry={name:f.name,emoji:f.emoji||'🍽️',cal:Math.round(f.cal*mult),prot:Math.round(f.prot*mult*10)/10,carb:Math.round(f.carb*mult*10)/10,fat:Math.round(f.fat*mult*10)/10,portionUsed:portion*parsed.qty};
  var data=getDayData();
  if(!data[currentMealId])data[currentMealId]=[];
  data[currentMealId].push(entry);
  setDayData(data);
  trackFoodFreq(f,portion*parsed.qty);
  trackFoodRecent(f,portion*parsed.qty);
  renderMeals();updateHeader();
}

// ══════════════════════════════════════════════════════════════════
//  YEMEK ZAMANLAMA ANALİZİ
//  Öğünler arası süre, en verimli yeme saatleri
// ══════════════════════════════════════════════════════════════════
function getMealTimingAnalysis(){
  var data=getDayData();var timings=[];
  var mealOrder=['kahvalti','ogle','aksam','atistirmalik'];
  var mealNames={kahvalti:'Kahvaltı',ogle:'Öğle',aksam:'Akşam',atistirmalik:'Atıştırmalık'};
  var idealTimes={kahvalti:{min:7,max:9},ogle:{min:12,max:14},aksam:{min:18,max:20}};
  var insights=[];
  var mealCals={};
  mealOrder.forEach(function(m){
    var foods=data[m]||[];
    if(foods.length){
      var totalCal=foods.reduce(function(s,f){return s+f.cal},0);
      mealCals[m]=totalCal;
    }
  });
  var totalCal=Object.values(mealCals).reduce(function(s,c){return s+c},0);
  // Kalori dağılımı analizi
  if(totalCal>0){
    if(mealCals.kahvalti){
      var bPct=Math.round((mealCals.kahvalti/totalCal)*100);
      if(bPct<20)insights.push({icon:'🌅',text:'Kahvaltın günlük kalorinizin %'+bPct+'\'i. İdeal: %25-30. Sabahları daha dolu bir kahvaltı metabolizmayı hızlandırır.',type:'warn'});
      else if(bPct>=25&&bPct<=35)insights.push({icon:'✅',text:'Kahvaltı oranınız mükemmel (%'+bPct+'). Güne enerjik başlıyorsunuz!',type:'good'});
    }
    if(mealCals.aksam){
      var dPct=Math.round((mealCals.aksam/totalCal)*100);
      if(dPct>40)insights.push({icon:'🌙',text:'Akşam yemeği günlük kalorinizin %'+dPct+'\'i. Akşam ağır yemekler uyku kalitesini düşürebilir.',type:'warn'});
    }
    if(!mealCals.ogle&&(mealCals.kahvalti||mealCals.aksam)){
      insights.push({icon:'☀️',text:'Öğle yemeği atlama algılandı. Öğün atlamak metabolizmayı yavaşlatır ve akşam aşırı yemeye yol açabilir.',type:'warn'});
    }
    if(mealCals.atistirmalik){
      var sPct=Math.round((mealCals.atistirmalik/totalCal)*100);
      if(sPct>25)insights.push({icon:'🍿',text:'Atıştırmalıklar %'+sPct+' ile yüksek. Ana öğünleri artırarak atıştırma ihtiyacını azaltabilirsin.',type:'warn'});
    }
    // Protein dağılımı
    var mealProts={};mealOrder.forEach(function(m){var foods=data[m]||[];mealProts[m]=foods.reduce(function(s,f){return s+(f.prot||0)},0)});
    var maxProtMeal=Object.keys(mealProts).reduce(function(a,b){return mealProts[a]>mealProts[b]?a:b});
    var totalProt=Object.values(mealProts).reduce(function(s,p){return s+p},0);
    if(totalProt>0&&mealProts[maxProtMeal]/totalProt>0.6){
      insights.push({icon:'💪',text:'Proteinin %'+Math.round(mealProts[maxProtMeal]/totalProt*100)+'\'i '+mealNames[maxProtMeal]+'\'da. Proteini öğünlere eşit dağıtmak kas sentezini artırır.',type:'info'});
    }
  }
  if(!insights.length)insights.push({icon:'📊',text:'Yemek eklendikçe zamanlama önerileri burada görünecek.',type:'info'});
  return insights;
}

// ══════════════════════════════════════════════════════════════════
//  TOPLULUK CHALLENGE SİSTEMİ
// ══════════════════════════════════════════════════════════════════
var CHALLENGES=[
  {id:'water7',name:'💧 7 Gün Su Challenge',desc:'7 gün üst üste su hedefini tamamla',duration:7,type:'water',target:1,unit:'gün',badge:'💧',reward:'Su Ustası'},
  {id:'protein5',name:'💪 Protein Haftası',desc:'5 gün protein hedefinin %90\'ını yakala',duration:5,type:'protein',target:0.9,unit:'gün',badge:'💪',reward:'Protein Kralı'},
  {id:'nosnack3',name:'🚫 3 Gün Atıştırmasız',desc:'3 gün atıştırmalık 200 kcal altında tut',duration:3,type:'nosnack',target:200,unit:'gün',badge:'🎯',reward:'İrade Gücü'},
  {id:'veggie7',name:'🥬 Sebze Haftası',desc:'7 gün en az 2 sebze yemeği ye',duration:7,type:'veggie',target:2,unit:'gün',badge:'🥬',reward:'Yeşil Savaşçı'},
  {id:'cal14',name:'🔥 2 Hafta Hedefte',desc:'14 gün kalori hedefinin ±%10 içinde kal',duration:14,type:'calorie',target:0.1,unit:'gün',badge:'🔥',reward:'Tutarlılık Şampiyonu'},
  {id:'meal21',name:'📝 21 Gün Takip',desc:'21 gün boyunca en az 3 öğün kayıt et',duration:21,type:'logging',target:3,unit:'gün',badge:'📝',reward:'Takip Ustası'},
  {id:'breakfast7',name:'🌅 Kahvaltı Alışkanlığı',desc:'7 gün üst üste kahvaltı yap',duration:7,type:'breakfast',target:1,unit:'gün',badge:'🌅',reward:'Erken Kalkan'},
  {id:'walk5',name:'🚶 5 Gün Egzersiz',desc:'5 gün egzersiz kaydet',duration:5,type:'exercise',target:1,unit:'gün',badge:'🏆',reward:'Aktif Yaşam'}
];

function getActiveChallenges(){return JSON.parse(localStorage.getItem('fs_active_challenges')||'[]')}
function getChallengeProgress(cId){return JSON.parse(localStorage.getItem('fs_challenge_'+cId)||'{"days":0,"startDate":""}');}

function joinChallenge(cId){
  var active=getActiveChallenges();
  if(active.indexOf(cId)>=0){showToast('Zaten bu challenge\'a katıldın!');return}
  active.push(cId);
  localStorage.setItem('fs_active_challenges',JSON.stringify(active));
  localStorage.setItem('fs_challenge_'+cId,JSON.stringify({days:0,startDate:dateKey(),lastCheck:''}));
  showToast('🎯 Challenge\'a katıldın!');
  if(typeof renderChallenges==='function')renderChallenges();
}

function renderChallenges(){
  var cc=document.getElementById('challengesContainer');
  if(cc&&typeof renderChallengesHTML==='function')cc.innerHTML=renderChallengesHTML();
}

function checkChallengeProgress(){
  var active=getActiveChallenges();var today=dateKey();
  active.forEach(function(cId){
    var ch=CHALLENGES.find(function(c){return c.id===cId});if(!ch)return;
    var prog=getChallengeProgress(cId);
    if(prog.lastCheck===today)return; // bugün zaten kontrol edildi
    var success=false;
    var data=getDayData();
    switch(ch.type){
      case 'water':success=getWaterMl()>=(getTodayTargets().water||2000);break;
      case 'protein':var t=getTotals();success=t.prot>=(getTodayTargets().prot*ch.target);break;
      case 'nosnack':var sn=data.atistirmalik||[];success=sn.reduce(function(s,f){return s+f.cal},0)<ch.target;break;
      case 'veggie':var veg=(data.ogle||[]).concat(data.aksam||[]).filter(function(f){return f.name&&FOOD_DB.find(function(d){return d.name===f.name&&d.cat==='sebze'})});success=veg.length>=ch.target;break;
      case 'calorie':var tot=getTotals();var tgt=getTodayTargets();success=Math.abs(tot.cal-tgt.cal)/tgt.cal<=ch.target;break;
      case 'logging':var meals=['kahvalti','ogle','aksam','atistirmalik'];var logged=meals.filter(function(m){return(data[m]||[]).length>0}).length;success=logged>=ch.target;break;
      case 'breakfast':success=(data.kahvalti||[]).length>0;break;
      case 'exercise':var ex=JSON.parse(localStorage.getItem('fs_exercise_'+today)||'[]');success=ex.length>0;break;
    }
    if(success){prog.days++;prog.lastCheck=today;localStorage.setItem('fs_challenge_'+cId,JSON.stringify(prog));
      if(prog.days>=ch.duration){
        // Challenge tamamlandı!
        showToast(ch.badge+' Challenge tamamlandı: '+ch.reward+'!');
        var badges=JSON.parse(localStorage.getItem('fs_badges')||'[]');
        if(badges.indexOf(ch.reward)<0){badges.push(ch.reward);localStorage.setItem('fs_badges',JSON.stringify(badges))}
        active=active.filter(function(x){return x!==cId});
        localStorage.setItem('fs_active_challenges',JSON.stringify(active));
        var completed=JSON.parse(localStorage.getItem('fs_completed_challenges')||'[]');
        completed.push({id:cId,date:today});localStorage.setItem('fs_completed_challenges',JSON.stringify(completed));
      }
    }
  });
}

function renderChallengesHTML(){
  var active=getActiveChallenges();var completed=JSON.parse(localStorage.getItem('fs_completed_challenges')||'[]');
  var completedIds=completed.map(function(c){return c.id});
  var h='<div style="display:flex;flex-direction:column;gap:8px">';
  CHALLENGES.forEach(function(ch){
    var isActive=active.indexOf(ch.id)>=0;
    var isDone=completedIds.indexOf(ch.id)>=0;
    var prog=getChallengeProgress(ch.id);
    var pct=isDone?100:isActive?Math.round((prog.days/ch.duration)*100):0;
    h+='<div style="background:var(--glass);border:1px solid '+(isDone?'var(--green)':isActive?'var(--accent)':'var(--border)')+';border-radius:12px;padding:12px">';
    h+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><span style="font-size:1.2rem">'+ch.badge+'</span><div style="flex:1"><div style="font-size:.82rem;font-weight:700">'+ch.name+(isDone?' ✅':'')+'</div><div style="font-size:.68rem;color:var(--text2)">'+ch.desc+'</div></div>';
    if(!isActive&&!isDone)h+='<button onclick="joinChallenge(\''+ch.id+'\')" style="padding:6px 12px;background:var(--accent);color:#fff;border:none;border-radius:8px;font-size:.7rem;font-weight:700;cursor:pointer;font-family:var(--font,system-ui)">Katıl</button>';
    h+='</div>';
    if(isActive||isDone){
      h+='<div style="background:rgba(255,255,255,.05);border-radius:6px;height:8px;overflow:hidden"><div style="height:100%;width:'+pct+'%;background:'+(isDone?'var(--green)':'var(--accent)')+';border-radius:6px;transition:width .5s"></div></div>';
      h+='<div style="font-size:.65rem;color:var(--text2);margin-top:4px;text-align:right">'+(isDone?'Tamamlandı!':prog.days+'/'+ch.duration+' gün ('+pct+'%)')+'</div>';
    }
    h+='</div>';
  });
  return h+'</div>';
}

// ══════════════════════════════════════════════════════════════════
//  DİYET PRESETLERİ — HAZIR DİYET PLANLARI
// ══════════════════════════════════════════════════════════════════
var DIET_PRESETS=[
  {id:'balanced',name:'⚖️ Dengeli Beslenme',desc:'Standart makro oranları',macros:{prot:25,carb:50,fat:25},calAdj:0},
  {id:'lowcarb',name:'🥩 Düşük Karbonhidrat',desc:'Karbı azalt, protein ve yağı artır',macros:{prot:35,carb:25,fat:40},calAdj:0},
  {id:'keto',name:'🥑 Ketojenik',desc:'Çok düşük karb, yüksek yağ',macros:{prot:25,carb:5,fat:70},calAdj:0},
  {id:'highprot',name:'💪 Yüksek Protein',desc:'Kas yapımı için protein odaklı',macros:{prot:40,carb:35,fat:25},calAdj:200},
  {id:'mediterranean',name:'🫒 Akdeniz Diyeti',desc:'Zeytinyağı, sebze, balık ağırlıklı',macros:{prot:20,carb:45,fat:35},calAdj:0},
  {id:'volumetric',name:'🥗 Hacim Diyeti',desc:'Düşük yoğunluklu, doyurucu yiyecekler',macros:{prot:25,carb:55,fat:20},calAdj:-300},
  {id:'intermittent',name:'⏰ Aralıklı Oruç (16:8)',desc:'8 saatlik yeme penceresi',macros:{prot:30,carb:40,fat:30},calAdj:-200,ifProtocol:'16:8'},
  {id:'bulking',name:'🏋️ Bulk (Kilo Alma)',desc:'Kalori fazlası ile kas kütlesi artışı',macros:{prot:30,carb:45,fat:25},calAdj:500},
  {id:'cutting',name:'✂️ Cut (Yağ Yakma)',desc:'Kontrollü kalori açığı, yüksek protein',macros:{prot:40,carb:30,fat:30},calAdj:-500},
  {id:'vegan',name:'🌱 Vegan',desc:'Bitkisel kaynaklı beslenme',macros:{prot:20,carb:55,fat:25},calAdj:0}
];

function applyDietPreset(presetId){
  var preset=DIET_PRESETS.find(function(p){return p.id===presetId});
  if(!preset){showToast('Preset bulunamadı');return}
  var profile=JSON.parse(localStorage.getItem('fs_profile')||'{}');
  var baseCal=parseInt(profile.calTarget)||2000;
  var newCal=baseCal+preset.calAdj;
  // Makroları gram olarak hesapla
  var protG=Math.round((newCal*preset.macros.prot/100)/4);
  var carbG=Math.round((newCal*preset.macros.carb/100)/4);
  var fatG=Math.round((newCal*preset.macros.fat/100)/9);
  // Hedefleri güncelle
  profile.calTarget=newCal;
  profile.protTarget=protG;
  profile.carbTarget=carbG;
  profile.fatTarget=fatG;
  profile.dietPreset=presetId;
  localStorage.setItem('fs_profile',JSON.stringify(profile));
  // Global değişkenleri güncelle
  if(typeof dailyTarget!=='undefined')dailyTarget=newCal;
  if(typeof protTarget!=='undefined')protTarget=protG;
  if(typeof carbTarget!=='undefined')carbTarget=carbG;
  if(typeof fatTarget!=='undefined')fatTarget=fatG;
  // IF protokolü varsa uygula
  if(preset.ifProtocol){
    var ifData={protocol:preset.ifProtocol,eatStart:'12:00',eatEnd:'20:00',days:[1,2,3,4,5,6,0]};
    localStorage.setItem('fs_if',JSON.stringify(ifData));
  }
  if(typeof renderMeals==='function')renderMeals();
  if(typeof updateHeader==='function')updateHeader();
  // Goals modal inputlarını güncelle
  var gci=document.getElementById('goalCalInput');if(gci)gci.value=newCal;
  var gpi=document.getElementById('gram-prot');if(gpi)gpi.value=protG;
  var gki=document.getElementById('gram-carb');if(gki)gki.value=carbG;
  var gfi=document.getElementById('gram-fat');if(gfi)gfi.value=fatG;
  if(typeof onGramChange==='function')onGramChange();
  // Preset panelini yenile
  var dpg=document.getElementById('dietPresetGoalPanel');
  if(dpg)dpg.innerHTML=renderDietPresetsHTML();
  var dpc=document.getElementById('dietPresetsContainer');
  if(dpc)dpc.innerHTML=renderDietPresetsHTML();
  showToast('✅ '+preset.name+' uygulandı! ('+newCal+' kcal)');
}

function renderDietPresetsHTML(){
  var profile=JSON.parse(localStorage.getItem('fs_profile')||'{}');
  var activePreset=profile.dietPreset||'';
  var h='<div style="display:flex;flex-direction:column;gap:8px">';
  DIET_PRESETS.forEach(function(p){
    var isActive=p.id===activePreset;
    var cal=(parseInt(profile.calTarget)||2000)+p.calAdj;
    h+='<div style="background:var(--glass);border:1.5px solid '+(isActive?'var(--accent)':'var(--border)')+';border-radius:12px;padding:12px;cursor:pointer;transition:all .2s" onclick="applyDietPreset(\''+p.id+'\')">';
    h+='<div style="display:flex;align-items:center;gap:8px"><div style="flex:1"><div style="font-size:.84rem;font-weight:700">'+p.name+(isActive?' ✅':'')+'</div><div style="font-size:.68rem;color:var(--text2);margin-top:2px">'+p.desc+'</div></div></div>';
    h+='<div style="display:flex;gap:6px;margin-top:8px;font-size:.65rem;font-weight:700">';
    h+='<span style="padding:3px 8px;border-radius:6px;background:rgba(255,122,122,.1);color:#ff7a7a">P '+p.macros.prot+'%</span>';
    h+='<span style="padding:3px 8px;border-radius:6px;background:rgba(34,211,238,.1);color:#22d3ee">K '+p.macros.carb+'%</span>';
    h+='<span style="padding:3px 8px;border-radius:6px;background:rgba(255,204,85,.1);color:#ffcc55">Y '+p.macros.fat+'%</span>';
    h+='<span style="padding:3px 8px;border-radius:6px;background:var(--bg);color:var(--text2)">~'+cal+' kcal</span>';
    h+='</div></div>';
  });
  return h+'</div>';
}

function getLocalAIReply(msg){
  var m=msg.toLowerCase();var t=getTotals();var _tgt=getTodayTargets();var remaining=_tgt.cal-t.cal;var waterMl=getWaterMl();
  if(m.includes('ne yesem')||m.includes('ne yemeliyim')||m.includes('öner')){
    if(remaining>600)return 'Bugün '+remaining+' kcal kalmış. Izgara tavuk göğsü (200g, ~330 kcal) + bulgur pilavı (150g, ~180 kcal) + mevsim salatası önerebilirim. Protein ihtiyacını da karşılarsın! 💪';
    if(remaining>300)return remaining+' kcal için mercimek çorbası (~180 kcal) + tam buğday ekmeği (~80 kcal) mükemmel olur. Doyurucu ve besleyici! 🥗';
    if(remaining>0)return 'Sadece '+remaining+' kcal kalmış. Bir avuç badem (~160 kcal) veya yoğurt (~100 kcal) ile tamamla. 🎯';
    return 'Kalori hedefini tamamladın! '+Math.abs(remaining)+' kcal fazla. Yarın biraz dikkat et ama stres yapma! 😊';
  }
  if(m.includes('su')||m.includes('water')){var wp=_tgt.water?Math.round((waterMl/_tgt.water)*100):0;if(wp>=100)return 'Su hedefini tamamladın — '+waterMl+'ml! 💧🏆';return waterMl+'ml içmişsin, hedef '+_tgt.water+'ml ('+wp+'%). '+(Math.round((_tgt.water-waterMl)/250))+' bardak daha! 💧';}
  if(m.includes('protein')){var pp=_tgt.prot?Math.round((t.prot/_tgt.prot)*100):0;return Math.round(t.prot)+'g protein almışsın (hedef '+_tgt.prot+'g, '+pp+'%). '+(pp>=100?'Harika! 💪':'Tavuk, yumurta, yoğurt veya mercimek ile artır!');}
  if(m.includes('analiz')||m.includes('değerlendir')||m.includes('bugün')){var cp=_tgt.cal?Math.round((t.cal/_tgt.cal)*100):0;return 'Bugün: '+t.cal+'/'+_tgt.cal+' kcal ('+cp+'%). P:'+Math.round(t.prot)+'g K:'+Math.round(t.carb)+'g Y:'+Math.round(t.fat)+'g. Su:'+waterMl+'ml. '+(cp>110?'Kalori yüksek!':cp>85?'İyi gidiyorsun!':'Biraz daha yemek ekle.');}
  if(m.includes('kilo')||m.includes('zayıfla')||m.includes('diyet'))return 'Kilo kontrolü = tutarlılık! Kalori takibi, yüksek protein, bol su, haftada 3+ egzersiz. FitSofra ile takibe devam! 📊';
  if(m.includes('merhaba')||m.includes('selam')||m.includes('nasıl'))return 'Merhaba! 😊 "Ne yesem", "analiz", "protein durumum", "su içtim mi" gibi sorular sorabilirsin!';
  return 'Bugün '+t.cal+' kcal (hedef: '+_tgt.cal+'). "Ne yesem", "analiz", "protein" gibi sorular sorabilirsin! 🍽️';
}
