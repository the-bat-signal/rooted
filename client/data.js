/// app.js
import React from 'react'
import DeckGL from '@deck.gl/react'
import {LineLayer} from '@deck.gl/layers'
import {StaticMap} from 'react-map-gl'
import {HexagonLayer} from '@deck.gl/aggregation-layers'

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

// Data to be used by the LineLayer
const data = [
  {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
]

class Data extends React.Component {
  d = {
    COORDINATES: [-122.42177834, 37.78346622]
  }
  layers = [
    new LineLayer({id: 'line-layer', data}),
    new HexagonLayer({
      id: 'hexagon-layer',
      data:
        'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-bike-parking.json',
      pickable: true,
      extruded: true,
      radius: 200,
      elevationScale: 4,
      getPosition: d => d.COORDINATES
    })
  ]
  render() {
    return (
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={this.layers}
      >
        <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
      </DeckGL>
    )
  }
}

export default Data
