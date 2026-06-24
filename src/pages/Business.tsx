import { Link } from "react-router-dom";
import "./Business.css";

function Business() {
  return (
    <>
      <section className="page business-page-hero">
        <div className="business-hero">
          <p className="kicker">For Businesses</p>
          <h1>Find Creators Who Fit Your Orbit</h1>
          <p>
            Build a clear campaign, get matched with the right creators, and
            launch partnerships without needing a big agency.
          </p>

          <div className="btn-row">
            <Link to="/contact" className="btn">
              Book A Sit Down
            </Link>
            <Link to="/profiles" className="btn alt">
              Explore Profiles
            </Link>
          </div>
        </div>
      </section>

      <section className="page business-tools">
        <div className="section-head">
          <p className="kicker">Business Launch Checklist</p>
          <h2>Prepare Your Campaign</h2>
          <p>
            Before a business starts matching with creators, Moonshot helps them
            get clear on what they actually need.
          </p>
        </div>

        <div className="grid-3">
          <div className="retro-card">
            <h3>Define The Goal</h3>
            <p>
              Are you promoting a product, building awareness, launching an
              event, or trying to drive local traffic?
            </p>
          </div>

          <div className="retro-card">
            <h3>Know The Audience</h3>
            <p>
              Identify who you want to reach by location, age range, interests,
              lifestyle, and buying behavior.
            </p>
          </div>

          <div className="retro-card">
            <h3>Set The Budget</h3>
            <p>
              Decide if the campaign is gifted, paid, commission-based, or a mix
              so creators know what to expect.
            </p>
          </div>
        </div>
      </section>

      <section className="page business-cta">
        <div className="space-panel business-panel">
          <div>
            <p className="kicker">Mission Support</p>
            <h2>Not Sure Where To Start?</h2>
            <p>
              Book a sit-down with Mecca to build your business profile, clarify
              your expectations, and figure out what type of creator makes the
              most sense.
            </p>
          </div>

          <Link to="/contact" className="btn">
            Book A Sit Down
          </Link>
        </div>
      </section>
    </>
  );
}

export default Business;