import { Link } from "react-router-dom";
import { ReactComponent as RecipeBoxIcon } from "../assets/recipe-box-icon.svg";
import MenuDrawer from "./menu-drawer";
import './component-styles/header.scss'
import { useAuth0 } from "@auth0/auth0-react";

function Header( {switchTheme} ) {
    const {isAuthenticated} = useAuth0();

    return (

        <div className="header">
                    {console.log(isAuthenticated)}
                <Link className="logo" to="/recipes" style={{ textDecoration: "none" }}>
                    <RecipeBoxIcon className="recipe-box-icon" />
                    <h1>RB</h1>
                </Link>
            <div className="menu">
              {isAuthenticated && (
                <MenuDrawer switchTheme={switchTheme} />
              )}
            </div>
        </div>
    );
}

export default Header