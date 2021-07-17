import React from 'react'

import {LoginButton} from '../features/auth/LoginButton'

export const Header = () => {
  return(
    <div className="header">
      <div className="content-container" >
        Header
        <LoginButton/>
      </div>
    </div>
  )
}