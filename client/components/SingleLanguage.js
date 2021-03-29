import React, {useState, useEffect} from 'react';
import {db} from '../../server/firebase'

const SingleLanguage = (props) => {

  const language = props.location.state.language
  const vocab = props.location.state.vocab

  console.log('this is vocab-----', vocab)
  console.log('this is language------', language)

  return (
    <div id="single-language">
      <div id="single-language__header">
        <h1> {language.name} </h1>
        <h4> By learning this language, you are adding to a community of {language.speakers} speakers! </h4>
        <div>
          <p id="language-description"> {language.description} </p>
        </div>
      </div>
      <div id="single-language__pronunciation-guide">

      </div>
      <div id="single-language__vocab">
        <table id="single-language__vocab__table" cellSpacing="20">
        <tbody>
          <tr id="column-names-row">
            <th scope="col"> Audio </th>
            <th scope="col"> English </th>
            <th scope="col"> {language.name} </th>
          </tr>
          <tr className="single-vocab-row">
            <th scope="audio"> audio-icon </th>
            <td> Hello! </td>
            <td> {vocab['Hello!']} </td>
          </tr>
          <tr className="single-vocab-row">
            <th scope="audio"> audio-icon </th>
            <td> How are you? </td>
            <td> {vocab['How are you?']} </td>
          </tr>
          <tr className="single-vocab-row">
            <th scope="audio"> audio-icon </th>
            <td> I am fine. </td>
            <td> {vocab['I am fine.']} </td>
          </tr>
          <tr className="single-vocab-row">
            <th scope="audio"> audio-icon </th>
            <td> What is your name? </td>
            <td> {vocab['What is your name?']} </td>
          </tr>
          <tr className="single-vocab-row">
            <th scope="audio"> audio-icon </th>
            <td> My name is ___. </td>
            <td> {vocab['My name is ___.']} </td>
          </tr>
          <tr className="single-vocab-row">
            <th scope="audio"> audio-icon </th>
            <td> Thank you. </td>
            <td> {vocab['Thank you.']} </td>
          </tr>
          <tr className="single-vocab-row">
            <th scope="audio"> audio-icon </th>
            <td> Goodbye! </td>
            <td> {vocab['Goodbye!']} </td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>
  )
}


export default SingleLanguage
