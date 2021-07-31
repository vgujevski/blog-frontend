import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { postUpdated } from './postsSlice'
import { selectPostById } from './postsSlice'

export const EditPostForm = ({ match }) => {
  const { postId } = match.params

  const post = useSelector(state => selectPostById(state, postId))


  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const dispatch = useDispatch()
  const history = useHistory()

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      const updatedPost = { postId, title, content }
      console.log('onSavePostClicked', JSON.stringify(updatedPost, null, 2));
      dispatch(postUpdated(updatedPost))
      history.push(`/posts/${postId}`)
    }
  }

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
          <button type="button" className="button btn-main" onClick={onSavePostClicked}>
            Save Post
          </button>
        </form>
      </div>
    </div>
  )
}