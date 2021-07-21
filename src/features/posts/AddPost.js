import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import EditorExample from './Editor'
import { addPost } from '../../firebase/database'

export const AddPost = () => {

	const user = useSelector(state => state.auth.user)
	const history = useHistory()
	const postedOn = new Date()

	const createNewPost = (post) => {
		//console.log(`addPost called with: ${JSON.stringify(post, null, 2)}`);
		const newPost = {
			userId: user.uid,
			displayName: user.displayName,
			content: post,
			postedOn
		}
		addPost(newPost)
		history.push(`/`)
	}

	return (
		<div className="content-container">
			<EditorExample
				onAddPost={createNewPost}
			/>
		</div>
	)
}
