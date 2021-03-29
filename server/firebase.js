import firebase from 'firebase'
const {firebaseAPI} = require('../secrets')

const firebaseApp = firebase.initializeApp({
  apiKey: firebaseAPI,
  authDomain: 'rooted-4da8a.firebaseapp.com',
  databaseURL: 'https://rooted-4da8a-default-rtdb.firebaseio.com',
  projectId: 'rooted-4da8a',
  storageBucket: 'rooted-4da8a.appspot.com',
  messagingSenderId: '51008039459',
})

const db = firebaseApp.firestore()
export {db}
// module.exports = {db}
