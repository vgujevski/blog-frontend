import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    userLoggedIn(state, action) {
      console.log('userLogin dispatched', JSON.stringify(action));
      return action.payload
    },
    userLoggedOut(state, action) {
      console.log('userLogout dispatched');
      return initialState
    }
  }
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions

export default authSlice.reducer

export const selectLoggedInUser = state => state.auth.user