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
      <button onClick={handleLogoutClick}>Logout</button>
      :
      <button onClick={handleLoginClick}>Login</button>
  )

  return (
    <div>
      {renderButton()}
      {user && <div>Welcome {user.displayName}</div>}
    </div>
  )
}