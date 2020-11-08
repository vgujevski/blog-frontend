import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startLogin, startLogout } from './authentication'



export const LoginButton = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)
  const onClickHandler = () => {
    console.log('Login/Logout clicked.');
    startLogin()
  }

  return (
    <div>
      <button onClick={onClickHandler}>Login/Logout</button>
    </div>
  )
}