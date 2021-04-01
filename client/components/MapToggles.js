import React from 'react'

const MapToggles = (props) => {

  return (
    // button: layer for administrative lines
  <div className='mapTogglesContainer'>

    <button className="singleCheckboxContainer"
      onClick={() => {
        const adminLines = JSON.parse(localStorage.getItem('adminLines'));

        if (!adminLines) {
          localStorage.setItem('adminLines', "true")
          props.setAdminLines(true)
        } else {
          localStorage.setItem('adminLines', "false")
          props.setAdminLines(false)
        }
        }}
      style={props.selectAdminLines ? {backgroundColor: '#B9E5D2'} : {backgroundColor: 'white'}}
      >
      Lines{"  "}
      <span className="checkmark" />
    </button>

    {/* // button: layer for language polygons */}
    <button className="singleCheckboxContainer"
      onClick={() => {
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

      style={props.selectLanguageLayer ? {backgroundColor: '#B9E5D2'} : {backgroundColor: 'white'}}
      >
      Languages{"  "}
      <span className="checkmark" />
    </button>
    {/* <button type='button' >languages</button> */}
    </div>
  )
}

export default MapToggles
