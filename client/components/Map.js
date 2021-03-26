import React, {useState, useEffect} from 'react'
import DeckGL from '@deck.gl/react'
import {
  StaticMap,
  MapContext,
  NavigationControl,
  GeolocateControl,
  Source,
  Layer,
} from 'react-map-gl'
import {SolidPolygonLayer} from '@deck.gl/layers'
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
  bearing: 0,
}

const MAP_STYLE_BASIC = styleBasic;
const MAP_STYLE_ADMIN = styleAdmin

//Map Component
const Map = () => {

  // useState
  const [clickInfo, setClickInfo] = useState();
  const [selectAdminLines, setAdminLines] = useState(false)
  // const [coordinates, setCoordinates] = useState()
  const [polygonData, setpolygonData] = useState()


  //helper variables
   let layers = []
   const colorArray = [[190, 231, 176], [50, 147, 111], [122, 132, 80],[192, 133, 82], [137, 87, 55], [62, 25, 41], [255, 112, 115], [245, 192, 0],[5, 29, 35]]

   // helper functions
  const coordinateMaker = coordinates => {
    const initialFormat = coordinates.map(coordinate => {
      return [coordinate._long, coordinate._lat, 0]
    })

    return [{polygon: initialFormat}]
  }

  const colorPicker = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  }
  const polygonCreator = (docArray) => {
    let resultsArray = []
    for (let i = 0; i < docArray.length; i++) {
     resultsArray.push(
      new SolidPolygonLayer({
      id: docArray[i].name,
      data: coordinateMaker(docArray[i].coordinates),
      opacity: 0.5,
      getFillColor: colorPicker(colorArray),
      getPolygon: d => d.polygon,
      pickable: true,
      onClick: (info) => {
        console.log(info)
        setClickInfo(info)
      }
      }))
    }
    return resultsArray
  }


  //useEffect
  useEffect(() => {
    async function fetch(collectionName) {
      const ref = db.collection(collectionName)
      const snapshot = await ref.get()
      snapshot.forEach((doc) => {
      layers.push(doc.data())
      console.log(doc.data())
      })
      setpolygonData(polygonCreator(layers));
    }
    fetch('languages')
    //currently fetch call for territories is too large & it doesn't complete in time to setpolygonData
  }, [])

//waiting for firebase call to complete
  if (!polygonData) {
    return <h1>Loading...</h1>
  }
  console.log(polygonData)
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      ContextProvider={MapContext.Provider}
      layers={polygonData}
       >
        {clickInfo && (
           <PopupBox polygonPopupData={clickInfo} />
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
    <div id="map-controls">
      <NavigationControl />
      <GeolocateControl
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          auto={false}
      />
    </div>
      <label
        onClick={() => {
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
              'line-width': 0.75,
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
