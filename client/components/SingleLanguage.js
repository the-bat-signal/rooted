import React, {useState, useEffect} from 'react';
import {db} from '../../server/firebase'

const SingleLanguage = (props) => {
  // const [language, setLanguage] = useState({})
  // const [vocab, setVocab] = useState({})

  const language = props.location.state.language
  const vocab = props.location.state.vocab

  // remove async await
  // useEffect(() => {
  //   const lang = async () => {
  //     try {
  //       // grabbing language collection
  //       const data = await db.collection("languages").doc('cherokee').get();
  //       setLanguage(data.data())
  //       console.log('inside useEffect first time')
  //       //grabbing vocab collection — could a separate call be avoided with relationships?
  //       const vocabData = await db.collection("vocab").doc('cherokee_vocab').get();
  //       setVocab(vocabData.data())
  //       console.log('vocab!-------', vocabData.data())
  //     } catch (err) {
  //       console.log('error in SingleLanguage call-----', err)
  //     }
  //   }
  //   lang();
  // }, [])
  console.log('this is vocab-----', vocab)
  console.log('this is language------', language)
  return (
    <div>
      <h3>{language.name}</h3>
      <h5>Speakers: {language.speakers}</h5>
      <p>{language.description}</p>
      <p>
        Hello!: {vocab['Hello!']}
        < br />
        Goodbye!: {vocab['Goodbye!']}
        < br />

        How are you?: {vocab['How are you?']}
        < br />

        I am fine.: {vocab['I am fine.']}
        < br />
        My name is ___.: {vocab['My name is ___.']}
        < br />
        What is your name?: {vocab['What is your name?']}
        < br />
        Thank you.: {vocab['Thank you.']}

      </p>
    </div>
  )
}


export default SingleLanguage
