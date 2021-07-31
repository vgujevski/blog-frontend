import React from 'react'
import { Link } from 'react-router-dom'

import { LoginButton } from '../features/auth/LoginButton'
import homeLogo from '../images/home_logo_white_48dp.png'

export const Navbar = () => {

  return (
    <div className="content-container">
      <div className="navbar">
        <Link to="/"><img className="logo" src={homeLogo} alt="home"/></Link>
        <LoginButton />
      </div>
    </div>
  )
}