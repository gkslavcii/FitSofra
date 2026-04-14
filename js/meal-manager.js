// FitSofra — Meal Copy, Recipes & Category Manager Module
// Extracted from index.html for modularity

// ══════════════════════════════════════════════════════
//  ÖĞÜN KOPYALAMA
// ══════════════════════════════════════════════════════
var _copyTargetMealId=null;
var _copySourceMealId=null;
var _copySource='yesterday'; // 'yesterday' | 'today' | 'date'
var _copyMode='add'; // 'add' | 'replace'

function openCopyMealModal(mealId){
  _copyTargetMealId=mealId;
  _copySource='yesterday';
  _copyMode='add';
  var meal=MEAL_DEFS.find(function(m){return m.id===mealId;});
  var el=document.getElementById('copyMealTitle');
  if(el) el.textContent='📋 '+meal.name+' — Kopyala';
  // Default tarih = dün
  var yesterday=new Date(currentDate);
  yesterday.setDate(yesterday.getDate()-1);
  var di=document.getElementById('copyDateInput');
  if(di) di.value=dateKey(yesterday);
  setCopySource('yesterday');
  setCopyMode('add');
  var modal=document.getElementById('copyMealModal');
  if(modal){modal.style.cssText='';modal.classList.add('show');}
}

function closeCopyMealModal(){
  var modal=document.getElementById('copyMealModal');
  if(modal){modal.style.cssText='';modal.classList.remove('show');}
}

function setCopySource(src){
  _copySource=src;
  ['yesterday','today','date'].forEach(function(s){
    var btn=document.getElementById('copy-src-'+s);
    if(!btn)return;
    var active=s===src;
    btn.style.borderColor=active?'var(--accent)':'var(--border)';
    btn.style.background=active?'var(--accent-glow)':'var(--glass)';
    btn.style.color=active?'var(--accent)':'var(--text2)';
  });
  var dp=document.getElementById('copy-date-picker');
  if(dp) dp.style.display=src==='date'?'block':'none';
  loadCopySourceMeals();
}

function setCopyMode(mode){
  _copyMode=mode;
  ['add','replace'].forEach(function(m){
    var btn=document.getElementById('copy-mode-'+m);
    if(!btn)return;
    var active=m===mode;
    if(m==='add'){
      btn.style.borderColor=active?'var(--green)':'var(--border)';
      btn.style.background=active?'rgba(61,214,140,.1)':'var(--glass)';
      btn.style.color=active?'var(--green)':'var(--text2)';
    } else {
      btn.style.borderColor=active?'var(--orange)':'var(--border)';
      btn.style.background=active?'rgba(240,160,48,.1)':'var(--glass)';
      btn.style.color=active?'var(--orange)':'var(--text2)';
    }
  });
}

function getCopyDate(){
  if(_copySource==='yesterday'){
    var d=new Date(currentDate); d.setDate(d.getDate()-1); return dateKey(d);
  }
  if(_copySource==='today') return dateKey(currentDate);
  var di=document.getElementById('copyDateInput');
  return di?di.value:'';
}

function loadCopySourceMeals(){
  var dk=getCopyDate();
  var list=document.getElementById('copyMealSourceList');
  if(!list)return;
  var raw=localStorage.getItem('fs_day_'+dk);
  var dayData=raw?JSON.parse(raw):{};
  list.innerHTML='';
  var hasMeals=false;
  MEAL_DEFS.forEach(function(meal){
    var foods=dayData[meal.id]||[];
    if(!foods.length)return;
    hasMeals=true;
    var cal=Math.round(foods.reduce(function(s,f){return s+f.cal;},0));
    var isSelected=meal.id===_copySourceMealId;
    var item=document.createElement('div');
    item.style.cssText='display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;cursor:pointer;border:1.5px solid '+(isSelected?'var(--blue)':'var(--border)')+';background:'+(isSelected?'rgba(91,156,246,.08)':'var(--glass)')+';transition:all .15s';
    item.innerHTML='<div style="font-size:1.1rem">'+meal.icon+'</div>'
      +'<div style="flex:1"><div style="font-weight:700;font-size:.84rem">'+meal.name+'</div>'
      +'<div style="font-size:.68rem;color:var(--text2)">'+foods.length+' yiyecek · '+cal+' kcal</div></div>'
      +(isSelected?'<div style="color:var(--blue);font-size:.8rem;font-weight:700">✓</div>':'');
    item.onclick=function(){
      _copySourceMealId=meal.id;
      loadCopySourceMeals();
    };
    list.appendChild(item);
  });
  if(!hasMeals){
    list.innerHTML='<div style="text-align:center;padding:16px;color:var(--text2);font-size:.8rem">Bu günde kayıtlı öğün yok</div>';
    _copySourceMealId=null;
  } else if(!_copySourceMealId){
    // İlk öğünü otomatik seç
    var firstMeal=MEAL_DEFS.find(function(meal){return (dayData[meal.id]||[]).length>0;});
    if(firstMeal){_copySourceMealId=firstMeal.id;loadCopySourceMeals();}
  }
}

function executeCopyMeal(){
  if(!_copyTargetMealId||!_copySourceMealId){
    showToast('⚠️ Kaynak öğünü seçin');return;
  }
  var dk=getCopyDate();
  var raw=localStorage.getItem('fs_day_'+dk);
  if(!raw){showToast('⚠️ Bu günde veri yok');return;}
  var srcData=JSON.parse(raw);
  var srcFoods=srcData[_copySourceMealId]||[];
  if(!srcFoods.length){showToast('⚠️ Kaynak öğün boş');return;}
  var todayData=getDayData();
  if(_copyMode==='replace'){
    todayData[_copyTargetMealId]=JSON.parse(JSON.stringify(srcFoods));
  } else {
    if(!todayData[_copyTargetMealId]) todayData[_copyTargetMealId]=[];
    srcFoods.forEach(function(f){todayData[_copyTargetMealId].push(JSON.parse(JSON.stringify(f)));});
  }
  saveDayData(null,todayData);
  closeCopyMealModal();
  renderMeals();
  updateHeader();
  var meal=MEAL_DEFS.find(function(m){return m.id===_copyTargetMealId;});
  showToast('📋 '+meal.name+' kopyalandı! ('+srcFoods.length+' yiyecek)');
  // Hedef öğünü aç
  var section=document.getElementById('ms-'+_copyTargetMealId);
  if(section){section.dataset.collapsed='0';sessionStorage.setItem('fs_meal_open_'+_copyTargetMealId,'1');}
}

function openMealTemplates(mealId){
  const meal=MEAL_DEFS.find(m=>m.id===mealId);
  document.getElementById('tplModalTitle').textContent=`📋 ${meal.icon} ${meal.name} Şablonları`;

  const tpls=getMealTemplates().filter(t=>t.mealId===mealId);
  const data=getDayData();
  const hasFoods=(data[mealId]||[]).length>0;
  const list=document.getElementById('tplList');

  let html='';


  if(hasFoods){
    const foods=data[mealId];
    const totalCal=Math.round(foods.reduce((s,f)=>s+f.cal,0));
    const preview=foods.slice(0,3).map(f=>f.name).join(', ')+(foods.length>3?' ...':'');
    html+=`<div style="padding:12px;background:rgba(91,156,246,.06);border:1.5px solid rgba(91,156,246,.25);border-radius:var(--radius-sm);margin-bottom:14px">
      <div style="font-size:.76rem;font-weight:600;margin-bottom:6px">💾 Bu öğünü kaydet</div>
      <div style="font-size:.72rem;color:var(--text2);margin-bottom:8px">${preview} · ${totalCal} kcal</div>
      <div style="display:flex;gap:6px">
        <input type="text" id="tpl-save-name-${mealId}" placeholder="Şablon adı..." value="${foods.slice(0,2).map(f=>f.name).join(', ')}"
          style="flex:1;font-family:var(--font,system-ui);font-size:.8rem;padding:8px 10px;border:1.5px solid var(--border);border-radius:9px;background:var(--glass);color:var(--text);outline:none">
        <button onclick="doSaveMealTemplateInline('${mealId}')"
          style="padding:8px 14px;background:var(--blue);color:#fff;border:none;border-radius:9px;font-family:var(--font,system-ui);font-weight:700;font-size:.8rem;cursor:pointer;white-space:nowrap">Kaydet</button>
      </div>
    </div>`;
  }

  if(!tpls.length&&!hasFoods){
    html+=`<div class="no-saved">Bu öğün için kayıtlı şablon yok.<br><br>Önce öğüne yemek ekle, sonra buradan kaydet.</div>`;
  }else if(!tpls.length){
    html+=`<div class="no-saved">Henüz kayıtlı şablon yok.<br>Yukarıdaki butonla mevcut öğünü kaydedebilirsin.</div>`;
  }else{
    html+=tpls.map(t=>{
      const foodNames=t.foods.slice(0,4).map(f=>f.name).join(', ')+(t.foods.length>4?' +'+(t.foods.length-4)+' daha':'');
      return`<div class="saved-meal">
        <div class="saved-meal-header">
          <div class="saved-meal-name">${t.name}</div>
          <div class="saved-meal-meta">${t.foods.length} yemek</div>
        </div>
        <div class="saved-meal-macros">
          <span>🔥 ${t.totals.cal} kcal</span>
          <span>P:${t.totals.prot}g</span>
          <span>K:${t.totals.carb}g</span>
          <span>Y:${t.totals.fat}g</span>
        </div>
        <div class="saved-meal-foods">${foodNames}</div>
        <div class="saved-meal-actions">
          <button class="saved-meal-btn load" onclick="loadMealTemplate(${t.id},'${mealId}')">📥 Uygula</button>
          <button class="saved-meal-btn delete" onclick="deleteMealTemplate(${t.id},'${mealId}')">🗑️</button>
        </div>
      </div>`;
    }).join('');
  }

  list.innerHTML=html;
  document.getElementById('tplModal').classList.add('show');
}

function closeTplModal(){document.getElementById('tplModal').classList.remove('show')}

function doSaveMealTemplate(mealId){
  // Eski prompt tabanlı — artık inline kullanılıyor
  doSaveMealTemplateInline(mealId);
}

function doSaveMealTemplateInline(mealId){
  const data=getDayData();
  const foods=data[mealId]||[];
  if(!foods.length)return;
  const inp=document.getElementById('tpl-save-name-'+mealId);
  const name=(inp?inp.value.trim():'')|| foods.slice(0,2).map(f=>f.name).join(', ');
  if(!name){showToast('⚠️ Şablon adı girin');return;}
  let totalCal=0,totalProt=0,totalCarb=0,totalFat=0;
  foods.forEach(f=>{totalCal+=f.cal;totalProt+=f.prot;totalCarb+=f.carb;totalFat+=f.fat});
  const tpls=getMealTemplates();
  tpls.unshift({
    id:Date.now(),
    mealId,
    name,
    foods:JSON.parse(JSON.stringify(foods)),
    totals:{cal:Math.round(totalCal),prot:Math.round(totalProt),carb:Math.round(totalCarb),fat:Math.round(totalFat)}
  });
  setMealTemplates(tpls);
  closeTplModal();
  showToast('💾 "'+name+'" kaydedildi!');
}

function loadMealTemplate(tplId,mealId){
  const tpls=getMealTemplates();
  const tpl=tpls.find(t=>t.id===tplId);
  if(!tpl)return;

  const data=getDayData();
  const existing=data[mealId]||[];

  if(existing.length){
    const choice=confirm('"'+tpl.name+'" şablonu uygulanacak.\n\nOK → Mevcut öğünün üzerine ekle\nİptal → Mevcut öğünü temizleyip uygula');
    if(choice===false){
      // İptal = temizle + uygula
      data[mealId]=[];
    }
    // OK = üstüne ekle, devam
  }

  tpl.foods.forEach(f=>data[mealId].push(JSON.parse(JSON.stringify(f))));
  saveDayData(null,data);
  closeTplModal();
  renderMeals();
  updateHeader();
  showToast(`📥 "${tpl.name}" uygulandı!`);
}

function deleteMealTemplate(tplId,mealId){
  if(!confirm('Bu şablonu silmek istediğinize emin misiniz?'))return;
  const tpls=getMealTemplates().filter(t=>t.id!==tplId);
  setMealTemplates(tpls);
  openMealTemplates(mealId);
  showToast('🗑️ Şablon silindi');
}
function getWeightLog(){const raw=localStorage.getItem('fs_weight_log');return raw?JSON.parse(raw):[]}
function setWeightLog(log){localStorage.setItem('fs_weight_log',JSON.stringify(log))}

function addWeightEntry(){
  const input=document.getElementById('weightInput');
  const val=parseFloat(input.value);
  if(!val||val<20||val>400){showToast('⚠️ Geçerli bir kilo girin');return}

  const log=getWeightLog();
  const today=dateKey(new Date());


  const existingIdx=log.findIndex(e=>e.date===today);
  if(existingIdx>=0){
    log[existingIdx].weight=val;
  }else{
    log.push({date:today,weight:val,time:Date.now()});
  }


  log.sort((a,b)=>a.date.localeCompare(b.date));
  setWeightLog(log);


  document.getElementById('pWeight').value=val;
  saveProfile();

  input.value='';
  renderWeightCard();
  showToast(`⚖️ ${val} kg kaydedildi!`);
}

function toggleWeightHistoryEdit(){
  const panel=document.getElementById('weightHistoryAddPanel');
  const btn=document.getElementById('weightEditToggleBtn');
  const list=document.getElementById('weightHistoryList');
  if(!panel)return;
  const isOpen=panel.style.display!=='none';
  panel.style.display=isOpen?'none':'block';
  if(btn)btn.textContent=isOpen?'✏️ Düzenle':'✕ Kapat';
  // Satırlardaki edit panellerini toggle
  document.querySelectorAll('[id^="wh-edit-"]').forEach(el=>{
    el.style.display=isOpen?'none':'flex';
  });
  document.querySelectorAll('[id^="wh-val-"]').forEach(el=>{
    el.style.display=isOpen?'':'none';
  });
}

function addWeightHistoryEntry(){
  const dateEl=document.getElementById('weightHistDate');
  const valEl=document.getElementById('weightHistVal');
  if(!dateEl||!valEl)return;
  const date=dateEl.value;
  const val=parseFloat(valEl.value);
  if(!date){showToast('⚠️ Tarih seçin');return;}
  if(!val||val<20||val>400){showToast('⚠️ Geçerli bir kilo girin');return;}
  const log=getWeightLog();
  const existing=log.findIndex(e=>e.date===date);
  if(existing>=0){
    if(!confirm(`${date} için zaten ${log[existing].weight}kg kaydı var. Üzerine yazılsın mı?`))return;
    log[existing].weight=val;
    log[existing].time=Date.now();
  } else {
    log.push({date,weight:val,time:Date.now()});
  }
  log.sort((a,b)=>a.date.localeCompare(b.date));
  setWeightLog(log);
  dateEl.value='';
  valEl.value='';
  renderWeightCard();
  showToast(`⚖️ ${date} → ${val}kg eklendi`);
}

function saveWeightEdit(idx){
  const input=document.getElementById('wh-input-'+idx);
  if(!input)return;
  const val=parseFloat(input.value);
  if(!val||val<20||val>400){showToast('⚠️ Geçerli kilo girin');return;}
  const log=getWeightLog();
  if(!log[idx])return;
  log[idx].weight=val;
  log[idx].time=Date.now();
  log.sort((a,b)=>a.date.localeCompare(b.date));
  setWeightLog(log);
  document.getElementById('pWeight').value=log[log.length-1].weight;
  saveProfile();
  renderWeightCard();
  showToast(`⚖️ ${val}kg güncellendi`);
}

function deleteWeightEntry(idx){
  const log=getWeightLog();
  if(!log[idx])return;
  const entry=log[idx];
  if(!confirm(`${entry.date} tarihli ${entry.weight}kg kaydı silinsin mi?`))return;
  log.splice(idx,1);
  setWeightLog(log);
  if(log.length){
    document.getElementById('pWeight').value=log[log.length-1].weight;
    saveProfile();
  }
  renderWeightCard();
  showToast('🗑️ Kayıt silindi');
}

function renderWeightCard(){
  const container=document.getElementById('weightCardProfile')||document.getElementById('weightCardContainer');
  if(!container)return;

  const log=getWeightLog();
  const goalWeight=parseFloat(document.getElementById('pGoalWeight').value)||70;
  const currentWeight=log.length?log[log.length-1].weight:parseFloat(document.getElementById('pWeight').value)||75;
  const startWeight=log.length?log[0].weight:currentWeight;
  const diff=Math.round((currentWeight-startWeight)*10)/10;
  const toGoal=Math.round((currentWeight-goalWeight)*10)/10;


  const chartData=log.slice(-30);

  let chartHtml='';
  if(chartData.length>=2){
    const weights=chartData.map(e=>e.weight);
    const minW=Math.min(...weights,goalWeight)-1;
    const maxW=Math.max(...weights)+1;
    const range=maxW-minW||1;
    const w=100/chartData.length;


    const points=chartData.map((e,i)=>{
      const x=(i/(chartData.length-1))*100;
      const y=100-((e.weight-minW)/range)*100;
      return`${x},${y}`;
    }).join(' ');

    const goalY=100-((goalWeight-minW)/range)*100;

    chartHtml=`<div class="weight-chart">
      <svg viewBox="-2 -5 104 115" preserveAspectRatio="none" style="width:100%;height:140px">
        <line x1="0" y1="${goalY}" x2="100" y2="${goalY}" stroke="var(--green)" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.5"/>
        <polyline points="${points}" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        ${chartData.map((e,i)=>{
          const x=(i/(chartData.length-1))*100;
          const y=100-((e.weight-minW)/range)*100;
          return`<circle cx="${x}" cy="${y}" r="2" fill="var(--accent)"/>`;
        }).join('')}
      </svg>
      <div style="display:flex;justify-content:space-between;font-size:.6rem;color:var(--text2);margin-top:2px">
        <span>${chartData[0].date.slice(5)}</span>
        <span style="color:var(--green)">hedef: ${goalWeight}kg</span>
        <span>${chartData[chartData.length-1].date.slice(5)}</span>
      </div>
    </div>`;
  }else{
    chartHtml='<div style="padding:12px;text-align:center;color:var(--text2);font-size:.78rem">Grafik için en az 2 kayıt gerekli</div>';
  }

  container.innerHTML=`
    <div class="stat-card" style="animation-delay:.15s">
      <h3>⚖️ Kilo Takibi</h3>
      <div class="weight-input-row">
        <input type="number" id="weightInput" placeholder="Bugünkü kilo (kg)" step="0.1" min="20" max="400">
        <button onclick="addWeightEntry()">Kaydet</button>
      </div>
      <div class="weight-summary">
        <div class="ws-item"><div class="ws-val">${currentWeight} kg</div><div class="ws-label">Şu an</div></div>
        <div class="ws-item"><div class="ws-val" style="color:${diff<=0?'var(--green)':'var(--red)'}">${diff>0?'+':''}${diff} kg</div><div class="ws-label">Değişim</div></div>
        <div class="ws-item"><div class="ws-val">${goalWeight} kg</div><div class="ws-label">Hedef</div></div>
        <div class="ws-item"><div class="ws-val" style="color:${toGoal<=0?'var(--green)':'var(--orange)'}">${toGoal>0?'-':'+'} ${Math.abs(toGoal)} kg</div><div class="ws-label">Kalan</div></div>
      </div>
      ${chartHtml}
      ${log.length?`
      <div style="margin-top:10px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
          <span style="font-size:.78rem;font-weight:700;color:var(--text2)">📋 Geçmiş Kayıtlar</span>
          <button onclick="toggleWeightHistoryEdit()" id="weightEditToggleBtn"
            style="font-size:.68rem;font-weight:700;padding:4px 10px;border-radius:8px;border:1.5px solid var(--border);background:var(--glass);color:var(--accent);cursor:pointer;font-family:var(--font,system-ui)">
            ✏️ Düzenle
          </button>
        </div>
        <!-- Geçmiş tarih ekleme paneli (başlangıçta gizli) -->
        <div id="weightHistoryAddPanel" style="display:none;margin-bottom:10px;padding:10px;background:var(--glass);border:1.5px solid var(--border);border-radius:12px">
          <div style="font-size:.74rem;font-weight:700;color:var(--text2);margin-bottom:8px">📅 Geçmiş Tarih Girişi</div>
          <div style="display:flex;gap:6px;align-items:center">
            <input type="date" id="weightHistDate" style="flex:1;padding:8px;border:1.5px solid var(--border);border-radius:8px;background:var(--glass);color:var(--text);font-family:var(--font,system-ui);font-size:.82rem;outline:none" max="${new Date().toISOString().split('T')[0]}">
            <input type="number" id="weightHistVal" placeholder="kg" step="0.1" min="20" max="400"
              style="width:70px;padding:8px;border:1.5px solid var(--border);border-radius:8px;background:var(--glass);color:var(--text);font-family:var(--font,system-ui);font-size:.88rem;font-weight:700;text-align:center;outline:none">
            <button onclick="addWeightHistoryEntry()"
              style="padding:8px 14px;background:var(--accent);color:#fff;border:none;border-radius:8px;font-family:var(--font,system-ui);font-weight:700;font-size:.8rem;cursor:pointer;white-space:nowrap">
              ✓ Ekle
            </button>
          </div>
        </div>
        <div id="weightHistoryList" style="max-height:200px;overflow-y:auto">
          ${log.slice().reverse().map((e,ri)=>{
            const actualIdx=log.length-1-ri;
            const d=e.date.split('-');
            return`<div style="display:flex;align-items:center;gap:6px;padding:6px 2px;border-bottom:1px solid var(--border);font-size:.78rem">
              <span style="color:var(--text2);flex:1">${d[2]}.${d[1]}.${d[0]}</span>
              <span id="wh-val-${actualIdx}" style="font-weight:700;min-width:52px;text-align:right">${e.weight} kg</span>
              <div id="wh-edit-${actualIdx}" style="display:none;gap:4px;align-items:center">
                <input type="number" id="wh-input-${actualIdx}" value="${e.weight}" step="0.1" min="20" max="400"
                  style="width:60px;padding:4px 6px;border:1.5px solid var(--accent);border-radius:6px;background:var(--glass);color:var(--text);font-family:var(--font,system-ui);font-size:.82rem;font-weight:700;text-align:center;outline:none">
                <button onclick="saveWeightEdit(${actualIdx})"
                  style="padding:4px 8px;background:var(--green);color:#fff;border:none;border-radius:6px;font-size:.7rem;font-weight:700;cursor:pointer">✓</button>
                <button onclick="deleteWeightEntry(${actualIdx})"
                  style="padding:4px 8px;background:rgba(255,92,92,.12);color:var(--red);border:1.5px solid rgba(255,92,92,.2);border-radius:6px;font-size:.7rem;font-weight:700;cursor:pointer">✕</button>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>`:''}
    </div>
  `;
}
let currentComboMeal='kahvalti';
let currentComboDiet='dengeli';

function setComboDiet(diet){
  currentComboDiet=diet;
  ['cdDengeli','cdProtein','cdKarb','cdKeto'].forEach(id=>document.getElementById(id).classList.remove('active'));
  const btnMap={dengeli:'cdDengeli',protein:'cdProtein',karb:'cdKarb',keto:'cdKeto'};
  document.getElementById(btnMap[diet]).classList.add('active');
  document.getElementById('comboResult').innerHTML='';
}



function setComboMeal(type){
  currentComboMeal=type;
  ['cmKahvalti','cmOgle','cmAksam','cmSnack'].forEach(id=>document.getElementById(id).classList.remove('active'));
  const btnMap={kahvalti:'cmKahvalti',ogle:'cmOgle',aksam:'cmAksam',atistirmalik:'cmSnack'};
  document.getElementById(btnMap[type]).classList.add('active');
  document.getElementById('comboResult').innerHTML='';
}

function getRoleForFood(f){
  const n=f.name.toLowerCase();
  if(f.cat==='corba')return'corba';
  if(f.cat==='icecek'||n.includes('ayran')||n.includes('şalgam')||n.includes('çay')||n.includes('kahve')||n.includes('soda')||n.includes('boza')||n.includes('limonata')||(n.includes('suyu')&&!n.includes('köfte')))return'icecek';
  if(n.includes('salata')||n.includes('cacık')||n.includes('haydari')||n.includes('piyaz')||n.includes('kısır')||n.includes('ezme')||n.includes('meze')||n.includes('tarator'))return'salata';
  if(n.includes('pilav')||n.includes('bulgur pilav')||n.includes('makarna')||n.includes('erişte')||n.includes('kuskus'))return'yanlar';
  if(n.includes('ekmek')&&!n.includes('balık ekmek')||n.includes('simit')||n.includes('lavaş')||n.includes('bazlama')||(n.includes('pide')&&!n.includes('kıymalı')))return'ekmek';
  if(f.cat==='kahvalti')return'kahvaltilik';
  if(f.cat==='meyve')return'meyve';
  if(f.cat==='kuruyemis')return'kuruyemis';
  if(f.cat==='sut'&&(n.includes('yoğurt')||n.includes('kefir')||n.includes('süt')))return'sut_urun';
  if(f.cat==='atistirmalik')return'ara';
  if(f.cat==='sos')return'sos';
  if(f.cat==='sporcu')return'sporcu';
  if(f.cat==='ambalajli')return'ambalajli';
  if(f.cat==='et'||f.cat==='balik'||f.cat==='fastfood')return'ana';
  if(f.cat==='baklagil')return'ana';
  if(f.cat==='hamur')return'ana';
  if(f.cat==='tatli')return'tatli';
  if(f.cat==='sebze'){
    if(n.includes('domates')||n.includes('salatalık')||n.includes('biber')||n.includes('soğan')||n.includes('havuç')||n.includes('patates')||n.includes('kabak')||n.includes('patlıcan')||n.includes('ıspanak')||n.includes('brokoli')||n.includes('marul')||n.includes('roka')||n.includes('mantar')||n.includes('lahana')||n.includes('karnabahar')||n.includes('turp')||n.includes('pancar')||n.includes('kereviz')||n.includes('pırasa')||n.includes('enginar')||n.includes('bezelye')||n.includes('semizotu')||n.includes('pazı')||n.includes('bamya (çiğ)')||n.includes('kuşkonmaz')||n.includes('taze fasulye (çiğ)')||n.includes('taze soğan')||n.includes('maydanoz')||n.includes('nane')||n.includes('zeytin')||n.includes('turşu'))return'hammadde';
    return'ana';
  }
  return'ana';
}

function isFoodSuitableForMeal(f,meal){
  const n=f.name.toLowerCase();
  // Çiğ/ham ürünleri öğünden dışla
  if(n.includes('(çiğ')||n.includes('(kuru)')||(n.includes('çiğ ')&&!n.includes('çiğ köfte')))return false;
  const role=getRoleForFood(f);
  if(role==='hammadde'||role==='sos')return false;
  if(meal==='kahvalti'){
    // Alkollü, enerji içeceği, soda, kola — kahvaltıda yok
    if(n.includes('bira')||n.includes('rakı')||n.includes('şarap')||n.includes('viski'))return false;
    if(n.includes('enerji içeceği')||n.includes('red bull')||n.includes('monster')||n.includes('burn'))return false;
    if(n.includes('soda')&&!n.includes('beypazarı')&&f.cat==='ambalajli')return false;
    if(n.includes('kola')||n.includes('fanta')||n.includes('sprite')||n.includes('pepsi')||n.includes('gazoz'))return false;
    // Fast food, kebap, köfte vb. — kahvaltıda yok
    if(f.cat==='fastfood')return false;
    if(n.includes('kebap')||n.includes('köfte')||n.includes('döner')||n.includes('lahmacun')||n.includes('tantuni')||n.includes('iskender'))return false;
    if(n.includes('pide')&&!n.includes('pide ekmeği'))return false;
    // Çorba, baklagil — kahvaltıda yok
    if(f.cat==='corba')return false;
    if(f.cat==='baklagil')return false;
    // Pilav, makarna, kebap — kahvaltıda yok
    if(role==='yanlar')return false;
    // Ana kategoriler: sadece kahvaltıya uygun ana ürünler
    if(role==='ana'&&!n.includes('menemen')&&!n.includes('omlet')&&!n.includes('yumurta')&&!n.includes('sucuklu')&&!n.includes('börek')&&!n.includes('gözleme')&&!n.includes('poğaça')&&!n.includes('mıhlama')&&!n.includes('çılbır'))return false;
    // Ambalajlı — sadece granola, yulaf, müsli, süt ürünleri onaylı
    if(f.cat==='ambalajli'){
      const ok=n.includes('granola')||n.includes('yulaf')||n.includes('müsli')||n.includes('süt')||n.includes('ayran')||n.includes('yoğurt')||n.includes('kefir');
      if(!ok)return false;
    }
    return['kahvaltilik','ekmek','sut_urun','meyve','icecek','kuruyemis','sporcu'].includes(role)||f.cat==='kahvalti';
  }
  if(meal==='ogle'||meal==='aksam'){
    if(role==='kahvaltilik'&&!n.includes('yumurta'))return false;
    if(f.cat==='ambalajli'&&(n.includes('çikolata')||n.includes('gofret')||n.includes('bisküvi')||n.includes('cips')||n.includes('dondurma')))return false;
    if(n.includes('bira')||n.includes('rakı'))return false;
    return['ana','yanlar','corba','salata','ekmek','icecek','sut_urun'].includes(role);
  }
  if(meal==='atistirmalik'){
    if(role==='ana')return false;
    if(role==='corba')return false;
    return['meyve','kuruyemis','sut_urun','ara','icecek','ambalajli','sporcu'].includes(role);
  }
  return true;
}

const MEAL_TEMPLATES={
  kahvalti:[
    // Klasik Türk sofra kahvaltısı
    {slots:[{role:'kahvaltilik',count:3},{role:'ekmek',count:1},{role:'icecek',count:1}],name:'Klasik Türk Kahvaltısı'},
    // Yumurtalı kahvaltı
    {slots:[{role:'kahvaltilik',count:2},{role:'kahvaltilik',count:1,filter:'yumurta'},{role:'ekmek',count:1},{role:'icecek',count:1}],name:'Yumurtalı Kahvaltı'},
    // Hafif / diyet kahvaltı
    {slots:[{role:'kahvaltilik',count:2},{role:'sut_urun',count:1},{role:'meyve',count:1}],name:'Hafif Kahvaltı'},
    // Fit / yulaf kahvaltı
    {slots:[{role:'sporcu',count:1,filter:'yulaf'},{role:'sut_urun',count:1},{role:'meyve',count:1},{role:'kuruyemis',count:1}],name:'Fit Yulaf Kahvaltısı'},
    // Serpme kahvaltı
    {slots:[{role:'kahvaltilik',count:4},{role:'ekmek',count:1},{role:'icecek',count:1}],name:'Serpme Kahvaltı'},
    // Doyurucu kahvaltı
    {slots:[{role:'kahvaltilik',count:2},{role:'ekmek',count:1},{role:'sut_urun',count:1},{role:'meyve',count:1}],name:'Doyurucu Kahvaltı'},
  ],
  atistirmalik:[
    {slots:[{role:'meyve',count:1},{role:'sut_urun',count:1}],name:'Meyve & Yoğurt'},
    {slots:[{role:'kuruyemis',count:1},{role:'meyve',count:1}],name:'Enerji Mix'},
    {slots:[{role:'sut_urun',count:1},{role:'meyve',count:1}],name:'Yoğurt & Meyve'},
    {slots:[{role:'sporcu',count:1},{role:'meyve',count:1}],name:'Fit Atıştırma'},
  ]
};

const PAIRING_MAP={
  kebap_izgara:{
    match:n=>n.includes('kebap')||n.includes('kebab')||n.includes('köfte')||n.includes('biftek')||n.includes('pirzola')||n.includes('şiş')||n.includes('kavurma')||n.includes('ciğer')||n.includes('sucuk (ızgara)')||n.includes('pastırma')||n.includes('incik'),
    yan:['Bulgur Pilavı','Pirinç Pilavı','Arpa Şehriye Pilavı'],
    salata:['Çoban Salata','Sumaklı Soğan Salatası','Mevsim Salatası','Söğüş (domates-biber-yeşillik)'],
    icecek:['Ayran','Şalgam Suyu','Soda'],
    ek:['Cacık','Acılı Ezme','Salatalık Turşusu','Közlenmiş Biber Salatası','Biber Turşusu'],
    ekmek:['Lavaş','Pide Ekmeği']
  },
  sulu_et:{
    match:n=>n.includes('sote')||n.includes('haşlama')||n.includes('güveç')||n.includes('tandır')||n.includes('tas kebab')||n.includes('orman')||n.includes('etli bezelye')||n.includes('etli bamya')||n.includes('etli patlıcan')||n.includes('etli türlü')||n.includes('söğüş et')||n.includes('et sote'),
    yan:['Pirinç Pilavı','Bulgur Pilavı','Şehriyeli Pilav'],
    salata:['Çoban Salata','Mevsim Salatası','Yeşil Salata (marul-roka)'],
    icecek:['Ayran','Soda'],
    ek:['Cacık','Yoğurt (porsiyon)','Salatalık Turşusu','Karışık Turşu'],
    ekmek:['Beyaz Ekmek (1 dilim)']
  },
  ozel_kebap:{
    match:n=>n.includes('ali nazik')||n.includes('hünkar')||n.includes('iskender')||n.includes('beyti')||n.includes('çökertme')||n.includes('tepsi kebab')||n.includes('kağıt kebab')||n.includes('pideli')||n.includes('butter chicken'),
    yan:['Bulgur Pilavı','Pirinç Pilavı'],
    salata:['Mevsim Salatası','Çoban Salata','Sumaklı Soğan Salatası'],
    icecek:['Ayran','Şalgam Suyu'],
    ek:['Cacık','Közlenmiş Biber Salatası','Acılı Ezme'],
    ekmek:[]
  },
  baklagil:{
    match:n=>n.includes('kuru fasulye')||n.includes('nohut')||n.includes('mercimek')||n.includes('barbunya')||n.includes('fasulye pilaki')||n.includes('börülce')||n.includes('bakla'),
    yan:['Pirinç Pilavı','Bulgur Pilavı','Mercimekli Bulgur Pilavı'],
    salata:['Çoban Salata','Gavurdağı Salatası','Mevsim Salatası','Turp Salatası'],
    icecek:['Ayran','Soda'],
    ek:['Yoğurt (porsiyon)','Salatalık Turşusu','Lahana Turşusu','Cacık'],
    ekmek:['Beyaz Ekmek (1 dilim)']
  },
  sebze_yemek:{
    match:n=>n.includes('karnıyarık')||n.includes('imam')||n.includes('musakka')||n.includes('dolma')||n.includes('sarma')||n.includes('türlü')||n.includes('bamya yem')||n.includes('fasulye yem')||n.includes('bezelye yem')||n.includes('pırasa yem')||n.includes('ıspanak')||n.includes('oturtma')||n.includes('mücver')||n.includes('fırında sebze')||n.includes('lahana')||n.includes('mantar sote')||n.includes('kabak dolma')||n.includes('biber dolma')||n.includes('patlıcan dolma')||n.includes('soğan dolma')||n.includes('enginar dolma'),
    yan:['Pirinç Pilavı','Bulgur Pilavı','Domatesli Pirinç Pilavı'],
    salata:['Çoban Salata','Mevsim Salatası','Yoğurtlu Semizotu','Semizotu Salatası'],
    icecek:['Ayran','Soda'],
    ek:['Yoğurt (porsiyon)','Cacık','Salatalık Turşusu'],
    ekmek:['Beyaz Ekmek (1 dilim)']
  },
  balik:{
    match:n=>n.includes('levrek')||n.includes('çipura')||n.includes('somon')||n.includes('hamsi')||n.includes('palamut')||n.includes('lüfer')||n.includes('alabalık')||n.includes('sardalya')||n.includes('buğulama')||n.includes('karides')||n.includes('midye tava')||n.includes('kalamar')||n.includes('ton balığı')||n.includes('balık ekmek')||n.includes('balık buğulama'),
    yan:['Pirinç Pilavı','Arpa Şehriye Pilavı'],
    salata:['Roka Salatası','Mevsim Salatası','Yeşil Salata (marul-roka)','Turp Salatası'],
    icecek:['Şalgam Suyu','Soda','Ayran'],
    ek:['Cacık','Tarator','Havuç Tarator','Söğüş (domates-biber-yeşillik)'],
    ekmek:['Beyaz Ekmek (1 dilim)']
  },
  tavuk:{
    match:n=>(n.includes('tavuk')||n.includes('çerkez')||n.includes('chicken caesar'))&&!n.includes('çorba'),
    yan:['Pirinç Pilavı','Bulgur Pilavı','Soslu Makarna','Şehriyeli Pilav'],
    salata:['Çoban Salata','Mevsim Salatası','Karışık Salata','Mor Lahana Salatası'],
    icecek:['Ayran','Soda'],
    ek:['Cacık','Yoğurt (porsiyon)','Haydari','Közlenmiş Biber Salatası'],
    ekmek:['Beyaz Ekmek (1 dilim)','Lavaş']
  },
  hamur:{
    match:n=>n.includes('börek')||n.includes('gözleme')||n.includes('pide')||n.includes('lahmacun')||n.includes('etli ekmek')||n.includes('poğaça')||n.includes('içli köfte')||n.includes('mantı')||n.includes('katmer'),
    yan:[],
    salata:['Çoban Salata','Mevsim Salatası','Yeşil Salata (marul-roka)','Söğüş (domates-biber-yeşillik)'],
    icecek:['Ayran','Soda','Çay (şekersiz)'],
    ek:['Cacık','Yoğurt (porsiyon)','Acılı Ezme'],
    ekmek:[]
  },
  sokak:{
    match:n=>n.includes('döner')||n.includes('dürüm')||n.includes('kokoreç')||n.includes('tantuni')||n.includes('hamburger')||n.includes('tost')||n.includes('kumpir')||n.includes('çiğ köfte dürüm'),
    yan:[],
    salata:['Söğüş (domates-biber-yeşillik)','Mevsim Salatası'],
    icecek:['Ayran','Şalgam Suyu','Soda'],
    ek:['Acılı Ezme','Cacık','Biber Turşusu'],
    ekmek:[]
  },
  zeytinyagli:{
    match:n=>n.includes('zeytinyağlı')||n.includes('pilaki')||n.includes('portakallı kereviz')||n.includes('patlıcan beğendi'),
    yan:['Pirinç Pilavı','Bulgur Pilavı'],
    salata:['Mevsim Salatası','Semizotu Salatası','Roka Salatası'],
    icecek:['Ayran','Soda'],
    ek:['Yoğurt (porsiyon)','Cacık'],
    ekmek:['Beyaz Ekmek (1 dilim)']
  }
};

function findPairingGroup(foodName){
  const n=foodName.toLowerCase();
  for(const [key,group] of Object.entries(PAIRING_MAP)){
    if(group.match(n))return group;
  }
  return null;
}

function pickFromDB(name){return FOOD_DB.find(f=>f.name===name)}
function pickRandom(arr){return arr[Math.floor(Math.random()*arr.length)]}
function shuffle(a){return[...a].sort(()=>Math.random()-.5)}

// Gerçek Türk porsiyon standartları (gram)
const STD_PORTIONS={
  // Ana yemekler
  ana:200, ana_kebap:150, ana_sulu:250, ana_balik:180,
  // Yanlar
  yan_pilav:150, yan_bulgur:150, yan_makarna:180,
  // Salatalar / mezeler
  salata:150, cacik:120, tursu:40, yogurt:150,
  // Çorba
  corba:250,
  // Ekmekler — gerçek dilim ağırlıkları
  ekmek_dilim:30,      // 1 ince dilim beyaz/tam buğday ~30g
  ekmek_kalin:40,      // 1 kalın dilim ~40g
  ekmek_lavash:60,     // 1 lavaş ~60g
  ekmek_pide:80,       // 1 pide ekmeği ~80g
  ekmek_simit:80,      // 1 simit ~80g (çeyrek simit ~50g)
  // İçecekler
  icecek_ayran:200, icecek_soda:200, icecek_salgam:150, icecek_cay:200,
  // Meyve, kuruyemiş
  meyve:150, kuruyemis:30, sut_urun:150,
  // Kahvaltılıklar — BeBIS + diyetisyen standartları
  kahvaltilik_peynir:40,      // beyaz peynir 40g (~1 kibrit kutusu)
  kahvaltilik_kasar:20,       // kaşar 20g (1 ince dilim)
  kahvaltilik_yumurta:60,     // 1 yumurta ~60g
  kahvaltilik_zeytin:30,      // 5-6 adet zeytin ~30g
  kahvaltilik_recel:20,       // 1 tatlı kaşığı reçel ~20g
  kahvaltilik_bal:15,         // 1 tatlı kaşığı bal ~15g
  kahvaltilik_tereyag:10,     // 1 çay kaşığı tereyağı ~10g
  kahvaltilik_tahin:15,       // 1 tatlı kaşığı tahin ~15g
  kahvaltilik_sucuk:30,       // sucuk 30g (birkaç dilim)
  kahvaltilik_menemen:150,    // menemen 1 porsiyon ~150g
  kahvaltilik_omlet:100,      // omlet 1 porsiyon ~100g
  // Fit kahvaltılar
  kahvaltilik_yulaf:50,       // yulaf ezmesi 50g (yarım kase)
  kahvaltilik_granola:50,     // granola 50g
  kahvaltilik_yoğurt:150,     // yoğurt 150g (~1 kase)
};

function getSmartPortion(f,role,group){
  const n=f.name.toLowerCase();
  // ── Ana yemekler ──
  if(n.includes('kebap')||n.includes('köfte')||n.includes('şiş'))return STD_PORTIONS.ana_kebap;
  if(n.includes('sote')||n.includes('haşlama')||n.includes('güveç')||n.includes('yemeği'))return STD_PORTIONS.ana_sulu;
  if(n.includes('ızgara')&&(n.includes('balık')||n.includes('levrek')||n.includes('çipura')||n.includes('somon')))return STD_PORTIONS.ana_balik;
  // ── Yanlar ──
  if(n.includes('pilav'))return STD_PORTIONS.yan_pilav;
  if(n.includes('bulgur'))return STD_PORTIONS.yan_bulgur;
  if(n.includes('makarna'))return STD_PORTIONS.yan_makarna;
  // ── Salatalar / mezeler ──
  if(n.includes('salata'))return STD_PORTIONS.salata;
  if(n.includes('cacık'))return STD_PORTIONS.cacik;
  if(n.includes('turşu'))return STD_PORTIONS.tursu;
  if(n.includes('yoğurt')&&!n.includes('lu'))return STD_PORTIONS.yogurt;
  // ── Çorba ──
  if(n.includes('çorba'))return STD_PORTIONS.corba;
  // ── İçecekler ──
  if(n.includes('ayran'))return STD_PORTIONS.icecek_ayran;
  if(n.includes('şalgam'))return STD_PORTIONS.icecek_salgam;
  if(n.includes('soda')||n.includes('kola')||n.includes('gazoz'))return STD_PORTIONS.icecek_soda;
  if(n.includes('çay')||n.includes('kahve'))return STD_PORTIONS.icecek_cay;
  // ── Ekmekler — gerçek gramaj ──
  if(n.includes('lavaş'))return STD_PORTIONS.ekmek_lavash;
  if(n.includes('pide ekmeği'))return STD_PORTIONS.ekmek_pide;
  if(n.includes('simit'))return STD_PORTIONS.ekmek_simit;
  if(n.includes('ekmek'))return STD_PORTIONS.ekmek_dilim;
  // ── Kahvaltılıklar — gerçek gramaj ──
  if(n.includes('menemen'))return STD_PORTIONS.kahvaltilik_menemen;
  if(n.includes('omlet')||n.includes('sucuklu yumurta'))return STD_PORTIONS.kahvaltilik_omlet;
  if(n.includes('yumurta'))return STD_PORTIONS.kahvaltilik_yumurta;
  if(n.includes('sucuk'))return STD_PORTIONS.kahvaltilik_sucuk;
  if(n.includes('beyaz peynir')||n.includes('tulum')||n.includes('lor')||n.includes('çökelek'))return STD_PORTIONS.kahvaltilik_peynir;
  if(n.includes('kaşar')||n.includes('tost'))return STD_PORTIONS.kahvaltilik_kasar;
  if(n.includes('zeytin'))return STD_PORTIONS.kahvaltilik_zeytin;
  if(n.includes('reçel'))return STD_PORTIONS.kahvaltilik_recel;
  if(n.includes('bal')&&!n.includes('ezmesi'))return STD_PORTIONS.kahvaltilik_bal;
  if(n.includes('tereyağ'))return STD_PORTIONS.kahvaltilik_tereyag;
  if(n.includes('tahin'))return STD_PORTIONS.kahvaltilik_tahin;
  if(n.includes('yulaf'))return STD_PORTIONS.kahvaltilik_yulaf;
  if(n.includes('granola')||n.includes('müsli'))return STD_PORTIONS.kahvaltilik_granola;
  // ── Genel ──
  if(role==='ana')return STD_PORTIONS.ana;
  return 150;
}


function generateCombo(){
  const targetCal=parseInt(document.getElementById('comboCalInput').value)||500;
  const meal=currentComboMeal;
  const diet=currentComboDiet;

  if(meal==='kahvalti'||meal==='atistirmalik'){
    return generateTemplateCombo(targetCal,meal,diet);
  }

  const eligible=FOOD_DB.filter(f=>{
    if(!isFoodSuitableForMeal(f,meal))return false;
    return getRoleForFood(f)==='ana';
  });
  if(!eligible.length)return;

  function dietScore(f){
    if(diet==='protein')return f.prot>12?3:f.prot>6?2:1;
    if(diet==='karb')return f.carb>20?3:f.carb>10?2:1;
    if(diet==='keto')return(f.fat>8&&f.carb<8)?3:(f.carb<15)?2:0;
    return 2;
  }

  let bestCombo=null,bestDiff=Infinity;

  for(let att=0;att<25;att++){
    const mainFood=shuffle(eligible.filter(f=>dietScore(f)>=1))[0];
    if(!mainFood)continue;
    const group=findPairingGroup(mainFood.name);
    const items=[];
    let remCal=targetCal;

    // 1. Ana yemek — standart porsiyon
    let mainP=getSmartPortion(mainFood,'ana',group);
    let mainC=Math.round(mainFood.cal*(mainP/100));
    if(mainC>remCal*0.55&&remCal>200)mainP=Math.round((remCal*0.45/mainFood.cal)*100);
    mainP=Math.max(100,Math.min(300,mainP));
    const mr=mainP/100;
    items.push({name:mainFood.name,emoji:mainFood.emoji,g:mainP,cal:Math.round(mainFood.cal*mr),prot:Math.round(mainFood.prot*mr),carb:Math.round(mainFood.carb*mr),fat:Math.round(mainFood.fat*mr)});
    remCal-=items[0].cal;

    if(group){
      // 2. Yan yemek (pilav/bulgur)
      if(group.yan.length&&remCal>60){
        const yanF=pickFromDB(pickRandom(group.yan));
        if(yanF){
          let yp=getSmartPortion(yanF,'yan',group);
          if(Math.round(yanF.cal*(yp/100))>remCal*0.45)yp=Math.round((remCal*0.35/yanF.cal)*100);
          yp=Math.max(80,Math.min(200,yp));const yr=yp/100;
          items.push({name:yanF.name,emoji:yanF.emoji,g:yp,cal:Math.round(yanF.cal*yr),prot:Math.round(yanF.prot*yr),carb:Math.round(yanF.carb*yr),fat:Math.round(yanF.fat*yr)});
          remCal-=items[items.length-1].cal;
        }
      }
      // 3. Salata/ek
      if(group.salata.length&&remCal>20){
        const sF=pickFromDB(pickRandom(group.salata));
        if(sF){
          let sp=getSmartPortion(sF,'salata',group);
          if(Math.round(sF.cal*(sp/100))>remCal*0.5)sp=Math.round((remCal*0.4/sF.cal)*100);
          sp=Math.max(50,Math.min(200,sp));const sr=sp/100;
          items.push({name:sF.name,emoji:sF.emoji,g:sp,cal:Math.round(sF.cal*sr),prot:Math.round(sF.prot*sr),carb:Math.round(sF.carb*sr),fat:Math.round(sF.fat*sr)});
          remCal-=items[items.length-1].cal;
        }
      }
      // 4. İçecek
      if(group.icecek.length&&remCal>10){
        const iF=pickFromDB(pickRandom(group.icecek));
        if(iF){
          const ip=getSmartPortion(iF,'icecek',group);const ir=ip/100;
          items.push({name:iF.name,emoji:iF.emoji,g:ip,cal:Math.round(iF.cal*ir),prot:Math.round(iF.prot*ir),carb:Math.round(iF.carb*ir),fat:Math.round(iF.fat*ir)});
          remCal-=items[items.length-1].cal;
        }
      }
      // 5. Bonus: ekmek veya ek (kalan kalori yetiyorsa)
      if(remCal>30&&group.ek&&group.ek.length){
        const eF=pickFromDB(pickRandom(group.ek));
        if(eF&&!items.some(i=>i.name===eF.name)){
          let ep=getSmartPortion(eF,'ek',group);
          ep=Math.min(ep,Math.round((remCal*0.8/eF.cal)*100));
          ep=Math.max(30,ep);const er=ep/100;
          items.push({name:eF.name,emoji:eF.emoji,g:ep,cal:Math.round(eF.cal*er),prot:Math.round(eF.prot*er),carb:Math.round(eF.carb*er),fat:Math.round(eF.fat*er)});
          remCal-=items[items.length-1].cal;
        }
      }
    }else{
      const genericYan=['Pirinç Pilavı','Bulgur Pilavı','Çoban Salata','Cacık','Ayran'];
      for(const gn of shuffle(genericYan)){
        if(remCal<20||items.length>=4)break;
        const gf=pickFromDB(gn);
        if(!gf||items.some(i=>i.name===gf.name))continue;
        let gp=getSmartPortion(gf,'yan',null);const gr=gp/100;
        items.push({name:gf.name,emoji:gf.emoji,g:gp,cal:Math.round(gf.cal*gr),prot:Math.round(gf.prot*gr),carb:Math.round(gf.carb*gr),fat:Math.round(gf.fat*gr)});
        remCal-=items[items.length-1].cal;
      }
    }

    const tc=items.reduce((s,i)=>s+i.cal,0);
    const diff=Math.abs(tc-targetCal);
    if(items.length>=2&&diff<bestDiff){
      const gName=group?Object.keys(PAIRING_MAP).find(k=>PAIRING_MAP[k]===group):null;
      const comboNames={kebap_izgara:'Kebapçı Menü',sulu_et:'Ev Yemeği',ozel_kebap:'Özel Sofra',baklagil:'Baklagil Sofrası',sebze_yemek:'Sebze Yemeği',balik:'Balık Menü',tavuk:'Tavuk Menü',hamur:'Hamur İşi Menü',sokak:'Sokak Lezzeti',zeytinyagli:'Zeytinyağlı Sofra'};
      bestDiff=diff;
      bestCombo={name:comboNames[gName]||'Günlük Menü',items,totalCal:tc,totalProt:items.reduce((s,i)=>s+i.prot,0),totalCarb:items.reduce((s,i)=>s+i.carb,0),totalFat:items.reduce((s,i)=>s+i.fat,0)};
    }
  }

  if(bestCombo)renderCombo(bestCombo);
  else document.getElementById('comboResult').innerHTML='<div style="text-align:center;padding:16px;color:var(--text2)">Uygun kombin bulunamadı, kalori hedefini değiştirin.</div>';
}

function generateTemplateCombo(targetCal,meal,diet){
  const templates=MEAL_TEMPLATES[meal];
  if(!templates)return;

  // Kalori hedefine göre şablon seç — düşük hedefte hafif şablonlar tercih et
  let eligibleTpls=templates;
  if(meal==='kahvalti'){
    if(targetCal<300) eligibleTpls=templates.filter(t=>t.name.includes('Hafif')||t.name.includes('Fit')||t.name.includes('Yulaf'));
    else if(targetCal<450) eligibleTpls=templates.filter(t=>!t.name.includes('Serpme'));
    if(!eligibleTpls.length) eligibleTpls=templates;
  }
  const template=eligibleTpls[Math.floor(Math.random()*eligibleTpls.length)];

  const byRole={};
  FOOD_DB.forEach(f=>{
    if(!isFoodSuitableForMeal(f,meal))return;
    const role=getRoleForFood(f);
    if(!byRole[role])byRole[role]=[];
    byRole[role].push(f);
  });
  // Fit kahvaltı için sporcu kategorisindeki yulaf/granola'yı ekle
  if(meal==='kahvalti'){
    FOOD_DB.forEach(f=>{
      if(f.cat!=='sporcu')return;
      const n=f.name.toLowerCase();
      if(n.includes('yulaf')||n.includes('granola')||n.includes('müsli')||n.includes('chia')){
        if(!byRole['sporcu'])byRole['sporcu']=[];
        if(!byRole['sporcu'].find(x=>x.name===f.name)) byRole['sporcu'].push(f);
      }
    });
  }

  function dietScore(f){
    if(diet==='protein')return f.prot>12?3:f.prot>6?2:1;
    if(diet==='karb')return f.carb>20?3:f.carb>10?2:1;
    if(diet==='keto')return(f.fat>8&&f.carb<8)?3:(f.carb<15)?2:0;
    return 2;
  }

  let bestCombo=null,bestDiff=Infinity;
  for(let att=0;att<20;att++){
    const items=[];let remCal=targetCal;
    for(const slot of template.slots){
      const pool=byRole[slot.role];
      if(!pool||!pool.length)continue;
      // Slot'a filter varsa uygula
      let cands=shuffle(pool).filter(f=>dietScore(f)>=1&&!items.some(i=>i.name===f.name));
      if(slot.filter){
        const filtered=cands.filter(f=>f.name.toLowerCase().includes(slot.filter));
        if(filtered.length) cands=filtered;
      }
      for(let c=0;c<slot.count&&cands.length;c++){
        const f=cands.shift();if(!f)break;
        let portion=getSmartPortion(f,slot.role,null);
        // Hedef kaloriye göre porsiyon ölçekle
        const baseCal=Math.round(f.cal*(portion/100));
        const calorieRatio=remCal/targetCal;
        if(calorieRatio<0.3&&items.length>0){
          // Kalan çok az — küçük porsiyon
          portion=Math.max(10,Math.round((remCal*0.6/Math.max(1,f.cal))*100));
        } else if(baseCal>remCal*0.75&&items.length>0){
          portion=Math.max(15,Math.round((remCal*0.5/Math.max(1,f.cal))*100));
        }
        // Minimum mantıklı gramaj
        const minPortions={kahvaltilik:20,ekmek:20,sut_urun:50,meyve:80,icecek:100,kuruyemis:15,sporcu:30};
        portion=Math.max(minPortions[slot.role]||20,portion);
        const r=portion/100;
        items.push({name:f.name,emoji:f.emoji,g:portion,cal:Math.round(f.cal*r),prot:Math.round(f.prot*r),carb:Math.round(f.carb*r),fat:Math.round(f.fat*r)});
        remCal-=items[items.length-1].cal;
      }
    }
    if(items.length>=1){
      const tc=items.reduce((s,i)=>s+i.cal,0);
      const diff=Math.abs(tc-targetCal);
      if(diff<bestDiff){
        bestDiff=diff;
        bestCombo={name:template.name,items,totalCal:tc,totalProt:items.reduce((s,i)=>s+i.prot,0),totalCarb:items.reduce((s,i)=>s+i.carb,0),totalFat:items.reduce((s,i)=>s+i.fat,0)};
      }
    }
  }
  if(bestCombo)renderCombo(bestCombo);
  else document.getElementById('comboResult').innerHTML='<div style="text-align:center;padding:16px;color:var(--text2)">Uygun kombin bulunamadı. Kalori hedefini değiştirin.</div>';
}

function analyzeMeal(items){
  const tc=items.reduce((s,i)=>s+i.cal,0);
  const tp=items.reduce((s,i)=>s+i.prot,0);
  const tk=items.reduce((s,i)=>s+i.carb,0);
  const tf=items.reduce((s,i)=>s+i.fat,0);

  // 1. Kan şekeri etkisi (GI tahmini)
  let giScore=0,giCount=0;
  items.forEach(it=>{
    const n=it.name.toLowerCase();
    const dbF=FOOD_DB.find(f=>f.name===it.name);
    const cat=dbF?dbF.cat:'';
    // Yüksek GI: beyaz ekmek, pilav, patates, tatlılar, şekerli içecek
    if(n.includes('pilav')||n.includes('makarna')||n.includes('ekmek')||n.includes('pide'))giScore+=70;
    else if(cat==='tatli'||n.includes('bal')||n.includes('reçel')||n.includes('şeker'))giScore+=80;
    else if(n.includes('patates')||n.includes('kumpir'))giScore+=75;
    // Orta GI: bulgur, baklagil, meyve
    else if(n.includes('bulgur'))giScore+=45;
    else if(cat==='baklagil'||n.includes('fasulye')||n.includes('nohut')||n.includes('mercimek'))giScore+=35;
    else if(cat==='meyve')giScore+=50;
    // Düşük GI: et, balık, sebze, yoğurt, yumurta
    else if(cat==='et'||cat==='balik')giScore+=15;
    else if(cat==='sebze')giScore+=25;
    else if(cat==='sut')giScore+=30;
    else if(cat==='corba')giScore+=40;
    else giScore+=45;
    giCount++;
  });
  const avgGI=giCount?Math.round(giScore/giCount):50;
  // Protein ve yağ GI'yi düşürür
  const adjustedGI=Math.max(10,Math.min(90,avgGI-(tp>20?10:0)-(tf>15?5:0)));
  let giLabel,giColor,giComment;
  if(adjustedGI<40){giLabel='Düşük';giColor='var(--green)';giComment='Kan şekerinizi yavaş yükseltir, uzun süre tok tutar.'}
  else if(adjustedGI<60){giLabel='Orta';giColor='var(--orange)';giComment='Dengeli bir etki. Protein içeriği sayesinde kan şekeri stabil kalır.'}
  else{giLabel='Yüksek';giColor='var(--red)';giComment='Kan şekerinizi hızlı yükseltir. Yanında protein/lif eklemek faydalı olur.'}

  // 2. Tokluk süresi tahmini
  const fiberEst=items.reduce((s,it)=>{
    const n=it.name.toLowerCase();
    if(n.includes('bulgur')||n.includes('fasulye')||n.includes('nohut')||n.includes('mercimek'))return s+4;
    if(n.includes('sebze')||n.includes('salata')||n.includes('ıspanak')||n.includes('brokoli'))return s+2;
    if(n.includes('yulaf'))return s+3;
    return s+0.5;
  },0);
  const satietyScore=Math.min(10,Math.round((tp*0.12+tf*0.08+fiberEst*0.5+tc*0.003)*10)/10);
  let satietyHours,satietyLabel;
  if(satietyScore>7){satietyHours='4-5 saat';satietyLabel='Uzun süre tok tutar'}
  else if(satietyScore>4){satietyHours='2.5-4 saat';satietyLabel='Ortalama tokluk süresi'}
  else{satietyHours='1-2 saat';satietyLabel='Kısa sürede acıkabilirsiniz'}

  // 3. İşlenmiş gıda puanı (0-10, düşük=doğal)
  let processedScore=0;
  items.forEach(it=>{
    const n=it.name.toLowerCase();
    const dbF=FOOD_DB.find(f=>f.name===it.name);
    const cat=dbF?dbF.cat:'';
    if(cat==='ambalajli')processedScore+=3;
    else if(cat==='fastfood')processedScore+=2;
    else if(cat==='sos')processedScore+=1.5;
    else if(n.includes('nugget')||n.includes('pane')||n.includes('kızartma')||n.includes('cips'))processedScore+=2;
    else if(n.includes('ızgara')||n.includes('haşlan'))processedScore+=0;
    else processedScore+=0.3;
  });
  processedScore=Math.min(10,Math.round(processedScore*10)/10);
  let procLabel,procColor;
  if(processedScore<2){procLabel='Çok Doğal';procColor='var(--green)'}
  else if(processedScore<4){procLabel='Doğal';procColor='#5bf06a'}
  else if(processedScore<6){procLabel='Orta';procColor='var(--orange)'}
  else{procLabel='İşlenmiş';procColor='var(--red)'}

  // 4. Genel yorum
  let comments=[];
  if(tp<10)comments.push('⚠️ Protein düşük — kas kaybını önlemek için protein takviyesi düşün.');
  if(tp>35)comments.push('💪 Protein açısından zengin — kas yapımını destekler.');
  if(tk>80&&tp<15)comments.push('🍞 Karbonhidrat ağırlıklı — 2 saat içinde açlık hissedebilirsin.');
  if(tf>30)comments.push('🧈 Yağ oranı yüksek — sindirim süresi uzun olabilir.');
  if(fiberEst>6)comments.push('🥬 Lif açısından zengin — sindirim sisteminizi destekler.');
  if(adjustedGI>60&&tk>50)comments.push('📈 Kan şekeri hızlı yükselebilir — yemek sonrası 15dk yürüyüş faydалы olur.');
  if(processedScore<2)comments.push('🌿 Tamamen doğal içerikli, harika bir seçim!');
  if(!comments.length)comments.push('✅ Dengeli ve sağlıklı bir öğün seçimi.');

  return{adjustedGI,giLabel,giColor,giComment,satietyHours,satietyLabel,satietyScore,processedScore,procLabel,procColor,comments};
}

function renderMealAnalysis(items){
  const a=analyzeMeal(items);
  return`<div style="margin-top:10px;padding:12px;border-radius:var(--radius-sm);background:var(--glass);border:1px solid var(--border)">
    <div style="font-weight:800;font-size:.82rem;margin-bottom:8px">🔬 Menü Analizi</div>
    <div style="display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap">
      <div style="flex:1;min-width:80px;text-align:center;padding:8px;border-radius:10px;background:var(--glass);border:1px solid var(--border)">
        <div style="font-size:.62rem;color:var(--text2);font-weight:600">Kan Şekeri</div>
        <div style="font-size:.88rem;font-weight:800;color:${a.giColor}">${a.giLabel}</div>
      </div>
      <div style="flex:1;min-width:80px;text-align:center;padding:8px;border-radius:10px;background:var(--glass);border:1px solid var(--border)">
        <div style="font-size:.62rem;color:var(--text2);font-weight:600">Tokluk</div>
        <div style="font-size:.88rem;font-weight:800;color:var(--text)">${a.satietyHours}</div>
      </div>
      <div style="flex:1;min-width:80px;text-align:center;padding:8px;border-radius:10px;background:var(--glass);border:1px solid var(--border)">
        <div style="font-size:.62rem;color:var(--text2);font-weight:600">Doğallık</div>
        <div style="font-size:.88rem;font-weight:800;color:${a.procColor}">${a.procLabel}</div>
      </div>
    </div>
    <div style="font-size:.75rem;line-height:1.6;color:var(--text2)">${a.comments.map(c=>`<div style="padding:3px 0">${c}</div>`).join('')}</div>
  </div>`;
}

function renderCombo(combo){
  const mealId=currentComboMeal;
  const container=document.getElementById('comboResult');
  const dietLabels={dengeli:'⚖️ Dengeli',protein:'💪 Yüksek Protein',karb:'⚡ Yüksek Karb',keto:'🥑 Keto'};
  const dietLabel=dietLabels[currentComboDiet]||'';
  const analysis=renderMealAnalysis(combo.items);

  container.innerHTML=`
    <div class="combo-card">
      <div class="combo-title">
        <span>${combo.name}</span>
        <span style="font-size:.68rem;padding:3px 8px;border-radius:6px;background:var(--accent);color:#fff">${dietLabel}</span>
      </div>
      <div class="combo-items">
        ${combo.items.map(it=>`
          <div class="combo-item">
            <span class="ci-emoji">${it.emoji}</span>
            <div style="flex:1;min-width:0"><div class="ci-name">${escHTML(it.name)}</div><div class="ci-detail">${it.g}g · P:${it.prot}g K:${it.carb}g Y:${it.fat}g</div></div>
            <span class="ci-cal">${it.cal}</span>
          </div>
        `).join('')}
      </div>
      <div class="combo-totals">
        <span><div class="ct-val" style="color:var(--accent)">${combo.totalCal}</div><div class="ct-label">kcal</div></span>
        <span><div class="ct-val" style="color:#ff7a7a">${combo.totalProt}g</div><div class="ct-label">Protein</div></span>
        <span><div class="ct-val" style="color:#22d3ee">${combo.totalCarb}g</div><div class="ct-label">Karb</div></span>
        <span><div class="ct-val" style="color:#ffcc55">${combo.totalFat}g</div><div class="ct-label">Yağ</div></span>
      </div>
      ${analysis}
      <div class="combo-actions">
        <button class="ca-add" onclick="addComboToDay('${mealId}')">✅ Öğüne Ekle</button>
        <button class="ca-refresh" onclick="generateCombo()">🔄 Değiştir</button>
      </div>
    </div>
  `;
  window._currentCombo=combo;
}

function addComboToDay(mealId){
  const combo=window._currentCombo;
  if(!combo)return;
  const data=getDayData();
  combo.items.forEach(it=>{
    data[mealId].push({name:it.name,emoji:it.emoji,cal:it.cal,prot:it.prot,carb:it.carb,fat:it.fat,portionUsed:it.g});
    // Track food from DB
    const dbFood=FOOD_DB.find(f=>f.name===it.name);
    if(dbFood)trackFoodUsage(dbFood,it.g);
  });
  saveDayData(null,data);
  updateHeader();
  renderMeals();
  const mealName=MEAL_DEFS.find(m=>m.id===mealId)?.name||'';
  showToast(`✅ "${combo.name}" → ${mealName} eklendi! (${combo.items.length} yemek)`);
}
let currentSuggestMeal='all';

function suggestForMeal(mealType){
  currentSuggestMeal=mealType;
  document.querySelectorAll('#page-oneri .cat-pill').forEach(p=>p.classList.remove('active'));
  const btnId=mealType==='all'?'sgAll':mealType==='kahvalti'?'sgKahvalti':mealType==='ogle'?'sgOgle':mealType==='aksam'?'sgAksam':'sgSnack';
  document.getElementById(btnId).classList.add('active');

  const t=getTotals();
  const _tgt=getTodayTargets();
  const remainCal=Math.max(0,_tgt.cal-t.cal);
  const remainProt=Math.max(0,_tgt.prot-t.prot);
  const remainCarb=Math.max(0,_tgt.carb-t.carb);
  const remainFat=Math.max(0,_tgt.fat-t.fat);

  document.getElementById('suggestionStatus').innerHTML=`Kalan: <b style="color:var(--accent)">${remainCal} kcal</b> · P:<b>${Math.round(remainProt)}g</b> K:<b>${Math.round(remainCarb)}g</b> Y:<b>${Math.round(remainFat)}g</b>`;

  if(remainCal<=0){
    document.getElementById('suggestionResults').innerHTML='<div style="text-align:center;padding:20px;color:var(--green);font-size:.88rem;font-weight:700">🎯 Günlük kalori hedefinize ulaştınız!</div>';
    return;
  }


  const freq=getFoodFreq();
  let candidates=FOOD_DB.map(f=>{

    const portionG=f.cat==='corba'?250:f.cat==='icecek'?200:(f.cat==='et'||f.cat==='sebze'||f.cat==='baklagil'||f.cat==='pilav')?150:100;
    const r=portionG/100;
    const cal=f.cal*r;
    const prot=f.prot*r;
    const carb=f.carb*r;
    const fat=f.fat*r;


    if(cal>remainCal*1.1)return null;


    if(mealType==='kahvalti'&&!['kahvalti','sut','icecek'].includes(f.cat))return null;
    if(mealType==='ogle'&&!['et','balik','sebze','baklagil','pilav','corba','hamur'].includes(f.cat))return null;
    if(mealType==='aksam'&&!['et','balik','sebze','baklagil','pilav','corba'].includes(f.cat))return null;
    if(mealType==='atistirmalik'&&!['meyve','kuruyemis','atistirmalik','sut','sporcu'].includes(f.cat))return null;


    let score=0;


    const calRatio=cal/remainCal;
    if(calRatio>=0.15&&calRatio<=0.6)score+=30;
    else if(calRatio>0.6&&calRatio<=0.9)score+=15;
    else score+=5;


    if(remainProt>20&&prot>10)score+=20;
    else if(remainProt>10&&prot>5)score+=10;


    const protFit=remainProt>0?Math.min(1,prot/remainProt):0;
    const carbFit=remainCarb>0?Math.min(1,carb/remainCarb):0;
    const fatFit=remainFat>0?Math.min(1,fat/remainFat):0;
    score+=Math.round((protFit+carbFit+fatFit)*10);


    const freqData=freq[f.name];
    if(freqData&&freqData.count>=5)score+=10;
    else if(freqData&&freqData.count>=2)score+=5;


    const data=getDayData();
    const todayNames=[];
    Object.values(data).forEach(foods=>foods.forEach(fd=>todayNames.push(fd.name)));
    if(todayNames.includes(f.name))score-=15;


    let reason='';
    if(prot>15&&remainProt>15)reason='Yüksek protein';
    else if(cal<remainCal*0.25)reason='Düşük kalori';
    else if(calRatio>=0.3&&calRatio<=0.5)reason='İdeal porsiyon';
    else if(freqData&&freqData.count>=3)reason='Sık tercihin';
    else if(f.cat==='sporcu')reason='Sporcu besini';

    return{...f,score,portionG,cal:Math.round(cal),prot:Math.round(prot),carb:Math.round(carb),fat:Math.round(fat),reason};
  }).filter(Boolean);

  candidates.sort((a,b)=>b.score-a.score);

  const results=candidates.slice(0,12);
  const container=document.getElementById('suggestionResults');

  if(!results.length){
    container.innerHTML='<div style="text-align:center;padding:20px;color:var(--text2)">Bu kategori için uygun öneri bulunamadı.</div>';
    return;
  }

  container.innerHTML=results.map(f=>`
    <div class="sg-card" onclick="addSuggestion('${f.name.replace(/'/g,"\\'")}',${f.portionG})">
      <div class="sg-emoji">${f.emoji}</div>
      <div class="sg-info">
        <div class="sg-name">${escHTML(f.name)}</div>
        <div class="sg-detail">${f.cal} kcal · P:${f.prot}g K:${f.carb}g Y:${f.fat}g · ${f.portionG}g</div>
        ${f.reason?'<div class="sg-reason">'+f.reason+'</div>':''}
      </div>
      <div class="sg-match"><div class="sg-score">${f.score}</div><div class="sg-score-label">uyum</div></div>
    </div>
  `).join('');
}

function addSuggestion(name,portionG){
  const food=FOOD_DB.find(f=>f.name===name);
  if(!food)return;


  let mealId=currentSuggestMeal;
  if(mealId==='all'){
    const h=new Date().getHours();
    if(h<11)mealId='kahvalti';
    else if(h<15)mealId='ogle';
    else if(h<20)mealId='aksam';
    else mealId='atistirmalik';
  }

  const r=portionG/100;
  const entry={name:food.name,emoji:food.emoji,cal:food.cal*r,prot:food.prot*r,carb:food.carb*r,fat:food.fat*r,portionUsed:portionG};
  const data=getDayData();
  data[mealId].push(entry);
  saveDayData(null,data);
  trackFoodUsage(food,portionG);
  updateHeader();
  renderMeals();
  suggestForMeal(currentSuggestMeal);
  const mealName=MEAL_DEFS.find(m=>m.id===mealId)?.name||'';
  showToast(`✅ ${food.name} → ${mealName} eklendi!`);
}

function setManualCalorie(){
  const val=parseInt(document.getElementById('manualCalInput').value);
  if(!val||val<800||val>6000){showToast('⚠️ 800-6000 arası değer girin');return}
  dailyTarget=val;
  protTarget=Math.round((val*.30)/4);
  carbTarget=Math.round((val*.45)/4);
  fatTarget=Math.round((val*.25)/9);
  document.getElementById('tdeeNum').textContent=val;
  document.getElementById('calResult').classList.add('show');
  document.getElementById('manualCalInput').value='';
  saveProfile();updateHeader();renderMeals();
  showToast(`🎯 Manuel hedef: ${val} kcal`);
}

const DIETITIAN_MENUS=[];
let dailyDietType='dengeli';
function setDailyDiet(d){
  dailyDietType=d;
  ['ddDengeli','ddProtein','ddKarb','ddKeto'].forEach(id=>document.getElementById(id).classList.remove('active'));
  document.getElementById('dd'+d.charAt(0).toUpperCase()+d.slice(1)).classList.add('active');
}

function generateDailyPlan(){
 try{
  // Diyetisyen menü havuzundan önce dene (her zaman tercih et)
  if(Math.random()<0.90){
    const matching=DIETITIAN_MENUS.filter(m=>m.type===dailyDietType);
    if(matching.length){
      const menu=matching[Math.floor(Math.random()*matching.length)];
      const mealMap={kahvalti:menu.kahvalti,ogle:menu.ogle,aksam:menu.aksam,atistirmalik:menu.ara};
      const mealNames={kahvalti:'🌅 Kahvaltı',ogle:'☀️ Öğle',aksam:'🌙 Akşam',atistirmalik:'🍿 Ara Öğün'};
      let html='',totalCal=0,totalProt=0,totalCarb=0,totalFat=0;
      const allItems={};

      // Menünün toplam kalorisini hesapla → scale faktörü
      let menuRawTotal=0;
      Object.values(mealMap).forEach(foods=>foods.forEach(fi=>menuRawTotal+=fi.cal||0));
      const tgt=getTodayTargets();
      // Makro hedeflere göre scale: dailyTarget/menuTotal, max %40 sapma
      const scaleFactor=menuRawTotal>0?Math.min(1.4,Math.max(0.65,tgt.cal/menuRawTotal)):1;

      for(const [meal,foods] of Object.entries(mealMap)){
        const items=[];
        foods.forEach(fi=>{
          const s=scaleFactor;
          items.push({
            name:fi.n,emoji:fi.e||'🍽️',g:Math.round((fi.g||100)*s),
            cal:Math.round((fi.cal||0)*s),
            prot:Math.round((fi.prot||0)*s),
            carb:Math.round((fi.carb||0)*s),
            fat:Math.round((fi.fat||0)*s)
          });
        });
        if(items.length){
          const mc=items.reduce((s,i)=>s+i.cal,0);totalCal+=mc;
          totalProt+=items.reduce((s,i)=>s+i.prot,0);totalCarb+=items.reduce((s,i)=>s+i.carb,0);totalFat+=items.reduce((s,i)=>s+i.fat,0);
          allItems[meal]=items;
          html+=`<div style="margin-bottom:12px"><div style="font-weight:700;font-size:.88rem;margin-bottom:6px;display:flex;justify-content:space-between">${mealNames[meal]}<span style="color:var(--accent);font-size:.78rem">${mc} kcal</span></div>`;
          html+=items.map(it=>`<div style="display:flex;align-items:center;gap:8px;padding:5px 0;font-size:.8rem;border-bottom:1px solid var(--border)"><span>${it.emoji}</span><span style="flex:1;font-weight:600">${escHTML(it.name)}</span><span style="font-size:.68rem;color:var(--text2)">${it.g?it.g+'g':''}</span><span style="font-weight:700;color:var(--accent)">${it.cal}</span></div>`).join('');
          html+=`</div>`;
        }
      }
      const dietLabels={dengeli:'⚖️ Dengeli',protein:'💪 Protein',karb:'⚡ Karb',keto:'🥑 Keto'};
      const analysis=renderMealAnalysis(Object.values(allItems).flat());
      document.getElementById('dailyPlanResult').innerHTML=`<div class="combo-card" style="margin-top:10px">
        <div class="combo-title"><span>📅 ${menu.name}</span><span style="font-size:.68rem;padding:3px 8px;border-radius:6px;background:var(--accent);color:#fff">${dietLabels[dailyDietType]||''} • Diyetisyen Menü</span>${Math.abs(scaleFactor-1)>0.05?'<span style="font-size:.62rem;padding:2px 6px;border-radius:5px;background:rgba(61,214,140,.1);color:var(--green);margin-left:4px">⚖️ Hedefe uyarlandı</span>':''}</div>
        ${html}
        <div class="combo-totals" style="margin-top:8px">
          <span><div class="ct-val" style="color:var(--accent)">${totalCal}</div><div class="ct-label">kcal</div></span>
          <span><div class="ct-val" style="color:#ff7a7a">${totalProt}g</div><div class="ct-label">Protein</div></span>
          <span><div class="ct-val" style="color:#22d3ee">${totalCarb}g</div><div class="ct-label">Karb</div></span>
          <span><div class="ct-val" style="color:#ffcc55">${totalFat}g</div><div class="ct-label">Yağ</div></span>
        </div>
        ${analysis}
        <div class="combo-actions" style="margin-top:10px">
          <button class="ca-add" onclick="addDailyPlanToDay()">✅ Tümünü Ekle</button>
          <button class="ca-refresh" onclick="generateDailyPlan()">🔄 Değiştir</button>
        </div>
      </div>`;
      window._dailyPlanItems=allItems;
      return;
    }
  }
  // Diyetisyen menüsü gelmezse dinamik üret
  const mealOrder=['kahvalti','ogle','aksam','atistirmalik'];
  const calSplit={kahvalti:.28,ogle:.32,aksam:.28,atistirmalik:.12};
  const mealNames={kahvalti:'🌅 Kahvaltı',ogle:'☀️ Öğle',aksam:'🌙 Akşam',atistirmalik:'🍿 Ara Öğün'};
  let html='',totalCal=0,totalProt=0,totalCarb=0,totalFat=0;
  const allItems={};
  const usedFoods=new Set();
  const usedPairingGroups=new Set();

  const tgtMacro=getTodayTargets();
  // Makro hedef oranları (yüzde)
  const protRatio=tgtMacro.cal>0?(tgtMacro.prot*4/tgtMacro.cal):0.30;
  const carbRatio=tgtMacro.cal>0?(tgtMacro.carb*4/tgtMacro.cal):0.45;
  const fatRatio=tgtMacro.cal>0?(tgtMacro.fat*9/tgtMacro.cal):0.25;

  function dScore(f){
    // Diyet tipi skoru
    let score=2;
    if(dailyDietType==='protein')score=f.prot>12?3:f.prot>6?2:1;
    else if(dailyDietType==='karb')score=f.carb>20?3:f.carb>10?2:1;
    else if(dailyDietType==='keto')score=(f.fat>8&&f.carb<8)?3:(f.carb<15)?2:0;
    // Makro hedef uyumu — yüksek protein hedefli kullanıcıya protein ağırlıklı yemek öner
    if(score>0&&f.cal>0){
      const fProtR=(f.prot*4/f.cal);
      const fCarbR=(f.carb*4/f.cal);
      const fFatR=(f.fat*9/f.cal);
      // Hedefe yakınlık bonus
      if(protRatio>0.35&&fProtR>0.35)score+=1;
      if(carbRatio>0.55&&fCarbR>0.55)score+=1;
      if(fatRatio<0.20&&fFatR<0.20)score+=1;
    }
    return score;
  }

  mealOrder.forEach(m=>{
    const mealCal=Math.round(dailyTarget*calSplit[m]);
    let bestItems=null,bestDiff=Infinity;

    if(m==='kahvalti'||m==='atistirmalik'){
      // Kahvaltı için önce diyetisyen menüsünden bak
      if(m==='kahvalti'&&DIETITIAN_MENUS.length){
        const dietMatch=DIETITIAN_MENUS.filter(dm=>dm.type===dailyDietType);
        if(dietMatch.length){
          const picked=dietMatch[Math.floor(Math.random()*dietMatch.length)];
          if(picked.kahvalti&&picked.kahvalti.length){
            const items=picked.kahvalti.map(fi=>({name:fi.n,emoji:fi.e||'🍽️',g:0,cal:fi.cal||0,prot:fi.prot||0,carb:fi.carb||0,fat:fi.fat||0}));
            bestItems=items;
          }
        }
      }
      if(!bestItems){
      const templates=MEAL_TEMPLATES[m];
      for(let att=0;att<12;att++){
        const tpl=templates[Math.floor(Math.random()*templates.length)];
        const byRole={};
        FOOD_DB.forEach(f=>{
          if(!isFoodSuitableForMeal(f,m)||usedFoods.has(f.name))return;
          const role=getRoleForFood(f);
          if(!byRole[role])byRole[role]=[];
          byRole[role].push(f);
        });
        const items=[];let rem=mealCal;
        for(const slot of tpl.slots){
          const pool=byRole[slot.role];
          if(!pool||!pool.length)continue;
          const cands=shuffle(pool).filter(f=>dScore(f)>=1&&!items.some(i=>i.name===f.name));
          for(let c=0;c<slot.count&&cands.length;c++){
            const f=cands.shift();if(!f)break;
            let p=getSmartPortion(f,slot.role,null);
            if(Math.round(f.cal*(p/100))>rem*0.8&&items.length>0)p=Math.max(20,Math.round((rem*0.5/f.cal)*100));
            const r=p/100;
            items.push({name:f.name,emoji:f.emoji,g:p,cal:Math.round(f.cal*r),prot:Math.round(f.prot*r),carb:Math.round(f.carb*r),fat:Math.round(f.fat*r)});
            rem-=items[items.length-1].cal;
          }
        }
        if(items.length>=2){const tc=items.reduce((s,i)=>s+i.cal,0);const diff=Math.abs(tc-mealCal);if(diff<bestDiff){bestDiff=diff;bestItems=items}}
      }
      } // end if(!bestItems)
    } else {
      // Pairing-based for ogle/aksam — farklı gruptan seç
      const eligible=FOOD_DB.filter(f=>{
        if(!isFoodSuitableForMeal(f,m)||getRoleForFood(f)!=='ana'||!dScore(f)||usedFoods.has(f.name))return false;
        // Çeşitlilik: aynı pairing grubundan tekrar gelmesin
        const g=findPairingGroup(f.name);
        const gKey=g?Object.keys(PAIRING_MAP).find(k=>PAIRING_MAP[k]===g):null;
        if(gKey&&usedPairingGroups.has(gKey))return false;
        return true;
      });
      // Fallback: çeşitlilik bulamazsa tüm eligible'ı al
      const pool=eligible.length>=3?eligible:FOOD_DB.filter(f=>isFoodSuitableForMeal(f,m)&&getRoleForFood(f)==='ana'&&!usedFoods.has(f.name)&&dScore(f)>=1);
      for(let att=0;att<15;att++){
        const mainFood=shuffle(pool)[0];
        if(!mainFood)continue;
        const group=findPairingGroup(mainFood.name);
        const items=[];let rem=mealCal;

        // Hedef kalorige göre ana yemek porsiyonunu ayarla
        let mp=getSmartPortion(mainFood,'ana',group);
        // Önce mealCal hedefinin %50-60'ını ana yemeğe ayır
        const idealMainCal=Math.round(mealCal*0.55);
        const scaledMp=mainFood.cal>0?Math.round((idealMainCal/mainFood.cal)*100):mp;
        mp=Math.max(80,Math.min(350,scaledMp));
        if(Math.round(mainFood.cal*(mp/100))>rem*0.65)mp=Math.round((rem*0.50/Math.max(1,mainFood.cal))*100);
        mp=Math.max(80,Math.min(350,mp));const mr=mp/100;
        items.push({name:mainFood.name,emoji:mainFood.emoji,g:mp,cal:Math.round(mainFood.cal*mr),prot:Math.round(mainFood.prot*mr),carb:Math.round(mainFood.carb*mr),fat:Math.round(mainFood.fat*mr)});
        rem-=items[0].cal;

        if(group){
          if(group.yan.length&&rem>60){const yf=pickFromDB(pickRandom(group.yan));if(yf){let yp=getSmartPortion(yf,'yan',group);if(Math.round(yf.cal*(yp/100))>rem*0.45)yp=Math.round((rem*0.35/yf.cal)*100);yp=Math.max(80,Math.min(200,yp));const yr=yp/100;items.push({name:yf.name,emoji:yf.emoji,g:yp,cal:Math.round(yf.cal*yr),prot:Math.round(yf.prot*yr),carb:Math.round(yf.carb*yr),fat:Math.round(yf.fat*yr)});rem-=items[items.length-1].cal}}
          if(group.salata.length&&rem>20){const sf=pickFromDB(pickRandom(group.salata));if(sf){let sp=getSmartPortion(sf,'salata',group);if(Math.round(sf.cal*(sp/100))>rem*0.5)sp=Math.round((rem*0.4/sf.cal)*100);sp=Math.max(50,Math.min(200,sp));const sr=sp/100;items.push({name:sf.name,emoji:sf.emoji,g:sp,cal:Math.round(sf.cal*sr),prot:Math.round(sf.prot*sr),carb:Math.round(sf.carb*sr),fat:Math.round(sf.fat*sr)});rem-=items[items.length-1].cal}}
          if(group.icecek.length&&rem>10){const cf=pickFromDB(pickRandom(group.icecek));if(cf){const cp=getSmartPortion(cf,'icecek',group);const cr=cp/100;items.push({name:cf.name,emoji:cf.emoji,g:cp,cal:Math.round(cf.cal*cr),prot:Math.round(cf.prot*cr),carb:Math.round(cf.carb*cr),fat:Math.round(cf.fat*cr)});rem-=items[items.length-1].cal}}
          // Track used group for diversity
          const gKey=Object.keys(PAIRING_MAP).find(k=>PAIRING_MAP[k]===group);
          if(gKey)usedPairingGroups.add(gKey);
        }
        if(items.length>=2){const tc=items.reduce((s,i)=>s+i.cal,0);const diff=Math.abs(tc-mealCal);if(diff<bestDiff){bestDiff=diff;bestItems=items}}
      }
    }

    if(bestItems){
      bestItems.forEach(it=>usedFoods.add(it.name));
      const mc=bestItems.reduce((s,i)=>s+i.cal,0);
      totalCal+=mc;totalProt+=bestItems.reduce((s,i)=>s+i.prot,0);totalCarb+=bestItems.reduce((s,i)=>s+i.carb,0);totalFat+=bestItems.reduce((s,i)=>s+i.fat,0);
      allItems[m]=bestItems;
      html+=`<div style="margin-bottom:12px"><div style="font-weight:700;font-size:.88rem;margin-bottom:6px;display:flex;justify-content:space-between">${mealNames[m]}<span style="color:var(--accent);font-size:.78rem">${mc} kcal</span></div>`;
      html+=bestItems.map(it=>`<div style="display:flex;align-items:center;gap:8px;padding:5px 0;font-size:.8rem;border-bottom:1px solid var(--border)"><span>${it.emoji}</span><span style="flex:1;font-weight:600">${escHTML(it.name)}</span><span style="font-size:.68rem;color:var(--text2)">${it.g?it.g+'g':''}</span><span style="font-weight:700;color:var(--accent)">${it.cal}</span></div>`).join('');
      html+=`</div>`;
    }
  });

  const dietLabels={dengeli:'⚖️ Dengeli',protein:'💪 Protein',karb:'⚡ Karb',keto:'🥑 Keto'};
  document.getElementById('dailyPlanResult').innerHTML=`<div class="combo-card" style="margin-top:10px">
    <div class="combo-title"><span>📅 Günlük Plan</span><span style="font-size:.68rem;padding:3px 8px;border-radius:6px;background:var(--accent);color:#fff">${dietLabels[dailyDietType]||''} • ${dailyTarget} kcal</span></div>
    ${html}
    <div class="combo-totals" style="margin-top:8px">
      <span><div class="ct-val" style="color:var(--accent)">${totalCal}</div><div class="ct-label">kcal</div></span>
      <span><div class="ct-val" style="color:#ff7a7a">${totalProt}g</div><div class="ct-label">Protein</div></span>
      <span><div class="ct-val" style="color:#22d3ee">${totalCarb}g</div><div class="ct-label">Karb</div></span>
      <span><div class="ct-val" style="color:#ffcc55">${totalFat}g</div><div class="ct-label">Yağ</div></span>
    </div>
    <div class="combo-actions" style="margin-top:10px">
      <button class="ca-add" onclick="addDailyPlanToDay()">✅ Tümünü Ekle</button>
      <button class="ca-refresh" onclick="generateDailyPlan()">🔄 Değiştir</button>
    </div>
  </div>`;
  window._dailyPlanItems=allItems;
 }catch(err){
  console.error('generateDailyPlan error:',err);
  document.getElementById('dailyPlanResult').innerHTML='<div style="text-align:center;padding:16px;color:var(--red)">Hata: '+err.message+'</div>';
 }
}

function addDailyPlanToDay(){
  const items=window._dailyPlanItems;
  if(!items)return;
  const data=getDayData();
  let count=0;
  Object.keys(items).forEach(m=>{items[m].forEach(it=>{data[m].push({name:it.name,emoji:it.emoji,cal:it.cal,prot:it.prot,carb:it.carb,fat:it.fat,portionUsed:it.g});count++})});
  saveDayData(null,data);renderMeals();updateHeader();
  showToast(`✅ ${count} yemek 4 öğüne eklendi!`);
}

function addRecipeToMeal(idx){
  const r=RECIPES[idx];if(!r)return;
  // Öğün seçici modal aç
  _pendingRecipeIdx=idx;
  openAddRecipeModal();
}

var _pendingRecipeIdx=-1;

function openAddRecipeModal(){
  var r=RECIPES[_pendingRecipeIdx];if(!r)return;
  var modal=document.getElementById('addRecipeModal');
  if(!modal)return;
  document.getElementById('armRecipeName').innerHTML='<span style="font-weight:700;color:var(--text)">' +r.name+'</span> <span style="color:var(--text2)">· '+r.serv+' kişilik tarif · toplam '+(r.cal||0)+' kcal</span>';
  var si=document.getElementById('armServings');
  if(si) si.value=1;
  updateArmCalPreview();
  modal.style.cssText='z-index:150';
  modal.classList.add('show');
}

function updateArmCalPreview(){
  var r=RECIPES[_pendingRecipeIdx];if(!r)return;
  var el=document.getElementById('armCalPreview');if(!el)return;
  var servings=parseFloat(document.getElementById('armServings').value)||1;
  var totalServ=r.serv||1;
  var scale=servings/totalServ;
  var cal=Math.round((r.cal||0)*scale);
  var prot=Math.round((r.prot||0)*scale);
  el.innerHTML='🍽️ <strong style="color:var(--accent)">'+cal+' kcal</strong> · P'+prot+'g eklenecek <span style="color:var(--text2);font-size:.65rem">('+servings+'/'+totalServ+' porsiyon)</span>';
}

function closeAddRecipeModal(){
  var modal=document.getElementById('addRecipeModal');
  if(modal){modal.style.cssText='';modal.classList.remove('show');}
}

function confirmAddRecipeToMeal(){
  var r=RECIPES[_pendingRecipeIdx];if(!r)return;
  var mealId=document.querySelector('#armMealSelect').value;
  var servings=parseFloat(document.getElementById('armServings').value)||1;
  var data=getDayData();
  if(!data[mealId]) data[mealId]=[];

  // Tarifi tek kalem olarak ekle
  // Tariflerdeki değerler toplam (r.serv kişilik) — seçilen porsiyona göre ölçekle
  var scale=servings/(parseFloat(r.serv)||1);
  var cal=Math.round((r.cal||0)*scale);
  var prot=Math.round((r.prot||0)*scale);
  var carb=Math.round((r.carb||0)*scale);
  var fat=Math.round((r.fat||0)*scale);

  var portionLabel=servings===1?' (1/'+r.serv+' porsiyon)':' ('+servings+'/'+r.serv+' porsiyon)';
  data[mealId].push({
    name:r.name+portionLabel,
    emoji:r.emoji||'🍽️',
    cal:cal,prot:prot,carb:carb,fat:fat,
    portionUsed:100,g:100
  });

  saveDayData(null,data);
  closeAddRecipeModal();
  document.getElementById('recipeDetailModal').classList.remove('show');
  renderMeals();updateHeader();
  var meal=MEAL_DEFS.find(function(m){return m.id===mealId;});
  showToast('✅ '+escHTML(r.name)+' → '+(meal?meal.name:mealId)+' eklendi!');
  // Öğünü aç
  var section=document.getElementById('ms-'+mealId);
  if(section){
    document.querySelectorAll('.meal-section').forEach(function(s){s.classList.add('collapsed');});
    section.classList.remove('collapsed');
    sessionStorage.setItem('fs_meal_open_'+mealId,'1');
  }
}
function clearFreqHistory(){if(!confirm('Sık kullanılanlar ve geçmiş temizlensin mi?'))return;localStorage.removeItem('fs_food_freq');localStorage.removeItem('fs_food_recent');showToast('🗑️ Liste temizlendi')}

// Tarifler: Built-in (turkish-recipes-db.js) + Firebase birleştirilir
let RECIPES = [];
let _recipesLoaded = false;

function _getBuiltinRecipes() {
  return (window.TURKISH_RECIPES_DB && window.TURKISH_RECIPES_DB.length) ? window.TURKISH_RECIPES_DB : [];
}

function _mergeRecipes(builtIn, cloud) {
  // Cloud tarifler built-in ile aynı id'ye sahipse cloud versiyonu kazanır
  var merged = builtIn.slice();
  var idSet = {};
  for (var i = 0; i < merged.length; i++) idSet[merged[i].id] = true;
  for (var j = 0; j < cloud.length; j++) {
    if (!idSet[cloud[j].id]) {
      merged.push(cloud[j]);
      idSet[cloud[j].id] = true;
    }
  }
  return merged;
}

async function loadRecipesFromFirebase() {
  if (_recipesLoaded && RECIPES.length) return;
  var builtIn = _getBuiltinRecipes();

  // Önce built-in + cache ile hızlı başlat
  var cached = localStorage.getItem('fs_recipes_cache');
  var cacheTime = parseInt(localStorage.getItem('fs_recipes_cache_time') || '0');
  var now = Date.now();
  if (cached && (now - cacheTime) < 30 * 60 * 1000) {
    try {
      var parsed = JSON.parse(cached);
      if (parsed && parsed.length) {
        RECIPES = _mergeRecipes(builtIn, parsed);
        _recipesLoaded = true;
        return;
      }
    } catch(e) {}
  }

  // Firebase'den çek
  try {
    var snap = await db.collection('recipes').orderBy('name').get();
    var cloudRecipes = snap.docs.map(function(d) { return {id: d.id, ...d.data()}; });

    if (cloudRecipes.length) {
      localStorage.setItem('fs_recipes_cache', JSON.stringify(cloudRecipes));
      localStorage.setItem('fs_recipes_cache_time', String(now));
    }
    RECIPES = _mergeRecipes(builtIn, cloudRecipes);
    _recipesLoaded = true;
  } catch(e) {
    console.warn('[Tarifler] Firebase hatası:', e.code, e.message);
    // Offline fallback — cache varsa kullan
    if (cached) {
      try {
        var parsed2 = JSON.parse(cached);
        if (parsed2 && parsed2.length) { RECIPES = _mergeRecipes(builtIn, parsed2); _recipesLoaded = true; return; }
      } catch(e2) {}
    }
    // Hiçbir cloud/cache yoksa sadece built-in tarifler
    RECIPES = builtIn;
    _recipesLoaded = true;
  }
}


var _currentRecipeCat='all';

function getRecipeScore(r){
  if(!r.cal)return 0;
  let score=50;
  // Protein skoru (yüksek protein = iyi)
  const protRatio=((r.prot||0)*4)/(r.cal||1);
  if(protRatio>0.3)score+=15;else if(protRatio>0.2)score+=10;else if(protRatio<0.1)score-=5;
  // Yağ skoru (düşük yağ = iyi)
  const fatRatio=((r.fat||0)*9)/(r.cal||1);
  if(fatRatio<0.25)score+=10;else if(fatRatio>0.45)score-=10;
  // Denge (makrolar var mı)
  if(r.prot&&r.carb&&r.fat)score+=10;
  // Düşük kalori bonus
  if(r.cal<300)score+=5;else if(r.cal>600)score-=5;
  // Etiket bonus
  if(r.tags&&r.tags.includes('saglikli'))score+=5;
  if(r.tags&&r.tags.includes('proteinli'))score+=5;
  return Math.max(0,Math.min(100,score));
}

function getScoreColor(s){
  if(s>=75)return 'var(--green)';
  if(s>=50)return 'var(--orange)';
  return 'var(--red)';
}

function getScoreLabel(s){
  if(s>=80)return'Mükemmel';if(s>=65)return'İyi';if(s>=50)return'Orta';return'Düşük';
}

const RECIPE_CATS=[
  {id:'klasik',label:'🍲 Klasik',color:'#ff6b3d'},
  {id:'fit',label:'💪 Fit',color:'#3dd68c'},
  {id:'corba',label:'🍲 Çorbalar',color:'#f0a030'},
  {id:'tatli',label:'🍮 Tatlılar',color:'#a07cf8'},
  {id:'pratik',label:'⚡ Pratik',color:'#5b9cf6'},
  {id:'sebze',label:'🥬 Sebze',color:'#22d3ee'},
  {id:'vegan',label:'🌱 Vegan',color:'#3dd68c'},
  {id:'sandvic',label:'🥪 Tost & Dürüm',color:'#f0a030'},
  {id:'salata',label:'🥗 Salatalar',color:'#3dd68c'},
  {id:'hamur',label:'🍞 Hamur İşi',color:'#f0a030'},
  {id:'meze',label:'🫒 Mezeler',color:'#22d3ee'},
  {id:'_protein',label:'💪 Yüksek Proteinli',color:'#ff7a7a',virtual:true},
  {id:'_karb',label:'⚡ Yüksek Karbonhidrat',color:'#22d3ee',virtual:true}
];

function getRecipesForCat(catObj){
  if(!catObj.virtual) return RECIPES.filter(function(r){return r.cat===catObj.id;});
  if(catObj.id==='_protein') return RECIPES.filter(function(r){
    if(!r.cal||!r.prot)return false;
    return (r.prot*4/r.cal)>=0.3;
  });
  if(catObj.id==='_karb') return RECIPES.filter(function(r){
    if(!r.cal||!r.carb)return false;
    return (r.carb*4/r.cal)>=0.5;
  });
  return [];
}

async function filterRecipes(cat){
  _currentRecipeCat=cat||'all';
  if(!_recipesLoaded || !RECIPES.length){
    await loadRecipesFromFirebase();
  }
  // Kategori sıralamasını Firestore'dan yükle (ilk seferde)
  if(!_cachedCatOrder) await loadCatOrderFromFirebase();
  // Öne çıkan carousel
  renderRecipeCarousel(RECIPES);
  // Kategori satırları
  renderCategoryRows();
}
