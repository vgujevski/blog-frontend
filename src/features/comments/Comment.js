import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import ReactTimeAgo from "react-time-ago";

import Modal from "react-modal";
import { deleteCommentById } from "./commentsSlice";
import { editComment } from "./commentsSlice";
import { selectCommentById } from "./commentsSlice";
import { selectUserById } from "../users/usersSlice";
import { selectLoggedInUser } from "../auth/authSlice";

export const Comment = ({ commentId }) => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const {
    author: authorId,
    commentedOn,
    content,
  } = useSelector((state) => selectCommentById(state, commentId));
  const { displayName } = useSelector((state) =>
    selectUserById(state, authorId)
  );
  const loggedInUser = useSelector(selectLoggedInUser);
  const [editableContent, setEditableContent] = useState(content);

  const onDeleteClicked = () => {
    setModalIsOpen(true);
  };

  const onEditClicked = () => {
    setIsEditable(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const deleteComment = () => {
    dispatch(deleteCommentById(commentId));
    handleCloseModal();
  };

  const onCancelEditClicked = () => {
    setIsEditable(false);
  };

  const onSaveEditClicked = () => {
    dispatch(
      editComment({
        commentId,
        content: editableContent,
        isEdited: true,
        editedOn: new Date().toString(),
      })
    );
    setIsEditable(false);
  };

  const renderDeleteEditButtons = () => {
    if (loggedInUser && loggedInUser.uid === authorId) {
      if (isEditable) {
        return (
          <div>
            <button className="button btn-main" onClick={onCancelEditClicked}>
              Cancel
            </button>
            <button className="button btn-main" onClick={onSaveEditClicked}>
              Save
            </button>
          </div>
        );
      } else {
        return (
          <div>
            <button className="button btn-main" onClick={onDeleteClicked}>
              Delete
            </button>
            <button className="button btn-main" onClick={onEditClicked}>
              Edit
            </button>
          </div>
        );
      }
    }
  };

  const renderConfirmationModal = () => (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      closeTimeoutMS={200}
      className="modal"
    >
      <div className="modal-container">
        <div className="modal-title">Confirm</div>
        <div className="modal-body">
          This comment will be permanently deleted.
        </div>
        <div className="modal-button-container">
          <button className="button btn-main" onClick={deleteComment}>
            Delete Comment
          </button>
          <button className="button btn-light" onClick={handleCloseModal}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );

  return (
    <div className="comment">
      <div className="name-date-container">
        <div className="username">{displayName}</div>
        <div className="dot" />
        <ReactTimeAgo date={commentedOn} locale="en-US" />
      </div>
      {isEditable ? (
        <input
          onChange={(e) => setEditableContent(e.target.value)}
          value={editableContent}
        />
      ) : (
        <p>{content}</p>
      )}

      {renderDeleteEditButtons()}
      {renderConfirmationModal()}
    </div>
  );
};

Comment.propTypes = {
  commentId: PropTypes.string.isRequired,
};
