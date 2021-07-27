import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../features/auth/authSlice'
import postsReducer from '../features/posts/postsSlice'
import usersSlice from '../features/users/usersSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    users: usersSlice
  }
})