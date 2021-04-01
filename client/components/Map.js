import React, {useState, useEffect} from 'react'
import {BrushingExtension, FillStyleExtension} from '@deck.gl/extensions';
import DeckGL from '@deck.gl/react'
import {
  StaticMap,
  MapContext,
  NavigationControl,
  GeolocateControl,
} from 'react-map-gl'
import {SolidPolygonLayer} from '@deck.gl/layers'
import {PopupBox} from './PopupBox'
import {styleBasic, styleAdmin} from '../style'
import {db} from '../../server/firebase'
import MapToggles from './MapToggles'
import MapLoader from "./MapLoader"
const {MAPTOKEN} = require('../../secrets')

//global variables
const MAPBOX_ACCESS_TOKEN = MAPTOKEN

// MAP_STYLES
const MAP_STYLE_BASIC = styleBasic
const MAP_STYLE_ADMIN = styleAdmin
const navControlStyle = {
  top: 35,
}

//Map Component
const Map = (props) => {
  // useState
  const [clickInfo, setClickInfo] = useState()
  const [selectAdminLines, setAdminLines] = useState()
  const [selectLanguageLayer, setLanguageLayer] = useState(true)
  const [polygonData, setpolygonData] = useState()
  const [showPopup, togglePopup] = useState(false)
  const [viewport, setViewport] = useState({
  longitude: -74.00918185993224,
  latitude: 40.70532791050518,
  zoom: 7,
  bearing: 0,
  pitch: 0,
})
  const [viewstate, setViewstate] = useState()

  let layers = []

  const colorArray = [
    [190, 231, 176],
    [50, 147, 111],
    [122, 132, 80],
    [62, 25, 41],
    [255, 112, 115],
    [245, 192, 0],
    [5, 29, 35],
  ]

  // helper functions
  function coordinateMaker(coordinates) {
    if (coordinates) {
      const initialFormat = coordinates.map((coordinate) => {
        return [coordinate._long, coordinate._lat, 0]
      })
      return [{polygon: initialFormat}]
    } else {
      coordinates = [
        {
          polygon: [
            [-106.787109, 52.509535, 0],
            [-107.314453, 52.402419, 0],
            [-107.62207, 52.05249, 0],
          ],
        },
      ]
    }
  }

  let counter = 1;


  const colorPicker = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  }
  const polygonCreator = (docArray) => {
    let resultsArray = []
    // currently rendering only 'pickable' polygons - THANKS DECK.GL
    for (let i = 0; i < docArray.length; i++) {
      resultsArray.push(
         new SolidPolygonLayer({
          id: docArray[i].name,
          visible: selectLanguageLayer ? true : false,
          // id: counter++,
          data: coordinateMaker(docArray[i].coordinates),
          // opacity for clickables different than non-clickables
          opacity: i <= 256 ? 0.9 : 0.1,
          getFillColor: i <= 256 ? colorPicker(colorArray) : [192,192,192],
          getPolygon: (d) => d.polygon,
          pickable: true,
          onClick: (info) => {
            setClickInfo(info)
            togglePopup(true)
            // setAdminLines(selectAdminLines)
          },
          wireframe: true,
          extruded: true,
          getElevation: docArray[i].speakers ? docArray[i].speakers * 10 : 1
          // getFillPattern: f => 'hatch-1x',
          // fillPatternAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl/master/examples/layer-browser/data/pattern.png',
          // fillPatternMapping: 'https://raw.githubusercontent.com/visgl/deck.gl/master/examples/layer-browser/data/pattern.json',
          // getFillPatternOffset: [0, 0],
          // getFillPatternScale: 10,
          // brushingEnabled: true,
          // brushingRadius: 1000000,
          // extensions: [new BrushingExtension()]
        })
      )
    }
    return resultsArray
  }

  // this is where we grab the data from Firestore to render polygons
  useEffect(() => {
    async function fetch(collectionName) {
      const ref = db.collection(collectionName)
      // if something is not rendering, change this to server for one render, then it should be available from cache
       const snapshot = await ref.get({source: 'server'})
      snapshot.forEach((doc) => {
        layers.push(doc.data())
      })

    let source = snapshot.metadata.fromCache ? 'local cache' : 'server'
      console.log('Data came from ' + source)
      setpolygonData(polygonCreator(layers))
    }
    fetch('languagesMap')
  }, [selectLanguageLayer])

  useEffect(() => {
    const adminLines = JSON.parse(localStorage.getItem('adminLines'));
    setAdminLines(adminLines)
    const languages = JSON.parse(localStorage.getItem('languages'));
    setLanguageLayer(languages);
    console.log('adminLines from useEffect------', adminLines)
  }, [])
  //waiting for firebase call to complete
  if (!polygonData) {
    return (
      <MapLoader />
    )
  }
  return (
    <div id='mapContainer'>
    <DeckGL
      initialViewState={viewport}
      controller={true}
      ContextProvider={MapContext.Provider}
      // layers= {selectLanguageLayer ? polygonData : null}
      layers={polygonData}
    >
      {showPopup && clickInfo && (
        <PopupBox polygonPopupData={clickInfo} togglePopup={togglePopup} />
      )}
      {selectAdminLines ? (
        <StaticMap
          mapStyle={MAP_STYLE_ADMIN}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        />
      ) : (
        <StaticMap
          mapStyle={MAP_STYLE_BASIC}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        />
      )}
      <div id="map-controls">
        <NavigationControl
        style={navControlStyle}
        />
        {/* <GeolocateControl
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
          auto={false}
          fitBoundsOptions={{maxZoom: 6}}
          onGeolocate={(pos) => {
          setViewstate({
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
          })
        }}
        /> */}
      <MapToggles selectAdminLines={selectAdminLines} setAdminLines={setAdminLines} selectLanguageLayer={selectLanguageLayer} setLanguageLayer={setLanguageLayer} polygonData={polygonData}/>
      </div>

    </DeckGL>
    </div>
  )
}

export default Map
