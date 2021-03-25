import React from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

export const StartPage = () => {
  return (
    <div className="startPage">
      <div className="logo">
        <img src="/images/icons-512.png" />
      </div>
      <div>
        <Link to={'/map'}>
          <Button variant="contained">Start</Button>
        </Link>
      </div>
    </div>
  )
}
