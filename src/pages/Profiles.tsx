import { Link } from "react-router-dom";
import "./Profiles.css";

function Profiles() {
  return (
    <section className="page">
      <div className="page-hero">
        <p className="eyebrow">Profiles</p>
        <h1>Find Your Match</h1>
        <p>
          This page will eventually show searchable influencer and business
          profiles based on location, niche, and availability.
        </p>
        <Link to="/account" className="btn">Your Account</Link>
      </div>
    </section>
  );
}

export default Profiles;