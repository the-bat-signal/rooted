import React, {useState, useEffect} from 'react';
import {db} from '../../server/firebase'

const SingleLanguage = (props) => {
  const [language, setLanguage] = useState({})
  const [vocab, setVocab] = useState({})

  // remove async await
  useEffect(() => {
    const lang = async () => {
      try {
        // grabbing language collection
        const data = await db.collection("languages").doc('cherokee').get();
        setLanguage(data.data())
        console.log('inside useEffect first time')
        //grabbing vocab collection — could a separate call be avoided with relationships?
        const vocabData = await db.collection("vocab").doc('cherokee_vocab').get();
        setVocab(vocabData.data())
        console.log('vocab!-------', vocabData.data())
      } catch (err) {
        console.log('error in SingleLanguage call-----', err)
      }
    }
    lang();
  }, [])

  return (
    <div>
      <h3>{language.name}</h3>
      <h5>Speakers: {language.speakers}</h5>
      <p>{language.description}</p>
      <p>
        Are you well?: {vocab['Are you well?']}
      </p>
    </div>
  )
}


export default SingleLanguage
