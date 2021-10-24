import React from 'react'
import { AddComment } from './AddComment'
import { ListComments } from './ListComments'

export const CommentsSection = () => {
  return(
    <div>
      <AddComment/>
      <ListComments/>
    </div>
  )
}