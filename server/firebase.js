import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCSikpCX0x6ROlcvaLe8kC1GDTVMvkVVDE',
  authDomain: 'rooted-4da8a.firebaseapp.com',
  databaseURL: 'https://rooted-4da8a-default-rtdb.firebaseio.com',
  projectId: 'rooted-4da8a',
  storageBucket: 'rooted-4da8a.appspot.com',
  messagingSenderId: '51008039459'
})

const db = firebaseApp.firestore()
db.settings({ persistence: false })
export {db}
