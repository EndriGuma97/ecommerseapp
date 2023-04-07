import { initializeApp } from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { 
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA8vKgpSbwZ4CP1exhXNKPE01SvitEnpSk",
    authDomain: "crwn-clthng-db-896f3.firebaseapp.com",
    projectId: "crwn-clthng-db-896f3",
    storageBucket: "crwn-clthng-db-896f3.appspot.com",
    messagingSenderId: "313209013883",
    appId: "1:313209013883:web:c45dc42767b8265b8b04de"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => { return signInWithPopup(auth, provider) };

  export const db = getFirestore();

 export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    
    //if user data does not exist
    //create / set the document with the data from userAuth in my collection
    if(!userSnapshot.exists()) {
      const {displayName, email } = userAuth;
      const createdAt = new Date();
try {
  await setDoc(userDocRef, {
    displayName,
    email,
    createdAt
  });
} catch (error) {
  console.log('error creating the user', error.message)
}

    }
    

    //if user data exists
    //return userDocRef

    return userDocRef;

  }

