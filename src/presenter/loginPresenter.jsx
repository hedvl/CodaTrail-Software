import { defineComponent, reactive, onMounted } from "vue";
import { LoginView } from "../view/loginView.jsx";
import { useRouter } from "vue-router";

import {
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    sendPasswordReset,
    initAuthListener
} from "../firebase/firebaseAuth.js";

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

function handleAuthErrorACB(err) {
    authState.isLoading = false;
    authState.errorMessage = err.errorMessage || "Error";
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

        function signInACB() {
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

            signInWithEmail(authState.email, authState.password)
                .then(function (res) {
                    if (res.error) {
                        handleAuthErrorACB(res);
                        return;
                    }

                    authState.isLoading = false;
                    router.push("/home");
                });
        }

        function signUpACB() {
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

            signUpWithEmail(authState.email, authState.password)
                .then(function (res) {
                    if (res.error) {
                        handleAuthErrorACB(res);
                        return;
                    }

                    authState.isLoading = false;
                    router.push("/home");
                });
        }

        function googleSignInACB() {
            clearMessagesACB();
            authState.isLoading = true;

            signInWithGoogle()
                .then(function (res) {
                    if (res.error) {
                        handleAuthErrorACB(res);
                        return;
                    }

                    authState.isLoading = false;
                    router.push("/home");
                });
        }

        function forgotPasswordACB() {
            clearMessagesACB();

            const emailError = checkEmailValidationACB(authState.email);

            if (emailError) {
                authState.emailError = emailError;
                authState.errorMessage = emailError;
                return;
            }

            authState.isLoading = true;

            sendPasswordReset(authState.email)
                .then(function (res) {
                    if (res.error) {
                        handleAuthErrorACB(res);
                        return;
                    }

                    authState.isLoading = false;
                    authState.successMessage = "Reset email sent";
                });
        }

        onMounted(function () {
            initAuthListener(function (user) {
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