import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import CountUp from 'react-countup';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../public/src';
import {IoPlayCircle} from 'react-icons/io5'
import {db} from '../../server/firebase'

const SingleLanguage = (props) => {


  const [language, setLanguage] = useState({})
  const [vocab, setVocab] = useState({})

  useEffect(() => {
    console.log('this is PROPS from SingleLanguages useEffect', props)
    const lang = async () => {
      try {
        const langRef = db.collection('languagesMap')
        const langSnapshot = await langRef.get({source: 'server'})
        langSnapshot.forEach((doc) => {
          if (doc.data().name === props.match.params.singleLanguage) {
            setLanguage(doc.data())
          }
        })
        // console.log('inside useEffect of PopupBox')
        const vocabRef = db.collection('vocab')
        const vocabSnapshot = await vocabRef.get({source: 'server'})
        vocabSnapshot.forEach((doc) => {
          if (doc.id.includes(props.match.params.singleLanguage.toLowerCase())) {
            setVocab(doc.data())
            // console.log('this is doc.id', doc.id)
          }
        });

        // props.setAdminLines(!!props.selectAdminLines)
      } catch (err) {
        console.log('error in SingleLanguage call-----', err)
      }
    }
    lang()
  }, [])

  let links = []

  return (
    <div id="single-language">
      <div id="single-language__header">
        <div id='counterContainer'>
        <h1 id='singleLangName'> {language.name} </h1>
        <h4 id='singleLangSubhead'> By learning this language, you are adding to a community of this many speakers!: </h4>
        <CountUp className="speakersAnimate" start={0} end={language.speakers} duration={2.5} separator="," />
        </div>
        <div>
          <p id="language-description"> {language.description} </p>
        </div>
      </div>
      <div id="single-language__pronunciation-guide">
        <p id="single-language__pronunciation-summary"> {language.pronunciation} </p>
      </div>
      <div id="single-language__vocab">
        <Table id="single-language__vocab__table"  success bordered >
        <tbody>
          <tr id="column-names-row">
            <th scope="col"> Audio </th>
            <th scope="col"> English </th>
            <th scope="col"> {language.name} </th>
          </tr>
          <tr className="single-vocab-row">
            <th scope="audio"> <IoPlayCircle/> </th>
            <td> Hello! </td>
            <td> {vocab['Hello!']} </td>
          </tr>
          <tr className="single-vocab-row">
            <th scope="audio"> <IoPlayCircle/> </th>
            <td> How are you? </td>
            <td> {vocab['How are you?']} </td>
          </tr>
          <tr className="single-vocab-row">
            <th scope="audio"> <IoPlayCircle/></th>
            <td> I am fine. </td>
            <td> {vocab['I am fine.']} </td>
          </tr>
          <tr className="single-vocab-row">
            <th scope="audio"> <IoPlayCircle/> </th>
            <td> What is your name? </td>
            <td> {vocab['What is your name?']} </td>
          </tr>
          <tr className="single-vocab-row">
            <th scope="audio"> <IoPlayCircle/> </th>
            <td> My name is ___. </td>
            <td> {vocab['My name is ___.']} </td>
          </tr>
          <tr className="single-vocab-row">
            <th scope="audio"> <IoPlayCircle/> </th>
            <td> Thank you. </td>
            <td> {vocab['Thank you.']} </td>
          </tr>
          <tr className="single-vocab-row">
            <th scope="audio"> <IoPlayCircle/> </th>
            <td> Goodbye! </td>
            <td> {vocab['Goodbye!']} </td>
          </tr>
        </tbody>
        </Table>

        <Link to={{
          pathname: `/language/${language.name}/practice`,
          state: {
            language,
            vocab,
          }
        }}
        >
          {/* <Button className='startPageButton' > */}
            Wanna test your memorization? Try practicing!
          {/* </Button> */}
        </Link>
        <p> Here are some more useful links, including resources for further language-learning and links to current nations/communities to whom this language belongs: </p>
      </div>
    </div>
  )
}


export default SingleLanguage
