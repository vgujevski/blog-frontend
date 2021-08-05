import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { LoadingIndicator } from '../../components/LoadingIndicator'
import { selectAllPosts } from './postsSlice'
import { fetchPosts } from './postsSlice'
import { sortByDateDesc } from '../../utility/util'

export const PostsList = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => !!state.auth.user)
  const posts = useSelector(selectAllPosts)
  const postsStatus = useSelector(state => state.posts.status)
  const postsError = useSelector(state => state.posts.error)
  const history = useHistory()

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postsStatus, dispatch])
  //TODO display message that user has to be authenticated in order to be able to post

  const renderNewPostLink = () => (
    isAuthenticated ? (
      <button className="button btn-main new-post-btn" onClick={() => history.push("/addPost")}>Add new post</button>
    ) : (
      <div></div>
    )
  )

  let content

  if (postsStatus === 'loading') {

    content = <LoadingIndicator />
  } else if (postsStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = sortByDateDesc(posts) 

    content = orderedPosts.map(post => (
      <div className="post-container" key={post.postId}>
        <h3>{post.title}</h3>
        <p className="post-content">{post.content.substring(0, 500)}...</p>
        <button className="button btn-light" onClick={() => history.push(`/posts/${post.postId}`)}>Read more</button>
      </div>
    ))
  } else if (postsStatus === 'failed') {
    content = <div>{postsError}</div>
  }

  return (
    <div className="content-container">
      <div className="posts-list-container">
        {renderNewPostLink()}
        <div>
          {content}
        </div>
      </div>

    </div>
  )
}
