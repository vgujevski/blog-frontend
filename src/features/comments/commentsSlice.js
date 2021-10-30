import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
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
      //state.status = 'succeeded'
      commentsAdapter.upsertMany(state, action.payload)
    },
    [fetchComments.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [saveComment.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      commentsAdapter.addOne(state, action.payload)
      console.log(JSON.stringify(action.payload, null, 2));
    }
  }
})

export default commentsSlice.reducer

export const {
  selectAll: selectAllComments,
  selectById: selectCommentById,
  selectIds: selectCommentIds,
} = commentsAdapter.getSelectors((state) => state.comments)

export const selectPostComments = createSelector(
  [selectAllComments, (state, postId) => postId],
  (comments, postId) => comments.filter((comment) => comment.postId === postId)
)


