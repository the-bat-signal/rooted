import React, {useState, useEffect} from 'react';
import {db} from '../../server/firebase'

const SingleLanguage = (props) => {
  const [language, setLanguage] = useState({})

  // remove async await
  useEffect(() => {
    const lang = async () => {
      try {
        const data = await db.collection("languages").doc('cherokee').get();
        setLanguage(data.data())
        console.log('inside useEffect of SingleLanguage')
        console.log('this is props', props)
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
    </div>
  )
}


export default SingleLanguage
