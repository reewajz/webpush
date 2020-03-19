/*
Give the service worker access to Firebase Messaging.
Note that you can only use Firebase Messaging here, other Firebase libraries are not available in the service worker.
*/
importScripts('/__/firebase/7.11.0/firebase-app.js');
importScripts('/__/firebase/7.11.0/firebase-messaging.js');
importScripts('/__/firebase/init.js');

/*
Initialize the Firebase app in the service worker by passing in the messagingSenderId.
*/
firebase.initializeApp({
    'messagingSenderId': '244208985229'
})

/*
Retrieve an instance of Firebase Messaging so that it can handle background messages.
*/
const messaging = firebase.messaging()
messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notification = JSON.parse(payload.data.notification);
    // Customize notification here
    const notificationTitle = notification.title;
    const notificationOptions = {
        body: notification.body,
        icon: notification.icon
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});