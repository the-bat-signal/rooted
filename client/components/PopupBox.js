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
        const langRef = db.collection('languages')
        const langSnapshot = await langRef.get()
        langSnapshot.forEach((doc) => {
          if (doc.data().name === props.polygonPopupData.layer.id) {
            setLanguage(doc.data())
          }
        })
        // console.log('inside useEffect of PopupBox')
        const vocabRef = db.collection('vocab')
        const vocabSnapshot = await vocabRef.get()
        vocabSnapshot.forEach((doc) => {
          if (doc.id.includes(props.polygonPopupData.layer.id.toLowerCase())) {
            setVocab(doc.data())
            // console.log('this is doc.id', doc.id)
          }
        })
      } catch (err) {
        console.log('error in PopupBox call-----', err)
      }
    }
    lang()
  }, [])

  return (
    <React.Fragment>
      {
        <Popup
          latitude={props.polygonPopupData.coordinate[1]}
          longitude={props.polygonPopupData.coordinate[0]}
          offset={[0, 15]}
          className="poppy"
          onClose={() => {
            props.togglePopup(false)
          }}
          tipSize={20}
        >
          <div id="popuptext">
            <h3>
              {' '}
              {vocab['Hello!']} The language spoken in this region is{' '}
              {language.name}{' '}
            </h3>
            <h3> LAND ACKNOWLEDGEMENT </h3>
            <p>
              <i>
                {' '}
                We encourage you to learn more about this language and the
                Indigenous people on whose territory you are in order to
                responsibly and intentionally take action beyond speaking the
                following land acknowledgement. It should be structured and
                detailed with careful research, community outreach, and
                meaningful.{' '}
              </i>
            </p>
            <p>
              <i>
                {' '}
                A sample land acknowledgement for this territory could be:{' '}
              </i>
            </p>
            <p>
              <h3>
              <b>
                {' '}
                "{vocab['Hello!']} I would like to acknowledge that we are on
                the traditional, ancestral territory of the {language.name}-speaking people. {vocab['Thank you.']}{' '}
              </b>
              </h3>
            </p>
            <h3> CURRENT NATIONS </h3>
            {/* <p><a href>Nation 1</a></p>
            <p><a href>Nation 2</a></p>
            <p><a href>Nation 3</a></p> */}
            <h3> LANGUAGES IN SELECTED AREA </h3>
            <p>
              <Link
                to={{
                  pathname: '/singleLanguage',
                  state: {
                    language,
                    vocab,
                  },
                }}
              >
                {language.name}
              </Link>
            </p>
          </div>
        </Popup>
      }
    </React.Fragment>
  )
}
