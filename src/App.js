import React from 'react'
import { useDispatch } from 'react-redux'

import { AppRouter } from './routers/AppRouter'
import { firebase } from './firebase/config'
import { userLoggedIn, userLoggedOut } from './features/auth/authSlice'

export const App = () => {
  const dispatch = useDispatch()
  firebase.auth().onAuthStateChanged((result) => {
    if (result) {
      console.log('user logged in', JSON.stringify(result, null, 2));
      dispatch(userLoggedIn({ payload: result.uid }))
    } else {
      console.log('user logged out');
      dispatch(userLoggedOut())
    }
  })

  return (
    <AppRouter />
  )
}