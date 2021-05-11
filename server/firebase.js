import firebase from 'firebase'
const {FIREBASE_API} = require('../secrets')

// generate new keys and do NOT push to GitHub
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAGpvTW7CbARKg9-Aa-59_Mi_-oVtW7f-A",
  authDomain: "rootedv2.firebaseapp.com",
  projectId: "rootedv2",
  storageBucket: "rootedv2.appspot.com",
  messagingSenderId: "849043822466",
  appId: "1:849043822466:web:cbe967ec0d7b49a77d219b",
  measurementId: "G-053YD66DZG"
})

const db = firebaseApp.firestore()
db.settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
})
db.enablePersistence()
export {db}
// module.exports = {db}
