import React, { useState } from 'react'

export const AddPostForm = ({ onSavePost }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)

  const handleSavePost = () => {
    console.log('_handleAddPost called');
    onSavePost({ title, content })
  }

  return (
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
        <button type="button" className="button btn-main" onClick={handleSavePost}>
          Save Post
        </button>
      </form>
    </div>
  )
}