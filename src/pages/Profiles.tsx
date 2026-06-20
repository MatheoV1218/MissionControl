import { Link } from "react-router-dom";
import "./Profiles.css";

const mockProfiles = [
  {
    name: "Luna Vega",
    type: "Creator",
    location: "White Plains, NY",
    niche: "Lifestyle / Food / Local Spots",
  },
  {
    name: "North Star Fitness",
    type: "Business",
    location: "Westchester, NY",
    niche: "Fitness / Wellness / Community",
  },
  {
    name: "Orbit Eats",
    type: "Business",
    location: "New York, NY",
    niche: "Restaurant / Events / Nightlife",
  },
];

function Profiles() {
  return (
    <section className="page profiles-page">
      <div className="page-hero">
        <p className="eyebrow">Profiles / Your Account</p>
        <h1>Search The Signal</h1>
        <p>
          This will become the main profile discovery area. Users will search by
          location, browse creators and businesses, then request a match through
          Mission Control.
        </p>

        <div className="search-preview">
          <input placeholder="Search a city or area, like White Plains, NY" />
          <button>Search</button>
        </div>
      </div>

      <div className="profile-grid">
        {mockProfiles.map((profile) => (
          <div className="profile-card" key={profile.name}>
            <div className="profile-image-placeholder">✦</div>
            <p className="profile-type">{profile.type}</p>
            <h3>{profile.name}</h3>
            <p>{profile.location}</p>
            <p>{profile.niche}</p>
            <Link to="/account">View Profile</Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Profiles;