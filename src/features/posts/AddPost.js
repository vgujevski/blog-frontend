import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import { AddPostForm } from './AddPostForm'
import { addNewPost } from './postsSlice'
//import { singlePostAdded } from './postsSlice'

export const AddPost = () => {

	const user = useSelector(state => state.auth.user)
	const history = useHistory()
  const dispatch = useDispatch()

	const postedOn = new Date().toString()

	const savePost = (post) => {
		const newPost = {
			postId: uuid(),
			userId: user.uid,
			displayName: user.displayName,
			title: post.title,
			content: post.content,
			postedOn
		}
		dispatch(addNewPost(newPost))
		history.push(`/`)
	}

	return (
		<div className="content-container">
			<AddPostForm onSavePost={savePost}/>
		</div>
	)
}
