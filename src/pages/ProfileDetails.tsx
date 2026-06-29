import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./ProfileDetails.css";

function ProfileDetails() {
  const { id } = useParams();
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, [id]);

  const loadProfile = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from("public_profiles")
      .select("*")
      .eq("id", id)
      .eq("is_active", true)
      .single();

    if (error) {
      console.error(error);
      setProfile(null);
      setLoading(false);
      return;
    }

    setProfile(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <section className="page profile-details-page">
        <div className="profile-details-card">
          <p className="kicker">Loading Signal</p>
          <h1>Loading Profile</h1>
        </div>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="page profile-details-page">
        <div className="profile-details-card">
          <p className="kicker">Signal Lost</p>
          <h1>Profile Not Found</h1>
          <p>This profile does not exist or may have been removed.</p>

          <Link to="/profiles" className="btn">
            Back To Profiles
          </Link>
        </div>
      </section>
    );
  }

  const isCreator = profile.profile_type === "Creator";
  const businessImages = profile.business_images || [];
  const availability = profile.availability || [];
  const socials = profile.socials || {};

  return (
    <section className="page profile-details-page">
      <Link to="/profiles" className="back-link">
        ← Back To Profiles
      </Link>

      <div className="profile-details-hero">
        <div className="profile-image-wrap">
          {profile.image_url ? (
            <img src={profile.image_url} alt={profile.name} />
          ) : (
            <div className="profile-image-placeholder">
              {profile.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="profile-main-info">
          <p className="kicker">{profile.profile_type} Profile</p>
          <h1>{profile.name}</h1>
          <p>{profile.bio}</p>

          <div className="profile-tags">
            {profile.location && <span>{profile.location}</span>}
            {profile.niche && <span>{profile.niche}</span>}
            {profile.business_type && <span>{profile.business_type}</span>}
          </div>
        </div>
      </div>

      <div className="profile-details-grid">
        <div className="detail-card">
          <h3>Type</h3>
          <p>{profile.profile_type}</p>
        </div>

        <div className="detail-card">
          <h3>Location</h3>
          <p>{profile.location || "Not listed"}</p>
        </div>

        <div className="detail-card">
          <h3>Niche</h3>
          <p>{profile.niche || "Not listed"}</p>
        </div>

        <div className="detail-card">
          <h3>Availability</h3>
          {availability.length > 0 ? (
            <div className="mini-tags">
              {availability.map((item: string) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ) : (
            <p>No availability listed.</p>
          )}
        </div>

        {isCreator ? (
          <>
            <div className="detail-card wide">
              <h3>Socials</h3>
              <div className="mini-tags">
                {socials.instagram && <span>Instagram: {socials.instagram}</span>}
                {socials.tiktok && <span>TikTok: {socials.tiktok}</span>}
                {socials.youtube && <span>YouTube: {socials.youtube}</span>}
                {!socials.instagram && !socials.tiktok && !socials.youtube && (
                  <span>No socials listed</span>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="detail-card">
              <h3>Years</h3>
              <p>{profile.years_in_business || "Not listed"}</p>
            </div>

            <div className="detail-card">
              <h3>Owners</h3>
              <p>{profile.owners_count || "Not listed"}</p>
            </div>

            <div className="detail-card wide">
              <h3>Campaign Needs</h3>
              <p>
                Expected posts: {profile.expected_posts || "Not listed"}
              </p>
              <p>
                Deadlines: {profile.content_deadlines || "Not listed"}
              </p>
            </div>

            {businessImages.length > 0 && (
              <div className="detail-card full">
                <h3>Business Images</h3>
                <div className="business-gallery">
                  {businessImages.map((image: string) => (
                    <img key={image} src={image} alt={profile.name} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <div className="detail-card contact-card wide">
          <h3>Contact</h3>
          <p>
            Moonshot Media manages all introductions. Reach out through the
            platform to begin a collaboration.
          </p>
          <Link to="/contact" className="btn">
            Start Collaboration
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProfileDetails;