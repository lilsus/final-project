import {Link} from "react-router-dom";
import logo from "./logo.png";

export const Header = () => {
    return (
        <header className="header">
            <div className="player"></div>
            <Link to="/">
                <img className="logo" src={logo}/>
            </Link>
            <div className="header-nav">
                <Link className="header-nav-link" to="/search">Search</Link>
                <a className="header-nav-link">Live</a>
                <a className="header-nav-link">Music</a>
                <a className="header-nav-link">Charts</a>
                <a className="header-nav-link">Events</a>
                <a className="header-nav-link">Features</a>
                <a className="header-nav-link">Log In</a>
                <a className="header-nav-link">Sign Up</a>
            </div>
        </header>
    );
};