import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span>✦</span>
            Moonshot <strong>Media</strong>
          </Link>

          <p>
            Connecting small businesses with creators through meaningful,
            approachable influencer partnerships.
          </p>
        </div>

        <div className="footer-column">
          <h4>Platform</h4>
          <Link to="/business">For Businesses</Link>
          <Link to="/influencers">For Influencers</Link>
          <Link to="/profiles">Explore Profiles</Link>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/account">Create Profile</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Moonshot Media. All rights reserved.</p>
        <p>Mission Control for creator partnerships.</p>
      </div>
    </footer>
  );
}

export default Footer;