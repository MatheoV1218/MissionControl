import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <h2>MISSION CONTROL MEDIA</h2>
        <p>Connecting brands with creators that get the mission.</p>
      </div>

      <div className="footer-links">
        <Link to="/business">Business</Link>
        <Link to="/profiles">Profiles</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </footer>
  );
}

export default Footer;