import { useAuth0 } from "@auth0/auth0-react";

// import './login.css'

export default function Login() {


    const { loginWithRedirect } = useAuth0();

    const handleClick = async () => {
        await loginWithRedirect();
    }

    return (
        <div className="login">
            <div className="login-content-wrapper">
                <h1 className="title">Recipe Box</h1>
                <button onClick={() => handleClick()} className="login-button"> Log In</button>
            </div>
        </div>
    )
}


