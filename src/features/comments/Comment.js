import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { DateComponent } from '../posts/Date'

import { selectCommentById } from './commentsSlice'
import { selectUserById } from '../users/usersSlice' 

export const Comment = ({commentId}) => {

  const { author: authorId, commentedOn, content } = useSelector(state => selectCommentById(state, commentId))
  const { displayName } = useSelector(state => selectUserById(state, authorId))

  return (
    <div>
      <h3>{content}</h3>
      <p>by {displayName}</p>
      <DateComponent date={commentedOn}/>
    </div>
  )
}

Comment.propTypes = {
  commentId: PropTypes.string.isRequired
}

