import React from 'react'
import { useHistory } from 'react-router'

export const PostExcerpt = ({post}) => {
  const history = useHistory()
  return (
    <div className="post-container" key={post.postId}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 500)}...</p>
      <button className="button btn-light" onClick={() => history.push(`/posts/${post.postId}`)}>Read more</button>
    </div>
  )
}