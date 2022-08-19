import { useAuth0 } from "@auth0/auth0-react";

import './page-styles/login.scss'

export default function Login() {
    const { loginWithRedirect } = useAuth0();

    return (
        <div className="login">
            <div className="login-content-wrapper">
                <h1 className="title">Recipe Box</h1>
                <button onClick={() => loginWithRedirect()} className="login-button"> Log In</button>
                <p onClick={() => loginWithRedirect({ screen_hint: 'signup' })} className="signup-button">Sign Up</p>
            </div>
        </div>
    )
}


