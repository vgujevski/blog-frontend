import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { DateComponent } from '../posts/Date'

import { selectCommentById } from './commentsSlice'
import { selectUserById } from '../users/usersSlice'
import { selectLoggedInUser } from '../auth/authSlice'

export const Comment = ({ commentId }) => {

  const { author: authorId, commentedOn, content } = useSelector(state => selectCommentById(state, commentId))
  const { displayName } = useSelector(state => selectUserById(state, authorId))
  const loggedInUser = useSelector(selectLoggedInUser)

  const onDeleteClicked = () => {
    alert('delete clicked')
  }

  const renderDeleteButton = () => {
    if (loggedInUser && loggedInUser.uid === authorId) {
      return (
        <button className="button btn-main" onClick={onDeleteClicked}>Delete Comment</button>
      )
    }
  }

  return (
    <div>
      <h3>{content}</h3>
      <p>by {displayName}</p>
      <DateComponent date={commentedOn} />
      {renderDeleteButton()}
    </div>
  )
}

Comment.propTypes = {
  commentId: PropTypes.string.isRequired
}

