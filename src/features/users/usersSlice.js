import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers } from "../../firebase/database";

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {;
  const users = await getAllUsers()
  return users
}) 

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      return action.payload
    }
  }
})

export default usersSlice.reducer