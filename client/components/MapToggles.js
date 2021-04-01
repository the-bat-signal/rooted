import React from 'react'

const MapToggles = (props) => {

  return (
    <div className='mapTogglesContainer'>
    <label className="singleCheckboxContainer"
      onClick={() => {
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

        <label className="singleCheckboxContainer"
      onClick={() => {
        const adminLines = JSON.parse(localStorage.getItem('languages'));

        if (!adminLines) {
          localStorage.setItem('languages', "true")
          props.setAdminLines(true)
        } else {
          localStorage.setItem('languages', "false")
          props.setAdminLines(false)
        }
        console.log('this is local storage languages after click---', localStorage.getItem('languages'))
        }}

      >
      Languages{"  "}
      {props.selectAdminLines ? <input type="checkbox" checked="checked" /> : <input type="checkbox"/>}
      <span className="checkmark" />
    </label>
    </div>
  )
}

export default MapToggles
