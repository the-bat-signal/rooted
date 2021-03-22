// 'use strict'

// const db = require('../server/db')
// const {User} = require('../server/db/models')

// async function seed() {
//   await db.sync({force: true})
//   console.log('db synced!')

//   const users = await Promise.all([
//     User.create({email: 'cody@email.com', password: '123'}),
//     User.create({email: 'murphy@email.com', password: '123'})
//   ])

//   console.log(`seeded ${users.length} users`)
//   console.log(`seeded successfully`)
// }

// // We've separated the `seed` function from the `runSeed` function.
// // This way we can isolate the error handling and exit trapping.
// // The `seed` function is concerned only with modifying the database.
// async function runSeed() {
//   console.log('seeding...')
//   try {
//     await seed()
//   } catch (err) {
//     console.error(err)
//     process.exitCode = 1
//   } finally {
//     console.log('closing db connection')
//     await db.close()
//     console.log('db connection closed')
//   }
// }

// // Execute the `seed` function, IF we ran this module directly (`node seed`).
// // `Async` functions always return a promise, so we can use `catch` to handle
// // any errors that might occur inside of `seed`.
// if (module === require.main) {
//   runSeed()
// }

// // we export the seed function for testing purposes (see `./seed.spec.js`)
// module.exports = seed

// import {db} from '../server/firebase'

// db.collection('languages')
//   .doc('cherokee')
//   .set({
//     name: 'Cherokee',
//     description:
//       'Cherokee (ᏣᎳᎩ ᎦᏬᏂᎯᏍᏗ, Tsalagi Gawonihisdi [dʒalaˈɡî ɡawónihisˈdî]) is an endangered-to-moribund[a] Iroquoian language[4] and the native language of the Cherokee people.[6][7][8] Ethnologue states that there were 1,520 Cherokee speakers out of 376,000 Cherokee in 2018,[4] while a tally by the three Cherokee tribes in 2019 recorded ~2,100 speakers.[5] The number of speakers is in decline. About eight fluent speakers die each month, and only a handful of people under the age of 40 are fluent.[11] The dialect of Cherokee in Oklahoma is “definitely endangered”, and the one in North Carolina is “severely endangered” according to UNESCO.[12] The Lower dialect, formerly spoken on the South Carolina–Georgia border, has been extinct since about 1900.[13] The dire situation regarding the future of the two remaining dialects prompted the Tri-Council of Cherokee tribes to declare a state of emergency in June 2019, with a call to enhance revitalization efforts.[5]',
//     speakers: 2100,
//     coordinates: [],
//   })
//   .then(function () {
//     console.log('Document successfully written!')
//   })
//   .catch(function (error) {
//     console.error('Error writing document: ', error)
//   })
