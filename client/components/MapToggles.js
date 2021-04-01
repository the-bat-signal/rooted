import React from 'react'

const MapToggles = (props) => {

  return (
    // checkbox: layer for administrative lines
    <div className='mapTogglesContainer'>
    <label className="singleCheckboxContainer"
      onChange={() => {
        const adminLines = JSON.parse(localStorage.getItem('adminLines'));

        if (!adminLines) {
          localStorage.setItem('adminLines', "true")
          props.setAdminLines(true)
        } else {
          localStorage.setItem('adminLines', "false")
          props.setAdminLines(false)
        }
        console.log('this is local storage admin lines after click---', localStorage.getItem('adminLines'))
        }}
      >
      Admin Lines{"  "}
      {props.selectAdminLines ? <input type="checkbox" checked="checked" /> : <input type="checkbox" />}
      <span className="checkmark" />
    </label>

    {/* // checkbox: layer for language polygons */}
    <button className="singleCheckboxContainer"
      onClick={() => {
        console.log('POLYGONDATA!---------', props.polygonData)
        const languages = JSON.parse(localStorage.getItem('languages'));

        if (!languages) {
          localStorage.setItem('languages', "true")
          props.setLanguageLayer(true)
        } else {
          localStorage.setItem('languages', "false")
          props.setLanguageLayer(false)
        }
        console.log('this is local storage languages after click---', localStorage.getItem('languages'))
        }}

      style={props.selectLanguageLayer ? {backgroundColor: 'red'} : {backgroundColor: 'white'}}
      >
      Languages{"  "}
      <span className="checkmark" />
    </button>
    {/* <button type='button' >languages</button> */}
    </div>
  )
}

export default MapToggles
