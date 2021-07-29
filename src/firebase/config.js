import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import firebaseConfig from '../firebase-vars'

firebase.initializeApp(firebaseConfig)
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

const database = firebase.firestore()

export {
  firebase,
  googleAuthProvider,
  database
}