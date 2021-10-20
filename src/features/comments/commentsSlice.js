import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { getAllComments } from "../../firebase/database";

const commentsAdapter = createEntityAdapter({
  selectId: (comment) => comment.commentId
})

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
  const comments = await getAllComments()
  return comments
})

const commentsSlice = createSlice({
  name: 'comments',
  initialState: commentsAdapter.getInitialState(),
  extraReducers: {
    [fetchComments.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      commentsAdapter.upsertMany(state, action.payload)
      
    },
    [fetchComments.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  }
})

export default commentsSlice.reducer