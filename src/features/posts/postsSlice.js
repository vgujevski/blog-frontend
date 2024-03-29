import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllPosts, addPost, updatePost, deletePost } from '../../firebase/database';


const initialState = {
  items: [],
  status: 'idle',
  error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const posts = await getAllPosts()
  return posts
})

export const addNewPost = createAsyncThunk('posts/addPost', async (newPost) => {
  addPost(newPost)
  return newPost
})

export const editPost = createAsyncThunk('posts/updatePost', async (post) => {
  updatePost(post)
  return post
})

export const removePost = createAsyncThunk('posts/removePost', async (postId) => {
  deletePost(postId)
  return postId
})

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
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
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.items.push(action.payload)
    },
    [editPost.fulfilled]: (state, action) => {
      const { postId, title, content } = action.payload
      console.log(`payload: ${JSON.stringify(action.payload, null, 2)}`);
      const existingPost = state.items.find(post => post.postId === postId)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    [removePost.fulfilled]: (state, action) => {
      console.log('removePost call fulfilled', action.payload);
      const postId = action.payload
      state.items = state.items.filter(post => post.postId !== postId)
    }
  }
})

export const { postsAdded, singlePostAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = state => state.posts.items

export const selectPostById = (state, postId) =>
  state.posts.items.find(post => post.postId === postId)