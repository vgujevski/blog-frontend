import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllPosts } from '../../firebase/database';

const initialState = []

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await getAllPosts()
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
      state.push(action.payload)
    },
    postUpdated(state, action) {
      const { postId, title, content } = action.payload
      console.log(`payload: ${JSON.stringify(action.payload, null, 2)}`);
      const existingPost = state.find(post => post.postId === postId)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }
  }
})

export const { postsAdded, singlePostAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = state => state.posts

export const selectPostById = (state, postId) => 
  state.posts.find(post => post.postId === postId)