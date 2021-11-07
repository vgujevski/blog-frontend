import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { PostAuthor } from "./PostAuthor";
import { DateComponent } from "./Date";
import { selectPostById } from "./postsSlice";
import { CommentsSection } from "../comments/CommentSection";
import { selectLoggedInUser } from "../auth/authSlice";

import { ISOtoDDMMYY } from "../../utility/util";

export const SinglePostPage = ({ match }) => {
  const history = useHistory();
  const { postId } = match.params;
  const user = useSelector((state) => selectLoggedInUser(state));
  const post = useSelector((state) => selectPostById(state, postId));

  const renderEditPostButton = () => {
    if (user && user.uid === post.userId) {
      return (
        <button
          className="button btn-main"
          onClick={() => history.push(`/editPost/${post.postId}`)}
        >
          Edit Post
        </button>
      );
    }
  };

  if (!post) {
    history.push("/");
  }
  return (
    <div className="content-container">
      <div className="post-container">
        <div className="title-container">
          <h3 className="title">{post.title}</h3>
          <div className="date-author-container">
            <DateComponent className="date" date={post.postedOn} />
            <PostAuthor author={post.displayName} />
          </div>
        </div>
        <p>{post.content}</p>
        {renderEditPostButton()}
        <div>
          <CommentsSection postId={postId} />
        </div>
      </div>
    </div>
  );
};
