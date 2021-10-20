import React from 'react'
import { useDispatch } from 'react-redux'

import { AppRouter } from './routers/AppRouter'
import { firebase } from './firebase/config'
import { userLoggedIn, userLoggedOut } from './features/auth/authSlice'
import { fetchUsers } from './features/users/usersSlice'
import { fetchComments } from './features/comments/commentsSlice'

export const App = () => {
  const dispatch = useDispatch()
  firebase.auth().onAuthStateChanged((result) => {
    if (result) {
      const user = {
        uid: result.uid,
        displayName: result.displayName
      }
      dispatch(userLoggedIn({ user }))
    } else {
      console.log('user logged out');
      dispatch(userLoggedOut())
    }
  })

  dispatch(fetchUsers())
  dispatch(fetchComments())

  return (
    <AppRouter />
  )
}