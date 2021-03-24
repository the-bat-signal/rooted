// import React from 'react'
// import {db} from '../server/firebase'
// import {terrData} from './territoriesData'

// const {db} = require('../server/firebase')

const firebase = require('firebase') //not recomended?
const {terrData} = require('./territoriesData')

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCSikpCX0x6ROlcvaLe8kC1GDTVMvkVVDE',
  authDomain: 'rooted-4da8a.firebaseapp.com',
  databaseURL: 'https://rooted-4da8a-default-rtdb.firebaseio.com',
  projectId: 'rooted-4da8a',
  storageBucket: 'rooted-4da8a.appspot.com',
  messagingSenderId: '51008039459',
})

const db = firebaseApp.firestore()

// const addTerritory = (data) => {
//   const collection = db.collection('territories')
//   return collection.add(data)
// }

// const seedDb = async (territories) => {
//   for (let i = 0; i < territories.length; i++) {
//     let territory = territories[i]
//     let dataObj = {
//       name: territory.properties.Name,
//       slug: territory.properties.Slug,
//       description: territory.properties.description,
//       color: territory.properties.color,
//       coordinates: territory.geometry.coordinates[0].map((coord) => `${coord}`),
//       id: territory.id,
//     }

//     await collection.add(dataObj)
//   }
// }

// let newName = ''

// for (let j = 0; j < checkedName.length; j++) {
//   if (checkedName[j] === '/') {
//     newName += '; '
//   } else {
//     newName += checkedName[j]
//   }
// }
// checkedName = newName

const collection = db.collection('territories')
const territoriesData = terrData.features

// eslint-disable-next-line complexity
const seedDb = async (territories) => {
  for (let i = 0; i < territories.length; i++) {
    let territory = territories[i]
    let checkedName = territory.properties.Name || 'null'

    if (checkedName.includes('/')) {
      let reg = /\//g
      let newName = checkedName.replace(reg, '; ')
      checkedName = newName
    }

    let dataObj = {
      name: territory.properties.Name || null,
      slug: territory.properties.Slug || null,
      description: territory.properties.description || null,
      color: territory.properties.color || null,
      coordinates: territory.geometry.coordinates[0].map(
        (coord) => new firebase.firestore.GeoPoint(coord[1], coord[0])
      ),
      id: territory.id || null,
    }

    await collection.doc(checkedName).set(dataObj)
    //see docs for how to merge data if doc already exists
  }
}

async function runSeed(data) {
  console.log('seeding...')
  try {
    await seedDb(data)
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    // await db.close()
    console.log('db connection closed')
  }
}

runSeed(territoriesData)

//working on replacement for edge case <--- on
//line 39376 + 97826
//commented out lines over -180 longitude lines 74007-74014 (-182.607816)
