import React, {useState, useEffect} from 'react'
import ReactMapGL, {GeolocateControl, Layer, Source} from 'react-map-gl'
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
    zoom: 2
  })
  const [selectAdminLines, setAdminLines] = useState(false)
  const [coordinates, setCoordinates] = useState()

  //hiii
  const geolocateControlStyle = {
    // right: 10,
    // top: 10
  }

  useEffect(() => {
    db
      .collection('languages')
      .doc('W5Qc1HlK51Hg5Qwhif4g')
      .get()
      .then(doc => {
        const data = doc.data()
        setCoordinates(data.coordinates)
        // console.log(data) // Mohegan-Pequot object with key-value pairs
      })
  })

  console.log('hello from coordinates------', coordinates)

  const coordinateMaker = coordinates => {
    return coordinates.map(coordinate => {
      let str = ''
      str += `${coordinate._lat.toString()}, ${coordinate._long.toString()} ; `
      return str
    })
  }

  return (
    <div>
      <h1 style={{backgroundColor: 'lightblue'}}>
        The Mohegan coordinates are{' '}
        {coordinates ? coordinateMaker(coordinates) : ''}
      </h1>
      <div>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/katelyndevine/ckmi3oed53shz17qiwz2t3ozn/draft"
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
            // <div>
            <Source
              id="adminLines"
              type="vector"
              url="mapbox://mapbox.mapbox-streets-v8"
            >
              <Layer
                id="adminLines"
                type="line"
                source="admin"
                source-layer="admin"
                paint={{
                  'line-color': '#CAB69E',
                  'line-width': 0.75
                }}
              />
              <Layer
                id="streets"
                type="line"
                source="road"
                source-layer="road"
                visibility="visible"
                paint={{
                  'line-color': '#FFFFFF'
                  // 'line-width': 0.75
                }}
              />

              {/* <Layer
              id="streets"
              type="symbol"
              source="road"
              source-layer="road"
              text-color='#000000'

              // layout={{
              //   'text-size': "12",
              //   'visibility': "visible"
              // }}
              // paint={{
              //   "text-color": "#000000"
              // }}
            /> */}

               <Layer
                id="nationalParks"
                type="fill"
                source="landuse"
                source-layer="landuse"
                paint={{
                  'fill-color': '#E9F7D5'
                }}
              />

            </Source>

          ) : null}
        </ReactMapGL>
      </div>
    </div>
  )
}

export default Map


