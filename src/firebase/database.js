import { database } from "../firebase/config";

const POSTS = "posts";
const USERS = "users";
const COMMENTS = "comments";

export const addPost = async (post) => {
  console.log("addPost Database called ", JSON.stringify(post, null, 2));

  const docRef = await database.collection(POSTS).doc(post.postId).set(post);
  return docRef;
};

const findPostById = () => {
  //TODO implement
};

export const getAllPosts = async () => {
  console.log("getAllPosts called");

  const snapshot = await database.collection(POSTS).get();
  const posts = snapshot.docs.map((doc) => {
    return { postId: doc.id, ...doc.data() };
  });

  return posts;
};

// const getAllPostsByAuthor = () => {
//   //TODO implement
// }

export const updatePost = async (post) => {
  const docRef = await database.collection(POSTS).doc(post.postId).update({
    title: post.title,
    content: post.content,
  });
  return docRef;
};

export const deletePost = async (postId) => {
  await database.collection(POSTS).doc(postId).delete();
};

// Authors

export const getAllUsers = async () => {
  console.log("getAllPosts called");

  const snapshot = await database.collection(USERS).get();
  const users = snapshot.docs.map((doc) => {
    return { userId: doc.id, ...doc.data() };
  });

  return users;
};

// Comments

export const findCommentById = async (id) => {
  //const snapshot = await database.collection(COMMENTS).doc(id).get
};

export const addComment = async (comment) => {
  await database.collection(COMMENTS).doc(comment.commentId).set(comment);
  return comment;
};

export const getAllComments = async () => {
  const snapshot = await database.collection(COMMENTS).get();
  const comments = snapshot.docs.map((doc) => {
    return { commentId: doc.id, ...doc.data() };
  });
  return comments;
};

export const deleteComment = async (commentId) => {
  database.collection(COMMENTS).doc(commentId).delete();
};

export const updateComment = async (comment) => {
  const commentRef = database.collection(COMMENTS).doc(comment.commentId);
  commentRef.update(comment);
};
