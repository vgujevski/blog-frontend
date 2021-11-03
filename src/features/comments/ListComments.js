import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { Comment } from "./Comment";
import { selectPostComments } from "./commentsSlice";

export const ListComments = ({ postId }) => {
  const comments = useSelector((state) => selectPostComments(state, postId));
  return (
    <div>
      {comments.map((comment) => (
        <Comment commentId={comment.commentId} />
      ))}
    </div>
  );
};

ListComments.propTypes = {
  postId: PropTypes.string.isRequired,
};
