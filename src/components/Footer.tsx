import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <p className="footer-eyebrow">Mission Control Media</p>
        <h2>Creators. Brands. Launch.</h2>
        <p>
          A retro-future connection hub for businesses and influencers ready to
          build something different.
        </p>
      </div>

      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/business">Business</Link>
        <Link to="/profiles">Profiles</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </footer>
  );
}

export default Footer;