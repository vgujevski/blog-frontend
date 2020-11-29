import { firebase, googleAuthProvider } from '../../firebase/config'

const startLogin = () => {
  console.log('startLogin called');
  firebase.auth().signInWithPopup(googleAuthProvider)
}

const startLogout =  () => {
  console.log('startLogout called');
  firebase.auth().signOut().then(function(){
    console.log('sign-out successful');
  }).catch(function(error) {
    console.log('an error durinf sign-out process: ', error);
  })
}

export {
  startLogin,
  startLogout
}