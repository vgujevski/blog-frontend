import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectAllPosts } from './postsSlice'

export const PostsList = () => {
  const isAuthenticated = useSelector(state => !!state.auth.user)
  const posts = useSelector(selectAllPosts)

  //TODO display add post button when user is authenticated
  //TODO display message that user has to be authenticated in order to be able to post

  const renderNewPostLink = () => (
    isAuthenticated ? (
      <Link to="/addPost">Add new post</Link>
    ) : (
      <div></div>
    )
  )

  const renderPosts = posts.map(post => (
    <div className="post-excerpt" key={post.postId}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.postId}`}>
        View Post
      </Link>
    </div>
  ))
  return (
    <div className="content-container">
      {renderNewPostLink()}
      <div>
        List of blog posts
        {renderPosts}
      </div>
    </div>
  )
}
