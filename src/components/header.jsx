import { Link } from "react-router-dom";
import { ReactComponent as RecipeBoxIcon } from "../assets/recipe-box-icon.svg";
import MenuDrawer from "./menu-drawer";
import './component-styles/header.scss'
import { useAuth0 } from "@auth0/auth0-react";
import UserDropdown from "./user-dropdown";

function Header({ switchTheme }) {
  const { isAuthenticated } = useAuth0();

  return (

    <div className="header">
      <Link className="logo" to="/recipes" style={{ textDecoration: "none" }}>
        {/* <RecipeBoxIcon className="recipe-box-icon" /> */}
        {/* <p>RB</p> */}
        {/* <p>Home</p> */}
        <h1>Recipe Box</h1>
      </Link>
      {/* <h1>Recipe Box</h1> */}
      <div className="menu">
        <UserDropdown />
        <MenuDrawer switchTheme={switchTheme} />
      </div>
    </div>
  );
}

export default Header