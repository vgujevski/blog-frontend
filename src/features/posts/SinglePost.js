import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { selectPostById } from './postsSlice'
import { selectLoggedInUser } from '../auth/authSlice'

// TODO display Edit button is logged in user is the post author
export const SinglePostPage = ({ match }) => {
  const { postId } = match.params
  const user = useSelector(state => selectLoggedInUser(state))

  const post = useSelector(state => selectPostById(state, postId))

  const renderEditPostButton = () => {
    console.log(`renderEditPostButton called with, ${JSON.stringify(post, null, 2)}`);
    if(user.uid === post.userId){
      return (
        <Link to={`/editPost/${post.postId}`}>
          Edit Post
        </Link>
      )
    }
  }

  if (!post) {
    return (
      <div>
        <h2>Post not found!</h2>
      </div>
    )
  }
  return (
    <div className="content-container">
      <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        {renderEditPostButton()}
        <PostAuthor author={post.displayName}/>
      </div>
    </div>
  )
}