/* FitSofra — Restoran/Zincir Menü Veritabanı
 * Türkiye'deki popüler restoran ve kafe zincirlerinin makro değerleri.
 * Değerler resmi nutrition info'lara dayanan yaklaşık değerlerdir;
 * kesin bilgi için marka web sitesine bakınız.
 *
 * Format: { name, emoji, cal, prot, carb, fat, cat:'restoran', brand, portion }
 * FOOD_DB ile uyumlu. Üst yapı (food-search.js) "cat" üzerinden filtreliyor.
 */
window.RESTAURANT_DB = [

  // ═══ Burger King ═══
  {name:"Whopper (BK)",emoji:"🍔",cal:660,prot:28,carb:49,fat:40,cat:"restoran",brand:"Burger King",portion:"1 adet"},
  {name:"Whopper Jr (BK)",emoji:"🍔",cal:310,prot:17,carb:28,fat:15,cat:"restoran",brand:"Burger King",portion:"1 adet"},
  {name:"Chicken King (BK)",emoji:"🍗",cal:480,prot:30,carb:42,fat:20,cat:"restoran",brand:"Burger King",portion:"1 adet"},
  {name:"Tendercrisp (BK)",emoji:"🍗",cal:770,prot:33,carb:70,fat:39,cat:"restoran",brand:"Burger King",portion:"1 adet"},
  {name:"Patates - Orta (BK)",emoji:"🍟",cal:380,prot:4,carb:50,fat:17,cat:"restoran",brand:"Burger King",portion:"orta boy"},

  // ═══ McDonald's ═══
  {name:"Big Mac (McD)",emoji:"🍔",cal:540,prot:25,carb:46,fat:28,cat:"restoran",brand:"McDonald's",portion:"1 adet"},
  {name:"Big Tasty (McD)",emoji:"🍔",cal:840,prot:40,carb:52,fat:50,cat:"restoran",brand:"McDonald's",portion:"1 adet"},
  {name:"McChicken (McD)",emoji:"🍔",cal:360,prot:14,carb:40,fat:16,cat:"restoran",brand:"McDonald's",portion:"1 adet"},
  {name:"Cheeseburger (McD)",emoji:"🍔",cal:300,prot:15,carb:33,fat:13,cat:"restoran",brand:"McDonald's",portion:"1 adet"},
  {name:"McNuggets (6'lı)",emoji:"🍗",cal:280,prot:14,carb:18,fat:17,cat:"restoran",brand:"McDonald's",portion:"6 adet"},
  {name:"Patates - Orta (McD)",emoji:"🍟",cal:320,prot:4,carb:42,fat:15,cat:"restoran",brand:"McDonald's",portion:"orta boy"},

  // ═══ KFC ═══
  {name:"Zinger Burger (KFC)",emoji:"🍔",cal:470,prot:26,carb:50,fat:21,cat:"restoran",brand:"KFC",portion:"1 adet"},
  {name:"Twister (KFC)",emoji:"🌯",cal:540,prot:25,carb:53,fat:26,cat:"restoran",brand:"KFC",portion:"1 adet"},
  {name:"Original Tenders (3'lü)",emoji:"🍗",cal:380,prot:36,carb:10,fat:22,cat:"restoran",brand:"KFC",portion:"3 adet"},
  {name:"Wing - Kanat (1)",emoji:"🍗",cal:130,prot:11,carb:3,fat:9,cat:"restoran",brand:"KFC",portion:"1 adet"},

  // ═══ Popeyes ═══
  {name:"Chicken Sandwich (Popeyes)",emoji:"🍔",cal:700,prot:28,carb:50,fat:42,cat:"restoran",brand:"Popeyes",portion:"1 adet"},
  {name:"Chicken Tenders (3'lü)",emoji:"🍗",cal:350,prot:32,carb:12,fat:20,cat:"restoran",brand:"Popeyes",portion:"3 adet"},
  {name:"Cajun Fries (orta)",emoji:"🍟",cal:310,prot:4,carb:42,fat:15,cat:"restoran",brand:"Popeyes",portion:"orta boy"},

  // ═══ Domino's Pizza ═══
  {name:"Margherita Pizza - 1 dilim",emoji:"🍕",cal:200,prot:9,carb:28,fat:6,cat:"restoran",brand:"Domino's",portion:"1 dilim (orta boy)"},
  {name:"Pepperoni Pizza - 1 dilim",emoji:"🍕",cal:230,prot:10,carb:27,fat:9,cat:"restoran",brand:"Domino's",portion:"1 dilim"},
  {name:"Süpreme Pizza - 1 dilim",emoji:"🍕",cal:250,prot:11,carb:28,fat:10,cat:"restoran",brand:"Domino's",portion:"1 dilim"},
  {name:"Tavuklu Pizza - 1 dilim (Domino's)",emoji:"🍕",cal:215,prot:13,carb:27,fat:6,cat:"restoran",brand:"Domino's",portion:"1 dilim"},

  // ═══ Pizza Hut ═══
  {name:"Margherita - 1 dilim (Pizza Hut)",emoji:"🍕",cal:220,prot:9,carb:30,fat:7,cat:"restoran",brand:"Pizza Hut",portion:"1 dilim"},
  {name:"Pepperoni - 1 dilim (Pizza Hut)",emoji:"🍕",cal:240,prot:10,carb:30,fat:9,cat:"restoran",brand:"Pizza Hut",portion:"1 dilim"},

  // ═══ Starbucks ═══
  {name:"Caffè Latte - Tall (Starbucks)",emoji:"☕",cal:130,prot:8,carb:13,fat:5,cat:"restoran",brand:"Starbucks",portion:"Tall (354ml)"},
  {name:"Cappuccino - Tall (Starbucks)",emoji:"☕",cal:90,prot:6,carb:9,fat:3,cat:"restoran",brand:"Starbucks",portion:"Tall"},
  {name:"Caffè Mocha - Tall (Starbucks)",emoji:"☕",cal:240,prot:10,carb:30,fat:9,cat:"restoran",brand:"Starbucks",portion:"Tall"},
  {name:"Caramel Macchiato - Tall",emoji:"☕",cal:200,prot:9,carb:27,fat:7,cat:"restoran",brand:"Starbucks",portion:"Tall"},
  {name:"Caramel Frappuccino - Tall",emoji:"🥤",cal:240,prot:3,carb:46,fat:6,cat:"restoran",brand:"Starbucks",portion:"Tall"},
  {name:"White Choc. Mocha - Tall",emoji:"☕",cal:290,prot:10,carb:38,fat:11,cat:"restoran",brand:"Starbucks",portion:"Tall"},
  {name:"Chai Tea Latte - Tall",emoji:"☕",cal:180,prot:6,carb:32,fat:4,cat:"restoran",brand:"Starbucks",portion:"Tall"},

  // ═══ Kahve Dünyası ═══
  {name:"Türk Kahvesi (sade)",emoji:"☕",cal:5,prot:0,carb:1,fat:0,cat:"restoran",brand:"Kahve Dünyası",portion:"1 fincan"},
  {name:"Cappuccino (KD)",emoji:"☕",cal:100,prot:6,carb:10,fat:4,cat:"restoran",brand:"Kahve Dünyası",portion:"medium"},
  {name:"Çikolatalı Milkshake (KD)",emoji:"🥤",cal:410,prot:10,carb:60,fat:15,cat:"restoran",brand:"Kahve Dünyası",portion:"medium"},
  {name:"Salep (KD)",emoji:"🥛",cal:240,prot:7,carb:42,fat:5,cat:"restoran",brand:"Kahve Dünyası",portion:"medium"},

  // ═══ Caffè Nero ═══
  {name:"Cappuccino - Regular (Nero)",emoji:"☕",cal:110,prot:7,carb:10,fat:4,cat:"restoran",brand:"Caffè Nero",portion:"Regular"},
  {name:"Caffè Latte - Regular (Nero)",emoji:"☕",cal:160,prot:10,carb:15,fat:6,cat:"restoran",brand:"Caffè Nero",portion:"Regular"},
  {name:"Hot Chocolate - Regular",emoji:"🍫",cal:320,prot:12,carb:38,fat:13,cat:"restoran",brand:"Caffè Nero",portion:"Regular"},

  // ═══ Espressolab ═══
  {name:"Latte (Espressolab)",emoji:"☕",cal:150,prot:8,carb:14,fat:6,cat:"restoran",brand:"Espressolab",portion:"medium 12oz"},
  {name:"Mocha (Espressolab)",emoji:"☕",cal:250,prot:10,carb:32,fat:9,cat:"restoran",brand:"Espressolab",portion:"medium"},
  {name:"Frappe (Espressolab)",emoji:"🥤",cal:280,prot:5,carb:42,fat:8,cat:"restoran",brand:"Espressolab",portion:"medium"},

  // ═══ Mado ═══
  {name:"Maraş Dondurma (1 top)",emoji:"🍦",cal:130,prot:3,carb:18,fat:5,cat:"restoran",brand:"Mado",portion:"1 top"},
  {name:"Künefe (Mado)",emoji:"🍯",cal:480,prot:12,carb:58,fat:20,cat:"restoran",brand:"Mado",portion:"1 porsiyon"},
  {name:"Mantı (Mado)",emoji:"🥟",cal:540,prot:22,carb:60,fat:22,cat:"restoran",brand:"Mado",portion:"1 porsiyon"},

  // ═══ Köfteci Ramiz ═══
  {name:"Köfte 8'li (Ramiz)",emoji:"🍢",cal:540,prot:38,carb:30,fat:28,cat:"restoran",brand:"Köfteci Ramiz",portion:"1 porsiyon"},
  {name:"Pilav (Ramiz)",emoji:"🍚",cal:290,prot:5,carb:54,fat:6,cat:"restoran",brand:"Köfteci Ramiz",portion:"1 porsiyon"},
  {name:"Mercimek Çorba (Ramiz)",emoji:"🍲",cal:130,prot:7,carb:20,fat:3,cat:"restoran",brand:"Köfteci Ramiz",portion:"1 kase"},
  {name:"Piyaz (Ramiz)",emoji:"🥗",cal:160,prot:7,carb:22,fat:5,cat:"restoran",brand:"Köfteci Ramiz",portion:"1 porsiyon"},

  // ═══ Köfteci Yusuf ═══
  {name:"Köfte Porsiyon (Yusuf)",emoji:"🍢",cal:480,prot:34,carb:28,fat:24,cat:"restoran",brand:"Köfteci Yusuf",portion:"1 porsiyon"},
  {name:"Pilav (Yusuf)",emoji:"🍚",cal:280,prot:5,carb:54,fat:5,cat:"restoran",brand:"Köfteci Yusuf",portion:"1 porsiyon"},
  {name:"Yoğurt (Yusuf)",emoji:"🥛",cal:80,prot:5,carb:6,fat:4,cat:"restoran",brand:"Köfteci Yusuf",portion:"1 kase"},

  // ═══ Big Chefs ═══
  {name:"Caesar Salata (Big Chefs)",emoji:"🥗",cal:410,prot:26,carb:28,fat:22,cat:"restoran",brand:"Big Chefs",portion:"1 porsiyon"},
  {name:"Avokado Tost (Big Chefs)",emoji:"🥑",cal:460,prot:15,carb:48,fat:23,cat:"restoran",brand:"Big Chefs",portion:"1 adet"},
  {name:"Pancake (Big Chefs)",emoji:"🥞",cal:620,prot:14,carb:88,fat:24,cat:"restoran",brand:"Big Chefs",portion:"1 porsiyon"},

  // ═══ Sushico ═══
  {name:"California Roll (8 adet)",emoji:"🍣",cal:270,prot:10,carb:42,fat:6,cat:"restoran",brand:"Sushico",portion:"8 adet"},
  {name:"Salmon Roll (8 adet)",emoji:"🍣",cal:320,prot:15,carb:38,fat:10,cat:"restoran",brand:"Sushico",portion:"8 adet"},
  {name:"Miso Çorba (Sushico)",emoji:"🍜",cal:50,prot:3,carb:6,fat:2,cat:"restoran",brand:"Sushico",portion:"1 kase"},

  // ═══ Subway ═══
  {name:"Tavuklu Sandviç - 15cm (Subway)",emoji:"🥪",cal:330,prot:23,carb:46,fat:5,cat:"restoran",brand:"Subway",portion:"15cm"},
  {name:"Italian BMT - 15cm (Subway)",emoji:"🥪",cal:430,prot:21,carb:47,fat:18,cat:"restoran",brand:"Subway",portion:"15cm"},
  {name:"Tuna - 15cm (Subway)",emoji:"🥪",cal:480,prot:21,carb:46,fat:23,cat:"restoran",brand:"Subway",portion:"15cm"}
];

// FOOD_DB'ye otomatik ekleme — sayfa yüklendiğinde
(function(){
  function _injectIntoFoodDB(){
    try{
      if(typeof window === 'undefined') return;
      if(!Array.isArray(window.FOOD_DB)) return;
      var existing = new Set(window.FOOD_DB.map(function(f){return f.name;}));
      var added = 0;
      window.RESTAURANT_DB.forEach(function(r){
        if(!existing.has(r.name)){
          window.FOOD_DB.push(Object.assign({src:'restaurant'}, r));
          added++;
        }
      });
      // Search index varsa rebuild et
      if(added > 0 && typeof window.rebuildFoodIndex === 'function'){
        try{ window.rebuildFoodIndex(); }catch(_){}
      }
    }catch(_){}
  }
  // Birden fazla noktada deneme — FOOD_DB hangi script sırasında dolarsa
  if(document.readyState === 'complete' || document.readyState === 'interactive'){
    setTimeout(_injectIntoFoodDB, 100);
    setTimeout(_injectIntoFoodDB, 800);
  } else {
    window.addEventListener('DOMContentLoaded', function(){ setTimeout(_injectIntoFoodDB, 100); });
    window.addEventListener('load', function(){ setTimeout(_injectIntoFoodDB, 300); });
  }
  // FOOD_DB sonradan doluyorsa retry
  setTimeout(_injectIntoFoodDB, 1500);
  setTimeout(_injectIntoFoodDB, 3000);
})();
