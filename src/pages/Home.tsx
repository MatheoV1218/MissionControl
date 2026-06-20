import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <section className="page home-page">
      <div className="page-hero">
        <p className="eyebrow">Influencer Marketing Agency</p>
        <h1>Connecting Brands With Creators That Get The Mission</h1>
        <p>
          Mission Control Media helps businesses and creators build authentic,
          professional, and aligned partnerships.
        </p>
        <Link to="/profiles" className="btn">Explore Profiles</Link>
      </div>
    </section>
  );
}

export default Home;