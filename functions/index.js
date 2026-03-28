// Firebase Cloud Functions — functions/index.js
// FitSofra — FatSecret API Proxy + FCM Push Bildirimi
//
// DEPLOY:
//   cd functions
//   npm install
//   firebase deploy --only functions
//
// GEREKLİ PAKETLER (package.json'da zaten tanımlı):
//   firebase-functions, firebase-admin, node-fetch@2

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// ═══════════════════════════════════════════
//  FATSECRET API PROXY
// ═══════════════════════════════════════════
// Tarayıcıdan doğrudan FatSecret API'ye erişilemez (CORS).
// Bu function proxy görevi görür:
//   1. Credentials → Firestore config/fatsecret'tan okunur
//   2. Token → Sunucu tarafında alınır ve cache'lenir
//   3. Arama → FatSecret API'ye yapılır, sonuçlar parse edilip döner

let _fsToken = null;
let _fsTokenExpiry = 0;

async function getFatSecretToken() {
  // Cache'deki token hâlâ geçerliyse kullan
  if (_fsToken && Date.now() < _fsTokenExpiry - 60000) return _fsToken;

  // Firestore'dan credentials oku
  const doc = await admin.firestore().collection('config').doc('fatsecret').get();
  if (!doc.exists) throw new Error('FatSecret credentials bulunamadı. Admin panelinden Client ID ve Secret girin.');
  const { clientId, clientSecret } = doc.data();
  if (!clientId || !clientSecret) throw new Error('Client ID veya Client Secret eksik.');

  // Token al
  const fetch = require('node-fetch');
  const resp = await fetch('https://oauth.fatsecret.com/connect/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials&scope=basic'
      + '&client_id=' + encodeURIComponent(clientId)
      + '&client_secret=' + encodeURIComponent(clientSecret)
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error('FatSecret token hatası (' + resp.status + '): ' + errText.substring(0, 200));
  }

  const data = await resp.json();
  _fsToken = data.access_token;
  _fsTokenExpiry = Date.now() + (data.expires_in || 86400) * 1000;
  return _fsToken;
}

function parseFatSecretResults(data) {
  const foods = data && data.foods && data.foods.food;
  if (!foods) return { foods: [] };
  const arr = Array.isArray(foods) ? foods : [foods];

  const results = arr.map(function(f) {
    const desc = f.food_description || '';
    let cal = 0, prot = 0, carb = 0, fat = 0, serving = '';

    // "Per 100g - Calories: 52kcal | Fat: 0.17g | Carbs: 13.81g | Protein: 0.26g"
    const pm = desc.match(/^Per\s+(.+?)\s*-/i);
    if (pm) serving = pm[1];
    const cm = desc.match(/Calories:\s*([\d.]+)/i);
    const fm = desc.match(/Fat:\s*([\d.]+)/i);
    const cbm = desc.match(/Carbs:\s*([\d.]+)/i);
    const prm = desc.match(/Protein:\s*([\d.]+)/i);
    if (cm) cal = Math.round(parseFloat(cm[1]));
    if (fm) fat = Math.round(parseFloat(fm[1]));
    if (cbm) carb = Math.round(parseFloat(cbm[1]));
    if (prm) prot = Math.round(parseFloat(prm[1]));

    const brand = f.brand_name || '';
    let name = f.food_name || '';
    if (brand && !name.toLowerCase().includes(brand.toLowerCase())) {
      name = brand + ' ' + name;
    }

    // İngilizce → Türkçe çeviri
    name = translateToTurkish(name);

    return { name, cal, prot, carb, fat, brand, serving, src: 'fatsecret' };
  }).filter(function(f) { return f.cal > 0; });

  return { foods: results };
}

// İngilizce → Türkçe yemek çeviri sözlüğü
const EN_TR = {
  // ══ SÜT ÜRÜNLERİ ══
  'whole milk':'Tam Yağlı Süt','2% fat milk':'%2 Yağlı Süt','1% fat milk':'%1 Yağlı Süt',
  'skim milk':'Yağsız Süt','milk':'Süt','low fat milk':'Az Yağlı Süt',
  'chocolate milk':'Çikolatalı Süt','condensed milk':'Yoğunlaştırılmış Süt',
  'evaporated milk':'Buharlaştırılmış Süt','powdered milk':'Süt Tozu','buttermilk':'Ayran',
  'goat milk':'Keçi Sütü','almond milk':'Badem Sütü','soy milk':'Soya Sütü',
  'oat milk':'Yulaf Sütü','coconut milk':'Hindistan Cevizi Sütü','rice milk':'Pirinç Sütü',
  'yogurt':'Yoğurt','greek yogurt':'Süzme Yoğurt','plain yogurt':'Sade Yoğurt',
  'fruit yogurt':'Meyveli Yoğurt','low fat yogurt':'Light Yoğurt','kefir':'Kefir',
  'cheese':'Peynir','cheddar cheese':'Kaşar Peyniri','cheddar':'Kaşar',
  'cream cheese':'Krem Peynir','cottage cheese':'Lor Peyniri','mozzarella':'Mozzarella',
  'feta cheese':'Beyaz Peynir','feta':'Beyaz Peynir','parmesan':'Parmesan',
  'gouda':'Gouda Peyniri','brie':'Brie Peyniri','swiss cheese':'İsviçre Peyniri',
  'ricotta':'Ricotta','goat cheese':'Keçi Peyniri','string cheese':'Çubuk Peynir',
  'butter':'Tereyağı','unsalted butter':'Tuzsuz Tereyağı','salted butter':'Tuzlu Tereyağı',
  'margarine':'Margarin','ghee':'Sadeyağ',
  'cream':'Krema','heavy cream':'Yoğun Krema','whipped cream':'Çırpılmış Krema',
  'sour cream':'Ekşi Krema','clotted cream':'Kaymak','half and half':'Yarım Krema',
  'ice cream':'Dondurma','vanilla ice cream':'Vanilyalı Dondurma',
  'chocolate ice cream':'Çikolatalı Dondurma','frozen yogurt':'Dondurulmuş Yoğurt',

  // ══ YUMURTA ══
  'egg':'Yumurta','eggs':'Yumurta','egg white':'Yumurta Akı','egg yolk':'Yumurta Sarısı',
  'boiled egg':'Haşlanmış Yumurta','hard boiled egg':'Katı Haşlanmış Yumurta',
  'soft boiled egg':'Rafadan Yumurta','fried egg':'Sahanda Yumurta',
  'scrambled egg':'Çırpılmış Yumurta','scrambled eggs':'Çırpılmış Yumurta',
  'poached egg':'Poşe Yumurta','omelette':'Omlet','omelet':'Omlet',
  'quiche':'Kiş','egg salad':'Yumurta Salatası',

  // ══ ETLER ══
  'chicken':'Tavuk','chicken breast':'Tavuk Göğsü','chicken thigh':'Tavuk But',
  'chicken wing':'Tavuk Kanat','chicken wings':'Tavuk Kanat','chicken leg':'Tavuk Baget',
  'chicken tender':'Tavuk Şinitzel','chicken tenders':'Tavuk Şinitzel',
  'chicken nugget':'Tavuk Nugget','chicken nuggets':'Tavuk Nugget',
  'grilled chicken':'Izgara Tavuk','roast chicken':'Fırın Tavuk',
  'fried chicken':'Kızarmış Tavuk','rotisserie chicken':'Çevirme Tavuk',
  'chicken soup':'Tavuk Çorbası','chicken salad':'Tavuk Salatası',
  'chicken sandwich':'Tavuklu Sandviç','chicken wrap':'Tavuk Dürüm',
  'beef':'Sığır Eti','ground beef':'Kıyma','lean ground beef':'Yağsız Kıyma',
  'steak':'Biftek','sirloin':'Bonfile','ribeye':'Antrikot','t-bone':'T-Bone Biftek',
  'filet mignon':'Fileto','tenderloin':'Bonfile','roast beef':'Rozbif',
  'beef stew':'Et Yahni','beef jerky':'Et Kurusu','corned beef':'Konserve Et',
  'veal':'Dana Eti','veal chop':'Dana Pirzola','lamb':'Kuzu Eti',
  'lamb chop':'Kuzu Pirzola','lamb shank':'Kuzu İncik','rack of lamb':'Kuzu Kaburga',
  'pork':'Domuz Eti','pork chop':'Domuz Pirzola','pork loin':'Domuz Bonfile',
  'turkey':'Hindi','turkey breast':'Hindi Göğsü','ground turkey':'Hindi Kıyması',
  'duck':'Ördek','duck breast':'Ördek Göğsü','goose':'Kaz',
  'meat':'Et','meatball':'Köfte','meatballs':'Köfte','meatloaf':'Etli Börek',
  'liver':'Ciğer','kidney':'Böbrek','tongue':'Dil','heart':'Yürek',
  'bacon':'Pastırma','ham':'Jambon','sausage':'Sosis','salami':'Salam',
  'pepperoni':'Sucuk','hot dog':'Sosisli','bratwurst':'Alman Sosisi',
  'prosciutto':'Prosciutto','chorizo':'Chorizo',
  'patty':'Köfte','burger patty':'Hamburger Köftesi',

  // ══ DENİZ ÜRÜNLERİ ══
  'fish':'Balık','salmon':'Somon','smoked salmon':'Füme Somon',
  'tuna':'Ton Balığı','canned tuna':'Konserve Ton','tuna salad':'Ton Balığı Salatası',
  'shrimp':'Karides','prawn':'Karides','grilled shrimp':'Izgara Karides',
  'sardine':'Sardalya','sardines':'Sardalya','sea bass':'Levrek',
  'trout':'Alabalık','cod':'Morina','tilapia':'Tilapya',
  'mackerel':'Uskumru','anchovy':'Hamsi','anchovies':'Hamsi',
  'squid':'Kalamar','calamari':'Kalamar','octopus':'Ahtapot',
  'mussel':'Midye','mussels':'Midye','clam':'İstiridye','oyster':'İstiridye',
  'crab':'Yengeç','crab meat':'Yengeç Eti','lobster':'Istakoz',
  'fish fillet':'Balık Fileto','fish stick':'Balık Parmak','fish sticks':'Balık Parmak',
  'swordfish':'Kılıç Balığı','halibut':'Dil Balığı','catfish':'Yayın Balığı',
  'herring':'Ringa','pike':'Turna Balığı',

  // ══ TAHILLAR & EKMEK ══
  'rice':'Pirinç','white rice':'Beyaz Pirinç','brown rice':'Esmer Pirinç',
  'cooked rice':'Pilav','steamed rice':'Buharda Pirinç','fried rice':'Kızarmış Pilav',
  'wild rice':'Yabani Pirinç','basmati rice':'Basmati Pirinç','jasmine rice':'Yasemin Pirinç',
  'risotto':'Risotto','rice pudding':'Sütlaç',
  'pasta':'Makarna','spaghetti':'Spagetti','penne':'Penne','macaroni':'Makarna',
  'fettuccine':'Fettuccine','lasagna':'Lazanya','ravioli':'Ravioli',
  'noodle':'Erişte','noodles':'Erişte','ramen':'Ramen','egg noodles':'Yumurtalı Erişte',
  'bread':'Ekmek','white bread':'Beyaz Ekmek','whole wheat bread':'Tam Buğday Ekmeği',
  'whole grain bread':'Tam Tahıl Ekmeği','rye bread':'Çavdar Ekmeği',
  'sourdough':'Ekşi Maya Ekmeği','pita':'Pide Ekmeği','pita bread':'Pide Ekmeği',
  'flatbread':'Yufka','naan':'Naan Ekmeği','baguette':'Baget','ciabatta':'Ciabatta',
  'toast':'Tost','french toast':'Yumurtalı Ekmek',
  'wheat':'Buğday','flour':'Un','all purpose flour':'Genel Amaçlı Un',
  'whole wheat flour':'Tam Buğday Unu','corn flour':'Mısır Unu','rice flour':'Pirinç Unu',
  'oat':'Yulaf','oats':'Yulaf','oatmeal':'Yulaf Ezmesi','rolled oats':'Yulaf Ezmesi',
  'cereal':'Tahıl Gevreği','granola':'Granola','muesli':'Müsli',
  'bulgur':'Bulgur','couscous':'Kuskus','quinoa':'Kinoa','barley':'Arpa',
  'corn':'Mısır','cornflakes':'Mısır Gevreği','cornmeal':'Mısır Unu',
  'tortilla':'Tortilla','bagel':'Simit','pretzel':'Halka Kraker',
  'crouton':'Kruton','breadcrumbs':'Galeta Unu','semolina':'İrmik',

  // ══ BAKLAGİLLER ══
  'chickpea':'Nohut','chickpeas':'Nohut','hummus':'Humus',
  'lentil':'Mercimek','lentils':'Mercimek','red lentil':'Kırmızı Mercimek',
  'green lentil':'Yeşil Mercimek','lentil soup':'Mercimek Çorbası',
  'bean':'Fasulye','beans':'Fasulye','kidney bean':'Barbunya','kidney beans':'Barbunya',
  'black bean':'Siyah Fasulye','black beans':'Siyah Fasulye',
  'white bean':'Beyaz Fasulye','white beans':'Beyaz Fasulye',
  'navy bean':'Kuru Fasulye','navy beans':'Kuru Fasulye',
  'lima bean':'Lima Fasulyesi','pinto bean':'Pinto Fasulye',
  'green bean':'Yeşil Fasulye','green beans':'Yeşil Fasulye',
  'edamame':'Edamame','fava bean':'Bakla','fava beans':'Bakla',
  'pea':'Bezelye','peas':'Bezelye','split pea':'Yarma Bezelye',
  'snap pea':'Şeker Bezelyesi','snow pea':'Kar Bezelyesi',
  'soybean':'Soya Fasulyesi','soybeans':'Soya Fasulyesi','tofu':'Tofu',
  'tempeh':'Tempeh','soy protein':'Soya Proteini',

  // ══ SEBZELER ══
  'potato':'Patates','potatoes':'Patates','baked potato':'Fırında Patates',
  'mashed potato':'Patates Püresi','mashed potatoes':'Patates Püresi',
  'french fries':'Patates Kızartması','fries':'Patates Kızartması',
  'hash brown':'Patates Kızartması','sweet potato':'Tatlı Patates',
  'tomato':'Domates','tomatoes':'Domates','cherry tomato':'Cherry Domates',
  'sun dried tomato':'Kuru Domates','tomato sauce':'Domates Sosu',
  'tomato paste':'Salça','tomato soup':'Domates Çorbası',
  'cucumber':'Salatalık','pickle':'Turşu','pickles':'Turşu','gherkin':'Kornişon',
  'onion':'Soğan','red onion':'Kırmızı Soğan','green onion':'Yeşil Soğan',
  'spring onion':'Taze Soğan','shallot':'Arpacık Soğanı','scallion':'Yeşil Soğan',
  'garlic':'Sarımsak','garlic bread':'Sarımsaklı Ekmek',
  'carrot':'Havuç','carrots':'Havuç','baby carrot':'Bebek Havuç',
  'pepper':'Biber','bell pepper':'Dolmalık Biber','green pepper':'Yeşil Biber',
  'red pepper':'Kırmızı Biber','hot pepper':'Acı Biber','chili pepper':'Acı Biber',
  'jalapeno':'Jalapeno','cayenne':'Pul Biber',
  'broccoli':'Brokoli','spinach':'Ispanak','kale':'Kara Lahana',
  'lettuce':'Marul','romaine lettuce':'Kıvırcık Marul','iceberg lettuce':'Göbek Marul',
  'arugula':'Roka','cabbage':'Lahana','red cabbage':'Kırmızı Lahana',
  'brussels sprout':'Brüksel Lahanası','brussels sprouts':'Brüksel Lahanası',
  'cauliflower':'Karnabahar','zucchini':'Kabak','squash':'Kabak',
  'butternut squash':'Bal Kabağı','acorn squash':'Meşe Palamut Kabağı',
  'eggplant':'Patlıcan','mushroom':'Mantar','mushrooms':'Mantar',
  'portobello':'Portobello Mantar','shiitake':'Shiitake Mantar',
  'celery':'Kereviz','leek':'Pırasa','artichoke':'Enginar','okra':'Bamya',
  'radish':'Turp','turnip':'Şalgam','beet':'Pancar','beetroot':'Pancar',
  'asparagus':'Kuşkonmaz','pumpkin':'Balkabağı',
  'olive':'Zeytin','olives':'Zeytin','black olive':'Siyah Zeytin','green olive':'Yeşil Zeytin',
  'avocado':'Avokado','corn on the cob':'Haşlanmış Mısır',
  'watercress':'Su Teresi','endive':'Hindiba','fennel':'Rezene',
  'ginger':'Zencefil','turmeric':'Zerdeçal','horseradish':'Yaban Turpu',
  'seaweed':'Deniz Yosunu','bean sprouts':'Fasulye Filizi',
  'coleslaw':'Lahana Salatası','mixed vegetables':'Karışık Sebze',

  // ══ MEYVELER ══
  'apple':'Elma','green apple':'Yeşil Elma','red apple':'Kırmızı Elma',
  'banana':'Muz','orange':'Portakal','grape':'Üzüm','grapes':'Üzüm',
  'red grape':'Kırmızı Üzüm','green grape':'Yeşil Üzüm',
  'strawberry':'Çilek','strawberries':'Çilek','watermelon':'Karpuz','melon':'Kavun',
  'cantaloupe':'Kavun','honeydew':'Bal Kavunu',
  'peach':'Şeftali','nectarine':'Nektarin','pear':'Armut',
  'cherry':'Kiraz','cherries':'Kiraz','sour cherry':'Vişne',
  'apricot':'Kayısı','plum':'Erik','fig':'İncir','figs':'İncir',
  'pomegranate':'Nar','pineapple':'Ananas','mango':'Mango','papaya':'Papaya',
  'kiwi':'Kivi','kiwi fruit':'Kivi','passion fruit':'Çarkıfelek',
  'dragon fruit':'Ejderha Meyvesi','star fruit':'Yıldız Meyvesi',
  'guava':'Guava','lychee':'Liçi','persimmon':'Cennet Hurması',
  'lemon':'Limon','lime':'Misket Limonu','grapefruit':'Greyfurt',
  'tangerine':'Mandalina','mandarin':'Mandalina','clementine':'Klementina',
  'blackberry':'Böğürtlen','blackberries':'Böğürtlen',
  'raspberry':'Ahududu','raspberries':'Ahududu',
  'blueberry':'Yaban Mersini','blueberries':'Yaban Mersini',
  'cranberry':'Kızılcık','cranberries':'Kızılcık',
  'date':'Hurma','dates':'Hurma','coconut':'Hindistan Cevizi',
  'dried fruit':'Kuru Meyve','raisin':'Kuru Üzüm','raisins':'Kuru Üzüm',
  'dried apricot':'Kuru Kayısı','dried fig':'Kuru İncir','prune':'Kuru Erik',
  'fruit salad':'Meyve Salatası','mixed berries':'Karışık Meyve',
  'applesauce':'Elma Püresi','plantain':'Muz (Pişirmelik)',

  // ══ KURUYEMİŞLER & TOHUMLAR ══
  'walnut':'Ceviz','walnuts':'Ceviz','almond':'Badem','almonds':'Badem',
  'hazelnut':'Fındık','hazelnuts':'Fındık','peanut':'Yer Fıstığı','peanuts':'Yer Fıstığı',
  'pistachio':'Antep Fıstığı','pistachios':'Antep Fıstığı',
  'cashew':'Kaju','cashews':'Kaju','macadamia':'Makademya',
  'pecan':'Pekan Cevizi','pecans':'Pekan Cevizi','brazil nut':'Brezilya Cevizi',
  'pine nut':'Çam Fıstığı','pine nuts':'Çam Fıstığı',
  'sunflower seed':'Ay Çekirdeği','sunflower seeds':'Ay Çekirdeği',
  'pumpkin seed':'Kabak Çekirdeği','pumpkin seeds':'Kabak Çekirdeği',
  'chia seed':'Chia Tohumu','chia seeds':'Chia Tohumu',
  'flaxseed':'Keten Tohumu','flax seeds':'Keten Tohumu',
  'hemp seed':'Kenevir Tohumu','hemp seeds':'Kenevir Tohumu',
  'sesame':'Susam','sesame seeds':'Susam',
  'mixed nuts':'Karışık Kuruyemiş','trail mix':'Karışık Kuruyemiş',
  'nut butter':'Fıstık Ezmesi','almond butter':'Badem Ezmesi',

  // ══ İÇECEKLER ══
  'water':'Su','sparkling water':'Maden Suyu','mineral water':'Maden Suyu',
  'tea':'Çay','green tea':'Yeşil Çay','black tea':'Siyah Çay',
  'herbal tea':'Bitki Çayı','chamomile tea':'Papatya Çayı','iced tea':'Buzlu Çay',
  'coffee':'Kahve','black coffee':'Sade Kahve','turkish coffee':'Türk Kahvesi',
  'espresso':'Espresso','cappuccino':'Kapuçino','latte':'Latte',
  'americano':'Amerikano','mocha':'Mocha','macchiato':'Macchiato',
  'iced coffee':'Buzlu Kahve','cold brew':'Soğuk Demleme Kahve',
  'juice':'Meyve Suyu','orange juice':'Portakal Suyu','apple juice':'Elma Suyu',
  'grape juice':'Üzüm Suyu','tomato juice':'Domates Suyu',
  'cranberry juice':'Kızılcık Suyu','pomegranate juice':'Nar Suyu',
  'carrot juice':'Havuç Suyu','lemon juice':'Limon Suyu',
  'lemonade':'Limonata','cola':'Kola','soda':'Soda','tonic water':'Tonik',
  'ginger ale':'Zencefilli Soda','energy drink':'Enerji İçeceği',
  'smoothie':'Smoothie','milkshake':'Milkshake','hot chocolate':'Sıcak Çikolata',
  'beer':'Bira','wine':'Şarap','red wine':'Kırmızı Şarap','white wine':'Beyaz Şarap',
  'champagne':'Şampanya','vodka':'Votka','whiskey':'Viski','rum':'Rom','gin':'Cin',
  'tequila':'Tekila','cocktail':'Kokteyl',

  // ══ SOSLAR & ÇEŞNİLER ══
  'ketchup':'Ketçap','mayonnaise':'Mayonez','mayo':'Mayonez',
  'mustard':'Hardal','vinegar':'Sirke','balsamic vinegar':'Balzamik Sirke',
  'soy sauce':'Soya Sosu','hot sauce':'Acı Sos','bbq sauce':'Barbekü Sosu',
  'teriyaki sauce':'Teriyaki Sosu','ranch':'Ranch Sos',
  'salsa':'Salsa','guacamole':'Guacamole','pesto':'Pesto',
  'olive oil':'Zeytinyağı','extra virgin olive oil':'Sızma Zeytinyağı',
  'vegetable oil':'Bitkisel Yağ','canola oil':'Kanola Yağı',
  'sunflower oil':'Ayçiçek Yağı','coconut oil':'Hindistan Cevizi Yağı',
  'sesame oil':'Susam Yağı','avocado oil':'Avokado Yağı',
  'honey':'Bal','maple syrup':'Akçaağaç Şurubu','molasses':'Pekmez',
  'jam':'Reçel','marmalade':'Marmelat','jelly':'Jöle',
  'peanut butter':'Fıstık Ezmesi','nutella':'Nutella','tahini':'Tahin',
  'salt':'Tuz','sea salt':'Deniz Tuzu','sugar':'Şeker',
  'brown sugar':'Esmer Şeker','powdered sugar':'Pudra Şekeri',
  'artificial sweetener':'Yapay Tatlandırıcı','stevia':'Stevia',
  'cinnamon':'Tarçın','black pepper':'Karabiber','white pepper':'Beyaz Biber',
  'red pepper flakes':'Pul Biber','paprika':'Kırmızı Toz Biber',
  'cumin':'Kimyon','oregano':'Kekik','thyme':'Kekik','rosemary':'Biberiye',
  'mint':'Nane','parsley':'Maydanoz','dill':'Dereotu','basil':'Fesleğen',
  'cilantro':'Kişniş','coriander':'Kişniş','bay leaf':'Defne Yaprağı',
  'clove':'Karanfil','nutmeg':'Muskat','cardamom':'Kakule','saffron':'Safran',
  'vanilla':'Vanilya','vanilla extract':'Vanilya Özütü',
  'baking powder':'Kabartma Tozu','baking soda':'Karbonat','yeast':'Maya',
  'cocoa powder':'Kakao Tozu','gelatin':'Jelatin','starch':'Nişasta',
  'corn starch':'Mısır Nişastası',

  // ══ TATLILAR & ATIŞTIRMALIKLAR ══
  'chocolate':'Çikolata','dark chocolate':'Bitter Çikolata',
  'milk chocolate':'Sütlü Çikolata','white chocolate':'Beyaz Çikolata',
  'chocolate bar':'Çikolata Bar','chocolate chip':'Çikolata Parçası',
  'cake':'Kek','cheesecake':'Cheesecake','carrot cake':'Havuçlu Kek',
  'chocolate cake':'Çikolatalı Kek','pound cake':'Kek','sponge cake':'Pandispanya',
  'cookie':'Kurabiye','cookies':'Kurabiye','chocolate chip cookie':'Çikolatalı Kurabiye',
  'biscuit':'Bisküvi','shortbread':'Tereyağlı Kurabiye',
  'pie':'Turta','apple pie':'Elmalı Turta','pumpkin pie':'Balkabaklı Turta',
  'muffin':'Muffin','cupcake':'Cupcake','scone':'Scone',
  'croissant':'Kruvasan','danish':'Daniş','eclair':'Ekler','profiterole':'Profiterol',
  'pancake':'Pankek','pancakes':'Pankek','crepe':'Krep',
  'waffle':'Waffle','donut':'Donut','doughnut':'Donut',
  'brownie':'Brownie','tiramisu':'Tiramisu','mousse':'Mus',
  'pudding':'Puding','custard':'Muhallebi','flan':'Krem Karamel',
  'creme brulee':'Krem Brüle','panna cotta':'Panna Cotta',
  'baklava':'Baklava','halva':'Helva','turkish delight':'Lokum',
  'rice pudding':'Sütlaç','semolina pudding':'İrmik Helvası',
  'chips':'Cips','potato chips':'Patates Cipsi','tortilla chips':'Tortilla Cipsi',
  'popcorn':'Patlamış Mısır','pretzel':'Kraker',
  'cracker':'Kraker','crackers':'Kraker','rice cake':'Pirinç Patlağı',
  'candy':'Şekerleme','gummy':'Jelibon','gummy bears':'Jelibon',
  'marshmallow':'Marshmallow','caramel':'Karamel',
  'granola bar':'Granola Bar','cereal bar':'Tahıl Barı',
  'fruit snack':'Meyve Atıştırmalığı','dried mango':'Kuru Mango',

  // ══ YEMEKLER & FAST FOOD ══
  'soup':'Çorba','chicken soup':'Tavuk Çorbası','tomato soup':'Domates Çorbası',
  'vegetable soup':'Sebze Çorbası','mushroom soup':'Mantar Çorbası',
  'clam chowder':'İstiridye Çorbası','minestrone':'Minestrone',
  'salad':'Salata','caesar salad':'Sezar Salatası','greek salad':'Yunan Salatası',
  'garden salad':'Mevsim Salatası','tuna salad':'Ton Balığı Salatası',
  'pasta salad':'Makarna Salatası','potato salad':'Patates Salatası',
  'sandwich':'Sandviç','club sandwich':'Kulüp Sandviç','grilled cheese':'Tost',
  'blt':'BLT Sandviç','sub':'Uzun Sandviç',
  'burger':'Hamburger','cheeseburger':'Çizburger','hamburger':'Hamburger',
  'veggie burger':'Vejetaryen Burger',
  'hot dog':'Sosisli Sandviç','corn dog':'Sosisli Mısır',
  'pizza':'Pizza','pepperoni pizza':'Sucuklu Pizza','margherita':'Margarita Pizza',
  'calzone':'Calzone',
  'taco':'Taco','burrito':'Burrito','quesadilla':'Kesadiya',
  'enchilada':'Enchilada','nachos':'Nachos','fajita':'Fajita',
  'sushi':'Suşi','sashimi':'Sashimi','tempura':'Tempura',
  'pad thai':'Pad Thai','fried rice':'Kızarmış Pilav',
  'stir fry':'Sote','curry':'Köri','tikka masala':'Tikka Masala',
  'kebab':'Kebap','doner':'Döner','gyro':'Döner','shawarma':'Şaverma',
  'falafel':'Falafel','spring roll':'Sigara Böreği',
  'dumpling':'Mantı','dim sum':'Dim Sum','wonton':'Manti',
  'fish and chips':'Balık ve Patates','fish taco':'Balıklı Taco',
  'mac and cheese':'Peynirli Makarna','grilled cheese sandwich':'Tost',
  'french toast':'Yumurtalı Ekmek','eggs benedict':'Benedict Yumurta',
  'stew':'Yahni','casserole':'Güveç','pot roast':'Tencere Kebabı',
  'meatloaf':'Köfte','lasagna':'Lazanya','shepherd\'s pie':'Kıymalı Patates',
  'fried chicken sandwich':'Tavuklu Sandviç',

  // ══ PİŞİRME YÖNTEMLERİ ══
  'grilled':'Izgara','fried':'Kızarmış','deep fried':'Derin Yağda Kızarmış',
  'baked':'Fırında','roasted':'Kavrulmuş','boiled':'Haşlanmış',
  'steamed':'Buharda','sauteed':'Sote','poached':'Poşe',
  'smoked':'Füme','raw':'Çiğ','fresh':'Taze','frozen':'Dondurulmuş',
  'canned':'Konserve','dried':'Kurutulmuş','pickled':'Turşu',
  'marinated':'Marine','stuffed':'Doldurulmuş','breaded':'Galeta Unlu',
  'glazed':'Glazürlü','braised':'Güveçte',

  // ══ SPORCU & TAKVİYE ══
  'protein':'Protein','protein powder':'Protein Tozu','whey protein':'Whey Protein',
  'whey':'Whey','casein':'Kazein','isolate':'İzolat',
  'bcaa':'BCAA','creatine':'Kreatin','glutamine':'Glutamin',
  'pre workout':'Pre-Workout','post workout':'Post-Workout',
  'protein bar':'Protein Bar','energy bar':'Enerji Barı',
  'protein shake':'Protein Shake','mass gainer':'Kilo Aldırıcı',
  'fish oil':'Balık Yağı','omega 3':'Omega 3','multivitamin':'Multivitamin',
  'vitamin c':'C Vitamini','vitamin d':'D Vitamini','vitamin b12':'B12 Vitamini',
  'iron':'Demir','calcium':'Kalsiyum','magnesium':'Magnezyum','zinc':'Çinko',
  'collagen':'Kolajen','fiber supplement':'Lif Takviyesi',
  'electrolyte':'Elektrolit','amino acid':'Amino Asit',

  // ══ PORSİYON TERİMLERİ ══
  '100g':'100g','1 cup':'1 bardak','1 serving':'1 porsiyon','1 slice':'1 dilim',
  '1 piece':'1 adet','1 tbsp':'1 yemek kaşığı','1 tsp':'1 çay kaşığı',
  '1 oz':'28g','1 medium':'1 orta boy','1 large':'1 büyük','1 small':'1 küçük',
  '100ml':'100ml','1 can':'1 kutu','1 bottle':'1 şişe','1 packet':'1 paket',
  '1 bar':'1 bar','1 scoop':'1 ölçek','per serving':'porsiyon başına'
};

function translateToTurkish(name) {
  const lower = name.toLowerCase().trim();
  
  // 1. Tam eşleşme
  if (EN_TR[lower]) return EN_TR[lower];
  
  // 2. Marka + yemek ismi: "Danone Yogurt" → "Danone Yoğurt"
  let translated = name;
  // Uzun eşleşmelerden kısaya doğru dene (greedy match)
  const sortedKeys = Object.keys(EN_TR).sort((a, b) => b.length - a.length);
  for (const en of sortedKeys) {
    const regex = new RegExp('\\b' + en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
    if (regex.test(translated)) {
      translated = translated.replace(regex, EN_TR[en]);
    }
  }
  
  return translated;
}

// Türkçe → İngilizce arama sözlüğü
const TR_EN = {
  // ══ SÜT & KAHVALTI ══
  'süt':'milk','tam yağlı süt':'whole milk','yağsız süt':'skim milk','az yağlı süt':'low fat milk',
  'çikolatalı süt':'chocolate milk','badem sütü':'almond milk','soya sütü':'soy milk',
  'yulaf sütü':'oat milk','keçi sütü':'goat milk','süt tozu':'powdered milk',
  'yoğurt':'yogurt','süzme yoğurt':'greek yogurt','meyveli yoğurt':'fruit yogurt',
  'kefir':'kefir','ayran':'buttermilk',
  'peynir':'cheese','beyaz peynir':'feta cheese','kaşar':'cheddar','kaşar peyniri':'cheddar cheese',
  'lor':'cottage cheese','lor peyniri':'cottage cheese','krem peynir':'cream cheese',
  'tulum peyniri':'feta cheese','ezine peyniri':'feta cheese','dil peyniri':'string cheese',
  'çökelek':'cottage cheese','mozzarella':'mozzarella',
  'yumurta':'egg','haşlanmış yumurta':'boiled egg','sahanda yumurta':'fried egg',
  'çırpılmış yumurta':'scrambled eggs','omlet':'omelette','menemen':'scrambled eggs',
  'rafadan yumurta':'soft boiled egg','yumurta akı':'egg white','yumurta sarısı':'egg yolk',
  'tereyağı':'butter','margarin':'margarine','sadeyağ':'ghee',
  'bal':'honey','reçel':'jam','pekmez':'molasses','tahin':'tahini',
  'kaymak':'clotted cream','krema':'cream',
  'ekmek':'bread','tost':'toast','simit':'bagel','poğaça':'pastry',
  'açma':'croissant','pide':'pita bread','bazlama':'flatbread','yufka':'flatbread',

  // ══ ETLER ══
  'tavuk':'chicken','tavuk göğsü':'chicken breast','tavuk but':'chicken thigh',
  'tavuk kanat':'chicken wing','tavuk baget':'chicken leg',
  'izgara tavuk':'grilled chicken','fırın tavuk':'roast chicken',
  'kızarmış tavuk':'fried chicken','tavuk şinitzel':'chicken tender',
  'tavuk nugget':'chicken nuggets','çevirme tavuk':'rotisserie chicken',
  'et':'meat','kıyma':'ground beef','yağsız kıyma':'lean ground beef',
  'biftek':'steak','bonfile':'sirloin','antrikot':'ribeye',
  'kuşbaşı':'beef stew','kuşbaşı et':'beef stew meat',
  'dana':'veal','dana eti':'veal','dana pirzola':'veal chop',
  'kuzu':'lamb','kuzu eti':'lamb','kuzu pirzola':'lamb chop',
  'kuzu incik':'lamb shank','kuzu kaburga':'rack of lamb',
  'hindi':'turkey','hindi göğsü':'turkey breast','hindi kıyması':'ground turkey',
  'ördek':'duck','kaz':'goose','bıldırcın':'quail',
  'köfte':'meatball','köfteler':'meatballs','kasap köfte':'burger patty',
  'sucuk':'pepperoni','pastırma':'bacon','salam':'salami',
  'sosis':'sausage','jambon':'ham','kavurma':'roasted meat',
  'ciğer':'liver','arnavut ciğeri':'fried liver','böbrek':'kidney',
  'kırmızı et':'red meat','beyaz et':'white meat',

  // ══ DENİZ ÜRÜNLERİ ══
  'balık':'fish','somon':'salmon','füme somon':'smoked salmon',
  'ton':'tuna','ton balığı':'tuna','konserve ton':'canned tuna',
  'levrek':'sea bass','alabalık':'trout','hamsi':'anchovy',
  'sardalya':'sardine','uskumru':'mackerel','palamut':'bonito',
  'çipura':'sea bream','mezgit':'whiting','istavrit':'horse mackerel',
  'lüfer':'bluefish','kefal':'mullet','kılıç balığı':'swordfish',
  'karides':'shrimp','kalamar':'calamari','ahtapot':'octopus',
  'midye':'mussel','istakoz':'lobster','yengeç':'crab',
  'istiridye':'oyster','karidesli':'shrimp',
  'balık fileto':'fish fillet','balık parmak':'fish sticks',

  // ══ SEBZELER ══
  'patates':'potato','patates kızartması':'french fries','patates püresi':'mashed potatoes',
  'fırında patates':'baked potato','tatlı patates':'sweet potato',
  'domates':'tomato','salça':'tomato paste','domates sosu':'tomato sauce',
  'salatalık':'cucumber','turşu':'pickle','kornişon':'gherkin',
  'soğan':'onion','kırmızı soğan':'red onion','yeşil soğan':'green onion',
  'taze soğan':'spring onion','arpacık soğanı':'shallot',
  'sarımsak':'garlic','havuç':'carrot','biber':'pepper',
  'dolmalık biber':'bell pepper','yeşil biber':'green pepper','acı biber':'hot pepper',
  'brokoli':'broccoli','ıspanak':'spinach','marul':'lettuce',
  'roka':'arugula','lahana':'cabbage','kara lahana':'kale',
  'karnabahar':'cauliflower','kabak':'zucchini','patlıcan':'eggplant',
  'mantar':'mushroom','kereviz':'celery','pırasa':'leek',
  'enginar':'artichoke','bamya':'okra','turp':'radish','şalgam':'turnip',
  'pancar':'beet','kuşkonmaz':'asparagus','balkabağı':'pumpkin',
  'zeytin':'olive','siyah zeytin':'black olive','yeşil zeytin':'green olive',
  'avokado':'avocado','mısır':'corn','bezelye':'pea',
  'bakla':'fava bean','semizotu':'purslane','pazı':'chard',
  'tere':'watercress','maydanoz':'parsley','dereotu':'dill',
  'nane':'mint','roka':'arugula','rezene':'fennel',
  'zencefil':'ginger','zerdeçal':'turmeric',
  'karışık sebze':'mixed vegetables',

  // ══ MEYVELER ══
  'elma':'apple','yeşil elma':'green apple','muz':'banana',
  'portakal':'orange','üzüm':'grape','çilek':'strawberry',
  'karpuz':'watermelon','kavun':'melon','şeftali':'peach',
  'armut':'pear','kiraz':'cherry','vişne':'sour cherry',
  'kayısı':'apricot','erik':'plum','incir':'fig',
  'nar':'pomegranate','ananas':'pineapple','mango':'mango',
  'kivi':'kiwi','limon':'lemon','greyfurt':'grapefruit',
  'mandalina':'tangerine','böğürtlen':'blackberry','ahududu':'raspberry',
  'yaban mersini':'blueberry','kızılcık':'cranberry',
  'hurma':'date','hindistan cevizi':'coconut',
  'kuru üzüm':'raisin','kuru kayısı':'dried apricot',
  'kuru incir':'dried fig','kuru erik':'prune','kuru meyve':'dried fruit',
  'meyve salatası':'fruit salad','papaya':'papaya',

  // ══ KURUYEMİŞLER ══
  'ceviz':'walnut','badem':'almond','fındık':'hazelnut',
  'fıstık':'peanut','yer fıstığı':'peanut',
  'antep fıstığı':'pistachio','kaju':'cashew',
  'çam fıstığı':'pine nut','pekan':'pecan',
  'ay çekirdeği':'sunflower seed','kabak çekirdeği':'pumpkin seed',
  'chia tohumu':'chia seed','keten tohumu':'flaxseed',
  'susam':'sesame','kenevir tohumu':'hemp seed',
  'karışık kuruyemiş':'mixed nuts','fıstık ezmesi':'peanut butter',
  'badem ezmesi':'almond butter',

  // ══ BAKLAGİLLER ══
  'nohut':'chickpea','mercimek':'lentil','kırmızı mercimek':'red lentil',
  'yeşil mercimek':'green lentil','fasulye':'bean','kuru fasulye':'navy bean',
  'barbunya':'kidney bean','siyah fasulye':'black bean',
  'beyaz fasulye':'white bean','yeşil fasulye':'green bean',
  'börülce':'black eyed pea','soya':'soybean','tofu':'tofu',
  'humus':'hummus',

  // ══ PİLAV & MAKARNA ══
  'pilav':'cooked rice','pirinç':'rice','bulgur':'bulgur',
  'makarna':'pasta','spagetti':'spaghetti','erişte':'noodles',
  'lazanya':'lasagna','kuskus':'couscous','kinoa':'quinoa',
  'nohutlu pilav':'chickpea rice','bulgur pilavı':'bulgur pilaf',
  'sütlaç':'rice pudding','irmik':'semolina',

  // ══ ÇORBALAR ══
  'çorba':'soup','mercimek çorbası':'lentil soup','tavuk çorbası':'chicken soup',
  'domates çorbası':'tomato soup','sebze çorbası':'vegetable soup',
  'mantar çorbası':'mushroom soup','yayla çorbası':'yogurt soup',
  'işkembe çorbası':'tripe soup','tarhana çorbası':'tarhana soup',
  'ezogelin çorbası':'red lentil soup','şehriye çorbası':'noodle soup',
  'paça çorbası':'trotter soup','düğün çorbası':'wedding soup',
  'kremalı mantar çorbası':'cream of mushroom soup',

  // ══ TÜRK YEMEKLERİ ══
  'döner':'doner','kebap':'kebab','adana kebap':'adana kebab',
  'urfa kebap':'urfa kebab','iskender':'iskender kebab',
  'lahmacun':'lahmacun','pide':'pide','etli ekmek':'meat bread',
  'börek':'borek','sigara böreği':'spring roll','su böreği':'borek',
  'gözleme':'gozleme','mantı':'dumpling','sarma':'stuffed grape leaves',
  'dolma':'stuffed vegetables','yaprak sarma':'stuffed grape leaves',
  'biber dolması':'stuffed pepper','karnıyarık':'stuffed eggplant',
  'imam bayıldı':'braised eggplant','hünkar beğendi':'sultan\'s delight',
  'kuru fasulye yemeği':'white bean stew','nohut yemeği':'chickpea stew',
  'etli nohut':'chickpea with meat','türlü':'mixed vegetable stew',
  'güveç':'casserole','sote':'stir fry','kavurma':'roasted meat',
  'çiğ köfte':'raw meatball','içli köfte':'stuffed meatball',
  'tantuni':'tantuni','kokoreç':'kokorec','midye dolma':'stuffed mussels',
  'kumpir':'stuffed baked potato','tost':'grilled cheese sandwich',
  'dürüm':'wrap','tavuk dürüm':'chicken wrap',
  'mercimek köftesi':'lentil patty','kisir':'bulgur salad',
  'cacık':'tzatziki','haydari':'thick yogurt dip','acılı ezme':'spicy paste',
  'patlıcan salatası':'eggplant salad','çoban salatası':'shepherd salad',
  'gavurdağı salatası':'walnut salad',

  // ══ TATLILAR ══
  'baklava':'baklava','künefe':'kunefe','kadayıf':'kadayif',
  'helva':'halva','lokum':'turkish delight','revani':'revani',
  'tulumba':'tulumba','şekerpare':'sekerpare','lokma':'lokma',
  'aşure':'ashure','güllaç':'gullac','keşkül':'keskul',
  'muhallebi':'custard','kazandibi':'caramelized milk pudding',
  'tavuk göğsü tatlısı':'chicken breast pudding','profiterol':'profiterole',
  'supangle':'chocolate pudding','trileçe':'tres leches',
  'çikolata':'chocolate','dondurma':'ice cream','kek':'cake',
  'kurabiye':'cookie','bisküvi':'biscuit','kruvasan':'croissant',
  'pankek':'pancake','waffle':'waffle','krep':'crepe',

  // ══ İÇECEKLER ══
  'çay':'tea','yeşil çay':'green tea','siyah çay':'black tea',
  'bitki çayı':'herbal tea','papatya çayı':'chamomile tea',
  'kahve':'coffee','türk kahvesi':'turkish coffee','espresso':'espresso',
  'latte':'latte','kapuçino':'cappuccino','amerikano':'americano',
  'buzlu kahve':'iced coffee','filtre kahve':'drip coffee',
  'su':'water','maden suyu':'mineral water','soda':'soda',
  'kola':'cola','limonata':'lemonade','ayran':'buttermilk',
  'şalgam suyu':'turnip juice','boza':'boza','sahlep':'salep',
  'meyve suyu':'juice','portakal suyu':'orange juice',
  'nar suyu':'pomegranate juice','havuç suyu':'carrot juice',
  'smoothie':'smoothie','enerji içeceği':'energy drink',
  'bira':'beer','şarap':'wine','rakı':'raki',

  // ══ SOSLAR & BAHARATlar ══
  'ketçap':'ketchup','mayonez':'mayonnaise','hardal':'mustard',
  'sirke':'vinegar','soya sosu':'soy sauce','acı sos':'hot sauce',
  'zeytinyağı':'olive oil','sızma zeytinyağı':'extra virgin olive oil',
  'ayçiçek yağı':'sunflower oil','tereyağı':'butter',
  'tuz':'salt','şeker':'sugar','karabiber':'black pepper',
  'pul biber':'red pepper flakes','kimyon':'cumin','kekik':'oregano',
  'tarçın':'cinnamon','nane':'mint','maydanoz':'parsley',
  'dereotu':'dill','fesleğen':'basil','biberiye':'rosemary',
  'kişniş':'coriander','defne yaprağı':'bay leaf',
  'safran':'saffron','kakule':'cardamom','karanfil':'clove',
  'muskat':'nutmeg','vanilya':'vanilla','kakao':'cocoa powder',

  // ══ HAMUR İŞLERİ ══
  'un':'flour','galeta unu':'breadcrumbs','nişasta':'starch',
  'kabartma tozu':'baking powder','maya':'yeast','karbonat':'baking soda',
  'yufka':'flatbread','milföy':'puff pastry',

  // ══ SPORCU & TAKVİYE ══
  'protein':'protein','protein tozu':'protein powder','whey':'whey protein',
  'kreatin':'creatine','bcaa':'bcaa','glutamin':'glutamine',
  'protein bar':'protein bar','enerji barı':'energy bar',
  'balık yağı':'fish oil','omega 3':'omega 3',
  'multivitamin':'multivitamin','c vitamini':'vitamin c',
  'd vitamini':'vitamin d','demir':'iron','kalsiyum':'calcium',
  'magnezyum':'magnesium','çinko':'zinc','kolajen':'collagen',
  'kilo aldırıcı':'mass gainer','amino asit':'amino acid'
};

exports.fatSecretSearch = functions.https.onCall(async (data, context) => {
  const query = data.query;
  if (!query || query.length < 2) return { foods: [] };

  // Türkçe → İngilizce çeviri
  const ql = query.toLowerCase().trim();
  let searchTerms = [];
  
  // Tam eşleşme
  if (TR_EN[ql]) {
    searchTerms.push(TR_EN[ql]);
  }
  
  // Kısmi eşleşme — sorgu içinde Türkçe kelime var mı?
  if (!searchTerms.length) {
    const sortedKeys = Object.keys(TR_EN).sort((a, b) => b.length - a.length);
    for (const tr of sortedKeys) {
      if (ql.includes(tr)) {
        searchTerms.push(ql.replace(tr, TR_EN[tr]));
        break;
      }
    }
  }
  
  // Orijinal sorguyu da ekle (İngilizce olabilir)
  searchTerms.push(query);

  try {
    const token = await getFatSecretToken();
    const fetch = require('node-fetch');
    let allFoods = [];
    const existingNames = new Set();

    for (const term of searchTerms) {
      if (allFoods.length >= 15) break;
      
      const url = 'https://platform.fatsecret.com/rest/server.api'
        + '?method=foods.search'
        + '&search_expression=' + encodeURIComponent(term)
        + '&format=json&max_results=20&page_number=0';

      let resp = await fetch(url, {
        headers: { 'Authorization': 'Bearer ' + token }
      });

      // Token expired → retry
      if (!resp.ok && resp.status === 401) {
        _fsToken = null;
        _fsTokenExpiry = 0;
        const newToken = await getFatSecretToken();
        resp = await fetch(url, {
          headers: { 'Authorization': 'Bearer ' + newToken }
        });
      }

      if (resp.ok) {
        const jsonData = await resp.json();
        console.log('FatSecret term:', term, 'response:', JSON.stringify(jsonData).substring(0, 200));
        const parsed = parseFatSecretResults(jsonData);
        if (parsed.foods) {
          for (const f of parsed.foods) {
            const key = f.name.toLowerCase();
            if (!existingNames.has(key)) {
              allFoods.push(f);
              existingNames.add(key);
            }
          }
        }
      }
    }

    return { foods: allFoods.slice(0, 20) };
  } catch (e) {
    console.error('FatSecret error:', e);
    throw new functions.https.HttpsError('internal', e.message);
  }
});


// ═══════════════════════════════════════════
//  FCM PUSH BİLDİRİMİ
// ═══════════════════════════════════════════

exports.sendPushToAll = functions.https.onCall(async (data, context) => {
  // Sadece admin erişimi
  const adminDoc = await admin.firestore().collection('settings').doc('admins').get();
  const ADMIN_UIDS = adminDoc.exists ? (adminDoc.data().uids || []) : [];
  if (!context.auth || !ADMIN_UIDS.includes(context.auth.uid)) {
    throw new functions.https.HttpsError('permission-denied', 'Admin yetkisi gerekli');
  }

  const { title, body, type } = data;

  // Tüm FCM tokenlarını topla
  const snapshot = await admin.firestore().collection('users')
    .where('fcmToken', '!=', null)
    .get();

  const tokens = [];
  snapshot.forEach(doc => {
    const token = doc.data().fcmToken;
    if (token) tokens.push(token);
  });

  if (!tokens.length) return { sent: 0, failed: 0, total: 0 };

  // FCM multicast — 500'er chunk
  const chunkSize = 500;
  let sent = 0, failed = 0;

  for (let i = 0; i < tokens.length; i += chunkSize) {
    const chunk = tokens.slice(i, i + chunkSize);
    const message = {
      notification: { title, body },
      data: { type: type || 'general', title, body },
      tokens: chunk,
      webpush: {
        notification: {
          icon: 'https://fitsofra-51176.web.app/icon-192.png',
          badge: 'https://fitsofra-51176.web.app/badge-72.png',
          requireInteraction: false,
        },
        fcmOptions: { link: 'https://fitsofra-51176.web.app' }
      }
    };

    const result = await admin.messaging().sendEachForMulticast(message);
    sent += result.successCount;
    failed += result.failureCount;

    // Başarısız tokenları temizle
    result.responses.forEach((resp, idx) => {
      if (!resp.success && resp.error &&
        (resp.error.code === 'messaging/invalid-registration-token' ||
         resp.error.code === 'messaging/registration-token-not-registered')) {
        admin.firestore().collection('users')
          .where('fcmToken', '==', chunk[idx])
          .get()
          .then(snap => {
            snap.forEach(doc => doc.ref.update({ fcmToken: null }));
          });
      }
    });
  }

  // Gönderim kaydı
  await admin.firestore().collection('settings').doc('notifications').set({
    messages: admin.firestore.FieldValue.arrayUnion({
      title, body, type, timestamp: Date.now(),
      sent, failed, method: 'fcm'
    })
  }, { merge: true });

  return { sent, failed, total: tokens.length };
});
