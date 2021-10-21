import React from 'react'

export const AddComment = () => {

  const handleSubmit = () => {
    console.log('submit clicked');
  }

  return(
    <div>
      New Comments from
      <button onClick={handleSubmit}>Save</button>
    </div>
  )
}