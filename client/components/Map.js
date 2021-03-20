import React, {useState} from 'react'
import ReactMapGL, {GeolocateControl} from 'react-map-gl'

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

  const geolocateControlStyle = {
    // right: 10,
    // top: 10
  }
  // console.log('env var------', process.env)
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
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          auto
        />
        {/* markers */}
      </ReactMapGL>
    </div>
  )
}

export default Map
