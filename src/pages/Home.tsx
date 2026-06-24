import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <>
      <section className="page home-hero">
        <div className="hero-copy">
          <p className="kicker">Welcome To Mission Control</p>
          <h1>Launch Your Brand Into The Creator Economy</h1>
          <p>
            Moonshot Media connects small businesses with influencers and
            content creators in a simple, approachable way. It is a matchmaking
            platform built for local brands, real creators, and meaningful
            collaborations.
          </p>

          <div className="btn-row">
            <Link to="/business" className="btn">
              For Businesses
            </Link>
            <Link to="/influencers" className="btn alt">
              For Influencers
            </Link>
          </div>
        </div>

        <div className="mission-card">
          <span>Mission Status</span>
          <h3>Ready For Liftoff</h3>
          <p>
            Build a profile, find aligned matches, and launch campaigns with the
            right people.
          </p>
        </div>
      </section>

      <section className="page home-how">
        <div className="section-head">
          <p className="kicker">How It Works</p>
          <h2>Connect. Collaborate. Create.</h2>
        </div>

        <div className="grid-3">
          <div className="retro-card">
            <h3>Build Your Profile</h3>
            <p>
              Businesses and creators share their goals, location, budget,
              audience, niche, and expectations.
            </p>
          </div>

          <div className="retro-card">
            <h3>Find Your Match</h3>
            <p>
              Brands discover creators who fit their audience, values, style,
              engagement, and campaign goals.
            </p>
          </div>

          <div className="retro-card">
            <h3>Launch Together</h3>
            <p>
              Once there is a strong match, both sides connect and turn the
              campaign into real content.
            </p>
          </div>
        </div>
      </section>

      <section className="page ceo-section">
        <div className="ceo-card">
          <div className="ceo-orbit">MS</div>

          <div>
            <p className="kicker">Founder / CEO</p>
            <h2>Mecca Shabazz</h2>
            <p>
              Mecca Shabazz is building Moonshot Media to make influencer
              marketing feel less intimidating for small businesses and more
              valuable for creators. Her vision is to create a Mission Control
              for partnerships where brands can get guidance, build strong
              profiles, and discover creators who actually fit their goals.
            </p>

            <Link to="/contact" className="btn dark">
              Book A Sit Down
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;