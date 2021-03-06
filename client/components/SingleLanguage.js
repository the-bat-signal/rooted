import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import CountUp from 'react-countup';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import {IoPlayCircle} from 'react-icons/io5'
import {db} from '../../server/firebase'
import Button from '@material-ui/core/Button'

//helper function
const linkRender = (links) => {
  const returnValue = []
  for (let key in links) {
     returnValue.push(<li key={key}><a href={links[key]}>{key}</a></li>)
  }
  return returnValue.map(val => {
    return val
  })
}

const SingleLanguage = (props) => {
  const [language, setLanguage] = useState({})
  const [vocab, setVocab] = useState({})

  useEffect(() => {
    const lang = async () => {
      try {
        const langRef = db.collection('languagesMap')
        const langSnapshot = await langRef.get({source: 'cache'})
        if (!langSnapshot.empty) {
          langSnapshot.forEach((doc) => {
          if (doc.data().name === props.match.params.singleLanguage) {
            setLanguage(doc.data())
          }
        })
        } else {
         const newLangSnapshot = await langRef.get({source: 'server'}) // always leave this as server
         newLangSnapshot.forEach((doc) => {
          if (doc.data().name === props.match.params.singleLanguage) {
            setLanguage(doc.data())
          }
        })
      }
        const vocabRef = db.collection('vocab')
        const vocabSnapshot = await vocabRef.get({source: 'cache'})
          if (!vocabSnapshot.empty) {
            vocabSnapshot.forEach((doc) => {
          if (doc.id.includes(props.match.params.singleLanguage.toLowerCase())) {
            setVocab(doc.data())
          }
        });
      } else {
         const newVocabSnapshot = await vocabRef.get({source: 'server'}) // always leave this as server
         newVocabSnapshot.forEach((doc) => {
          if (doc.id.includes(props.match.params.singleLanguage.toLowerCase())) {
            setVocab(doc.data())
          }
        });
      }
      } catch (err) {
        console.log('error in SingleLanguage call-----', err)
      }
    }
    lang()
  }, [])

  //
  let links = []

  // PRONUNCIATION GUIDE SOURCES
  const pronunciationSources = [
    'http://www.thudscave.com/petroglyphs/pdf/dakota-pronounce.pdf', // Dakota
    'http://www.native-languages.org/navajo_guide.htm', // Din?? Bizaad
    'https://rmc.library.cornell.edu/pdf/MoheganDictionary.pdf', // Mohegan
  ]
  // HELPER FUNCTION FOR SOURCING
  const sourceLinker = (language) => {
    const splitLang = language.pronunciation.split('; ')
    return splitLang.map(sound => {
      if (language.name === 'Dakota') {
        if (splitLang[0] === sound) {
          return <h4 key={sound}><a href={`${pronunciationSources[0]}`}>{sound}</a></h4>
        }
      } else if (language.name === 'Din?? Bizaad') {
        if (splitLang[0] === sound) {
          return <h4 key={sound}><a href={`${pronunciationSources[1]}`}>{sound}</a></h4>
        }
      } else if (language.name === 'Mohegan') {
        if (splitLang[0] === sound) {
          return <h4 key={sound}><a href={`${pronunciationSources[2]}`}>{sound}</a></h4>
        }
      }
      return <li key={sound}>{sound}</li>
    })
  }

  // helper function for Audio
  const playAudio = (vocab, language) => {
    new Audio(`/audio/${language.name}_vocab/${vocab}.mp3`).play()
  }

  return (
    <div className="single-language-wrapper">

      <div className="column-left">

        <div id="single-language__header">
          <div id='counterContainer'>
            <h1 id='singleLangName'> {language.name} </h1>
            <h4 id='singleLangSubhead'> By learning this language, you are adding to a community of this many speakers!: </h4>
              {language.speakers ?  <CountUp className="speakersAnimate" start={0} end={language.speakers} duration={2.5} separator="," /> : null}
              <p id="language-description">
                {language.description}
              </p>
          {/* </div> */}

          <div id="single-language__vocab">
              <Table id="single-language__vocab__table" bordered >
                <tbody>
                  <tr id="column-names-row">
                    <th scope="col"> Audio </th>
                    <th scope="col"> English </th>
                    <th scope="col"> {language.name} </th>
                  </tr>
                  <tr className="single-vocab-row">
                    <th>
                      <button id='audio-button' onClick={() => playAudio('hello', language)}><IoPlayCircle/></button>
                      </th>
                    <td> Hello! </td>
                    <td> {vocab['Hello!']} </td>
                  </tr>
                  <tr className="single-vocab-row">
                    <th> <button id='audio-button' onClick={() => playAudio('how-are-you', language)}><IoPlayCircle/></button> </th>
                    <td> How are you? </td>
                    <td> {vocab['How are you?']} </td>
                  </tr>
                  <tr className="single-vocab-row">
                    <th scope="audio"> <button id='audio-button' onClick={() => playAudio('i-am-fine', language)}><IoPlayCircle/></button> </th>
                    <td> I am fine. </td>
                    <td> {vocab['I am fine.']} </td>
                  </tr>
                  <tr className="single-vocab-row">
                    <th scope="audio"> <button id='audio-button' onClick={() => playAudio('what-name', language)}><IoPlayCircle/></button> </th>
                    <td> What is your name? </td>
                    <td> {vocab['What is your name?']} </td>
                  </tr>
                  <tr className="single-vocab-row">
                    <th scope="audio"> <button id='audio-button' onClick={() => playAudio('my-name', language)}><IoPlayCircle/></button> </th>
                    <td> My name is ___. </td>
                    <td> {vocab['My name is ___.']} </td>
                  </tr>
                  <tr className="single-vocab-row">
                    <th scope="audio"> <button id='audio-button' onClick={() => playAudio('thank-you', language)}><IoPlayCircle/></button> </th>
                    <td> Thank you. </td>
                    <td> {vocab['Thank you.']} </td>
                  </tr>
                  <tr className="single-vocab-row">
                    <th scope="audio"> <button id='audio-button' onClick={() => playAudio('bye', language)}><IoPlayCircle/></button> </th>
                    <td> Goodbye! </td>
                    <td> {vocab['Goodbye!']} </td>
                  </tr>

                </tbody>
              </Table>

              <br />

              <Link to={{
                pathname: `/language/${language.name}/practice`,
                state: {
                  vocab,
                }
              }}>
                <Button className='startPageButton' >
                  Try practicing!
                </Button>
              </Link>

              <br />

              <p>
                Here are some more useful links, including resources for further language-learning and links to current nations/communities to whom this language belongs:
              </p>
            <ul id='info-links'>
              {language.links ? linkRender(language.links) : <p>Links coming soon!</p>}
            </ul>
          </div>
        </div>
     </div>
       </div>

      <div className="column-right">
          <div id="single-language__pronunciation-guide">
            <ul id="single-language__pronunciation-summary">
            {language.pronunciation ?
              <div> {sourceLinker(language)} </div>
              : <div> Pronunciation guide coming soon! </div>
             }
            </ul>
          </div>
        </div>

    </div>
  )
}


export default SingleLanguage
