import React, {useState} from 'react'

import ReactMapGL, {GeolocateControl, Layer, Source} from 'react-map-gl'

// import {db} from '../../server/firebase'

// const mapToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoia2F0ZWx5bmRldmluZSIsImEiOiJja21maXVoMDEydDNvMndzOThxZDliMzN1In0.VCRflrFKivh4QAzif95gVQ'

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 44.952261122619916,
    longitude: -93.29339647810357,
    width: '100wh',
    height: '100vh',
    zoom: 2
  })
  const [selectAdminLines, setAdminLines] = useState(false)

  //hiii
  const geolocateControlStyle = {
    // right: 10,
    // top: 10
  }

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/katelyndevine/ckmi5sryy12ya17pi20sosfi0"
        onViewportChange={viewport => {
          setViewport(viewport)
        }}
      >
        <label
          onClick={evt => {
            setAdminLines(!selectAdminLines)
          }}
          className="adminContainer"
        >
          Admin Lines
          <input type="checkbox" />
          <span className="checkmark" />
        </label>
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          auto
        />
        {selectAdminLines ? (
          <Source
            id="adminLines"
            type="vector"
            url="mapbox://mapbox.mapbox-streets-v8"
          >
            <Layer
              id="adminLines"
              type="line"
              source="admin-1"
              source-layer="admin"
              paint={{
                'line-color': '#CAB69E',
                'line-width': 0.75
              }}
            />
          </Source>
        ) : null}
      </ReactMapGL>
    </div>
  )
}

export default Map
