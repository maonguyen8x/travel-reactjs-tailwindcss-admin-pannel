importScripts('https://www.gstatic.com/firebasejs/7.17.2/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.17.2/firebase-messaging.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyCoatFe4cw-ONRIwmC-_HvCDBtt3JlajQs',
  authDomain: 'jgooooo-dev.firebaseapp.com',
  databaseURL: 'https://jgooooo-dev.firebaseio.com',
  projectId: 'jgooooo-dev',
  storageBucket: 'jgooooo-dev.appspot.com',
  messagingSenderId: '625427593193',
  appId: '1:625427593193:web:4a45ae63a825d3a5dcbd78',
  measurementId: 'G-3B310C9ZDE',
});

const messaging = firebase.messaging();
