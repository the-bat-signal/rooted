import React, { useEffect }  from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import LogoSVG from './LogoSVG'
import anime from "animejs";


export const StartPage = () => {

  const animate = () => {
    anime.timeline({loop: false})
    .add({
      duration: 1500,
    })
    .add({
      targets: "#mainLogo #letters",
      delay: 500,
      opacity: [{ value: [0, 1], duration: 1200, easing: "easeOutQuad" }],
    })
    .add({
      targets: "#mainLogo #roots .st4",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 1750,
      color: "#ff3d00",
    })
    .add({
      targets: "#mission",
      delay: 500,
      opacity: [{ value: [0, 1], duration: 1200, easing: "easeOutQuad" }],
      // color: "#ff3d00",
    })
    .add({
      targets: ".startPageButton",
      opacity: [{ value: [0, 1], duration: 1200, easing: "easeOutQuad" }],
      // color: "#ff3d00",
    })
  }

  useEffect(() => {
  animate();
  }, []);

  return (
    <div className="startPage">
      {/* <div> */}
       {/* <img id="logo" src="/images/rooted-06.png" /> */}
       <LogoSVG />
       {/* </div> */}
      <br />
            <div id='mission'>
        Promote, preserve, and protect Indigenous languages and cultures,
        <br/>based on the user’s location
      </div>
      <div className="whatever">
        <Link to={'/map'} style={{ textDecoration: 'none' }}>
          <Button className='startPageButton' >Start</Button>
        </Link>
      </div>

    </div>
  )
}


// style="enable-background:new 0 0 430.62 184.98;" xmlSpace="preserve"
