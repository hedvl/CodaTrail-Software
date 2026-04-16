/*
  LoginPresenter.jsx

  - Behållit presenter-ansvaret för formulärstate, validering och routing.
  - Flyttat auth-logiken till UserModel så att presentern inte pratar direkt med Firebase.
  - Gjort strukturen mer korrekt enligt MVP.

  - Presentern ska vara en mellanhand mellan View och Model.
  - Det blir enklare att underhålla och bygga vidare med fler funktioner som progress och game sessions.
*/

import { defineComponent, reactive, onMounted } from "vue";
import { LoginView } from "../view/loginView.jsx";
import { useRouter } from "vue-router";
import { UserModel } from "../Model/UserModel.js";

const authState = reactive({
  email: "",
  password: "",
  user: null,
  errorMessage: "",
  successMessage: "",
  emailError: "",
  passwordError: "",
  isLoading: false,
  isSignUpMode: false
});

function checkEmailValidationACB(email) {
  if (!email) return "Email required";
  if (!email.includes("@")) return "Invalid email";
  return "";
}

function checkPasswordValidationACB(password, isSignUp = false) {
  if (!password) return "Password required";
  if (isSignUp && password.length < 6) return "Min 6 chars";
  return "";
}

function clearMessagesACB() {
  authState.errorMessage = "";
  authState.successMessage = "";
  authState.emailError = "";
  authState.passwordError = "";
}

function handleAuthErrorACB(res) {
  authState.isLoading = false;
  authState.errorMessage = res.errorMessage || "Error";
}

export const LoginPresenter = defineComponent({
  name: "LoginPresenter",

  setup() {
    const router = useRouter();

    function handleEmailChangeACB(email) {
      authState.email = email;
      authState.emailError = "";
    }

    function handlePasswordChangeACB(password) {
      authState.password = password;
      authState.passwordError = "";
    }

    function toggleModeACB() {
      authState.isSignUpMode = !authState.isSignUpMode;
      clearMessagesACB();
    }

    async function signInACB() {
      clearMessagesACB();

      const emailError = checkEmailValidationACB(authState.email);
      const passwordError = checkPasswordValidationACB(authState.password);

      if (emailError) {
        authState.emailError = emailError;
        return;
      }

      if (passwordError) {
        authState.passwordError = passwordError;
        return;
      }

      authState.isLoading = true;

      const res = await UserModel.login(authState.email, authState.password);

      if (res.error) {
        handleAuthErrorACB(res);
        return;
      }

      authState.isLoading = false;
      router.push("/home");
    }

    async function signUpACB() {
      clearMessagesACB();

      const emailError = checkEmailValidationACB(authState.email);
      const passwordError = checkPasswordValidationACB(authState.password, true);

      if (emailError) {
        authState.emailError = emailError;
        return;
      }

      if (passwordError) {
        authState.passwordError = passwordError;
        return;
      }

      authState.isLoading = true;

      const res = await UserModel.signup(authState.email, authState.password);

      if (res.error) {
        handleAuthErrorACB(res);
        return;
      }

      authState.isLoading = false;
      router.push("/home");
    }

    async function googleSignInACB() {
      clearMessagesACB();
      authState.isLoading = true;

      const res = await UserModel.googleLogin();

      if (res.error) {
        handleAuthErrorACB(res);
        return;
      }

      authState.isLoading = false;
      router.push("/home");
    }

    async function forgotPasswordACB() {
      clearMessagesACB();

      const emailError = checkEmailValidationACB(authState.email);

      if (emailError) {
        authState.emailError = emailError;
        authState.errorMessage = emailError;
        return;
      }

      authState.isLoading = true;

      const res = await UserModel.resetPassword(authState.email);

      if (res.error) {
        handleAuthErrorACB(res);
        return;
      }

      authState.isLoading = false;
      authState.successMessage = "Reset email sent";
    }

    onMounted(function mountedACB() {
      UserModel.observeAuth(function authListenerACB(user) {
        authState.user = user;

        if (user) {
          router.push("/home");
        }
      });
    });

    return function renderLoginPresenter() {
      return (
        <LoginView
          email={authState.email}
          password={authState.password}
          errorMessage={authState.errorMessage}
          successMessage={authState.successMessage}
          emailError={authState.emailError}
          passwordError={authState.passwordError}
          isLoading={authState.isLoading}
          isSignUpMode={authState.isSignUpMode}
          onEmailChange={handleEmailChangeACB}
          onPasswordChange={handlePasswordChangeACB}
          onSignIn={signInACB}
          onSignUp={signUpACB}
          onGoogleSignIn={googleSignInACB}
          onForgotPassword={forgotPasswordACB}
          onToggleMode={toggleModeACB}
        />
      );
    };
  }
});

export default LoginPresenter;