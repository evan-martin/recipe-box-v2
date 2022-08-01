import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './component-styles/footer.scss'

function Footer() {
    return (
        <div className="footer">
            <div className="logo">
                <p>Evan Martin:</p>
                <a href="https://www.evan-martin.dev" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <AccountCircleIcon />
                </a>
                <a href="https://github.com/evan-martin/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <GitHubIcon />
                </a>
                <a href="https://www.linkedin.com/in/evan-martin-2a4ba5225/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <LinkedInIcon />
                </a>
            </div>
            <Link to="/" style={{ textDecoration: "none" }} >
                <p>Recipe Box</p>
            </Link>
        </div>
    );
}

export default Footer