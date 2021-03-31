import React, {useState, useEffect} from 'react'
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
import * as mdb from 'mdb-ui-kit';
const {MAPTOKEN} = require('../../secrets')


//global variables
const MAPBOX_ACCESS_TOKEN = MAPTOKEN

// MAP_STYLES
const MAP_STYLE_BASIC = styleBasic;
const MAP_STYLE_ADMIN = styleAdmin
const navControlStyle = {
  top: 35
}

//Map Component
const Map = (props) => {
  // useState
  const [clickInfo, setClickInfo] = useState()
  // const [selectAdminLines, setAdminLines] = useState()
  const [polygonData, setpolygonData] = useState()
  const [showPopup, togglePopup] = useState(false)
  const [viewport, setViewport] = useState({
  longitude: -74.00918185993224,
  latitude: 40.70532791050518,
  zoom: 8,
  bearing: 0,
  pitch: 0,
})
  const [viewstate, setViewstate] = useState()
  //localStorage:
  const adminLines = JSON.parse(localStorage.getItem('adminLines'));

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
      coordinates = [{polygon: [[-106.787109, 52.509535, 0],
      [-107.314453, 52.402419, 0],
      [-107.62207, 52.05249, 0],]}]
    }

  }

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
          data: coordinateMaker(docArray[i].coordinates),
          // opacity for clickables different than non-clickables
          opacity: i <= 256 ? 0.9 : 0.1,
          getFillColor: colorPicker(colorArray),
          getPolygon: (d) => d.polygon,
          pickable: true,
          onClick: (info) => {
            setClickInfo(info)
            togglePopup(true)
            // setAdminLines(selectAdminLines)
          },
        })
      )
    }
    return resultsArray
  }

  // this is where we grab the data from Firestore to render polygons
  useEffect(() => {
    async function fetch(collectionName) {
      const ref = db.collection(collectionName)
       const snapshot = await ref.get({source: 'server'})
      snapshot.forEach((doc) => {
        layers.push(doc.data())
      })
      var source = snapshot.metadata.fromCache ? "local cache" : "server";
          console.log("Data came from " + source);
      setpolygonData(polygonCreator(layers))
    }
    fetch('languagesMap')
  }, [localStorage])

  useEffect( () =>
    console.log(viewstate)
  )

  //waiting for firebase call to complete
  if (!polygonData) {
    return (
      <div id="loader-container">
        <div id="loading-animations">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden"></span>
          </div>
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden"></span>
          </div>
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden"></span>
          </div>
          <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden"></span>
          </div>
          <div class="spinner-border text-warning" role="status">
            <span class="visually-hidden"></span>
          </div>
          <div class="spinner-border text-info" role="status">
            <span class="visually-hidden"></span>
          </div>
          <div class="spinner-border text-light" role="status">
            <span class="visually-hidden"></span>
          </div>
          <div class="spinner-border text-dark" role="status">
            <span class="visually-hidden"></span>
          </div>
        </div>
        <div id="loading-text">
          <h1>Loading...</h1>
        </div>
      </div>
    )
  }
  return (
    <div id='mapContainer'>
    <DeckGL
      initialViewState={viewport}
      controller={true}
      ContextProvider={MapContext.Provider}
      layers={polygonData}
    >
      {showPopup && clickInfo && (
        <PopupBox polygonPopupData={clickInfo} togglePopup={togglePopup} />
      )}
      {adminLines === false ? (
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
          auto={true}
          fitBoundsOptions={{maxZoom: 10}}
          onGeolocate={(pos) => {
          setViewstate({
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
          })
        }}
        />
      </div>
      <label
        onClick={() => {
          // setAdminLines(!selectAdminLines)
          console.log('hiiiii! admineLines', adminLines)

          if (adminLines === null || adminLines === false) {
            localStorage.setItem('adminLines', "true")
          } else {
            localStorage.setItem('adminLines', "false")
          }
          console.log('this is local storage admin lines after click---', adminLines)
          // localStorage.setItem("adminLines", "true");
        }}
        className="adminContainer"
      >
        Admin Lines
        <input type="checkbox" />
        <span className="checkmark" />
      </label>
    </DeckGL>
    </div>
  )
}

export default Map
