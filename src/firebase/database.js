import { database } from '../firebase/config'

const POSTS = 'posts'

export const addPost = (post) => {
  console.log('addPost Database called ', JSON.stringify(post, null, 2));

  database.collection(POSTS).add(post)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
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
  console.log(JSON.stringify(posts, null, 2));
  return posts
}

const getAllPostsByAuthor = () => {
  //TODO implement
}

const editPost = () => {
  //TODO implement
}

const deletePost = () => {
  //TODO implement
}

