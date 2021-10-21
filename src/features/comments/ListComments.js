import React from 'react'
import PropTypes from 'prop-types'

export const ListComments = ({ postId }) => {
  return(
    <div>
      List of comments for {postId}
    </div>
  )
}

ListComments.propTypes = {
  postId: PropTypes.string.isRequired
}