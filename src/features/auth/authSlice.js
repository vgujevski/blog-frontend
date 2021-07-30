import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    userLoggedIn(state, action) {
      return action.payload
    },
    userLoggedOut(state, action) {
      return initialState
    }
  }
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions

export default authSlice.reducer

export const selectLoggedInUser = state => state.auth.user