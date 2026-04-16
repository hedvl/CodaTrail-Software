/*
  UserModel.js

  - Skapat en modell för all användarrelaterad logik.
  - Flyttat auth-anrop bort från presentern så att MVP-strukturen blir renare.
  - Samlat login, signup, Google-login, logout, password reset och auth-listener i ett ställe.

  - Presentern ska bara hantera användarflöde och koppla View till Model.
  - Om vi senare byter auth-lösning eller lägger till mer logik, behöver vi främst ändra här.
*/

import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  sendPasswordReset,
  signOutUser,
  initAuthListener
} from "../firebase/firebaseAuth.js";

export const UserModel = {
  async login(email, password) {
    return await signInWithEmail(email, password);
  },

  async signup(email, password) {
    return await signUpWithEmail(email, password);
  },

  async googleLogin() {
    return await signInWithGoogle();
  },

  async resetPassword(email) {
    return await sendPasswordReset(email);
  },

  async logout() {
    return await signOutUser();
  },

  observeAuth(callback) {
    return initAuthListener(callback);
  }
};

export default UserModel;