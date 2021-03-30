import React from 'react';
import CountUp from 'react-countup';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../public/src';
import {IoPlayCircle} from 'react-icons/io5'


// import {db} from '../../server/firebase'

const SingleLanguage = (props) => {

  const language = props.location.state.language
  const vocab = props.location.state.vocab

  console.log('this is vocab-----', vocab)
  console.log('this is language------', language)

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
