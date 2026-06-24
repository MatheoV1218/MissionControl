import { useMemo, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import "./Profiles.css";

const profiles = [
  {
    name: "Local Eats Co.",
    type: "Business",
    location: "White Plains, NY",
    niche: "Food + Lifestyle",
    rate: "Campaign Budget",
    description:
      "A neighborhood restaurant looking for creators to help launch seasonal menu campaigns.",
  },
  {
    name: "Nia Creates",
    type: "Creator",
    location: "Westchester, NY",
    niche: "Beauty + Lifestyle",
    rate: "$250+",
    description:
      "A lifestyle creator focused on honest reviews, short-form videos, and local brand storytelling.",
  },
  {
    name: "Studio Orbit",
    type: "Business",
    location: "New York",
    niche: "Fitness + Wellness",
    rate: "Paid Collabs",
    description:
      "A boutique studio searching for creators who can capture wellness, community, and movement.",
  },
  {
    name: "Kai Visuals",
    type: "Creator",
    location: "NYC",
    niche: "Photo + Video",
    rate: "$400+",
    description:
      "A visual storyteller creating cinematic reels, launch videos, and social campaigns.",
  },
  {
    name: "Glow Market",
    type: "Business",
    location: "Brooklyn, NY",
    niche: "Beauty + Retail",
    rate: "Gifted + Paid",
    description:
      "A small beauty shop looking for creators to highlight new products and local events.",
  },
  {
    name: "Maya Moves",
    type: "Creator",
    location: "White Plains, NY",
    niche: "Fitness + Wellness",
    rate: "$300+",
    description:
      "A wellness creator focused on fitness routines, studio visits, and healthy lifestyle content.",
  },
];

function Profiles() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      const matchesFilter = filter === "All" || profile.type === filter;

      const searchText = `${profile.name} ${profile.type} ${profile.location} ${profile.niche} ${profile.description}`.toLowerCase();

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
          <ProfileCard key={profile.name} {...profile} />
        ))}
      </div>
    </section>
  );
}

export default Profiles;