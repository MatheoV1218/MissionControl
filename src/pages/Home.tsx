import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <section className="home-page">
      <section className="page home-hero-section">
        <div className="page-hero home-hero">
          <p className="eyebrow">Influencer marketing from another orbit</p>

          <h1>Connecting Brands With Creators That Get The Mission</h1>

          <p>
            Mission Control Media is an influencer marketing and creative agency
            built to connect businesses with content creators who feel authentic,
            aligned, and community-driven.
          </p>

          <div className="home-actions">
            <Link to="/profiles" className="btn">
              Explore Profiles
            </Link>

            <Link to="/business" className="btn secondary-btn">
              For Businesses
            </Link>
          </div>
        </div>

        <div className="orbit-visual" aria-hidden="true">
          <div className="planet"></div>
          <div className="ring ring-one"></div>
          <div className="ring ring-two"></div>
          <div className="starburst">✦</div>
        </div>
      </section>

      <section className="page about-section">
        <div className="split-section">
          <div>
            <p className="eyebrow">About Us</p>
            <h2>We Turn Collaboration Into Community</h2>
          </div>

          <div className="about-copy">
            <p>
              Mission Control Media helps brands and creators build real
              partnerships instead of random one-time promotions. We focus on
              matching businesses with niche, local influencers who genuinely
              align with their brand, audience, and goals.
            </p>

            <p>
              From initial outreach to final content delivery, Mission Control
              helps manage the moving parts of the campaign. That can include
              creator discovery, communication, negotiation, scheduling,
              coordination, and making sure both sides know exactly what is
              expected.
            </p>
          </div>
        </div>

        <div className="section-grid">
          <div className="retro-card">
            <h3>Creator Matching</h3>
            <p>
              We help businesses discover creators based on location, niche,
              audience, style, and collaboration goals.
            </p>
          </div>

          <div className="retro-card">
            <h3>Campaign Direction</h3>
            <p>
              We help organize the plan so the collaboration feels clear,
              professional, and easy to follow from start to finish.
            </p>
          </div>

          <div className="retro-card">
            <h3>Partnership Support</h3>
            <p>
              We stay involved as the middle point so businesses and creators
              can focus on making strong content.
            </p>
          </div>
        </div>
      </section>

      <section className="page process-section">
        <p className="eyebrow">How It Works</p>
        <h2>Search. Request. Launch.</h2>

        <div className="mission-steps">
          <div className="mission-step">
            <span>01</span>
            <h3>Search The Area</h3>
            <p>
              Users can search a general location like White Plains, New York,
              and discover businesses or creators in that area.
            </p>
          </div>

          <div className="mission-step">
            <span>02</span>
            <h3>Find The Fit</h3>
            <p>
              Profiles can show bios, images, social links, niches,
              availability, and collaboration preferences.
            </p>
          </div>

          <div className="mission-step">
            <span>03</span>
            <h3>Request The Match</h3>
            <p>
              Once someone is interested, Mission Control receives the request
              and helps coordinate the next step.
            </p>
          </div>
        </div>
      </section>

      <section className="page ceo-section">
        <div className="ceo-card">
          <div className="ceo-image">
            <span>CEO</span>
          </div>

          <div className="ceo-content">
            <p className="eyebrow">Meet The CEO</p>
            <h2>Mecca Shabazz</h2>

            <p>
              Mission Control was created after seeing both sides of the
              influencer industry firsthand. The goal is to help businesses and
              creators build partnerships rooted in trust, accountability,
              communication, and genuine collaboration.
            </p>

            <p>
              As the CEO of Mission Control Media, Mecca focuses on navigating
              the space between brands and creators to build partnerships that
              truly resonate. Her work centers on aligning the right voices with
              the right audiences to create campaigns that feel natural,
              impactful, and lasting.
            </p>

            <Link to="/contact" className="btn">
              Contact Mission Control
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Home;