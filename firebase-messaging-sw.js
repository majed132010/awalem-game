// Firebase Messaging Service Worker — عوالم
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB7dxh49AS3EMjU_IbkPyJInX1Fe7DsaPA",
  authDomain: "awalem-game.firebaseapp.com",
  databaseURL: "https://awalem-game-default-rtdb.firebaseio.com",
  projectId: "awalem-game",
  storageBucket: "awalem-game.firebasestorage.app",
  messagingSenderId: "34905451178",
  appId: "1:34905451178:web:3367593469105f728afed3"
});

const messaging = firebase.messaging();

// استقبال الإشعارات عندما يكون التطبيق في الخلفية
messaging.onBackgroundMessage(payload => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || '🔥 عوالم', {
    body: body || 'لديك إشعار جديد',
    icon: icon || '/awalem-game/icon.png',
    badge: '/awalem-game/icon.png',
    dir: 'rtl',
    lang: 'ar',
    vibrate: [200, 100, 200],
    data: payload.data || {},
    actions: [
      { action: 'open', title: 'فتح اللعبة' },
      { action: 'close', title: 'إغلاق' }
    ]
  });
});

// عند الضغط على الإشعار
self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action === 'open' || !e.action) {
    e.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
        for (const client of list) {
          if (client.url.includes('awalem-game')) {
            return client.focus();
          }
        }
        return clients.openWindow('https://majed132010.github.io/awalem-game');
      })
    );
  }
});
