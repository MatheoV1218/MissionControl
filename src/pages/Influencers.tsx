import { Link } from "react-router-dom";
import "./Influencers.css";

function Influencers() {
  return (
    <>
      <section className="page influencer-page-hero">
        <div className="influencer-hero">
          <p className="kicker">For Influencers</p>
          <h1>Turn Your Content Into Collabs</h1>
          <p>
            Build a creator profile, showcase your audience, and get discovered
            by brands looking for real partnerships.
          </p>

          <div className="btn-row">
            <Link to="/account" className="btn">
              Create Profile
            </Link>
            <Link to="/profiles" className="btn alt">
              Explore Matches
            </Link>
          </div>
        </div>
      </section>

      <section className="page creator-tools">
        <div className="section-head">
          <p className="kicker">Creator Launch Checklist</p>
          <h2>Build A Strong Profile</h2>
          <p>
            Creators can use Moonshot to show brands why they are the right fit,
            not just how many followers they have.
          </p>
        </div>

        <div className="grid-3">
          <div className="retro-card">
            <h3>Show Your Niche</h3>
            <p>
              Make it clear what type of content you create, who you speak to,
              and what brands naturally fit your platform.
            </p>
          </div>

          <div className="retro-card">
            <h3>Add Your Stats</h3>
            <p>
              Include platforms, engagement, audience location, demographics,
              rates, and examples of past content.
            </p>
          </div>

          <div className="retro-card">
            <h3>Pick Your Collabs</h3>
            <p>
              Browse business campaigns and apply to opportunities that actually
              match your style and audience.
            </p>
          </div>
        </div>
      </section>

      <section className="page creator-cta">
        <div className="space-panel creator-panel">
          <div>
            <p className="kicker">Creator Radar</p>
            <h2>Get Found By Better Brands</h2>
            <p>
              Your profile becomes your launch file: bio, content style,
              location, rates, platforms, and what type of partnerships you want.
            </p>
          </div>

          <Link to="/account" className="btn">
            Create Profile
          </Link>
        </div>
      </section>
    </>
  );
}

export default Influencers;