import React from 'react'
import { AddComment } from './AddComment'
import { ListComments } from './ListComments'

export const CommentsSection = ({postId}) => {
  return(
    <div>
      <AddComment/>
      <ListComments postId={postId}/>
    </div>
  )
}