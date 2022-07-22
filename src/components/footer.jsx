import { Link } from "react-router-dom";
import { GitHub } from "@mui/icons-material";
import './component-styles/footer.scss'

function Footer() {
    return (
        <div className="footer">
            <div className="logo">
                <a href="https://github.com/evan-martin/recipe-box" rel="noopener" style={{ textDecoration: "none" }}>
                    <h4>Evan Martin</h4>
                    <GitHub />
                </a>
            </div>
            <Link to="/" style={{ textDecoration: "none" }} >
                <p>About</p>
            </Link>
        </div>
    );
}

export default Footer