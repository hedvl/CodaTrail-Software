import { onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
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
    onError
    //sätt isLoggedin = true; för conditional rendering
  );

// signOut(auth).then(...).catch(...)
export const signOutUser = () =>
  auth.signOut()
    .then(() => ({ user: null }))
    .catch((error) => ({
      error,
      errorCode: error.code,
      errorMessage: error.message,
    }));

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
