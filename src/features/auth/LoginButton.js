import React from 'react'
import { useSelector } from 'react-redux'
import { startLogin, startLogout } from './authentication'



export const LoginButton = () => {
  const user = useSelector(state => state.auth.user)

  const handleLoginClick = () => {
    startLogin()
  }

  const handleLogoutClick = () => {
    startLogout()
  }
  const renderButton = () => (
    user ?
      <button className="button btn-main" onClick={handleLogoutClick}>Logout</button>
      :
      <button className="button btn-main" onClick={handleLoginClick}>Login</button>
  )

  return (
    <div>
      {renderButton()}
      {user && <div>Welcome {user.displayName}</div>}
    </div>
  )
}