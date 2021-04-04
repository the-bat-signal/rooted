import React from 'react'

const MapToggles = (props) => {

  return (
    // button: layer for administrative lines
  <div className='mapTogglesContainer'>

    <div className='toggleContainer'>
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
        }}

      style={props.selectLanguageLayer ? {backgroundColor: '#B9E5D2'} : {backgroundColor: 'white'}}
      >
      Languages{"  "}
      <span className="checkmark" />
    </button>

        {/* // button: layer for language polygons */}
    <button className="singleCheckboxContainer"
      onClick={() => {
        const territories = JSON.parse(localStorage.getItem('territories'));

        if (!territories) {
          localStorage.setItem('territories', "true")
          props.setTerritoryLayer(true)
        } else {
          localStorage.setItem('territories', "false")
          props.setTerritoryLayer(false)
        }
        console.log('this is local storage territories after click---', localStorage.getItem('territories'))
        }}

      style={props.selectTerritoryLayer ? {backgroundColor: '#B9E5D2'} : {backgroundColor: 'white'}}
      >
      Territories{"  "}
      <span className="checkmark" />
    </button>
    </div>

    <div className='elevationContainer'>press <span className='keyboardStyle'>shift</span> and <span className='keyboardStyle'>&#8592; &#8593; &#8594; &#8595;</span> arrows to see the elevation differences representing relative number of speakers</div>
    </div>
  )
}

export default MapToggles
