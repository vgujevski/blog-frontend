import * as firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDRtLtfDEgIUOwaLRXwsWsWW6adkgLVsL4",
  authDomain: "blog-i-2e93b.firebaseapp.com",
  databaseURL: "https://blog-i-2e93b.firebaseio.com",
  projectId: "blog-i-2e93b",
  storageBucket: "blog-i-2e93b.appspot.com",
  messagingSenderId: "143817251846",
  appId: "1:143817251846:web:d1474dd47cfff369d53787",
  measurementId: "G-QJFFS6V3G5"
};

firebase.initializeApp(firebaseConfig)
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
  firebase,
  googleAuthProvider
}