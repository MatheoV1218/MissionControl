import { NavLink, Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="logo">
        MISSION CONTROL
      </Link>

      <nav className="nav-links">
        <NavLink to="/business">Business</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/profiles">Profiles / Your Account</NavLink>
      </nav>
    </header>
  );
}

export default Header;