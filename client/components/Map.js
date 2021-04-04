import React, {useState, useEffect} from 'react'
import {BrushingExtension, FillStyleExtension} from '@deck.gl/extensions';
import DeckGL from '@deck.gl/react'
import {
  StaticMap,
  MapContext,
  NavigationControl,
  GeolocateControl,
} from 'react-map-gl'
import {SolidPolygonLayer, TextLayer} from '@deck.gl/layers'
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
  const [selectTerritoryLayer, setTerritoryLayer] = useState(true)
  const [languagePolygons, setLanguagePolygons] = useState()
  const [territoryPolygons, setTerritoryPolygons] = useState()
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

  const colorArray = [
    [190, 231, 176], // tea green
    [50, 147, 111], // illuminating emerald
    [122, 132, 80], // moss green
    [62, 25, 41], // dark purple
    [255, 112, 115], // light coral
    [245, 192, 0], // golden poppy
    [5, 29, 35], // dark jungle green
    //newly added
    [12, 116, 137], // teal blue
    [179, 194, 242], // lavender blue
    [229, 75, 75], // imperial red
    [249, 223, 116], // jasmine
  ]



  // helper functions

  function splitter(string) {
    const array = string.split(' ')
    array.push(' ')
    return array
  }

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

  const colorPicker = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  }

  const polygonCreator = (docArray) => {
    let resultsArray = []
    let counter = 0
    let counterTwo = 2000
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
    if (docArray.length > 1500) {
    const territoryText = new TextLayer({
    id: 'territory-text-layer',
    data: territoryArray,
    pickable: false,
    getPosition: d => centerCoordinate(d.coordinates),
    getText: d => d.name,
    getSize: 7500,
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
      // if something is not rendering, change this to server for one render, then it should be available from cache
      const snapshot = await ref.get({source: 'cache'})
      snapshot.forEach((doc) => {
        inputArray.push(doc.data())
      })
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
      layers={[languagePolygons, territoryPolygons]} // we may have to combine both states into one large array to pass into layers
      onViewStateChange={(pos) => {
        setViewport(pos.viewState)
      }}

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
          auto={false}
          fitBoundsOptions={{maxZoom: 6}}
        />
      <MapToggles selectAdminLines={selectAdminLines} setAdminLines={setAdminLines} selectLanguageLayer={selectLanguageLayer} setLanguageLayer={setLanguageLayer} selectTerritoryLayer={selectTerritoryLayer} setTerritoryLayer={setTerritoryLayer}/>
      </div>

    </DeckGL>
    </div>
  )
}

export default Map
