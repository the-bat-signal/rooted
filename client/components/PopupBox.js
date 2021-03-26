import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {db} from '../../server/firebase'
import {Popup} from 'react-map-gl'

export const PopupBox = (props) => {
  const [language, setLanguage] = useState({})
  const [territory, setTerritory] = useState({})
  const [vocab, setVocab] = useState({})
  const [showPopup, togglePopup] = useState(true);

    // remove async await
  useEffect(() => {
    const lang = async () => {
      try {
        const data = await db.collection("languages").doc('cherokee').get();
        setLanguage(data.data())
        console.log('inside useEffect')
      } catch (err) {
        console.log('error in SingleLanguage call-----', err)
      }
    }
    lang();
  }, [])

  return (
    <React.Fragment>
    {showPopup && (
    <Popup
      latitude={props.polygonPopupData.coordinate[1]}
      longitude={props.polygonPopupData.coordinate[0]}
      offset={[0, 15]}
      className='poppy'
      onClose={() => {
        togglePopup(false);
      }}
      >
        <div id="popuptext">
          <h1> Hau! The language spoken in this region is {language.name}. </h1>
          <h2> LAND ACKNOWLEDGEMENT </h2>
            <p><i> We encourage you to learn more about this language and the Indigenous people on whose territory you are in order to responsibly and intentionally take action beyond speaking the following land acknowledgement. It should be structured and detailed with careful research, community outreach, and meaningful. </i></p>
            <p><i> A sample land acknowledgement for this territory could be: </i></p>
            <p><b> "Hau/Haŋ. I would like to acknowledge that we are on the traditional, ancestral territory of the Očhéthi Šakówiŋ. Pidamayayapi ye/do." </b></p>
          <h2> CURRENT NATIONS </h2>
            {/* <p><a href>Nation 1</a></p>
            <p><a href>Nation 2</a></p>
            <p><a href>Nation 3</a></p> */}
          <h2> LANGUAGES IN SELECTED AREA </h2>
            <p><Link to="/singleLanguage"> {language.name} </Link> </p>
          <p><button> LEARN THE LANGUAGE </button></p>
        </div>
      </Popup>
    )}
    </React.Fragment>
  )
}
