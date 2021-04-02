import React, {useEffect, useState} from 'react';
import CountUp from 'react-countup';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../public/src';
import {IoPlayCircle} from 'react-icons/io5'
// import {db} from '../../server/firebase'
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const SingleLanguage = (props) => {

  const language = props.location.state.language
  const vocab = props.location.state.vocab

  let links = []

  // should I instead try to do this whole query in PopupBox???
  // const [languageLinks, setLanguageLinks] = useState()

  // useEffect(() => {
  //   async function fetch(collectionName) {
  //     const ref = db.collection(collectionName).doc().where("name", "==", language.name).collection().doc()
  //     const snapshot = await ref.get()
  //     console.log('this is snapshot', snapshot)
  //     snapshot.forEach((link) => {
  //       links.push(link.data())
  //     })
  //     setLanguageLinks(links)
  //   }
  //   fetch('languages')
  // }, [])


  return (
    <div id="single-language">
      <div id="single-language__header">
        <div id='counterContainer'>
        <h1 id='singleLangName'> {language.name} </h1>
          <div data-aos="fade-up-left"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="top-center"> Thanks for checking out this language! </div>
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
        <p> Here are some more useful links, including resources for further language-learning and links to current nations/communities to whom this language belongs: </p>
        {/* <ul>
          {languageLinks.map((languageLink) => {
            <li> {languageLink} </li>
          })}
        </ul> */}
        {/* <Table striped bordered hover>
          <thead>
            <tr>
              <th>Play Audio</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table> */}
        {/* <Button>Test</Button> */}
      </div>
    </div>
  )
}


export default SingleLanguage
