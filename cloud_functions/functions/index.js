/* eslint-disable linebreak-style */
const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.addNewUserToDatabase = functions.auth.user().onCreate((user) => {
  admin.initializeApp();
  const newUser = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    comments: [],
  };

  admin.firestore().collection("users").doc(user.uid).set(newUser)
      .then((result) => {
        functions.logger.info("new user", JSON.stringify(user, null, 2));
        functions.logger.info(result);
      });
});

exports.addNewComment = functions.firestore
    .document("comments/{commentId}")
    .onCreate((snapshot, context) => {
      admin.initializeApp();
      const newComment = snapshot.data();

      // add commentId to posts/{postId}/comments
      admin.firestore()
          .collection("posts")
          .doc(newComment.postId)
          .update({
            comments:
          admin.firestore.FieldValue.arrayUnion(newComment.commentId),
          })
          .then((res) => functions.logger.info(res))
          .catch((error) => {
            functions.logger.info(error);
          });
      // add commentId to users/{autorId}/comments
      admin.firestore()
          .collection("users")
          .doc(newComment.author)
          .update({
            comments:
          admin.firestore.FieldValue.arrayUnion(newComment.commentId),
          })
          .then((res) => functions.logger.info(res))
          .catch((error) => {
            functions.logger.info(error);
          });
    });

exports.deleteComment = functions.firestore
    .document("comments/{commentId}")
    .onDelete((snapshot, context) => {
      admin.initializeApp();
      const deletedComment = snapshot.data();
      // remove commentId from posts/{postId}/comments
      admin.firestore()
          .collection("posts")
          .doc(deletedComment.postId)
          .update({
            comments:
          admin.firestore.FieldValue.arrayRemove(deletedComment.commentId),
          })
          .then((res) => functions.logger.info(res))
          .catch((error) => {
            functions.logger.info(error);
          });
      // remove commentId from users/{userId}/comments
      admin.firestore()
          .collection("users")
          .doc(deletedComment.author)
          .update({
            comments:
            admin.firestore.FieldValue.arrayRemove(deletedComment.commentId),
          })
          .then((res) => functions.logger.info(res))
          .catch((error) => {
            functions.logger.info(error);
          });
    });
