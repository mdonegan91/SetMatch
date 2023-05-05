import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAtCkKud2p4RwsoSCKno8_dUWNikbfNJrc",
  authDomain: "setmatch-1eb90.firebaseapp.com",
  databaseURL: "https://setmatch-1eb90-default-rtdb.firebaseio.com",
});


export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

const base = Rebase.createClass(firebaseApp.database());

export const signInWithGoogle = () => auth.signInWithPopup(provider);

// named export
export { firebaseApp };

// default export
export default base;