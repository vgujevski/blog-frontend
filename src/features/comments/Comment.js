import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { DateComponent } from '../posts/Date'
import Modal from 'react-modal'

import { deleteCommentById } from './commentsSlice'
import { selectCommentById } from './commentsSlice'
import { selectUserById } from '../users/usersSlice'
import { selectLoggedInUser } from '../auth/authSlice'

export const Comment = ({ commentId }) => {

  const dispatch = useDispatch()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { author: authorId, commentedOn, content } = useSelector(state => selectCommentById(state, commentId))
  const { displayName } = useSelector(state => selectUserById(state, authorId))
  const loggedInUser = useSelector(selectLoggedInUser)

  const onDeleteClicked = () => {
    setModalIsOpen(true)
  }

  const handleCloseModal = () => {
    setModalIsOpen(false)
  }

  const deleteComment = () => {
    dispatch(deleteCommentById(commentId))
    handleCloseModal()
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

      <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      closeTimeoutMS={200}
      className="modal">

      <div className="modal-container">
        <div className="modal-title">Confirm</div>
        <div className="modal-body">This comment will be permanently deleted.</div>
        <div className="modal-button-container">
          <button className="button btn-main" onClick={deleteComment}>Delete Comment</button>
          <button className="button btn-light" onClick={handleCloseModal}>Cancel</button>
        </div>
      </div>

    </Modal>
    </div>
  )
}

Comment.propTypes = {
  commentId: PropTypes.string.isRequired
}

