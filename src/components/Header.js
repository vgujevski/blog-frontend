import React from 'react'

import {LoginButton} from '../features/auth/LoginButton'

export const Header = () => {
  return(
    <div className="content-container">
      <div>
        Header
        <LoginButton/>
      </div>
    </div>
  )
}