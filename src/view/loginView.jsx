export function LoginView(props) {

    function accountWithEmailACB(event) {
        props.onEmailChange(event.target.value);
    }

    function passwordForEmailACB(event) {
        props.onPasswordChange(event.target.value);
    }

    function handleMainActionACB() {
        if (props.isSignUpMode) {
            props.onSignUp();
        } else {
            props.onSignIn();
        }
    }

    return (
        <div className="auth-wrap">
            <div className="activity-wrap">
                <div className="form">
                    <div className="form-card auth-card">

                        <h2 className="auth-title">
                            {props.isSignUpMode ? "Create" : "Sign "}
                            <span>{props.isSignUpMode ? " account" : "in"}</span>
                        </h2>

                        <p className="auth-subtitle">
                            {props.isSignUpMode
                                ? "Create an account to start"
                                : "Sign in to continue"}
                        </p>

                        {props.errorMessage && (
                            <div className="error-message">{props.errorMessage}</div>
                        )}

                        {props.successMessage && (
                            <div className="success-message">{props.successMessage}</div>
                        )}

                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={props.email || ""}
                                onInput={accountWithEmailACB}
                                className={props.emailError ? "input-error" : ""}
                            />
                            {props.emailError && (
                                <span className="field-error">{props.emailError}</span>
                            )}
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={props.password || ""}
                                onInput={passwordForEmailACB}
                                className={props.passwordError ? "input-error" : ""}
                            />
                            {props.passwordError && (
                                <span className="field-error">{props.passwordError}</span>
                            )}
                        </div>

                        <button
                            className="auth-button primary"
                            onClick={handleMainActionACB}
                            disabled={props.isLoading}
                        >
                            {props.isLoading
                                ? "Loading..."
                                : props.isSignUpMode
                                    ? "Sign Up"
                                    : "Sign In"}
                        </button>

                        <button
                            className="auth-button"
                            onClick={props.onGoogleSignIn}
                            disabled={props.isLoading}
                        >
                            Sign In with Google
                        </button>

                        <button
                            className="auth-button"
                            onClick={props.onForgotPassword}
                            disabled={props.isLoading}
                        >
                            Reset Password
                        </button>

                        <div className="auth-links">
                            <a
                                href="#"
                                onClick={function (e) {
                                    e.preventDefault();
                                    props.onToggleMode();
                                }}
                                className="link"
                            >
                                {props.isSignUpMode
                                    ? "Already have an account? Sign In"
                                    : "Don't have an account? Sign Up"}
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}