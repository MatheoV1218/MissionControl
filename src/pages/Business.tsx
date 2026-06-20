import { Link } from "react-router-dom";
import "./Business.css";

function Business() {
  return (
    <section className="page business-page">
      <div className="page-hero">
        <p className="eyebrow">For Businesses</p>
        <h1>Stop Guessing Which Creator Fits Your Brand</h1>
        <p>
          Mission Control Media helps businesses find creators who actually fit
          their audience, location, and campaign goals. Instead of sending random
          DMs, businesses can request a connection and let Mission Control handle
          the next step.
        </p>

        <Link to="/contact" className="btn">Start A Campaign</Link>
      </div>

      <div className="section-grid">
        <div className="retro-card">
          <h3>Local Discovery</h3>
          <p>
            Search for creators based on general area, city, or market so the
            partnership feels relevant and reachable.
          </p>
        </div>

        <div className="retro-card">
          <h3>Creator Profiles</h3>
          <p>
            View bios, content style, social links, availability, and partnership
            preferences before requesting a connection.
          </p>
        </div>

        <div className="retro-card">
          <h3>Human-Led Matching</h3>
          <p>
            Mission Control stays in the middle to review requests, organize
            details, and help both sides launch the collaboration.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Business;