import React, {useState, useEffect} from 'react'
import {BrushingExtension, FillStyleExtension} from '@deck.gl/extensions';
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
import MapLoader from "./MapLoader"


//global variables
const MAPBOX_ACCESS_TOKEN = ''

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
  function splitter(string) { // making an array with a ' ' (space) for the text layer characterSet
    const array = string.split(' ')
    array.push(' ')
    return array
  }

  function coordinateMaker(coordinates) {
    if (coordinates) { // formatting coordinates for deck.gl polygon layer creation
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
    let x = 0.0;
    let y = 0.0;
    let z = 0.0;

  if (coordinates) {
     for (let i = 0; i < coordinates.length; i++) {
    let latitude = coordinates[i]._lat * Math.PI / 180;
    let longitude = coordinates[i]._long * Math.PI / 180;

    x += Math.cos(latitude) * Math.cos(longitude);
    y += Math.cos(latitude) * Math.sin(longitude);
    z += Math.sin(latitude);
  }

    let total = coordinates.length;

    x = x / total;
    y = y / total;
    z = z / total;

    let centralLongitude = Math.atan2(y, x);
    let centralSquareRoot = Math.sqrt(x * x + y * y);
    let centralLatitude = Math.atan2(z, centralSquareRoot);

    return [centralLongitude * 180 / Math.PI, centralLatitude * 180 / Math.PI]
  } else {
    return [0, 0, 0]
   }
  }

  const colorPicker = (array) => { // random colors for polygons
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  }

  const polygonCreator = (docArray) => {
    let resultsArray = []
    let counter = 0
    // currently rendering only 'pickable' polygons - THANKS DECK.GL
    for (let i = 0; i < docArray.length; i++) {
      resultsArray.push(
         new SolidPolygonLayer({
          id: docArray.length < 1500 ? docArray[i].name : counter++,
          visible: docArray.length < 1500 ? selectLanguageLayer ? true : false : selectTerritoryLayer ? true : false,
          data: coordinateMaker(docArray[i].coordinates),
          // opacity for clickables different than non-clickables
          opacity: i <= 256 ? 0.9 : 0.1,
          getFillColor: docArray.length < 1500 ? i <= 256 ? colorPicker(colorArray) : [192,192,192] : colorPicker(colorArray),
          getPolygon: (d) => d.polygon,
          pickable: docArray.length < 1500 ? true : false,
          onClick: (info) => {
            setClickInfo(info)
            togglePopup(true)
          },
          wireframe: true,
          extruded: true,
          getElevation: docArray[i].speakers ? docArray[i].speakers * 10 : 1
        })
      )
    }
    if (docArray.length > 1500) {
      //adding a text layer for the territories specifically
      const territoryText = new TextLayer({
      id: 'territory-text-layer',
      data: territoryArray,
      pickable: false,
      getPosition: d => centerCoordinate(d.coordinates),
      getText: d => d.name,
      getSize: 8500,
      fontFamily: 'Montserrat, sans-serif',
      getAngle: 0,
      getTextAnchor: 'middle',
      getAlignmentBaseline: 'center',
      visible: selectTerritoryLayer ? true : false,
      sizeUnits: 'meters',
      characterSet: splitter(`  ' ᐁ ᐃ ᐄ ᐅ ᐆ ᐊ ᐋ ᐦ ᐍ ᐏ ᐑ ᐓ ᐕ ᐘ ᐚ ᐗ  ᐤ ᐯ ᐻ ᐱ ᐲ ᐽ ᐿ ᐳ ᐴ ᑁ ᑃ ᐸ ᐹ ᑅ ᑇ ᑊ ᑌ ᑘ ᑎ ᑏ ᑚ ᑜ ᑐ ᑑ ᑞ ᑠ ᑕ ᑖ ᑢ ᑤ ᐟ ᑫ ᑵ ᑭ ᑮ ᑷ ᑹ ᑯ ᑰ ᑻ ᑽ ᑲ ᑳ ᑿ ᒁ ᐠ ᕽ ᒉ ᒓ ᒋ ᒌ ᒕ ᒗ ᒍ ᒎ ᒙ ᒛ ᒐ ᒑ ᒝ ᒟ ᐨ ᒣ ᒭ ᒥ ᒦ ᒯ ᒱ ᒧ ᒨ ᒳ ᒵ ᒪ ᒫ ᒷ ᒹ ᒼ ᓀ ᓊ ᓂ ᓃ ᣇ ᣉ ᓄ ᓅ ᣋ ᣍ ᓇ ᓈ ᓌ ᓈ ᐣ ᓭ ᓷ ᓯ ᓰ ᓹ ᓻ ᓱ ᓲ ᓽ ᓿ ᓴ ᓵ ᔁ ᔃ ᐢ ᔐ ᔘ ᔑ ᔒ ᔚ ᔜ ᔓ ᔔ ᔞ ᔠ ᔕ ᔖ ᔢ ᔤ ᐡ ᔦ ᔰ ᔨ ᔩ ᔲ ᔴ ᔪ ᔫ ᔶ ᔸ ᔭ ᔮ ᔺ ᔼ ᣟ a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z á / é í ( ñ ) ' ū ã ê ó ú - ä Ḱ Ć ï , & ł ᗸ ᒡ ᗲ ᘏ ᑋ ë ų â É ${` `} ɨ  ̱ : 7 Ō ĩ Ɂ ü ą ǫ õ ə ń ś ô š · ʔ Á Ƚ ö ē ā ī ō ᖹ ᐧ ᖾ ʉ ʷ ḍ ⁿ ę ˀ à ì ʌ • č Š ŋ ø ũ .  ̓  ̄ Ā Ñ ı  ̨ è  ̂ ʰ ĺ Ḵ ƚ " [ ] ò β ώ ɫ ḥ θ ‧ ɬ  ̣ Ṉ Ȼ Ã Ä Ó ƛ Ꮳ Ꮃ Ꭻ Ꮺ Ꮨ Ᏹ ᑦ ᔅ ᕀ 𐓏 𐒰 𐓓 𐒷 𐒼 𐓂 𐓊 𐒻 𐓆 𐒿 𐓀 ^ ’ –  ́ ‘  ̀ ʻ ʼ ꞉ ${' '}`)
      })
      resultsArray.push(territoryText)
  }
   return resultsArray
}
  // this is where we grab the data from Firestore to render polygons
  useEffect(() => {
    async function fetch(collectionName, inputArray) {
      const ref = db.collection(collectionName)
      const snapshot = await ref.get({source: 'cache'})
      // .empty returns a boolean for if there are documents in the snapshot or not
      if (!snapshot.empty) {
         snapshot.forEach((doc) => {
        inputArray.push(doc.data())
      })
      } else {
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
        setTerritoryPolygons(polygonCreator(inputArray))
      }
    }
    fetch('languagesMap', languageArray)
    fetch('territories', territoryArray)
  }, [selectLanguageLayer, selectTerritoryLayer])

  // using local storage to set state for toggling layers
  useEffect(() => {
    const adminLines = JSON.parse(localStorage.getItem('adminLines'));
    setAdminLines(adminLines)
    const languages = JSON.parse(localStorage.getItem('languages'));
    setLanguageLayer(languages);
    const territories = JSON.parse(localStorage.getItem('territories'));
    setTerritoryLayer(territories);
  }, [])
  //setting auto on geolocate to true once, then it will remain off
  useEffect(() => {
    setGeolocate(true)
  }, [])

  // loader page while waiting for firebase call to complete
  if (!territoryPolygons) {
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
      layers={[languagePolygons, territoryPolygons]}
      onViewStateChange={(pos) => {
        setViewport(pos.viewState)
      }}
      width='100%'
      height='100%'
      style={{marginTop: '5em'}}
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
        <FullscreenControl
        />
      <MapToggles selectAdminLines={selectAdminLines} setAdminLines={setAdminLines} selectLanguageLayer={selectLanguageLayer} setLanguageLayer={setLanguageLayer} selectTerritoryLayer={selectTerritoryLayer} setTerritoryLayer={setTerritoryLayer}/>
      </div>

    </DeckGL>
    </div>
  )
}

export default Map
