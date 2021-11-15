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

import iconModify from "../../images/outline_edit_note_white_36dp.png";
import iconEdit from "../../images/outline_mode_edit_white_36dp.png";
import iconClose from "../../images/outline_close_white_36dp.png";
import iconDone from "../../images/outline_done_white_36dp.png";
import iconDelete from "../../images/outline_delete_white_36dp.png";

export const Comment = ({ commentId }) => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    onDropdownClicked(isDropdownOpen);
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

  const onDropdownClicked = (isOpen) => {
    setIsDropdownOpen(!isOpen);
  };

  // const renderEditMenuButton = () => {
  //   if (loggedInUser && loggedInUser.uid === authorId) {
  //     return (
  //       <div class="dropdown">
  //         <img
  //           onClick={() => onDropdownClicked(isDropdownOpen)}
  //           className="icon-button"
  //           src={iconEdit}
  //           alt="edit icon"
  //         />
  //         <div
  //           id="myDropdown"
  //           className={
  //             isDropdownOpen ? "dropdown-content show" : "dropdown-content"
  //           }
  //         >
  //           <img
  //             onClick={onDeleteClicked}
  //             className="icon-button"
  //             src={iconDelete}
  //             alt="delete icon"
  //           />
  //           <img
  //             onClick={onEditClicked}
  //             className="icon-button"
  //             src={iconEdit}
  //             alt="edit icon"
  //           />
  //         </div>
  //       </div>
  //     );
  //   }
  // };

  const renderEditMenuButton = () => {
    if (loggedInUser && loggedInUser.uid === authorId) {
      return (
        <div class="edit-menu">
          <img
            onClick={() => onDropdownClicked(isDropdownOpen)}
            className="icon-button"
            src={iconEdit}
            alt="edit icon"
          />
          <div
            className={isDropdownOpen ? "menu-content show" : "menu-content"}
          >
            <img
              onClick={onDeleteClicked}
              className="icon-button"
              src={iconDelete}
              alt="delete icon"
            />
            <img
              onClick={onEditClicked}
              className="icon-button"
              src={iconEdit}
              alt="edit icon"
            />
          </div>
        </div>
      );
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
        <div className="edit-menu-button-container">
          {renderEditMenuButton()}
        </div>
      </div>
      {isEditable ? (
        <div>
          <input
            onChange={(e) => setEditableContent(e.target.value)}
            value={editableContent}
          />
          <img
            onClick={onSaveEditClicked}
            className="icon-button"
            src={iconDone}
            alt="done icon"
          />
          <img
            onClick={onCancelEditClicked}
            className="icon-button"
            src={iconClose}
            alt="cancel edit icon"
          />
        </div>
      ) : (
        <p>{content}</p>
      )}

      {
        //renderDeleteEditButtons()
      }
      {renderConfirmationModal()}
    </div>
  );
};

Comment.propTypes = {
  commentId: PropTypes.string.isRequired,
};
