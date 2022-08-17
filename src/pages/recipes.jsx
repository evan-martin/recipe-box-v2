import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useRecipes } from "../hooks/useRecipes";
import { Route, Routes } from "react-router-dom";

const Recipes = () => {
    const { logout } = useAuth0();

    const { data, error, isLoaded } = useRecipes();

    if (!isLoaded) {
        return <p>loading...</p>;
    } else if (error){
        return <p>{error}</p>
    }else {
        return (
            <div>
                <div className="home-content">
                    <h1>{data.name}</h1>
                    <button onClick={() => logout({ returnTo: window.location.origin })}> Log Out</button>

                    <Routes>
                        <Route path="/" element={<></>} />
                    </Routes>
                </div>
            </div>
        )
    };
}

export default withAuthenticationRequired(Recipes, {
    onRedirecting: () => <p>Redirect Loading...</p>,
});


