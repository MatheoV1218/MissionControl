import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import { supabase } from "../lib/supabase";
import "./Profiles.css";

type FilterType = "All" | "Business" | "Creator";
type AvailabilityFilter = "All" | "Available";

const PAGE_SIZE = 12;

function Profiles() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("All");
  const [availabilityFilter, setAvailabilityFilter] =
    useState<AvailabilityFilter>("All");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setProfiles([]);
    setPage(0);
    setHasMore(true);
    loadProfiles(0, true);
  }, [filter, availabilityFilter]);

  const loadProfiles = async (pageToLoad = page, reset = false) => {
    setLoading(true);

    const from = pageToLoad * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase
      .from("public_profiles")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (filter !== "All") {
      query = query.eq("profile_type", filter);
    }

    if (availabilityFilter === "Available") {
      query = query.not("availability", "eq", "{}");
    }

    if (search.trim()) {
      const term = `%${search.trim()}%`;
      query = query.or(
        `name.ilike.${term},location.ilike.${term},niche.ilike.${term},bio.ilike.${term},profile_type.ilike.${term}`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    const newProfiles = data || [];

    setProfiles((prev) => (reset ? newProfiles : [...prev, ...newProfiles]));
    setHasMore(newProfiles.length === PAGE_SIZE);
    setPage(pageToLoad + 1);
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setProfiles([]);
    setPage(0);
    setHasMore(true);
    loadProfiles(0, true);
  };

  return (
    <section className="page profiles-page">
      <div className="profiles-hero">
        <p className="kicker">Creator + Brand Radar</p>
        <h1>Explore Profiles</h1>
        <p>
          Search live businesses, creators, niches, locations, and availability.
          This page is built to handle a growing profile database without slowing
          down.
        </p>

        <form className="profile-search-panel" onSubmit={handleSearch}>
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
                onClick={() => setFilter(item as FilterType)}
              >
                {item}
              </button>
            ))}

            <button
              type="button"
              className={availabilityFilter === "Available" ? "active" : ""}
              onClick={() =>
                setAvailabilityFilter(
                  availabilityFilter === "Available" ? "All" : "Available"
                )
              }
            >
              Available
            </button>

            <button type="submit">Search</button>
          </div>
        </form>
      </div>

      <div className="profiles-results-head">
        <h2>Discovery Radar</h2>
        <p>
          {loading && profiles.length === 0
            ? "Loading profiles..."
            : `${profiles.length} profiles loaded`}
        </p>
      </div>

      <div className="profiles-grid">
        {profiles.map((profile) => (
          <Link
            key={profile.id}
            to={`/profiles/${profile.id}`}
            className="profile-card-link"
          >
            <ProfileCard
              name={profile.name}
              type={profile.profile_type}
              location={profile.location}
              niche={profile.niche}
              rate={
                profile.profile_type === "Business"
                  ? profile.business_type || "Business"
                  : "Creator"
              }
              description={profile.bio}
              imageUrl={profile.image_url}
              availability={profile.availability || []}
            />
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="load-more-wrap">
          <button
            className="btn"
            type="button"
            disabled={loading}
            onClick={() => loadProfiles()}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </section>
  );
}

export default Profiles;