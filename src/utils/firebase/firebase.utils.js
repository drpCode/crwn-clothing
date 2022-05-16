import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB-qzr-JPvO1xD7tG1S_uRQ8p4L72iGoAU",
  authDomain: "crwn-clothing-db-ca839.firebaseapp.com",
  projectId: "crwn-clothing-db-ca839",
  storageBucket: "crwn-clothing-db-ca839.appspot.com",
  messagingSenderId: "651423526009",
  appId: "1:651423526009:web:eb2da4d66a8e61fc10f8a8"
};
  
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()){

    const {displayName, email} = userAuth;
    const createAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }

  }

  return userDocRef;

}
