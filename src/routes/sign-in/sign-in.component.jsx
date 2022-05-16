import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {

  useEffect(() => {
    async function myFuction() {
      const response = await getRedirectResult(auth);
      if(response){
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    }
    myFuction();
  }, []);

  const logGooglePopupUser = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGooglePopupUser}>
        Sign in with Google Popup
      </button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button>
    </div>
  );
}

export default SignIn;