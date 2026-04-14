// FitSofra — FatSecret API Integration Module
// Extracted from index.html for modularity

// ═══════ FATSECRET API ENTEGRASYONU (Cloud Function Proxy) ═══════
var FatSecret={
  _cache:new LimitedCache(50),
  CACHE_TTL:APP_CONFIG.limits.searchCacheTTL,

  search:async function(query){
    if(!query||query.length<2)return[];
    var cacheKey='fatsecret_'+query.toLowerCase().trim();
    // Memory cache (LimitedCache ile boyut sınırlı)
    var memCached=this._cache.get(cacheKey);if(memCached)return memCached;
    // localStorage cache (24h)
    try{
      var lsCache=localStorage.getItem(cacheKey);
      var lsExpiry=parseInt(localStorage.getItem(cacheKey+'_exp'))||0;
      if(lsCache&&lsExpiry>Date.now()){
        var parsed=JSON.parse(lsCache);
        this._cache.set(cacheKey,parsed,lsExpiry-Date.now());
        return parsed;
      }
    }catch(e){}
    // Cloud Function proxy call (callable)
    try{
      var fn=firebase.functions().httpsCallable('fatSecretSearch');
      var result=await fn({query:query});
      var foods=result.data&&result.data.foods?result.data.foods:[];
      // Filter dupes against local DB
      var dbNames=new Set(FOOD_DB.map(function(f){return f.name.toLowerCase().trim();}));
      var seen=new Set();
      var filtered=foods.filter(function(f){
        var k=f.name.toLowerCase().trim();
        if(dbNames.has(k)||seen.has(k))return false;
        seen.add(k);return f.cal>0;
      }).slice(0,20);
      // Cache (LimitedCache)
      this._cache.set(cacheKey,filtered,this.CACHE_TTL);
      try{localStorage.setItem(cacheKey,JSON.stringify(filtered));localStorage.setItem(cacheKey+'_exp',String(Date.now()+this.CACHE_TTL));}catch(e){}
      return filtered;
    }catch(e){
      console.warn('FatSecret proxy error:',e.message||e);
      return[];
    }
  },

  isAvailable:function(){
    // Cloud Function varsa kullanılabilir (credentials sunucuda)
    return typeof firebase!=='undefined'&&typeof firebase.functions==='function';
  },

  clearCache:function(){
    this._cache.clear();
    var keysToRemove=[];
    for(var i=0;i<localStorage.length;i++){
      var k=localStorage.key(i);
      if(k&&k.indexOf('fatsecret_')===0)keysToRemove.push(k);
    }
    for(var j=0;j<keysToRemove.length;j++)localStorage.removeItem(keysToRemove[j]);
  }
};


function renderApiResults(foods){
  if(!foods.length){document.getElementById('apiStatus').innerHTML='Sonuç bulunamadı 😕';document.getElementById('apiResults').innerHTML='';return}
  document.getElementById('apiStatus').style.display='none';
  document.getElementById('apiResults').innerHTML=foods.map(f=>{
    const dn=f.name.length>40?f.name.substring(0,40)+'...':f.name;
    const extra=f.brand?` <span style="color:var(--accent);font-size:.65rem">${f.brand}</span>`:'';
    const qtyInfo=f.qty?' • '+f.qty:'';
    return`<div class="food-db-item" onclick="selectApiFood(${JSON.stringify({name:f.name,cal:f.cal,prot:f.prot,carb:f.carb,fat:f.fat}).replace(/"/g,'&quot;')})"><div class="fdb-info"><div class="fdb-name">${dn}${extra}</div><div class="fdb-detail">P:${f.prot}g K:${f.carb}g Y:${f.fat}g • 100g${qtyInfo}</div></div><div class="fdb-cal">${f.cal||'?'}</div></div>`;
  }).join('');
}

function getUnitsForFood(food){
  const n = food.name.toLowerCase();
  const u = [{name:'gram',g:100,label:'100g'}];


  if(n.includes('yumurta')||n.includes('omlet')) u.unshift({name:'1 adet',g:60,label:'1 adet (60g)'});

  else if(n.includes('ekmek')&&!n.includes('balık')) u.unshift({name:'1 dilim',g:33,label:'1 dilim (33g)'},{name:'2 dilim',g:66,label:'2 dilim (66g)'});

  else if(n.includes('simit')) u.unshift({name:'1 adet',g:120,label:'1 adet (120g)'});
  else if(n.includes('poğaça')||n.includes('açma')) u.unshift({name:'1 adet',g:80,label:'1 adet (80g)'});
  else if(n.includes('bazlama')) u.unshift({name:'1 adet',g:150,label:'1 adet (150g)'});
  else if(n.includes('pişi')) u.unshift({name:'1 adet',g:60,label:'1 adet (60g)'});

  else if(n.includes('börek')||n.includes('gözleme')) u.unshift({name:'1 porsiyon',g:150,label:'1 porsiyon (150g)'},{name:'1 dilim',g:80,label:'1 dilim (80g)'});
  else if(n.includes('sigara böreği')) u.unshift({name:'1 adet',g:40,label:'1 adet (40g)'},{name:'3 adet',g:120,label:'3 adet (120g)'});

  else if(food.cat==='corba') u.unshift({name:'1 kase',g:250,label:'1 kase (250g)'},{name:'1 büyük kase',g:350,label:'1 büyük kase (350g)'});

  else if(n.includes('çiğ')&&(n.includes('pirinç')||n.includes('bulgur')||n.includes('firik')||n.includes('şehriye')||n.includes('kuskus')||n.includes('kinoa'))) u.unshift({name:'1 su bardağı',g:180,label:'1 su bardağı (180g)'},{name:'yarım bardak',g:90,label:'yarım bardak (90g)'},{name:'1 yemek kaşığı',g:15,label:'1 yk (15g)'});

  else if(n.includes('çiğ')&&(n.includes('spagetti')||n.includes('penne')||n.includes('fettuccine')||n.includes('fusilli')||n.includes('farfalle')||n.includes('rigatoni')||n.includes('lazanya')||n.includes('makarna')||n.includes('erişte')||n.includes('yufka makarna'))) u.unshift({name:'1 porsiyon',g:80,label:'1 porsiyon (80g)'},{name:'2 porsiyon',g:160,label:'2 porsiyon (160g)'});

  else if(n.includes('çiğ')&&(n.includes('arpa şehriye')||n.includes('tel şehriye'))) u.unshift({name:'1 yemek kaşığı',g:10,label:'1 yk (10g)'},{name:'yarım bardak',g:50,label:'yarım bardak (50g)'});

  else if(n.includes('çiğ')&&food.cat==='baklagil') u.unshift({name:'1 su bardağı',g:200,label:'1 su bardağı (200g)'},{name:'yarım bardak',g:100,label:'yarım bardak (100g)'});

  else if(n.includes('pilav')||n.includes('bulgur')||n.includes('makarna')||n.includes('erişte')) u.unshift({name:'1 porsiyon',g:150,label:'1 porsiyon (150g)'},{name:'1 kepçe',g:100,label:'1 kepçe (100g)'});

  else if(n.includes('mantı')) u.unshift({name:'1 porsiyon',g:250,label:'1 porsiyon (250g)'});

  else if(n.includes('göğsü')&&(n.includes('çiğ')||n.includes('ızgara')||n.includes('haşlan')||n.includes('fırın')||n.includes('tava'))) u.unshift({name:'1 parça',g:150,label:'1 parça (150g)'},{name:'yarım parça',g:75,label:'yarım (75g)'});
  else if(n.includes('but')&&(food.cat==='et')) u.unshift({name:'1 adet',g:200,label:'1 but (200g)'});
  else if(n.includes('baget')) u.unshift({name:'1 adet',g:120,label:'1 baget (120g)'});
  else if(n.includes('kanat')) u.unshift({name:'1 adet',g:30,label:'1 kanat (30g)'},{name:'4 adet',g:120,label:'4 kanat (120g)'},{name:'6 adet',g:180,label:'6 kanat (180g)'});
  else if(n.includes('pirzola')) u.unshift({name:'1 adet',g:100,label:'1 pirzola (100g)'},{name:'2 adet',g:200,label:'2 pirzola (200g)'});
  else if(n.includes('biftek')) u.unshift({name:'1 porsiyon',g:200,label:'1 porsiyon (200g)'});

  else if(n.includes('köfte')&&!n.includes('çiğ köfte')) u.unshift({name:'1 adet',g:40,label:'1 köfte (40g)'},{name:'3 adet',g:120,label:'3 köfte (120g)'},{name:'5 adet',g:200,label:'5 köfte (200g)'});
  else if(n.includes('çiğ köfte dürüm')) u.unshift({name:'1 adet',g:180,label:'1 dürüm (180g)'});
  else if(n.includes('çiğ köfte')) u.unshift({name:'1 porsiyon',g:150,label:'1 porsiyon (150g)'});

  else if(n.includes('adana')||n.includes('urfa')) u.unshift({name:'1 şiş',g:100,label:'1 şiş (100g)'},{name:'1.5 şiş',g:150,label:'1.5 şiş (150g)'},{name:'2 şiş',g:200,label:'2 şiş (200g)'});
  else if(n.includes('döner')) u.unshift({name:'1 porsiyon',g:150,label:'1 porsiyon (150g)'},{name:'yarım porsiyon',g:75,label:'yarım (75g)'});
  else if(n.includes('iskender')) u.unshift({name:'1 porsiyon',g:300,label:'1 porsiyon (300g)'});

  else if(n.includes('lahmacun')) u.unshift({name:'1 adet',g:180,label:'1 adet (180g)'},{name:'2 adet',g:360,label:'2 adet (360g)'});
  else if(n.includes('pide')) u.unshift({name:'1 porsiyon',g:300,label:'1 porsiyon (300g)'},{name:'yarım',g:150,label:'yarım (150g)'});

  else if(n.includes('dürüm')||n.includes('wrap')) u.unshift({name:'1 adet',g:250,label:'1 dürüm (250g)'});
  else if(n.includes('sandviç')||n.includes('tost')||n.includes('kumru')) u.unshift({name:'1 adet',g:180,label:'1 adet (180g)'});

  else if(n.includes('burger')||n.includes('hamburger')) u.unshift({name:'1 adet',g:200,label:'1 adet (200g)'});

  else if(n.includes('tantuni')||n.includes('kokoreç')) u.unshift({name:'1 porsiyon',g:200,label:'1 porsiyon (200g)'});

  else if(food.cat==='balik'&&!n.includes('konserve')&&!n.includes('ekmek')) u.unshift({name:'1 porsiyon',g:200,label:'1 porsiyon (200g)'},{name:'1 fileto',g:150,label:'1 fileto (150g)'});
  else if(n.includes('midye dolma')) u.unshift({name:'1 adet',g:25,label:'1 adet (25g)'},{name:'5 adet',g:125,label:'5 adet (125g)'},{name:'10 adet',g:250,label:'10 adet (250g)'});

  else if(n.includes('turşu')) u.unshift({name:'3-4 adet',g:30,label:'3-4 adet (30g)'},{name:'5-6 adet',g:50,label:'5-6 adet (50g)'});
  else if(n.includes('ezme')||n.includes('humus')||n.includes('babagan')||n.includes('muhammara')) u.unshift({name:'1 porsiyon',g:60,label:'1 porsiyon (60g)'},{name:'2 yk',g:30,label:'2 yk (30g)'});
  else if(n.includes('söğüş')) u.unshift({name:'1 tabak',g:100,label:'1 tabak (100g)'});
  else if(n.includes('mantar sote')) u.unshift({name:'1 porsiyon',g:150,label:'1 porsiyon (150g)'});
  else if(n.includes('protein shake')||n.includes('protein bar')) u.unshift({name:'1 adet',g:55,label:'1 adet'});
  else if(n.includes('ton balığı (konserve)')) u.unshift({name:'1 kutu',g:160,label:'1 kutu (160g)'},{name:'yarım kutu',g:80,label:'yarım kutu (80g)'});
  else if(food.cat==='sebze'||food.cat==='baklagil') u.unshift({name:'1 porsiyon',g:200,label:'1 porsiyon (200g)'},{name:'1 kepçe',g:150,label:'1 kepçe (150g)'});

  else if(n.includes('salata')||n.includes('cacık')||n.includes('haydari')||n.includes('piyaz')||n.includes('kısır')) u.unshift({name:'1 porsiyon',g:150,label:'1 porsiyon (150g)'});

  else if(n.includes('sarma')||n.includes('dolma')) u.unshift({name:'1 adet',g:35,label:'1 adet (35g)'},{name:'5 adet',g:175,label:'5 adet (175g)'},{name:'8 adet',g:280,label:'8 adet (280g)'});

  else if(n.includes('içli köfte')||n.includes('çibörek')) u.unshift({name:'1 adet',g:80,label:'1 adet (80g)'},{name:'2 adet',g:160,label:'2 adet (160g)'});

  else if(n.includes('baklava')) u.unshift({name:'1 dilim',g:60,label:'1 dilim (60g)'},{name:'2 dilim',g:120,label:'2 dilim (120g)'});
  else if(n.includes('künefe')) u.unshift({name:'1 porsiyon',g:150,label:'1 porsiyon (150g)'});
  else if(n.includes('sütlaç')||n.includes('kazandibi')||n.includes('keşkül')||n.includes('muhallebi')||n.includes('supangle')) u.unshift({name:'1 kase',g:150,label:'1 kase (150g)'});
  else if(n.includes('profiterol')) u.unshift({name:'1 porsiyon',g:150,label:'1 porsiyon (150g)'});
  else if(n.includes('tulumba')||n.includes('lokma')) u.unshift({name:'1 adet',g:20,label:'1 adet (20g)'},{name:'5 adet',g:100,label:'5 adet (100g)'});
  else if(n.includes('lokum')) u.unshift({name:'1 adet',g:15,label:'1 adet (15g)'},{name:'3 adet',g:45,label:'3 adet (45g)'});
  else if(n.includes('dondurma')) u.unshift({name:'1 top',g:60,label:'1 top (60g)'},{name:'2 top',g:120,label:'2 top (120g)'});
  else if(n.includes('waffle')) u.unshift({name:'1 adet',g:120,label:'1 adet (120g)'});
  else if(n.includes('kabak tatlısı')||n.includes('ayva tatlısı')) u.unshift({name:'1 porsiyon',g:200,label:'1 porsiyon (200g)'});
  else if(n.includes('trileçe')||n.includes('cheesecake')||n.includes('revani')||n.includes('şambali')) u.unshift({name:'1 dilim',g:120,label:'1 dilim (120g)'});
  else if(n.includes('güllaç')) u.unshift({name:'1 porsiyon',g:150,label:'1 porsiyon (150g)'});
  else if(n.includes('aşure')) u.unshift({name:'1 kase',g:200,label:'1 kase (200g)'});
  else if(n.includes('helva')) u.unshift({name:'1 dilim',g:50,label:'1 dilim (50g)'});
  else if(n.includes('katmer')) u.unshift({name:'1 adet',g:120,label:'1 adet (120g)'});

  else if(n.includes('elma')||n.includes('armut')||n.includes('şeftali')) u.unshift({name:'1 adet',g:180,label:'1 adet (180g)'},{name:'yarım',g:90,label:'yarım (90g)'});
  else if(n==='muz') u.unshift({name:'1 adet',g:120,label:'1 adet (120g)'});
  else if(n.includes('portakal')||n.includes('mandalina')) u.unshift({name:'1 adet',g:150,label:'1 adet (150g)'});
  else if(n.includes('çilek')) u.unshift({name:'5 adet',g:60,label:'5 adet (60g)'},{name:'1 kase',g:150,label:'1 kase (150g)'});
  else if(n.includes('kiraz')||n.includes('üzüm')) u.unshift({name:'1 avuç',g:80,label:'1 avuç (80g)'},{name:'1 kase',g:150,label:'1 kase (150g)'});
  else if(n.includes('karpuz')) u.unshift({name:'1 dilim',g:300,label:'1 dilim (300g)'});
  else if(n.includes('kavun')) u.unshift({name:'1 dilim',g:200,label:'1 dilim (200g)'});
  else if(n.includes('incir')&&n.includes('taze')) u.unshift({name:'1 adet',g:50,label:'1 adet (50g)'},{name:'3 adet',g:150,label:'3 adet (150g)'});
  else if(n.includes('nar')) u.unshift({name:'1 adet',g:250,label:'1 adet (250g)'},{name:'yarım',g:125,label:'yarım (125g)'});
  else if(n.includes('avokado')) u.unshift({name:'1 adet',g:150,label:'1 adet (150g)'},{name:'yarım',g:75,label:'yarım (75g)'});
  else if(n.includes('kayısı')&&!n.includes('kuru')) u.unshift({name:'1 adet',g:40,label:'1 adet (40g)'},{name:'3 adet',g:120,label:'3 adet (120g)'});
  else if(n.includes('erik')) u.unshift({name:'1 adet',g:50,label:'1 adet (50g)'});
  else if(n.includes('hurma')) u.unshift({name:'1 adet',g:25,label:'1 adet (25g)'},{name:'3 adet',g:75,label:'3 adet (75g)'});
  else if(n.includes('kuru kayısı')||n.includes('kuru incir')) u.unshift({name:'1 adet',g:10,label:'1 adet (10g)'},{name:'5 adet',g:50,label:'5 adet (50g)'});
  else if(n.includes('kuru üzüm')) u.unshift({name:'1 avuç',g:30,label:'1 avuç (30g)'});

  else if(food.cat==='kuruyemis') u.unshift({name:'1 avuç',g:30,label:'1 avuç (30g)'},{name:'1 paket',g:50,label:'1 paket (50g)'});

  else if(n.includes('peynir')||n.includes('kaşar')) u.unshift({name:'1 dilim',g:30,label:'1 dilim (30g)'},{name:'2 dilim',g:60,label:'2 dilim (60g)'});
  else if(n.includes('lor')||n.includes('çökelek')||n.includes('labne')) u.unshift({name:'1 yemek kaşığı',g:25,label:'1 yk (25g)'},{name:'2 yemek kaşığı',g:50,label:'2 yk (50g)'});

  else if(n.includes('zeytin')) u.unshift({name:'5 adet',g:20,label:'5 adet (20g)'},{name:'10 adet',g:40,label:'10 adet (40g)'});

  else if(n.includes('bal')||n.includes('reçel')||n.includes('pekmez')||n.includes('kaymak')) u.unshift({name:'1 yemek kaşığı',g:20,label:'1 yk (20g)'},{name:'2 yemek kaşığı',g:40,label:'2 yk (40g)'});
  else if(n.includes('tahin')&&food.cat==='kahvalti') u.unshift({name:'1 yemek kaşığı',g:15,label:'1 yk (15g)'},{name:'2 yemek kaşığı',g:30,label:'2 yk (30g)'});
  else if(n.includes('tereyağı')) u.unshift({name:'1 çay kaşığı',g:5,label:'1 çk (5g)'},{name:'1 yemek kaşığı',g:15,label:'1 yk (15g)'});

  else if(n.includes('yoğurt')&&food.cat==='sut') u.unshift({name:'1 kase',g:200,label:'1 kase (200g)'},{name:'1 küçük kase',g:100,label:'küçük kase (100g)'});
  else if(n.includes('ayran')) u.unshift({name:'1 bardak',g:200,label:'1 bardak (200ml)'},{name:'1 kutu',g:200,label:'1 kutu (200ml)'});
  else if(n.includes('süt')&&!n.includes('sütlaç')) u.unshift({name:'1 bardak',g:200,label:'1 bardak (200ml)'},{name:'1 kutu',g:500,label:'1 kutu (500ml)'});
  else if(n.includes('kefir')) u.unshift({name:'1 bardak',g:200,label:'1 bardak (200ml)'});

  else if(n.includes('çay')) u.unshift({name:'1 bardak',g:100,label:'1 bardak (100ml)'},{name:'2 bardak',g:200,label:'2 bardak'});
  else if(n.includes('kahve')&&(n.includes('türk')||n.includes('filtre'))) u.unshift({name:'1 fincan',g:70,label:'1 fincan (70ml)'});
  else if(n.includes('latte')||n.includes('cappuccino')) u.unshift({name:'1 bardak',g:250,label:'1 bardak (250ml)'});
  else if(n.includes('330ml')) u.unshift({name:'1 kutu',g:330,label:'1 kutu (330ml)'});
  else if(n.includes('250ml')) u.unshift({name:'1 kutu',g:250,label:'1 kutu (250ml)'});
  else if(n.includes('500ml')) u.unshift({name:'1 kutu',g:500,label:'1 kutu (500ml)'});
  else if(n.includes('suyu')||n.includes('limonata')||n.includes('boza')||n.includes('salep')||n.includes('şalgam')) u.unshift({name:'1 bardak',g:200,label:'1 bardak (200ml)'});
  else if(n.includes('soda')) u.unshift({name:'1 şişe',g:200,label:'1 şişe (200ml)'});
  else if(n.includes('rakı')) u.unshift({name:'1 tek',g:45,label:'1 tek (45ml)'},{name:'1 duble',g:90,label:'1 duble (90ml)'});
  else if(n.includes('bira')) u.unshift({name:'1 şişe',g:330,label:'1 şişe (330ml)'},{name:'1 kutu',g:500,label:'1 kutu (500ml)'});
  else if(n.includes('şarap')) u.unshift({name:'1 kadeh',g:150,label:'1 kadeh (150ml)'});

  else if(food.cat==='sos'&&(n.includes('ketçap')||n.includes('mayonez')||n.includes('hardal')||n.includes('sos')&&!n.includes('yoğurt'))) u.unshift({name:'1 yemek kaşığı',g:15,label:'1 yk (15g)'},{name:'2 yemek kaşığı',g:30,label:'2 yk (30g)'},{name:'1 paket',g:10,label:'1 paket (10g)'});
  else if(food.cat==='sos'&&(n.includes('salça'))) u.unshift({name:'1 yemek kaşığı',g:15,label:'1 yk (15g)'},{name:'2 yemek kaşığı',g:30,label:'2 yk (30g)'});
  else if(food.cat==='sos'&&(n.includes('yoğurt')||n.includes('tarator')||n.includes('haydari')||n.includes('hummus')||n.includes('baba')||n.includes('guacamole')||n.includes('salsa'))) u.unshift({name:'1 porsiyon',g:50,label:'1 porsiyon (50g)'},{name:'1 yemek kaşığı',g:20,label:'1 yk (20g)'});
  else if(food.cat==='sos'&&(n.includes('zeytinyağı')||n.includes('ayçiçek')||n.includes('sirke'))) u.unshift({name:'1 yemek kaşığı',g:14,label:'1 yk (14ml)'},{name:'1 çay kaşığı',g:5,label:'1 çk (5ml)'});
  else if(food.cat==='sos'&&n.includes('wasabi')) u.unshift({name:'1 çay kaşığı',g:5,label:'1 çk (5g)'});
  else if(food.cat==='sos') u.unshift({name:'1 yemek kaşığı',g:15,label:'1 yk (15g)'},{name:'2 yemek kaşığı',g:30,label:'2 yk (30g)'});

  else if(food.cat==='ambalajli'&&(n.includes('çikolata')||n.includes('gofret')||n.includes('dido')||n.includes('metro')||n.includes('albeni')||n.includes('laviva')||n.includes('caramio')||n.includes('tutku')||n.includes('adicto')||n.includes('benimo')||n.includes('browni')||n.includes('canga')||n.includes('cocostar')||n.includes('tadelle')||n.includes('napoliten'))) u.unshift({name:'1 adet',g:35,label:'1 adet (35g)'});
  else if(food.cat==='ambalajli'&&(n.includes('bisküvi')||n.includes('kurabiye')||n.includes('pötibör')||n.includes('petit')||n.includes('burçak'))) u.unshift({name:'3 adet',g:30,label:'3 adet (30g)'},{name:'5 adet',g:50,label:'5 adet (50g)'});
  else if(food.cat==='ambalajli'&&n.includes('popkek')) u.unshift({name:'1 adet',g:40,label:'1 adet (40g)'});
  else if(food.cat==='ambalajli'&&n.includes('sarelle')&&n.includes('gofret')) u.unshift({name:'1 adet',g:33,label:'1 adet (33g)'});
  else if(food.cat==='ambalajli'&&(n.includes('nutella')||n.includes('sarelle')&&n.includes('ezmesi'))) u.unshift({name:'1 yemek kaşığı',g:20,label:'1 yk (20g)'},{name:'2 yemek kaşığı',g:40,label:'2 yk (40g)'});
  else if(food.cat==='ambalajli'&&(n.includes('cips')||n.includes('lay')||n.includes('doritos')||n.includes('ruffles')||n.includes('pringles')||n.includes('cheetos')||n.includes('çerezza'))) u.unshift({name:'1 paket',g:40,label:'küçük paket (40g)'},{name:'1 büyük',g:100,label:'büyük paket (100g)'});
  else if(food.cat==='ambalajli'&&n.includes('kraker')) u.unshift({name:'1 paket',g:40,label:'1 paket (40g)'});
  else if(food.cat==='ambalajli'&&(n.includes('magnum')||n.includes('cornetto')||n.includes('nogger')||n.includes('golf'))) u.unshift({name:'1 adet',g:90,label:'1 adet (90g)'});
  else if(food.cat==='ambalajli'&&n.includes('noodle')) u.unshift({name:'1 paket',g:75,label:'1 paket (75g)'});
  else if(food.cat==='ambalajli'&&(n.includes('hazır çorba')||n.includes('knorr çorba')||n.includes('yayla hazır'))) u.unshift({name:'1 kase',g:250,label:'1 kase (250ml)'});
  else if(food.cat==='ambalajli'&&n.includes('protein bar')||n.includes('snickers protein')) u.unshift({name:'1 adet',g:55,label:'1 bar (55g)'});
  else if(food.cat==='ambalajli'&&n.includes('whey')||n.includes('casein')) u.unshift({name:'1 ölçek',g:30,label:'1 ölçek (30g)'});
  else if(food.cat==='ambalajli'&&n.includes('gevreği')||n.includes('coco pops')||n.includes('corn flakes')) u.unshift({name:'1 kase',g:40,label:'1 kase (40g)'});
  else if(food.cat==='ambalajli'&&n.includes('nescafé 3')) u.unshift({name:'1 paket',g:18,label:'1 paket (18g)'});

  else if(n.includes('pizza')) u.unshift({name:'1 dilim',g:130,label:'1 dilim (130g)'},{name:'2 dilim',g:260,label:'2 dilim (260g)'});
  else if(n.includes('patates kızart')) u.unshift({name:'1 porsiyon',g:120,label:'küçük (120g)'},{name:'1 büyük',g:200,label:'büyük (200g)'});
  else if(n.includes('nugget')) u.unshift({name:'4 adet',g:70,label:'4 adet (70g)'},{name:'6 adet',g:105,label:'6 adet (105g)'},{name:'9 adet',g:160,label:'9 adet (160g)'});
  else if(n.includes('kumpir')) u.unshift({name:'1 adet',g:400,label:'1 adet (400g)'});

  else if(n.includes('mısır (haşlan')){ u.unshift({name:'1 adet',g:150,label:'1 koçan (150g)'})}
  else if(n.includes('popcorn')) u.unshift({name:'1 kase',g:30,label:'1 kase (30g)'});
  else if(food.cat==='atistirmalik') u.unshift({name:'1 porsiyon',g:50,label:'1 porsiyon (50g)'});

  else if(n.includes('whey')||n.includes('casein')||n.includes('vegan protein')||n.includes('izolat')) u.unshift({name:'1 ölçek',g:30,label:'1 ölçek (30g)'},{name:'2 ölçek',g:60,label:'2 ölçek (60g)'});
  else if(n.includes('kreatin')||n.includes('glutamin')) u.unshift({name:'1 servis',g:5,label:'1 servis (5g)'});
  else if(n.includes('bcaa')||n.includes('pre-workout')) u.unshift({name:'1 servis',g:10,label:'1 servis (10g)'});
  else if(n.includes('gainer')) u.unshift({name:'1 servis',g:100,label:'1 servis (100g)'});
  else if(n.includes('protein bar')) u.unshift({name:'1 adet',g:55,label:'1 bar (55g)'});
  else if(n.includes('spirulina')||n.includes('moringa')||n.includes('maca')||n.includes('açaí')) u.unshift({name:'1 yemek kaşığı',g:7,label:'1 yk (7g)'},{name:'2 yemek kaşığı',g:14,label:'2 yk (14g)'});
  else if(n.includes('chia')||n.includes('keten')) u.unshift({name:'1 yemek kaşığı',g:12,label:'1 yk (12g)'},{name:'2 yemek kaşığı',g:24,label:'2 yk (24g)'});
  else if(n.includes('kenevir tohumu')) u.unshift({name:'1 yemek kaşığı',g:10,label:'1 yk (10g)'},{name:'3 yemek kaşığı',g:30,label:'3 yk (30g)'});
  else if(n.includes('yulaf ezmesi')||n.includes('yulaf kepeği')||n.includes('granola')||n.includes('müsli')) u.unshift({name:'½ su bardağı',g:40,label:'½ bardak (40g)'},{name:'1 su bardağı',g:80,label:'1 bardak (80g)'});
  else if(n.includes('arı poleni')) u.unshift({name:'1 tatlı kaşığı',g:5,label:'1 tk (5g)'},{name:'1 yemek kaşığı',g:10,label:'1 yk (10g)'});
  else if(n.includes('arı sütü')) u.unshift({name:'1 gram',g:1,label:'1g'},{name:'3 gram',g:3,label:'3g'});
  else if(n.includes('fıstık ezmesi')||n.includes('badem ezmesi')) u.unshift({name:'1 yemek kaşığı',g:16,label:'1 yk (16g)'},{name:'2 yemek kaşığı',g:32,label:'2 yk (32g)'});
  else if(n.includes('hindistan cevizi yağı')||n.includes('mct yağı')||n.includes('avokado yağı')) u.unshift({name:'1 yemek kaşığı',g:14,label:'1 yk (14ml)'},{name:'1 çay kaşığı',g:5,label:'1 çk (5ml)'});
  else if(n.includes('kapsül')) u.unshift({name:'1 kapsül',g:1,label:'1 kapsül'},{name:'2 kapsül',g:2,label:'2 kapsül'});
  else if(n.includes('shake')||n.includes('smoothie')) u.unshift({name:'1 bardak',g:300,label:'1 bardak (300ml)'});
  else if(n.includes('badem sütü')||n.includes('yulaf sütü')||n.includes('soya sütü')) u.unshift({name:'1 bardak',g:200,label:'1 bardak (200ml)'},{name:'1 kutu',g:1000,label:'1 kutu (1L)'});
  else if(n.includes('hindistan cevizi suyu')) u.unshift({name:'1 kutu',g:330,label:'1 kutu (330ml)'});
  else if(n.includes('pirinç patlağı')) u.unshift({name:'1 adet',g:9,label:'1 adet (9g)'},{name:'3 adet',g:27,label:'3 adet (27g)'});
  else if(n.includes('enerji topu')) u.unshift({name:'1 adet',g:25,label:'1 adet (25g)'},{name:'3 adet',g:75,label:'3 adet (75g)'});
  else if(n.includes('trail mix')||n.includes('kuru meyve karışımı')) u.unshift({name:'1 avuç',g:30,label:'1 avuç (30g)'},{name:'1 paket',g:50,label:'1 paket (50g)'});
  else if(n.includes('tatlı patates')) u.unshift({name:'1 orta',g:130,label:'1 orta (130g)'},{name:'1 büyük',g:200,label:'1 büyük (200g)'});
  else if(n.includes('edamame')) u.unshift({name:'1 porsiyon',g:80,label:'1 porsiyon (80g)'});
  else if(n.includes('tofu')) u.unshift({name:'½ paket',g:150,label:'½ paket (150g)'},{name:'1 paket',g:300,label:'1 paket (300g)'});
  else if(n.includes('tempeh')) u.unshift({name:'1 porsiyon',g:100,label:'1 porsiyon (100g)'});
  else if(n.includes('cottage')||n.includes('quark')||n.includes('skyr')) u.unshift({name:'1 kase',g:150,label:'1 kase (150g)'});
  else if(n.includes('kakao tozu')||n.includes('zerdeçal')||n.includes('zencefil tozu')) u.unshift({name:'1 çay kaşığı',g:3,label:'1 çk (3g)'},{name:'1 yemek kaşığı',g:8,label:'1 yk (8g)'});
  else if(n.includes('yumurta akı')) u.unshift({name:'1 adet',g:33,label:'1 adet (33g)'},{name:'3 adet',g:99,label:'3 adet (99g)'});

  else if(food.cat==='et'||food.cat==='fastfood') u.unshift({name:'1 porsiyon',g:150,label:'1 porsiyon (150g)'});
  else if(food.cat==='hamur') u.unshift({name:'1 porsiyon',g:150,label:'1 porsiyon (150g)'},{name:'1 adet',g:100,label:'1 adet (100g)'});

  // Sadece uygun kategorilere ek birimler
  if(food.cat==='sos'||food.cat==='kahvalti'&&(n.includes('bal')||n.includes('reçel')||n.includes('pekmez')||n.includes('tereyağ'))){
    if(!u.some(x=>x.name.includes('çay kaşığı')))u.push({name:'1 çay kaşığı',g:3,label:'1 çk (3g)'});
    if(!u.some(x=>x.name.includes('yemek kaşığı')))u.push({name:'1 yemek kaşığı',g:15,label:'1 yk (15g)'});
  }
  u.push({name:'50g',g:50,label:'50g'},{name:'150g',g:150,label:'150g'},{name:'250g',g:250,label:'250g'});
  return u;
}

let currentUnit = 'gram';
let currentUnits = [];
let currentUnitG = 100; // grams per unit for qty calc

function selectApiFood(f){
  pendingFood={name:f.name,emoji:'🌍',cal:f.cal,prot:f.prot,carb:f.carb,fat:f.fat,portion:100,cat:'api'};
  // Auto-save to Firebase DB if not already there (crowd-sourced DB growth)
  autoSaveToFoodDB(f);
  closeModal();openPortionModal();
}

function autoSaveToFoodDB(f){
  if(!f||!f.name||!f.cal)return;
  var nameL=f.name.toLowerCase().trim();
  // Check if already in local DB
  if(FOOD_DB.some(function(x){return x.name.toLowerCase().trim()===nameL;}))return;
  // Determine category
  var cat=guessFoodCategory(f.name);
  var newFood={name:f.name,emoji:f.emoji||'🌍',cal:Math.round(f.cal)||0,prot:Math.round(f.prot)||0,carb:Math.round(f.carb)||0,fat:Math.round(f.fat)||0,cat:cat};
  // Add to local FOOD_DB immediately
  FOOD_DB.push(newFood);
  rebuildSearchIndex();
  // Save to Firebase in background (if logged in)
  if(typeof db!=='undefined'&&currentUser){
    try{
      db.collection('crowd_foods').doc(nameL.replace(/[\/\.]/g,'_').substring(0,100)).set({
        ...newFood,addedBy:currentUser.uid,addedAt:Date.now()
      }).catch(function(){});
    }catch(e){}
  }
}

function guessFoodCategory(name){
  var n=(name||'').toLowerCase();
  if(n.includes('süt')||n.includes('yoğurt')||n.includes('peynir')||n.includes('ayran')||n.includes('kefir'))return 'sut';
  if(n.includes('çorba')||n.includes('soup'))return 'corba';
  if(n.includes('et')||n.includes('tavuk')||n.includes('köfte')||n.includes('kebap')||n.includes('döner')||n.includes('sucuk'))return 'et';
  if(n.includes('balık')||n.includes('somon')||n.includes('ton')||n.includes('karides'))return 'balik';
  if(n.includes('makarna')||n.includes('pilav')||n.includes('bulgur')||n.includes('noodle'))return 'pilav';
  if(n.includes('börek')||n.includes('pide')||n.includes('gözleme')||n.includes('simit'))return 'hamur';
  if(n.includes('çikolata')||n.includes('gofret')||n.includes('bisküvi')||n.includes('cips')||n.includes('kraker'))return 'atistirmalik';
  if(n.includes('meyve')||n.includes('elma')||n.includes('muz')||n.includes('portakal'))return 'meyve';
  if(n.includes('sebze')||n.includes('salata'))return 'sebze';
  if(n.includes('su ')||n.includes('cola')||n.includes('kola')||n.includes('çay')||n.includes('kahve')||n.includes('juice'))return 'icecek';
  if(n.includes('baklava')||n.includes('tatlı')||n.includes('helva')||n.includes('dondurma'))return 'tatli';
  if(n.includes('nohut')||n.includes('mercimek')||n.includes('fasulye'))return 'baklagil';
  if(n.includes('fıstık')||n.includes('ceviz')||n.includes('badem')||n.includes('fındık'))return 'kuruyemis';
  if(n.includes('sos')||n.includes('ketçap')||n.includes('mayonez'))return 'sos';
  return 'ambalajli';
}
function selectDbFood(name){pendingFood=FOOD_DB.find(f=>f.name===name);if(!pendingFood)return;pendingFood={...pendingFood,portion:100};closeModal();openPortionModal()}

function openPortionModal(){
  // Emoji göster
  document.getElementById('portionEmoji').textContent=pendingFood.emoji||'🍽️';
  // Fotoğraf container'ı sıfırla
  const pImg=document.getElementById('portionImg');
  const pBox=document.getElementById('portionPhotoImg');
  const pSpin=document.getElementById('portionPhotoSpinner');
  if(pImg){pImg.src='';pImg.onload=null;pImg.onerror=null;}
  if(pBox)pBox.style.display='none';
  if(pSpin)pSpin.style.display='none';
  // Yemek fotoğrafını yükle
  loadFoodPhotoForPortion(pendingFood.name,pendingFood.emoji||'🍽️');
  document.getElementById('portionFoodName').textContent=pendingFood.name;
  document.getElementById('portionFoodBase').textContent=`100g başına: ${pendingFood.cal} kcal`;

  currentUnits=getUnitsForFood(pendingFood);
  currentUnit=currentUnits[0].name;
  currentUnitG=currentUnits[0].g;

  const container=document.getElementById('unitButtons');
  container.innerHTML=currentUnits.map((u,i)=>`<button class="unit-btn ${i===0?'active':''}" onclick="selectUnit(${i})">${u.label}</button>`).join('');


  const hasQtyUnit = currentUnits[0].name !== 'gram';
  document.getElementById('qtyRow').style.display = hasQtyUnit ? 'flex' : 'none';
  document.getElementById('qtyInput').value = 1;
  document.getElementById('qtyLabel').textContent = currentUnits[0].name !== 'gram' ? currentUnits[0].name : '';

  document.getElementById('portionInput').value=currentUnits[0].g;
  document.getElementById('portionUnit').textContent='gram';
  // Kaydırmalı hızlı gram seçici
  populatePortionScroller(currentUnits[0].g);
  updatePortionPreview();
  document.getElementById('portionModal').classList.add('show');
}

function adjustPortion(delta){
  var inp=document.getElementById('portionInput');
  var val=parseFloat(inp.value)||100;
  val=Math.max(1,Math.round(val+delta));
  inp.value=val;
  highlightScrollPicker(val);
  updatePortionPreview();
}

function populatePortionScroller(activeG){
  var gramWheel=document.getElementById('portionWheelGram');
  var unitWheel=document.getElementById('portionWheelUnit');
  if(!gramWheel)return;
  var values=[];for(var i=1;i<=500;i++)values.push(i);
  var itemH=40;
  gramWheel.innerHTML=values.map(function(g){
    return '<div data-g="'+g+'" style="height:'+itemH+'px;display:flex;align-items:center;justify-content:center;font-family:inherit;font-size:.95rem;font-weight:600;color:var(--text2);scroll-snap-align:center;cursor:pointer;flex-shrink:0;opacity:.3" onclick="setPortionFromScroll('+g+')">'+g+'</div>';
  }).join('');
  if(unitWheel)populateUnitWheel();
  var rounded=Math.round(activeG);
  setTimeout(function(){
    var t=gramWheel.querySelector('[data-g="'+rounded+'"]');
    if(t)gramWheel.scrollTop=t.offsetTop-70;
    highlightWheelCenter(gramWheel);
  },50);
  var sT=null;
  gramWheel.onscroll=function(){
    highlightWheelCenter(gramWheel);
    clearTimeout(sT);sT=setTimeout(function(){
      var g=getCenterValue(gramWheel);
      if(g>0){document.getElementById('portionInput').value=g;updatePortionPreview();}
    },100);
  };
}
function populateUnitWheel(){
  var w=document.getElementById('portionWheelUnit');
  if(!w||!currentUnits)return;
  w.innerHTML=currentUnits.map(function(u,i){
    return '<div data-uidx="'+i+'" style="height:40px;display:flex;align-items:center;justify-content:center;font-family:inherit;font-size:.82rem;font-weight:600;color:var(--text2);scroll-snap-align:center;cursor:pointer;flex-shrink:0;opacity:.3;text-align:center;padding:0 6px" onclick="selectUnitFromWheel('+i+')">'+u.label+'</div>';
  }).join('');
  setTimeout(function(){highlightWheelCenter(w);},50);
  var sT2=null;
  w.onscroll=function(){
    highlightWheelCenter(w);
    clearTimeout(sT2);sT2=setTimeout(function(){
      var idx=getCenterUnitIdx(w);
      if(idx>=0)selectUnitFromWheel(idx);
    },100);
  };
}
function selectUnitFromWheel(idx){
  if(!currentUnits||!currentUnits[idx])return;
  var u=currentUnits[idx];
  currentUnit=u.name;currentUnitG=u.g;
  var isGram=u.name==='gram';
  document.getElementById('qtyRow').style.display=isGram?'none':'flex';
  document.getElementById('qtyInput').value=1;
  document.getElementById('qtyLabel').textContent=isGram?'':u.name;
  document.getElementById('portionInput').value=u.g;
  document.getElementById('portionUnit').textContent='gram';
  document.querySelectorAll('.unit-btn').forEach(function(b,i){b.classList.toggle('active',i===idx);});
  var gw=document.getElementById('portionWheelGram');
  if(gw){var t=gw.querySelector('[data-g="'+Math.round(u.g)+'"]');if(t)gw.scrollTo({top:t.offsetTop-70,behavior:'smooth'});}
  updatePortionPreview();
}
function getCenterValue(wheel){
  var cY=wheel.scrollTop+90;var cl=null;var cd=999;
  wheel.querySelectorAll('[data-g]').forEach(function(el){var d=Math.abs(el.offsetTop+20-cY);if(d<cd){cd=d;cl=el;}});
  return cl?parseInt(cl.getAttribute('data-g')):0;
}
function getCenterUnitIdx(wheel){
  var cY=wheel.scrollTop+90;var cl=null;var cd=999;
  wheel.querySelectorAll('[data-uidx]').forEach(function(el){var d=Math.abs(el.offsetTop+20-cY);if(d<cd){cd=d;cl=el;}});
  return cl?parseInt(cl.getAttribute('data-uidx')):-1;
}
function highlightWheelCenter(wheel){
  var cY=wheel.scrollTop+90;
  var isG=!!wheel.querySelector('[data-g]');
  var attr=isG?'data-g':'data-uidx';
  wheel.querySelectorAll('['+attr+']').forEach(function(el){
    var d=Math.abs(el.offsetTop+20-cY);
    if(d<22){el.style.color='var(--accent)';el.style.fontSize=isG?'1.3rem':'1rem';el.style.fontWeight='800';el.style.opacity='1';}
    else if(d<60){el.style.color='var(--text)';el.style.fontSize=isG?'1rem':'.85rem';el.style.fontWeight='600';el.style.opacity='.6';}
    else{el.style.color='var(--text2)';el.style.fontSize=isG?'.85rem':'.75rem';el.style.fontWeight='500';el.style.opacity='.25';}
  });
}
function setPortionFromScroll(g){
  document.getElementById('portionInput').value=g;
  var w=document.getElementById('portionWheelGram');
  if(w){var t=w.querySelector('[data-g="'+g+'"]');if(t)w.scrollTo({top:t.offsetTop-70,behavior:'smooth'});}
  updatePortionPreview();
}
function highlightScrollPicker(g){
  var w=document.getElementById('portionWheelGram');if(!w)return;
  var r=Math.round(g);var t=w.querySelector('[data-g="'+r+'"]');
  if(t)w.scrollTo({top:t.offsetTop-70,behavior:'smooth'});
}

function selectUnit(idx){
  const u=currentUnits[idx];
  currentUnit=u.name;
  currentUnitG=u.g;

  const isGram = u.name === 'gram';
  document.getElementById('qtyRow').style.display = isGram ? 'none' : 'flex';
  document.getElementById('qtyInput').value = 1;
  document.getElementById('qtyLabel').textContent = isGram ? '' : u.name;

  document.getElementById('portionInput').value=u.g;
  document.getElementById('portionUnit').textContent='gram';
  document.querySelectorAll('.unit-btn').forEach((b,i)=>b.classList.toggle('active',i===idx));
  updatePortionPreview();
}

function updateFromQty(){
  const qty=parseFloat(document.getElementById('qtyInput').value)||1;
  document.getElementById('portionInput').value=Math.round(currentUnitG*qty);
  updatePortionPreview();
}

function estimateMicros(food){
  const n=food.name.toLowerCase(),c=food.cat;
  let fiber=0,iron=0,calcium=0,vitC=0;
  if(c==='sebze'){fiber=3;iron=1.2;calcium=40;vitC=15}
  else if(c==='baklagil'){fiber=7;iron=2.5;calcium=50;vitC=2}
  else if(c==='meyve'){fiber=2;iron=0.3;calcium=15;vitC=25}
  else if(c==='kuruyemis'){fiber=4;iron=2;calcium=80;vitC=0}
  else if(c==='et'||c==='balik'){fiber=0;iron=2;calcium=15;vitC=0}
  else if(c==='sut'){fiber=0;iron=0.1;calcium=120;vitC=1}
  else if(c==='corba'){fiber=2;iron=0.8;calcium=25;vitC=3}
  else if(c==='pilav'||c==='hamur'){fiber=1;iron=0.8;calcium=15;vitC=0}
  else if(c==='kahvalti'){fiber=0.5;iron=0.5;calcium=40;vitC=2}
  else if(c==='tatli'){fiber=0.3;iron=0.4;calcium=20;vitC=0}
  else if(c==='sporcu'){fiber=1;iron=1;calcium=50;vitC=5}
  else{fiber=1;iron=0.5;calcium=20;vitC=1}
  if(n.includes('ıspanak')||n.includes('brokoli')){fiber=3;iron=2.7;calcium=100;vitC=30}
  if(n.includes('mercimek')||n.includes('nohut')){fiber=8;iron=3;calcium=55;vitC=2}
  if(n.includes('yumurta')){iron=1.8;calcium=50;vitC=0}
  if(n.includes('süt')){calcium=120;vitC=1}
  if(n.includes('yoğurt')){calcium=110;vitC=1}
  if(n.includes('peynir')){calcium=200}
  if(n.includes('portakal')||n.includes('limon')){vitC=50}
  if(n.includes('çilek')||n.includes('kivi')){vitC=60}
  if(n.includes('biber')){vitC=80}
  if(n.includes('somon')||n.includes('balık')){iron=0.8;calcium=15}
  return{fiber:Math.round(fiber*10)/10,iron:Math.round(iron*10)/10,calcium:Math.round(calcium),vitC:Math.round(vitC)};
}

function getFoodImg(food){
  return '';
}

// Türkçe yemek adını İngilizce arama sorgusuna çevir
const FOOD_TRANS={
  'tavuk':'chicken cooked food','tavuk sote':'chicken saute turkish food',
  'tavuk ızgara':'grilled chicken meal','tavuk haşlama':'boiled chicken soup',
  'köfte':'turkish meatballs kofta','adana kebap':'adana kebab turkish',
  'urfa kebap':'urfa kebab turkish','şiş kebap':'shish kebab grilled',
  'döner':'doner kebab turkish','iskender':'iskender kebab plate',
  'lahmacun':'lahmacun turkish flatbread','pide':'turkish pide bread cheese',
  'börek':'turkish borek pastry','gözleme':'gozleme turkish crepe',
  'menemen':'menemen turkish eggs','omlet':'omelette eggs cooked',
  'haşlanmış yumurta':'boiled egg halved','sahanda yumurta':'fried egg pan',
  'sucuk':'turkish sucuk sausage','pastırma':'pastirma cured meat',
  'beyaz peynir':'white feta cheese','kaşar':'yellow cheese slice',
  'mercimek çorbası':'lentil soup bowl','ezogelin çorbası':'turkish lentil soup',
  'domates çorbası':'tomato soup bowl','tavuk çorbası':'chicken noodle soup',
  'pirinç pilavı':'rice pilaf turkish','bulgur pilavı':'bulgur pilaf turkish',
  'makarna':'pasta dish plate','erişte':'turkish pasta noodle',
  'karnıyarık':'karniyarik stuffed eggplant','imam bayıldı':'imam bayildi eggplant',
  'patates':'potato dish cooked','patates kızartması':'french fries potato',
  'fasulye yemeği':'bean stew turkish','nohut yemeği':'chickpea stew turkish',
  'mercimek yemeği':'lentil dish cooked','kuru fasulye':'turkish bean stew',
  'somon':'salmon fillet cooked','levrek':'sea bass grilled',
  'hamsi':'anchovy fish turkish','çipura':'sea bream grilled fish',
  'midye':'mussels seafood','karides':'shrimp cooked seafood',
  'çoban salata':'turkish shepherd salad','mevsim salatası':'mixed green salad',
  'cacık':'tzatziki yogurt cucumber','yoğurt':'yogurt bowl white',
  'baklava':'baklava turkish dessert','künefe':'kunefe turkish dessert',
  'sütlaç':'rice pudding turkish','kazandibi':'kazandibi turkish pudding',
  'ayran':'ayran yogurt drink','çay':'turkish tea glass',
  'zeytin':'olives dish','bal':'honey jar','reçel':'fruit jam jar',
  'ekmek':'bread loaf sliced','tam buğday ekmeği':'whole wheat bread',
  'simit':'simit turkish bagel','elma':'apple fruit fresh',
  'muz':'banana fruit yellow','portakal':'orange fruit slice',
  'çilek':'strawberry fresh','üzüm':'grapes bunch',
  'beyti':'beyti kebab wrapped','fıstık ezmesi':'peanut butter jar',
  'granola':'granola bowl breakfast','yulaf ezmesi':'oatmeal porridge bowl',
};

function getFoodSearchQuery(name){
  const n=name.toLowerCase();
  // Önce tam eşleşme
  if(FOOD_TRANS[n]) return FOOD_TRANS[n];
  // Kısmi eşleşme
  for(const [tr,en] of Object.entries(FOOD_TRANS)){
    if(n.includes(tr)) return en;
  }
  // Fallback: kategori bazlı genel sorgu
  return name+' food dish cooked plate';
}

// Porsiyon modalı için fotoğraf yükle
function loadFoodPhotoForPortion(foodName,emoji){
  const spinner=document.getElementById('portionPhotoSpinner');
  const imgBox=document.getElementById('portionPhotoImg');
  const img=document.getElementById('portionImg');
  if(!spinner||!imgBox||!img)return;

  // Spinner göster
  spinner.style.display='flex';

  const query=getFoodSearchQuery(foodName);
  // Unsplash source — belirli boyut ve arama terimi
  const url='https://source.unsplash.com/150x150/?'+encodeURIComponent(query);

  img.onload=function(){
    spinner.style.display='none';
    imgBox.style.display='block';
  };
  img.onerror=function(){
    spinner.style.display='none';
    // Fallback: emoji kalır
  };
  img.src=url;
}

// Fotoğrafı büyüt — tam ekran overlay
function expandFoodPhoto(){
  var smallImg=document.getElementById('portionImg');
  if(!smallImg||!smallImg.src||document.getElementById('portionPhotoImg').style.display==='none') return;
  var foodName=document.getElementById('portionFoodName').textContent;
  var overlay=document.createElement('div');
  overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:500;display:flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(8px)';
  overlay.onclick=function(){overlay.remove();};
  var query=getFoodSearchQuery(foodName);
  var bigUrl='https://source.unsplash.com/600x400/?'+encodeURIComponent(query);
  var inner=document.createElement('div');
  inner.style.cssText='max-width:340px;width:90%;text-align:center';
  inner.onclick=function(e){e.stopPropagation();};
  var img=document.createElement('img');
  img.src=bigUrl;
  img.style.cssText='width:100%;border-radius:16px;max-height:60vh;object-fit:cover;box-shadow:0 20px 60px rgba(0,0,0,.5)';
  var title=document.createElement('div');
  title.style.cssText='margin-top:10px;font-weight:700;color:#fff;font-size:.9rem';
  title.textContent=foodName;
  var closeBtn=document.createElement('button');
  closeBtn.style.cssText='margin-top:10px;padding:8px 20px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.2);border-radius:8px;color:#fff;font-family:var(--font,system-ui);font-weight:600;font-size:.8rem;cursor:pointer';
  closeBtn.textContent='✕ Kapat';
  closeBtn.onclick=function(){overlay.remove();};
  inner.appendChild(img);
  inner.appendChild(title);
  inner.appendChild(closeBtn);
  overlay.appendChild(inner);
  document.body.appendChild(overlay);
}


function openFoodPhoto(foodName,emoji){
  const cleanName=foodName.replace(/\s*\(.*?\)/g,'').trim();
  const modal=document.createElement('div');
  modal.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.7);z-index:200;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(6px)';
  modal.onclick=()=>modal.remove();
  modal.innerHTML=`<div style="background:var(--card);border-radius:var(--radius);padding:20px;max-width:360px;width:90%;text-align:center;border:1px solid var(--border)" onclick="event.stopPropagation()">
    <div style="font-size:2.5rem;margin-bottom:8px">${emoji||'🍽️'}</div>
    <div style="font-weight:800;font-size:1rem;margin-bottom:12px">${foodName}</div>
    <div id="foodPhotoContainer" style="width:100%;min-height:180px;border-radius:var(--radius-sm);overflow:hidden;background:var(--glass);display:flex;align-items:center;justify-content:center">
      <div class="spinner"></div>
    </div>
    <button style="margin-top:12px;padding:10px 20px;background:var(--glass);border:1px solid var(--border);border-radius:10px;color:var(--text2);font-family:var(--font,system-ui);font-weight:700;font-size:.82rem;cursor:pointer;width:100%" onclick="this.closest('div[style*=fixed]').remove()">Kapat</button>
  </div>`;
  document.body.appendChild(modal);

  // Wikipedia API ile görsel ara
  fetchFoodPhoto(cleanName);
}

async function fetchFoodPhoto(name){
  const container=document.getElementById('foodPhotoContainer');
  if(!container)return;

  // Türkçe Wikipedia'dan dene
  const queries=[name,name+' (yemek)',name+' yemeği'];
  for(const q of queries){
    try{
      const url=`https://tr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`;
      const res=await fetch(url);
      if(res.ok){
        const data=await res.json();
        if(data.thumbnail&&data.thumbnail.source){
          const imgUrl=data.thumbnail.source.replace(/\/\d+px-/,'/400px-');
          container.innerHTML=`<img src="${imgUrl}" style="width:100%;max-height:280px;object-fit:cover;border-radius:var(--radius-sm)" onerror="this.parentElement.innerHTML='<div style=\\'padding:20px;color:var(--text2);font-size:.82rem\\'>📷 Görsel bulunamadı</div>'">`;
          if(data.extract){
            container.innerHTML+=`<div style="padding:10px;font-size:.72rem;color:var(--text2);text-align:left;line-height:1.5;max-height:80px;overflow:hidden">${data.extract.substring(0,200)}${data.extract.length>200?'...':''}</div>`;
          }
          return;
        }
      }
    }catch(e){}
  }

  // İngilizce Wikipedia dene
  const enNames={
    'mercimek çorbası':'Lentil soup','karnıyarık':'Karnıyarık','baklava':'Baklava','döner':'Doner kebab',
    'köfte':'Köfte','pilav':'Pilaf','lahmacun':'Lahmacun','mantı':'Mantı','kebap':'Kebab',
    'cacık':'Cacık','ayran':'Ayran','börek':'Börek','künefe':'Künefe','sütlaç':'Sütlaç',
    'iskender':'İskender kebap','gözleme':'Gözleme','pide':'Pide','çorba':'Soup','dolma':'Dolma',
    'sarma':'Sarma','imam bayıldı':'İmam bayıldı','menemen':'Menemen','sucuk':'Sucuk',
    'tavuk':'Chicken','bulgur':'Bulgur','makarna':'Pasta','çoban salata':'Çoban salatası',
    'somon':'Salmon','levrek':'European seabass','hamsi':'Anchovy','midye':'Mussel',
    'adana kebap':'Adana kebabı','urfa kebap':'Urfa kebab','beyti':'Beyti kebab'
  };
  const nl=name.toLowerCase();
  const enKey=Object.keys(enNames).find(k=>nl.includes(k));
  if(enKey){
    try{
      const url=`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(enNames[enKey])}`;
      const res=await fetch(url);
      if(res.ok){
        const data=await res.json();
        if(data.thumbnail&&data.thumbnail.source){
          const imgUrl=data.thumbnail.source.replace(/\/\d+px-/,'/400px-');
          container.innerHTML=`<img src="${imgUrl}" style="width:100%;max-height:280px;object-fit:cover;border-radius:var(--radius-sm)" onerror="this.parentElement.innerHTML='<div style=\\'padding:20px;color:var(--text2);font-size:.82rem\\'>📷 Görsel bulunamadı</div>'">`;
          return;
        }
      }
    }catch(e){}
  }

  container.innerHTML='<div style="padding:30px;color:var(--text2);font-size:.82rem">📷 Bu yemek için görsel bulunamadı</div>';
}

function updatePortionPreview(){if(!pendingFood)return;const g=parseFloat(document.getElementById('portionInput').value)||0;const r=g/100;const m=estimateMicros(pendingFood);document.getElementById('portionPreview').innerHTML=`<span><div class="pv-val">${Math.round(pendingFood.cal*r)}</div>kcal</span><span><div class="pv-val">${Math.round(pendingFood.prot*r)}g</div>Protein</span><span><div class="pv-val">${Math.round(pendingFood.carb*r)}g</div>Karb</span><span><div class="pv-val">${Math.round(pendingFood.fat*r)}g</div>Yağ</span>`+`<div style="width:100%;display:flex;justify-content:space-around;padding-top:6px;margin-top:4px;border-top:1px solid var(--border);font-size:.68rem;color:var(--text2)"><span>🥬 Lif: ${(m.fiber*r).toFixed(1)}g</span><span>🩸 Demir: ${(m.iron*r).toFixed(1)}mg</span><span>🦴 Ca: ${Math.round(m.calcium*r)}mg</span><span>🍊 C: ${Math.round(m.vitC*r)}mg</span></div>`}

function confirmPortion(){
  if(!pendingFood||!currentMealId)return;
  const g=sanitizeNumber(document.getElementById('portionInput').value, 1, 5000, 100);
  const r=g/100;
  const qty=sanitizeNumber(document.getElementById('qtyInput').value, 0.1, 100, 1);
  const unitLabel=currentUnit!=='gram'?` (${qty>1?qty+'x ':''}${currentUnit})`:'';
  const food={name:pendingFood.name,emoji:pendingFood.emoji,cal:pendingFood.cal*r,prot:pendingFood.prot*r,carb:pendingFood.carb*r,fat:pendingFood.fat*r,fiber:Math.round((pendingFood.fiber||0)*r*10)/10,sodium:Math.round((pendingFood.sodium||0)*r),portionUsed:g};
  const savedMealId=currentMealId;
  const savedFoodName=food.name;
  const savedEmoji=food.emoji||'🍽️';

  // 1. Önce modalı kapat — animasyon akıcı hissettirsin
  closePortionModal();

  // 2. Veriyi kaydet (localStorage, senkron)
  const data=getDayData();
  data[savedMealId].push(food);
  saveDayData(null,data);
  trackFoodUsage(pendingFood||food,g);

  // 3. UI'ı hemen güncelle
  renderMeals();
  updateHeader();

  // 4. Toast feedback
  showToast(`${savedEmoji} ${escHTML(savedFoodName)}${unitLabel} eklendi — ${Math.round(food.cal)} kcal`);
}

function closePortionModal(){document.getElementById('portionModal').classList.remove('show');pendingFood=null}
function addCustomFood(){const name=sanitizeString(document.getElementById('customName').value,100);const cal=sanitizeNumber(document.getElementById('customCal').value,0,9999,0);const prot=sanitizeNumber(document.getElementById('customProt').value,0,999,0);const carb=sanitizeNumber(document.getElementById('customCarb').value,0,999,0);const fat=sanitizeNumber(document.getElementById('customFat').value,0,999,0);const portion=sanitizeNumber(document.getElementById('customPortion').value,1,5000,100);if(!name){showToast('⚠️ Yemek adı girin');return}if(!cal){showToast('⚠️ Kalori değeri girin');return}const food={name,emoji:'✏️',cal,prot,carb,fat,portionUsed:portion};const data=getDayData();data[currentMealId].push(food);saveDayData(null,data);trackFoodUsage({name,emoji:'✏️',cal:cal*(100/portion),prot:prot*(100/portion),carb:carb*(100/portion),fat:fat*(100/portion)},portion);closeModal();renderMeals();updateHeader();showToast(`✅ ${escHTML(name)} eklendi!`)}

function removeFood(mealId,idx){const data=getDayData();const rm=data[mealId].splice(idx,1)[0];saveDayData(null,data);renderMeals();updateHeader();showToast(`🗑️ ${rm.name} silindi`)}
let editMealId=null,editFoodIdx=null,editBaseFood=null;

function openEditFood(mealId,idx){
  const data=getDayData();
  const food=data[mealId][idx];
  if(!food)return;
  editMealId=mealId;
  editFoodIdx=idx;
  const dbFood=FOOD_DB.find(f=>f.name===food.name);
  if(dbFood){
    editBaseFood={cal:dbFood.cal,prot:dbFood.prot,carb:dbFood.carb,fat:dbFood.fat};
  }else{
    const g=food.portionUsed||100;
    const r=100/g;
    editBaseFood={cal:food.cal*r,prot:food.prot*r,carb:food.carb*r,fat:food.fat*r};
  }
  document.getElementById('editEmoji').textContent=food.emoji||'🍽️';
  document.getElementById('editFoodName').textContent=food.name;
  document.getElementById('editFoodInfo').textContent='100g başına: '+Math.round(editBaseFood.cal)+' kcal · P '+Math.round(editBaseFood.prot)+'g K '+Math.round(editBaseFood.carb)+'g Y '+Math.round(editBaseFood.fat)+'g';
  document.getElementById('editPortionInput').value=Math.round(food.portionUsed||100);
  // Makro inputlarını doldur
  var bp=document.getElementById('editBaseProt');
  var bc=document.getElementById('editBaseCarb');
  var bf=document.getElementById('editBaseFat');
  if(bp) bp.value=Math.round(editBaseFood.prot*10)/10;
  if(bc) bc.value=Math.round(editBaseFood.carb*10)/10;
  if(bf) bf.value=Math.round(editBaseFood.fat*10)/10;
  // Makro paneli gizli başlasın
  var panel=document.getElementById('editMacroPanel');
  if(panel) panel.style.display='none';
  var btn=document.getElementById('editMacroToggleBtn');
  if(btn) btn.textContent='⚙️ Makroları manuel düzenle ▾';
  updateEditPreview();
  var modal=document.getElementById('editFoodModal');
  modal.style.cssText='';
  modal.classList.add('show');
}

function toggleEditMacros(){
  var panel=document.getElementById('editMacroPanel');
  var btn=document.getElementById('editMacroToggleBtn');
  if(!panel)return;
  var open=panel.style.display==='none';
  panel.style.display=open?'block':'none';
  if(btn) btn.textContent=open?'⚙️ Makroları manuel düzenle ▲':'⚙️ Makroları manuel düzenle ▾';
}

function onEditMacroChange(){
  var pEl=document.getElementById('editBaseProt');
  var cEl=document.getElementById('editBaseCarb');
  var fEl=document.getElementById('editBaseFat');
  if(!pEl||!cEl||!fEl||!editBaseFood)return;
  var p=parseFloat(pEl.value)||0;
  var c=parseFloat(cEl.value)||0;
  var f=parseFloat(fEl.value)||0;
  var newCal=Math.round(p*4+c*4+f*9);
  editBaseFood.prot=p;
  editBaseFood.carb=c;
  editBaseFood.fat=f;
  editBaseFood.cal=newCal;
  var res=document.getElementById('editMacroCalResult');
  if(res) res.textContent='100g = '+newCal+' kcal (P×4 + K×4 + Y×9)';
  document.getElementById('editFoodInfo').textContent='100g başına: '+newCal+' kcal · P '+p+'g K '+c+'g Y '+f+'g';
  updateEditPreview();
}

function updateEditPreview(){
  if(!editBaseFood)return;
  const g=parseFloat(document.getElementById('editPortionInput').value)||0;
  const r=g/100;
  document.getElementById('editPreview').innerHTML=`<span><div class="pv-val">${Math.round(editBaseFood.cal*r)}</div>kcal</span><span><div class="pv-val">${Math.round(editBaseFood.prot*r)}g</div>Protein</span><span><div class="pv-val">${Math.round(editBaseFood.carb*r)}g</div>Karb</span><span><div class="pv-val">${Math.round(editBaseFood.fat*r)}g</div>Yağ</span>`;
}

function saveEditFood(){
  if(editMealId===null||editFoodIdx===null)return;
  const g=parseFloat(document.getElementById('editPortionInput').value)||100;
  const r=g/100;
  const data=getDayData();
  const food=data[editMealId][editFoodIdx];
  food.cal=editBaseFood.cal*r;
  food.prot=editBaseFood.prot*r;
  food.carb=editBaseFood.carb*r;
  food.fat=editBaseFood.fat*r;
  food.portionUsed=g;
  saveDayData(null,data);
  closeEditFood();
  renderMeals();
  updateHeader();
  showToast(`✏️ ${food.name} güncellendi (${Math.round(g)}g)`);
}

function deleteEditFood(){
  if(editMealId===null||editFoodIdx===null)return;
  const data=getDayData();
  const rm=data[editMealId].splice(editFoodIdx,1)[0];
  saveDayData(null,data);
  closeEditFood();
  renderMeals();
  updateHeader();
  showToast(`🗑️ ${rm.name} silindi`);
}

function closeEditFood(){
  document.getElementById('editFoodModal').classList.remove('show');
  editMealId=null;editFoodIdx=null;editBaseFood=null;
}
function getFoodFreq(){const raw=localStorage.getItem('fs_food_freq');return raw?JSON.parse(raw):{}}
function getFoodRecent(){const raw=localStorage.getItem('fs_food_recent');return raw?JSON.parse(raw):[]}

function trackFoodUsage(food,portionG){

  const freq=getFoodFreq();
  const key=food.name;
  if(!freq[key]){
    freq[key]={name:food.name,emoji:food.emoji||'🍽️',cal:food.cal,prot:food.prot,carb:food.carb,fat:food.fat,count:0,lastPortion:portionG};
  }
  freq[key].count++;
  freq[key].lastPortion=portionG;
  freq[key].lastUsed=Date.now();
  localStorage.setItem('fs_food_freq',JSON.stringify(freq));


  let recent=getFoodRecent();
  recent=recent.filter(r=>r.name!==food.name);
  recent.unshift({name:food.name,emoji:food.emoji||'🍽️',cal:food.cal,prot:food.prot,carb:food.carb,fat:food.fat,portion:portionG,time:Date.now()});
  if(recent.length>30)recent=recent.slice(0,30);
  localStorage.setItem('fs_food_recent',JSON.stringify(recent));
}

function renderFreqFoods(){
  const freq=getFoodFreq();
  const q=(document.getElementById('foodSearch').value||'').toLowerCase().trim();
  let sorted=Object.values(freq).sort((a,b)=>b.count-a.count);
  if(q)sorted=sorted.filter(f=>f.name.toLowerCase().includes(q));
  const list=document.getElementById('freqList');
  if(!sorted.length){list.innerHTML='<div style="padding:20px;text-align:center;color:var(--text2);font-size:.82rem">Henüz yemek eklemedin ⭐</div>';return}
  list.innerHTML=sorted.slice(0,25).map(f=>{
    const badge=f.count>=10?'🔥':f.count>=5?'⭐':'';
    return`<div class="food-db-item" onclick="selectFreqFood('${f.name.replace(/'/g,"\\'")}')"><span class="fdb-emoji">${f.emoji}</span><div class="fdb-info"><div class="fdb-name">${f.name} ${badge}</div><div class="fdb-detail">P:${Math.round(f.prot)}g K:${Math.round(f.carb)}g Y:${Math.round(f.fat)}g • ${f.count}x</div></div><div class="fdb-cal">${Math.round(f.cal)}</div></div>`;
  }).join('')+'<div style="text-align:center;padding:8px"><button onclick="if(confirm(\'Sık kullanılanlar temizlensin mi?\')){localStorage.removeItem(\'fs_food_freq\');renderFreqFoods()}" style="font-family:DM Sans;font-size:.72rem;color:var(--red);background:none;border:1px solid var(--red);border-radius:6px;padding:4px 12px;cursor:pointer">🗑️ Listeyi Temizle</button></div>';
}
function renderRecentFoods(){
  const recent=getFoodRecent();
  const q=(document.getElementById('foodSearch').value||'').toLowerCase().trim();
  let filtered=recent;
  if(q)filtered=filtered.filter(f=>f.name.toLowerCase().includes(q));
  const list=document.getElementById('recentList');
  if(!filtered.length){list.innerHTML='<div style="padding:20px;text-align:center;color:var(--text2);font-size:.82rem">Henüz geçmiş yok 🕐</div>';return}
  list.innerHTML=filtered.slice(0,25).map(f=>{
    const ago=getTimeAgo(f.time);
    return`<div class="food-db-item" onclick="selectFreqFood('${f.name.replace(/'/g,"\\'")}')"><span class="fdb-emoji">${f.emoji}</span><div class="fdb-info"><div class="fdb-name">${escHTML(f.name)}</div><div class="fdb-detail">P:${Math.round(f.prot)}g K:${Math.round(f.carb)}g Y:${Math.round(f.fat)}g • ${ago}</div></div><div class="fdb-cal">${Math.round(f.cal)}</div></div>`;
  }).join('')+'<div style="text-align:center;padding:8px"><button onclick="if(confirm(\'Geçmiş temizlensin mi?\')){localStorage.removeItem(\'fs_food_recent\');renderRecentFoods()}" style="font-family:DM Sans;font-size:.72rem;color:var(--red);background:none;border:1px solid var(--red);border-radius:6px;padding:4px 12px;cursor:pointer">🗑️ Geçmişi Temizle</button></div>';
}

function renderFavFoods(){
  var favNames=typeof getFavFoods==='function'?getFavFoods():JSON.parse(localStorage.getItem('fs_fav_foods')||'[]');
  var q=(document.getElementById('foodSearch').value||'').toLowerCase().trim();
  var list=document.getElementById('favList');
  if(!list)return;
  if(!favNames.length){list.innerHTML='<div style="padding:20px;text-align:center;color:var(--text2);font-size:.82rem">Henüz favori yemeğin yok ❤️<br><span style="font-size:.72rem">Yemek veya tarif detayında kalp ikonuna bas!</span></div>';return}
  var items=[];
  favNames.forEach(function(name){
    var f=FOOD_DB.find(function(d){return d.name===name});
    if(f)items.push(f);
    else items.push({name:name,emoji:'🍽️',cal:0,prot:0,carb:0,fat:0});
  });
  if(q)items=items.filter(function(f){return f.name.toLowerCase().includes(q)});
  list.innerHTML=items.map(function(f){
    return'<div class="food-db-item" style="position:relative" onclick="selectFreqFood(\''+f.name.replace(/'/g,"\\'")+'\')">'
      +'<span class="fdb-emoji">'+(f.emoji||'🍽️')+'</span>'
      +'<div class="fdb-info"><div class="fdb-name">'+escHTML(f.name)+'</div><div class="fdb-detail">P:'+Math.round(f.prot)+'g K:'+Math.round(f.carb)+'g Y:'+Math.round(f.fat)+'g</div></div>'
      +'<div class="fdb-cal">'+Math.round(f.cal)+'</div>'
      +'<button onclick="event.stopPropagation();toggleFavFood(\''+f.name.replace(/'/g,"\\'")+'\');renderFavFoods()" style="background:none;border:none;font-size:1rem;cursor:pointer;padding:2px 4px;flex-shrink:0">❤️</button>'
      +'</div>';
  }).join('')+'<div style="text-align:center;padding:8px"><button onclick="if(confirm(\'Tüm favoriler temizlensin mi?\')){localStorage.removeItem(\'fs_fav_foods\');renderFavFoods()}" style="font-family:DM Sans;font-size:.72rem;color:var(--red);background:none;border:1px solid var(--red);border-radius:6px;padding:4px 12px;cursor:pointer">🗑️ Favorileri Temizle</button></div>';
}

function selectFreqFood(name){

  const dbFood=FOOD_DB.find(f=>f.name===name);
  if(dbFood){
    pendingFood={...dbFood,portion:100};
    closeModal();openPortionModal();return;
  }

  const freq=getFoodFreq();
  if(freq[name]){
    const f=freq[name];
    pendingFood={name:f.name,emoji:f.emoji,cal:f.cal,prot:f.prot,carb:f.carb,fat:f.fat,portion:100,cat:'custom'};
    closeModal();openPortionModal();return;
  }

  const recent=getFoodRecent().find(r=>r.name===name);
  if(recent){
    pendingFood={name:recent.name,emoji:recent.emoji,cal:recent.cal,prot:recent.prot,carb:recent.carb,fat:recent.fat,portion:100,cat:'custom'};
    closeModal();openPortionModal();
  }
}

function getTimeAgo(ts){
  const diff=Date.now()-ts;
  const mins=Math.floor(diff/60000);
  if(mins<1)return 'az önce';
  if(mins<60)return mins+' dk önce';
  const hrs=Math.floor(mins/60);
  if(hrs<24)return hrs+' saat önce';
  const days=Math.floor(hrs/24);
  if(days===1)return 'dün';
  if(days<7)return days+' gün önce';
  return Math.floor(days/7)+' hafta önce';
}

// ========== PER-MEAL TEMPLATES ==========
function getMealTemplates(){const raw=localStorage.getItem('fs_meal_tpls');return raw?JSON.parse(raw):[]}
function setMealTemplates(t){localStorage.setItem('fs_meal_tpls',JSON.stringify(t))}
