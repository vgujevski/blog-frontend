import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { LoadingIndicator } from '../../components/LoadingIndicator'
import { selectAllPosts } from './postsSlice'
import { fetchPosts } from './postsSlice'

export const PostsList = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => !!state.auth.user)
  const posts = useSelector(selectAllPosts)
  const postsStatus = useSelector(state => state.posts.status)
  const postsError = useSelector(state => state.posts.error)

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postsStatus, dispatch])
  //TODO display message that user has to be authenticated in order to be able to post

  const renderNewPostLink = () => (
    isAuthenticated ? (
      <Link to="/addPost">Add new post</Link>
    ) : (
      <div></div>
    )
  )
  
  let content

  if (postsStatus === 'loading') {

    content = <LoadingIndicator/>
  } else if (postsStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      // .slice()
      // .sort((a, b) => b.postedOn.toISOString().localeCompare(a.postedOn.toISOString()))

    content = orderedPosts.map(post => (
      <div className="post-excerpt" key={post.postId}>
        <h3>{post.title}</h3>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <Link to={`/posts/${post.postId}`}>
          View Post
        </Link>
      </div>
    ))
  } else if (postsStatus === 'failed') {
    content = <div>{postsError}</div>
  }


  // const renderPosts = posts.map(post => {
  //   if (postsStatus === 'loading') {
  //     return (
  //       <LoadingIndicator/>
  //     )
  //   } else if (postsStatus === 'succeeded') {
  //     return (
  //       <div className="post-excerpt" key={post.postId}>
  //         <h3>{post.title}</h3>
  //         <p className="post-content">{post.content.substring(0, 100)}</p>
  //         <Link to={`/posts/${post.postId}`}>
  //           View Post
  //         </Link>
  //       </div>
  //     )
  //   } else if (postsStatus === 'failed') {
  //     return (
  //       <div>{postsError}</div>
  //     )
  //   }

  // })

  // const renderPosts = posts.map(post => (
  //   <div className="post-excerpt" key={post.postId}>
  //     <h3>{post.title}</h3>
  //     <p className="post-content">{post.content.substring(0, 100)}</p>
  //     <Link to={`/posts/${post.postId}`}>
  //       View Post
  //     </Link>
  //   </div>
  // ))
  return (
    <div className="content-container">
      {renderNewPostLink()}
      <div>
        {content}
      </div>
    </div>
  )
}
