import { firebase, googleAuthProvider } from '../../firebase/config'

const startLogin = () => {
  firebase.auth().signInWithPopup(googleAuthProvider)
}

const startLogout =  () => {
  
}

export {
  startLogin,
  startLogout
}