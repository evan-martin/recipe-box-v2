import { Link } from "react-router-dom";
// import { ReactComponent as RecipeBoxIcon } from "../assets/recipe-box-icon.svg";
import MenuDrawer from "./menu-drawer";
import './component-styles/header.scss'
import UserDropdown from "./user-dropdown";

function Header({ switchTheme }) {

  return (

    <div className="header">
      <Link className="logo" to="/recipes" style={{ textDecoration: "none" }}>

        {/* <p>RB</p> */}
        {/* <p>Home</p> */}
        <h1>Recipe Box</h1>
        {/* <RecipeBoxIcon className="recipe-box-icon" /> */}
      </Link>
      {/* <h1>Recipe Box</h1> */}
      <div className="menu">
        <UserDropdown />
        <div className='menu-icon'>
          <MenuDrawer switchTheme={switchTheme} />
        </div>
      </div>
    </div>
  );
}

export default Header