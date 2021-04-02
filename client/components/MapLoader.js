import React from 'react'
import * as mdb from 'mdb-ui-kit'

const MapLoader = () => {
  return (
    <div id="loader-container">
      <p id='thankYou'>Thanks for contributing to Indigenous language and culture!</p>
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


