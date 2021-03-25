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
import {data} from '../coordinates'
import {PopupBox} from './PopupBox'
import {styleBasic, styleAdmin} from '../style'
import {db} from '../../server/firebase'
const token = require('../../secrets')

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = token
//.env https://www.npmjs.com/package/dotenv
//import

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

const MAP_STYLE_BASIC = styleBasic;
const MAP_STYLE_ADMIN = styleAdmin
const NAV_CONTROL_STYLE = {
  position: 'absolute',
  top: 10,
  left: 10
}

const Data = () => {
  // adding an additional destructured useState because the value is empty
  // currently causing an error saying that it cannot be destructured because it's not iterable?
  const [clickInfo, setClickInfo] = useState();

// {_lat: 41.885921, _long: -72.70752}
//formatting each single coordinate object into arrays for deck.gl
 const coordinateMaker = coordinates => {
    return coordinates.map(coordinate => {
      return [coordinate._long, coordinate._lat, 0]
    })
  }

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
        const data = doc.data().coordinates
        console.log('hello')
        setCoordinates(data)
      })
  }, [])

// const call = () => db.collection('languages').get().then (doc => console.log(doc.docs[0]._delegate._document.objectValue.proto.mapValue.fields.coordinates.arrayValue))

//waiting for firebase call to complete
  if (!coordinates) {
    return <h1>Loading...</h1>
  }

     // this creates a solid polygon layer that will render on top of the map
    let layerData = [{polygon: coordinateMaker(coordinates)}]
  const solidPolygonLayer = [
    new SolidPolygonLayer({
    id: 'solid-polygon',
    data: layerData,
    opacity: 0.5,
    getPolygon: d => d.polygon,
    getFillColor: [50, 147, 111],
    extruded: false,
    pickable: true,
    onClick: (info) => setClickInfo(info)
  })
];
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      ContextProvider={MapContext.Provider}
      layers={solidPolygonLayer}
       >
      {clickInfo && (
      <PopupBox polygonData={clickInfo} />
      )}
  {selectAdminLines ?
        <StaticMap
        mapStyle={MAP_STYLE_ADMIN}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      /> :
      <StaticMap
        mapStyle={MAP_STYLE_BASIC}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      />
      }
      <NavigationControl style={NAV_CONTROL_STYLE} />
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
        auto={false}
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
