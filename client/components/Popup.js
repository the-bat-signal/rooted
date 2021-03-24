import React from 'react'

export const Popup = (props) => {
  return (
    <div style={{position: 'absolute', zIndex: 1, pointerEvents:  'none', left: props.polygonData.x, top: props.polygonData.y, cursor: 'pointer'}}>
      <div>{props.polygonData.object.message}</div>
    </div>)
}
