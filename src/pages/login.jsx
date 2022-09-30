import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material"

import './page-styles/login.scss'

export default function Login() {
    const { loginWithRedirect } = useAuth0();

    return (
        <div className="login">
            <div className="login-content-wrapper">
                <h1 className="title">Recipe Box</h1>
                <Button onClick={() => loginWithRedirect()} variant="contained" color="primary" size="large" sx={{width:250}}> Log In</Button>
                <p onClick={() => loginWithRedirect({ screen_hint: 'signup' })} className="signup-button">Sign Up</p>
            </div>
        </div>
    )
}


