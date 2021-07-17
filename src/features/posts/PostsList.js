import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const PostsList = () => {

  useEffect(() => {

  })

  const isAuthenticated = useSelector(state => !!state.auth.user)

  //TODO display add post button is user is authenticated
  //TODO display message that user has to be authenticated in order to be able to post

  const renderNewPostLink = () => (
    isAuthenticated ? (
      <Link to="/add-post">Add new post</Link>
    ) : (
        <div></div>
      )
  )
  return (
    <div className="content-container">
      {renderNewPostLink()}
      <div>
        List of blog posts
      </div>
    </div>
  )
}
