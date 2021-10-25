import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { selectPostComments } from './commentsSlice'

export const ListComments = ({ postId }) => {

  const comments = useSelector(state => selectPostComments(state, postId))
  return(
    <div>
      {JSON.stringify(comments, null, 2)}
      List of comments for {postId}
    </div>
  )
}

ListComments.propTypes = {
  postId: PropTypes.string.isRequired
}