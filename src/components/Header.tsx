import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { supabase } from "../lib/supabase";
import moonshotLogo from "../assets/moonshotLogo.png";
import "./Header.css";

function Header() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const initial = email ? email.charAt(0).toUpperCase() : "?";

  return (
    <header className="site-header">
      <Link to="/" className="brand" onClick={closeMenu}>
        <img src={moonshotLogo} alt="Moonshot Media" className="brand-logo" />
      </Link>

      <button
        className={`menu-toggle ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
        type="button"
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`nav-links ${open ? "show" : ""}`}>
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/business" onClick={closeMenu}>Businesses</NavLink>
        <NavLink to="/influencers" onClick={closeMenu}>Influencers</NavLink>
        <NavLink to="/profiles" onClick={closeMenu}>Profiles</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>

        <Link to={email ? "/account" : "/auth"} className="mobile-profile-btn" onClick={closeMenu}>
          {email ? "My Account" : "Create Profile"}
        </Link>
      </nav>

      {email ? (
        <Link to="/account" className="account-icon" aria-label="My account">
          {initial}
        </Link>
      ) : (
        <Link to="/auth" className="nav-button">
          Create Profile
        </Link>
      )}
    </header>
  );
}

export default Header;