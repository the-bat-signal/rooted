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

//global variables
const MAPBOX_ACCESS_TOKEN = token
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

//Map Component
const Map = () => {

  // useState
  const [clickInfo, setClickInfo] = useState();
  const [selectAdminLines, setAdminLines] = useState(false)
  const [coordinates, setCoordinates] = useState()
  const [polygonData, setpolygonData] = useState()


  // helper functions
  const coordinateMaker = coordinates => {
    const initialFormat = coordinates.map(coordinate => {
      return [coordinate._long, coordinate._lat, 0]
    })

    return [{polygon: initialFormat}]
  }

  const polygonCreator = (docArray) => {
    let resultsArray = []
    for (let i = 0; i < docArray.length; i++) {
     resultsArray.push(
      new SolidPolygonLayer({
      id: docArray[i].id,
      data: coordinateMaker(docArray[i].coordinates),
      opacity: 0.5,
      getPolygon: d => d.polygon,
      pickable: true,
      onClick: (info) => setClickInfo(info)
      }))
    }
    return resultsArray
  }

  let layers = []
  const fetch = async () => {
     const territoryRef = db.collection('languages')
      const snapshot = await territoryRef.get()
      snapshot.forEach(doc => {
      layers.push(doc.data())
      })
   setpolygonData(polygonCreator(layers));
  }



  //useEffect
  useEffect(() => {
    db
      .collection('languages')
      .doc('W5Qc1HlK51Hg5Qwhif4g')
      .get()
      .then(doc => {
        const data = doc.data().coordinates
        console.log('hello')
        setCoordinates(data)
        fetch()
      })
  }, [])




//waiting for firebase call to complete
  if (!coordinates && !polygonData) {
    return <h1>Loading...</h1>
  }
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      ContextProvider={MapContext.Provider}
      layers={polygonData}
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

export default Map



  // const [viewport, setViewport] = useState({
  //   latitude: 44.952261122619916,
  //   longitude: -93.29339647810357,
  //   width: '100wh',
  //   height: '100vh',
  //   zoom: 2
  // })


       // this creates a solid polygon layer that will render on top of the map
    //  let layerData = coordinateMaker(coordinates)
//   const solidPolygonLayer = [
//     new SolidPolygonLayer({
//     id: 'solid-polygon',
//     data: layerData,
//     opacity: 0.5,
//     getPolygon: d => d.polygon,
//     getFillColor: [50, 147, 111],
//     extruded: false,
//     pickable: true,
//     onClick: (info) => setClickInfo(info)
//   })
// ];
