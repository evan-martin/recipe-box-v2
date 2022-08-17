import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useRecipes } from "../hooks/useRecipes";
import { Route, Routes } from "react-router-dom";

const Recipes = () => {
    // const { logout } = useAuth0();

    // const { data, error, isLoaded } = useRecipes();

    // if (!isLoaded) {
    //     return <p>loading...</p>;
    // } else if (error){
    //     return <p>{error}</p>
    // }else {

        return (
            <p>logged in</p>
            // <div>
            //     <div className="home-content">
            //         <button onClick={() => logout({ returnTo: window.location.origin })}> Log Out</button>
            //         <Link to="/user/profile"> <button >Profile</button></Link>
            //         <Link to="/user"> <button >recipes</button></Link>

            //         <Routes>
            //             <Route path="/profile" element={<Profile />} />
            //             <Route path="/" element={<Recipes recipes={data} />} />
            //         </Routes>
            //     </div>
            // </div>
        )
    };
// }

export default withAuthenticationRequired(Recipes, {
    onRedirecting: () => <p>Loading...</p>,
});


