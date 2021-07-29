import React from 'react'

export const PostAuthor = ({ author }) => {
  

  return <span>by {author ? author : 'Unknown author'}</span>
}