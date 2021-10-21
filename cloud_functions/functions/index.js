const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.addNewUserToDatabase = functions.auth.user().onCreate((user) => {
  admin.initializeApp();
  const newUser = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
  };
  admin.firestore().collection("users").add(newUser).then((result) => {
    functions.logger.info("new user", JSON.stringify(user, null, 2));
    functions.logger.info(result);
  });
});

exports.addNewComment = functions.firestore
    .document("comments/{commentId}")
    .onCreate((comment) => {
      functions.logger.info("new comment", JSON.stringify(comment, null, 2));
    });
