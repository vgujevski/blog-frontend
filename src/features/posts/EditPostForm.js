import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Modal from "react-modal";

import { selectPostById } from "./postsSlice";
import { editPost, removePost } from "./postsSlice";

// TODO add form validation
// TODO display confirmation modal when delete post button is clicked
export const EditPostForm = ({ match }) => {
  const { postId } = match.params;

  const post = useSelector((state) => selectPostById(state, postId));

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      const updatedPost = { postId, title, content };
      console.log("onSavePostClicked", JSON.stringify(updatedPost, null, 2));
      dispatch(editPost(updatedPost));
      history.push(`/posts/${postId}`);
    }
  };

  const onDeletePostClicked = () => {
    setModalIsOpen(true);
  };

  const deletePost = () => {
    handleCloseModal();
    dispatch(removePost(postId));
    history.push("/");
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="content-container">
      <div className="form-container">
        <form className="input-container">
          <div>
            <label htmlFor="postTitle">Title:</label>
            <input
              type="text"
              id="postTitle"
              name="postTitle"
              value={title}
              onChange={onTitleChanged}
            />
          </div>
          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
            placeholder="tell me your story"
            cols="50"
            rows="20"
          />
        </form>
        <div className="button-container">
          <button
            type="button"
            className="button btn-main"
            onClick={onSavePostClicked}
          >
            Save Post
          </button>
          <button className="button btn-main" onClick={onDeletePostClicked}>
            Delete Post
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        closeTimeoutMS={200}
        className="modal"
      >
        <div className="modal-container">
          <div className="modal-title">Confirm</div>
          <div className="modal-body">
            This post will be permanently deleted.
          </div>
          <div className="modal-button-container">
            <button className="button btn-main" onClick={deletePost}>
              Delete Post
            </button>
            <button className="button btn-light" onClick={handleCloseModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
