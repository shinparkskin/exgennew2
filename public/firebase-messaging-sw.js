importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCVHkC1EKFZN0WI-btAfAyj8fxRvokO-sc",
  authDomain: "momplayground-fac48.firebaseapp.com",
  projectId: "momplayground-fac48",
  storageBucket: "momplayground-fac48.firebasestorage.app",
  messagingSenderId: "280512402401",
  appId: "1:280512402401:web:2bc82f3b9005288733b8a0"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/images/logo-new.png'
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});