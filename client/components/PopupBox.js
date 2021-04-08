import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {db} from '../../server/firebase'
import {Popup} from 'react-map-gl'

export const PopupBox = (props) => {
  const [language, setLanguage] = useState({})
  const [territory, setTerritory] = useState({})
  const [vocab, setVocab] = useState({})
  // const [showPopup, togglePopup] = useState(true);

  // remove async await
  useEffect(() => {
    const lang = async () => {
      try {
        const langRef = db.collection('languagesMap')
        const langSnapshot = await langRef.get({source: 'server'})
        if (!langSnapshot.empty) {
          langSnapshot.forEach((doc) => {
          if (doc.data().name === props.polygonPopupData.layer.id) {
            setLanguage(doc.data())
          }
        })
        } else {
         const newLangSnapshot = await langRef.get({source: 'server'})
        newLangSnapshot.forEach((doc) => {
          if (doc.data().name === props.polygonPopupData.layer.id) {
            setLanguage(doc.data())
          }
        })
      }
        const vocabRef = db.collection('vocab')
        const vocabSnapshot = await vocabRef.get({source: 'cache'})
        if (!vocabSnapshot.empty) {
           vocabSnapshot.forEach((doc) => {
          if (doc.id.includes(props.polygonPopupData.layer.id.toLowerCase())) {
            setVocab(doc.data())
          }
        });
        } else {
       const newVocabSnapshot = await vocabRef.get({source: 'server'})
         newVocabSnapshot.forEach((doc) => {
          if (doc.id.includes(props.polygonPopupData.layer.id.toLowerCase())) {
            setVocab(doc.data())

          }
        });
        }
      } catch (err) {
        console.log('error in PopupBox call-----', err)
      }
    }
    lang()
  }, [props.polygonPopupData])


  return (
    <React.Fragment>
      {
        <Popup
          latitude={props.polygonPopupData.coordinate[1]}
          longitude={props.polygonPopupData.coordinate[0]}
          offset={[0, 15]}
          className="poppy"
          dynamicPosition={true}
          captureScroll={true}
          onClose={() => {
            props.togglePopup(false)
          }}
          tipSize={20}
        >
          <div id="popuptext">
            <h3 id="popupHeader">
              {' '}
              <span style={{color: "#ab5cfa"}}>{vocab['Hello!']}</span> The language spoken in this region is{' '}
              {language.name}{' '}
            </h3>
            <h2><b> LAND ACKNOWLEDGEMENT </b></h2>
            <p>
              <i id='popupPara1'>
                {' '}
                We encourage you to learn more about this language and the
                Indigenous people on whose territory you are in order to
                responsibly and intentionally take action beyond speaking the
                following land acknowledgement. It should be structured and
                detailed with careful research, community outreach, and
                meaningful.{' '}
              </i >
            </p>
            <p>
              <i id='popupPara2'>
                {' '}
                A sample land acknowledgement for this territory could be:{' '}
              </i>
            </p>
              <h3 id='landAck'>
                  {' '}
                  "<span style={{color: "#ab5cfa"}}>{vocab['Hello!']}</span> I would like to acknowledge that we are on
                  the traditional, ancestral territory of the {language.name}-speaking people. <span style={{color: "#ab5cfa"}}>{vocab['Thank you.']}</span>"
              </h3>
            {vocab['Hello!'] ?
            <div>
            <h2><b> LANGUAGES IN SELECTED AREA </b></h2>
            <p>
              <Link id='languageLink'
                to={{
                  pathname: `/language/${language.name}`,
                }}
              >
                {language.name}
              </Link>
            </p>
            </div> : <div></div>}
          </div>
        </Popup>
      }
    </React.Fragment>
  )
}
