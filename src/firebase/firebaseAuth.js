import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from "./firebase.js";

// Formatterar Firebase user till ett enklare objekt
export const formatUser = (fbUser) => {
  if (!fbUser) return null;
  return {
    uid: fbUser.uid,
    email: fbUser.email,
    displayName: fbUser.displayName,
    photoURL: fbUser.photoURL,
  };
};

// onAuthStateChanged(auth, ...) → returnerar unsubscribe
export const initAuthListener = (onChange, onError) =>
  onAuthStateChanged(
    auth,
    (fbUser) => onChange(formatUser(fbUser)),
    (error) => {
      if (onError) onError(error);
    }
  );


  // Log in with mail

export const signInWithEmail = (email,password) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((result) => ({
      user: formatUser(result.user)
    }))
    .catch((error) => ({
      error,
      errorCode: error.code,
      errorMessage: error.message
    }));

// create account with mail
export const signUpWithEmail = (email,password) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((result) => ({
      user: formatUser(result.user)
    }))
    .catch((error) => ({
      error,
      errorCode: error.code,
      errorMessage: error.message
    }));

// log in with Google
export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => ({
      user: formatUser(result.user)
    }))
    .catch((error) => ({
      error,
      errorCode: error.code,
      errorMessage: error.message
    }));
}
  

// log out
export const signOutUser = () =>
  signOut(auth)
    .then(() => ({ user: null }))
    .catch((error) => ({
      error,
      errorCode: error.code,
      errorMessage: error.message,
    }));

// send reset mail
export const sendPasswordReset = (email) =>
  sendPasswordResetEmail(auth, email)
    .then(() => ({ success: true }))
    .catch((error) => ({
      error,
      errorCode: error.code,
      errorMessage: error.message,
    }
)
);
