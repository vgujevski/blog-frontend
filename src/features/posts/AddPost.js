import React, { useState, useEffect } from 'react'

import EditorExample from './Editor'

export const AddPost = () => {

	const addPost = (post) => {
		console.log(`addPost called with: ${JSON.stringify(post, null, 2)}`);
	}

	return (
		<div className="content-container">
			<EditorExample
				onAddPost={addPost}
			/>
		</div>
	)
}
