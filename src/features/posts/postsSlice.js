import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllPosts } from '../../firebase/database';

const initialState = {
  items: [],
  status: 'idle',
  error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await getAllPosts()
  console.log('fetchPosts called, response: ', JSON.stringify(response, null, 2));
  return response
})

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers : {
    postsAdded(state, action) {
      console.log('addPosts dispatched', JSON.stringify(action));
      return action.payload
    },
    singlePostAdded(state, action) {
      state.items.push(action.payload)
    },
    postUpdated(state, action) {
      const { postId, title, content } = action.payload
      console.log(`payload: ${JSON.stringify(action.payload, null, 2)}`);
      const existingPost = state.items.find(post => post.postId === postId)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.items = state.items.concat(action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const { postsAdded, singlePostAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = state => state.posts.items

export const selectPostById = (state, postId) => 
  state.posts.items.find(post => post.postId === postId)