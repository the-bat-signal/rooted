import React, {useState} from 'react'
import ReactMapGL from 'react-map-gl'
import {db} from '../../server/firebase'
// const mapToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoia2F0ZWx5bmRldmluZSIsImEiOiJja21maXVoMDEydDNvMndzOThxZDliMzN1In0.VCRflrFKivh4QAzif95gVQ'

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 44.952261122619916,
    longitude: -93.29339647810357,
    width: '100wh',
    height: '100vh',
    zoom: 10
  })
  console.log('env var------', process.env)
  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        onViewportChange={viewport => {
          setViewport(viewport)
        }}
      >
        markers
      </ReactMapGL>
    </div>
  )
}

export default Map
