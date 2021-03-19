const {Firestore} = require('@google-cloud/firestore')

// Create a new client
const firestore = new Firestore()

async function quickstart() {
  // Obtain a document reference.
  const document = firestore.doc('posts/intro-to-firestore')

  // Enter new data into the document.
  await document.set({
    title: 'Welcome to Firestore',
    body: 'Hello World'
  })
  console.log('Entered new data into the document')

  // Update an existing document.
  await document.update({
    body: 'My first Firestore app'
  })
  console.log('Updated an existing document')

  // Read the document.
  const doc = await document.get()
  console.log('Read the document')

  // Delete the document.
  await document.delete()
  console.log('Deleted the document')
}
quickstart()
