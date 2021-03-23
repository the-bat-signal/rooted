/// app.js
import React, {useState, useEffect} from 'react'
import DeckGL from '@deck.gl/react'
import {
  StaticMap,
  MapContext,
  NavigationControl,
  GeolocateControl,
  Source,
  Layer
} from 'react-map-gl'
import {SolidPolygonLayer} from '@deck.gl/layers'
import {style} from '../style'
import {info} from '../coordinates'
import {db} from '../../server/firebase'

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoia2VuZGltb3Jhc2tpIiwiYSI6ImNra2U4YmpnODA4bXIycHA3dnA3ZHRxazMifQ.Xj6bAzbzUVih02szrFGa_Q'

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 8,
  pitch: 0,
  bearing: 0
}

const geolocateControlStyle = {
  // right: 10,
  // top: 10
}

const MAP_STYLE = style

const NAV_CONTROL_STYLE = {
  position: 'absolute',
  top: 10,
  left: 10
}

// {_lat: 41.885921, _long: -72.70752}
//formatting each single coordinate object into arrays for deck.gl
 const coordinateMaker = coordinates => {
    return coordinates.map(coordinate => {
      return [coordinate._long, coordinate._lat, 0]
    })
  }

const Data = () => {
  const [viewport, setViewport] = useState({
    latitude: 44.952261122619916,
    longitude: -93.29339647810357,
    width: '100wh',
    height: '100vh',
    zoom: 2
  })
  const [selectAdminLines, setAdminLines] = useState(false)
  const [coordinates, setCoordinates] = useState()


  useEffect(() => {
    db
      .collection('languages')
      .doc('W5Qc1HlK51Hg5Qwhif4g')
      .get()
      .then(doc => {
        const data = doc.data()
        setCoordinates(data.coordinates) // Mohegan-Pequot object with key-value pairs
      })
  })

//waiting for firebase call to complete
  if (!coordinates) {
    return <h1>Loading...</h1>
  }

  // putting coordinate data as a whole into a format digestable by deck.gl's SolidPolygonLayer
   const layerData = [{polygon: coordinateMaker(coordinates)}]
    const layer = new SolidPolygonLayer({
    data: layerData,
    opacity: 0.5,
    getPolygon: d => d.polygon,
    getFillColor: [50, 147, 111],
    extruded: false
  })

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layer}
      ContextProvider={MapContext.Provider}
    >
      <StaticMap
        mapStyle={MAP_STYLE}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      />
      <NavigationControl style={NAV_CONTROL_STYLE} />
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
        auto
      />
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
    </DeckGL>
  )
}

export default Data
