import React from 'react'
import { Link } from 'react-router-dom'

import {LoginButton} from '../features/auth/LoginButton'

export const Header = () => {
  return(
    <div className="header">
      <div className="content-container" >
        <LoginButton/>
        <div>
            <Link to="/">Posts</Link>
          </div>
      </div>
    </div>
  )
}