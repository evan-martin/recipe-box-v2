import { Auth0Client } from '@auth0/auth0-spa-js';

// import './login.css'

export default function Login() {

    const auth0 = new Auth0Client({
        domain: "dev-nja38y1c.us.auth0.com",
        client_id: "5vuSMlI9fy3PrkcCNuZHoHLu3GltPI3g"
    });

    const handleClick = async () => {

        await auth0.loginWithPopup();
        window.location.href = "/recipes";
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


