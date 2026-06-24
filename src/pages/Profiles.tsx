import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import { profiles } from "../data/profiles";
import "./Profiles.css";

function Profiles() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      const matchesFilter = filter === "All" || profile.type === filter;

      const searchText = `${profile.name} ${profile.type} ${profile.location} ${profile.niche} ${profile.bio}`.toLowerCase();

      const matchesSearch = searchText.includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [search, filter]);

  return (
    <section className="page profiles-page">
      <div className="profiles-hero">
        <p className="kicker">Creator + Brand Radar</p>
        <h1>Explore Profiles</h1>
        <p>
          Search businesses, creators, niches, locations, rates, and campaign
          styles. This is where brands and influencers discover the right match
          before launching a collaboration.
        </p>

        <div className="profile-search-panel">
          <input
            type="text"
            placeholder="Search food, fitness, White Plains, beauty, video..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="profile-filters">
            {["All", "Business", "Creator"].map((item) => (
              <button
                key={item}
                type="button"
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="profiles-results-head">
        <h2>Discovery Radar</h2>
        <p>{filteredProfiles.length} profile matches found</p>
      </div>

      <div className="profiles-grid">
        {filteredProfiles.map((profile) => (
          <Link
            key={profile.id}
            to={`/profiles/${profile.id}`}
            className="profile-card-link"
          >
            <ProfileCard
              name={profile.name}
              type={profile.type}
              location={profile.location}
              niche={profile.niche}
              rate={profile.rate}
              description={profile.bio}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Profiles;