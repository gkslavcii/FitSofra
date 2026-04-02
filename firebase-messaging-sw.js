// Firebase Messaging Service Worker — FitSofra
// Bu dosya repo'nun ROOT dizininde olmalı (index.html ile aynı yerde)

importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');
importScripts('firebase-config.js');

firebase.initializeApp(FITSOFRA_FIREBASE_CONFIG);
const messaging = firebase.messaging();

// Arka planda gelen bildirimleri yakala
messaging.onBackgroundMessage(function(payload) {
  console.log('[SW] Arka plan bildirimi:', payload);
  
  var notificationTitle = (payload.notification && payload.notification.title) || 'FitSofra';
  var notificationOptions = {
    body: (payload.notification && payload.notification.body) || '',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23ff6b3d" width="100" height="100" rx="20"/><text x="50" y="68" text-anchor="middle" font-size="55">🥗</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><rect fill="%23ff6b3d" width="72" height="72" rx="16"/><text x="36" y="52" text-anchor="middle" font-size="40" fill="white">🍽</text></svg>',
    tag: 'fitsofra-' + Date.now(),
    data: payload.data || {}
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Bildirime tıklandığında uygulamayı aç
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  var targetUrl = './';
  if (event.notification.data && event.notification.data.tab) {
    targetUrl = './?tab=' + event.notification.data.tab;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // Zaten açık pencere varsa onu öne getir
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url.includes('FitSofra') && 'focus' in client) {
          client.postMessage({ type: 'NOTIFICATION_CLICK', data: event.notification.data });
          return client.focus();
        }
      }
      // Yoksa yeni pencere aç
      return clients.openWindow(targetUrl);
    })
  );
});
