
const functions = require("firebase-functions");
const admin = require("firebase-admin");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

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
