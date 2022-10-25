import { Link } from "react-router-dom";
import MenuDrawer from "./menu-drawer";
import UserDropdown from "./user-dropdown";
import './component-styles/header.scss'

function Header() {

  return (

    <div className="header">
      <Link className="logo" to="/recipes" style={{ textDecoration: "none" }}>
        <h1>Recipe Box</h1>
      </Link>
      <div className="menu">
        <UserDropdown />
        <div className='menu-icon'>
          <MenuDrawer />
        </div>
      </div>
    </div>
  );
}

export default Header