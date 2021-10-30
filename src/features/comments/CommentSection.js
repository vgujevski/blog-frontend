import React from 'react'
import { AddComment } from './AddComment'
import { ListComments } from './ListComments'

export const CommentsSection = ({postId}) => {
  return(
    <div>
      <AddComment postId={postId}/>
      <ListComments postId={postId}/>
    </div>
  )
}