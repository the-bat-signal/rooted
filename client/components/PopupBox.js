import React, {useState} from 'react'
// import Popup from 'reactjs-popup'
// import 'reactjs-popup/dist/index.css';
import {Link} from 'react-router-dom'
// import {db} from '../../server/firebase'
import {Popup} from 'react-map-gl'

export const PopupBox = (props) => {
  // const [language, setLanguage] = useState({})
  // const [territory, setTerritory] = useState({})
  const [showPopup, togglePopup] = useState(true);

  return (
    <React.Fragment>
    {showPopup && (
    <Popup
      latitude={props.polygonData.coordinate[1]}
      longitude={props.polygonData.coordinate[0]}
      onClose={() => {
        togglePopup(false);
      }}
      width='100px'
      height='100px'
      >
        <div id="popuptext">
          <h1> Hau! The language spoken in this region is Dakota. </h1>
          <h2> LAND ACKNOWLEDGEMENT </h2>
            <p><i> We encourage you to learn more about this language and the Indigenous people on whose territory you are in order to responsibly and intentionally take action beyond speaking the following land acknowledgement. It should be structured and detailed with careful research, community outreach, and meaningful. </i></p>
            <p><i> A sample land acknowledgement for this territory could be: </i></p>
            <p><b> "Hau/Haŋ. I would like to acknowledge that we are on the traditional, ancestral territory of the Očhéthi Šakówiŋ. Pidamayayapi ye/do." </b></p>
          <h2> CURRENT NATIONS </h2>
            {/* <p><a href>Nation 1</a></p>
            <p><a href>Nation 2</a></p>
            <p><a href>Nation 3</a></p> */}
          <h2> LANGUAGES IN SELECTED AREA </h2>
            {/* <p><Link>Language 1</Link></p>
            <p><Link>Language 2</Link></p>
            <p><Link>Language 3</Link></p> */}
          <p><button> LEARN THE LANGUAGE </button></p>
        </div>
      </Popup>
    )}
    </React.Fragment>
  )

  // return (
    // <div style={{position: 'absolute', zIndex: 1, pointerEvents: 'none', left: props.polygonData.x, top: props.polygonData.y}}>
      // <div id="popuptext">

    //     </div>
    // </div>
  // )
}
