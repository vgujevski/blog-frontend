import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { selectPostById } from './postsSlice'
import { selectLoggedInUser } from '../auth/authSlice'

import { ISOtoDDMMYY } from '../../utility/util'

// TODO display Edit button is logged in user is the post author
export const SinglePostPage = ({ match }) => {
  const history = useHistory()
  const { postId } = match.params
  const user = useSelector(state => selectLoggedInUser(state))
  const post = useSelector(state => selectPostById(state, postId))

  const renderEditPostButton = () => {
    console.log(`renderEditPostButton called with, ${JSON.stringify(post, null, 2)}`);
    if(user && user.uid === post.userId){
      return (
        <button className="button btn-main" onClick={() => history.push(`/editPost/${post.postId}`)}>Edit Post</button>
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
      <div className="post-container">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        {renderEditPostButton()}
        <PostAuthor author={post.displayName}/>
        <div>{ISOtoDDMMYY(post.postedOn)}</div>
      </div>
    </div>
  )
}