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
  // Süt ürünleri
  'whole milk':'Tam Yağlı Süt','2% fat milk':'%2 Yağlı Süt','1% fat milk':'%1 Yağlı Süt',
  'skim milk':'Yağsız Süt','milk':'Süt','yogurt':'Yoğurt','greek yogurt':'Yunan Yoğurdu',
  'plain yogurt':'Sade Yoğurt','cheese':'Peynir','cheddar cheese':'Kaşar Peyniri',
  'cream cheese':'Krem Peynir','cottage cheese':'Lor Peyniri','mozzarella':'Mozzarella Peyniri',
  'feta cheese':'Beyaz Peynir','parmesan':'Parmesan Peyniri','butter':'Tereyağı',
  'cream':'Krema','whipped cream':'Çırpılmış Krema','ice cream':'Dondurma',
  'sour cream':'Ekşi Krema','clotted cream':'Kaymak',
  // Yumurta
  'egg':'Yumurta','eggs':'Yumurta','egg white':'Yumurta Akı','egg yolk':'Yumurta Sarısı',
  'boiled egg':'Haşlanmış Yumurta','fried egg':'Sahanda Yumurta','scrambled egg':'Çırpılmış Yumurta',
  'scrambled eggs':'Çırpılmış Yumurta','omelette':'Omlet','omelet':'Omlet',
  // Etler
  'chicken':'Tavuk','chicken breast':'Tavuk Göğsü','chicken thigh':'Tavuk But',
  'chicken wing':'Tavuk Kanat','chicken leg':'Tavuk Baget','grilled chicken':'Izgara Tavuk',
  'roast chicken':'Fırın Tavuk','fried chicken':'Kızarmış Tavuk',
  'beef':'Sığır Eti','ground beef':'Kıyma','steak':'Biftek','veal':'Dana Eti',
  'lamb':'Kuzu Eti','pork':'Domuz Eti','turkey':'Hindi','duck':'Ördek',
  'meat':'Et','meatball':'Köfte','meatballs':'Köfte','liver':'Ciğer',
  'bacon':'Pastırma','ham':'Jambon','sausage':'Sosis','salami':'Salam',
  // Deniz ürünleri
  'fish':'Balık','salmon':'Somon','tuna':'Ton Balığı','shrimp':'Karides','prawn':'Karides',
  'sardine':'Sardalya','sea bass':'Levrek','trout':'Alabalık','cod':'Morina',
  'mackerel':'Uskumru','anchovy':'Hamsi','squid':'Kalamar','mussel':'Midye','crab':'Yengeç',
  // Tahıllar
  'rice':'Pirinç','white rice':'Beyaz Pirinç','brown rice':'Esmer Pirinç','cooked rice':'Pilav',
  'pasta':'Makarna','spaghetti':'Spagetti','noodle':'Erişte','noodles':'Erişte',
  'bread':'Ekmek','white bread':'Beyaz Ekmek','whole wheat bread':'Tam Buğday Ekmeği',
  'wheat':'Buğday','flour':'Un','oat':'Yulaf','oats':'Yulaf','oatmeal':'Yulaf Ezmesi',
  'cereal':'Tahıl Gevreği','granola':'Granola','muesli':'Müsli',
  'bulgur':'Bulgur','couscous':'Kuskus','quinoa':'Kinoa','barley':'Arpa','corn':'Mısır',
  'cornflakes':'Mısır Gevreği','tortilla':'Tortilla','bagel':'Simit',
  // Baklagiller
  'chickpea':'Nohut','chickpeas':'Nohut','lentil':'Mercimek','lentils':'Mercimek',
  'bean':'Fasulye','beans':'Fasulye','kidney bean':'Barbunya','kidney beans':'Barbunya',
  'black bean':'Siyah Fasulye','black beans':'Siyah Fasulye',
  'white bean':'Beyaz Fasulye','white beans':'Beyaz Fasulye',
  'green bean':'Yeşil Fasulye','green beans':'Yeşil Fasulye',
  'pea':'Bezelye','peas':'Bezelye','soybean':'Soya Fasulyesi','tofu':'Tofu',
  // Sebzeler
  'potato':'Patates','tomato':'Domates','cucumber':'Salatalık','onion':'Soğan',
  'garlic':'Sarımsak','carrot':'Havuç','pepper':'Biber','bell pepper':'Dolmalık Biber',
  'hot pepper':'Acı Biber','broccoli':'Brokoli','spinach':'Ispanak',
  'lettuce':'Marul','cabbage':'Lahana','cauliflower':'Karnabahar',
  'zucchini':'Kabak','eggplant':'Patlıcan','mushroom':'Mantar','mushrooms':'Mantar',
  'celery':'Kereviz','leek':'Pırasa','artichoke':'Enginar','okra':'Bamya',
  'radish':'Turp','beet':'Pancar','beetroot':'Pancar','asparagus':'Kuşkonmaz',
  'pumpkin':'Balkabağı','sweet potato':'Tatlı Patates','olive':'Zeytin','olives':'Zeytin',
  'avocado':'Avokado','corn on the cob':'Haşlanmış Mısır',
  // Meyveler
  'apple':'Elma','banana':'Muz','orange':'Portakal','grape':'Üzüm','grapes':'Üzüm',
  'strawberry':'Çilek','strawberries':'Çilek','watermelon':'Karpuz','melon':'Kavun',
  'peach':'Şeftali','pear':'Armut','cherry':'Kiraz','cherries':'Kiraz',
  'apricot':'Kayısı','plum':'Erik','fig':'İncir','figs':'İncir',
  'pomegranate':'Nar','pineapple':'Ananas','mango':'Mango','kiwi':'Kivi',
  'lemon':'Limon','lime':'Misket Limonu','grapefruit':'Greyfurt',
  'blackberry':'Böğürtlen','raspberry':'Ahududu','blueberry':'Yaban Mersini',
  'blueberries':'Yaban Mersini','cranberry':'Kızılcık','date':'Hurma','dates':'Hurma',
  'coconut':'Hindistan Cevizi','tangerine':'Mandalina','mandarin':'Mandalina',
  // Kuruyemişler
  'walnut':'Ceviz','walnuts':'Ceviz','almond':'Badem','almonds':'Badem',
  'hazelnut':'Fındık','hazelnuts':'Fındık','peanut':'Yer Fıstığı','peanuts':'Yer Fıstığı',
  'pistachio':'Antep Fıstığı','pistachios':'Antep Fıstığı',
  'cashew':'Kaju','cashews':'Kaju','sunflower seed':'Ay Çekirdeği',
  'sunflower seeds':'Ay Çekirdeği','pumpkin seed':'Kabak Çekirdeği',
  'pumpkin seeds':'Kabak Çekirdeği','chia seed':'Chia Tohumu','chia seeds':'Chia Tohumu',
  'flaxseed':'Keten Tohumu','sesame':'Susam','sesame seeds':'Susam',
  'mixed nuts':'Karışık Kuruyemiş','dried fruit':'Kuru Meyve',
  'raisin':'Kuru Üzüm','raisins':'Kuru Üzüm','dried apricot':'Kuru Kayısı',
  // İçecekler
  'water':'Su','tea':'Çay','green tea':'Yeşil Çay','black tea':'Siyah Çay',
  'coffee':'Kahve','espresso':'Espresso','cappuccino':'Kapuçino','latte':'Latte',
  'juice':'Meyve Suyu','orange juice':'Portakal Suyu','apple juice':'Elma Suyu',
  'lemonade':'Limonata','cola':'Kola','soda':'Soda','mineral water':'Maden Suyu',
  'smoothie':'Smoothie','milkshake':'Milkshake','hot chocolate':'Sıcak Çikolata',
  'beer':'Bira','wine':'Şarap','red wine':'Kırmızı Şarap','white wine':'Beyaz Şarap',
  // Soslar & çeşniler
  'ketchup':'Ketçap','mayonnaise':'Mayonez','mustard':'Hardal','vinegar':'Sirke',
  'soy sauce':'Soya Sosu','olive oil':'Zeytinyağı','vegetable oil':'Bitkisel Yağ',
  'sunflower oil':'Ayçiçek Yağı','coconut oil':'Hindistan Cevizi Yağı',
  'honey':'Bal','jam':'Reçel','peanut butter':'Fıstık Ezmesi','tahini':'Tahin',
  'salt':'Tuz','sugar':'Şeker','brown sugar':'Esmer Şeker','cinnamon':'Tarçın',
  'black pepper':'Karabiber','red pepper':'Kırmızı Biber','cumin':'Kimyon',
  'oregano':'Kekik','mint':'Nane','parsley':'Maydanoz','dill':'Dereotu','basil':'Fesleğen',
  // Tatlılar & atıştırmalıklar
  'chocolate':'Çikolata','dark chocolate':'Bitter Çikolata','milk chocolate':'Sütlü Çikolata',
  'white chocolate':'Beyaz Çikolata','cake':'Kek','cookie':'Kurabiye','cookies':'Kurabiye',
  'biscuit':'Bisküvi','pie':'Turta','muffin':'Muffin','croissant':'Kruvasan',
  'pancake':'Pankek','pancakes':'Pankek','waffle':'Waffle','donut':'Donut',
  'brownie':'Brownie','pudding':'Puding','custard':'Muhallebi',
  'chips':'Cips','potato chips':'Patates Cipsi','popcorn':'Patlamış Mısır',
  'cracker':'Kraker','crackers':'Kraker','pretzel':'Kraker',
  'candy':'Şekerleme','gummy':'Jelibon','marshmallow':'Marshmallow',
  // Yemekler
  'soup':'Çorba','salad':'Salata','sandwich':'Sandviç','burger':'Hamburger',
  'cheeseburger':'Çizburger','hamburger':'Hamburger','hot dog':'Sosisli Sandviç',
  'pizza':'Pizza','french fries':'Patates Kızartması','fried rice':'Kızarmış Pilav',
  'grilled':'Izgara','fried':'Kızarmış','baked':'Fırında','boiled':'Haşlanmış',
  'roasted':'Kavrulmuş','steamed':'Buharda','stew':'Yahni','wrap':'Dürüm',
  'taco':'Taco','burrito':'Burrito','sushi':'Suşi','kebab':'Kebap',
  // Sporcu & takviye
  'protein':'Protein','protein powder':'Protein Tozu','whey protein':'Whey Protein',
  'casein':'Kazein','bcaa':'BCAA','creatine':'Kreatin',
  'protein bar':'Protein Bar','energy bar':'Enerji Barı','energy drink':'Enerji İçeceği',
  // Porsiyon terimleri
  '100g':'100g','1 cup':'1 bardak','1 serving':'1 porsiyon','1 slice':'1 dilim',
  '1 piece':'1 adet','1 tbsp':'1 yemek kaşığı','1 tsp':'1 çay kaşığı',
  '1 oz':'28g','1 medium':'1 orta boy','1 large':'1 büyük','1 small':'1 küçük'
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

exports.fatSecretSearch = functions.https.onCall(async (data, context) => {
  const query = data.query;
  if (!query || query.length < 2) return { foods: [] };

  try {
    const token = await getFatSecretToken();
    const fetch = require('node-fetch');
    const url = 'https://platform.fatsecret.com/rest/server.api'
      + '?method=foods.search'
      + '&search_expression=' + encodeURIComponent(query)
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

    if (!resp.ok) {
      throw new Error('FatSecret API hatası: ' + resp.status);
    }

    return parseFatSecretResults(await resp.json());
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
