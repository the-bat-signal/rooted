const firebase = require('firebase') //not recomended?
const {langData} = require('./languagesData')
const {firebaseConfig} = require ('../secrets')


const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
// this is actually creating the languagesMap collection
const collection = db.collection('languagesMap')
const languagesData = langData.features

// eslint-disable-next-line complexity
const seedDb = async (languages) => {
  for (let i = 0; i < languages.length; i++) {
    let language = languages[i]
    let checkedName = language.properties.Name || 'null'

    // Firebase does not like /
    if (checkedName.includes('/')) {
      let reg = /\//g
      let newName = checkedName.replace(reg, '; ')
      checkedName = newName
    }

    let dataObj = {
      name: language.properties.Name || null,
      slug: language.properties.Slug || null,
      description: language.properties.description || null,
      color: language.properties.color || null,
      coordinates: language.geometry.coordinates[0].map(
        (coord) => new firebase.firestore.GeoPoint(coord[1], coord[0])
      ),
      id: language.id || null,
    }

    await collection.doc(checkedName).set(dataObj, {merge: true})
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
    // console.log('closing db connection')
    // await db.close()
    console.log('db seeded')
  }
}

runSeed(languagesData)
