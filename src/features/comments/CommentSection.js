import React, { useState } from "react";
import { AddComment } from "./AddComment";
import { ListComments } from "./ListComments";

export const CommentsSection = ({ postId }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const onExpandClicked = () => {
    setIsCollapsed(!isCollapsed);
  };

  const expand = () => {
    return isCollapsed ? "expandable collapsed" : "expandable expanded";
  };

  return (
    <div>
      <div className={expand()}>
        <AddComment className={expand()} postId={postId} />
      </div>
      <button onClick={onExpandClicked}>click</button>
      <ListComments postId={postId} />
    </div>
  );
};
