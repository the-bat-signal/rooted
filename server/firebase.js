import firebase from 'firebase'
const {FIREBASE_API} = require('../secrets')

const firebaseApp = firebase.initializeApp({
  apiKey: FIREBASE_API,
  authDomain: 'rooted-4da8a.firebaseapp.com',
  databaseURL: 'https://rooted-4da8a-default-rtdb.firebaseio.com',
  projectId: 'rooted-4da8a',
  storageBucket: 'rooted-4da8a.appspot.com',
  messagingSenderId: '51008039459',
})

const db = firebaseApp.firestore()
db.settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
})
db.enablePersistence()
export {db}
// module.exports = {db}
