import React from 'react'
import * as mdb from 'mdb-ui-kit'

const MapLoader = () => {
  return (
    <div id="loader-container">
      <div id="loading-animations">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden"></span>
        </div>
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden"></span>
        </div>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden"></span>
        </div>
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden"></span>
        </div>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden"></span>
        </div>
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden"></span>
        </div>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden"></span>
        </div>
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
      <div id="loading-text">
        <h1>Loading...</h1>
      </div>
    </div>
  )
}

export default MapLoader
