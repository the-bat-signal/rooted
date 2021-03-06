import React, {useState, useEffect} from 'react'
import {BrushingExtension, FillStyleExtension} from '@deck.gl/extensions'
import DeckGL from '@deck.gl/react'
import {
  StaticMap,
  MapContext,
  NavigationControl,
  GeolocateControl,
  FullscreenControl,
} from 'react-map-gl'
import {SolidPolygonLayer, TextLayer} from '@deck.gl/layers'
import {PopupBox} from './PopupBox'
import {styleBasic, styleAdmin} from '../style'
import {db} from '../../server/firebase'
import MapToggles from './MapToggles'
import MapLoader from './MapLoader'
// don't import this below yet, it's causing an error
// import functions from 'firebase-functions'

//global variables
// const config = functions.config()

// August 22, 2021, testing dot-env webpack using mapbox token
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_TOKEN

// MAP_STYLES
const MAP_STYLE_BASIC = styleBasic
const MAP_STYLE_ADMIN = styleAdmin
const navControlStyle = {
  top: 35,
}
const fullscreenControlStyle = {
  left: 0,
  top: 0,
  position: 'relative'
};

//Map Component
const Map = (props) => {
  // useState
  const [clickInfo, setClickInfo] = useState()
  const [selectAdminLines, setAdminLines] = useState()
  const [selectLanguageLayer, setLanguageLayer] = useState(false)
  const [selectTerritoryLayer, setTerritoryLayer] = useState(false)
  const [languagePolygons, setLanguagePolygons] = useState()
  const [territoryPolygons, setTerritoryPolygons] = useState()
  const [geolocate, setGeolocate] = useState(true)
  const [showPopup, togglePopup] = useState(false)
  const [viewport, setViewport] = useState({
    longitude: -74.00918185993224,
    latitude: 40.70532791050518,
    zoom: 7,
    bearing: 0,
    pitch: 0,
  })

  // helper variables
  let languageArray = []
  let territoryArray = []

  // our palette: https://coolors.co/bee7b8-32936f-ab5cfa-00c1ff-fff700-ff9b00-ff7073-e63946-051d23
  const colorArray = [
    [190, 231, 176], // tea green
    [50, 147, 111], // illuminating emerald
    [171, 92, 250], // medium purple
    [0, 193, 255], // capri
    [255, 112, 115], // light coral
    [255, 247, 0], // lemon
    [5, 29, 35], // dark jungle green
    [255, 155, 0], // orange peel
    [229, 75, 75], // imperial red
  ]

  // helper functions
  function splitter(string) {
    // making an array with a ' ' (space) for the text layer characterSet
    const array = string.split(' ')
    array.push(' ')
    return array
  }

  function coordinateMaker(coordinates) {
    if (coordinates) {
      // formatting coordinates for deck.gl polygon layer creation
      //Notes for Refactor: Check JSON Coordinate formatting

      //store JSON coordinate data to fill here vvvv
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

  // finding center coordinate to place text on an array of coordinates from territory polygons
  function centerCoordinate(coordinates) {
    let x = 0.0
    let y = 0.0
    let z = 0.0

    if (coordinates) {
      for (let i = 0; i < coordinates.length; i++) {
        let latitude = (coordinates[i]._lat * Math.PI) / 180
        let longitude = (coordinates[i]._long * Math.PI) / 180

        x += Math.cos(latitude) * Math.cos(longitude)
        y += Math.cos(latitude) * Math.sin(longitude)
        z += Math.sin(latitude)
      }

      let total = coordinates.length

      x = x / total
      y = y / total
      z = z / total

      let centralLongitude = Math.atan2(y, x)
      let centralSquareRoot = Math.sqrt(x * x + y * y)
      let centralLatitude = Math.atan2(z, centralSquareRoot)

      return [
        (centralLongitude * 180) / Math.PI,
        (centralLatitude * 180) / Math.PI,
      ]
    } else {
      return [0, 0, 0]
    }
  }

  const colorPicker = (array) => {
    // random colors for polygons
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  }
  //Notes for Refactor: accepts and array of alll of the coordinate nested arrays (3 dimensional array)
  const polygonCreator = (docArray) => {
    let resultsArray = []
    let counter = 0
    // currently rendering only 'pickable' polygons - THANKS DECK.GL
    for (let i = 0; i < docArray.length; i++) {
      resultsArray.push(
        new SolidPolygonLayer({
          id: docArray.length < 1500 ? docArray[i].name : counter++,
          visible:
            docArray.length < 1500
              ? selectLanguageLayer
                ? true
                : false
              : selectTerritoryLayer
              ? true
              : false,
          //Notes for Refactor:
          data: coordinateMaker(docArray[i].coordinates),
          // opacity for clickables different than non-clickables
          opacity: i <= 256 ? 0.9 : 0.1,
          getFillColor:
            docArray.length < 1500
              ? i <= 256
                ? colorPicker(colorArray)
                : [192, 192, 192]
              : colorPicker(colorArray),
          getPolygon: (d) => d.polygon,
          pickable: docArray.length < 1500 ? true : false,
          onClick: (info) => {
            setClickInfo(info)
            togglePopup(true)
          },
          wireframe: true,
          extruded: true,
          getElevation: docArray[i].speakers ? docArray[i].speakers * 10 : 1,
        })
      )
    }
    if (docArray.length > 1500) {
      //adding a text layer for the territories specifically
      const territoryText = new TextLayer({
        id: 'territory-text-layer',
        data: territoryArray,
        pickable: false,
        getPosition: (d) => centerCoordinate(d.coordinates),
        getText: (d) => d.name,
        getSize: 8500,
        fontFamily: 'Montserrat, sans-serif',
        getAngle: 0,
        getTextAnchor: 'middle',
        getAlignmentBaseline: 'center',
        visible: selectTerritoryLayer ? true : false,
        sizeUnits: 'meters',
        characterSet: splitter(
          `  ' ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ???  ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? ??? a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z ?? / ?? ?? ( ?? ) ' ?? ?? ?? ?? ?? - ?? ??? ?? ?? , & ?? ??? ??? ??? ??? ??? ?? ?? ?? ?? ${` `} ??  ?? : 7 ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ??? ??? ??? ?? ?? ??? ??? ?? ?? ?? ?? ?? ??? ?? ?? ?? ?? ?? .  ??  ?? ?? ?? ??  ?? ??  ?? ?? ?? ??? ?? " [ ] ?? ?? ?? ?? ??? ?? ??? ??  ?? ??? ?? ?? ?? ?? ?? ??? ??? ??? ??? ??? ??? ??? ??? ??? ???? ???? ???? ???? ???? ???? ???? ???? ???? ???? ???? ^ ??? ???  ?? ???  ?? ?? ?? ??? ${' '}`
        ),
      })
      resultsArray.push(territoryText)
    }
    return resultsArray
  }
  // this is where we grab the data from Firestore to render polygons
  //Notes for Refactor: This creates polygons from Firebase. Will have to change to local JSON
  useEffect(() => {
    //Notes for Refactor: create empty inputArray
    async function fetch(collectionName, inputArray) {
      const ref = db.collection(collectionName)
      const snapshot = await ref.get({source: 'cache'})
      // .empty returns a boolean for if there are documents in the snapshot or not
      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          inputArray.push(doc.data())
        })
      } else {
        //Notes for Refactor: replace forEach with langdata.features.map((languages) => helperfunc(language.geometry.coordinates[0])
        const newSnapshot = await ref.get({source: 'server'})
        newSnapshot.forEach((doc) => {
          inputArray.push(doc.data())
        })
      }
      // lets us know where data comes from
      let source = snapshot.metadata.fromCache ? 'local cache' : 'server'
      console.log('Data came from ' + source)
      if (collectionName === 'languagesMap') {
        setLanguagePolygons(polygonCreator(inputArray))
      } else {
        ////Notes for Refactor: Input array from JSON data something like langdata.features
        setTerritoryPolygons(polygonCreator(inputArray))
      }
    }
    fetch('languagesMap', languageArray)
    fetch('territories', territoryArray)
  }, [selectLanguageLayer, selectTerritoryLayer])

  // using local storage to set state for toggling layers
  useEffect(() => {
    const adminLines = JSON.parse(localStorage.getItem('adminLines'))
    setAdminLines(adminLines)
    const languages = JSON.parse(localStorage.getItem('languages'))
    setLanguageLayer(languages)
    const territories = JSON.parse(localStorage.getItem('territories'))
    setTerritoryLayer(territories)
  }, [])
  //setting auto on geolocate to true once, then it will remain off
  useEffect(() => {
    setGeolocate(true)
  }, [])

  // loader page while waiting for firebase call to complete
  if (!territoryPolygons) {
    return <MapLoader />
  }

  return (
    <div id='mapContainer'>
      <DeckGL
        initialViewState={viewport}
        controller={true}
        ContextProvider={MapContext.Provider}
        layers={[languagePolygons, territoryPolygons]}
        onViewStateChange={(pos) => {
          setViewport(pos.viewState)
        }}
        width='100%'
        height='100%'
        // this style component with the marginTop is so that the popups do NOT get cut off at the top when the nav bar is visible (non fullscreen mode)
        style={{marginTop: '6em'}}
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
          <GeolocateControl
            positionOptions={{enableHighAccuracy: true}}
            trackUserLocation={true}
            style={{marginTop: '8em'}}
            auto={geolocate}
            fitBoundsOptions={{maxZoom: 6}}
            onGeolocate={() => {
              setGeolocate(false)
            }}
          />
          <FullscreenControl onClick={(pos) => {
            setViewport(pos.viewState)
          }}
          style={fullscreenControlStyle}
          />
        <MapToggles selectAdminLines={selectAdminLines} setAdminLines={setAdminLines} selectLanguageLayer={selectLanguageLayer} setLanguageLayer={setLanguageLayer} selectTerritoryLayer={selectTerritoryLayer} setTerritoryLayer={setTerritoryLayer}/>
        </div>

      </DeckGL>
    </div>
  )
}

export default Map
