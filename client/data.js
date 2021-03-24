/// app.js
import React, {useState} from 'react'
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
import {style} from './style'
import {data} from './coordinates'
// import Popup from 'react-js-popup'

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

const Data = () => {
  // adding an additional destructured useState because the value is empty
  // currently causing an error saying that it cannot be destructured because it's not iterable?
  const [clickInfo, setClickInfo] = useState();

  const [viewport, setViewport] = useState({
    latitude: 44.952261122619916,
    longitude: -93.29339647810357,
    width: '100wh',
    height: '100vh',
    zoom: 2
  })

  const [selectAdminLines, setAdminLines] = useState(false)

  // this creates a solid polygon layer that will render on top of the map
  const solidPolygonLayer = [
    new SolidPolygonLayer({
    id: 'solid-polygon',
    data: data,
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
         <div style={{position: 'absolute', zIndex: 1, pointerEvents: 'none', left: clickInfo.x, top: clickInfo.y}}>
          { clickInfo.object.message }
        </div>
      )}
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
