# Blog Front-end

Example Blog application created using React.js, Redux Toolkit and Firebase

## Features
- Authentication with Google account
- Create, Edit or Delete Posts.

## Installation

You will need to provide your own firebase config file. 
 - create firebase-vars.js file in src/ directory.
 - Follow process described on firebase documentation [page](https://firebase.google.com/docs/web/setup?authuser=0) to get config object

```
// contents of firebase-vars.js
const firebaseVars = {
  apiKey: "YOUR_apiKey",
  authDomain: "YOUR_authDomain",
  databaseURL: "YOUR_databaseURL",
  projectId: "YOUR_projectId",
  storageBucket: "YOUR_storageBucket",
  messagingSenderId: "YOUR_messagingSenderId",
  appId: "YOUR_appId",
  measurementId: "YOUR_measurementId"
}
export default firebaseVars
```
- npm install
- npm start
