import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { DateComponent } from './Date'
import { selectPostById } from './postsSlice'
import { CommentsSection } from '../comments/CommentSection'
import { selectLoggedInUser } from '../auth/authSlice'

import { ISOtoDDMMYY } from '../../utility/util'

export const SinglePostPage = ({ match }) => {
  const history = useHistory()
  const { postId } = match.params
  const user = useSelector(state => selectLoggedInUser(state))
  const post = useSelector(state => selectPostById(state, postId))

  const renderEditPostButton = () => {
    console.log(`renderEditPostButton called with, ${JSON.stringify(post, null, 2)}`);
    if (user && user.uid === post.userId) {
      return (
        <button className="button btn-main" onClick={() => history.push(`/editPost/${post.postId}`)}>Edit Post</button>
      )
    }
  }

  if (!post) {
    history.push('/')
  }
  return (
    <div className="content-container">
      <div className="post-container">
        <div className="title-date-container">
          <h3>{post.title}</h3>
          <DateComponent date={post.postedOn} />
        </div>
        <p>{post.content}</p>
        {renderEditPostButton()}
        <PostAuthor author={post.displayName} />
        <div>{ISOtoDDMMYY(post.postedOn)}</div>
        <div>
          <CommentsSection/>
        </div>
      </div>
    </div>
  )
}