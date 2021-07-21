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

const getAllPosts = () => {
  //TODO implement
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

