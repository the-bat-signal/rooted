import React from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

const startButtonStyle = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 70px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
}

export const StartPage = () => {
  return (
    <div className="startPage">
      <img src="/images/icons-512.png" />
      <br />
      <div className="whatever">
        <Link to={'/map'}>
          <Button style={startButtonStyle}>Start</Button>
        </Link>
      </div>
    </div>
  )
}
