import { Link } from "react-router-dom";
import { ReactComponent as RecipeBoxIcon } from "../assets/recipe-box-icon.svg";
import MenuDrawer from "./menu-drawer";
import './component-styles/header.scss'

function Header() {

    return (
        <div className="header">
                <Link className="logo" to="/" style={{ textDecoration: "none" }}>
                    <RecipeBoxIcon className="recipe-box-icon" />
                    <h1>RB</h1>
                </Link>
            <div className="menu">
                <MenuDrawer />
            </div>
        </div>
    );
}

export default Header