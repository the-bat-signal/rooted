import React from 'react'
import * as mdb from 'mdb-ui-kit'

const MapLoader = () => {
  return (
    <div id="loader-container">
      <p id='thankYou'>Please contact specific Indigenous nations to learn about their official, legal, and/or definitive boundaries.</p>
    <div className='spinnyLoaderContainer'>
      <div className='customLoader'></div>
    </div>

      <div id="loading-text">
        <h1>Loading...</h1>
      </div>
    </div>
  )
}

export default MapLoader


