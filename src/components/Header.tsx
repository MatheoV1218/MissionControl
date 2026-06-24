import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

import moonshotLogo from "../assets/moonshotLogo.png";

function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <img src={moonshotLogo} alt="Moonshot Media" className="brand-logo" />
      </Link>

      <button
        className={`menu-toggle ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`nav-links ${open ? "show" : ""}`}>
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/business" onClick={closeMenu}>
          Businesses
        </NavLink>
        <NavLink to="/influencers" onClick={closeMenu}>
          Influencers
        </NavLink>
        <NavLink to="/profiles" onClick={closeMenu}>
          Profiles
        </NavLink>
        <NavLink to="/contact" onClick={closeMenu}>
          Contact
        </NavLink>

        <Link to="/account" className="mobile-profile-btn" onClick={closeMenu}>
          Create Profile
        </Link>
      </nav>

      <Link to="/account" className="nav-button">
        Create Profile
      </Link>
    </header>
  );
}

export default Header;
