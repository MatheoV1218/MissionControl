import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Moonshot <strong>Media</strong>
          </Link>

          <p>
            A creator discovery platform by Spacelady Studios, helping brands
            and influencers launch stronger collaborations.
          </p>

          <p className="site-credit">
            Website made by <span>Matheo Villada</span>
          </p>
        </div>

        <div className="footer-column">
          <h4>Explore</h4>
          <Link to="/profiles">Profiles</Link>
          <Link to="/business">Businesses</Link>
          <Link to="/influencers">Influencers</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-column">
          <h4>Social</h4>
          <div className="social-links">
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="TikTok">
              <FaTiktok />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Spacelady Studios. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;