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
    console.log('props from popup---------', props)
    const lang = async () => {
      try {
        const langRef = db.collection('languagesMap')
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
        });
        // props.setAdminLines(!!props.selectAdminLines)
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
          onClose={() => {
            props.togglePopup(false)
            // props.setAdminLines(!!props.selectAdminLines)

          }}
          tipSize={20}
        >
          <div id="popuptext">
            <h3 id="popupHeader">
              {' '}
              {vocab['Hello!']} The language spoken in this region is{' '}
              {language.name}{' '}
            </h3>
            <br />
            <h2><b> LAND ACKNOWLEDGEMENT </b></h2>
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
              <h3 id='landAck'>
                  {' '}
                  "{vocab['Hello!']} I would like to acknowledge that we are on
                  the traditional, ancestral territory of the {language.name}-speaking people. {vocab['Thank you.']}"
                  <br />
              </h3>
              <br/>
            {/* only conditionally render the Current Nations if there are links to the current nations in the database for this language */}
            <h2> <b>CURRENT NATIONS </b></h2>
            {/* <p><a href>Nation 1</a></p>
            <p><a href>Nation 2</a></p>
            <p><a href>Nation 3</a></p> */}
            <h2><b> LANGUAGES IN SELECTED AREA </b></h2>
            {/* links to language */}
            <p>
              <Link
                to={{
                  pathname: `${language.name}`,
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
