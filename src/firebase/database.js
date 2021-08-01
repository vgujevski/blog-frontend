import { database } from '../firebase/config'

const POSTS = 'posts'
const USERS = 'users'

export const addPost = async (post) => {
  console.log('addPost Database called ', JSON.stringify(post, null, 2));

  const docRef = await database.collection(POSTS).doc(post.postId).set(post)
  return docRef
}

const findPostById = () => {
  //TODO implement
}

export const  getAllPosts = async () => {
  console.log('getAllPosts called');

  const snapshot = await database.collection(POSTS).get()
  const posts = snapshot.docs.map(doc => {
    return {postId: doc.id, ...doc.data()}
  })

  return posts
}

// const getAllPostsByAuthor = () => {
//   //TODO implement
// }

export const updatePost = async (post) => {
  const docRef = await database.collection(POSTS).doc(post.postId).update({
    title: post.title,
    content: post.content
  })
  return docRef
  //TODO implement
}

// const deletePost = () => {
//   //TODO implement
// }

// Authors

export const getAllUsers = async () => {
  console.log('getAllPosts called');

  const snapshot = await database.collection(USERS).get()
  const users = snapshot.docs.map(doc => {
    return {userId: doc.id, ...doc.data()}
  })

  return users
}

