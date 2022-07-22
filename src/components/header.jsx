import { Link } from "react-router-dom";
import { ReactComponent as RecipeBoxIcon } from "../assets/recipe-box-icon.svg";
import MenuDrawer from "./menu-drawer";
import './component-styles/header.scss'

function Header() {

    return (
        <div className="header">
            <div className="logo">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <h1>RB</h1>
                </Link>
                <RecipeBoxIcon className="recipe-box-icon" />
            </div>
            <div className="menu">
                <MenuDrawer />
            </div>
        </div>
    );

}

export default Header