import React from 'react'
import { useSelector } from 'react-redux'

export const PostAuthor = ({ author }) => {
  

  return <span>by {author ? author : 'Unknown author'}</span>
}