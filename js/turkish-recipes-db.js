// ╔══════════════════════════════════════════════════════════════════════╗
// ║  FitSofra — Kapsamlı Türk Mutfağı Tarif Veritabanı                ║
// ║  100+ tarif · 13 kategori · Makro değerleri · Adım adım tarifler  ║
// ║  Değerler: 1 porsiyon başına                                       ║
// ╚══════════════════════════════════════════════════════════════════════╝
window.TURKISH_RECIPES_DB = [

// ═══════════════════════════════════════════
// ══  KLASİK TÜRK YEMEKLERİ               ══
// ═══════════════════════════════════════════
{
  id:"r_iskender",name:"İskender Kebap",cat:"klasik",
  emoji:"🥩",cal:520,prot:35,carb:35,fat:26,serv:"1 porsiyon",yieldServings:1,time:40,
  tags:["et","proteinli","kebap"],
  ingredients:[
    {item:"Dana döner eti",amount:"150g"},
    {item:"Pide ekmeği",amount:"1 adet"},
    {item:"Yoğurt",amount:"100g"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Domates sosu",amount:"3 yk"},
    {item:"Sivri biber",amount:"2 adet"}
  ],
  steps:[
    "Pide ekmeğini küçük kareler halinde kesin ve tabağa dizin.",
    "Domates sosunu pidelerin üzerine gezdirin.",
    "Döner etini pidelerin üzerine yerleştirin.",
    "Yoğurdu yanına koyun.",
    "Tereyağını küçük bir tavada eritip hafif kızarana kadar ısıtın.",
    "Erimiş tereyağını etin üzerine gezdirerek servis edin."
  ]
},
{
  id:"r_hunkar",name:"Hünkar Beğendi",cat:"klasik",
  emoji:"🥩",cal:323,prot:17.7,carb:21.1,fat:19.9,serv:"4 porsiyon",yieldServings:4,time:60,
  tags:["et","geleneksel","proteinli"],
  ingredients:[
    {item:"Kuzu kuşbaşı",amount:"200g"},
    {item:"Patlıcan",amount:"3 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Tereyağı",amount:"2 yk"},
    {item:"Un",amount:"1 yk"},
    {item:"Süt",amount:"1 su bardağı"},
    {item:"Kaşar rendesi",amount:"50g"}
  ],
  steps:[
    "Kuzu etini küçük küpler halinde doğrayın. Soğan ile birlikte kavurun.",
    "Domates rendesi ekleyip kısık ateşte yumuşayana kadar pişirin.",
    "Patlıcanları közleyin, kabuklarını soyun ve ezin.",
    "Ayrı bir tencerede tereyağında unu kavurun, sütü ekleyin.",
    "Közlenmiş patlıcanları beşamel sosa ekleyip karıştırın, kaşar rendesi ekleyin.",
    "Patlıcan püresini tabağa yayın, üzerine eti koyarak servis edin."
  ]
},
{
  id:"r_karniyarik",name:"Karnıyarık",cat:"klasik",
  emoji:"🍆",cal:196,prot:7.3,carb:15.8,fat:12.6,serv:"4 porsiyon",yieldServings:4,time:50,
  tags:["sebze","et","geleneksel"],
  ingredients:[
    {item:"Patlıcan",amount:"2 adet"},
    {item:"Kıyma",amount:"100g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Biber",amount:"2 adet"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Maydanoz",amount:"1 demet"}
  ],
  steps:[
    "Patlıcanları alacalı soyup tuzlu suda bekletin.",
    "Kızgın yağda patlıcanları kızartın veya fırında pişirin.",
    "Kıymayı soğanla birlikte kavurun.",
    "Doğranmış domates ve biberleri ekleyip pişirin.",
    "Patlıcanları ortadan yarıp iç harcı doldurun.",
    "Fırın kabına dizin, domates dilimi koyup 180°C'de 20 dk pişirin."
  ]
},
{
  id:"r_imam_bayildi",name:"İmam Bayıldı",cat:"klasik",
  emoji:"🍆",cal:141,prot:2.7,carb:15,fat:8.9,serv:"5 porsiyon",yieldServings:5,time:50,
  tags:["sebze","zeytinyagli","vejetaryen","saglikli"],
  ingredients:[
    {item:"Patlıcan",amount:"2 adet"},
    {item:"Soğan",amount:"2 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Sarımsak",amount:"3 diş"},
    {item:"Zeytinyağı",amount:"3 yk"},
    {item:"Maydanoz",amount:"1 demet"}
  ],
  steps:[
    "Patlıcanları alacalı soyup tuzlu suda bekletin.",
    "Soğanları ince ince doğrayıp zeytinyağında kavurun.",
    "Domates ve sarımsak ekleyip 5 dk pişirin.",
    "Patlıcanları ortadan yarın, iç harcı doldurun.",
    "Tencereye dizin, üzerine su ve zeytinyağı gezdirin.",
    "Kısık ateşte 30 dk pişirip soğuk servis edin."
  ]
},
{
  id:"r_etli_nohut",name:"Etli Nohut",cat:"klasik",
  emoji:"🍲",cal:265,prot:15.8,carb:34.8,fat:7.8,serv:"4 porsiyon",yieldServings:4,time:45,
  tags:["baklagil","et","proteinli","geleneksel"],
  ingredients:[
    {item:"Nohut (haşlanmış)",amount:"200g"},
    {item:"Dana kuşbaşı",amount:"100g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Domates salçası",amount:"1 yk"},
    {item:"Biber salçası",amount:"1 çk"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Tuz, karabiber",amount:""}
  ],
  steps:[
    "Eti küçük küpler halinde doğrayın, tereyağında kavurun.",
    "Doğranmış soğanı ekleyip pembeleşene kadar soteleyin.",
    "Salçaları ekleyip 2 dk kavurun.",
    "Haşlanmış nohutları ve sıcak suyu ekleyin.",
    "Kısık ateşte et yumuşayana kadar (30 dk) pişirin.",
    "Pilavla birlikte servis edin."
  ]
},
{
  id:"r_etli_kuru_fasulye",name:"Etli Kuru Fasulye",cat:"klasik",
  emoji:"🍲",cal:230,prot:14.4,carb:28.4,fat:7.1,serv:"5 porsiyon",yieldServings:5,time:50,
  tags:["baklagil","et","proteinli","geleneksel"],
  ingredients:[
    {item:"Kuru fasulye (haşlanmış)",amount:"200g"},
    {item:"Dana kuşbaşı",amount:"100g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Domates salçası",amount:"1 yk"},
    {item:"Biber salçası",amount:"1 çk"},
    {item:"Sivri biber",amount:"2 adet"},
    {item:"Sıvı yağ",amount:"2 yk"}
  ],
  steps:[
    "Eti yağda kavurun, doğranmış soğanı ekleyin.",
    "Salçaları ilave edip 2 dk kavurun.",
    "Haşlanmış fasulyeleri ve sıcak suyu ekleyin.",
    "Biberleri bütün olarak tencerenin üstüne koyun.",
    "Kısık ateşte 35-40 dk pişirin.",
    "Pilav ve turşuyla servis edin."
  ]
},
{
  id:"r_yaprak_sarma",name:"Yaprak Sarma (Zeytinyağlı)",cat:"klasik",
  emoji:"🌿",cal:120,prot:2,carb:15,fat:6,serv:"5 adet",time:60,
  tags:["zeytinyagli","vejetaryen","meze"],
  ingredients:[
    {item:"Asma yaprağı",amount:"40 adet"},
    {item:"Pirinç",amount:"1 su bardağı"},
    {item:"Soğan",amount:"2 adet"},
    {item:"Domates salçası",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"4 yk"},
    {item:"Nane, karabiber",amount:""},
    {item:"Limon suyu",amount:"1 adet"},
    {item:"Çam fıstığı",amount:"2 yk"},
    {item:"Kuşüzümü",amount:"2 yk"}
  ],
  steps:[
    "Pirinci yıkayıp 30 dk ılık suda bekletin.",
    "Soğanları ince doğrayıp zeytinyağında kavurun.",
    "Pirinci, salçayı, baharatları, çam fıstığı ve kuşüzümünü ekleyin.",
    "Asma yapraklarını açın, 1 çk harç koyup sıkıca sarın.",
    "Tencereye sıkıca dizin, üzerine limon suyu ve su ekleyin.",
    "Kısık ateşte 45 dk pişirip soğuk servis edin."
  ]
},
{
  id:"r_manti",name:"Kayseri Mantısı",cat:"klasik",
  emoji:"🥟",cal:431,prot:16.6,carb:52.6,fat:16.9,serv:"4 porsiyon",yieldServings:4,time:90,
  tags:["hamur","et","geleneksel"],
  ingredients:[
    {item:"Un",amount:"2 su bardağı"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Kıyma",amount:"150g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Yoğurt",amount:"200g"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Tereyağı",amount:"2 yk"},
    {item:"Pul biber",amount:"1 çk"}
  ],
  steps:[
    "Un, yumurta, tuz ve suyla hamur yoğurun, 30 dk dinlendirin.",
    "Kıymayı soğan, tuz, karabiberle karıştırarak iç harç yapın.",
    "Hamuru ince açıp 2cm kareler kesin.",
    "Her kareye az harç koyup kenarları birleştirerek kapatın.",
    "Kaynayan tuzlu suda 15-20 dk haşlayın.",
    "Sarımsaklı yoğurt ve pul biberli tereyağı ile servis edin."
  ]
},
{
  id:"r_mercimek_kofte",name:"Mercimek Köftesi",cat:"klasik",
  emoji:"🟠",cal:45,prot:2,carb:7,fat:1,serv:"1 adet",time:30,
  tags:["vegan","vejetaryen","saglikli","meze","pratik"],
  ingredients:[
    {item:"Kırmızı mercimek",amount:"1 su bardağı"},
    {item:"İnce bulgur",amount:"1 su bardağı"},
    {item:"Soğan",amount:"2 adet"},
    {item:"Domates salçası",amount:"2 yk"},
    {item:"Zeytinyağı",amount:"3 yk"},
    {item:"Maydanoz, yeşil soğan",amount:"1 demet"},
    {item:"Pul biber, kimyon",amount:""}
  ],
  steps:[
    "Mercimeği bol suda haşlayın (pişince suyu süzün).",
    "Sıcak mercimeğin üzerine bulguru ekleyin, kapağını kapatıp 15 dk bekletin.",
    "Soğanları yağda kavurup salçayı ekleyin.",
    "Hepsini birleştirip yoğurun, baharatları ekleyin.",
    "Yeşillikleri ince doğrayıp karıştırın.",
    "Köfte şekli verin, marul yaprakları üzerinde limonla servis edin."
  ]
},

// ═══════════════════════════════════════════
// ══  ÇORBALAR                             ══
// ═══════════════════════════════════════════
{
  id:"r_mercimek_corbasi",name:"Mercimek Çorbası",cat:"corba",
  emoji:"🍲",cal:56,prot:4,carb:9,fat:1,serv:"1 kase",time:30,
  tags:["vegan","vejetaryen","saglikli","pratik"],
  ingredients:[
    {item:"Kırmızı mercimek",amount:"1 su bardağı"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Patates",amount:"1 adet"},
    {item:"Domates salçası",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Tuz, karabiber, kimyon",amount:""},
    {item:"Limon",amount:"1 adet"}
  ],
  steps:[
    "Soğanı doğrayıp zeytinyağında kavurun.",
    "Havuç ve patatesi küp küp doğrayıp ekleyin.",
    "Salçayı ilave edip 1 dk kavurun.",
    "Yıkanmış mercimeği ve 4 bardak suyu ekleyin.",
    "Kaynayınca kısık ateşte 20 dk pişirin.",
    "Blenderdan geçirin, tuz ve baharatlarla tatlandırıp limonla servis edin."
  ]
},
{
  id:"r_ezogelin",name:"Ezogelin Çorbası",cat:"corba",
  emoji:"🍲",cal:68,prot:3,carb:11,fat:2,serv:"1 kase",time:35,
  tags:["vejetaryen","saglikli","geleneksel"],
  ingredients:[
    {item:"Kırmızı mercimek",amount:"1 su bardağı"},
    {item:"Bulgur",amount:"2 yk"},
    {item:"Pirinç",amount:"2 yk"},
    {item:"Domates salçası",amount:"1 yk"},
    {item:"Biber salçası",amount:"1 yk"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Nane, pul biber",amount:""}
  ],
  steps:[
    "Soğanı tereyağında kavurun, salçaları ekleyin.",
    "Mercimek, bulgur ve pirinci ekleyin.",
    "6 bardak sıcak su ilave edin.",
    "Kaynayınca kısık ateşte 25 dk pişirin.",
    "Üzerine naneli pul biberli tereyağı gezdirip servis edin."
  ]
},
{
  id:"r_yayla",name:"Yayla Çorbası",cat:"corba",
  emoji:"🍲",cal:77,prot:2.9,carb:7.9,fat:3.9,serv:"6 kase",yieldServings:6,time:25,
  tags:["vejetaryen","saglikli","geleneksel"],
  ingredients:[
    {item:"Yoğurt",amount:"1 su bardağı"},
    {item:"Pirinç",amount:"3 yk"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Un",amount:"1 yk"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Nane (kuru)",amount:"1 çk"},
    {item:"Tuz",amount:""}
  ],
  steps:[
    "Pirinci yıkayıp 4 bardak suda haşlayın.",
    "Yoğurt, yumurta ve unu çırparak terbiye yapın.",
    "Terbiyeyi kaynayan pirince azar azar ekleyip sürekli karıştırın.",
    "Kısık ateşte 10 dk pişirin (kaynatmayın).",
    "Tereyağında naneyi kavurup çorbanın üzerine gezdirin."
  ]
},
{
  id:"r_tarhana",name:"Tarhana Çorbası",cat:"corba",
  emoji:"🍲",cal:67,prot:1.5,carb:6,fat:4.2,serv:"3 kase",yieldServings:3,time:20,
  tags:["vejetaryen","geleneksel","pratik"],
  ingredients:[
    {item:"Tarhana",amount:"3 yk"},
    {item:"Su",amount:"3 su bardağı"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Tuz",amount:""},
    {item:"Pul biber (isteğe bağlı)",amount:""}
  ],
  steps:[
    "Tarhanayı soğuk suda eritin (topaklanmadan).",
    "Tencereye alıp orta ateşte karıştırarak kaynatın.",
    "Kıvam alınca kısık ateşte 10 dk pişirin.",
    "Tereyağını tavada eritip üzerine gezdirerek servis edin."
  ]
},
{
  id:"r_iskembe",name:"İşkembe Çorbası",cat:"corba",
  emoji:"🍲",cal:72,prot:6,carb:4,fat:4,serv:"1 kase",time:120,
  tags:["et","geleneksel","proteinli"],
  ingredients:[
    {item:"İşkembe",amount:"500g"},
    {item:"Un",amount:"2 yk"},
    {item:"Tereyağı",amount:"2 yk"},
    {item:"Yumurta sarısı",amount:"1 adet"},
    {item:"Limon suyu",amount:"2 yk"},
    {item:"Sarımsak",amount:"3 diş"},
    {item:"Sirke",amount:""}
  ],
  steps:[
    "İşkembeyi iyice temizleyip haşlayın (en az 2 saat).",
    "Haşlanan işkembeyi ince şeritler halinde kesin.",
    "Tereyağında unu kavurup haşlama suyunu azar azar ekleyin.",
    "İşkembe şeritlerini tencereye alıp 15 dk pişirin.",
    "Yumurta sarısı ve limon suyuyla terbiye yapıp ekleyin.",
    "Sarımsaklı sirkeli sosla servis edin."
  ]
},
{
  id:"r_dugun_corbasi",name:"Düğün Çorbası",cat:"corba",
  emoji:"🍲",cal:85,prot:5,carb:8,fat:4,serv:"1 kase",time:40,
  tags:["et","geleneksel"],
  ingredients:[
    {item:"Kuzu eti (kemikli)",amount:"300g"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Limon suyu",amount:"2 yk"},
    {item:"Un",amount:"1 yk"},
    {item:"Tereyağı",amount:"2 yk"},
    {item:"Pul biber",amount:"1 çk"}
  ],
  steps:[
    "Eti haşlayıp suyunu süzün, eti kemiklerinden ayırın.",
    "Et suyuna eti geri koyup kaynatın.",
    "Yumurta, limon suyu ve unu çırparak terbiye yapın.",
    "Terbiyeyi çorbaya azar azar ekleyin, karıştırın.",
    "Tereyağında pul biberi kavurup üzerine gezdirin."
  ]
},
{
  id:"r_beyran",name:"Beyran Çorbası",cat:"corba",
  emoji:"🍲",cal:110,prot:9,carb:6,fat:6,serv:"1 kase",time:180,
  tags:["et","proteinli","geleneksel","antep"],
  ingredients:[
    {item:"Kuzu eti (kemikli)",amount:"500g"},
    {item:"Pirinç",amount:"1 çay bardağı"},
    {item:"Sarımsak",amount:"4 diş"},
    {item:"Tereyağı",amount:"2 yk"},
    {item:"Pul biber, karabiber",amount:""},
    {item:"Tuz",amount:""}
  ],
  steps:[
    "Kuzu etini gece öncesinden haşlamaya başlayın (kemiklerden ayrılana kadar).",
    "Eti kemiklerinden ayırıp didikleyin.",
    "Pirinci yıkayıp et suyuna ekleyin.",
    "Tereyağında sarımsak ve pul biberi kavurun.",
    "Hepsini birleştirip 15 dk daha pişirin.",
    "Sıcak servis edin."
  ]
},

// ═══════════════════════════════════════════
// ══  FIT & SAĞLIKLI                       ══
// ═══════════════════════════════════════════
{
  id:"r_fit_tavuk_izgara",name:"Izgara Tavuk Göğsü",cat:"fit",
  emoji:"🍗",cal:180,prot:32,carb:2,fat:5,serv:"1 porsiyon (150g)",time:20,
  tags:["proteinli","saglikli","fit","pratik"],
  ingredients:[
    {item:"Tavuk göğsü",amount:"150g"},
    {item:"Zeytinyağı",amount:"1 çk"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Sarımsak tozu",amount:"1 çk"},
    {item:"Kekik, karabiber, tuz",amount:""}
  ],
  steps:[
    "Tavuk göğsünü baharatlar ve limon suyuyla marine edin (en az 15 dk).",
    "Izgarayı ısıtın, hafif yağlayın.",
    "Her iki yüzünü 5-6 dk pişirin.",
    "Salata veya sebze ile servis edin."
  ]
},
{
  id:"r_fit_yulaf_kase",name:"Protein Yulaf Kasesi",cat:"fit",
  emoji:"🥣",cal:350,prot:28,carb:40,fat:8,serv:"1 kase",time:10,
  tags:["proteinli","saglikli","fit","kahvalti","pratik"],
  ingredients:[
    {item:"Yulaf ezmesi",amount:"50g"},
    {item:"Protein tozu",amount:"1 ölçek"},
    {item:"Süt (yarım yağlı)",amount:"200ml"},
    {item:"Muz",amount:"yarım"},
    {item:"Badem",amount:"5 adet"},
    {item:"Tarçın",amount:"1 çk"},
    {item:"Bal",amount:"1 çk"}
  ],
  steps:[
    "Yulafı sütle karıştırıp mikrodalgada 2 dk pişirin (veya ocakta).",
    "Protein tozunu ekleyip iyice karıştırın.",
    "Üzerine dilimlenmiş muz, badem ve bal ekleyin.",
    "Tarçın serpip servis edin."
  ]
},
{
  id:"r_fit_ton_salata",name:"Ton Balıklı Salata",cat:"fit",
  emoji:"🥗",cal:220,prot:30,carb:8,fat:8,serv:"1 porsiyon",time:10,
  tags:["proteinli","saglikli","fit","pratik"],
  ingredients:[
    {item:"Ton balığı (konserve)",amount:"1 kutu (160g)"},
    {item:"Marul",amount:"4-5 yaprak"},
    {item:"Domates",amount:"1 adet"},
    {item:"Salatalık",amount:"1 adet"},
    {item:"Mısır",amount:"2 yk"},
    {item:"Zeytinyağı",amount:"1 çk"},
    {item:"Limon suyu",amount:"1 yk"}
  ],
  steps:[
    "Sebzeleri yıkayıp doğrayın.",
    "Ton balığının suyunu süzüp parçalayın.",
    "Hepsini karıştırın.",
    "Zeytinyağı ve limon sosuyla servis edin."
  ]
},
{
  id:"r_fit_omlet",name:"Sebzeli Protein Omlet",cat:"fit",
  emoji:"🍳",cal:200,prot:22,carb:5,fat:10,serv:"1 porsiyon",yieldServings:1,time:10,
  tags:["proteinli","saglikli","fit","kahvalti","pratik"],
  ingredients:[
    {item:"Yumurta",amount:"2 adet"},
    {item:"Yumurta akı",amount:"2 adet"},
    {item:"Ispanak",amount:"1 avuç"},
    {item:"Domates",amount:"yarım"},
    {item:"Mantar",amount:"3 adet"},
    {item:"Zeytinyağı",amount:"1 çk"},
    {item:"Tuz, karabiber",amount:""}
  ],
  steps:[
    "Sebzeleri doğrayıp zeytinyağında soteleyin.",
    "Yumurta ve akları çırpıp üzerine dökün.",
    "Kısık ateşte pişirip ikiye katlayın.",
    "Tabağa alıp servis edin."
  ]
},
{
  id:"r_fit_bulgur_pilavı",name:"Sebzeli Bulgur Pilavı",cat:"fit",
  emoji:"🍚",cal:161,prot:4.9,carb:30.1,fat:3.3,serv:"5 porsiyon",yieldServings:5,time:25,
  tags:["saglikli","vejetaryen","fit"],
  ingredients:[
    {item:"Bulgur",amount:"1 su bardağı"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Domates",amount:"1 adet"},
    {item:"Biber",amount:"1 adet"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Domates salçası",amount:"1 çk"},
    {item:"Tuz",amount:""}
  ],
  steps:[
    "Soğanı zeytinyağında kavurun.",
    "Doğranmış domates ve biberi ekleyin.",
    "Salçayı ekleyip karıştırın.",
    "Bulguru ekleyip 1.5 bardak sıcak su ilave edin.",
    "Kaynayınca kısık ateşte 15 dk pişirip dinlendirin."
  ]
},
{
  id:"r_fit_tavuk_salata",name:"Tavuklu Sezar Salata",cat:"fit",
  emoji:"🥗",cal:280,prot:28,carb:10,fat:14,serv:"1 porsiyon",yieldServings:1,time:20,
  tags:["proteinli","saglikli","fit"],
  ingredients:[
    {item:"Tavuk göğsü (ızgara)",amount:"120g"},
    {item:"Marul",amount:"1 bağ"},
    {item:"Parmesan",amount:"20g"},
    {item:"Kruton",amount:"30g"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Yoğurt (suzme)",amount:"1 yk"}
  ],
  steps:[
    "Tavuğu ızgara yapıp dilimleyin.",
    "Marulları yıkayıp parçalayın.",
    "Yoğurt, zeytinyağı, limon ile sos hazırlayın.",
    "Hepsini birleştirip parmesan ve kruton ekleyin."
  ]
},
{
  id:"r_fit_smoothie_bowl",name:"Protein Smoothie Bowl",cat:"fit",
  emoji:"🥣",cal:300,prot:25,carb:35,fat:6,serv:"1 kase",time:5,
  tags:["proteinli","saglikli","fit","kahvalti","pratik"],
  ingredients:[
    {item:"Dondurulmuş muz",amount:"1 adet"},
    {item:"Protein tozu",amount:"1 ölçek"},
    {item:"Süt",amount:"100ml"},
    {item:"Yulaf",amount:"2 yk"},
    {item:"Çilek",amount:"5 adet"},
    {item:"Chia tohumu",amount:"1 çk"}
  ],
  steps:[
    "Muz, protein tozu ve sütü blenderda karıştırın.",
    "Kaseye dökün.",
    "Üzerine çilek, yulaf ve chia tohumu serpiştirin."
  ]
},

// ═══════════════════════════════════════════
// ══  PRATİK YEMEKLER                     ══
// ═══════════════════════════════════════════
{
  id:"r_menemen",name:"Menemen",cat:"pratik",
  emoji:"🍳",cal:163,prot:7.8,carb:6.7,fat:12.1,serv:"2 porsiyon",yieldServings:2,time:15,
  tags:["vejetaryen","kahvalti","pratik"],
  ingredients:[
    {item:"Yumurta",amount:"2 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Biber (sivri)",amount:"2 adet"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Tuz, karabiber",amount:""},
    {item:"Pul biber (isteğe bağlı)",amount:""}
  ],
  steps:[
    "Biberleri doğrayıp zeytinyağında kavurun.",
    "Doğranmış domatesleri ekleyip suyunu salana kadar pişirin.",
    "Yumurtaları kırıp hafifçe karıştırın.",
    "Pişince hemen ocaktan alıp ekmekle servis edin."
  ]
},
{
  id:"r_sigara_boregi",name:"Sigara Böreği",cat:"pratik",
  emoji:"🥧",cal:90,prot:3,carb:8,fat:5,serv:"1 adet",time:25,
  tags:["hamur","atistirmalik","pratik"],
  ingredients:[
    {item:"Yufka",amount:"2 adet"},
    {item:"Beyaz peynir",amount:"200g"},
    {item:"Maydanoz",amount:"1 demet"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Kızartma yağı",amount:""}
  ],
  steps:[
    "Peyniri ezin, maydanoz ve yumurtayla karıştırın.",
    "Yufkaları üçgen dilimler halinde kesin.",
    "Her dilimin geniş kenarına harç koyup puro gibi sarın.",
    "Kenarları suyla yapıştırın.",
    "Kızgın yağda altın rengi olana kadar kızartın.",
    "Kağıt havluyla fazla yağını alıp servis edin."
  ]
},
{
  id:"r_coban_salata",name:"Çoban Salatası",cat:"pratik",
  emoji:"🥗",cal:60,prot:2,carb:8,fat:3,serv:"1 porsiyon",time:10,
  tags:["vegan","vejetaryen","saglikli","pratik"],
  ingredients:[
    {item:"Domates",amount:"2 adet"},
    {item:"Salatalık",amount:"1 adet"},
    {item:"Biber (sivri)",amount:"2 adet"},
    {item:"Soğan",amount:"yarım"},
    {item:"Maydanoz",amount:"yarım demet"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Tuz",amount:""}
  ],
  steps:[
    "Tüm sebzeleri küçük küpler halinde doğrayın.",
    "Maydanozu ince ince kıyın.",
    "Hepsini karıştırın.",
    "Zeytinyağı, limon suyu ve tuzla tatlandırıp servis edin."
  ]
},
{
  id:"r_patates_kizartma",name:"Fırında Patates",cat:"pratik",
  emoji:"🥔",cal:178,prot:3.1,carb:26.3,fat:7.2,serv:"2 porsiyon",yieldServings:2,time:35,
  tags:["vejetaryen","pratik"],
  ingredients:[
    {item:"Patates",amount:"2 orta"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Kekik, pul biber",amount:""},
    {item:"Tuz",amount:""}
  ],
  steps:[
    "Patatesleri yıkayıp dilimleyin.",
    "Zeytinyağı ve baharatlarla harmanlayın.",
    "Fırın tepsisine yayın.",
    "200°C önceden ısıtılmış fırında 25-30 dk pişirin."
  ]
},
{
  id:"r_makarna_soslu",name:"Domates Soslu Makarna",cat:"pratik",
  emoji:"🍝",cal:180,prot:6,carb:30,fat:4,serv:"1 porsiyon",time:20,
  tags:["vejetaryen","pratik"],
  ingredients:[
    {item:"Makarna",amount:"80g"},
    {item:"Domates",amount:"3 adet"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Fesleğen",amount:"3-4 yaprak"},
    {item:"Tuz, karabiber",amount:""}
  ],
  steps:[
    "Makarnayı tuzlu suda al dente haşlayın.",
    "Sarımsağı zeytinyağında kavurun.",
    "Rendelenmiş domatesleri ekleyip 10 dk pişirin.",
    "Haşlanan makarnayı sosa ekleyip karıştırın.",
    "Fesleğen yapraklarıyla servis edin."
  ]
},
{
  id:"r_yumurta_haslama",name:"Sahanda Yumurta",cat:"pratik",
  emoji:"🍳",cal:196,prot:14,carb:1,fat:15,serv:"2 yumurta",yieldServings:1,time:5,
  tags:["kahvalti","proteinli","pratik"],
  ingredients:[
    {item:"Yumurta",amount:"2 adet"},
    {item:"Tereyağı",amount:"1 çk"},
    {item:"Tuz, karabiber",amount:""},
    {item:"Pul biber (isteğe bağlı)",amount:""}
  ],
  steps:[
    "Tavada tereyağını eritin.",
    "Yumurtaları kırın.",
    "Kısık ateşte beyazlar pişene kadar bekleyin.",
    "Tuz ve karabiber serpip servis edin."
  ]
},

// ═══════════════════════════════════════════
// ══  SEBZE TARİFLERİ                     ══
// ═══════════════════════════════════════════
{
  id:"r_biber_dolma",name:"Biber Dolma (Etli)",cat:"sebze",
  emoji:"🫑",cal:185,prot:10,carb:17,fat:9,serv:"2 adet",time:60,
  tags:["sebze","et","geleneksel"],
  ingredients:[
    {item:"Dolmalık biber",amount:"6 adet"},
    {item:"Kıyma",amount:"200g"},
    {item:"Pirinç",amount:"yarım bardak"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Maydanoz",amount:"yarım demet"},
    {item:"Domates salçası",amount:"1 yk"},
    {item:"Tuz, karabiber, pul biber",amount:""}
  ],
  steps:[
    "Pirinci yıkayıp 20 dk ılık suda bekletin.",
    "Kıymayı soğan, domates rendesi, maydanoz ve baharatlarla karıştırın.",
    "Pirinci süzüp harca ekleyin.",
    "Biberlerin içini temizleyin, harcı doldurun (üstte boşluk bırakın).",
    "Tencereye dizin, salçalı su ekleyin.",
    "Kısık ateşte 40-45 dk pişirin."
  ]
},
{
  id:"r_patlican_musakka",name:"Patlıcan Musakka",cat:"sebze",
  emoji:"🍆",cal:190,prot:7.6,carb:14.7,fat:12,serv:"5 porsiyon",yieldServings:5,time:50,
  tags:["sebze","et","geleneksel"],
  ingredients:[
    {item:"Patlıcan",amount:"3 adet"},
    {item:"Kıyma",amount:"150g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Biber",amount:"2 adet"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Domates salçası",amount:"1 yk"}
  ],
  steps:[
    "Patlıcanları küp doğrayıp tuzlu suda bekletin.",
    "Kıymayı soğanla kavurun.",
    "Patlıcanları süzüp yağda hafif kızartın.",
    "Hepsini karıştırıp tencereye alın.",
    "Domates ve salçayı ekleyin, 25 dk pişirin."
  ]
},
{
  id:"r_zeytinyagli_fasulye",name:"Zeytinyağlı Taze Fasulye",cat:"sebze",
  emoji:"🫛",cal:90,prot:3,carb:10,fat:4,serv:"1 porsiyon",time:35,
  tags:["sebze","zeytinyagli","vejetaryen","saglikli","vegan"],
  ingredients:[
    {item:"Taze fasulye",amount:"500g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Zeytinyağı",amount:"3 yk"},
    {item:"Tuz, şeker",amount:""}
  ],
  steps:[
    "Fasulyelerin ipliğini çekip 3-4cm uzunluğunda kırın.",
    "Soğanları zeytinyağında kavurun.",
    "Domates rendesini ekleyin.",
    "Fasulyeleri ekleyip yarısını geçecek kadar su koyun.",
    "Kısık ateşte 30 dk pişirip soğuk servis edin."
  ]
},
{
  id:"r_ispanak_yemegi",name:"Ispanaklı Yumurta",cat:"sebze",
  emoji:"🥬",cal:124,prot:7.7,carb:8.5,fat:7.4,serv:"3 porsiyon",yieldServings:3,time:20,
  tags:["sebze","saglikli","proteinli"],
  ingredients:[
    {item:"Ispanak",amount:"300g"},
    {item:"Yumurta",amount:"2 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Tuz, karabiber",amount:""}
  ],
  steps:[
    "Ispanakları yıkayıp doğrayın.",
    "Soğanı tereyağında kavurun.",
    "Ispanakları ekleyip suyunu salana kadar pişirin.",
    "Yumurtaları kırıp karıştırın, 3-4 dk daha pişirin."
  ]
},
{
  id:"r_mantar_sote",name:"Mantar Sote",cat:"sebze",
  emoji:"🍄",cal:82,prot:4,carb:9.2,fat:4.2,serv:"3 porsiyon",yieldServings:3,time:15,
  tags:["sebze","vejetaryen","saglikli","pratik"],
  ingredients:[
    {item:"Mantar",amount:"300g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Biber",amount:"1 adet"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Tuz, karabiber, kekik",amount:""}
  ],
  steps:[
    "Mantarları dilimleyin.",
    "Soğan ve sarımsağı tereyağında kavurun.",
    "Mantarları ekleyip suyunu salana kadar pişirin.",
    "Biberleri ekleyip baharatlayın, 5 dk daha pişirin."
  ]
},

// ═══════════════════════════════════════════
// ══  TATLILAR                             ══
// ═══════════════════════════════════════════
{
  id:"r_sutlac",name:"Fırın Sütlaç",cat:"tatli",
  emoji:"🍮",cal:180,prot:5,carb:28,fat:5,serv:"1 kase",time:50,
  tags:["tatli","geleneksel","vejetaryen"],
  ingredients:[
    {item:"Pirinç",amount:"yarım bardak"},
    {item:"Süt",amount:"1 litre"},
    {item:"Şeker",amount:"yarım bardak"},
    {item:"Nişasta",amount:"2 yk"},
    {item:"Vanilya",amount:"1 çk"},
    {item:"Yumurta sarısı",amount:"1 adet"}
  ],
  steps:[
    "Pirinci yıkayıp haşlayın (pirinç yumuşayana kadar).",
    "Sütü ekleyip kaynatın.",
    "Şeker ve nişastayı ekleyip kıvam alana kadar karıştırın.",
    "Yumurta sarısını azar azar ekleyin.",
    "Güveç kaplara bölün.",
    "200°C fırında üzeri kızarana kadar pişirin."
  ]
},
{
  id:"r_kabak_tatlisi",name:"Kabak Tatlısı",cat:"tatli",
  emoji:"🎃",cal:160,prot:1,carb:35,fat:2,serv:"1 porsiyon",time:50,
  tags:["tatli","geleneksel","vejetaryen"],
  ingredients:[
    {item:"Bal kabağı",amount:"500g"},
    {item:"Şeker",amount:"1 su bardağı"},
    {item:"Ceviz",amount:"50g"},
    {item:"Tahin",amount:"2 yk"},
    {item:"Kaymak",amount:"isteğe bağlı"}
  ],
  steps:[
    "Kabağı büyük dilimler halinde kesin.",
    "Tepsiye dizin, üzerine şekeri serpin.",
    "6-8 saat (veya gece boyu) bekletin.",
    "200°C fırında 40-50 dk pişirin.",
    "Soğuyunca ceviz ve tahinle servis edin."
  ]
},
{
  id:"r_asure",name:"Aşure",cat:"tatli",
  emoji:"🍲",cal:200,prot:4,carb:40,fat:3,serv:"1 kase",time:60,
  tags:["tatli","geleneksel","vegan"],
  ingredients:[
    {item:"Buğday",amount:"yarım bardak"},
    {item:"Nohut (haşlanmış)",amount:"yarım bardak"},
    {item:"Kuru fasulye (haşlanmış)",amount:"yarım bardak"},
    {item:"Pirinç",amount:"3 yk"},
    {item:"Kuru kayısı",amount:"5 adet"},
    {item:"Kuru incir",amount:"3 adet"},
    {item:"Kuru üzüm",amount:"3 yk"},
    {item:"Şeker",amount:"1 bardak"},
    {item:"Ceviz, nar",amount:"süsleme için"}
  ],
  steps:[
    "Buğdayı önceden 12 saat bekletip haşlayın.",
    "Pirinci yıkayıp ekleyin.",
    "Haşlanmış baklagilleri ekleyin.",
    "Kuru meyveleri küçük doğrayıp ilave edin.",
    "Şekeri ekleyip 20 dk daha pişirin.",
    "Kaselere bölüp soğutun, nar ve cevizle süsleyin."
  ]
},
{
  id:"r_sekerpare",name:"Şekerpare",cat:"tatli",
  emoji:"🍯",cal:180,prot:3,carb:28,fat:7,serv:"1 adet",time:40,
  tags:["tatli","geleneksel"],
  ingredients:[
    {item:"Un",amount:"2 su bardağı"},
    {item:"Tereyağı (oda sıcaklığı)",amount:"100g"},
    {item:"İrmik",amount:"yarım bardak"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Kabartma tozu",amount:"1 çk"},
    {item:"Şeker (şerbet için)",amount:"2 bardak"},
    {item:"Su (şerbet için)",amount:"2 bardak"},
    {item:"Limon suyu",amount:"yarım limon"}
  ],
  steps:[
    "Şerbeti hazırlayın: şeker ve suyu kaynatın, limon sıkıp soğumaya bırakın.",
    "Tereyağı, yumurta, irmik, un ve kabartma tozunu yoğurun.",
    "Ceviz büyüklüğünde toplar yapıp tepsiye dizin.",
    "Ortalarına bademle bastırın.",
    "170°C fırında 20-25 dk hafif kızarana kadar pişirin.",
    "Soğuk şerbeti sıcak tatlıya dökün, 1 saat bekletin."
  ]
},
{
  id:"r_revani",name:"Revani",cat:"tatli",
  emoji:"🍰",cal:200,prot:3,carb:32,fat:7,serv:"1 dilim",time:40,
  tags:["tatli","geleneksel"],
  ingredients:[
    {item:"İrmik",amount:"1 su bardağı"},
    {item:"Un",amount:"1 su bardağı"},
    {item:"Şeker",amount:"1 su bardağı"},
    {item:"Yumurta",amount:"3 adet"},
    {item:"Yoğurt",amount:"1 su bardağı"},
    {item:"Kabartma tozu",amount:"1 paket"},
    {item:"Şeker (şerbet)",amount:"2 bardak"},
    {item:"Su (şerbet)",amount:"2 bardak"},
    {item:"Limon suyu",amount:"yarım limon"}
  ],
  steps:[
    "Şerbeti kaynatıp soğumaya bırakın.",
    "Yumurta ve şekeri çırpın.",
    "Yoğurt, irmik, un ve kabartma tozunu ekleyin.",
    "Yağlanmış tepsiye dökün, üzerini düzeltin.",
    "180°C fırında 25-30 dk pişirin.",
    "Soğuk şerbeti sıcak tatlıya dökün, 2 saat bekletin."
  ]
},

// ═══════════════════════════════════════════
// ══  VEGAN & VEJETARYEN                   ══
// ═══════════════════════════════════════════
{
  id:"r_kisir",name:"Kısır",cat:"vegan",
  emoji:"🌾",cal:188,prot:4.2,carb:28.5,fat:7.5,serv:"6 porsiyon",yieldServings:6,time:20,
  tags:["vegan","vejetaryen","saglikli","meze"],
  ingredients:[
    {item:"İnce bulgur",amount:"1 su bardağı"},
    {item:"Domates salçası",amount:"2 yk"},
    {item:"Biber salçası",amount:"1 yk"},
    {item:"Nar ekşisi",amount:"2 yk"},
    {item:"Zeytinyağı",amount:"3 yk"},
    {item:"Limon suyu",amount:"1 adet"},
    {item:"Maydanoz, yeşil soğan",amount:"1 demet"},
    {item:"Domates, salatalık",amount:"birer adet"}
  ],
  steps:[
    "Bulgura kaynar su dökün (iki parmak üstünü geçecek kadar), kapağını kapatıp 15 dk bekletin.",
    "Salçaları, nar ekşisi, zeytinyağı ve limon suyunu ekleyip karıştırın.",
    "Doğranmış sebze ve yeşillikleri ekleyin.",
    "İyice harmanlayıp soğuk servis edin."
  ]
},
{
  id:"r_humus",name:"Humus",cat:"vegan",
  emoji:"🫘",cal:166,prot:8,carb:14,fat:10,serv:"100g",time:15,
  tags:["vegan","vejetaryen","saglikli","meze","proteinli"],
  ingredients:[
    {item:"Nohut (haşlanmış)",amount:"400g"},
    {item:"Tahin",amount:"3 yk"},
    {item:"Limon suyu",amount:"2 yk"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Kimyon",amount:"1 çk"},
    {item:"Tuz",amount:""}
  ],
  steps:[
    "Haşlanmış nohutları blenderda püre yapın.",
    "Tahin, limon suyu, sarımsak ve baharatları ekleyin.",
    "Pürüzsüz olana kadar çekin (gerekirse nohut suyu ekleyin).",
    "Tabağa yayıp zeytinyağı gezdirerek servis edin."
  ]
},
{
  id:"r_falafel",name:"Falafel",cat:"vegan",
  emoji:"🫘",cal:57,prot:3,carb:5,fat:3,serv:"1 adet",time:30,
  tags:["vegan","vejetaryen","saglikli","proteinli"],
  ingredients:[
    {item:"Nohut (ıslatılmış, çiğ)",amount:"200g"},
    {item:"Soğan",amount:"yarım"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Maydanoz",amount:"1 demet"},
    {item:"Kimyon",amount:"1 çk"},
    {item:"Pul biber",amount:"1 çk"},
    {item:"Kabartma tozu",amount:"yarım çk"},
    {item:"Tuz",amount:""}
  ],
  steps:[
    "Nohutları önceden 12 saat ıslatın (haşlamayın!).",
    "Tüm malzemeleri mutfak robotundan geçirin.",
    "Köfte şekli verin.",
    "Kızgın yağda altın rengi olana kadar kızartın (veya fırında 200°C'de 20 dk)."
  ]
},
{
  id:"r_saksuka",name:"Şakşuka",cat:"vegan",
  emoji:"🍅",cal:100,prot:2.3,carb:11,fat:6.1,serv:"5 porsiyon",yieldServings:5,time:25,
  tags:["vegan","vejetaryen","saglikli","meze"],
  ingredients:[
    {item:"Patlıcan",amount:"2 adet"},
    {item:"Kabak",amount:"1 adet"},
    {item:"Biber",amount:"2 adet"},
    {item:"Domates",amount:"3 adet"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Tuz, karabiber",amount:""}
  ],
  steps:[
    "Patlıcan ve kabağı küp küp doğrayın, tuzlu suda bekletin.",
    "Zeytinyağında sarımsağı kavurun.",
    "Süzülmüş patlıcan ve kabağı ekleyip kavurun.",
    "Doğranmış biber ve domatesi ekleyin.",
    "Kısık ateşte 15 dk pişirip soğuk servis edin."
  ]
},

// ═══════════════════════════════════════════
// ══  TOST & DÜRÜM                        ══
// ═══════════════════════════════════════════
{
  id:"r_kasarli_tost",name:"Kaşarlı Tost",cat:"sandvic",
  emoji:"🥪",cal:280,prot:12,carb:28,fat:14,serv:"1 adet",yieldServings:1,time:10,
  tags:["pratik","kahvalti"],
  ingredients:[
    {item:"Tost ekmeği",amount:"2 dilim"},
    {item:"Kaşar peynir",amount:"50g"},
    {item:"Tereyağı",amount:"1 çk"}
  ],
  steps:[
    "Ekmek dilimlerinin arasına kaşarı koyun.",
    "Tost makinesinde veya tavada her iki yüzü kızarana kadar pişirin."
  ]
},
{
  id:"r_karışık_tost",name:"Karışık Tost",cat:"sandvic",
  emoji:"🥪",cal:260,prot:15.2,carb:2.2,fat:21.3,serv:"2 adet",yieldServings:2,time:10,
  tags:["pratik","et"],
  ingredients:[
    {item:"Tost ekmeği",amount:"2 dilim"},
    {item:"Kaşar peynir",amount:"40g"},
    {item:"Sucuk/salam",amount:"3 dilim"},
    {item:"Domates",amount:"2 dilim"},
    {item:"Tereyağı",amount:"1 çk"}
  ],
  steps:[
    "Malzemeleri ekmeklerin arasına dizin.",
    "Tost makinesinde kızarana kadar pişirin.",
    "Çapraz kesip servis edin."
  ]
},
{
  id:"r_tavuk_durum",name:"Tavuk Dürüm",cat:"sandvic",
  emoji:"🌯",cal:380,prot:22,carb:35,fat:16,serv:"1 adet",time:20,
  tags:["pratik","et","proteinli"],
  ingredients:[
    {item:"Tavuk göğsü",amount:"120g"},
    {item:"Lavaş",amount:"1 adet"},
    {item:"Marul, domates",amount:""},
    {item:"Soğan",amount:"yarım"},
    {item:"Mayonez veya yoğurt sos",amount:"1 yk"},
    {item:"Tuz, baharat",amount:""}
  ],
  steps:[
    "Tavuğu baharatlayıp ızgarada veya tavada pişirin.",
    "Şeritler halinde dilimleyin.",
    "Lavaşa sebzeleri ve tavuğu dizin.",
    "Sos ekleyip sıkıca sarın."
  ]
},
{
  id:"r_cigkofte_durum",name:"Çiğ Köfte Dürüm",cat:"sandvic",
  emoji:"🌯",cal:250,prot:8,carb:38,fat:7,serv:"1 adet",time:5,
  tags:["vegan","pratik"],
  ingredients:[
    {item:"Çiğ köfte",amount:"100g"},
    {item:"Lavaş",amount:"1 adet"},
    {item:"Marul",amount:"2-3 yaprak"},
    {item:"Domates",amount:"2 dilim"},
    {item:"Nar ekşisi",amount:"1 yk"},
    {item:"Limon",amount:"yarım"}
  ],
  steps:[
    "Lavaşın üzerine marul yapraklarını serin.",
    "Çiğ köfteyi yayın.",
    "Domates, nar ekşisi ve limon sıkın.",
    "Sıkıca sarıp servis edin."
  ]
},

// ═══════════════════════════════════════════
// ══  SALATALAR                            ══
// ═══════════════════════════════════════════
{
  id:"r_gavurdagi",name:"Gavurdağı Salatası",cat:"salata",
  emoji:"🥗",cal:97,prot:1.7,carb:8.4,fat:6.9,serv:"5 porsiyon",yieldServings:5,time:10,
  tags:["vegan","saglikli","meze","antep"],
  ingredients:[
    {item:"Domates",amount:"2 adet"},
    {item:"Salatalık",amount:"1 adet"},
    {item:"Ceviz",amount:"30g"},
    {item:"Nar ekşisi",amount:"2 yk"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Biber",amount:"1 adet"},
    {item:"Maydanoz",amount:"yarım demet"},
    {item:"Sumak",amount:"1 çk"}
  ],
  steps:[
    "Domates ve salatalığı küp doğrayın.",
    "Cevizi kırıp ekleyin.",
    "Nar ekşisi, zeytinyağı ve sumakla sosunu hazırlayın.",
    "Hepsini karıştırıp maydanozla servis edin."
  ]
},
{
  id:"r_piyaz",name:"Piyaz",cat:"salata",
  emoji:"🫘",cal:130,prot:6,carb:16,fat:5,serv:"1 porsiyon",time:15,
  tags:["vejetaryen","saglikli","meze","antalya"],
  ingredients:[
    {item:"Kuru fasulye (haşlanmış)",amount:"200g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Domates",amount:"1 adet"},
    {item:"Yumurta (haşlanmış)",amount:"1 adet"},
    {item:"Maydanoz",amount:"yarım demet"},
    {item:"Tahin",amount:"1 yk"},
    {item:"Limon suyu",amount:"2 yk"},
    {item:"Zeytinyağı",amount:"1 yk"}
  ],
  steps:[
    "Haşlanmış fasulyeleri bir kaba alın.",
    "Soğanı ince halka, domatesi küp doğrayın.",
    "Yumurtayı dilimleyin.",
    "Tahin, limon suyu ve zeytinyağıyla sos yapın.",
    "Hepsini harmanlayıp servis edin."
  ]
},
{
  id:"r_roka_salata",name:"Roka Salatası",cat:"salata",
  emoji:"🥗",cal:85,prot:2.4,carb:3.1,fat:7.5,serv:"4 porsiyon",yieldServings:4,time:5,
  tags:["vejetaryen","saglikli","pratik"],
  ingredients:[
    {item:"Roka",amount:"1 demet"},
    {item:"Parmesan",amount:"20g"},
    {item:"Ceviz",amount:"15g"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Nar ekşisi",amount:"1 çk"}
  ],
  steps:[
    "Rokayı yıkayıp tabağa serin.",
    "Parmesan rendesi ve ceviz serpip sosuyla servis edin."
  ]
},

// ═══════════════════════════════════════════
// ══  HAMUR İŞİ                           ══
// ═══════════════════════════════════════════
{
  id:"r_su_boregi",name:"Su Böreği",cat:"hamur",
  emoji:"🥧",cal:240,prot:8,carb:22,fat:13,serv:"1 dilim",time:60,
  tags:["hamur","geleneksel","vejetaryen"],
  ingredients:[
    {item:"Yufka",amount:"6 adet"},
    {item:"Beyaz peynir",amount:"300g"},
    {item:"Yumurta",amount:"3 adet"},
    {item:"Süt",amount:"1 bardak"},
    {item:"Sıvı yağ",amount:"yarım bardak"},
    {item:"Maydanoz",amount:"1 demet"},
    {item:"Tuz",amount:""}
  ],
  steps:[
    "Peyniri ezin, 1 yumurta ve maydanozla karıştırın.",
    "Kaynayan tuzlu suya yufkaları birer birer daldırıp hemen çıkarın.",
    "Yağlanmış tepsiye 2 yufka serin, peynir harcı yayın.",
    "Bu işlemi 3 kat yapın, en üste 2 yufka koyun.",
    "Yumurta, süt ve yağ karışımını üzerine gezdirin.",
    "180°C fırında 30-35 dk üzeri kızarana kadar pişirin."
  ]
},
{
  id:"r_gozleme",name:"Gözleme (Peynirli)",cat:"hamur",
  emoji:"🫓",cal:250,prot:10,carb:30,fat:10,serv:"1 adet",time:30,
  tags:["hamur","geleneksel","vejetaryen"],
  ingredients:[
    {item:"Un",amount:"2 su bardağı"},
    {item:"Su",amount:"yarım bardak"},
    {item:"Tuz",amount:"1 çk"},
    {item:"Beyaz peynir",amount:"150g"},
    {item:"Maydanoz",amount:"1 demet"},
    {item:"Tereyağı",amount:"eritme için"}
  ],
  steps:[
    "Un, su ve tuzla yumuşak hamur yoğurun, 20 dk dinlendirin.",
    "Peynir ve maydanozu karıştırın.",
    "Hamurdan bezeler alıp ince açın.",
    "Ortasına harç koyup kapatın.",
    "Sacda veya tavada her iki yüzü kızarana kadar pişirin.",
    "Tereyağı sürerek servis edin."
  ]
},
{
  id:"r_kiymali_pide",name:"Kıymalı Pide",cat:"hamur",
  emoji:"🫓",cal:279,prot:11.9,carb:38.5,fat:8.2,serv:"8 dilim",yieldServings:8,time:40,
  tags:["hamur","et","geleneksel"],
  ingredients:[
    {item:"Un",amount:"3 su bardağı"},
    {item:"Maya",amount:"1 paket"},
    {item:"Süt",amount:"yarım bardak"},
    {item:"Şeker",amount:"1 çk"},
    {item:"Kıyma",amount:"300g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Domates",amount:"1 adet"},
    {item:"Biber",amount:"2 adet"},
    {item:"Tuz, karabiber",amount:""}
  ],
  steps:[
    "Ilık sütte mayayı ve şekeri eritin.",
    "Un ve tuzla yumuşak hamur yoğurup 40 dk mayalandırın.",
    "Kıyma, doğranmış soğan, domates ve biberi karıştırın.",
    "Hamuru oval açıp iç harcı yayın, kenarları kıvırın.",
    "230°C fırında 15-18 dk pişirin.",
    "Tereyağı sürerek sıcak servis edin."
  ]
},
{
  id:"r_lahmacun",name:"Lahmacun",cat:"hamur",
  emoji:"🫓",cal:210,prot:9,carb:28,fat:7,serv:"1 adet",time:35,
  tags:["hamur","et","geleneksel","pratik"],
  ingredients:[
    {item:"Un",amount:"2 su bardağı"},
    {item:"Maya",amount:"yarım paket"},
    {item:"Kıyma",amount:"200g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Domates",amount:"1 adet"},
    {item:"Biber",amount:"2 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Maydanoz",amount:"1 demet"},
    {item:"Limon",amount:"servis için"}
  ],
  steps:[
    "Hamuru yoğurup 30 dk mayalandırın.",
    "Kıyma, doğranmış sebze ve salçayı karıştırıp iç harç yapın.",
    "Hamurdan bezeler alıp çok ince açın.",
    "Üzerine ince bir tabaka harç yayın.",
    "250°C fırında 8-10 dk pişirin.",
    "Maydanoz ve limonla sararak servis edin."
  ]
},

// ═══════════════════════════════════════════
// ══  MEZELER                              ══
// ═══════════════════════════════════════════
{
  id:"r_haydari",name:"Haydari",cat:"meze",
  emoji:"🥒",cal:95,prot:5,carb:4,fat:7,serv:"100g",time:10,
  tags:["vejetaryen","meze","saglikli"],
  ingredients:[
    {item:"Süzme yoğurt",amount:"500g"},
    {item:"Beyaz peynir",amount:"100g"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Dereotu",amount:"yarım demet"},
    {item:"Nane (kuru)",amount:"1 çk"},
    {item:"Zeytinyağı",amount:"1 yk"}
  ],
  steps:[
    "Yoğurdu süzün (veya süzme yoğurt kullanın).",
    "Peyniri ezin, sarımsağı rendeleyin.",
    "Dereotunu ince kıyın.",
    "Hepsini karıştırın, zeytinyağı gezdirip servis edin."
  ]
},
{
  id:"r_babaganus",name:"Babaganuş",cat:"meze",
  emoji:"🍆",cal:87,prot:2.3,carb:9.3,fat:5.4,serv:"100g",yieldServings:6,time:25,
  tags:["vegan","meze","saglikli"],
  ingredients:[
    {item:"Patlıcan",amount:"3 adet"},
    {item:"Tahin",amount:"2 yk"},
    {item:"Limon suyu",amount:"2 yk"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Tuz, kimyon",amount:""}
  ],
  steps:[
    "Patlıcanları közleyin (ocakta veya fırında).",
    "Kabuklarını soyup ezin.",
    "Tahin, limon, sarımsak ve baharatları ekleyin.",
    "İyice karıştırıp zeytinyağı gezdirerek servis edin."
  ]
},
{
  id:"r_acili_ezme",name:"Acılı Ezme",cat:"meze",
  emoji:"🌶️",cal:62,prot:1.6,carb:9.1,fat:2.8,serv:"100g",yieldServings:6,time:10,
  tags:["vegan","meze","pratik","antep"],
  ingredients:[
    {item:"Domates",amount:"3 adet"},
    {item:"Biber (sivri)",amount:"3 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Maydanoz",amount:"1 demet"},
    {item:"Biber salçası",amount:"1 yk"},
    {item:"Nar ekşisi",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Pul biber",amount:"1 çk"},
    {item:"İsot",amount:"1 çk"}
  ],
  steps:[
    "Tüm sebzeleri çok ince kıyın (zırh ile).",
    "Salça, nar ekşisi, zeytinyağı ve baharatları ekleyin.",
    "İyice karıştırıp 10 dk dinlendirin.",
    "Ekmek veya lavaşla servis edin."
  ]
},
{
  id:"r_atom",name:"Atom (Antep Ezmesi)",cat:"meze",
  emoji:"🌶️",cal:70,prot:2,carb:5,fat:5,serv:"100g",time:10,
  tags:["vejetaryen","meze","antep"],
  ingredients:[
    {item:"Ceviz",amount:"100g"},
    {item:"Biber salçası",amount:"2 yk"},
    {item:"Domates salçası",amount:"1 yk"},
    {item:"Sarımsak",amount:"3 diş"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Pul biber",amount:"1 yk"},
    {item:"Tuz, kimyon",amount:""}
  ],
  steps:[
    "Cevizi havanda veya robottan geçirin.",
    "Salçalar, sarımsak ve baharatları ekleyin.",
    "Zeytinyağıyla harmanlayıp macun kıvamında karıştırın.",
    "Ekmekle servis edin."
  ]
},
{
  id:"r_topik",name:"Topik",cat:"meze",
  emoji:"🫘",cal:120,prot:4,carb:14,fat:5,serv:"1 porsiyon",time:40,
  tags:["vegan","meze","geleneksel"],
  ingredients:[
    {item:"Nohut (haşlanmış)",amount:"200g"},
    {item:"Patates (haşlanmış)",amount:"2 adet"},
    {item:"Soğan",amount:"2 adet"},
    {item:"Tahin",amount:"2 yk"},
    {item:"Kuşüzümü",amount:"2 yk"},
    {item:"Çam fıstığı",amount:"2 yk"},
    {item:"Tarçın, kimyon",amount:""},
    {item:"Tuz",amount:""}
  ],
  steps:[
    "Nohut ve patatesi ezin, karıştırarak hamur kıvamında yoğurun.",
    "Soğanları kavurup kuşüzümü ve çam fıstığı ekleyin.",
    "Nohut hamurunu avucunuzda yassılaştırın, iç harcı koyup kapatın.",
    "Rulo şekli verip dilimleyerek servis edin."
  ]
},

// ═══════════════════════════════════════════
// ══  EK KLASİK TARİFLER                  ══
// ═══════════════════════════════════════════
{
  id:"r_ali_nazik",name:"Ali Nazik",cat:"klasik",
  emoji:"🥩",cal:298,prot:18.4,carb:18.9,fat:17.8,serv:"3 porsiyon",yieldServings:3,time:40,
  tags:["et","proteinli","kebap","antep"],
  ingredients:[
    {item:"Kuzu kuşbaşı",amount:"200g"},
    {item:"Patlıcan",amount:"3 adet"},
    {item:"Yoğurt",amount:"200g"},
    {item:"Sarımsak",amount:"3 diş"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Tuz, pul biber",amount:""}
  ],
  steps:[
    "Patlıcanları közleyip kabuklarını soyun, ezin.",
    "Yoğurt ve sarımsakla karıştırın.",
    "Eti tereyağında kavurup pişirin.",
    "Patlıcanlı yoğurdu tabağa yayın, eti üzerine koyup servis edin."
  ]
},
{
  id:"r_cerkez_tavugu",name:"Çerkez Tavuğu",cat:"klasik",
  emoji:"🍗",cal:348,prot:8.2,carb:7.9,fat:34.3,serv:"3 porsiyon",yieldServings:3,time:40,
  tags:["et","geleneksel","soğuk"],
  ingredients:[
    {item:"Tavuk göğsü",amount:"300g"},
    {item:"Ceviz",amount:"150g"},
    {item:"Bayat ekmek",amount:"2 dilim"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Ceviz yağı",amount:"1 yk"},
    {item:"Pul biber",amount:""},
    {item:"Tuz",amount:""}
  ],
  steps:[
    "Tavuğu haşlayıp didikleyin, suyunu ayırın.",
    "Ceviz, ıslak ekmek ve sarımsağı blenderda çekin.",
    "Tavuk suyuyla açarak sos kıvamına getirin.",
    "Tavuğu tabağa yayın, ceviz sosunu gezdirin.",
    "Ceviz yağında pul biberi ısıtıp üzerine dökün."
  ]
},
{
  id:"r_tas_kebabi",name:"Tas Kebabı",cat:"klasik",
  emoji:"🥩",cal:310,prot:30.2,carb:14.8,fat:15.5,serv:"2 porsiyon",yieldServings:2,time:60,
  tags:["et","geleneksel","proteinli"],
  ingredients:[
    {item:"Dana kuşbaşı",amount:"250g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Biber",amount:"2 adet"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Domates salçası",amount:"1 yk"},
    {item:"Tuz, karabiber",amount:""}
  ],
  steps:[
    "Eti tereyağında kavurun, soğanı ekleyin.",
    "Salçayı ekleyip kavurun.",
    "Sıcak su ekleyin, kapağı kapalı kısık ateşte 40 dk pişirin.",
    "Domates ve biberleri ekleyip 15 dk daha pişirin.",
    "Pilavla servis edin."
  ]
},
{
  id:"r_kuzu_tandir",name:"Kuzu Tandır",cat:"klasik",
  emoji:"🥩",cal:437,prot:34.8,carb:10.9,fat:28.5,serv:"3 porsiyon",yieldServings:3,time:180,
  tags:["et","proteinli","geleneksel"],
  ingredients:[
    {item:"Kuzu eti (kemikli)",amount:"500g"},
    {item:"Soğan",amount:"2 adet"},
    {item:"Sarımsak",amount:"4 diş"},
    {item:"Defne yaprağı",amount:"2 adet"},
    {item:"Kekik",amount:"1 yk"},
    {item:"Tuz, karabiber",amount:""},
    {item:"Su",amount:"1 bardak"}
  ],
  steps:[
    "Kuzu etini büyük parçalar halinde tepsiye koyun.",
    "Soğan ve sarımsağı ekleyin.",
    "Baharatları ve suyu ilave edin.",
    "Aluminyum folyo ile sıkıca kapatın.",
    "150°C fırında 3 saat pişirin.",
    "Kemiklerinden ayrılacak kıvamda olmalı."
  ]
},
{
  id:"r_pilav_ustu_kuru",name:"Pilav Üstü Kuru Fasulye",cat:"klasik",
  emoji:"🍲",cal:411,prot:20.1,carb:72,fat:5.1,serv:"4 porsiyon",yieldServings:4,time:50,
  tags:["baklagil","et","geleneksel"],
  ingredients:[
    {item:"Kuru fasulye (haşlanmış)",amount:"200g"},
    {item:"Dana kuşbaşı",amount:"80g"},
    {item:"Domates salçası",amount:"1 yk"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Pirinç",amount:"1 bardak"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Tuz, karabiber, pul biber",amount:""}
  ],
  steps:[
    "Eti kavurup soğan ve salçayı ekleyin.",
    "Haşlanmış fasulyeleri ve su ekleyip 30 dk pişirin.",
    "Pilav yapın: pirinci yağda kavurup su ekleyin, pişirip dinlendirin.",
    "Pilavı tabağa alıp üzerine kuru fasulye dökün.",
    "Turşu ve soğanla servis edin."
  ]
},
{
  id:"r_icki_kofte",name:"İçli Köfte",cat:"klasik",
  emoji:"🥩",cal:160,prot:8,carb:18,fat:6,serv:"1 adet",time:60,
  tags:["et","geleneksel","antep"],
  ingredients:[
    {item:"İnce bulgur",amount:"2 bardak"},
    {item:"İrmik",amount:"yarım bardak"},
    {item:"Kıyma",amount:"200g"},
    {item:"Soğan",amount:"2 adet"},
    {item:"Ceviz",amount:"50g"},
    {item:"Domates salçası",amount:"1 yk"},
    {item:"Tuz, pul biber, kimyon",amount:""}
  ],
  steps:[
    "Dış harcı yapın: Bulgur, irmik ve sıcak su ile yoğurup köfte hamuru hazırlayın.",
    "İç harcı yapın: Kıymayı soğanla kavurup ceviz, salça ve baharatları ekleyin.",
    "Hamurdan ceviz büyüklüğünde parça alıp parmakla oyun, iç harç koyun, kapatın.",
    "Kaynayan yağda altın rengi olana kadar kızartın."
  ]
},
{
  id:"r_et_sote",name:"Et Sote",cat:"klasik",
  emoji:"🥘",cal:267,prot:24.5,carb:13.8,fat:13.6,serv:"2 porsiyon",yieldServings:2,time:45,
  tags:["et","proteinli","geleneksel"],
  ingredients:[
    {item:"Dana kuşbaşı",amount:"200g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Biber",amount:"2 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Domates salçası",amount:"1 çk"},
    {item:"Tuz, karabiber",amount:""}
  ],
  steps:[
    "Eti tereyağında kavurun.",
    "Soğanı ekleyip pembeleşene kadar soteleyin.",
    "Salçayı ekleyin, sıcak su ilave edip 30 dk pişirin.",
    "Doğranmış biber ve domatesi ekleyip 10 dk daha pişirin.",
    "Pilavla servis edin."
  ]
},
{
  id:"r_bezelye",name:"Etli Bezelye",cat:"klasik",
  emoji:"🟢",cal:199,prot:13.9,carb:23.5,fat:6.1,serv:"4 porsiyon",yieldServings:4,time:35,
  tags:["sebze","et","geleneksel"],
  ingredients:[
    {item:"Bezelye",amount:"300g"},
    {item:"Dana kuşbaşı",amount:"150g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Patates",amount:"1 adet"},
    {item:"Domates salçası",amount:"1 yk"},
    {item:"Tereyağı",amount:"1 yk"}
  ],
  steps:[
    "Eti kavurup soğanı ekleyin.",
    "Salçayı ilave edip sıcak su ekleyin.",
    "15 dk pişirdikten sonra küp doğranmış havuç ve patatesi ekleyin.",
    "5 dk sonra bezelyeleri ekleyip tüm sebzeler yumuşayana kadar pişirin."
  ]
},
{
  id:"r_sac_kavurma",name:"Sac Kavurma",cat:"klasik",
  emoji:"🥘",cal:407,prot:27.6,carb:14.2,fat:27.4,serv:"2 porsiyon",yieldServings:2,time:30,
  tags:["et","proteinli","geleneksel"],
  ingredients:[
    {item:"Kuzu kuşbaşı",amount:"250g"},
    {item:"Domates",amount:"2 adet"},
    {item:"Biber",amount:"3 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Kuyruk yağı veya tereyağı",amount:"1 yk"},
    {item:"Tuz, karabiber, pul biber",amount:""}
  ],
  steps:[
    "Sacı (veya geniş tavayı) kızdırın.",
    "Eti yağda suyunu çekene kadar kavurun.",
    "Soğanları ekleyip kavurun.",
    "Domates ve biberleri ilave edip 5 dk daha pişirin.",
    "Ekmek veya lavaşla sıcak servis edin."
  ]
},
{
  id:"r_arnavut_cigeri",name:"Arnavut Ciğeri",cat:"klasik",
  emoji:"🥩",cal:265,prot:27.9,carb:25.9,fat:4.9,serv:"2 porsiyon",yieldServings:2,time:20,
  tags:["et","proteinli","geleneksel"],
  ingredients:[
    {item:"Dana ciğer",amount:"250g"},
    {item:"Un",amount:"3 yk"},
    {item:"Soğan",amount:"1 büyük"},
    {item:"Sivri biber",amount:"3 adet"},
    {item:"Kızartma yağı",amount:""},
    {item:"Sumak, pul biber",amount:""},
    {item:"Tuz",amount:""}
  ],
  steps:[
    "Ciğeri küçük küpler halinde doğrayın.",
    "Unla kaplayın.",
    "Kızgın yağda çıtır kızarıncaya kadar pişirin.",
    "Soğanı ince halka doğrayıp sumak ve pul biberle karıştırın.",
    "Ciğeri soğan salatası ve biberlerle servis edin."
  ]
},
{
  id:"r_kofte_izgara",name:"Izgara Köfte",cat:"klasik",
  emoji:"🥩",cal:90,prot:9,carb:2,fat:5,serv:"1 adet",time:25,
  tags:["et","proteinli","pratik"],
  ingredients:[
    {item:"Dana kıyma",amount:"500g"},
    {item:"Soğan (rendelenmiş)",amount:"1 adet"},
    {item:"Ekmek içi",amount:"1 dilim"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Maydanoz",amount:"yarım demet"},
    {item:"Kimyon, karabiber, tuz",amount:""},
    {item:"Pul biber",amount:"1 çk"}
  ],
  steps:[
    "Kıyma, rendelenmiş soğan, ıslak ekmek içi ve yumurtayı yoğurun.",
    "Baharatları ve maydanozu ekleyin.",
    "10 dk buzdolabında dinlendirin.",
    "Köfte şekli verip ızgarada veya tavada pişirin."
  ]
},
{
  id:"r_tantuni",name:"Tantuni",cat:"klasik",
  emoji:"🌯",cal:380,prot:25,carb:30,fat:18,serv:"1 porsiyon",time:15,
  tags:["et","proteinli","pratik","mersin"],
  ingredients:[
    {item:"Dana eti (ince dilimlenmiş)",amount:"200g"},
    {item:"Lavaş",amount:"2 adet"},
    {item:"Domates",amount:"1 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Maydanoz",amount:"yarım demet"},
    {item:"Sıvı yağ",amount:"2 yk"},
    {item:"Pul biber, tuz, kimyon",amount:""}
  ],
  steps:[
    "Eti çok ince doğrayın.",
    "Sac tavada bolca yağda kavurun.",
    "Doğranmış soğan, domates ve maydanozu ekleyin.",
    "Baharatlayıp lavaşa sararak servis edin."
  ]
},

// ═══════════════════════════════════════════
// ══  FIT EK TARİFLER                     ══
// ═══════════════════════════════════════════
{
  id:"r_fit_kinoa_salata",name:"Kinoalı Salata",cat:"fit",
  emoji:"🥗",cal:210,prot:8,carb:28,fat:8,serv:"1 porsiyon",time:20,
  tags:["saglikli","fit","vejetaryen"],
  ingredients:[
    {item:"Kinoa",amount:"yarım bardak"},
    {item:"Roka",amount:"1 avuç"},
    {item:"Domates",amount:"1 adet"},
    {item:"Salatalık",amount:"1 adet"},
    {item:"Avokado",amount:"yarım"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"1 yk"}
  ],
  steps:[
    "Kinoayı haşlayıp soğutun.",
    "Sebzeleri doğrayıp kinoayla karıştırın.",
    "Limon ve zeytinyağı sosuyla servis edin."
  ]
},
{
  id:"r_fit_balik",name:"Fırında Somon",cat:"fit",
  emoji:"🐟",cal:250,prot:28,carb:5,fat:14,serv:"1 porsiyon",time:25,
  tags:["proteinli","saglikli","fit"],
  ingredients:[
    {item:"Somon fileto",amount:"180g"},
    {item:"Limon",amount:"yarım"},
    {item:"Zeytinyağı",amount:"1 çk"},
    {item:"Dereotu",amount:"2 dal"},
    {item:"Tuz, karabiber",amount:""},
    {item:"Sarımsak",amount:"1 diş"}
  ],
  steps:[
    "Somonu baharatlayıp limon suyu gezdirin.",
    "Fırın kağıdına koyun, dereotu ve sarımsak ekleyin.",
    "200°C fırında 15-18 dk pişirin.",
    "Sebze garnisi ile servis edin."
  ]
},
{
  id:"r_fit_chia_puding",name:"Chia Puding",cat:"fit",
  emoji:"🥣",cal:180,prot:8,carb:20,fat:8,serv:"1 kase",time:5,
  tags:["saglikli","fit","vejetaryen","kahvalti"],
  ingredients:[
    {item:"Chia tohumu",amount:"3 yk"},
    {item:"Süt (badem veya normal)",amount:"200ml"},
    {item:"Bal",amount:"1 çk"},
    {item:"Meyve (çilek, muz vb.)",amount:""},
    {item:"Granola",amount:"1 yk"}
  ],
  steps:[
    "Chia tohumunu süt ve balla karıştırın.",
    "Buzdolabında en az 4 saat (tercihen gece boyu) bekletin.",
    "Üzerine meyve ve granola ekleyip servis edin."
  ]
},
{
  id:"r_fit_yumurta_muffin",name:"Sebzeli Yumurta Muffin",cat:"fit",
  emoji:"🧁",cal:70,prot:6,carb:2,fat:4,serv:"1 adet",time:25,
  tags:["proteinli","saglikli","fit","pratik","kahvalti"],
  ingredients:[
    {item:"Yumurta",amount:"6 adet"},
    {item:"Ispanak",amount:"1 avuç"},
    {item:"Domates",amount:"1 adet"},
    {item:"Biber",amount:"1 adet"},
    {item:"Peynir",amount:"50g"},
    {item:"Tuz, karabiber",amount:""}
  ],
  steps:[
    "Yumurtaları çırpın, doğranmış sebzeleri ve peyniri ekleyin.",
    "Muffin kalıplarına paylaştırın.",
    "180°C fırında 18-20 dk pişirin.",
    "5 günlük meal prep yapılabilir."
  ]
},

// ═══════════════════════════════════════════
// ══  EK: POPÜLER TÜRK YEMEKLERİ (35)      ══
// ═══════════════════════════════════════════
{
  id:"r_adana_kebap",name:"Adana Kebap",cat:"klasik",
  emoji:"🥩",cal:651,prot:32.3,carb:42.6,fat:39.8,serv:"2 porsiyon",yieldServings:2,time:45,
  tags:["et","kebap","acı","klasik"],
  ingredients:[
    {item:"Kuzu kıyma (yağlı)",amount:"200g"},
    {item:"Kuyruk yağı",amount:"30g"},
    {item:"Kırmızı biber (közlenmiş)",amount:"1 adet"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Pul biber",amount:"1 yk"},
    {item:"Lavaş",amount:"1 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Maydanoz",amount:"1 demet"},
    {item:"Sumak",amount:"1 çk"}
  ],
  steps:[
    "Kıyma, kuyruk yağı, közlenmiş biber, sarımsak ve baharatları yoğurun.",
    "Yarım saat buzdolabında dinlendirin.",
    "Yassı şişlere sıvayın.",
    "Mangal veya ızgarada her iki tarafını 4-5 dk pişirin.",
    "Lavaş üzerinde sumaklı soğan ve maydanozla servis edin."
  ]
},
{
  id:"r_urfa_kebap",name:"Urfa Kebap",cat:"klasik",
  emoji:"🥩",cal:469,prot:19.6,carb:11.4,fat:38.8,serv:"2 porsiyon",yieldServings:2,time:45,
  tags:["et","kebap","acısız","klasik"],
  ingredients:[
    {item:"Kuzu kıyma (yağlı)",amount:"200g"},
    {item:"Kuyruk yağı",amount:"30g"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Karabiber",amount:"1 çk"},
    {item:"Tuz",amount:"1 çk"},
    {item:"Lavaş",amount:"1 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Maydanoz",amount:"1 demet"}
  ],
  steps:[
    "Kıymayı kuyruk yağı, sarımsak, tuz ve karabiberle iyice yoğurun.",
    "Yassı şişe eşit şekilde sıvayın.",
    "Mangalda 4-5 dk çevirerek pişirin.",
    "Lavaşa sarıp sumaklı soğanla servis edin."
  ]
},
{
  id:"r_sis_kebap",name:"Şiş Kebap",cat:"klasik",
  emoji:"🍢",cal:420,prot:38,carb:12,fat:25,serv:"1 porsiyon",time:90,
  tags:["et","kebap","mangal","proteinli"],
  ingredients:[
    {item:"Kuzu kuşbaşı",amount:"200g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Süt",amount:"2 yk"},
    {item:"Kekik",amount:"1 çk"},
    {item:"Domates",amount:"2 adet"},
    {item:"Sivri biber",amount:"2 adet"},
    {item:"Lavaş",amount:"1 adet"}
  ],
  steps:[
    "Kuşbaşıyı rendelenmiş soğan, süt, zeytinyağı ve kekikle 4 saat marine edin.",
    "Domates, biber ve eti şişlere dizin.",
    "Mangalda her yüzünü 3-4 dk pişirin.",
    "Lavaş üzerinde servis edin."
  ]
},
{
  id:"r_tavuk_sis",name:"Tavuk Şiş",cat:"klasik",
  emoji:"🍗",cal:320,prot:35,carb:8,fat:16,serv:"1 porsiyon",yieldServings:1,time:60,
  tags:["tavuk","mangal","proteinli"],
  ingredients:[
    {item:"Tavuk göğüs",amount:"200g"},
    {item:"Yoğurt",amount:"2 yk"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Salça",amount:"1 çk"},
    {item:"Sarımsak",amount:"1 diş"},
    {item:"Kekik",amount:"1 çk"},
    {item:"Biber",amount:"1 adet"},
    {item:"Soğan",amount:"1 adet"}
  ],
  steps:[
    "Tavuğu küpler halinde doğrayın. Yoğurt, salça, sarımsak ve baharatlarla karıştırın.",
    "En az 1 saat marine edin.",
    "Şişlere biber ve soğanla dizin.",
    "Mangal veya ızgarada 10-12 dk pişirin."
  ]
},
{
  id:"r_cag_kebabi",name:"Cağ Kebabı",cat:"klasik",
  emoji:"🥩",cal:490,prot:32,carb:20,fat:30,serv:"1 porsiyon",time:60,
  tags:["et","kebap","erzurum","klasik"],
  ingredients:[
    {item:"Kuzu kuşbaşı",amount:"180g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Karabiber",amount:"1 çk"},
    {item:"Lavaş",amount:"1 adet"},
    {item:"Maydanoz",amount:"1 demet"}
  ],
  steps:[
    "Eti ince ince doğrayıp rendelenmiş soğan ve baharatlarla marine edin.",
    "Yatay şişe dizin.",
    "Odun ateşinde 20 dk döndürerek pişirin.",
    "Lavaş üzerinde maydanozla servis edin."
  ]
},
{
  id:"r_kuzu_incik",name:"Fırında Kuzu İncik",cat:"klasik",
  emoji:"🍖",cal:619,prot:35.8,carb:43.9,fat:34.1,serv:"2 porsiyon",yieldServings:2,time:180,
  tags:["et","fırın","klasik"],
  ingredients:[
    {item:"Kuzu incik",amount:"300g"},
    {item:"Patates",amount:"2 adet"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Sarımsak",amount:"4 diş"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Biberiye",amount:"1 dal"},
    {item:"Domates",amount:"2 adet"},
    {item:"Et suyu",amount:"1 bardak"}
  ],
  steps:[
    "İnciği tuz ve karabiberle ovun, zeytinyağında mühürleyin.",
    "Fırın kabına patates, havuç, soğan, sarımsak ve biberiye yerleştirin.",
    "Et suyunu dökün, üzerini folyoyla kapatın.",
    "160°C fırında 2.5 saat pişirin.",
    "Son 20 dk folyoyu açıp üstünü kızartın."
  ]
},
{
  id:"r_kuzu_pirzola",name:"Kuzu Pirzola",cat:"klasik",
  emoji:"🍖",cal:450,prot:35,carb:2,fat:33,serv:"1 porsiyon",time:30,
  tags:["et","mangal","proteinli"],
  ingredients:[
    {item:"Kuzu pirzola",amount:"250g"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Kekik",amount:"1 çk"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Karabiber",amount:"1 çk"},
    {item:"Tuz",amount:"1 çk"}
  ],
  steps:[
    "Pirzolaları zeytinyağı, ezilmiş sarımsak ve kekikle marine edin.",
    "Izgarayı çok iyi ısıtın.",
    "Her iki yüzünü 2-3 dk pişirin (medium).",
    "5 dk dinlendirip servis edin."
  ]
},
{
  id:"r_inegol_kofte",name:"İnegöl Köfte",cat:"klasik",
  emoji:"🍖",cal:397,prot:25.1,carb:9.2,fat:28.4,serv:"4 adet",yieldServings:2,time:40,
  tags:["et","kofte","mangal"],
  ingredients:[
    {item:"Dana kıyma",amount:"250g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Ekmek içi",amount:"1 dilim"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Karabiber",amount:"1 çk"},
    {item:"Tuz",amount:"1 çk"}
  ],
  steps:[
    "Kıymayı rendelenmiş soğan, ıslatılmış ekmek içi ve sarımsakla yoğurun.",
    "30 dk dinlendirin.",
    "Uzun şekilde köfteler yapın.",
    "Izgarada her iki tarafını 4-5 dk pişirin."
  ]
},
{
  id:"r_etli_kabak_dolma",name:"Etli Kabak Dolma",cat:"sebze",
  emoji:"🥒",cal:310,prot:18,carb:28,fat:14,serv:"1 porsiyon",time:75,
  tags:["dolma","sebze","geleneksel"],
  ingredients:[
    {item:"Sakız kabağı",amount:"4 adet"},
    {item:"Dana kıyma",amount:"150g"},
    {item:"Pirinç",amount:"3 yk"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Maydanoz",amount:"1 demet"},
    {item:"Nane",amount:"1 çk"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Yoğurt",amount:"100g"}
  ],
  steps:[
    "Kabakları oyun, iç harçlarını saklayın.",
    "Kıyma, pirinç, soğan, salça ve baharatları karıştırın.",
    "Kabakları doldurun, tencereye dizin.",
    "Domates rendesi ve su ekleyip 45 dk pişirin.",
    "Sarımsaklı yoğurtla servis edin."
  ]
},
{
  id:"r_bamya",name:"Etli Bamya",cat:"sebze",
  emoji:"🫛",cal:211,prot:13.2,carb:11.7,fat:13.4,serv:"3 porsiyon",yieldServings:3,time:60,
  tags:["sebze","et","geleneksel"],
  ingredients:[
    {item:"Kuru bamya",amount:"100g"},
    {item:"Dana kuşbaşı",amount:"150g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Sıcak su",amount:"2 bardak"}
  ],
  steps:[
    "Eti soğanla kavurun, salça ve domatesi ekleyin.",
    "Bamyayı yıkayıp katın.",
    "Sıcak su ve limon suyunu ekleyin.",
    "Kısık ateşte 40 dk pişirin."
  ]
},
{
  id:"r_etli_turlu",name:"Etli Türlü",cat:"sebze",
  emoji:"🍲",cal:275,prot:15.4,carb:25.5,fat:13.8,serv:"3 porsiyon",yieldServings:3,time:80,
  tags:["sebze","et","güveç"],
  ingredients:[
    {item:"Dana kuşbaşı",amount:"150g"},
    {item:"Patates",amount:"1 adet"},
    {item:"Kabak",amount:"1 adet"},
    {item:"Patlıcan",amount:"1 adet"},
    {item:"Biber",amount:"2 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"2 yk"}
  ],
  steps:[
    "Eti soğanla kavurun.",
    "Tüm sebzeleri kuşbaşı doğrayıp güvece dizin.",
    "Salça, domates ve biraz sıcak su ekleyin.",
    "180°C fırında 60 dk pişirin."
  ]
},
{
  id:"r_zeytinyagli_pirasa",name:"Zeytinyağlı Pırasa",cat:"sebze",
  emoji:"🥬",cal:176,prot:2.4,carb:23.7,fat:8.8,serv:"5 porsiyon",yieldServings:5,time:50,
  tags:["zeytinyağlı","vegan","sebze"],
  ingredients:[
    {item:"Pırasa",amount:"500g"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Pirinç",amount:"2 yk"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Zeytinyağı",amount:"3 yk"},
    {item:"Şeker",amount:"1 çk"},
    {item:"Limon suyu",amount:"1 yk"}
  ],
  steps:[
    "Pırasayı halka, havucu küp doğrayın.",
    "Soğanı zeytinyağında kavurun.",
    "Havuç ve pırasayı ekleyip soteleyin.",
    "Pirinç, şeker, tuz ve 1 bardak su ekleyin.",
    "Kısık ateşte 30 dk pişirin. Soğuk servis edin."
  ]
},
{
  id:"r_zeytinyagli_enginar",name:"Zeytinyağlı Enginar",cat:"sebze",
  emoji:"🌿",cal:155,prot:6.4,carb:24.3,fat:5.7,serv:"8 porsiyon",yieldServings:8,time:60,
  tags:["zeytinyağlı","vegan","klasik"],
  ingredients:[
    {item:"Enginar",amount:"4 adet"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Patates",amount:"1 adet"},
    {item:"Bezelye",amount:"1 avuç"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Zeytinyağı",amount:"3 yk"},
    {item:"Limon suyu",amount:"1 adet"},
    {item:"Dereotu",amount:"1 demet"}
  ],
  steps:[
    "Enginarları limonlu suda bekletin.",
    "Soğanı zeytinyağında kavurun, havuç ve patatesi ekleyin.",
    "Enginarları üzerine dizin, bezelye ve limon suyu ekleyin.",
    "1 bardak su ile kısık ateşte 40 dk pişirin.",
    "Soğuk, dereotuyla servis edin."
  ]
},
{
  id:"r_barbunya_pilaki",name:"Barbunya Pilaki",cat:"vegan",
  emoji:"🫘",cal:281,prot:13,carb:41.9,fat:7.8,serv:"6 porsiyon",yieldServings:6,time:90,
  tags:["vegan","zeytinyağlı","baklagil"],
  ingredients:[
    {item:"Taze barbunya",amount:"300g"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Patates",amount:"1 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Sarımsak",amount:"3 diş"},
    {item:"Domates",amount:"1 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"3 yk"},
    {item:"Şeker",amount:"1 çk"},
    {item:"Maydanoz",amount:"1 demet"}
  ],
  steps:[
    "Barbunyaları haşlayıp süzün.",
    "Soğan ve havucu zeytinyağında kavurun.",
    "Salça, domates, sarımsak ekleyin.",
    "Barbunya, patates, şeker ve 2 bardak su ekleyin.",
    "45 dk pişirin. Soğuk, maydanozla servis edin."
  ]
},
{
  id:"r_tavuklu_pilav",name:"Tavuklu Pirinç Pilavı",cat:"pratik",
  emoji:"🍚",cal:356,prot:16,carb:50.2,fat:9.6,serv:"3 porsiyon",yieldServings:3,time:45,
  tags:["pilav","tavuk","pratik"],
  ingredients:[
    {item:"Pirinç",amount:"1 bardak"},
    {item:"Tavuk göğüs",amount:"150g"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Tavuk suyu",amount:"2 bardak"},
    {item:"Tuz",amount:"1 çk"}
  ],
  steps:[
    "Pirinci yıkayıp bekletin.",
    "Tavuğu haşlayın, didikleyin.",
    "Tereyağı ve zeytinyağında pirinci kavurun.",
    "Tavuk suyu ve tuzu ekleyin.",
    "Suyunu çekene kadar pişirin, didiklenmiş tavukla karıştırın.",
    "10 dk demlenmeye bırakın."
  ]
},
{
  id:"r_ic_pilav",name:"İç Pilav",cat:"pratik",
  emoji:"🍚",cal:391,prot:7,carb:63.6,fat:12.9,serv:"3 porsiyon",yieldServings:3,time:50,
  tags:["pilav","klasik","davet"],
  ingredients:[
    {item:"Pirinç",amount:"1 bardak"},
    {item:"Kuş üzümü",amount:"2 yk"},
    {item:"Çam fıstığı",amount:"2 yk"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Tereyağı",amount:"2 yk"},
    {item:"Tarçın",amount:"1 çk"},
    {item:"Yenibahar",amount:"1 çk"},
    {item:"Dereotu",amount:"1 demet"},
    {item:"Su",amount:"2 bardak"}
  ],
  steps:[
    "Tereyağında çam fıstığını pembeleştirin.",
    "Soğanı ekleyip kavurun, pirinci de kavurun.",
    "Kuş üzümü ve baharatları ekleyin.",
    "Sıcak su ve tuzu ekleyin.",
    "Suyunu çekene kadar pişirin, dereotu serpin."
  ]
},
{
  id:"r_sehriyeli_pilav",name:"Şehriyeli Pirinç Pilavı",cat:"pratik",
  emoji:"🍚",cal:320,prot:7,carb:52,fat:9,serv:"1 porsiyon",time:35,
  tags:["pilav","pratik","klasik"],
  ingredients:[
    {item:"Pirinç",amount:"1 bardak"},
    {item:"Arpa şehriye",amount:"2 yk"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Sıcak su",amount:"2 bardak"},
    {item:"Tuz",amount:"1 çk"}
  ],
  steps:[
    "Tereyağı ve zeytinyağında şehriyeyi kızartın.",
    "Pirinci ekleyip kavurun.",
    "Sıcak su ve tuzu ilave edin.",
    "Kısık ateşte suyunu çekene kadar pişirin.",
    "10 dk demlenmeye bırakın."
  ]
},
{
  id:"r_hamsi_tava",name:"Hamsi Tava",cat:"klasik",
  emoji:"🐟",cal:302,prot:17.6,carb:8.6,fat:22.3,serv:"3 porsiyon",yieldServings:3,time:25,
  tags:["balık","karadeniz","proteinli"],
  ingredients:[
    {item:"Hamsi",amount:"250g"},
    {item:"Mısır unu",amount:"3 yk"},
    {item:"Tuz",amount:"1 çk"},
    {item:"Sıvı yağ",amount:"4 yk"},
    {item:"Limon",amount:"1 adet"}
  ],
  steps:[
    "Hamsileri temizleyip yıkayın, süzün.",
    "Tuzlayıp mısır ununa bulayın.",
    "Kızgın yağda her iki yüzünü 2-3 dk kızartın.",
    "Limonla servis edin."
  ]
},
{
  id:"r_balik_ekmek",name:"Balık Ekmek",cat:"sandvic",
  emoji:"🥪",cal:387,prot:29.3,carb:4.9,fat:27.6,serv:"2 adet",yieldServings:2,time:20,
  tags:["balık","sokak","sandviç"],
  ingredients:[
    {item:"Uskumru fileto",amount:"1 adet (150g)"},
    {item:"Yarım ekmek",amount:"1 adet"},
    {item:"Soğan",amount:"1/2 adet"},
    {item:"Marul",amount:"2 yaprak"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Tuz",amount:"1 çk"},
    {item:"Sıvı yağ",amount:"1 yk"}
  ],
  steps:[
    "Fileto uskumruyu tuzlayıp tavada her iki yüzünü 3 dk kızartın.",
    "Ekmeği açın, marulu yerleştirin.",
    "Balığı üzerine koyun, soğan ve limon suyu ekleyin.",
    "Sıcak servis edin."
  ]
},
{
  id:"r_kumpir",name:"Kumpir",cat:"sandvic",
  emoji:"🥔",cal:456,prot:11.3,carb:19.3,fat:38.3,serv:"2 adet",yieldServings:2,time:70,
  tags:["sokak","patates","pratik"],
  ingredients:[
    {item:"İri patates",amount:"1 adet (400g)"},
    {item:"Tereyağı",amount:"2 yk"},
    {item:"Kaşar rendesi",amount:"50g"},
    {item:"Rus salatası",amount:"3 yk"},
    {item:"Mısır",amount:"2 yk"},
    {item:"Zeytin",amount:"2 yk"},
    {item:"Sosis",amount:"1 adet"},
    {item:"Ketçap-mayonez",amount:"1'er yk"}
  ],
  steps:[
    "Patatesi yıkayın, folyoya sarıp 200°C fırında 60 dk pişirin.",
    "Ortadan yarın, tereyağı ve kaşarı ezerek karıştırın.",
    "İstediğiniz malzemeleri üzerine dizin.",
    "Ketçap ve mayonezle süsleyin."
  ]
},
{
  id:"r_simit",name:"Simit",cat:"hamur",
  emoji:"🥨",cal:310,prot:9,carb:55,fat:6,serv:"1 adet",time:120,
  tags:["hamur","kahvalti","sokak"],
  ingredients:[
    {item:"Un",amount:"500g"},
    {item:"Maya",amount:"1 paket"},
    {item:"Şeker",amount:"1 çk"},
    {item:"Tuz",amount:"1 çk"},
    {item:"Ilık su",amount:"300ml"},
    {item:"Pekmez",amount:"3 yk"},
    {item:"Susam",amount:"200g"}
  ],
  steps:[
    "Un, maya, şeker, tuz ve suyla yumuşak hamur yoğurun.",
    "1 saat mayalandırın.",
    "8 parçaya bölüp ip şeklinde açın, burarak halka yapın.",
    "Pekmezli suya batırıp susama bulayın.",
    "220°C fırında 18-20 dk pişirin."
  ]
},
{
  id:"r_pogaca",name:"Poğaça (Peynirli)",cat:"hamur",
  emoji:"🥐",cal:220,prot:6,carb:22,fat:12,serv:"1 adet",time:90,
  tags:["hamur","kahvalti","peynirli"],
  ingredients:[
    {item:"Un",amount:"500g"},
    {item:"Maya",amount:"1 paket"},
    {item:"Süt",amount:"1 bardak"},
    {item:"Yoğurt",amount:"1/2 bardak"},
    {item:"Sıvı yağ",amount:"1/2 bardak"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Tuz",amount:"1 çk"},
    {item:"Beyaz peynir",amount:"200g"},
    {item:"Maydanoz",amount:"1 demet"}
  ],
  steps:[
    "Un, maya, süt, yoğurt, yağ ve yumurtayla hamur yoğurun.",
    "45 dk dinlendirin.",
    "Bezelere ayırıp peynir ve maydanozla doldurun.",
    "Yumurta sarısı sürün, susam serpin.",
    "180°C fırında 25-30 dk pişirin."
  ]
},
{
  id:"r_acma",name:"Açma",cat:"hamur",
  emoji:"🥯",cal:260,prot:7,carb:32,fat:11,serv:"1 adet",time:150,
  tags:["hamur","kahvalti"],
  ingredients:[
    {item:"Un",amount:"600g"},
    {item:"Süt",amount:"1 bardak"},
    {item:"Maya",amount:"1 paket"},
    {item:"Şeker",amount:"2 yk"},
    {item:"Sıvı yağ",amount:"1/2 bardak"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Tuz",amount:"1 çk"},
    {item:"Tereyağı (eritilmiş)",amount:"100g"}
  ],
  steps:[
    "Un, maya, şeker, süt, yağ ve yumurtayla yumuşak hamur yoğurun.",
    "1 saat mayalandırın.",
    "Açıp erimiş tereyağıyla yağlayın, rulo sarın.",
    "Halka şeklinde şekillendirin, 40 dk bekletin.",
    "Yumurta sarısı sürüp 180°C fırında 25 dk pişirin."
  ]
},
{
  id:"r_ispanakli_borek",name:"Ispanaklı Börek",cat:"hamur",
  emoji:"🥟",cal:280,prot:10,carb:28,fat:14,serv:"1 porsiyon",time:60,
  tags:["hamur","börek","sebze"],
  ingredients:[
    {item:"Yufka",amount:"3 adet"},
    {item:"Ispanak",amount:"500g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Beyaz peynir",amount:"150g"},
    {item:"Yumurta",amount:"2 adet"},
    {item:"Süt",amount:"1 bardak"},
    {item:"Sıvı yağ",amount:"1/2 bardak"},
    {item:"Yoğurt",amount:"3 yk"}
  ],
  steps:[
    "Ispanakları yıkayıp doğrayın, soğanla kavurun, peyniri ekleyin.",
    "Yumurta, süt, yağ ve yoğurdu çırpın.",
    "Tepsiye yufka serin, karışımdan sürün.",
    "Ispanak harcını yayın, yufkaları katlayarak yerleştirin.",
    "Üzerine kalan karışımı sürün, 180°C fırında 35 dk pişirin."
  ]
},
{
  id:"r_baklava",name:"Baklava (Fıstıklı)",cat:"tatli",
  emoji:"🍯",cal:420,prot:6,carb:50,fat:24,serv:"3 adet",time:90,
  tags:["tatli","şerbetli","geleneksel"],
  ingredients:[
    {item:"Yufka",amount:"10 adet"},
    {item:"Antep fıstığı",amount:"200g"},
    {item:"Tereyağı (eritilmiş)",amount:"250g"},
    {item:"Şeker",amount:"2 bardak"},
    {item:"Su",amount:"2 bardak"},
    {item:"Limon suyu",amount:"1 yk"}
  ],
  steps:[
    "Tepsiye yarım yufkayı sererek her kata tereyağı sürün.",
    "5 kat sonrası iç fıstığı yayın, üstüne 5 kat daha serin.",
    "Baklava dilimleri halinde kesin.",
    "Kalan tereyağını üzerine gezdirin.",
    "180°C fırında altın rengi olana kadar 35-40 dk pişirin.",
    "Şeker+su+limon ile şerbet kaynatın, sıcak baklavaya ılık şerbet dökün."
  ]
},
{
  id:"r_kunefe",name:"Künefe",cat:"tatli",
  emoji:"🧀",cal:457,prot:8.3,carb:64.7,fat:19.1,serv:"7 porsiyon",yieldServings:7,time:40,
  tags:["tatli","şerbetli","peynirli"],
  ingredients:[
    {item:"Tel kadayıf",amount:"200g"},
    {item:"Tereyağı (eritilmiş)",amount:"100g"},
    {item:"Künefelik peynir",amount:"200g"},
    {item:"Şeker",amount:"1.5 bardak"},
    {item:"Su",amount:"1.5 bardak"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Antep fıstığı",amount:"2 yk"}
  ],
  steps:[
    "Kadayıfı didikleyip tereyağıyla yağlayın.",
    "Yağlanmış tavaya yarısını serin, üzerine peyniri yayın.",
    "Kalan kadayıfı üstüne bastırarak yayın.",
    "Her iki yüzünü orta ateşte 5-6 dk pembeleştirin.",
    "Şerbeti kaynatın, sıcak künefeye ılık şerbet dökün.",
    "Üzerine antep fıstığı serpin."
  ]
},
{
  id:"r_kazandibi",name:"Kazandibi",cat:"tatli",
  emoji:"🍮",cal:247,prot:4.4,carb:41,fat:7.5,serv:"8 porsiyon",yieldServings:8,time:60,
  tags:["tatli","sütlü","geleneksel"],
  ingredients:[
    {item:"Süt",amount:"1 litre"},
    {item:"Şeker",amount:"1 bardak"},
    {item:"Pirinç unu",amount:"3 yk"},
    {item:"Buğday nişastası",amount:"3 yk"},
    {item:"Tereyağı",amount:"2 yk"},
    {item:"Toz şeker (kazandibi için)",amount:"3 yk"}
  ],
  steps:[
    "Tavayı tereyağla yağlayıp toz şeker serpin, kısık ateşte karamelize edin.",
    "Süt, şeker, pirinç unu ve nişastayı kaynatın, koyulaşınca tavaya dökün.",
    "Ocağı kapatıp soğumaya bırakın.",
    "Dilimleyip ters çevirerek servis edin (karamelize yüz üstte)."
  ]
},
{
  id:"r_tavuk_gogsu",name:"Tavuk Göğsü Tatlısı",cat:"tatli",
  emoji:"🍮",cal:215,prot:7.2,carb:35.9,fat:4.9,serv:"8 porsiyon",yieldServings:8,time:90,
  tags:["tatli","sütlü","geleneksel"],
  ingredients:[
    {item:"Tavuk göğüs",amount:"100g"},
    {item:"Süt",amount:"1 litre"},
    {item:"Şeker",amount:"1 bardak"},
    {item:"Pirinç unu",amount:"3 yk"},
    {item:"Buğday nişastası",amount:"2 yk"},
    {item:"Tarçın",amount:"1 çk"}
  ],
  steps:[
    "Tavuğu haşlayıp iplik iplik didikleyin, yıkayıp sıkın.",
    "Sütü şekerle kaynatın, pirinç unu ve nişastayı ekleyin.",
    "Didiklenmiş tavuğu ekleyip 20 dk pişirin.",
    "Kaselere dökün, soğutun.",
    "Üzerine tarçın serperek servis edin."
  ]
},
{
  id:"r_muhallebi",name:"Muhallebi",cat:"tatli",
  emoji:"🍮",cal:208,prot:4.4,carb:37.4,fat:4.7,serv:"8 porsiyon",yieldServings:8,time:30,
  tags:["tatli","sütlü","pratik"],
  ingredients:[
    {item:"Süt",amount:"1 litre"},
    {item:"Şeker",amount:"1 bardak"},
    {item:"Pirinç unu",amount:"4 yk"},
    {item:"Buğday nişastası",amount:"2 yk"},
    {item:"Vanilya",amount:"1 paket"},
    {item:"Tarçın",amount:"1 çk"}
  ],
  steps:[
    "Süt, şeker, pirinç unu ve nişastayı bir tencereye alın.",
    "Sürekli karıştırarak kısık ateşte koyulaşana dek pişirin.",
    "Vanilyayı ekleyip karıştırın.",
    "Kaselere dökün, buzdolabında soğutun.",
    "Tarçınla servis edin."
  ]
},
{
  id:"r_tulumba",name:"Tulumba Tatlısı",cat:"tatli",
  emoji:"🍯",cal:380,prot:4,carb:54,fat:18,serv:"5 adet",time:60,
  tags:["tatli","şerbetli","geleneksel"],
  ingredients:[
    {item:"Su",amount:"2 bardak"},
    {item:"Tereyağı",amount:"3 yk"},
    {item:"Un",amount:"1.5 bardak"},
    {item:"Buğday nişastası",amount:"2 yk"},
    {item:"Yumurta",amount:"3 adet"},
    {item:"Tuz",amount:"1 tutam"},
    {item:"Şeker",amount:"2 bardak"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Sıvı yağ",amount:"500ml"}
  ],
  steps:[
    "Şeker+2 bardak su+limon ile şerbet kaynatın, soğutun.",
    "Su, tereyağı ve tuzu kaynatın, unu ve nişastayı ekleyip hamur haline getirin.",
    "Soğuyunca yumurtaları tek tek ekleyip pürüzsüz hamur yapın.",
    "Tulumba sıkma aparatıyla ılık yağa sıkın, 2 cm boyunda kesin.",
    "Kısık ateşte altın rengi olana dek pişirin.",
    "Sıcakken soğuk şerbete atın, 5 dk bekletin."
  ]
},
{
  id:"r_lokma",name:"Lokma",cat:"tatli",
  emoji:"🍯",cal:280,prot:3,carb:42,fat:12,serv:"6 adet",time:75,
  tags:["tatli","şerbetli","hayır"],
  ingredients:[
    {item:"Un",amount:"2 bardak"},
    {item:"Maya",amount:"1 paket"},
    {item:"Ilık su",amount:"1.5 bardak"},
    {item:"Tuz",amount:"1 tutam"},
    {item:"Şeker",amount:"2 bardak"},
    {item:"Su (şerbet)",amount:"2 bardak"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Sıvı yağ",amount:"500ml"}
  ],
  steps:[
    "Un, maya, su ve tuzla yumuşak hamur yoğurun, 45 dk mayalandırın.",
    "Şeker+su+limonla şerbet kaynatın, soğutun.",
    "Kızgın yağa kaşıkla veya elle küçük parçalar sıkın.",
    "Altın rengi olana dek kızartın.",
    "Soğuk şerbete atıp emmesini bekleyin."
  ]
},
{
  id:"r_irmik_helvasi",name:"İrmik Helvası",cat:"tatli",
  emoji:"🍮",cal:326,prot:5.2,carb:56,fat:9.5,serv:"6 porsiyon",yieldServings:6,time:30,
  tags:["tatli","pratik","geleneksel"],
  ingredients:[
    {item:"İrmik",amount:"1 bardak"},
    {item:"Tereyağı",amount:"3 yk"},
    {item:"Çam fıstığı",amount:"2 yk"},
    {item:"Süt",amount:"1 bardak"},
    {item:"Su",amount:"1 bardak"},
    {item:"Şeker",amount:"1 bardak"}
  ],
  steps:[
    "Süt, su ve şekeri kaynatın, kenara alın.",
    "Tereyağında çam fıstığını pembeleştirin.",
    "İrmiği ekleyip 15-20 dk altın rengi olana dek kavurun.",
    "Sıcak şerbeti dökün, çekene kadar karıştırın.",
    "10 dk demlenmeye bırakın, servis edin."
  ]
},
{
  id:"r_sucuklu_yumurta",name:"Sucuklu Yumurta",cat:"pratik",
  emoji:"🍳",cal:380,prot:22,carb:4,fat:30,serv:"1 porsiyon",yieldServings:1,time:15,
  tags:["kahvalti","pratik","sucuk"],
  ingredients:[
    {item:"Sucuk",amount:"80g"},
    {item:"Yumurta",amount:"2 adet"},
    {item:"Tereyağı",amount:"1 çk"},
    {item:"Karabiber",amount:"1 tutam"}
  ],
  steps:[
    "Sucukları ince dilimleyin.",
    "Sahan tavada tereyağını eritin.",
    "Sucukları her iki yüzü pembeleşene kadar pişirin.",
    "Yumurtaları kırın, akı katılaşana kadar pişirin.",
    "Karabiberle servis edin."
  ]
},
{
  id:"r_muhlama",name:"Muhlama (Kuymak)",cat:"klasik",
  emoji:"🧀",cal:534,prot:25,carb:10.8,fat:44,serv:"2 porsiyon",yieldServings:2,time:25,
  tags:["karadeniz","kahvalti","peynirli"],
  ingredients:[
    {item:"Tereyağı",amount:"3 yk"},
    {item:"Mısır unu",amount:"3 yk"},
    {item:"Kolot peyniri",amount:"200g"},
    {item:"Su",amount:"1/2 bardak"},
    {item:"Tuz",amount:"1 tutam"}
  ],
  steps:[
    "Tereyağını eritin, mısır ununu ekleyip kavurun.",
    "Suyu ekleyip koyulaşana kadar karıştırın.",
    "Doğranmış kolot peynirini ekleyin.",
    "Peynir eriyip lif oluşuncaya kadar karıştırın.",
    "Ekmekle sıcak servis edin."
  ]
},
{
  id:"r_yesil_mercimek_salata",name:"Yeşil Mercimek Salatası",cat:"salata",
  emoji:"🥗",cal:222,prot:10.8,carb:31.7,fat:6.3,serv:"5 porsiyon",yieldServings:5,time:40,
  tags:["salata","vegan","proteinli","fit"],
  ingredients:[
    {item:"Yeşil mercimek",amount:"1 bardak"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Domates",amount:"1 adet"},
    {item:"Salatalık",amount:"1 adet"},
    {item:"Biber",amount:"1 adet"},
    {item:"Maydanoz",amount:"1 demet"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Limon suyu",amount:"2 yk"},
    {item:"Nar ekşisi",amount:"1 yk"},
    {item:"Pul biber",amount:"1 çk"}
  ],
  steps:[
    "Yeşil mercimeği haşlayın, süzüp soğutun.",
    "Tüm sebzeleri küçük küpler halinde doğrayın.",
    "Mercimeği ve sebzeleri bir kaba alın.",
    "Zeytinyağı, limon, nar ekşisi ve pul biberi ekleyip karıştırın.",
    "Soğuk servis edin."
  ]
},

// ═══════════════════════════════════════════
// ══  EK 2: POPÜLER YEMEKLER (35)          ══
// ═══════════════════════════════════════════
{
  id:"r_et_doner",name:"Et Döner",cat:"klasik",
  emoji:"🥙",cal:480,prot:32,carb:30,fat:26,serv:"1 porsiyon",time:30,
  tags:["et","döner","sokak","klasik"],
  ingredients:[
    {item:"Dana döner eti",amount:"180g"},
    {item:"Lavaş",amount:"1 adet"},
    {item:"Domates",amount:"1 adet"},
    {item:"Soğan",amount:"1/2 adet"},
    {item:"Sumak",amount:"1 çk"},
    {item:"Turşu",amount:"2 dilim"},
    {item:"Maydanoz",amount:"3 dal"}
  ],
  steps:[
    "Döner etini kızgın tavada 3-4 dk kavurun.",
    "Lavaşı hafif ısıtın.",
    "Lavaşa eti yerleştirin, sumaklı soğan, domates ve maydanoz ekleyin.",
    "Turşuyla servis edin."
  ]
},
{
  id:"r_beyti_kebap",name:"Beyti Kebap",cat:"klasik",
  emoji:"🥩",cal:560,prot:30,carb:32,fat:34,serv:"1 porsiyon",yieldServings:1,time:60,
  tags:["et","kebap","lavaşlı"],
  ingredients:[
    {item:"Kuzu kıyma",amount:"200g"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Maydanoz",amount:"3 yk"},
    {item:"Lavaş",amount:"1 adet"},
    {item:"Yoğurt",amount:"100g"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Domates sosu",amount:"3 yk"},
    {item:"Tuz, karabiber",amount:""}
  ],
  steps:[
    "Kıymayı sarımsak, maydanoz ve baharatlarla yoğurun.",
    "Şişlere sarıp mangalda pişirin.",
    "Eti lavaşa sarın, dilimleyip tabağa dizin.",
    "Üzerine domates sosu ve erimiş tereyağı gezdirin.",
    "Yanına sarımsaklı yoğurt koyun."
  ]
},
{
  id:"r_patlican_kebabi",name:"Patlıcan Kebabı",cat:"klasik",
  emoji:"🍆",cal:419,prot:21.8,carb:37.9,fat:22.3,serv:"2 porsiyon",yieldServings:2,time:60,
  tags:["et","kebap","sebze","klasik"],
  ingredients:[
    {item:"Kuzu kıyma",amount:"180g"},
    {item:"Patlıcan",amount:"3 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Domates",amount:"2 adet"},
    {item:"Biber",amount:"2 adet"},
    {item:"Salça",amount:"1 yk"}
  ],
  steps:[
    "Kıymayı soğan, sarımsak ve baharatlarla yoğurun, köfte yapın.",
    "Patlıcanları kalın dilimler halinde kesin, hafifçe tuzlayın.",
    "Şişlere dönüşümlü olarak patlıcan ve köfte dizin.",
    "Fırın tepsisine alın, üzerine domates ve biber dizin.",
    "Salçalı su hazırlayıp dökün, 200°C fırında 40 dk pişirin."
  ]
},
{
  id:"r_testi_kebabi",name:"Testi Kebabı",cat:"klasik",
  emoji:"🏺",cal:432,prot:24.9,carb:33.4,fat:23.3,serv:"2 porsiyon",yieldServings:2,time:120,
  tags:["et","kapadokya","geleneksel","güveç"],
  ingredients:[
    {item:"Kuzu kuşbaşı",amount:"200g"},
    {item:"Patates",amount:"1 adet"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Biber",amount:"2 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Sarımsak",amount:"3 diş"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Salça",amount:"1 yk"}
  ],
  steps:[
    "Eti tereyağında kavurun.",
    "Sebzeleri iri doğrayın, etle birlikte testiye yerleştirin.",
    "Salça ve biraz sıcak su ekleyin, testinin ağzını hamurla kapatın.",
    "180°C fırında 90 dk pişirin.",
    "Servis ederken testinin ağzını kırarak açın."
  ]
},
{
  id:"r_cop_sis",name:"Çöp Şiş",cat:"klasik",
  emoji:"🍢",cal:380,prot:34,carb:8,fat:24,serv:"1 porsiyon",time:90,
  tags:["et","kebap","mangal"],
  ingredients:[
    {item:"Kuzu kuşbaşı (küçük)",amount:"180g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Kekik",amount:"1 çk"},
    {item:"Karabiber",amount:"1 çk"},
    {item:"Tuz",amount:"1 çk"},
    {item:"Lavaş",amount:"1 adet"}
  ],
  steps:[
    "Eti küçük küpler halinde doğrayın.",
    "Rendelenmiş soğan, yağ ve baharatlarla 4 saat marine edin.",
    "Tahta çöp şişlere dizin.",
    "Mangalda her yüzünü 2 dk kızartın.",
    "Lavaş üzerinde servis edin."
  ]
},
{
  id:"r_kuru_dolma",name:"Kuru Dolma (Lahana Sarma)",cat:"klasik",
  emoji:"🌿",cal:253,prot:10,carb:22.9,fat:14.4,serv:"4 porsiyon",yieldServings:4,time:90,
  tags:["dolma","karadeniz","geleneksel"],
  ingredients:[
    {item:"Kara lahana yaprağı",amount:"10 adet"},
    {item:"Dana kıyma",amount:"150g"},
    {item:"Pirinç",amount:"3 yk"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Pul biber",amount:"1 çk"}
  ],
  steps:[
    "Lahana yapraklarını haşlayıp damarlarını alın.",
    "Kıyma, pirinç, soğan, salça ve baharatları karıştırın.",
    "Yapraklara harcı koyup sıkıca sarın.",
    "Tencereye dizin, üzerine sıcak su ve tereyağı ekleyin.",
    "Kısık ateşte 60 dk pişirin."
  ]
},
{
  id:"r_izmir_kofte",name:"İzmir Köfte",cat:"klasik",
  emoji:"🍖",cal:400,prot:16.9,carb:27.5,fat:25.2,serv:"3 porsiyon",yieldServings:3,time:70,
  tags:["et","kofte","fırın"],
  ingredients:[
    {item:"Dana kıyma",amount:"200g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Ekmek içi",amount:"1 dilim"},
    {item:"Patates",amount:"2 adet"},
    {item:"Biber",amount:"2 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"2 yk"}
  ],
  steps:[
    "Kıymayı soğan, ekmek ve baharatlarla yoğurun, uzun köfteler yapın.",
    "Köfteleri tavada mühürleyin.",
    "Patates dilimleyip tepsiye dizin, köfteleri üzerine yerleştirin.",
    "Domates ve biberi aralara koyun, salçalı su dökün.",
    "180°C fırında 45 dk pişirin."
  ]
},
{
  id:"r_kadinbudu_kofte",name:"Kadınbudu Köfte",cat:"klasik",
  emoji:"🍖",cal:428,prot:7.5,carb:9.1,fat:40,serv:"4 adet",yieldServings:6,time:50,
  tags:["et","kofte","kızartma","klasik"],
  ingredients:[
    {item:"Dana kıyma",amount:"150g"},
    {item:"Pirinç",amount:"2 yk"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Yumurta",amount:"2 adet"},
    {item:"Un",amount:"3 yk"},
    {item:"Maydanoz",amount:"3 yk"},
    {item:"Sıvı yağ",amount:"1 bardak"}
  ],
  steps:[
    "Kıymanın yarısını soğanla kavurun.",
    "Pirinci haşlayıp süzün, kıymayla birleştirin.",
    "Çiğ kıyma, baharatlar ve maydanozu ekleyip yoğurun.",
    "Şekil verip una ve çırpılmış yumurtaya bulayın.",
    "Kızgın yağda her iki yüzünü altın rengi olana kadar kızartın."
  ]
},
{
  id:"r_dalyan_kofte",name:"Dalyan Köfte",cat:"klasik",
  emoji:"🍖",cal:414,prot:24.8,carb:23.7,fat:24.2,serv:"4 porsiyon",yieldServings:4,time:75,
  tags:["et","kofte","fırın","davet"],
  ingredients:[
    {item:"Dana kıyma",amount:"300g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Ekmek içi",amount:"2 dilim"},
    {item:"Yumurta",amount:"2 adet"},
    {item:"Havuç",amount:"2 adet"},
    {item:"Bezelye",amount:"1/2 bardak"},
    {item:"Patates",amount:"2 adet"},
    {item:"Kaşar",amount:"50g"}
  ],
  steps:[
    "Kıymayı soğan, ekmek ve baharatlarla yoğurun.",
    "Streç film üzerine yayın, haşlanmış yumurta, havuç, patates ve kaşarı ortaya dizin.",
    "Rulo şeklinde sarın, tepsiye alın.",
    "180°C fırında 45 dk pişirin.",
    "Dilimleyerek servis edin."
  ]
},
{
  id:"r_sulu_kofte",name:"Sulu Köfte",cat:"klasik",
  emoji:"🍲",cal:387,prot:16.1,carb:39.6,fat:18.7,serv:"4 porsiyon",yieldServings:4,time:60,
  tags:["kofte","sulu","klasik"],
  ingredients:[
    {item:"Dana kıyma",amount:"200g"},
    {item:"Pirinç",amount:"2 yk"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Patates",amount:"2 adet"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Nohut (haşlanmış)",amount:"1/2 bardak"},
    {item:"Zeytinyağı",amount:"2 yk"}
  ],
  steps:[
    "Kıyma, pirinç, soğan ve baharatları yoğurup küçük köfteler yapın.",
    "Yağda salçayı kavurun, sıcak su ekleyin.",
    "Patates, havuç ve nohudu ekleyin.",
    "Köfteleri dikkatlice bırakın, 35 dk pişirin."
  ]
},
{
  id:"r_etli_fasulye",name:"Etli Taze Fasulye",cat:"sebze",
  emoji:"🫛",cal:321,prot:21.6,carb:41.9,fat:8.5,serv:"5 porsiyon",yieldServings:5,time:60,
  tags:["sebze","et","sulu","klasik"],
  ingredients:[
    {item:"Taze fasulye",amount:"300g"},
    {item:"Dana kuşbaşı",amount:"150g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Sarımsak",amount:"2 diş"}
  ],
  steps:[
    "Eti soğanla kavurun.",
    "Salça, domates rendesi ve sarımsak ekleyin.",
    "Fasulyeyi yıkayıp ayıklayın, tencereye ekleyin.",
    "Sıcak suyla kısık ateşte 40 dk pişirin."
  ]
},
{
  id:"r_tavuk_sote",name:"Tavuk Sote",cat:"pratik",
  emoji:"🍗",cal:256,prot:27.7,carb:17.8,fat:9.2,serv:"2 porsiyon",yieldServings:2,time:30,
  tags:["tavuk","pratik","proteinli"],
  ingredients:[
    {item:"Tavuk göğüs",amount:"200g"},
    {item:"Biber",amount:"2 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Mantar",amount:"6 adet"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Salça",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"1 yk"}
  ],
  steps:[
    "Tavuğu küpler halinde doğrayın.",
    "Zeytinyağında soğan ve sarımsağı kavurun.",
    "Tavuğu ekleyip 5 dk kavurun.",
    "Mantar, biber ve salça ekleyin.",
    "Domatesi ekleyip kapağını kapatıp 15 dk pişirin."
  ]
},
{
  id:"r_mercimekli_bulgur",name:"Mercimekli Bulgur Pilavı",cat:"vegan",
  emoji:"🌾",cal:311,prot:11.7,carb:50.8,fat:7.9,serv:"4 porsiyon",yieldServings:4,time:40,
  tags:["pilav","vegan","baklagil"],
  ingredients:[
    {item:"Bulgur",amount:"1 bardak"},
    {item:"Yeşil mercimek",amount:"1/2 bardak"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Sıcak su",amount:"2.5 bardak"}
  ],
  steps:[
    "Mercimeği yarı haşlayın, suyunu süzmeyin.",
    "Soğanı yağda kavurun, salçayı ekleyin.",
    "Bulguru ekleyip kavurun.",
    "Mercimek ve sıcak suyu ekleyin, tuzlayın.",
    "Suyunu çekene kadar pişirin, 10 dk demlenmeye bırakın."
  ]
},
{
  id:"r_perde_pilavi",name:"Perde Pilavı",cat:"klasik",
  emoji:"🍚",cal:561,prot:18.7,carb:89.2,fat:14.1,serv:"4 porsiyon",yieldServings:4,time:90,
  tags:["pilav","siirt","davet","klasik"],
  ingredients:[
    {item:"Pirinç",amount:"1 bardak"},
    {item:"Tavuk göğüs",amount:"100g"},
    {item:"Un",amount:"2 bardak"},
    {item:"Yoğurt",amount:"3 yk"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Tereyağı",amount:"3 yk"},
    {item:"Kuş üzümü",amount:"2 yk"},
    {item:"Badem",amount:"2 yk"}
  ],
  steps:[
    "Un, yoğurt ve yumurtadan hamur yoğurun, dinlendirin.",
    "Tavuğu haşlayıp didikleyin.",
    "Pirinci tereyağında kavurun, tavuk suyu ekleyip pilavı pişirin.",
    "Kuş üzümü ve bademi ekleyin.",
    "Hamuru açıp kalıba serin, pilavı içine yerleştirin, kapakla örtün.",
    "180°C fırında 35 dk pişirin, ters çevirerek servis edin."
  ]
},
{
  id:"r_midye_pilavi",name:"Midye Pilavı",cat:"klasik",
  emoji:"🦪",cal:406,prot:11.6,carb:60.3,fat:13.3,serv:"3 porsiyon",yieldServings:3,time:50,
  tags:["deniz","pilav","geleneksel"],
  ingredients:[
    {item:"Pirinç",amount:"1 bardak"},
    {item:"Midye eti",amount:"150g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Çam fıstığı",amount:"1 yk"},
    {item:"Kuş üzümü",amount:"1 yk"},
    {item:"Yenibahar",amount:"1 çk"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Sıcak su",amount:"2 bardak"}
  ],
  steps:[
    "Yağda fıstığı pembeleştirin, soğanı ekleyip kavurun.",
    "Midyeleri ekleyin, baharatlarla kavurun.",
    "Pirinç, kuş üzümü ve suyu ekleyin.",
    "Kısık ateşte suyunu çekene kadar pişirin.",
    "10 dk demlenmeye bırakın."
  ]
},
{
  id:"r_cilbir",name:"Çılbır",cat:"pratik",
  emoji:"🍳",cal:340,prot:20,carb:6,fat:26,serv:"1 porsiyon",yieldServings:1,time:15,
  tags:["kahvalti","yumurta","yoğurtlu","pratik"],
  ingredients:[
    {item:"Yumurta",amount:"2 adet"},
    {item:"Süzme yoğurt",amount:"150g"},
    {item:"Sarımsak",amount:"1 diş"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Pul biber",amount:"1 çk"},
    {item:"Sirke",amount:"1 yk"}
  ],
  steps:[
    "Yoğurdu sarımsakla karıştırıp tabağa yayın.",
    "Sirkeli suda yumurtaları poşe edin (3 dk).",
    "Yumurtaları yoğurdun üzerine alın.",
    "Tereyağında pul biberi yakın, üzerine gezdirin."
  ]
},
{
  id:"r_kaygana",name:"Kaygana",cat:"pratik",
  emoji:"🥞",cal:280,prot:12,carb:18,fat:18,serv:"1 porsiyon",yieldServings:1,time:15,
  tags:["kahvalti","yumurta","pratik","karadeniz"],
  ingredients:[
    {item:"Yumurta",amount:"3 adet"},
    {item:"Un",amount:"2 yk"},
    {item:"Süt",amount:"3 yk"},
    {item:"Maydanoz",amount:"3 yk"},
    {item:"Dereotu",amount:"2 yk"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Tuz",amount:"1 çk"}
  ],
  steps:[
    "Yumurta, un ve sütü pürüzsüz olana kadar çırpın.",
    "Doğranmış otları ve tuzu ekleyin.",
    "Tereyağlı tavaya dökün, krep gibi yayın.",
    "Her iki yüzünü 2-3 dk pişirin."
  ]
},
{
  id:"r_pastirmali_yumurta",name:"Pastırmalı Yumurta",cat:"pratik",
  emoji:"🍳",cal:340,prot:22,carb:3,fat:26,serv:"1 porsiyon",yieldServings:1,time:15,
  tags:["kahvalti","pastırma","pratik","proteinli"],
  ingredients:[
    {item:"Pastırma",amount:"60g"},
    {item:"Yumurta",amount:"2 adet"},
    {item:"Tereyağı",amount:"1 çk"}
  ],
  steps:[
    "Pastırmaları ince dilimleyin.",
    "Sahan tavada tereyağı eritin.",
    "Pastırmaları kısa süre çevirin (çemen çıkmasın).",
    "Yumurtaları kırın, akı katılaşana kadar pişirin."
  ]
},
{
  id:"r_kol_boregi",name:"Kol Böreği",cat:"hamur",
  emoji:"🥟",cal:310,prot:10,carb:32,fat:16,serv:"1 dilim",time:75,
  tags:["hamur","börek","davet"],
  ingredients:[
    {item:"Yufka",amount:"4 adet"},
    {item:"Dana kıyma",amount:"200g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Süt",amount:"1/2 bardak"},
    {item:"Sıvı yağ",amount:"1/2 bardak"},
    {item:"Maydanoz",amount:"1 demet"},
    {item:"Susam",amount:"1 yk"}
  ],
  steps:[
    "Kıymayı soğanla pişirin, maydanoz ve baharat ekleyin, soğutun.",
    "Yağ, süt ve yumurtayı çırpın.",
    "Yufkayı ikiye katlayıp karışımdan sürün, kıymayı dizin, rulo yapın.",
    "Yuvarlayarak spiral şekil verin, yağlı tepsiye alın.",
    "Yumurta sürüp susam serpin. 180°C'de 30 dk pişirin."
  ]
},
{
  id:"r_talas_boregi",name:"Talaş Böreği",cat:"hamur",
  emoji:"🥟",cal:420,prot:18,carb:30,fat:26,serv:"1 adet",time:60,
  tags:["hamur","börek","etli","davet"],
  ingredients:[
    {item:"Milföy hamuru",amount:"2 paket"},
    {item:"Dana kuşbaşı",amount:"250g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Domates",amount:"1 adet"},
    {item:"Biber",amount:"1 adet"},
    {item:"Tereyağı",amount:"2 yk"},
    {item:"Yumurta sarısı",amount:"1 adet"}
  ],
  steps:[
    "Eti tereyağında kavurun, sebzeleri ekleyip yumuşayana dek pişirin.",
    "Soğumaya bırakın.",
    "Milföyü kareler halinde kesin, ortaya harç koyun.",
    "Kenarlarını birleştirip bohça yapın.",
    "Yumurta sarısı sürüp 200°C fırında 25 dk pişirin."
  ]
},
{
  id:"r_patatesli_borek",name:"Patatesli Börek",cat:"hamur",
  emoji:"🥟",cal:260,prot:7,carb:32,fat:12,serv:"1 dilim",time:55,
  tags:["hamur","börek","sebze"],
  ingredients:[
    {item:"Yufka",amount:"3 adet"},
    {item:"Patates",amount:"3 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Süt",amount:"1 bardak"},
    {item:"Sıvı yağ",amount:"1/2 bardak"},
    {item:"Karabiber",amount:"1 çk"}
  ],
  steps:[
    "Patatesleri haşlayıp ezin, yağda kavrulmuş soğanla karıştırın.",
    "Yağ, süt ve yumurtayı çırpın.",
    "Tepsiye yufka serip sosla fırçalayın, patates harcını yayın.",
    "Katmanları tekrarlayıp son yufkaya kalan sosu sürün.",
    "180°C fırında 30 dk pişirin."
  ]
},
{
  id:"r_kiymali_borek",name:"Kıymalı Börek",cat:"hamur",
  emoji:"🥟",cal:290,prot:12,carb:28,fat:15,serv:"1 dilim",time:55,
  tags:["hamur","börek","etli"],
  ingredients:[
    {item:"Yufka",amount:"3 adet"},
    {item:"Dana kıyma",amount:"200g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Süt",amount:"1 bardak"},
    {item:"Sıvı yağ",amount:"1/2 bardak"},
    {item:"Maydanoz",amount:"1 demet"}
  ],
  steps:[
    "Kıymayı soğanla kavurun, maydanoz ve baharat ekleyin.",
    "Süt, yağ ve yumurta karışımı hazırlayın.",
    "Tepsiye yufka serip sosla ıslatın, kıymayı yayın.",
    "Katmanları tekrarlayın.",
    "Üste yumurta sarısı sürüp 180°C fırında 30 dk pişirin."
  ]
},
{
  id:"r_kusbasili_pide",name:"Kuşbaşılı Pide",cat:"hamur",
  emoji:"🫓",cal:464,prot:14.2,carb:32.1,fat:31.1,serv:"4 adet",yieldServings:4,time:60,
  tags:["pide","hamur","etli"],
  ingredients:[
    {item:"Pide hamuru",amount:"250g"},
    {item:"Dana kuşbaşı",amount:"150g"},
    {item:"Domates",amount:"1 adet"},
    {item:"Biber",amount:"2 adet"},
    {item:"Soğan",amount:"1/2 adet"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Yumurta sarısı",amount:"1 adet"}
  ],
  steps:[
    "Eti küpler halinde doğrayıp kısa süre kavurun, soğutun.",
    "Hamuru uzun pide şeklinde açın, kenarlarını katlayın.",
    "İçine et, doğranmış biber ve domates dizin.",
    "Kenarlara yumurta sarısı sürün.",
    "220°C fırında 15 dk pişirin. Üzerine tereyağı gezdirerek servis edin."
  ]
},
{
  id:"r_kasarli_pide",name:"Kaşarlı Pide",cat:"hamur",
  emoji:"🫓",cal:416,prot:12.2,carb:23.2,fat:30.4,serv:"5 adet",yieldServings:5,time:45,
  tags:["pide","hamur","peynirli"],
  ingredients:[
    {item:"Pide hamuru",amount:"250g"},
    {item:"Kaşar rendesi",amount:"150g"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Maydanoz",amount:"2 yk"}
  ],
  steps:[
    "Hamuru uzun pide şeklinde açın, kenarları katlayın.",
    "Ortasına kaşar peynirini dağıtın.",
    "220°C fırında 10 dk pişirin.",
    "Son 3 dk kalınca ortasına yumurta kırın.",
    "Üzerine tereyağı ve maydanoz ekleyerek servis edin."
  ]
},
{
  id:"r_ramazan_pidesi",name:"Ramazan Pidesi",cat:"hamur",
  emoji:"🫓",cal:291,prot:8.8,carb:56.9,fat:2.9,serv:"1/4 pide",yieldServings:7,time:120,
  tags:["hamur","ramazan","geleneksel"],
  ingredients:[
    {item:"Un",amount:"500g"},
    {item:"Maya",amount:"1 paket"},
    {item:"Ilık su",amount:"300ml"},
    {item:"Şeker",amount:"1 çk"},
    {item:"Tuz",amount:"1 çk"},
    {item:"Yumurta sarısı",amount:"1 adet"},
    {item:"Yoğurt",amount:"1 yk"},
    {item:"Susam, çörek otu",amount:"2 yk"}
  ],
  steps:[
    "Un, maya, şeker, tuz ve su ile hamur yoğurun.",
    "1 saat mayalandırın.",
    "Yuvarlak pide şeklinde yayın, parmakla iz çıkarın.",
    "Yumurta+yoğurt karışımını sürün, susam serpin.",
    "240°C fırında 12-15 dk pişirin."
  ]
},
{
  id:"r_etli_ekmek",name:"Etli Ekmek (Konya)",cat:"hamur",
  emoji:"🫓",cal:463,prot:11.7,carb:32.4,fat:31.8,serv:"4 porsiyon",yieldServings:4,time:60,
  tags:["pide","konya","etli","klasik"],
  ingredients:[
    {item:"Pide hamuru",amount:"250g"},
    {item:"Dana kıyma",amount:"150g"},
    {item:"Domates",amount:"1 adet"},
    {item:"Biber",amount:"2 adet"},
    {item:"Soğan",amount:"1/2 adet"},
    {item:"Maydanoz",amount:"2 yk"},
    {item:"Pul biber",amount:"1 çk"}
  ],
  steps:[
    "Kıymayı doğranmış sebzelerle karıştırın.",
    "Hamuru çok ince uzun açın.",
    "Üzerine harcı yayın (ince tabaka).",
    "280°C fırında 8-10 dk pişirin."
  ]
},
{
  id:"r_tepsi_mantisi",name:"Tepsi Mantısı",cat:"klasik",
  emoji:"🥟",cal:455,prot:18.2,carb:52,fat:19,serv:"4 porsiyon",yieldServings:4,time:90,
  tags:["manti","fırın","davet"],
  ingredients:[
    {item:"Un",amount:"2 bardak"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Su",amount:"1/2 bardak"},
    {item:"Dana kıyma",amount:"200g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Tereyağı",amount:"2 yk"},
    {item:"Et suyu",amount:"2 bardak"},
    {item:"Yoğurt",amount:"150g"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Pul biber",amount:"1 çk"}
  ],
  steps:[
    "Un, yumurta ve suyla hamur yoğurun.",
    "Açıp küçük kareler kesin, kıyma+soğan harcıyla doldurun, bohça yapın.",
    "Tepsiye dizip 180°C fırında 15 dk kavurun.",
    "Sıcak et suyunu döküp 25 dk daha pişirin.",
    "Sarımsaklı yoğurt ve pul biberli tereyağıyla servis edin."
  ]
},
{
  id:"r_cacik",name:"Cacık",cat:"meze",
  emoji:"🥒",cal:96,prot:4.1,carb:7.6,fat:5.9,serv:"2 porsiyon",yieldServings:2,time:10,
  tags:["meze","yoğurtlu","serinletici"],
  ingredients:[
    {item:"Yoğurt",amount:"200g"},
    {item:"Salatalık",amount:"1 adet"},
    {item:"Sarımsak",amount:"1 diş"},
    {item:"Soğuk su",amount:"1/2 bardak"},
    {item:"Nane",amount:"1 çk"},
    {item:"Zeytinyağı",amount:"1 çk"},
    {item:"Tuz",amount:"1 tutam"}
  ],
  steps:[
    "Salatalığı rendeleyin, suyunu sıkın.",
    "Yoğurdu soğuk suyla çırpın.",
    "Salatalık, ezilmiş sarımsak ve tuzu ekleyin.",
    "Üzerine nane ve zeytinyağı serpin, soğuk servis edin."
  ]
},
{
  id:"r_fava",name:"Fava",cat:"meze",
  emoji:"🫘",cal:247,prot:10.8,carb:27.8,fat:11.3,serv:"4 porsiyon",yieldServings:4,time:60,
  tags:["meze","vegan","zeytinyağlı"],
  ingredients:[
    {item:"İç bakla",amount:"1 bardak"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Zeytinyağı",amount:"3 yk"},
    {item:"Şeker",amount:"1 çk"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Dereotu",amount:"1 demet"},
    {item:"Tuz",amount:"1 çk"}
  ],
  steps:[
    "Baklayı 3 bardak suda yumuşayana dek haşlayın.",
    "Soğanı yağda kavurun, ekleyin.",
    "Şeker, tuz ve limon suyunu katın.",
    "Blenderdan geçirin, kaselere alıp buzdolabına koyun.",
    "Soğuduğunda dereotu ve zeytinyağıyla servis edin."
  ]
},
{
  id:"r_tabule",name:"Tabule",cat:"salata",
  emoji:"🥗",cal:201,prot:5.9,carb:33.3,fat:6.4,serv:"5 porsiyon",yieldServings:5,time:30,
  tags:["salata","vegan","bulgur","fit"],
  ingredients:[
    {item:"İnce bulgur",amount:"1 bardak"},
    {item:"Domates",amount:"2 adet"},
    {item:"Salatalık",amount:"1 adet"},
    {item:"Maydanoz",amount:"1 demet"},
    {item:"Nane",amount:"1 demet"},
    {item:"Yeşil soğan",amount:"3 dal"},
    {item:"Limon suyu",amount:"2 yk"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Nar ekşisi",amount:"1 yk"}
  ],
  steps:[
    "Bulguru sıcak suyla 15 dk bekletin, süzün.",
    "Tüm sebzeleri ince doğrayın.",
    "Bulgur ve sebzeleri karıştırın.",
    "Limon, zeytinyağı ve nar ekşisini ekleyip soğuk servis edin."
  ]
},
{
  id:"r_zerde",name:"Zerde",cat:"tatli",
  emoji:"🍮",cal:195,prot:1.9,carb:43,fat:2.2,serv:"7 porsiyon",yieldServings:7,time:60,
  tags:["tatli","pirinç","geleneksel"],
  ingredients:[
    {item:"Pirinç",amount:"1/2 bardak"},
    {item:"Su",amount:"4 bardak"},
    {item:"Şeker",amount:"1 bardak"},
    {item:"Safran",amount:"1 tutam"},
    {item:"Buğday nişastası",amount:"2 yk"},
    {item:"Gül suyu",amount:"1 çk"},
    {item:"Tarçın",amount:"1 çk"},
    {item:"Fıstık/ceviz",amount:"2 yk"}
  ],
  steps:[
    "Pirinci suda yumuşayana dek pişirin.",
    "Şekeri, ılık suda çözülmüş safranı ekleyin.",
    "Nişastayı az suda ezip ilave edin, koyulaşana dek karıştırın.",
    "Gül suyunu katıp kaselere dökün, soğutun.",
    "Üzerine tarçın ve iç ceviz/fıstık serpip servis edin."
  ]
},
{
  id:"r_un_kurabiyesi",name:"Un Kurabiyesi",cat:"tatli",
  emoji:"🍪",cal:120,prot:2,carb:14,fat:7,serv:"1 adet",time:40,
  tags:["tatli","kurabiye","pratik"],
  ingredients:[
    {item:"Un",amount:"3 bardak"},
    {item:"Tereyağı",amount:"250g"},
    {item:"Pudra şekeri",amount:"1 bardak"},
    {item:"Vanilya",amount:"1 paket"},
    {item:"Pudra şekeri (üstü)",amount:"3 yk"}
  ],
  steps:[
    "Yumuşamış tereyağını pudra şekeriyle çırpın.",
    "Unu ve vanilyayı ekleyip pürüzsüz hamur yapın.",
    "Küçük yuvarlaklar yapın, tepsiye dizin.",
    "170°C fırında 15-18 dk pişirin.",
    "Soğuyunca pudra şekerine bulayın."
  ]
},
{
  id:"r_cevizli_kurabiye",name:"Cevizli Kurabiye",cat:"tatli",
  emoji:"🍪",cal:150,prot:3,carb:16,fat:9,serv:"1 adet",time:40,
  tags:["tatli","kurabiye","cevizli"],
  ingredients:[
    {item:"Un",amount:"3 bardak"},
    {item:"Tereyağı",amount:"200g"},
    {item:"Pudra şekeri",amount:"1 bardak"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Ceviz içi (toz)",amount:"1 bardak"},
    {item:"Vanilya",amount:"1 paket"},
    {item:"Yumurta sarısı",amount:"1 adet"}
  ],
  steps:[
    "Tereyağı, şeker ve yumurtayı çırpın.",
    "Un, vanilya ve cevizi ekleyip hamur yapın.",
    "Küçük toplar halinde şekillendirin, üstüne yumurta sarısı sürün.",
    "Üstüne ceviz parçası bastırın.",
    "170°C fırında 18-20 dk pişirin."
  ]
},
{
  id:"r_katmer_tatli",name:"Katmer (Antep)",cat:"tatli",
  emoji:"🥮",cal:464,prot:15,carb:37.1,fat:29.7,serv:"4 porsiyon",yieldServings:4,time:45,
  tags:["tatli","antep","fıstıklı"],
  ingredients:[
    {item:"Baklavalık yufka",amount:"2 adet"},
    {item:"Tereyağı (eritilmiş)",amount:"100g"},
    {item:"Kaymak",amount:"3 yk"},
    {item:"Antep fıstığı (toz)",amount:"3 yk"},
    {item:"Toz şeker",amount:"2 yk"}
  ],
  steps:[
    "Yufkayı açın, tereyağıyla yağlayın.",
    "Ortasına kaymak, fıstık ve şeker koyun.",
    "Kare şeklinde katlayın, tereyağı sürün.",
    "Kızgın tavada her iki yüzünü 2 dk pişirin.",
    "Dilimleyerek sıcak servis edin."
  ]
},
{
  id:"r_cig_kofte",name:"Çiğ Köfte (Sade)",cat:"meze",
  emoji:"🌶️",cal:219,prot:5.9,carb:37.2,fat:6.5,serv:"4 adet",yieldServings:5,time:60,
  tags:["meze","vegan","bulgur","acılı"],
  ingredients:[
    {item:"İnce bulgur",amount:"1 bardak"},
    {item:"Salça",amount:"3 yk"},
    {item:"İsot",amount:"1 yk"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Sarımsak",amount:"3 diş"},
    {item:"Maydanoz",amount:"1 demet"},
    {item:"Nar ekşisi",amount:"2 yk"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Kimyon",amount:"1 çk"}
  ],
  steps:[
    "Bulguru sıcak suyla ıslatıp 10 dk bekletin.",
    "Salça, ezilmiş soğan-sarımsak ve isotu ekleyip yoğurun.",
    "Baharatları, nar ekşisini, zeytinyağını ve maydanozu ekleyin.",
    "20 dk daha yoğurun.",
    "Köfte şekli verip marul yaprağında limon ve nar ekşisiyle servis edin."
  ]
},

// ═══════════════════════════════════════════
// ══  EK 3: SAĞLIK ODAKLI YEMEKLER (50)    ══
// ══  Fit · Vegan · Düşük kalori · Sağlıklı ══
// ═══════════════════════════════════════════
{
  id:"r_fit_hindi_kofte",name:"Hindi Köfte Izgara",cat:"fit",
  emoji:"🦃",cal:194,prot:21.1,carb:10.5,fat:7.5,serv:"2 porsiyon",yieldServings:2,time:30,
  tags:["fit","proteinli","düşük yağ","saglikli"],
  ingredients:[
    {item:"Hindi kıyma",amount:"180g"},
    {item:"Soğan",amount:"1/2 adet"},
    {item:"Sarımsak",amount:"1 diş"},
    {item:"Yumurta akı",amount:"1 adet"},
    {item:"Yulaf ezmesi",amount:"2 yk"},
    {item:"Maydanoz",amount:"2 yk"},
    {item:"Kimyon, karabiber",amount:""}
  ],
  steps:[
    "Tüm malzemeleri yoğurun, 15 dk dinlendirin.",
    "Köfte şekli verin.",
    "Yapışmaz tavada veya ızgarada her yüzünü 4 dk pişirin.",
    "Yeşillik ve yoğurtla servis edin."
  ]
},
{
  id:"r_fit_tavuk_brokoli",name:"Tavuk Brokoli Sote",cat:"fit",
  emoji:"🥦",cal:216,prot:24.9,carb:9.1,fat:9.7,serv:"2 porsiyon",yieldServings:2,time:25,
  tags:["fit","proteinli","düşük karb","saglikli"],
  ingredients:[
    {item:"Tavuk göğüs",amount:"180g"},
    {item:"Brokoli",amount:"200g"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Soya sosu",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Susam",amount:"1 çk"},
    {item:"Pul biber",amount:"1 çk"}
  ],
  steps:[
    "Tavuğu küpler halinde doğrayıp soya sosuyla marine edin.",
    "Yağda sarımsağı kavurun, tavuğu ekleyip 5 dk pişirin.",
    "Brokoliyi ekleyip 7 dk daha soteleyin.",
    "Üzerine susam ve pul biber serpip servis edin."
  ]
},
{
  id:"r_fit_protein_pancake",name:"Protein Pancake",cat:"fit",
  emoji:"🥞",cal:213,prot:10.5,carb:34.9,fat:4.3,serv:"3 adet",yieldServings:2,time:15,
  tags:["fit","kahvalti","proteinli","tatli"],
  ingredients:[
    {item:"Yulaf ezmesi",amount:"50g"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Yumurta akı",amount:"2 adet"},
    {item:"Muz",amount:"1 adet"},
    {item:"Whey protein (vanilya)",amount:"1 ölçek"},
    {item:"Tarçın",amount:"1 çk"},
    {item:"Bal",amount:"1 çk"}
  ],
  steps:[
    "Tüm malzemeleri blenderdan geçirin.",
    "Yapışmaz tavayı ısıtın.",
    "Hamurdan kepçeyle pancake dökün.",
    "Her iki yüzünü 2 dk pişirin.",
    "Üzerine bal ve meyveyle servis edin."
  ]
},
{
  id:"r_fit_avokado_tost",name:"Avokadolu Yumurta Tost",cat:"fit",
  emoji:"🥑",cal:340,prot:18,carb:30,fat:18,serv:"1 porsiyon",yieldServings:1,time:10,
  tags:["fit","kahvalti","saglikli","pratik"],
  ingredients:[
    {item:"Tam buğday ekmeği",amount:"2 dilim"},
    {item:"Avokado",amount:"1/2 adet"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Limon suyu",amount:"1 çk"},
    {item:"Pul biber",amount:"1 çk"},
    {item:"Susam",amount:"1 çk"},
    {item:"Tuz",amount:"1 tutam"}
  ],
  steps:[
    "Ekmekleri kızartın.",
    "Avokadoyu ezin, limon suyu ve tuzla karıştırın.",
    "Yumurtayı poşe veya sahanda pişirin.",
    "Avokadoyu ekmeğe sürün, üzerine yumurtayı koyun.",
    "Pul biber ve susam serpip servis edin."
  ]
},
{
  id:"r_fit_quinoa_bowl",name:"Tavuklu Quinoa Bowl",cat:"fit",
  emoji:"🥗",cal:314,prot:18.9,carb:34.4,fat:12.8,serv:"3 porsiyon",yieldServings:3,time:35,
  tags:["fit","proteinli","meal prep","saglikli"],
  ingredients:[
    {item:"Quinoa",amount:"1/2 bardak"},
    {item:"Tavuk göğüs",amount:"150g"},
    {item:"Avokado",amount:"1/2 adet"},
    {item:"Cherry domates",amount:"6 adet"},
    {item:"Salatalık",amount:"1/2 adet"},
    {item:"Mısır",amount:"3 yk"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"1 yk"}
  ],
  steps:[
    "Quinoayı haşlayın, soğutun.",
    "Tavuğu ızgarada pişirin, dilimleyin.",
    "Sebzeleri doğrayın.",
    "Hepsini kaseye yerleştirin.",
    "Limon+zeytinyağı sosuyla servis edin."
  ]
},
{
  id:"r_fit_yumurta_aki_omlet",name:"Yumurta Akı Omlet",cat:"fit",
  emoji:"🍳",cal:128,prot:14.8,carb:11.5,fat:3.2,serv:"2 porsiyon",yieldServings:2,time:10,
  tags:["fit","düşük kalori","proteinli","kahvalti"],
  ingredients:[
    {item:"Yumurta akı",amount:"5 adet"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Ispanak",amount:"1 avuç"},
    {item:"Mantar",amount:"3 adet"},
    {item:"Cherry domates",amount:"4 adet"},
    {item:"Tuz, karabiber",amount:""}
  ],
  steps:[
    "Yumurta akı ve yumurtayı çırpın.",
    "Yapışmaz tavada sebzeleri 2 dk soteleyin.",
    "Yumurtayı dökün, kapağını kapatıp 4 dk pişirin.",
    "Yarısını üstüne katlayıp servis edin."
  ]
},
{
  id:"r_fit_skyr_bowl",name:"Skyr Yulaf Kasesi",cat:"fit",
  emoji:"🍓",cal:340,prot:28,carb:42,fat:6,serv:"1 porsiyon",yieldServings:1,time:5,
  tags:["fit","proteinli","kahvalti","tatli"],
  ingredients:[
    {item:"Skyr veya süzme yoğurt",amount:"200g"},
    {item:"Yulaf ezmesi",amount:"3 yk"},
    {item:"Çilek",amount:"1 avuç"},
    {item:"Yaban mersini",amount:"2 yk"},
    {item:"Bal",amount:"1 çk"},
    {item:"Chia tohumu",amount:"1 çk"},
    {item:"Badem",amount:"5 adet"}
  ],
  steps:[
    "Skyr'ı kaseye alın.",
    "Yulaf, chia ve doğranmış meyveleri ekleyin.",
    "Üstüne bademleri ufalayın.",
    "Bal gezdirip servis edin."
  ]
},
{
  id:"r_fit_levrek",name:"Fırında Levrek",cat:"fit",
  emoji:"🐟",cal:240,prot:32,carb:4,fat:11,serv:"1 porsiyon",time:30,
  tags:["fit","balık","omega3","proteinli"],
  ingredients:[
    {item:"Levrek (temizlenmiş)",amount:"1 adet (250g)"},
    {item:"Limon",amount:"1 adet"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Kekik",amount:"1 çk"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Maydanoz",amount:"3 dal"},
    {item:"Tuz, karabiber",amount:""}
  ],
  steps:[
    "Balığı yıkayıp tuzlayın, içine limon ve sarımsak yerleştirin.",
    "Dış yüzeyini zeytinyağı ve kekikle ovalayın.",
    "Folyoya sarın, 200°C fırında 25 dk pişirin.",
    "Maydanoz ve limonla servis edin."
  ]
},
{
  id:"r_fit_karides_sote",name:"Karides Sarımsaklı Sote",cat:"fit",
  emoji:"🦐",cal:174,prot:20.9,carb:3.9,fat:8.9,serv:"2 porsiyon",yieldServings:2,time:15,
  tags:["fit","deniz","proteinli","düşük karb"],
  ingredients:[
    {item:"Karides (temiz)",amount:"200g"},
    {item:"Sarımsak",amount:"4 diş"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Maydanoz",amount:"2 yk"},
    {item:"Pul biber",amount:"1 çk"},
    {item:"Zeytinyağı",amount:"1 çk"}
  ],
  steps:[
    "Tereyağı+zeytinyağında sarımsağı kavurun (yakmadan).",
    "Karidesleri ekleyin, her yüzünü 2 dk pişirin.",
    "Limon, maydanoz ve pul biberi ekleyin.",
    "Hemen servis edin."
  ]
},
{
  id:"r_fit_tavuk_curry",name:"Yoğurtlu Tavuk Curry",cat:"fit",
  emoji:"🍛",cal:340,prot:32,carb:14,fat:16,serv:"1 porsiyon",yieldServings:1,time:35,
  tags:["fit","proteinli","baharat","saglikli"],
  ingredients:[
    {item:"Tavuk göğüs",amount:"180g"},
    {item:"Süzme yoğurt",amount:"100g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Curry baharatı",amount:"1 yk"},
    {item:"Domates",amount:"1 adet"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Zerdeçal",amount:"1 çk"}
  ],
  steps:[
    "Tavuğu küpler halinde kesip yoğurt ve curry ile marine edin.",
    "Soğanı yağda kavurun, sarımsağı ekleyin.",
    "Tavuğu ekleyip 8 dk pişirin.",
    "Domates ve zerdeçalı katın, 10 dk daha pişirin.",
    "Esmer pirinçle servis edin."
  ]
},
{
  id:"r_fit_buda_bowl",name:"Tavuklu Buda Bowl",cat:"fit",
  emoji:"🥗",cal:460,prot:34,carb:48,fat:14,serv:"1 porsiyon",yieldServings:1,time:30,
  tags:["fit","meal prep","proteinli","saglikli"],
  ingredients:[
    {item:"Tavuk göğüs",amount:"150g"},
    {item:"Tatlı patates",amount:"1 adet"},
    {item:"Brokoli",amount:"1 avuç"},
    {item:"Nohut (haşlanmış)",amount:"3 yk"},
    {item:"Avokado",amount:"1/4 adet"},
    {item:"Karışık yeşillik",amount:"1 avuç"},
    {item:"Tahin sos",amount:"1 yk"},
    {item:"Limon suyu",amount:"1 yk"}
  ],
  steps:[
    "Tatlı patatesi küpler halinde fırında 25 dk pişirin.",
    "Tavuğu ızgarada pişirip dilimleyin.",
    "Brokoliyi 5 dk buharda pişirin.",
    "Tüm malzemeleri kaseye dizin.",
    "Tahin+limon sosuyla servis edin."
  ]
},
{
  id:"r_fit_kabak_dolma",name:"Tavuklu Kabak Dolması (Fit)",cat:"fit",
  emoji:"🥒",cal:240,prot:24,carb:18,fat:8,serv:"1 porsiyon",time:60,
  tags:["fit","proteinli","düşük yağ","saglikli"],
  ingredients:[
    {item:"Sakız kabağı",amount:"3 adet"},
    {item:"Hindi kıyma",amount:"150g"},
    {item:"Karnabahar pirinci",amount:"3 yk"},
    {item:"Soğan",amount:"1/2 adet"},
    {item:"Salça",amount:"1 çk"},
    {item:"Domates",amount:"1 adet"},
    {item:"Maydanoz",amount:"3 yk"}
  ],
  steps:[
    "Kabakları oyun.",
    "Hindi kıyma, karnabahar pirinci, soğan ve baharatları karıştırın.",
    "Kabakları doldurun.",
    "Tencereye dizin, salça+domatesli su ekleyin.",
    "Kısık ateşte 40 dk pişirin."
  ]
},
{
  id:"r_fit_cottage_salata",name:"Cottage Peynirli Salata",cat:"fit",
  emoji:"🥗",cal:224,prot:11.3,carb:12.5,fat:15.4,serv:"3 porsiyon",yieldServings:3,time:10,
  tags:["fit","düşük kalori","proteinli","pratik"],
  ingredients:[
    {item:"Cottage peynir",amount:"150g"},
    {item:"Cherry domates",amount:"6 adet"},
    {item:"Salatalık",amount:"1/2 adet"},
    {item:"Avokado",amount:"1/4 adet"},
    {item:"Zeytinyağı",amount:"1 çk"},
    {item:"Karabiber, taze otlar",amount:""}
  ],
  steps:[
    "Sebzeleri küçük küpler halinde doğrayın.",
    "Cottage peynirini kaseye alın.",
    "Sebzeleri ekleyip karıştırın.",
    "Zeytinyağı ve karabiberle servis edin."
  ]
},
{
  id:"r_fit_protein_smoothie",name:"Whey Protein Smoothie",cat:"fit",
  emoji:"🥤",cal:280,prot:32,carb:30,fat:4,serv:"1 bardak",time:5,
  tags:["fit","proteinli","pratik","antrenman"],
  ingredients:[
    {item:"Whey protein",amount:"1 ölçek"},
    {item:"Süt (yağsız)",amount:"250ml"},
    {item:"Muz",amount:"1 adet"},
    {item:"Yulaf ezmesi",amount:"2 yk"},
    {item:"Fıstık ezmesi",amount:"1 çk"},
    {item:"Buz",amount:"4 küp"}
  ],
  steps:[
    "Tüm malzemeleri blendere atın.",
    "30 saniye yüksek devirde çekin.",
    "Bardağa dökün, hemen tüketin."
  ]
},
{
  id:"r_fit_yulaf_pancake",name:"Yulaflı Krep",cat:"fit",
  emoji:"🥞",cal:203,prot:8.8,carb:28.3,fat:6.2,serv:"2 adet",yieldServings:2,time:15,
  tags:["fit","kahvalti","saglikli","tam tahıl"],
  ingredients:[
    {item:"Yulaf ezmesi",amount:"60g"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Süt",amount:"100ml"},
    {item:"Tarçın",amount:"1 çk"},
    {item:"Vanilya",amount:"1 çk"},
    {item:"Bal",amount:"1 çk"}
  ],
  steps:[
    "Yulaf, yumurta, süt ve baharatları blenderda çekin.",
    "Yapışmaz tavada her iki yüzünü 2 dk pişirin.",
    "Üzerine bal ve meyveyle servis edin."
  ]
},
{
  id:"r_fit_tavuk_lahmacun",name:"Sağlıklı Tavuk Lahmacun",cat:"fit",
  emoji:"🍕",cal:273,prot:16.6,carb:42.8,fat:5.6,serv:"2 adet",yieldServings:2,time:30,
  tags:["fit","proteinli","sağlıklı versiyon"],
  ingredients:[
    {item:"Tam buğday lavaş",amount:"1 adet"},
    {item:"Tavuk kıyma",amount:"100g"},
    {item:"Soğan",amount:"1/2 adet"},
    {item:"Domates",amount:"1/2 adet"},
    {item:"Biber",amount:"1 adet"},
    {item:"Maydanoz",amount:"2 yk"},
    {item:"Salça",amount:"1 çk"},
    {item:"Pul biber",amount:"1 çk"}
  ],
  steps:[
    "Tüm malzemeleri (lavaş hariç) blenderda püre yapın.",
    "Lavaşa ince tabaka halinde sürün.",
    "220°C fırında 8-10 dk pişirin.",
    "Maydanoz ve limon ile servis edin."
  ]
},
{
  id:"r_fit_karnabahar_pizza",name:"Karnabahar Bazlı Pizza",cat:"fit",
  emoji:"🍕",cal:280,prot:18,carb:18,fat:14,serv:"1 porsiyon",time:50,
  tags:["fit","düşük karb","glütensiz","saglikli"],
  ingredients:[
    {item:"Karnabahar",amount:"500g"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Mozzarella",amount:"60g"},
    {item:"Domates sosu",amount:"3 yk"},
    {item:"Cherry domates",amount:"4 adet"},
    {item:"Fesleğen",amount:"5 yaprak"},
    {item:"Kekik",amount:"1 çk"}
  ],
  steps:[
    "Karnabaharı rendeleyip mikroda 5 dk pişirin, suyunu sıkın.",
    "Yumurta, peynir ve baharatlarla yoğurun.",
    "Pişirme kağıdına yayıp 200°C fırında 15 dk pişirin.",
    "Domates sosu, peynir ve domatesleri ekleyin.",
    "Tekrar 10 dk fırınlayın, fesleğenle servis edin."
  ]
},
{
  id:"r_fit_meal_prep",name:"Meal Prep Kase",cat:"fit",
  emoji:"📦",cal:372,prot:26.9,carb:43.9,fat:10,serv:"2 porsiyon",yieldServings:2,time:45,
  tags:["fit","meal prep","proteinli","haftalık"],
  ingredients:[
    {item:"Tavuk göğüs",amount:"180g"},
    {item:"Esmer pirinç",amount:"1/2 bardak"},
    {item:"Brokoli",amount:"100g"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Soya sosu",amount:"1 yk"},
    {item:"Sarımsak",amount:"2 diş"}
  ],
  steps:[
    "Esmer pirinci haşlayın.",
    "Tavuğu ızgarada pişirip dilimleyin.",
    "Sebzeleri buharda 7 dk pişirin.",
    "Cam saklama kabına eşit pay edin.",
    "Buzdolabında 4 güne kadar saklayın."
  ]
},
{
  id:"r_fit_kabak_spagetti",name:"Kabak Spagetti",cat:"fit",
  emoji:"🍝",cal:220,prot:20,carb:14,fat:11,serv:"1 porsiyon",time:25,
  tags:["fit","düşük karb","glütensiz","sebze"],
  ingredients:[
    {item:"Sakız kabağı",amount:"2 adet"},
    {item:"Tavuk kıyma",amount:"120g"},
    {item:"Domates",amount:"2 adet"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Soğan",amount:"1/2 adet"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Fesleğen",amount:"5 yaprak"}
  ],
  steps:[
    "Kabakları spiral kesiciyle spagetti şekline getirin.",
    "Tavuk kıymayı soğan-sarımsakla pişirin.",
    "Domatesi ekleyip sos haline getirin.",
    "Kabak spagettiyi 2 dk soteleyin.",
    "Sosu üzerine dökün, fesleğenle servis edin."
  ]
},
{
  id:"r_fit_kıymalı_sebze",name:"Kıymalı Sebze Tavası",cat:"fit",
  emoji:"🥘",cal:240,prot:11.6,carb:15.9,fat:15.3,serv:"3 porsiyon",yieldServings:3,time:25,
  tags:["fit","proteinli","sebze","pratik"],
  ingredients:[
    {item:"Dana kıyma (yağsız)",amount:"150g"},
    {item:"Kabak",amount:"1 adet"},
    {item:"Patlıcan",amount:"1 adet"},
    {item:"Biber",amount:"2 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Zeytinyağı",amount:"1 yk"}
  ],
  steps:[
    "Kıymayı yağsız tavada kavurun.",
    "Soğanı ekleyip yumuşatın.",
    "Sebzeleri küpler halinde ekleyip 15 dk pişirin.",
    "Tuz ve baharatlarla servis edin."
  ]
},
{
  id:"r_vegan_nohut_curry",name:"Nohut Curry",cat:"vegan",
  emoji:"🍛",cal:376,prot:17.7,carb:56.2,fat:10.3,serv:"4 porsiyon",yieldServings:4,time:30,
  tags:["vegan","baklagil","proteinli","baharat"],
  ingredients:[
    {item:"Haşlanmış nohut",amount:"1.5 bardak"},
    {item:"Hindistan cevizi sütü",amount:"200ml"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Zencefil",amount:"1 çk"},
    {item:"Curry baharatı",amount:"1 yk"},
    {item:"Domates",amount:"2 adet"},
    {item:"Ispanak",amount:"1 avuç"},
    {item:"Zeytinyağı",amount:"1 yk"}
  ],
  steps:[
    "Soğan, sarımsak ve zencefili yağda kavurun.",
    "Curry baharatını ekleyip kokusu çıkana dek karıştırın.",
    "Domatesi ve nohudu ekleyin.",
    "Hindistan cevizi sütünü dökün, 15 dk pişirin.",
    "Son 2 dk ıspanağı ekleyip pişirin."
  ]
},
{
  id:"r_vegan_mercimek_kori",name:"Mercimek Köri",cat:"vegan",
  emoji:"🍲",cal:299,prot:19,carb:48.5,fat:3.5,serv:"3 porsiyon",yieldServings:3,time:35,
  tags:["vegan","proteinli","baklagil","baharat"],
  ingredients:[
    {item:"Kırmızı mercimek",amount:"1 bardak"},
    {item:"Hindistan cevizi sütü",amount:"200ml"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Zerdeçal",amount:"1 çk"},
    {item:"Kimyon",amount:"1 çk"},
    {item:"Domates",amount:"1 adet"},
    {item:"Su",amount:"3 bardak"}
  ],
  steps:[
    "Soğan ve sarımsağı kavurun.",
    "Baharatları ekleyip karıştırın.",
    "Mercimek, su ve domatesi ekleyin.",
    "Mercimek yumuşayana dek 20 dk pişirin.",
    "Hindistan cevizi sütünü ekleyip 5 dk daha pişirin."
  ]
},
{
  id:"r_vegan_patlican_humus",name:"Patlıcanlı Humus Bowl",cat:"vegan",
  emoji:"🥙",cal:340,prot:12,carb:38,fat:18,serv:"1 porsiyon",time:30,
  tags:["vegan","akdeniz","saglikli"],
  ingredients:[
    {item:"Humus",amount:"4 yk"},
    {item:"Patlıcan",amount:"1 adet"},
    {item:"Cherry domates",amount:"6 adet"},
    {item:"Salatalık",amount:"1/2 adet"},
    {item:"Maydanoz",amount:"3 yk"},
    {item:"Pita ekmeği",amount:"1 adet"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Nar ekşisi",amount:"1 çk"}
  ],
  steps:[
    "Patlıcanı közleyip dilimleyin, zeytinyağı sürün.",
    "Kaseye humus yayın.",
    "Patlıcan, domates, salatalık dizin.",
    "Maydanoz ve nar ekşisiyle süsleyin.",
    "Pita ile servis edin."
  ]
},
{
  id:"r_vegan_sebzeli_quinoa",name:"Sebzeli Quinoa",cat:"vegan",
  emoji:"🌾",cal:293,prot:8.9,carb:43.9,fat:10.2,serv:"2 porsiyon",yieldServings:2,time:30,
  tags:["vegan","glütensiz","proteinli","saglikli"],
  ingredients:[
    {item:"Quinoa",amount:"1/2 bardak"},
    {item:"Kabak",amount:"1 adet"},
    {item:"Biber",amount:"1 adet"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Limon suyu",amount:"1 yk"}
  ],
  steps:[
    "Quinoayı yıkayıp 1.5 bardak suda 15 dk pişirin.",
    "Sebzeleri küpler halinde doğrayın.",
    "Yağda soğan ve sarımsağı, sonra sebzeleri kavurun.",
    "Quinoa ile karıştırın.",
    "Limon suyu gezdirip servis edin."
  ]
},
{
  id:"r_vegan_karnabahar_pirinc",name:"Karnabahar Pirinci",cat:"vegan",
  emoji:"🌾",cal:131,prot:4.5,carb:14.3,fat:7.7,serv:"2 porsiyon",yieldServings:2,time:15,
  tags:["vegan","düşük karb","keto","saglikli"],
  ingredients:[
    {item:"Karnabahar",amount:"1/2 baş"},
    {item:"Soğan",amount:"1/2 adet"},
    {item:"Sarımsak",amount:"1 diş"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Maydanoz",amount:"2 yk"},
    {item:"Tuz, karabiber",amount:""}
  ],
  steps:[
    "Karnabaharı robottan çekip pirinç haline getirin.",
    "Yağda soğan ve sarımsağı kavurun.",
    "Karnabaharı ekleyip 5 dk pişirin.",
    "Maydanoz ve baharatlarla servis edin."
  ]
},
{
  id:"r_vegan_tofu_sote",name:"Tofu Sebze Sote",cat:"vegan",
  emoji:"🥢",cal:280,prot:18,carb:18,fat:16,serv:"1 porsiyon",time:25,
  tags:["vegan","proteinli","asya","saglikli"],
  ingredients:[
    {item:"Sert tofu",amount:"180g"},
    {item:"Brokoli",amount:"100g"},
    {item:"Biber",amount:"1 adet"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Soya sosu",amount:"2 yk"},
    {item:"Susam yağı",amount:"1 çk"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Zencefil",amount:"1 çk"}
  ],
  steps:[
    "Tofuyu küpler halinde kesip 5 dk yapışmaz tavada kızartın.",
    "Çıkarın, sebzeleri sarımsak ve zencefille soteleyin.",
    "Tofuyu geri ekleyin.",
    "Soya sosu ve susam yağı gezdirin.",
    "Pirinçle servis edin."
  ]
},
{
  id:"r_vegan_buda_bowl",name:"Vegan Buda Bowl",cat:"vegan",
  emoji:"🥗",cal:372,prot:13.2,carb:56.8,fat:11.5,serv:"3 porsiyon",yieldServings:3,time:35,
  tags:["vegan","meal prep","saglikli","buda bowl"],
  ingredients:[
    {item:"Quinoa",amount:"1/2 bardak"},
    {item:"Tatlı patates",amount:"1 adet"},
    {item:"Nohut",amount:"1/2 bardak"},
    {item:"Avokado",amount:"1/2 adet"},
    {item:"Karışık yeşillik",amount:"1 avuç"},
    {item:"Mor lahana",amount:"1 avuç"},
    {item:"Tahin",amount:"1 yk"},
    {item:"Limon suyu",amount:"1 yk"}
  ],
  steps:[
    "Tatlı patatesi fırında 25 dk pişirin.",
    "Quinoayı haşlayın.",
    "Nohudu baharatlayıp tavada 5 dk soteleyin.",
    "Tüm malzemeleri kaseye dizin.",
    "Tahin+limon sosuyla servis edin."
  ]
},
{
  id:"r_vegan_burger",name:"Vegan Mercimek Burger",cat:"vegan",
  emoji:"🍔",cal:413,prot:22.1,carb:73.2,fat:4.7,serv:"3 adet",yieldServings:3,time:40,
  tags:["vegan","proteinli","sokak","fit"],
  ingredients:[
    {item:"Yeşil mercimek (haşlı)",amount:"1 bardak"},
    {item:"Yulaf ezmesi",amount:"3 yk"},
    {item:"Soğan",amount:"1/2 adet"},
    {item:"Sarımsak",amount:"1 diş"},
    {item:"Tam tahıllı burger ekmeği",amount:"1 adet"},
    {item:"Marul",amount:"2 yaprak"},
    {item:"Domates",amount:"2 dilim"},
    {item:"Avokado",amount:"1/4 adet"}
  ],
  steps:[
    "Mercimek, yulaf, soğan ve sarımsağı blenderda çekin.",
    "Köfte şeklinde yapıp tavada her yüzü 4 dk pişirin.",
    "Burger ekmeğine marul, köfte, avokado ve domates yerleştirin.",
    "Servis edin."
  ]
},
{
  id:"r_vegan_avokado_tost",name:"Vegan Avokado Toast",cat:"vegan",
  emoji:"🥑",cal:284,prot:7.2,carb:33.4,fat:16.6,serv:"2 porsiyon",yieldServings:2,time:8,
  tags:["vegan","kahvalti","saglikli","pratik"],
  ingredients:[
    {item:"Tam buğday ekmeği",amount:"2 dilim"},
    {item:"Avokado",amount:"1 adet"},
    {item:"Cherry domates",amount:"4 adet"},
    {item:"Limon suyu",amount:"1 çk"},
    {item:"Pul biber",amount:"1 çk"},
    {item:"Susam",amount:"1 çk"},
    {item:"Tuz",amount:""}
  ],
  steps:[
    "Ekmekleri kızartın.",
    "Avokadoyu çatalla ezin, limon ve tuz ekleyin.",
    "Ekmeğe yayın.",
    "Domates dilimleri, susam ve pul biberi serpin."
  ]
},
{
  id:"r_vegan_durum",name:"Sebzeli Vegan Dürüm",cat:"vegan",
  emoji:"🌯",cal:380,prot:12,carb:52,fat:14,serv:"1 adet",time:20,
  tags:["vegan","sokak","pratik","fit"],
  ingredients:[
    {item:"Tam buğday lavaş",amount:"1 adet"},
    {item:"Humus",amount:"3 yk"},
    {item:"Marul",amount:"3 yaprak"},
    {item:"Salatalık",amount:"1/2 adet"},
    {item:"Domates",amount:"1 adet"},
    {item:"Mor lahana",amount:"1 avuç"},
    {item:"Avokado",amount:"1/4 adet"},
    {item:"Falafel",amount:"3 adet"}
  ],
  steps:[
    "Lavaşı hafif ısıtın.",
    "Humusu sürün, sebzeleri yerleştirin.",
    "Falafelleri ortaya koyun.",
    "Sıkıca sarın, ortadan kesip servis edin."
  ]
},
{
  id:"r_vegan_karnabahar_corba",name:"Karnabahar Çorbası",cat:"corba",
  emoji:"🍲",cal:137,prot:4.3,carb:20.8,fat:5.1,serv:"3 porsiyon",yieldServings:3,time:30,
  tags:["vegan","corba","düşük kalori","saglikli"],
  ingredients:[
    {item:"Karnabahar",amount:"1/2 baş"},
    {item:"Patates",amount:"1 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Sebze suyu",amount:"3 bardak"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Karabiber",amount:""}
  ],
  steps:[
    "Soğan ve sarımsağı yağda kavurun.",
    "Patates ve karnabaharı ekleyin.",
    "Sebze suyunu dökün, 20 dk pişirin.",
    "Blenderdan geçirip püre yapın.",
    "Karabiber ile servis edin."
  ]
},
{
  id:"r_vegan_brokoli_corba",name:"Brokoli Çorbası",cat:"corba",
  emoji:"🥦",cal:161,prot:6.5,carb:25.7,fat:5.4,serv:"3 porsiyon",yieldServings:3,time:25,
  tags:["vegan","corba","saglikli","detoks"],
  ingredients:[
    {item:"Brokoli",amount:"1 baş"},
    {item:"Patates",amount:"1 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Sebze suyu",amount:"3 bardak"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Limon suyu",amount:"1 yk"}
  ],
  steps:[
    "Soğan ve sarımsağı yağda kavurun.",
    "Brokoli ve patatesi ekleyin.",
    "Sebze suyunu dökün, 18 dk pişirin.",
    "Blenderdan geçirin.",
    "Limon suyu ile servis edin."
  ]
},
{
  id:"r_vegan_kabak_corba",name:"Bal Kabağı Çorbası",cat:"corba",
  emoji:"🎃",cal:172,prot:3.6,carb:28.8,fat:6.2,serv:"3 porsiyon",yieldServings:3,time:30,
  tags:["vegan","corba","saglikli","sonbahar"],
  ingredients:[
    {item:"Bal kabağı",amount:"500g"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Zencefil",amount:"1 çk"},
    {item:"Sebze suyu",amount:"3 bardak"},
    {item:"Hindistan cevizi sütü",amount:"100ml"},
    {item:"Zeytinyağı",amount:"1 yk"}
  ],
  steps:[
    "Soğan ve zencefili yağda kavurun.",
    "Bal kabağı ve havucu küpler halinde ekleyin.",
    "Sebze suyunu dökün, 25 dk pişirin.",
    "Blenderdan geçirin.",
    "Hindistan cevizi sütüyle servis edin."
  ]
},
{
  id:"r_vegan_chickpea_salata",name:"Nohutlu Akdeniz Salatası",cat:"salata",
  emoji:"🥗",cal:221,prot:10.2,carb:35.4,fat:5.8,serv:"5 porsiyon",yieldServings:5,time:15,
  tags:["vegan","salata","baklagil","akdeniz"],
  ingredients:[
    {item:"Haşlanmış nohut",amount:"1 bardak"},
    {item:"Salatalık",amount:"1 adet"},
    {item:"Cherry domates",amount:"8 adet"},
    {item:"Kırmızı soğan",amount:"1/2 adet"},
    {item:"Maydanoz",amount:"1 demet"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Kekik",amount:"1 çk"}
  ],
  steps:[
    "Sebzeleri küçük küpler halinde doğrayın.",
    "Nohut ve sebzeleri karıştırın.",
    "Zeytinyağı, limon, tuz ve kekiği ekleyin.",
    "Karıştırıp 10 dk dinlendirin, servis edin."
  ]
},
{
  id:"r_vegan_falafel_bowl",name:"Falafel Bowl",cat:"vegan",
  emoji:"🧆",cal:420,prot:16,carb:46,fat:18,serv:"1 porsiyon",time:30,
  tags:["vegan","akdeniz","baklagil","saglikli"],
  ingredients:[
    {item:"Falafel",amount:"6 adet"},
    {item:"Quinoa",amount:"1/2 bardak"},
    {item:"Karışık yeşillik",amount:"2 avuç"},
    {item:"Cherry domates",amount:"6 adet"},
    {item:"Salatalık",amount:"1/2 adet"},
    {item:"Kırmızı lahana",amount:"1 avuç"},
    {item:"Tahin sos",amount:"2 yk"},
    {item:"Limon suyu",amount:"1 yk"}
  ],
  steps:[
    "Quinoayı haşlayın.",
    "Falafelleri pişirin (fırın veya tavada).",
    "Tüm malzemeleri kaseye yerleştirin.",
    "Tahin sosu ve limon suyu ile servis edin."
  ]
},
{
  id:"r_salata_yunan",name:"Yunan Salatası",cat:"salata",
  emoji:"🥗",cal:227,prot:8,carb:15.4,fat:16.2,serv:"2 porsiyon",yieldServings:2,time:10,
  tags:["salata","akdeniz","düşük karb","saglikli"],
  ingredients:[
    {item:"Domates",amount:"3 adet"},
    {item:"Salatalık",amount:"1 adet"},
    {item:"Kırmızı soğan",amount:"1/2 adet"},
    {item:"Beyaz peynir (feta)",amount:"60g"},
    {item:"Siyah zeytin",amount:"10 adet"},
    {item:"Yeşil biber",amount:"1 adet"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Kekik",amount:"1 çk"}
  ],
  steps:[
    "Domates, salatalık, biber ve soğanı iri doğrayın.",
    "Bir kaseye alın.",
    "Üzerine küp peynir ve zeytinleri ekleyin.",
    "Zeytinyağı ve kekik ile servis edin."
  ]
},
{
  id:"r_salata_karpuz_feta",name:"Karpuz-Feta Salatası",cat:"salata",
  emoji:"🍉",cal:180,prot:7,carb:22,fat:8,serv:"1 porsiyon",time:10,
  tags:["salata","yaz","ferahlatıcı","saglikli"],
  ingredients:[
    {item:"Karpuz",amount:"300g"},
    {item:"Beyaz peynir",amount:"60g"},
    {item:"Nane",amount:"10 yaprak"},
    {item:"Limon suyu",amount:"1 çk"},
    {item:"Zeytinyağı",amount:"1 çk"},
    {item:"Karabiber",amount:""}
  ],
  steps:[
    "Karpuzu küpler halinde kesin.",
    "Peyniri ufalayın.",
    "Naneyi ince doğrayın.",
    "Hepsini karıştırın.",
    "Limon, zeytinyağı ve karabiberle servis edin."
  ]
},
{
  id:"r_salata_akdeniz",name:"Akdeniz Salatası",cat:"salata",
  emoji:"🥗",cal:220,prot:10,carb:18,fat:14,serv:"1 porsiyon",time:15,
  tags:["salata","akdeniz","saglikli","fit"],
  ingredients:[
    {item:"Karışık yeşillik",amount:"2 avuç"},
    {item:"Cherry domates",amount:"6 adet"},
    {item:"Salatalık",amount:"1 adet"},
    {item:"Roka",amount:"1 avuç"},
    {item:"Beyaz peynir",amount:"40g"},
    {item:"Zeytin",amount:"6 adet"},
    {item:"Ceviz",amount:"6 adet"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Nar ekşisi",amount:"1 çk"}
  ],
  steps:[
    "Yeşillikleri yıkayın, kaseye alın.",
    "Domates ve salatalığı doğrayıp ekleyin.",
    "Peynir, zeytin ve cevizleri serpin.",
    "Zeytinyağı ve nar ekşisi ile servis edin."
  ]
},
{
  id:"r_salata_avokado_ton",name:"Avokadolu Ton Salatası",cat:"salata",
  emoji:"🥑",cal:340,prot:26,carb:14,fat:22,serv:"1 porsiyon",time:10,
  tags:["fit","salata","proteinli","omega3"],
  ingredients:[
    {item:"Ton balığı (suda)",amount:"1 kutu"},
    {item:"Avokado",amount:"1 adet"},
    {item:"Cherry domates",amount:"6 adet"},
    {item:"Karışık yeşillik",amount:"2 avuç"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"1 çk"},
    {item:"Karabiber",amount:""}
  ],
  steps:[
    "Ton balığının suyunu süzün.",
    "Avokadoyu küpler halinde doğrayın, limon sürün.",
    "Tüm malzemeleri kaseye alın.",
    "Limon, zeytinyağı ve karabiberle karıştırıp servis edin."
  ]
},
{
  id:"r_salata_detoks",name:"Detoks Salata",cat:"salata",
  emoji:"🌿",cal:160,prot:5,carb:18,fat:9,serv:"1 porsiyon",yieldServings:1,time:15,
  tags:["salata","detoks","düşük kalori","vegan"],
  ingredients:[
    {item:"Roka",amount:"1 avuç"},
    {item:"Marul",amount:"1 avuç"},
    {item:"Salatalık",amount:"1 adet"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Pancar (haşlı)",amount:"1/2 adet"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"1 çk"},
    {item:"Chia tohumu",amount:"1 çk"}
  ],
  steps:[
    "Yeşillikleri yıkayın.",
    "Sebzeleri rendeleyin veya ince doğrayın.",
    "Hepsini kaseye alın.",
    "Limon, zeytinyağı ve chia tohumu serpip servis edin."
  ]
},
{
  id:"r_salata_pancar",name:"Pancarlı Cevizli Salata",cat:"salata",
  emoji:"🥗",cal:248,prot:8,carb:10.9,fat:20.4,serv:"2 porsiyon",yieldServings:2,time:15,
  tags:["salata","saglikli","fit","sonbahar"],
  ingredients:[
    {item:"Pancar (haşlı)",amount:"1 adet"},
    {item:"Roka",amount:"2 avuç"},
    {item:"Ceviz içi",amount:"3 yk"},
    {item:"Keçi peyniri",amount:"40g"},
    {item:"Portakal",amount:"1/2 adet"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Nar ekşisi",amount:"1 çk"}
  ],
  steps:[
    "Pancarı dilimleyip kaseye yayın.",
    "Üzerine roka, portakal dilimleri ve cevizi dağıtın.",
    "Keçi peynirini ufalayın.",
    "Zeytinyağı ve nar ekşisi ile servis edin."
  ]
},
{
  id:"r_salata_bahar",name:"Taze Otlu Bahar Salatası",cat:"salata",
  emoji:"🌱",cal:140,prot:4,carb:14,fat:8,serv:"1 porsiyon",yieldServings:1,time:10,
  tags:["salata","bahar","düşük kalori","vegan"],
  ingredients:[
    {item:"Marul",amount:"2 avuç"},
    {item:"Maydanoz",amount:"1/2 demet"},
    {item:"Dereotu",amount:"1/2 demet"},
    {item:"Nane",amount:"1/2 demet"},
    {item:"Yeşil soğan",amount:"3 dal"},
    {item:"Turp",amount:"4 adet"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"1 çk"}
  ],
  steps:[
    "Tüm yeşillikleri yıkayın, ince doğrayın.",
    "Turpu dilimleyin.",
    "Hepsini kaseye alın.",
    "Limon, zeytinyağı ve tuzla karıştırıp servis edin."
  ]
},
{
  id:"r_fit_granola",name:"Ev Yapımı Granola",cat:"fit",
  emoji:"🥣",cal:316,prot:8.5,carb:29.5,fat:20.2,serv:"7 porsiyon",yieldServings:7,time:35,
  tags:["fit","kahvalti","saglikli","ev yapımı"],
  ingredients:[
    {item:"Yulaf ezmesi",amount:"2 bardak"},
    {item:"Badem",amount:"1/2 bardak"},
    {item:"Ceviz",amount:"1/2 bardak"},
    {item:"Hindistan cevizi rendesi",amount:"3 yk"},
    {item:"Bal",amount:"3 yk"},
    {item:"Hindistan cevizi yağı",amount:"2 yk"},
    {item:"Tarçın",amount:"1 çk"},
    {item:"Vanilya",amount:"1 çk"}
  ],
  steps:[
    "Yulaf, kuruyemiş ve hindistan cevizini karıştırın.",
    "Bal ve eritilmiş yağı ekleyip karıştırın.",
    "Pişirme kağıdı serili tepsiye yayın.",
    "160°C fırında 25 dk altın rengi olana kadar pişirin (10 dk'da bir karıştırın).",
    "Soğutup kavanoza alın."
  ]
},
{
  id:"r_fit_bademli_yulaf",name:"Bademli Yulaf Kasesi",cat:"fit",
  emoji:"🥣",cal:380,prot:14,carb:48,fat:16,serv:"1 porsiyon",yieldServings:1,time:10,
  tags:["fit","kahvalti","saglikli","tam tahıl"],
  ingredients:[
    {item:"Yulaf ezmesi",amount:"50g"},
    {item:"Badem sütü",amount:"250ml"},
    {item:"Muz",amount:"1 adet"},
    {item:"Bademli",amount:"10 adet"},
    {item:"Bal",amount:"1 çk"},
    {item:"Tarçın",amount:"1 çk"},
    {item:"Yaban mersini",amount:"2 yk"}
  ],
  steps:[
    "Yulafı badem sütüyle 5 dk pişirin.",
    "Tarçını ekleyin.",
    "Kaseye alın.",
    "Muz, badem ve yaban mersini ile süsleyin.",
    "Bal gezdirip servis edin."
  ]
},
{
  id:"r_fit_tahinli_yulaf",name:"Tahinli Yulaf",cat:"fit",
  emoji:"🥣",cal:352,prot:11,carb:41.5,fat:17.2,serv:"2 porsiyon",yieldServings:2,time:10,
  tags:["fit","kahvalti","türk usulü","saglikli"],
  ingredients:[
    {item:"Yulaf ezmesi",amount:"50g"},
    {item:"Süt",amount:"250ml"},
    {item:"Tahin",amount:"1 yk"},
    {item:"Pekmez",amount:"1 yk"},
    {item:"Ceviz",amount:"4 adet"},
    {item:"Muz",amount:"1/2 adet"},
    {item:"Tarçın",amount:"1 çk"}
  ],
  steps:[
    "Yulafı sütle 5 dk pişirin.",
    "Tahini ekleyip karıştırın.",
    "Kaseye alın.",
    "Pekmez gezdirin, ceviz ve muz ekleyin.",
    "Tarçın serpip servis edin."
  ]
},
{
  id:"r_fit_berry_smoothie",name:"Berry Smoothie Bowl",cat:"fit",
  emoji:"🍓",cal:240,prot:8,carb:42,fat:6,serv:"1 porsiyon",time:5,
  tags:["fit","kahvalti","tatli","antioksidan"],
  ingredients:[
    {item:"Donmuş çilek",amount:"1 bardak"},
    {item:"Donmuş yaban mersini",amount:"1/2 bardak"},
    {item:"Muz",amount:"1 adet"},
    {item:"Süzme yoğurt",amount:"3 yk"},
    {item:"Badem sütü",amount:"100ml"},
    {item:"Granola",amount:"2 yk"},
    {item:"Chia tohumu",amount:"1 çk"}
  ],
  steps:[
    "Donmuş meyveler, muz, yoğurt ve sütü blenderda çekin.",
    "Kaseye alın.",
    "Üstüne granola, chia ve taze meyve ekleyin.",
    "Hemen servis edin."
  ]
},
{
  id:"r_fit_avokado_kase",name:"Avokadolu Yumurta Kasesi",cat:"fit",
  emoji:"🥑",cal:303,prot:10.9,carb:19.4,fat:22.6,serv:"2 porsiyon",yieldServings:2,time:15,
  tags:["fit","kahvalti","düşük karb","keto"],
  ingredients:[
    {item:"Avokado",amount:"1 adet"},
    {item:"Yumurta",amount:"2 adet"},
    {item:"Cherry domates",amount:"4 adet"},
    {item:"Roka",amount:"1 avuç"},
    {item:"Limon suyu",amount:"1 çk"},
    {item:"Zeytinyağı",amount:"1 çk"},
    {item:"Pul biber",amount:""}
  ],
  steps:[
    "Avokadoyu ikiye bölün, çekirdeği çıkarın.",
    "İçine birer yumurta kırın.",
    "180°C fırında 15 dk pişirin.",
    "Kaseye roka, domates ve avokadoyu yerleştirin.",
    "Zeytinyağı ve pul biberle servis edin."
  ]
},
{
  id:"r_fit_chia_meyveli",name:"Meyveli Chia Pudding",cat:"fit",
  emoji:"🍮",cal:199,prot:6.4,carb:25,fat:9.2,serv:"2 porsiyon",yieldServings:2,time:10,
  tags:["fit","kahvalti","saglikli","omega3"],
  ingredients:[
    {item:"Chia tohumu",amount:"3 yk"},
    {item:"Hindistan cevizi sütü",amount:"200ml"},
    {item:"Bal",amount:"1 çk"},
    {item:"Vanilya",amount:"1 çk"},
    {item:"Çilek",amount:"5 adet"},
    {item:"Muz",amount:"1/2 adet"},
    {item:"Hindistan cevizi rendesi",amount:"1 çk"}
  ],
  steps:[
    "Chia, süt, bal ve vanilyayı kavanozda karıştırın.",
    "Buzdolabında en az 4 saat (tercihen gece) bekletin.",
    "Servis sırasında üstüne meyveler ve hindistan cevizini ekleyin."
  ]
},

// ═══════════════════════════════════════════
// ══  EK 4: KATEGORİ GENİŞLETMESİ (100)    ══
// ══  Klasik · Çorba · Pratik · Sebze ·    ══
// ══  Tatlı · Sandviç · Salata · Hamur ·   ══
// ══  Meze (sağlık dışı kategoriler)        ══
// ═══════════════════════════════════════════

// ═══ KLASİK (25) ═══
{
  id:"r_kuzu_guvec",name:"Kuzu Güveç",cat:"klasik",
  emoji:"🍲",cal:416,prot:24.6,carb:29.5,fat:23.2,serv:"2 porsiyon",yieldServings:2,time:120,
  tags:["et","güveç","fırın","klasik"],
  ingredients:[
    {item:"Kuzu kuşbaşı",amount:"200g"},
    {item:"Patates",amount:"1 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Biber",amount:"2 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Sarımsak",amount:"3 diş"},
    {item:"Tereyağı",amount:"1 yk"}
  ],
  steps:[
    "Eti tereyağında mühürleyin, soğan ve sarımsağı ekleyin.",
    "Tüm sebzeleri iri doğrayıp güvece dizin.",
    "Salça ve 1 bardak sıcak su ekleyin.",
    "180°C fırında 90 dk pişirin."
  ]
},
{
  id:"r_pilav_ustu_tavuk",name:"Pilav Üstü Tavuk",cat:"klasik",
  emoji:"🍚",cal:380,prot:18.9,carb:54.9,fat:9,serv:"3 porsiyon",yieldServings:3,time:50,
  tags:["pilav","tavuk","klasik"],
  ingredients:[
    {item:"Pirinç",amount:"1 bardak"},
    {item:"Tavuk göğüs",amount:"180g"},
    {item:"Tereyağı",amount:"2 yk"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Tavuk suyu",amount:"2 bardak"},
    {item:"Karabiber",amount:""}
  ],
  steps:[
    "Tavuğu haşlayın, didikleyin.",
    "Tereyağında soğanı kavurun, pirinci ekleyin.",
    "Tavuk suyunu döküp kısık ateşte pişirin.",
    "Pilavın üstüne didiklenmiş tavuğu yerleştirin."
  ]
},
{
  id:"r_kiymali_yumurta",name:"Kıymalı Yumurta",cat:"pratik",
  emoji:"🍳",cal:340,prot:24,carb:6,fat:24,serv:"1 porsiyon",yieldServings:1,time:15,
  tags:["yumurta","kahvalti","pratik","proteinli"],
  ingredients:[
    {item:"Dana kıyma",amount:"100g"},
    {item:"Yumurta",amount:"2 adet"},
    {item:"Soğan",amount:"1/2 adet"},
    {item:"Domates",amount:"1 adet"},
    {item:"Tereyağı",amount:"1 çk"},
    {item:"Karabiber",amount:""}
  ],
  steps:[
    "Tereyağında soğanı kavurun, kıymayı ekleyin.",
    "Domatesi ekleyip 5 dk pişirin.",
    "Yumurtaları kırın, akı katılaşana dek pişirin.",
    "Karabiberle servis edin."
  ]
},
{
  id:"r_tavuklu_guvec",name:"Tavuklu Güveç",cat:"klasik",
  emoji:"🍲",cal:308,prot:18.2,carb:19.9,fat:18.1,serv:"3 porsiyon",yieldServings:3,time:75,
  tags:["tavuk","güveç","fırın"],
  ingredients:[
    {item:"Tavuk but",amount:"250g"},
    {item:"Patates",amount:"1 adet"},
    {item:"Mantar",amount:"6 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Biber",amount:"2 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"1 yk"}
  ],
  steps:[
    "Tavuğu yağda mühürleyin.",
    "Sebzeleri doğrayıp güvece dizin.",
    "Salça ve 1 bardak su ekleyin.",
    "180°C fırında 50 dk pişirin."
  ]
},
{
  id:"r_kuzu_kavurma",name:"Kuzu Kavurma",cat:"klasik",
  emoji:"🍖",cal:423,prot:26,carb:7,fat:32.7,serv:"2 porsiyon",yieldServings:2,time:90,
  tags:["et","kavurma","klasik","kahvalti"],
  ingredients:[
    {item:"Kuzu kuşbaşı",amount:"250g"},
    {item:"Tereyağı",amount:"2 yk"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Karabiber",amount:""},
    {item:"Tuz",amount:""}
  ],
  steps:[
    "Eti suyunu salana kadar tencerede pişirin.",
    "Suyunu çektikten sonra tereyağını ekleyin.",
    "Soğanı ekleyip 5 dk daha kavurun.",
    "Tuz ve karabiberle servis edin."
  ]
},
{
  id:"r_tavuk_kavurma",name:"Tavuk Kavurma",cat:"klasik",
  emoji:"🍗",cal:340,prot:32,carb:8,fat:18,serv:"1 porsiyon",yieldServings:1,time:30,
  tags:["tavuk","pratik","proteinli"],
  ingredients:[
    {item:"Tavuk göğüs",amount:"200g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Biber",amount:"1 adet"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Karabiber, kekik",amount:""}
  ],
  steps:[
    "Tavuğu küpler halinde doğrayın.",
    "Tereyağında 5 dk soteleyin.",
    "Soğan ve biberi ekleyin.",
    "10 dk daha kavurarak servis edin."
  ]
},
{
  id:"r_karisik_izgara",name:"Karışık Izgara",cat:"klasik",
  emoji:"🍢",cal:488,prot:36.5,carb:33.8,fat:26.1,serv:"2 porsiyon",yieldServings:2,time:60,
  tags:["et","mangal","kebap","karışık"],
  ingredients:[
    {item:"Kuzu pirzola",amount:"100g"},
    {item:"Şiş kebap",amount:"100g"},
    {item:"Adana köfte",amount:"100g"},
    {item:"Tavuk şiş",amount:"100g"},
    {item:"Domates",amount:"2 adet"},
    {item:"Sivri biber",amount:"2 adet"},
    {item:"Lavaş",amount:"1 adet"}
  ],
  steps:[
    "Tüm etleri marine edin.",
    "Mangalı iyice ısıtın.",
    "Etleri ve sebzeleri pişirme süresine göre dizin.",
    "Lavaş üzerinde servis edin."
  ]
},
{
  id:"r_etli_karnabahar",name:"Etli Karnabahar",cat:"sebze",
  emoji:"🥦",cal:225,prot:14.7,carb:13.8,fat:13.6,serv:"3 porsiyon",yieldServings:3,time:50,
  tags:["sebze","et","sulu"],
  ingredients:[
    {item:"Karnabahar",amount:"1/2 baş"},
    {item:"Dana kuşbaşı",amount:"150g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Domates",amount:"1 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"2 yk"}
  ],
  steps:[
    "Eti soğanla kavurun.",
    "Salça ve domatesi ekleyin.",
    "Karnabaharı çiçeklerine ayırıp ekleyin.",
    "Sıcak su ekleyip 30 dk pişirin."
  ]
},
{
  id:"r_kiymali_bezelye",name:"Kıymalı Bezelye",cat:"sebze",
  emoji:"🟢",cal:242,prot:12.1,carb:22.6,fat:11.9,serv:"3 porsiyon",yieldServings:3,time:35,
  tags:["sebze","et","sulu","klasik"],
  ingredients:[
    {item:"Dana kıyma",amount:"100g"},
    {item:"Bezelye",amount:"300g"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"1 yk"}
  ],
  steps:[
    "Kıymayı soğanla kavurun.",
    "Havuç ve salçayı ekleyin.",
    "Bezelye ve sıcak suyu ekleyin.",
    "Kısık ateşte 25 dk pişirin."
  ]
},
{
  id:"r_patatesli_kiyma",name:"Patatesli Kıyma",cat:"sebze",
  emoji:"🥔",cal:352,prot:12.5,carb:32.4,fat:19.6,serv:"3 porsiyon",yieldServings:3,time:40,
  tags:["et","sebze","sulu","klasik"],
  ingredients:[
    {item:"Dana kıyma",amount:"150g"},
    {item:"Patates",amount:"3 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Biber",amount:"1 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"2 yk"}
  ],
  steps:[
    "Kıymayı soğanla kavurun.",
    "Salça ve biberi ekleyin.",
    "Küp doğranmış patatesi ekleyin.",
    "Sıcak su ekleyip 25 dk pişirin."
  ]
},
{
  id:"r_etli_lahana",name:"Etli Lahana Kapuska",cat:"sebze",
  emoji:"🥬",cal:235,prot:14.3,carb:17.2,fat:13.5,serv:"3 porsiyon",yieldServings:3,time:60,
  tags:["sebze","et","sulu","kış"],
  ingredients:[
    {item:"Beyaz lahana",amount:"500g"},
    {item:"Dana kuşbaşı",amount:"150g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Domates",amount:"1 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Pul biber",amount:"1 çk"},
    {item:"Zeytinyağı",amount:"2 yk"}
  ],
  steps:[
    "Eti soğanla kavurun, salça ve domatesi ekleyin.",
    "Lahanayı ince doğrayıp ekleyin.",
    "Sıcak su ve pul biberi ekleyin.",
    "Kısık ateşte 45 dk pişirin."
  ]
},
{
  id:"r_hamsi_pilavi",name:"Hamsi Pilavı",cat:"klasik",
  emoji:"🐟",cal:435,prot:19.1,carb:58.5,fat:14.1,serv:"3 porsiyon",yieldServings:3,time:50,
  tags:["balık","pilav","karadeniz"],
  ingredients:[
    {item:"Hamsi (temiz)",amount:"200g"},
    {item:"Pirinç",amount:"1 bardak"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Tereyağı",amount:"2 yk"},
    {item:"Çam fıstığı",amount:"1 yk"},
    {item:"Kuş üzümü",amount:"1 yk"},
    {item:"Yenibahar",amount:"1 çk"}
  ],
  steps:[
    "Pirinci tereyağında soğan, fıstık ve kuş üzümüyle pişirin.",
    "Yağlı tepsinin tabanına hamsileri yan yana dizin.",
    "Üzerine pilavı yayın.",
    "Üstünü hamsilerle örtün, 200°C fırında 25 dk pişirin."
  ]
},
{
  id:"r_patatesli_kofte",name:"Patatesli Köfte",cat:"klasik",
  emoji:"🍖",cal:427,prot:23.2,carb:37.2,fat:20.8,serv:"2 porsiyon",yieldServings:2,time:50,
  tags:["et","kofte","fırın"],
  ingredients:[
    {item:"Dana kıyma",amount:"180g"},
    {item:"Patates",amount:"2 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Domates",amount:"1 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Yumurta",amount:"1 adet"}
  ],
  steps:[
    "Kıyma, soğan ve yumurtayı yoğurun, köfteler yapın.",
    "Patatesleri dilimleyin.",
    "Köfte ve patatesleri tepsiye dizin.",
    "Salçalı domates suyu döküp 200°C fırında 35 dk pişirin."
  ]
},
{
  id:"r_sebzeli_tavuk",name:"Sebzeli Tavuk Sote",cat:"klasik",
  emoji:"🍗",cal:269,prot:25.4,carb:23.8,fat:9.3,serv:"2 porsiyon",yieldServings:2,time:35,
  tags:["tavuk","sebze","sote"],
  ingredients:[
    {item:"Tavuk göğüs",amount:"180g"},
    {item:"Kabak",amount:"1 adet"},
    {item:"Patlıcan",amount:"1 adet"},
    {item:"Biber",amount:"2 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Zeytinyağı",amount:"1 yk"}
  ],
  steps:[
    "Tavuğu küpler halinde kavurun.",
    "Soğanı ekleyin, sebzeleri doğrayıp ilave edin.",
    "20 dk pişirin.",
    "Tuz ve karabiberle servis edin."
  ]
},
{
  id:"r_etli_pirasa",name:"Etli Pırasa",cat:"sebze",
  emoji:"🥬",cal:223,prot:10.9,carb:23.8,fat:10.3,serv:"4 porsiyon",yieldServings:4,time:50,
  tags:["sebze","et","sulu","kış"],
  ingredients:[
    {item:"Pırasa",amount:"500g"},
    {item:"Dana kuşbaşı",amount:"150g"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"2 yk"}
  ],
  steps:[
    "Eti soğanla kavurun.",
    "Salçayı ekleyin, havucu doğrayıp ekleyin.",
    "Pırasayı halka halinde doğrayıp ilave edin.",
    "Sıcak su ekleyip 35 dk pişirin."
  ]
},
{
  id:"r_etli_kereviz",name:"Etli Kereviz",cat:"sebze",
  emoji:"🌿",cal:216,prot:10.7,carb:26.7,fat:8.6,serv:"5 porsiyon",yieldServings:5,time:55,
  tags:["sebze","et","sulu"],
  ingredients:[
    {item:"Kereviz",amount:"2 adet"},
    {item:"Dana kuşbaşı",amount:"150g"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"2 yk"}
  ],
  steps:[
    "Eti soğanla kavurun.",
    "Limonlu suda bekletilen kerevizi ekleyin.",
    "Havuç ve sıcak suyu ekleyin.",
    "Kısık ateşte 40 dk pişirin."
  ]
},
{
  id:"r_coban_kavurma",name:"Çoban Kavurma",cat:"klasik",
  emoji:"🍖",cal:355,prot:23.9,carb:15,fat:23.3,serv:"2 porsiyon",yieldServings:2,time:60,
  tags:["et","kavurma","klasik"],
  ingredients:[
    {item:"Kuzu kuşbaşı",amount:"200g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Sivri biber",amount:"2 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Mantar",amount:"5 adet"},
    {item:"Tereyağı",amount:"1 yk"}
  ],
  steps:[
    "Eti suyunu salıp çektirene dek pişirin.",
    "Tereyağı ekleyin, soğanı kavurun.",
    "Biber, mantar ve domatesi ekleyin.",
    "15 dk daha pişirip servis edin."
  ]
},
{
  id:"r_soslu_kofte",name:"Soslu Köfte",cat:"klasik",
  emoji:"🍖",cal:411,prot:22.3,carb:15.1,fat:29.4,serv:"2 porsiyon",yieldServings:2,time:50,
  tags:["et","kofte","sulu"],
  ingredients:[
    {item:"Dana kıyma",amount:"200g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Ekmek içi",amount:"1 dilim"},
    {item:"Domates",amount:"2 adet"},
    {item:"Biber",amount:"2 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Tereyağı",amount:"1 yk"}
  ],
  steps:[
    "Kıyma, ekmek ve soğanla yoğurup yuvarlak köfte yapın.",
    "Tavada her iki yüzünü kızartın.",
    "Salça, domates ve biraz suyla sos hazırlayın.",
    "Köfteleri sosa ekleyip 15 dk pişirin."
  ]
},
{
  id:"r_karniyarik_kofte",name:"Karnıyarık Köfte",cat:"klasik",
  emoji:"🍆",cal:388,prot:21.6,carb:36.8,fat:19.1,serv:"2 porsiyon",yieldServings:2,time:60,
  tags:["et","sebze","fırın"],
  ingredients:[
    {item:"Dana kıyma",amount:"180g"},
    {item:"Patlıcan",amount:"3 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Biber",amount:"2 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Salça",amount:"1 yk"}
  ],
  steps:[
    "Kıymayı soğan ve baharatlarla yoğurup köfteler yapın.",
    "Patlıcanları közleyin, ortadan yarın.",
    "Patlıcanın içine köfteyi yerleştirin.",
    "Üzerlerine domates ve biber dizin.",
    "200°C fırında 30 dk pişirin."
  ]
},
{
  id:"r_kiymali_mantar",name:"Kıymalı Mantar Sote",cat:"klasik",
  emoji:"🍄",cal:247,prot:14.4,carb:13.3,fat:16.3,serv:"2 porsiyon",yieldServings:2,time:25,
  tags:["et","mantar","sote","pratik"],
  ingredients:[
    {item:"Mantar",amount:"300g"},
    {item:"Dana kıyma",amount:"100g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Maydanoz",amount:"2 yk"}
  ],
  steps:[
    "Tereyağında soğan ve sarımsağı kavurun.",
    "Kıymayı ekleyip pişirin.",
    "Mantarları dilimleyip ekleyin.",
    "Suyu çekene kadar pişirin, maydanozla servis edin."
  ]
},
{
  id:"r_tavuk_snitzel",name:"Tavuk Şinitzel",cat:"klasik",
  emoji:"🍗",cal:503,prot:21,carb:20.7,fat:37,serv:"3 porsiyon",yieldServings:3,time:25,
  tags:["tavuk","kızartma","pratik"],
  ingredients:[
    {item:"Tavuk göğüs",amount:"200g"},
    {item:"Galeta unu",amount:"1/2 bardak"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Un",amount:"3 yk"},
    {item:"Limon",amount:"1/2 adet"},
    {item:"Sıvı yağ",amount:"1/2 bardak"}
  ],
  steps:[
    "Tavuğu inceltin, tuz ve karabiber serpin.",
    "Una, çırpılmış yumurtaya, sonra galeta ununa bulayın.",
    "Kızgın yağda her yüzünü 4 dk kızartın.",
    "Limonla servis edin."
  ]
},
{
  id:"r_terbiyeli_kofte",name:"Terbiyeli Köfte",cat:"klasik",
  emoji:"🍖",cal:377,prot:20.7,carb:21.4,fat:22.7,serv:"2 porsiyon",yieldServings:2,time:50,
  tags:["et","kofte","sulu","terbiyeli"],
  ingredients:[
    {item:"Dana kıyma",amount:"200g"},
    {item:"Pirinç",amount:"2 yk"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Yumurta sarısı",amount:"1 adet"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Un",amount:"1 yk"}
  ],
  steps:[
    "Kıyma, pirinç ve soğanla köfteler yapın.",
    "Tencerede sıcak suda haşlayın.",
    "Yumurta sarısı, un ve limon suyunu çırpıp suya ekleyin.",
    "Pıhtılaştırmadan karıştırarak 5 dk pişirin."
  ]
},
{
  id:"r_etli_yesil_mercimek",name:"Etli Yeşil Mercimek",cat:"klasik",
  emoji:"🫘",cal:414,prot:27.7,carb:45.2,fat:13.9,serv:"3 porsiyon",yieldServings:3,time:60,
  tags:["et","baklagil","sulu","klasik"],
  ingredients:[
    {item:"Yeşil mercimek",amount:"1 bardak"},
    {item:"Dana kuşbaşı",amount:"150g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Domates",amount:"1 adet"},
    {item:"Zeytinyağı",amount:"2 yk"}
  ],
  steps:[
    "Eti soğanla kavurun, salça ve domatesi ekleyin.",
    "Önceden ıslatılmış mercimeği ekleyin.",
    "Sıcak su ekleyip 45 dk pişirin."
  ]
},
{
  id:"r_etli_biber_dolma_kuru",name:"Kuru Biber Dolması",cat:"klasik",
  emoji:"🌶️",cal:337,prot:17.3,carb:32.2,fat:15.7,serv:"2 porsiyon",yieldServings:2,time:75,
  tags:["dolma","klasik","kuru","kış"],
  ingredients:[
    {item:"Kuru biber",amount:"10 adet"},
    {item:"Dana kıyma",amount:"150g"},
    {item:"Pirinç",amount:"3 yk"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Yenibahar, nane",amount:""}
  ],
  steps:[
    "Kuru biberleri ılık suda 30 dk bekletin.",
    "Kıyma, pirinç, soğan ve baharatları karıştırın.",
    "Biberleri doldurup tencereye dizin.",
    "Salçalı sıcak su ekleyip 50 dk pişirin."
  ]
},
{
  id:"r_kazan_kebabi",name:"Kazan Kebabı",cat:"klasik",
  emoji:"🥘",cal:464,prot:26.3,carb:41.2,fat:23.6,serv:"2 porsiyon",yieldServings:2,time:120,
  tags:["et","kebap","kazan","klasik"],
  ingredients:[
    {item:"Kuzu kuşbaşı",amount:"200g"},
    {item:"Patlıcan",amount:"2 adet"},
    {item:"Patates",amount:"1 adet"},
    {item:"Biber",amount:"2 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Tereyağı",amount:"1 yk"}
  ],
  steps:[
    "Eti tereyağında pişirin.",
    "Sebzeleri kuşbaşı doğrayıp tek tek kavurun.",
    "Hepsini birleştirip kazana koyun.",
    "1 saat kısık ateşte pişirin."
  ]
},

// ═══ ÇORBA (12) ═══
{
  id:"r_domates_corbasi",name:"Domates Çorbası",cat:"corba",
  emoji:"🍅",cal:145,prot:4.8,carb:12.2,fat:9.2,serv:"4 porsiyon",yieldServings:4,time:30,
  tags:["corba","klasik","kremalı"],
  ingredients:[
    {item:"Olgun domates",amount:"5 adet"},
    {item:"Tereyağı",amount:"2 yk"},
    {item:"Un",amount:"2 yk"},
    {item:"Süt",amount:"1 bardak"},
    {item:"Su",amount:"3 bardak"},
    {item:"Salça",amount:"1 yk"},
    {item:"Kaşar rendesi",amount:"2 yk"}
  ],
  steps:[
    "Domatesleri rendeleyin.",
    "Tereyağında unu kavurun, salçayı ekleyin.",
    "Domates ve suyu ekleyin, 15 dk pişirin.",
    "Sütü ekleyip kaynatın.",
    "Kaşarla servis edin."
  ]
},
{
  id:"r_sebze_corbasi",name:"Sebze Çorbası",cat:"corba",
  emoji:"🍲",cal:115,prot:2.8,carb:18.2,fat:4.2,serv:"3 porsiyon",yieldServings:3,time:35,
  tags:["corba","sebze","saglikli"],
  ingredients:[
    {item:"Patates",amount:"1 adet"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Kabak",amount:"1 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Sebze suyu",amount:"4 bardak"},
    {item:"Maydanoz",amount:"2 yk"},
    {item:"Tereyağı",amount:"1 yk"}
  ],
  steps:[
    "Sebzeleri küp doğrayın.",
    "Tereyağında soğanı kavurun.",
    "Tüm sebzeleri ve sebze suyunu ekleyin.",
    "20 dk pişirip maydanozla servis edin."
  ]
},
{
  id:"r_mantar_corbasi",name:"Kremalı Mantar Çorbası",cat:"corba",
  emoji:"🍄",cal:246,prot:7.9,carb:17.4,fat:17,serv:"3 porsiyon",yieldServings:3,time:30,
  tags:["corba","mantar","kremalı"],
  ingredients:[
    {item:"Mantar",amount:"300g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Tereyağı",amount:"2 yk"},
    {item:"Un",amount:"2 yk"},
    {item:"Süt",amount:"1.5 bardak"},
    {item:"Krema",amount:"3 yk"},
    {item:"Tavuk suyu",amount:"2 bardak"}
  ],
  steps:[
    "Mantarları dilimleyin.",
    "Tereyağında soğan ve mantarı kavurun.",
    "Unu ekleyip karıştırın, süt ve tavuk suyunu yavaşça ekleyin.",
    "Kaynayınca kremayı ekleyin.",
    "Karabiberle servis edin."
  ]
},
{
  id:"r_tavuk_corbasi_kremali",name:"Kremalı Tavuk Çorbası",cat:"corba",
  emoji:"🍗",cal:188,prot:11.5,carb:8.1,fat:12.2,serv:"3 porsiyon",yieldServings:3,time:35,
  tags:["corba","tavuk","kremalı","proteinli"],
  ingredients:[
    {item:"Tavuk göğüs",amount:"100g"},
    {item:"Tereyağı",amount:"2 yk"},
    {item:"Un",amount:"2 yk"},
    {item:"Süt",amount:"1 bardak"},
    {item:"Tavuk suyu",amount:"3 bardak"},
    {item:"Yumurta sarısı",amount:"1 adet"},
    {item:"Limon suyu",amount:"1 yk"}
  ],
  steps:[
    "Tavuğu haşlayıp didikleyin.",
    "Tereyağında unu kavurun.",
    "Süt ve tavuk suyunu yavaşça ekleyin.",
    "Tavuğu ekleyin, yumurta+limon karışımını terbiye yapın."
  ]
},
{
  id:"r_sehriye_corbasi",name:"Şehriye Çorbası",cat:"corba",
  emoji:"🍜",cal:160,prot:6,carb:24,fat:5,serv:"1 porsiyon",time:25,
  tags:["corba","pratik","klasik"],
  ingredients:[
    {item:"Arpa şehriye",amount:"1/2 bardak"},
    {item:"Tavuk suyu",amount:"4 bardak"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Salça",amount:"1 çk"},
    {item:"Maydanoz",amount:"1 yk"}
  ],
  steps:[
    "Tereyağında şehriyeyi kavurun.",
    "Salçayı ekleyin.",
    "Tavuk suyunu döküp 15 dk pişirin.",
    "Maydanozla servis edin."
  ]
},
{
  id:"r_tavuk_suyu_corbasi",name:"Tavuk Suyu Çorbası",cat:"corba",
  emoji:"🍲",cal:180,prot:14,carb:14,fat:7,serv:"1 porsiyon",time:60,
  tags:["corba","tavuk","klasik","hasta"],
  ingredients:[
    {item:"Tavuk but",amount:"200g"},
    {item:"Şehriye",amount:"3 yk"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Maydanoz",amount:"2 yk"},
    {item:"Limon",amount:"1/2 adet"}
  ],
  steps:[
    "Tavuğu soğan ve havuçla 45 dk kaynatın.",
    "Eti süzüp didikleyin, suyu süzün.",
    "Şehriyeyi tavuk suyuna atın, 8 dk pişirin.",
    "Tavuğu ekleyin, limonla servis edin."
  ]
},
{
  id:"r_bezelye_corbasi",name:"Bezelye Çorbası",cat:"corba",
  emoji:"🟢",cal:166,prot:6.1,carb:19,fat:7.7,serv:"3 porsiyon",yieldServings:3,time:30,
  tags:["corba","sebze","saglikli"],
  ingredients:[
    {item:"Bezelye",amount:"2 bardak"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Sebze suyu",amount:"4 bardak"},
    {item:"Krema",amount:"2 yk"},
    {item:"Nane",amount:"1 yk"}
  ],
  steps:[
    "Tereyağında soğanı kavurun.",
    "Bezelye ve sebze suyunu ekleyin.",
    "20 dk pişirip blenderdan geçirin.",
    "Kremayı ekleyin, nane ile servis edin."
  ]
},
{
  id:"r_patates_corbasi",name:"Patates Çorbası",cat:"corba",
  emoji:"🥔",cal:193,prot:4.6,carb:27.2,fat:7.7,serv:"4 porsiyon",yieldServings:4,time:30,
  tags:["corba","sebze","klasik"],
  ingredients:[
    {item:"Patates",amount:"3 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Tereyağı",amount:"2 yk"},
    {item:"Un",amount:"1 yk"},
    {item:"Süt",amount:"1 bardak"},
    {item:"Su",amount:"3 bardak"}
  ],
  steps:[
    "Patatesi küp doğrayın.",
    "Tereyağında soğan ve unu kavurun.",
    "Patates ve suyu ekleyin, 20 dk pişirin.",
    "Sütü ekleyip kaynatın, blenderdan geçirin."
  ]
},
{
  id:"r_lahana_corbasi",name:"Lahana Çorbası",cat:"corba",
  emoji:"🥬",cal:137,prot:3.2,carb:22.1,fat:4.9,serv:"3 porsiyon",yieldServings:3,time:35,
  tags:["corba","sebze","kış","düşük kalori"],
  ingredients:[
    {item:"Beyaz lahana",amount:"300g"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Patates",amount:"1 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Salça",amount:"1 çk"},
    {item:"Sebze suyu",amount:"4 bardak"},
    {item:"Zeytinyağı",amount:"1 yk"}
  ],
  steps:[
    "Sebzeleri ince doğrayın.",
    "Yağda soğanı kavurun, salçayı ekleyin.",
    "Lahana, havuç ve patatesi ekleyin.",
    "Sebze suyu ekleyip 25 dk pişirin."
  ]
},
{
  id:"r_yogurt_corbasi",name:"Yoğurt Çorbası",cat:"corba",
  emoji:"🥣",cal:150,prot:4.6,carb:15.8,fat:7.7,serv:"3 porsiyon",yieldServings:3,time:30,
  tags:["corba","yoğurtlu","klasik"],
  ingredients:[
    {item:"Yoğurt",amount:"1 bardak"},
    {item:"Pirinç",amount:"3 yk"},
    {item:"Yumurta sarısı",amount:"1 adet"},
    {item:"Un",amount:"1 yk"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Nane",amount:"1 yk"},
    {item:"Su",amount:"4 bardak"}
  ],
  steps:[
    "Pirinci suda yumuşayana kadar haşlayın.",
    "Yoğurt, yumurta ve unu çırpın.",
    "Karışımı pirince yedirerek ekleyin (kesilmesin).",
    "Tereyağında naneyi yakıp üzerine gezdirin."
  ]
},
{
  id:"r_anali_kizli",name:"Analı Kızlı",cat:"corba",
  emoji:"🍲",cal:276,prot:12,carb:41.4,fat:8,serv:"5 porsiyon",yieldServings:5,time:90,
  tags:["corba","mardin","klasik","içli kofte"],
  ingredients:[
    {item:"İnce bulgur",amount:"1 bardak"},
    {item:"Dana kıyma",amount:"100g"},
    {item:"Nohut",amount:"1/2 bardak"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Nane",amount:"1 çk"}
  ],
  steps:[
    "Bulguru ıslatıp yoğurun, küçük top haline getirin (kızlar).",
    "İçli köfte gibi kıymalı dolu olanları (analar) yapın.",
    "Salçalı suya nohut ve köfteleri ekleyin.",
    "30 dk pişirin, naneyle servis edin."
  ]
},
{
  id:"r_kelle_paca",name:"Kelle Paça Çorbası",cat:"corba",
  emoji:"🍲",cal:212,prot:20.6,carb:4.2,fat:12.7,serv:"3 porsiyon",yieldServings:3,time:240,
  tags:["corba","klasik","et","sabah"],
  ingredients:[
    {item:"Kuzu paça",amount:"300g"},
    {item:"Sarımsak",amount:"4 diş"},
    {item:"Un",amount:"1 yk"},
    {item:"Yumurta sarısı",amount:"1 adet"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Sirke, pul biber",amount:""}
  ],
  steps:[
    "Paçayı 3-4 saat haşlayın, etini ayıklayın.",
    "Suyunu süzün, etleri tekrar ekleyin.",
    "Yumurta+un+limon karışımıyla terbiye yapın.",
    "Sarımsaklı sirke ve pul biberle servis edin."
  ]
},

// ═══ PRATİK (10) ═══
{
  id:"r_yumurtali_ekmek",name:"Yumurtalı Ekmek",cat:"pratik",
  emoji:"🍞",cal:280,prot:12,carb:32,fat:12,serv:"1 porsiyon",time:10,
  tags:["pratik","kahvalti","yumurta"],
  ingredients:[
    {item:"Bayat ekmek",amount:"3 dilim"},
    {item:"Yumurta",amount:"2 adet"},
    {item:"Süt",amount:"3 yk"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Tuz",amount:""}
  ],
  steps:[
    "Yumurta ve sütü çırpın, tuz ekleyin.",
    "Ekmek dilimlerini karışıma batırın.",
    "Tereyağlı tavada her iki yüzünü 2 dk pişirin.",
    "Sıcak servis edin."
  ]
},
{
  id:"r_sebzeli_bulgur",name:"Sebzeli Bulgur",cat:"pratik",
  emoji:"🌾",cal:313,prot:8.3,carb:50.7,fat:10.3,serv:"3 porsiyon",yieldServings:3,time:30,
  tags:["pratik","bulgur","sebze","vegan"],
  ingredients:[
    {item:"Bulgur",amount:"1 bardak"},
    {item:"Domates",amount:"1 adet"},
    {item:"Biber",amount:"1 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Sıcak su",amount:"2 bardak"}
  ],
  steps:[
    "Yağda soğan ve biberi kavurun.",
    "Salça ve domatesi ekleyin.",
    "Bulgur ve sıcak suyu ekleyin.",
    "Suyunu çekene dek pişirin, demlenmeye bırakın."
  ]
},
{
  id:"r_domatesli_yumurta",name:"Domatesli Yumurta",cat:"pratik",
  emoji:"🍳",cal:240,prot:14,carb:8,fat:18,serv:"1 porsiyon",yieldServings:1,time:10,
  tags:["pratik","kahvalti","yumurta","klasik"],
  ingredients:[
    {item:"Yumurta",amount:"2 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Tuz, karabiber",amount:""}
  ],
  steps:[
    "Domatesi küp doğrayın.",
    "Tereyağlı tavada domatesi 4 dk pişirin.",
    "Yumurtaları kırın, karıştırın.",
    "Akı katılaşana kadar pişirin."
  ]
},
{
  id:"r_patates_pure",name:"Patates Püresi",cat:"pratik",
  emoji:"🥔",cal:205,prot:4.3,carb:27.9,fat:8.9,serv:"3 porsiyon",yieldServings:3,time:25,
  tags:["pratik","sebze","klasik"],
  ingredients:[
    {item:"Patates",amount:"3 adet"},
    {item:"Tereyağı",amount:"2 yk"},
    {item:"Süt",amount:"1/2 bardak"},
    {item:"Tuz",amount:""},
    {item:"Karabiber",amount:""}
  ],
  steps:[
    "Patatesi haşlayın, soyup ezin.",
    "Sıcak süt ve tereyağını ekleyin.",
    "Pürüzsüz olana kadar karıştırın.",
    "Tuz ve karabiberle servis edin."
  ]
},
{
  id:"r_ev_makarnasi",name:"Ev Makarnası",cat:"pratik",
  emoji:"🍝",cal:333,prot:9.6,carb:39.1,fat:15.4,serv:"2 porsiyon",yieldServings:2,time:20,
  tags:["pratik","makarna","klasik"],
  ingredients:[
    {item:"Spagetti",amount:"100g"},
    {item:"Tereyağı",amount:"2 yk"},
    {item:"Salça",amount:"1 yk"},
    {item:"Beyaz peynir",amount:"30g"},
    {item:"Tuz",amount:""}
  ],
  steps:[
    "Makarnayı tuzlu suda haşlayın.",
    "Tereyağında salçayı kavurun.",
    "Süzülmüş makarnayı ekleyip karıştırın.",
    "Üzerine peynir rendeleyerek servis edin."
  ]
},
{
  id:"r_pirincli_bulgur",name:"Pirinçli Bulgur Pilavı",cat:"pratik",
  emoji:"🌾",cal:383,prot:9.2,carb:73.5,fat:6.6,serv:"2 porsiyon",yieldServings:2,time:35,
  tags:["pilav","pratik","bulgur"],
  ingredients:[
    {item:"Pilavlık bulgur",amount:"1/2 bardak"},
    {item:"Pirinç",amount:"1/2 bardak"},
    {item:"Soğan",amount:"1/2 adet"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Tavuk suyu",amount:"2 bardak"}
  ],
  steps:[
    "Tereyağında soğanı kavurun.",
    "Pirinç ve bulguru ekleyip kavurun.",
    "Tavuk suyu ekleyin.",
    "Suyunu çekene kadar pişirin."
  ]
},
{
  id:"r_soganli_yumurta",name:"Soğanlı Yumurta",cat:"pratik",
  emoji:"🍳",cal:260,prot:14,carb:8,fat:20,serv:"1 porsiyon",yieldServings:1,time:12,
  tags:["pratik","kahvalti","yumurta"],
  ingredients:[
    {item:"Yumurta",amount:"2 adet"},
    {item:"Soğan",amount:"2 adet"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Pul biber",amount:""}
  ],
  steps:[
    "Soğanları piyazlık doğrayın.",
    "Tereyağında soğanı altın renge kadar kavurun.",
    "Yumurtaları kırın, karıştırarak pişirin.",
    "Pul biberle servis edin."
  ]
},
{
  id:"r_mantarli_omlet",name:"Mantarlı Omlet",cat:"pratik",
  emoji:"🍳",cal:220,prot:14.7,carb:2.5,fat:17,serv:"2 porsiyon",yieldServings:2,time:12,
  tags:["pratik","kahvalti","yumurta","mantar"],
  ingredients:[
    {item:"Yumurta",amount:"3 adet"},
    {item:"Mantar",amount:"5 adet"},
    {item:"Kaşar",amount:"30g"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Maydanoz",amount:"1 yk"}
  ],
  steps:[
    "Mantarları dilimleyin.",
    "Tereyağında mantarları soteleyin.",
    "Çırpılmış yumurtayı dökün.",
    "Kaşarı ekleyip katlayarak servis edin."
  ]
},
{
  id:"r_patatesli_yumurta",name:"Patatesli Yumurta",cat:"pratik",
  emoji:"🥔",cal:319,prot:9.9,carb:30.1,fat:17.9,serv:"2 porsiyon",yieldServings:2,time:25,
  tags:["pratik","kahvalti","yumurta","patates"],
  ingredients:[
    {item:"Patates",amount:"2 adet"},
    {item:"Yumurta",amount:"2 adet"},
    {item:"Soğan",amount:"1/2 adet"},
    {item:"Sıvı yağ",amount:"2 yk"},
    {item:"Pul biber, karabiber",amount:""}
  ],
  steps:[
    "Patatesi küp doğrayın, yağda kızartın.",
    "Soğanı ekleyip yumuşatın.",
    "Yumurtaları kırın, karıştırarak pişirin.",
    "Baharatlarla servis edin."
  ]
},
{
  id:"r_makarna_salata",name:"Makarna Salatası",cat:"pratik",
  emoji:"🥗",cal:340,prot:9.6,carb:50.3,fat:11.9,serv:"2 porsiyon",yieldServings:2,time:25,
  tags:["pratik","salata","makarna","piknik"],
  ingredients:[
    {item:"Makarna (boncuk)",amount:"100g"},
    {item:"Mısır",amount:"3 yk"},
    {item:"Bezelye",amount:"3 yk"},
    {item:"Salatalık turşusu",amount:"2 adet"},
    {item:"Mayonez",amount:"2 yk"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Maydanoz",amount:"2 yk"}
  ],
  steps:[
    "Makarnayı haşlayıp soğutun.",
    "Tüm malzemeleri kaseye alın.",
    "Mayonez ve limonla karıştırın.",
    "Buzdolabında 30 dk dinlendirin."
  ]
},

// ═══ SEBZE (10) ═══
{
  id:"r_etli_patlican",name:"Etli Patlıcan",cat:"sebze",
  emoji:"🍆",cal:276,prot:22.8,carb:36.8,fat:6.8,serv:"2 porsiyon",yieldServings:2,time:55,
  tags:["et","sebze","fırın"],
  ingredients:[
    {item:"Patlıcan",amount:"3 adet"},
    {item:"Dana kuşbaşı",amount:"150g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Domates",amount:"2 adet"},
    {item:"Biber",amount:"2 adet"},
    {item:"Salça",amount:"1 yk"}
  ],
  steps:[
    "Patlıcanı kalın dilimleyip ızgarada pişirin.",
    "Eti soğanla kavurun, salça ve domatesi ekleyin.",
    "Tepsiye patlıcan ve eti yerleştirin.",
    "Üstüne biber ve domates dizip 200°C'de 30 dk pişirin."
  ]
},
{
  id:"r_sogan_yahnisi",name:"Soğan Yahnisi",cat:"klasik",
  emoji:"🧅",cal:328,prot:26.5,carb:28.5,fat:13.4,serv:"2 porsiyon",yieldServings:2,time:75,
  tags:["et","yahni","klasik"],
  ingredients:[
    {item:"Dana kuşbaşı",amount:"200g"},
    {item:"Arpacık soğan",amount:"15 adet"},
    {item:"Sarımsak",amount:"3 diş"},
    {item:"Salça",amount:"1 yk"},
    {item:"Defne yaprağı",amount:"2 adet"},
    {item:"Tereyağı",amount:"1 yk"}
  ],
  steps:[
    "Eti tereyağında mühürleyin.",
    "Arpacık soğanları ekleyip 5 dk kavurun.",
    "Salça, sarımsak ve defne yaprağını ekleyin.",
    "Sıcak su ekleyip 50 dk kısık ateşte pişirin."
  ]
},
{
  id:"r_zeytinyagli_bamya",name:"Zeytinyağlı Bamya",cat:"sebze",
  emoji:"🌿",cal:196,prot:3.4,carb:16.4,fat:14.4,serv:"3 porsiyon",yieldServings:3,time:40,
  tags:["zeytinyağlı","sebze","vegan"],
  ingredients:[
    {item:"Taze bamya",amount:"300g"},
    {item:"Domates",amount:"2 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"3 yk"}
  ],
  steps:[
    "Bamyayı yıkayıp limonlu suda 10 dk bekletin.",
    "Yağda soğan ve sarımsağı kavurun.",
    "Domates ve bamyayı ekleyin.",
    "1 bardak su ile 30 dk pişirin. Soğuk servis edin."
  ]
},
{
  id:"r_patlican_basti",name:"Patlıcan Bastı",cat:"sebze",
  emoji:"🍆",cal:243,prot:4.8,carb:27.1,fat:14.8,serv:"3 porsiyon",yieldServings:3,time:50,
  tags:["sebze","zeytinyağlı","yaz"],
  ingredients:[
    {item:"Patlıcan",amount:"3 adet"},
    {item:"Domates",amount:"3 adet"},
    {item:"Biber",amount:"3 adet"},
    {item:"Sarımsak",amount:"4 diş"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Zeytinyağı",amount:"3 yk"}
  ],
  steps:[
    "Patlıcanları küp doğrayıp tuzlayın, suyunu salsın.",
    "Yağda soğan ve sarımsağı kavurun.",
    "Tüm sebzeleri ekleyin.",
    "Kapağını kapatıp 35 dk pişirin."
  ]
},
{
  id:"r_mucver",name:"Kabak Mücver",cat:"sebze",
  emoji:"🥒",cal:240,prot:10,carb:14,fat:16,serv:"4 adet",time:30,
  tags:["sebze","kahvalti","kızartma"],
  ingredients:[
    {item:"Sakız kabağı",amount:"2 adet"},
    {item:"Yumurta",amount:"2 adet"},
    {item:"Beyaz peynir",amount:"50g"},
    {item:"Un",amount:"3 yk"},
    {item:"Maydanoz, dereotu",amount:"1 demet"},
    {item:"Sıvı yağ",amount:"3 yk"}
  ],
  steps:[
    "Kabakları rendeleyin, suyunu sıkın.",
    "Yumurta, peynir, un ve otları ekleyip karıştırın.",
    "Yağlı tavaya kaşıkla dökün.",
    "Her iki yüzünü 3 dk kızartın."
  ]
},
{
  id:"r_zeytinyagli_kabak",name:"Zeytinyağlı Kabak",cat:"sebze",
  emoji:"🥒",cal:160,prot:4,carb:14,fat:10,serv:"1 porsiyon",time:35,
  tags:["zeytinyağlı","sebze","yaz"],
  ingredients:[
    {item:"Sakız kabağı",amount:"4 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Domates",amount:"1 adet"},
    {item:"Pirinç",amount:"2 yk"},
    {item:"Zeytinyağı",amount:"3 yk"},
    {item:"Dereotu",amount:"1 demet"}
  ],
  steps:[
    "Kabakları küp doğrayın.",
    "Yağda soğanı kavurun.",
    "Kabak, pirinç ve domatesi ekleyin.",
    "Az suyla 25 dk pişirin. Dereotuyla soğuk servis edin."
  ]
},
{
  id:"r_kozlenmis_patlican",name:"Közlenmiş Patlıcan Salatası",cat:"sebze",
  emoji:"🍆",cal:151,prot:2.7,carb:16.1,fat:9.8,serv:"3 porsiyon",yieldServings:3,time:30,
  tags:["sebze","közleme","meze","vegan"],
  ingredients:[
    {item:"Patlıcan",amount:"3 adet"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Maydanoz",amount:"2 yk"},
    {item:"Tuz",amount:""}
  ],
  steps:[
    "Patlıcanları közleyin, kabuklarını soyun.",
    "Limonlu suda yıkayın, ezin.",
    "Ezilmiş sarımsak, limon ve zeytinyağı ekleyin.",
    "Maydanozla soğuk servis edin."
  ]
},
{
  id:"r_sebze_guvec",name:"Sebze Güveç",cat:"sebze",
  emoji:"🍲",cal:214,prot:4.3,carb:27,fat:11.1,serv:"4 porsiyon",yieldServings:4,time:75,
  tags:["sebze","fırın","vegan","saglikli"],
  ingredients:[
    {item:"Patates",amount:"2 adet"},
    {item:"Patlıcan",amount:"1 adet"},
    {item:"Kabak",amount:"1 adet"},
    {item:"Biber",amount:"2 adet"},
    {item:"Domates",amount:"3 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Zeytinyağı",amount:"3 yk"},
    {item:"Sarımsak",amount:"3 diş"}
  ],
  steps:[
    "Tüm sebzeleri iri doğrayın.",
    "Güvece dizin, sarımsak ve zeytinyağı ekleyin.",
    "Üzerine 1/2 bardak su gezdirin.",
    "180°C fırında 60 dk pişirin."
  ]
},
{
  id:"r_kremali_ispanak",name:"Kremalı Ispanak",cat:"sebze",
  emoji:"🥬",cal:243,prot:8.6,carb:12.5,fat:18.8,serv:"3 porsiyon",yieldServings:3,time:25,
  tags:["sebze","kremalı","saglikli"],
  ingredients:[
    {item:"Ispanak",amount:"500g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Krema",amount:"1/2 bardak"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Kaşar rendesi",amount:"3 yk"}
  ],
  steps:[
    "Ispanakları yıkayıp doğrayın.",
    "Tereyağında soğan ve sarımsağı kavurun.",
    "Ispanağı ekleyip suyunu çektirene dek pişirin.",
    "Kremayı ve kaşarı ekleyip 5 dk daha pişirin."
  ]
},
{
  id:"r_lahana_sote",name:"Lahana Sote",cat:"sebze",
  emoji:"🥬",cal:148,prot:2.6,carb:15.3,fat:9.6,serv:"3 porsiyon",yieldServings:3,time:25,
  tags:["sebze","sote","düşük kalori","vegan"],
  ingredients:[
    {item:"Beyaz lahana",amount:"400g"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Salça",amount:"1 çk"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Pul biber",amount:""}
  ],
  steps:[
    "Lahanayı ince dilimleyin.",
    "Yağda soğan ve havucu kavurun.",
    "Salçayı ekleyin.",
    "Lahanayı ekleyip suyunu salana kadar 15 dk pişirin."
  ]
},

// ═══ TATLI (12) ═══
{
  id:"r_sobiyet",name:"Şöbiyet",cat:"tatli",
  emoji:"🍯",cal:440,prot:7,carb:48,fat:24,serv:"3 adet",time:90,
  tags:["tatli","şerbetli","fıstıklı"],
  ingredients:[
    {item:"Yufka",amount:"5 adet"},
    {item:"Antep fıstığı (toz)",amount:"150g"},
    {item:"Kaymak",amount:"3 yk"},
    {item:"Tereyağı (eritilmiş)",amount:"200g"},
    {item:"Şeker",amount:"2 bardak"},
    {item:"Su",amount:"2 bardak"},
    {item:"Limon suyu",amount:"1 yk"}
  ],
  steps:[
    "Yufkayı kareler halinde kesin, tereyağı sürün.",
    "Ortasına kaymak ve fıstık koyun, üçgen şeklinde katlayın.",
    "Tepsiye dizin, üzerine kalan tereyağını gezdirin.",
    "180°C fırında 30 dk pişirin.",
    "Sıcakken ılık şerbet dökün."
  ]
},
{
  id:"r_havuc_dilimi",name:"Havuç Dilimi",cat:"tatli",
  emoji:"🥕",cal:380,prot:5,carb:42,fat:22,serv:"1 dilim",time:60,
  tags:["tatli","baklava","cevizli"],
  ingredients:[
    {item:"Yufka",amount:"6 adet"},
    {item:"Ceviz içi (toz)",amount:"200g"},
    {item:"Tereyağı (eritilmiş)",amount:"200g"},
    {item:"Şeker",amount:"2 bardak"},
    {item:"Su",amount:"2 bardak"},
    {item:"Limon suyu",amount:"1 yk"}
  ],
  steps:[
    "Yufkayı yağlayıp ikiye katlayın, ceviz dizin.",
    "Sıkıca rulo yapın, havuç dilimi şeklinde kesin.",
    "Yuvarlak tepsiye dizin, üzerine tereyağı gezdirin.",
    "180°C fırında 35 dk pişirin.",
    "Şerbet dökün, ılıyana kadar bekletin."
  ]
},
{
  id:"r_saray_sarmasi",name:"Saray Sarması",cat:"tatli",
  emoji:"🍯",cal:420,prot:6,carb:46,fat:24,serv:"3 adet",time:75,
  tags:["tatli","baklava","şerbetli"],
  ingredients:[
    {item:"Yufka",amount:"5 adet"},
    {item:"Ceviz içi",amount:"150g"},
    {item:"Tereyağı (eritilmiş)",amount:"200g"},
    {item:"Şeker",amount:"2 bardak"},
    {item:"Su",amount:"2 bardak"},
    {item:"Limon suyu",amount:"1 yk"}
  ],
  steps:[
    "Yufkayı tereyağıyla yağlayın, ceviz serpin.",
    "Bir oklava etrafında sarın, sıkın.",
    "Tepsiye dizin, üstüne tereyağı gezdirin.",
    "180°C fırında 30 dk pişirin.",
    "Sıcakken ılık şerbet dökün."
  ]
},
{
  id:"r_hanim_gobegi",name:"Hanım Göbeği",cat:"tatli",
  emoji:"🍩",cal:340,prot:5,carb:48,fat:14,serv:"3 adet",time:60,
  tags:["tatli","şerbetli","klasik"],
  ingredients:[
    {item:"Su",amount:"1.5 bardak"},
    {item:"Tereyağı",amount:"3 yk"},
    {item:"Un",amount:"1.5 bardak"},
    {item:"Yumurta",amount:"3 adet"},
    {item:"Şeker",amount:"2 bardak"},
    {item:"Su (şerbet)",amount:"2 bardak"},
    {item:"Limon",amount:"1 yk"}
  ],
  steps:[
    "Su+tereyağı kaynatın, unu ekleyip pişirin, soğutun.",
    "Yumurtayı tek tek katın.",
    "Yağ ısıtın, hamuru göbek şeklinde sıkın.",
    "Kısık ateşte altın renge dek kızartın.",
    "Sıcakken soğuk şerbete atın."
  ]
},
{
  id:"r_kalburabasti",name:"Kalburabastı",cat:"tatli",
  emoji:"🍯",cal:320,prot:5,carb:42,fat:14,serv:"3 adet",time:60,
  tags:["tatli","şerbetli","irmik"],
  ingredients:[
    {item:"İrmik",amount:"1 bardak"},
    {item:"Un",amount:"3 bardak"},
    {item:"Tereyağı",amount:"200g"},
    {item:"Yoğurt",amount:"1 yk"},
    {item:"Şeker",amount:"2 bardak"},
    {item:"Su",amount:"2 bardak"},
    {item:"Limon",amount:"1 yk"}
  ],
  steps:[
    "İrmik, un, tereyağı ve yoğurtla hamur yoğurun.",
    "Bezeler yapın, kalburdan geçirip oval şekil verin.",
    "180°C fırında 25-30 dk pişirin.",
    "Sıcakken ılık şerbet dökün."
  ]
},
{
  id:"r_ayva_tatlisi",name:"Ayva Tatlısı",cat:"tatli",
  emoji:"🍐",cal:232,prot:1.1,carb:46.6,fat:5.8,serv:"6 porsiyon",yieldServings:6,time:50,
  tags:["tatli","mevsim","sonbahar"],
  ingredients:[
    {item:"Ayva",amount:"2 adet"},
    {item:"Şeker",amount:"1 bardak"},
    {item:"Karanfil",amount:"4 adet"},
    {item:"Su",amount:"1 bardak"},
    {item:"Kaymak",amount:"3 yk"},
    {item:"Ceviz içi",amount:"2 yk"}
  ],
  steps:[
    "Ayvaları soyup ortadan ikiye bölün, çekirdeklerini çıkarın.",
    "Tencereye kabuklarını da ekleyin (renk için).",
    "Şeker, su ve karanfil ekleyin.",
    "Kapağı kapalı kısık ateşte 40 dk pişirin.",
    "Soğuk, kaymak ve cevizle servis edin."
  ]
},
{
  id:"r_incir_tatlisi",name:"Kuru İncir Tatlısı",cat:"tatli",
  emoji:"🟤",cal:189,prot:3.5,carb:34,fat:5.2,serv:"5 porsiyon",yieldServings:5,time:30,
  tags:["tatli","kuru meyve","ramazan"],
  ingredients:[
    {item:"Kuru incir",amount:"6 adet"},
    {item:"Süt",amount:"2 bardak"},
    {item:"Şeker",amount:"1/2 bardak"},
    {item:"Karanfil",amount:"3 adet"},
    {item:"Ceviz içi",amount:"2 yk"},
    {item:"Tarçın",amount:"1 çk"}
  ],
  steps:[
    "İncirleri ılık suda 10 dk bekletin.",
    "Sapını kesin, üst kısmından + işareti yapın.",
    "Süt, şeker ve karanfille kısık ateşte 25 dk pişirin.",
    "Cevizleri içlerine yerleştirin, tarçınla servis edin."
  ]
},
{
  id:"r_irmik_tatlisi",name:"İrmik Tatlısı (Şerbetli)",cat:"tatli",
  emoji:"🍯",cal:340,prot:6,carb:54,fat:11,serv:"1 dilim",time:55,
  tags:["tatli","şerbetli","irmik"],
  ingredients:[
    {item:"İrmik",amount:"1 bardak"},
    {item:"Un",amount:"1 bardak"},
    {item:"Süt",amount:"1 bardak"},
    {item:"Yumurta",amount:"2 adet"},
    {item:"Tereyağı (eritilmiş)",amount:"100g"},
    {item:"Şeker",amount:"2 bardak"},
    {item:"Su",amount:"2 bardak"},
    {item:"Limon",amount:"1 yk"}
  ],
  steps:[
    "Yumurta, süt, tereyağı ve şekeri çırpın.",
    "İrmik ve unu ekleyin.",
    "Yağlı tepsiye dökün, 180°C fırında 30 dk pişirin.",
    "Sıcakken ılık şerbet dökün."
  ]
},
{
  id:"r_kemalpasa_tatlisi",name:"Kemalpaşa Tatlısı",cat:"tatli",
  emoji:"🍮",cal:269,prot:4.8,carb:59.6,fat:1.8,serv:"3 adet",yieldServings:8,time:60,
  tags:["tatli","şerbetli","peynirli"],
  ingredients:[
    {item:"Lor peyniri",amount:"200g"},
    {item:"İrmik",amount:"3 yk"},
    {item:"Un",amount:"1/2 bardak"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Kabartma tozu",amount:"1 çk"},
    {item:"Şeker",amount:"2 bardak"},
    {item:"Su",amount:"2 bardak"},
    {item:"Limon",amount:"1 yk"}
  ],
  steps:[
    "Lor, irmik, un, yumurta ve kabartma tozunu yoğurun.",
    "Küçük yuvarlaklar yapın.",
    "Yağda altın renge kadar kızartın.",
    "Soğuk şerbete atıp 5 dk bekletin."
  ]
},
{
  id:"r_tahin_helvasi",name:"Tahin Helvası",cat:"tatli",
  emoji:"🥮",cal:330,prot:6.5,carb:36.1,fat:19.5,serv:"6 porsiyon",yieldServings:6,time:25,
  tags:["tatli","tahin","klasik"],
  ingredients:[
    {item:"Tahin",amount:"1 bardak"},
    {item:"Pekmez",amount:"1/2 bardak"},
    {item:"Şeker",amount:"1/2 bardak"},
    {item:"Ceviz içi",amount:"2 yk"},
    {item:"Tarçın",amount:"1 çk"}
  ],
  steps:[
    "Şekeri pekmezle eritip kaynatın.",
    "Tahini ekleyip karıştırın.",
    "Cevizleri katın.",
    "Soğutup dilimleyerek tarçınla servis edin."
  ]
},
{
  id:"r_sutlu_nuriye",name:"Sütlü Nuriye",cat:"tatli",
  emoji:"🥛",cal:280,prot:8,carb:42,fat:9,serv:"1 dilim",time:60,
  tags:["tatli","sütlü","baklava"],
  ingredients:[
    {item:"Yufka",amount:"5 adet"},
    {item:"Ceviz/fındık",amount:"100g"},
    {item:"Tereyağı (eritilmiş)",amount:"150g"},
    {item:"Süt",amount:"3 bardak"},
    {item:"Şeker",amount:"1.5 bardak"}
  ],
  steps:[
    "Yufkayı yağlayarak tepsiye serin, arasına ceviz koyun.",
    "Dilimleyin, kalan tereyağını üstüne gezdirin.",
    "180°C fırında 25 dk pişirin.",
    "Sütü şekerle kaynatın, sıcak baklavaya dökün.",
    "Soğuyunca servis edin."
  ]
},
{
  id:"r_vezir_parmagi",name:"Vezir Parmağı",cat:"tatli",
  emoji:"🍯",cal:300,prot:5,carb:44,fat:12,serv:"3 adet",time:50,
  tags:["tatli","şerbetli","klasik"],
  ingredients:[
    {item:"Su",amount:"1 bardak"},
    {item:"Tereyağı",amount:"2 yk"},
    {item:"Un",amount:"1 bardak"},
    {item:"Yumurta",amount:"3 adet"},
    {item:"Şeker",amount:"2 bardak"},
    {item:"Su (şerbet)",amount:"2 bardak"},
    {item:"Limon",amount:"1 yk"}
  ],
  steps:[
    "Su+tereyağı kaynatın, unu ekleyip hamur yapın.",
    "Soğuyunca yumurtayı tek tek katın.",
    "Sıkma torbasıyla parmak şeklinde yağa sıkın.",
    "Kısık ateşte altın renge kadar kızartın.",
    "Soğuk şerbete atıp emmesini bekleyin."
  ]
},

// ═══ SANDVİÇ (6) ═══
{
  id:"r_turk_hamburger",name:"Türk Hamburger",cat:"sandvic",
  emoji:"🍔",cal:520,prot:28,carb:42,fat:26,serv:"1 adet",yieldServings:1,time:30,
  tags:["sandviç","burger","sokak"],
  ingredients:[
    {item:"Hamburger ekmeği",amount:"1 adet"},
    {item:"Dana kıyma",amount:"150g"},
    {item:"Soğan",amount:"1/2 adet"},
    {item:"Kaşar",amount:"1 dilim"},
    {item:"Domates",amount:"2 dilim"},
    {item:"Marul",amount:"2 yaprak"},
    {item:"Turşu",amount:"3 dilim"}
  ],
  steps:[
    "Kıymayı tuz ve karabiberle yoğurun, köfte yapın.",
    "Tavada her iki yüzünü 4 dk pişirin.",
    "Son 1 dk'da kaşarı koyup eritin.",
    "Ekmeği hafif kızartın.",
    "Marul, köfte, domates ve turşuyla doldurun."
  ]
},
{
  id:"r_sucuklu_tost",name:"Sucuklu Tost",cat:"sandvic",
  emoji:"🥪",cal:480,prot:22,carb:38,fat:26,serv:"1 adet",yieldServings:1,time:10,
  tags:["sandviç","tost","sucuk","klasik"],
  ingredients:[
    {item:"Tost ekmeği",amount:"2 dilim"},
    {item:"Sucuk",amount:"50g"},
    {item:"Kaşar peyniri",amount:"40g"},
    {item:"Domates",amount:"2 dilim"},
    {item:"Tereyağı",amount:"1 çk"}
  ],
  steps:[
    "Ekmeklere tereyağı sürün.",
    "Aralarına sucuk, kaşar ve domates yerleştirin.",
    "Tost makinesinde 4-5 dk pişirin.",
    "Ortadan kesip servis edin."
  ]
},
{
  id:"r_kumru",name:"Kumru Sandviç",cat:"sandvic",
  emoji:"🥪",cal:560,prot:26,carb:46,fat:30,serv:"1 adet",time:20,
  tags:["sandviç","izmir","sokak"],
  ingredients:[
    {item:"Kumru ekmeği",amount:"1 adet"},
    {item:"Sucuk",amount:"40g"},
    {item:"Salam",amount:"30g"},
    {item:"Kaşar",amount:"40g"},
    {item:"Domates",amount:"2 dilim"},
    {item:"Salatalık turşusu",amount:"3 dilim"}
  ],
  steps:[
    "Ekmeği yatay kesip izgarada hafif kızartın.",
    "İçine sucuk ve salamı dizin.",
    "Üstüne kaşarı koyun, peynir eriyene dek tutun.",
    "Domates ve turşuyla servis edin."
  ]
},
{
  id:"r_kofte_ekmek",name:"Köfte Ekmek",cat:"sandvic",
  emoji:"🥖",cal:480,prot:24,carb:46,fat:22,serv:"1 adet",time:30,
  tags:["sandviç","köfte","sokak"],
  ingredients:[
    {item:"Yarım ekmek",amount:"1 adet"},
    {item:"Köfte",amount:"3 adet"},
    {item:"Domates",amount:"2 dilim"},
    {item:"Soğan",amount:"1/2 adet"},
    {item:"Maydanoz",amount:"3 dal"},
    {item:"Sumak",amount:"1 çk"}
  ],
  steps:[
    "Köfteleri ızgarada pişirin.",
    "Ekmeği açın.",
    "Köfteleri yerleştirin.",
    "Sumaklı soğan, domates ve maydanozu ekleyin."
  ]
},
{
  id:"r_pastirma_sandvic",name:"Pastırmalı Sandviç",cat:"sandvic",
  emoji:"🥪",cal:380,prot:22,carb:32,fat:18,serv:"1 adet",yieldServings:1,time:8,
  tags:["sandviç","pastırma","kayseri","klasik"],
  ingredients:[
    {item:"Tam buğday ekmeği",amount:"2 dilim"},
    {item:"Pastırma",amount:"60g"},
    {item:"Domates",amount:"2 dilim"},
    {item:"Marul",amount:"2 yaprak"},
    {item:"Mayonez",amount:"1 çk"},
    {item:"Kaşar (rendelenmiş)",amount:"30g"}
  ],
  steps:[
    "Pastırmayı tavada hafifçe ısıtın (yağsız).",
    "Ekmeklere mayonez sürün.",
    "Marul, pastırma, kaşar ve domatesi yerleştirin.",
    "Hafif tost yaparak veya soğuk servis edin."
  ]
},
{
  id:"r_kuzu_durum",name:"Kuzu Şiş Dürüm",cat:"sandvic",
  emoji:"🌯",cal:540,prot:34,carb:44,fat:24,serv:"1 adet",time:30,
  tags:["dürüm","kebap","sokak"],
  ingredients:[
    {item:"Lavaş",amount:"1 adet"},
    {item:"Kuzu şiş",amount:"150g"},
    {item:"Domates",amount:"1/2 adet"},
    {item:"Soğan",amount:"1/2 adet"},
    {item:"Maydanoz",amount:"3 dal"},
    {item:"Sumak",amount:"1 çk"},
    {item:"Pul biber",amount:"1 çk"}
  ],
  steps:[
    "Kuzu şişi mangalda pişirin.",
    "Lavaşı hafif ısıtın.",
    "Eti yerleştirin, sumaklı soğan, domates ve maydanozu ekleyin.",
    "Pul biberle sıkıca sarın."
  ]
},

// ═══ SALATA (5) ═══
{
  id:"r_marul_salata",name:"Marul Salatası",cat:"salata",
  emoji:"🥗",cal:120,prot:3,carb:8,fat:9,serv:"1 porsiyon",time:8,
  tags:["salata","klasik","düşük kalori"],
  ingredients:[
    {item:"Marul",amount:"1 göbek"},
    {item:"Yeşil soğan",amount:"3 dal"},
    {item:"Maydanoz",amount:"1/2 demet"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Tuz",amount:""}
  ],
  steps:[
    "Marulu yıkayın, julyen doğrayın.",
    "Yeşil soğan ve maydanozu ekleyin.",
    "Limon, zeytinyağı ve tuzla karıştırın.",
    "Hemen servis edin."
  ]
},
{
  id:"r_beyaz_lahana_salata",name:"Beyaz Lahana Salatası",cat:"salata",
  emoji:"🥗",cal:123,prot:2.5,carb:14.7,fat:7.4,serv:"2 porsiyon",yieldServings:2,time:15,
  tags:["salata","klasik","kış"],
  ingredients:[
    {item:"Beyaz lahana",amount:"300g"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Limon suyu",amount:"2 yk"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Sumak",amount:"1 çk"},
    {item:"Tuz",amount:""}
  ],
  steps:[
    "Lahanayı çok ince doğrayın, tuzlayıp ovun.",
    "Havucu rendeleyin.",
    "Limon, zeytinyağı ve sumakla karıştırın.",
    "10 dk dinlendirip servis edin."
  ]
},
{
  id:"r_patates_salata",name:"Patates Salatası",cat:"salata",
  emoji:"🥔",cal:236,prot:5.8,carb:29.5,fat:11.2,serv:"3 porsiyon",yieldServings:3,time:35,
  tags:["salata","klasik","piknik"],
  ingredients:[
    {item:"Patates",amount:"3 adet"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Salatalık turşusu",amount:"2 adet"},
    {item:"Yeşil soğan",amount:"3 dal"},
    {item:"Maydanoz",amount:"3 yk"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Sirke",amount:"1 yk"}
  ],
  steps:[
    "Patatesi haşlayın, soyup küp doğrayın.",
    "Yumurtayı haşlayıp doğrayın.",
    "Tüm malzemeleri kaseye alın.",
    "Zeytinyağı ve sirke ile karıştırın."
  ]
},
{
  id:"r_mevsim_salata",name:"Mevsim Salatası",cat:"salata",
  emoji:"🥗",cal:160,prot:4,carb:14,fat:11,serv:"1 porsiyon",yieldServings:1,time:10,
  tags:["salata","klasik","mevsim"],
  ingredients:[
    {item:"Marul",amount:"2 yaprak"},
    {item:"Domates",amount:"1 adet"},
    {item:"Salatalık",amount:"1 adet"},
    {item:"Biber",amount:"1 adet"},
    {item:"Mor lahana",amount:"1 avuç"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Limon",amount:"1 yk"}
  ],
  steps:[
    "Tüm sebzeleri yıkayıp doğrayın.",
    "Bir kasede karıştırın.",
    "Limon ve zeytinyağı ile sosunu yapın.",
    "Servis sırasında ekleyin."
  ]
},
{
  id:"r_karnabahar_salata",name:"Haşlanmış Karnabahar Salatası",cat:"salata",
  emoji:"🥗",cal:121,prot:4.3,carb:12.3,fat:7.7,serv:"2 porsiyon",yieldServings:2,time:25,
  tags:["salata","sebze","düşük kalori"],
  ingredients:[
    {item:"Karnabahar",amount:"1/2 baş"},
    {item:"Sarımsak",amount:"1 diş"},
    {item:"Maydanoz",amount:"3 yk"},
    {item:"Limon suyu",amount:"2 yk"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Pul biber",amount:""}
  ],
  steps:[
    "Karnabaharı çiçeklerine ayırıp 8 dk haşlayın.",
    "Süzüp soğutun.",
    "Ezilmiş sarımsak, limon, zeytinyağı ve maydanozla karıştırın.",
    "Pul biber serperek servis edin."
  ]
},

// ═══ HAMUR (10) ═══
{
  id:"r_cig_borek",name:"Çiğ Börek (Tatar)",cat:"hamur",
  emoji:"🥟",cal:340,prot:14,carb:32,fat:18,serv:"2 adet",time:75,
  tags:["hamur","börek","kızartma","tatar"],
  ingredients:[
    {item:"Un",amount:"3 bardak"},
    {item:"Su",amount:"1 bardak"},
    {item:"Tuz",amount:"1 çk"},
    {item:"Dana kıyma",amount:"200g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Maydanoz",amount:"3 yk"},
    {item:"Sıvı yağ (kızartma)",amount:"500ml"}
  ],
  steps:[
    "Un, su ve tuzla yumuşak hamur yoğurun, 30 dk dinlendirin.",
    "Bezelere ayırıp ince yuvarlak açın.",
    "Yarısına kıymalı harcı koyun, kapatın, kenarları yapıştırın.",
    "Kızgın yağda her iki yüzünü 2 dk kızartın."
  ]
},
{
  id:"r_hashasli_corek",name:"Haşhaşlı Çörek",cat:"hamur",
  emoji:"🥐",cal:280,prot:7,carb:32,fat:14,serv:"1 adet",time:120,
  tags:["hamur","kahvalti","mayalı"],
  ingredients:[
    {item:"Un",amount:"500g"},
    {item:"Maya",amount:"1 paket"},
    {item:"Süt",amount:"1 bardak"},
    {item:"Tereyağı",amount:"100g"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Şeker",amount:"1 yk"},
    {item:"Haşhaş ezmesi",amount:"3 yk"},
    {item:"Susam",amount:"2 yk"}
  ],
  steps:[
    "Un, maya, süt, yumurta ve şekerle hamur yoğurun.",
    "1 saat mayalandırın.",
    "Açıp tereyağı sürün, haşhaşı yayıp rulo sarın.",
    "Tepsiye dizin, üzerine yumurta sürüp susam serpin.",
    "180°C fırında 25 dk pişirin."
  ]
},
{
  id:"r_tahinli_corek",name:"Tahinli Çörek",cat:"hamur",
  emoji:"🥐",cal:320,prot:7,carb:38,fat:16,serv:"1 adet",time:120,
  tags:["hamur","tatlı çörek","kahvalti"],
  ingredients:[
    {item:"Un",amount:"500g"},
    {item:"Maya",amount:"1 paket"},
    {item:"Süt",amount:"1 bardak"},
    {item:"Tereyağı",amount:"50g"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Tahin",amount:"1/2 bardak"},
    {item:"Pekmez",amount:"1/2 bardak"},
    {item:"Susam",amount:"2 yk"}
  ],
  steps:[
    "Un, maya, süt, tereyağı ve yumurtayla yumuşak hamur yoğurun.",
    "1 saat mayalandırın.",
    "Açıp tahin+pekmez karışımını sürün, rulo sarın.",
    "Spiral şeklinde tepsiye yerleştirin.",
    "Yumurta sarısı sürüp susam serpin, 180°C'de 25 dk pişirin."
  ]
},
{
  id:"r_karisik_pide",name:"Karışık Pide",cat:"hamur",
  emoji:"🫓",cal:517,prot:14.4,carb:29,fat:38,serv:"4 adet",yieldServings:4,time:50,
  tags:["pide","hamur","karışık"],
  ingredients:[
    {item:"Pide hamuru",amount:"250g"},
    {item:"Sucuk",amount:"40g"},
    {item:"Kaşar rendesi",amount:"100g"},
    {item:"Yumurta",amount:"1 adet"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Maydanoz",amount:"2 yk"}
  ],
  steps:[
    "Hamuru uzun pide şeklinde açın, kenarları katlayın.",
    "İçine sucuk ve kaşarı dağıtın.",
    "220°C fırında 8 dk pişirin.",
    "Ortasına yumurta kırın, 4 dk daha pişirin.",
    "Tereyağı ve maydanozla servis edin."
  ]
},
{
  id:"r_yufkali_manti",name:"Yufkalı Mantı (Açma)",cat:"hamur",
  emoji:"🥟",cal:391,prot:21.5,carb:7.6,fat:30.6,serv:"4 porsiyon",yieldServings:4,time:60,
  tags:["manti","hamur","pratik"],
  ingredients:[
    {item:"Yufka",amount:"3 adet"},
    {item:"Dana kıyma",amount:"150g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Tereyağı",amount:"2 yk"},
    {item:"Yoğurt",amount:"150g"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Salça",amount:"1 çk"}
  ],
  steps:[
    "Kıyma, soğan ve baharatları karıştırın.",
    "Yufkayı kareler halinde kesin, harcı koyup mantı şeklinde kapatın.",
    "Tepsiye dizip 180°C'de 12 dk kavurun.",
    "Sıcak suyla haşlayıp süzün.",
    "Sarımsaklı yoğurt ve salçalı tereyağıyla servis edin."
  ]
},
{
  id:"r_kasarli_makarna",name:"Kaşarlı Makarna",cat:"hamur",
  emoji:"🍝",cal:470,prot:18.3,carb:43.5,fat:24.6,serv:"2 porsiyon",yieldServings:2,time:25,
  tags:["makarna","peynirli","pratik"],
  ingredients:[
    {item:"Penne",amount:"100g"},
    {item:"Kaşar rendesi",amount:"80g"},
    {item:"Süt",amount:"1/2 bardak"},
    {item:"Tereyağı",amount:"2 yk"},
    {item:"Un",amount:"1 yk"},
    {item:"Karabiber",amount:""}
  ],
  steps:[
    "Makarnayı haşlayın.",
    "Tereyağında unu kavurun, sütü ekleyin.",
    "Kaşarı ekleyip eritin.",
    "Makarnayı sosa katıp 2 dk pişirin."
  ]
},
{
  id:"r_kuzu_pide",name:"Kuzu Etli Pide",cat:"hamur",
  emoji:"🫓",cal:471,prot:11.6,carb:31.9,fat:33,serv:"4 adet",yieldServings:4,time:60,
  tags:["pide","hamur","et","klasik"],
  ingredients:[
    {item:"Pide hamuru",amount:"250g"},
    {item:"Kuzu kıyma",amount:"150g"},
    {item:"Soğan",amount:"1/2 adet"},
    {item:"Domates",amount:"1 adet"},
    {item:"Biber",amount:"1 adet"},
    {item:"Maydanoz",amount:"2 yk"},
    {item:"Salça",amount:"1 çk"}
  ],
  steps:[
    "Kıymayı doğranmış sebzelerle karıştırın.",
    "Hamuru pide şeklinde açın, kenarları katlayın.",
    "Üzerine harcı yayın.",
    "220°C fırında 13-15 dk pişirin."
  ]
},
{
  id:"r_yumurtali_makarna",name:"Yumurtalı Makarna",cat:"hamur",
  emoji:"🍝",cal:375,prot:17.7,carb:38,fat:16.5,serv:"2 porsiyon",yieldServings:2,time:20,
  tags:["makarna","pratik","klasik"],
  ingredients:[
    {item:"Spagetti",amount:"100g"},
    {item:"Yumurta",amount:"2 adet"},
    {item:"Kaşar",amount:"40g"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Karabiber",amount:""},
    {item:"Tuz",amount:""}
  ],
  steps:[
    "Makarnayı tuzlu suda haşlayın.",
    "Yumurtaları kaşarla çırpın.",
    "Tereyağlı tavada makarnayı 1 dk soteleyin.",
    "Ocaktan alıp yumurtayı katın (yumurta pişirmeden krema oluşur).",
    "Karabiberle servis edin."
  ]
},
{
  id:"r_firin_makarna",name:"Fırında Makarna",cat:"hamur",
  emoji:"🍝",cal:684,prot:26.5,carb:57.2,fat:38.6,serv:"2 porsiyon",yieldServings:2,time:50,
  tags:["makarna","fırın","beşamel","klasik"],
  ingredients:[
    {item:"Boru makarna",amount:"100g"},
    {item:"Tereyağı",amount:"3 yk"},
    {item:"Un",amount:"3 yk"},
    {item:"Süt",amount:"2 bardak"},
    {item:"Kaşar rendesi",amount:"100g"},
    {item:"Karabiber",amount:""}
  ],
  steps:[
    "Makarnayı haşlayın.",
    "Tereyağında unu kavurun, sütü yavaşça ekleyin (beşamel).",
    "Yarısını makarnayla karıştırın, fırın kabına alın.",
    "Üzerine kalan beşamel ve kaşarı yayın.",
    "180°C fırında 25 dk pişirin."
  ]
},
{
  id:"r_etli_makarna",name:"Etli Makarna (Türk Usulü)",cat:"hamur",
  emoji:"🍝",cal:486,prot:22.1,carb:48.4,fat:22.7,serv:"2 porsiyon",yieldServings:2,time:30,
  tags:["makarna","kıymalı","klasik"],
  ingredients:[
    {item:"Spagetti",amount:"100g"},
    {item:"Dana kıyma",amount:"120g"},
    {item:"Soğan",amount:"1 adet"},
    {item:"Salça",amount:"1 yk"},
    {item:"Domates",amount:"1 adet"},
    {item:"Tereyağı",amount:"1 yk"},
    {item:"Kaşar",amount:"30g"}
  ],
  steps:[
    "Makarnayı haşlayın.",
    "Kıymayı soğanla kavurun, salça ve domatesi ekleyin.",
    "10 dk pişirin, sos haline getirin.",
    "Makarnayı sosa katıp tereyağıyla karıştırın.",
    "Üstüne kaşar rendeleyerek servis edin."
  ]
},

// ═══ MEZE (10) ═══
{
  id:"r_yogurtlu_semizotu",name:"Yoğurtlu Semizotu",cat:"meze",
  emoji:"🌿",cal:120,prot:6,carb:8,fat:7,serv:"1 porsiyon",yieldServings:1,time:10,
  tags:["meze","yoğurtlu","yaz","saglikli"],
  ingredients:[
    {item:"Semizotu",amount:"1 demet"},
    {item:"Yoğurt",amount:"3 yk"},
    {item:"Sarımsak",amount:"1 diş"},
    {item:"Zeytinyağı",amount:"1 çk"},
    {item:"Tuz",amount:""}
  ],
  steps:[
    "Semizotunu yıkayıp ince doğrayın.",
    "Yoğurdu sarımsak ve tuzla karıştırın.",
    "Semizotunu yoğurda katın.",
    "Üstüne zeytinyağı gezdirip servis edin."
  ]
},
{
  id:"r_yogurtlu_patlican",name:"Yoğurtlu Patlıcan",cat:"meze",
  emoji:"🍆",cal:224,prot:4.6,carb:18.4,fat:16.2,serv:"2 porsiyon",yieldServings:2,time:35,
  tags:["meze","yoğurtlu","patlıcan"],
  ingredients:[
    {item:"Patlıcan",amount:"2 adet"},
    {item:"Yoğurt",amount:"1/2 bardak"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Pul biber",amount:""},
    {item:"Maydanoz",amount:"2 yk"}
  ],
  steps:[
    "Patlıcanları küp doğrayıp tuzlayın, suyunu salsın.",
    "Yıkayıp yağda kızartın.",
    "Soğutup yoğurt ve sarımsakla karıştırın.",
    "Üzerine pul biberli yağ ve maydanoz gezdirin."
  ]
},
{
  id:"r_acuka",name:"Acuka (Antep)",cat:"meze",
  emoji:"🌶️",cal:283,prot:5,carb:9,fat:27.3,serv:"4 porsiyon",yieldServings:4,time:20,
  tags:["meze","antep","acılı","cevizli"],
  ingredients:[
    {item:"Domates salçası",amount:"3 yk"},
    {item:"Biber salçası",amount:"2 yk"},
    {item:"Ceviz içi",amount:"1/2 bardak"},
    {item:"Sarımsak",amount:"3 diş"},
    {item:"Zeytinyağı",amount:"3 yk"},
    {item:"Kimyon",amount:"1 çk"},
    {item:"Pul biber",amount:"1 yk"}
  ],
  steps:[
    "Cevizi blenderda çekin.",
    "Tüm malzemeleri karıştırın.",
    "Pürüzsüz bir kıvama gelene kadar yoğurun.",
    "1 saat dinlendirip ekmekle servis edin."
  ]
},
{
  id:"r_cevizli_biber",name:"Cevizli Biber Mezesi",cat:"meze",
  emoji:"🌶️",cal:220,prot:6,carb:14,fat:16,serv:"1 porsiyon",time:25,
  tags:["meze","cevizli","közlenmiş"],
  ingredients:[
    {item:"Kırmızı biber",amount:"4 adet"},
    {item:"Ceviz içi",amount:"1/2 bardak"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Nar ekşisi",amount:"1 yk"},
    {item:"Galeta unu",amount:"1 yk"}
  ],
  steps:[
    "Biberleri közleyip soyun.",
    "Tüm malzemeleri blenderda çekin.",
    "Pürüzsüz kıvama getirin.",
    "Soğuk servis edin."
  ]
},
{
  id:"r_pirasa_salata",name:"Pırasa Salatası",cat:"meze",
  emoji:"🥬",cal:132,prot:2.9,carb:24,fat:3.7,serv:"5 porsiyon",yieldServings:5,time:25,
  tags:["meze","pırasa","kış","düşük kalori"],
  ingredients:[
    {item:"Pırasa",amount:"3 adet"},
    {item:"Havuç",amount:"1 adet"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Yoğurt",amount:"3 yk"},
    {item:"Limon suyu",amount:"1 yk"},
    {item:"Zeytinyağı",amount:"1 yk"}
  ],
  steps:[
    "Pırasayı halka, havucu rendeleyin.",
    "10 dk haşlayın, süzüp soğutun.",
    "Yoğurt+sarımsak+limon karışımıyla harmanlayın.",
    "Zeytinyağı gezdirerek servis edin."
  ]
},
{
  id:"r_lakerda",name:"Lakerda",cat:"meze",
  emoji:"🐟",cal:240,prot:24,carb:1,fat:16,serv:"1 porsiyon",time:30,
  tags:["meze","balık","klasik","raki"],
  ingredients:[
    {item:"Tuzlu lakerda",amount:"100g"},
    {item:"Soğan",amount:"1/2 adet"},
    {item:"Limon",amount:"1/2 adet"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Maydanoz",amount:"2 dal"}
  ],
  steps:[
    "Lakerdayı 30 dk soğuk suda bekletin (tuz çıksın).",
    "İnce dilimleyin.",
    "Tabağa dizin, üzerine soğan halkaları yerleştirin.",
    "Limon ve zeytinyağıyla servis edin."
  ]
},
{
  id:"r_kabak_kizartma",name:"Yoğurtlu Kabak Kızartması",cat:"meze",
  emoji:"🥒",cal:220,prot:5,carb:14,fat:16,serv:"1 porsiyon",time:25,
  tags:["meze","kabak","yoğurtlu"],
  ingredients:[
    {item:"Sakız kabağı",amount:"3 adet"},
    {item:"Yoğurt",amount:"1/2 bardak"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Sıvı yağ",amount:"3 yk"},
    {item:"Tuz",amount:""}
  ],
  steps:[
    "Kabakları yuvarlak dilimleyin, tuzlayın.",
    "Yağda her iki yüzünü kızartın, kağıt havluya alın.",
    "Yoğurdu sarımsakla karıştırın.",
    "Tabağa kabakları dizip yoğurdu üzerine gezdirin."
  ]
},
{
  id:"r_tarator",name:"Cevizli Tarator",cat:"meze",
  emoji:"🌰",cal:326,prot:6.2,carb:5.9,fat:33.1,serv:"6 porsiyon",yieldServings:6,time:15,
  tags:["meze","cevizli","sos"],
  ingredients:[
    {item:"Ceviz içi",amount:"1 bardak"},
    {item:"Bayat ekmek içi",amount:"2 dilim"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Sirke",amount:"2 yk"},
    {item:"Zeytinyağı",amount:"3 yk"},
    {item:"Su",amount:"1/2 bardak"}
  ],
  steps:[
    "Ekmek içini suda ıslatıp sıkın.",
    "Tüm malzemeleri blenderda çekin.",
    "Pürüzsüz krema kıvamına getirin.",
    "Soğuk servis edin (mezelerin yanına)."
  ]
},
{
  id:"r_otlu_peynir",name:"Otlu Peynir Salatası",cat:"meze",
  emoji:"🧀",cal:223,prot:10.4,carb:5.7,fat:18.2,serv:"2 porsiyon",yieldServings:2,time:10,
  tags:["meze","peynirli","klasik"],
  ingredients:[
    {item:"Beyaz peynir",amount:"100g"},
    {item:"Maydanoz",amount:"1/2 demet"},
    {item:"Dereotu",amount:"1/2 demet"},
    {item:"Yeşil soğan",amount:"3 dal"},
    {item:"Domates",amount:"1 adet"},
    {item:"Zeytinyağı",amount:"1 yk"},
    {item:"Pul biber",amount:""}
  ],
  steps:[
    "Peyniri çatalla ezin.",
    "İnce doğranmış otları ekleyin.",
    "Domatesi küp doğrayıp katın.",
    "Zeytinyağı ve pul biberle servis edin."
  ]
},
{
  id:"r_kuru_domates_meze",name:"Kuru Domates Mezesi",cat:"meze",
  emoji:"🍅",cal:145,prot:1.3,carb:4.3,fat:14.3,serv:"2 porsiyon",yieldServings:2,time:10,
  tags:["meze","kuru domates","akdeniz"],
  ingredients:[
    {item:"Kuru domates",amount:"100g"},
    {item:"Sarımsak",amount:"2 diş"},
    {item:"Maydanoz",amount:"1/2 demet"},
    {item:"Zeytinyağı",amount:"2 yk"},
    {item:"Pul biber",amount:""}
  ],
  steps:[
    "Kuru domatesleri sıcak suda 10 dk yumuşatın.",
    "Süzüp ince doğrayın.",
    "Ezilmiş sarımsak, maydanoz ve zeytinyağı ile karıştırın.",
    "Pul biberle servis edin."
  ]
}
];

// ══════════════════════════════════════════════════════════════════
//  TARİF FOTOĞRAFLARI — Unsplash görseller
//  ID → img URL eşleştirmesi (enrichment pattern)
// ══════════════════════════════════════════════════════════════════
(function(){
  var U="https://images.unsplash.com/photo-";
  var S="?w=600&q=80";
  var RECIPE_PHOTOS={
    "r_iskender":U+"1603360946369-dc9bb6258143"+S,
    "r_hunkar":U+"1625398407796-82650a8c135f"+S,
    "r_karniyarik":U+"1625398407796-82650a8c135f"+S,
    "r_imam_bayildi":U+"1625944228403-e25c4244a37d"+S,
    "r_etli_nohut":U+"1547592166-23ac45744acd"+S,
    "r_etli_kuru_fasulye":U+"1574484284002-952d92456975"+S,
    "r_yaprak_sarma":U+"1529006557810-274b9b2e4bcd"+S,
    "r_manti":U+"1625944525533-473f1a3d54e7"+S,
    "r_mercimek_kofte":U+"1540189549336-e6e99c3679fe"+S,
    "r_mercimek_corbasi":U+"1547592166-23ac45744acd"+S,
    "r_ezogelin":U+"1604152135912-04a022e23696"+S,
    "r_yayla":U+"1616501268209-eacc96e5a66e"+S,
    "r_tarhana":U+"1594756202469-9ff9799b2e4e"+S,
    "r_iskembe":U+"1547592166-23ac45744acd"+S,
    "r_dugun_corbasi":U+"1616501268209-eacc96e5a66e"+S,
    "r_beyran":U+"1603360946369-dc9bb6258143"+S,
    "r_fit_tavuk_izgara":U+"1546793665-c74683f339c1"+S,
    "r_fit_ton_salata":U+"1554433607-66b5efe9d304"+S,
    "r_fit_bulgur_pilavı":U+"1512621776951-a57141f2eefd"+S,
    "r_menemen":U+"1590412200988-a436970781fa"+S,
    "r_sigara_boregi":U+"1519864600265-abb23847ef2c"+S,
    "r_coban_salata":U+"1540189549336-e6e99c3679fe"+S,
    "r_makarna_soslu":U+"1563379926898-05f4575a45d8"+S,
    "r_biber_dolma":U+"1625398407796-82650a8c135f"+S,
    "r_patlican_musakka":U+"1625944228403-e25c4244a37d"+S,
    "r_zeytinyagli_fasulye":U+"1534938665420-4193efcab0b8"+S,
    "r_ispanak_yemegi":U+"1580013759032-7e8bda9b2e61"+S,
    "r_mantar_sote":U+"1504674900247-0877df9cc836"+S,
    "r_sutlac":U+"1488477181946-6428a0291777"+S,
    "r_kabak_tatlisi":U+"1508737027454-e6454ef45afd"+S,
    "r_asure":U+"1488477181946-6428a0291777"+S,
    "r_sekerpare":U+"1519676867240-f03562e64548"+S,
    "r_revani":U+"1571115177098-24ec42ed204d"+S,
    "r_kisir":U+"1540189549336-e6e99c3679fe"+S,
    "r_humus":U+"1577805947697-89e18249d767"+S,
    "r_falafel":U+"1529006557810-274b9b2e4bcd"+S,
    "r_saksuka":U+"1590412200988-a436970781fa"+S,
    "r_kasarli_tost":U+"1528736235302-52922df5c122"+S,
    "r_tavuk_durum":U+"1626700051175-6818013e1d4f"+S,
    "r_cigkofte_durum":U+"1626700051175-6818013e1d4f"+S,
    "r_gavurdagi":U+"1540189549336-e6e99c3679fe"+S,
    "r_piyaz":U+"1574484284002-952d92456975"+S,
    "r_su_boregi":U+"1519864600265-abb23847ef2c"+S,
    "r_gozleme":U+"1484723091739-30a097e8f929"+S,
    "r_kiymali_pide":U+"1484723091739-30a097e8f929"+S,
    "r_lahmacun":U+"1484723091739-30a097e8f929"+S,
    "r_haydari":U+"1572441713132-c542fc4fe282"+S,
    "r_babaganus":U+"1623428187969-5da2dcea5ebf"+S,
    "r_acili_ezme":U+"1563379926898-05f4575a45d8"+S,
    "r_atom":U+"1599487488170-d11ec9c172f0"+S,
    "r_topik":U+"1529006557810-274b9b2e4bcd"+S,
    "r_ali_nazik":U+"1625944228403-e25c4244a37d"+S,
    "r_cerkez_tavugu":U+"1546793665-c74683f339c1"+S,
    "r_tas_kebabi":U+"1603360946369-dc9bb6258143"+S,
    "r_kuzu_tandir":U+"1603360946369-dc9bb6258143"+S,
    "r_pilav_ustu_kuru":U+"1574484284002-952d92456975"+S,
    "r_icki_kofte":U+"1529006557810-274b9b2e4bcd"+S,
    "r_et_sote":U+"1603360946369-dc9bb6258143"+S,
    "r_bezelye":U+"1534938665420-4193efcab0b8"+S,
    "r_sac_kavurma":U+"1603360946369-dc9bb6258143"+S,
    "r_arnavut_cigeri":U+"1603360946369-dc9bb6258143"+S,
    "r_kofte_izgara":U+"1603360946369-dc9bb6258143"+S,
    "r_tantuni":U+"1626700051175-6818013e1d4f"+S,
    "r_fit_kinoa_salata":U+"1512621776951-a57141f2eefd"+S,
    "r_fit_balik":U+"1467003909585-2f8a72700288"+S,
    "r_fit_chia_puding":U+"1488477181946-6428a0291777"+S,
    "r_fit_yumurta_muffin":U+"1525351484163-7529414344d8"+S,
    "r_fit_yulaf_kase":U+"1567620905732-2d1ec7ab7445"+S,
    "r_fit_omlet":U+"1525351484163-7529414344d8"+S,
    "r_fit_tavuk_salata":U+"1550304943-4f24f54ddde8"+S,
    "r_fit_smoothie_bowl":U+"1567620905732-2d1ec7ab7445"+S,
    "r_patates_kizartma":U+"1518779578993-ec3579fee39f"+S,
    "r_yumurta_haslama":U+"1525351484163-7529414344d8"+S,
    "r_roka_salata":U+"1512621776951-a57141f2eefd"+S,
    "r_karışık_tost":U+"1528736235302-52922df5c122"+S,
    // ═══ Ek Popüler Yemekler (35) ═══
    "r_adana_kebap":U+"1603360946369-dc9bb6258143"+S,
    "r_urfa_kebap":U+"1603360946369-dc9bb6258143"+S,
    "r_sis_kebap":U+"1544025162-d76694265947"+S,
    "r_tavuk_sis":U+"1546793665-c74683f339c1"+S,
    "r_cag_kebabi":U+"1603360946369-dc9bb6258143"+S,
    "r_kuzu_incik":U+"1544025162-d76694265947"+S,
    "r_kuzu_pirzola":U+"1544025162-d76694265947"+S,
    "r_inegol_kofte":U+"1603360946369-dc9bb6258143"+S,
    "r_etli_kabak_dolma":U+"1625398407796-82650a8c135f"+S,
    "r_bamya":U+"1547592166-23ac45744acd"+S,
    "r_etli_turlu":U+"1574484284002-952d92456975"+S,
    "r_zeytinyagli_pirasa":U+"1534938665420-4193efcab0b8"+S,
    "r_zeytinyagli_enginar":U+"1534938665420-4193efcab0b8"+S,
    "r_barbunya_pilaki":U+"1574484284002-952d92456975"+S,
    "r_tavuklu_pilav":U+"1512621776951-a57141f2eefd"+S,
    "r_ic_pilav":U+"1512621776951-a57141f2eefd"+S,
    "r_sehriyeli_pilav":U+"1512621776951-a57141f2eefd"+S,
    "r_hamsi_tava":U+"1467003909585-2f8a72700288"+S,
    "r_balik_ekmek":U+"1528736235302-52922df5c122"+S,
    "r_kumpir":U+"1518779578993-ec3579fee39f"+S,
    "r_simit":U+"1484723091739-30a097e8f929"+S,
    "r_pogaca":U+"1484723091739-30a097e8f929"+S,
    "r_acma":U+"1484723091739-30a097e8f929"+S,
    "r_ispanakli_borek":U+"1519864600265-abb23847ef2c"+S,
    "r_baklava":U+"1571115177098-24ec42ed204d"+S,
    "r_kunefe":U+"1571115177098-24ec42ed204d"+S,
    "r_kazandibi":U+"1488477181946-6428a0291777"+S,
    "r_tavuk_gogsu":U+"1488477181946-6428a0291777"+S,
    "r_muhallebi":U+"1488477181946-6428a0291777"+S,
    "r_tulumba":U+"1519676867240-f03562e64548"+S,
    "r_lokma":U+"1519676867240-f03562e64548"+S,
    "r_irmik_helvasi":U+"1488477181946-6428a0291777"+S,
    "r_sucuklu_yumurta":U+"1525351484163-7529414344d8"+S,
    "r_muhlama":U+"1572441713132-c542fc4fe282"+S,
    "r_yesil_mercimek_salata":U+"1540189549336-e6e99c3679fe"+S,
    // ═══ Ek 2: Popüler Yemekler (35) ═══
    "r_et_doner":U+"1626700051175-6818013e1d4f"+S,
    "r_beyti_kebap":U+"1603360946369-dc9bb6258143"+S,
    "r_patlican_kebabi":U+"1625944228403-e25c4244a37d"+S,
    "r_testi_kebabi":U+"1603360946369-dc9bb6258143"+S,
    "r_cop_sis":U+"1544025162-d76694265947"+S,
    "r_kuru_dolma":U+"1529006557810-274b9b2e4bcd"+S,
    "r_izmir_kofte":U+"1603360946369-dc9bb6258143"+S,
    "r_kadinbudu_kofte":U+"1540189549336-e6e99c3679fe"+S,
    "r_dalyan_kofte":U+"1603360946369-dc9bb6258143"+S,
    "r_sulu_kofte":U+"1616501268209-eacc96e5a66e"+S,
    "r_etli_fasulye":U+"1534938665420-4193efcab0b8"+S,
    "r_tavuk_sote":U+"1546793665-c74683f339c1"+S,
    "r_mercimekli_bulgur":U+"1512621776951-a57141f2eefd"+S,
    "r_perde_pilavi":U+"1512621776951-a57141f2eefd"+S,
    "r_midye_pilavi":U+"1512621776951-a57141f2eefd"+S,
    "r_cilbir":U+"1525351484163-7529414344d8"+S,
    "r_kaygana":U+"1525351484163-7529414344d8"+S,
    "r_pastirmali_yumurta":U+"1525351484163-7529414344d8"+S,
    "r_kol_boregi":U+"1519864600265-abb23847ef2c"+S,
    "r_talas_boregi":U+"1519864600265-abb23847ef2c"+S,
    "r_patatesli_borek":U+"1519864600265-abb23847ef2c"+S,
    "r_kiymali_borek":U+"1519864600265-abb23847ef2c"+S,
    "r_kusbasili_pide":U+"1484723091739-30a097e8f929"+S,
    "r_kasarli_pide":U+"1484723091739-30a097e8f929"+S,
    "r_ramazan_pidesi":U+"1484723091739-30a097e8f929"+S,
    "r_etli_ekmek":U+"1484723091739-30a097e8f929"+S,
    "r_tepsi_mantisi":U+"1625944525533-473f1a3d54e7"+S,
    "r_cacik":U+"1572441713132-c542fc4fe282"+S,
    "r_fava":U+"1534938665420-4193efcab0b8"+S,
    "r_tabule":U+"1540189549336-e6e99c3679fe"+S,
    "r_zerde":U+"1488477181946-6428a0291777"+S,
    "r_un_kurabiyesi":U+"1519676867240-f03562e64548"+S,
    "r_cevizli_kurabiye":U+"1519676867240-f03562e64548"+S,
    "r_katmer_tatli":U+"1571115177098-24ec42ed204d"+S,
    "r_cig_kofte":U+"1540189549336-e6e99c3679fe"+S,
    // ═══ Ek 3: Sağlık Odaklı (50) ═══
    "r_fit_hindi_kofte":U+"1546793665-c74683f339c1"+S,
    "r_fit_tavuk_brokoli":U+"1546793665-c74683f339c1"+S,
    "r_fit_protein_pancake":U+"1567620905732-2d1ec7ab7445"+S,
    "r_fit_avokado_tost":U+"1525351484163-7529414344d8"+S,
    "r_fit_quinoa_bowl":U+"1512621776951-a57141f2eefd"+S,
    "r_fit_yumurta_aki_omlet":U+"1525351484163-7529414344d8"+S,
    "r_fit_skyr_bowl":U+"1488477181946-6428a0291777"+S,
    "r_fit_levrek":U+"1467003909585-2f8a72700288"+S,
    "r_fit_karides_sote":U+"1467003909585-2f8a72700288"+S,
    "r_fit_tavuk_curry":U+"1546793665-c74683f339c1"+S,
    "r_fit_buda_bowl":U+"1512621776951-a57141f2eefd"+S,
    "r_fit_kabak_dolma":U+"1625398407796-82650a8c135f"+S,
    "r_fit_cottage_salata":U+"1540189549336-e6e99c3679fe"+S,
    "r_fit_protein_smoothie":U+"1567620905732-2d1ec7ab7445"+S,
    "r_fit_yulaf_pancake":U+"1567620905732-2d1ec7ab7445"+S,
    "r_fit_tavuk_lahmacun":U+"1484723091739-30a097e8f929"+S,
    "r_fit_karnabahar_pizza":U+"1504674900247-0877df9cc836"+S,
    "r_fit_meal_prep":U+"1512621776951-a57141f2eefd"+S,
    "r_fit_kabak_spagetti":U+"1563379926898-05f4575a45d8"+S,
    "r_fit_kıymalı_sebze":U+"1574484284002-952d92456975"+S,
    "r_vegan_nohut_curry":U+"1547592166-23ac45744acd"+S,
    "r_vegan_mercimek_kori":U+"1547592166-23ac45744acd"+S,
    "r_vegan_patlican_humus":U+"1577805947697-89e18249d767"+S,
    "r_vegan_sebzeli_quinoa":U+"1512621776951-a57141f2eefd"+S,
    "r_vegan_karnabahar_pirinc":U+"1504674900247-0877df9cc836"+S,
    "r_vegan_tofu_sote":U+"1504674900247-0877df9cc836"+S,
    "r_vegan_buda_bowl":U+"1512621776951-a57141f2eefd"+S,
    "r_vegan_burger":U+"1568901346375-23c9450c58cd"+S,
    "r_vegan_avokado_tost":U+"1525351484163-7529414344d8"+S,
    "r_vegan_durum":U+"1626700051175-6818013e1d4f"+S,
    "r_vegan_karnabahar_corba":U+"1547592166-23ac45744acd"+S,
    "r_vegan_brokoli_corba":U+"1547592166-23ac45744acd"+S,
    "r_vegan_kabak_corba":U+"1547592166-23ac45744acd"+S,
    "r_vegan_chickpea_salata":U+"1540189549336-e6e99c3679fe"+S,
    "r_vegan_falafel_bowl":U+"1529006557810-274b9b2e4bcd"+S,
    "r_salata_yunan":U+"1540189549336-e6e99c3679fe"+S,
    "r_salata_karpuz_feta":U+"1540189549336-e6e99c3679fe"+S,
    "r_salata_akdeniz":U+"1540189549336-e6e99c3679fe"+S,
    "r_salata_avokado_ton":U+"1554433607-66b5efe9d304"+S,
    "r_salata_detoks":U+"1512621776951-a57141f2eefd"+S,
    "r_salata_pancar":U+"1540189549336-e6e99c3679fe"+S,
    "r_salata_bahar":U+"1512621776951-a57141f2eefd"+S,
    "r_fit_granola":U+"1488477181946-6428a0291777"+S,
    "r_fit_bademli_yulaf":U+"1567620905732-2d1ec7ab7445"+S,
    "r_fit_tahinli_yulaf":U+"1567620905732-2d1ec7ab7445"+S,
    "r_fit_berry_smoothie":U+"1567620905732-2d1ec7ab7445"+S,
    "r_fit_avokado_kase":U+"1525351484163-7529414344d8"+S,
    "r_fit_chia_meyveli":U+"1488477181946-6428a0291777"+S,
    // Batch 4 — Klasik
    "r_kuzu_guvec":U+"1603360946369-dc9bb6258143"+S,
    "r_pilav_ustu_tavuk":U+"1546793665-c74683f339c1"+S,
    "r_tavuklu_guvec":U+"1603360946369-dc9bb6258143"+S,
    "r_kuzu_kavurma":U+"1625398407796-82650a8c135f"+S,
    "r_tavuk_kavurma":U+"1546793665-c74683f339c1"+S,
    "r_karisik_izgara":U+"1603360946369-dc9bb6258143"+S,
    "r_hamsi_pilavi":U+"1554433607-66b5efe9d304"+S,
    "r_patatesli_kofte":U+"1625398407796-82650a8c135f"+S,
    "r_sebzeli_tavuk":U+"1546793665-c74683f339c1"+S,
    "r_coban_kavurma":U+"1625398407796-82650a8c135f"+S,
    "r_soslu_kofte":U+"1625398407796-82650a8c135f"+S,
    "r_karniyarik_kofte":U+"1625398407796-82650a8c135f"+S,
    "r_kiymali_mantar":U+"1625398407796-82650a8c135f"+S,
    "r_tavuk_snitzel":U+"1546793665-c74683f339c1"+S,
    "r_terbiyeli_kofte":U+"1625398407796-82650a8c135f"+S,
    "r_etli_yesil_mercimek":U+"1547592166-23ac45744acd"+S,
    "r_etli_biber_dolma_kuru":U+"1529006557810-274b9b2e4bcd"+S,
    "r_kazan_kebabi":U+"1603360946369-dc9bb6258143"+S,
    "r_sogan_yahnisi":U+"1625398407796-82650a8c135f"+S,
    // Batch 4 — Çorba
    "r_domates_corbasi":U+"1547592166-23ac45744acd"+S,
    "r_sebze_corbasi":U+"1604152135912-04a022e23696"+S,
    "r_mantar_corbasi":U+"1616501268209-eacc96e5a66e"+S,
    "r_tavuk_corbasi_kremali":U+"1616501268209-eacc96e5a66e"+S,
    "r_sehriye_corbasi":U+"1604152135912-04a022e23696"+S,
    "r_tavuk_suyu_corbasi":U+"1547592166-23ac45744acd"+S,
    "r_bezelye_corbasi":U+"1604152135912-04a022e23696"+S,
    "r_patates_corbasi":U+"1616501268209-eacc96e5a66e"+S,
    "r_lahana_corbasi":U+"1604152135912-04a022e23696"+S,
    "r_yogurt_corbasi":U+"1616501268209-eacc96e5a66e"+S,
    "r_anali_kizli":U+"1547592166-23ac45744acd"+S,
    "r_kelle_paca":U+"1547592166-23ac45744acd"+S,
    // Batch 4 — Pratik
    "r_kiymali_yumurta":U+"1590412200988-a436970781fa"+S,
    "r_yumurtali_ekmek":U+"1590412200988-a436970781fa"+S,
    "r_sebzeli_bulgur":U+"1512621776951-a57141f2eefd"+S,
    "r_domatesli_yumurta":U+"1590412200988-a436970781fa"+S,
    "r_patates_pure":U+"1567620905732-2d1ec7ab7445"+S,
    "r_ev_makarnasi":U+"1563379926898-05f4575a45d8"+S,
    "r_pirincli_bulgur":U+"1512621776951-a57141f2eefd"+S,
    "r_soganli_yumurta":U+"1590412200988-a436970781fa"+S,
    "r_mantarli_omlet":U+"1590412200988-a436970781fa"+S,
    "r_patatesli_yumurta":U+"1590412200988-a436970781fa"+S,
    "r_makarna_salata":U+"1563379926898-05f4575a45d8"+S,
    // Batch 4 — Sebze
    "r_etli_karnabahar":U+"1625944228403-e25c4244a37d"+S,
    "r_kiymali_bezelye":U+"1625944228403-e25c4244a37d"+S,
    "r_patatesli_kiyma":U+"1625398407796-82650a8c135f"+S,
    "r_etli_lahana":U+"1625944228403-e25c4244a37d"+S,
    "r_etli_pirasa":U+"1625944228403-e25c4244a37d"+S,
    "r_etli_kereviz":U+"1625944228403-e25c4244a37d"+S,
    "r_etli_patlican":U+"1625944228403-e25c4244a37d"+S,
    "r_zeytinyagli_bamya":U+"1625944228403-e25c4244a37d"+S,
    "r_patlican_basti":U+"1625944228403-e25c4244a37d"+S,
    "r_mucver":U+"1519864600265-abb23847ef2c"+S,
    "r_zeytinyagli_kabak":U+"1625944228403-e25c4244a37d"+S,
    "r_kozlenmis_patlican":U+"1540189549336-e6e99c3679fe"+S,
    "r_sebze_guvec":U+"1625944228403-e25c4244a37d"+S,
    "r_kremali_ispanak":U+"1625944228403-e25c4244a37d"+S,
    "r_lahana_sote":U+"1625944228403-e25c4244a37d"+S,
    // Batch 4 — Tatlı
    "r_sobiyet":U+"1571115177098-24ec42ed204d"+S,
    "r_havuc_dilimi":U+"1571115177098-24ec42ed204d"+S,
    "r_saray_sarmasi":U+"1571115177098-24ec42ed204d"+S,
    "r_hanim_gobegi":U+"1488477181946-6428a0291777"+S,
    "r_kalburabasti":U+"1571115177098-24ec42ed204d"+S,
    "r_ayva_tatlisi":U+"1488477181946-6428a0291777"+S,
    "r_incir_tatlisi":U+"1488477181946-6428a0291777"+S,
    "r_irmik_tatlisi":U+"1488477181946-6428a0291777"+S,
    "r_kemalpasa_tatlisi":U+"1488477181946-6428a0291777"+S,
    "r_tahin_helvasi":U+"1488477181946-6428a0291777"+S,
    "r_sutlu_nuriye":U+"1571115177098-24ec42ed204d"+S,
    "r_vezir_parmagi":U+"1488477181946-6428a0291777"+S,
    // Batch 4 — Sandviç
    "r_turk_hamburger":U+"1484723091739-30a097e8f929"+S,
    "r_sucuklu_tost":U+"1519864600265-abb23847ef2c"+S,
    "r_kumru":U+"1484723091739-30a097e8f929"+S,
    "r_kofte_ekmek":U+"1484723091739-30a097e8f929"+S,
    "r_pastirma_sandvic":U+"1484723091739-30a097e8f929"+S,
    "r_kuzu_durum":U+"1484723091739-30a097e8f929"+S,
    // Batch 4 — Salata
    "r_marul_salata":U+"1540189549336-e6e99c3679fe"+S,
    "r_beyaz_lahana_salata":U+"1540189549336-e6e99c3679fe"+S,
    "r_patates_salata":U+"1512621776951-a57141f2eefd"+S,
    "r_mevsim_salata":U+"1540189549336-e6e99c3679fe"+S,
    "r_karnabahar_salata":U+"1540189549336-e6e99c3679fe"+S,
    // Batch 4 — Hamur
    "r_cig_borek":U+"1519864600265-abb23847ef2c"+S,
    "r_hashasli_corek":U+"1484723091739-30a097e8f929"+S,
    "r_tahinli_corek":U+"1484723091739-30a097e8f929"+S,
    "r_karisik_pide":U+"1574484284002-952d92456975"+S,
    "r_yufkali_manti":U+"1625944525533-473f1a3d54e7"+S,
    "r_kasarli_makarna":U+"1563379926898-05f4575a45d8"+S,
    "r_kuzu_pide":U+"1574484284002-952d92456975"+S,
    "r_yumurtali_makarna":U+"1563379926898-05f4575a45d8"+S,
    "r_firin_makarna":U+"1563379926898-05f4575a45d8"+S,
    "r_etli_makarna":U+"1563379926898-05f4575a45d8"+S,
    // Batch 4 — Meze
    "r_yogurtlu_semizotu":U+"1540189549336-e6e99c3679fe"+S,
    "r_yogurtlu_patlican":U+"1540189549336-e6e99c3679fe"+S,
    "r_acuka":U+"1540189549336-e6e99c3679fe"+S,
    "r_cevizli_biber":U+"1540189549336-e6e99c3679fe"+S,
    "r_pirasa_salata":U+"1540189549336-e6e99c3679fe"+S,
    "r_lakerda":U+"1554433607-66b5efe9d304"+S,
    "r_kabak_kizartma":U+"1540189549336-e6e99c3679fe"+S,
    "r_tarator":U+"1540189549336-e6e99c3679fe"+S,
    "r_otlu_peynir":U+"1540189549336-e6e99c3679fe"+S,
    "r_kuru_domates_meze":U+"1540189549336-e6e99c3679fe"+S
  };

  window.TURKISH_RECIPES_DB.forEach(function(r){
    if(!r.img&&RECIPE_PHOTOS[r.id]){
      r.img=RECIPE_PHOTOS[r.id];
    }
  });
})();
