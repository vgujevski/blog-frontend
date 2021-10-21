import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { getAllComments, addComment } from "../../firebase/database";

const commentsAdapter = createEntityAdapter({
  selectId: (comment) => comment.commentId
})

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
  const comments = await getAllComments()
  return comments
})

export const saveComment = createAsyncThunk('comments/addComment', async (newComment) => {
  const comment = await addComment(newComment)
  return comment
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
    [saveComment.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      commentsAdapter.addOne(action.payload)
    }
  }
})

export default commentsSlice.reducer