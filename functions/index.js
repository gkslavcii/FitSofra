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

    return { name, cal, prot, carb, fat, brand, serving, src: 'fatsecret' };
  }).filter(function(f) { return f.cal > 0; });

  return { foods: results };
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
