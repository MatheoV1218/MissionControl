import { Link, useParams } from "react-router-dom";
import { profiles } from "../data/profiles";
import "./ProfileDetails.css";

function ProfileDetails() {
  const { id } = useParams();

  const profile = profiles.find((item) => item.id === id);

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

  const isCreator = profile.type === "Creator";

  return (
    <section className="page profile-details-page">
      <Link to="/profiles" className="back-link">
        ← Back To Profiles
      </Link>

      <div className="profile-details-hero">
        <div className="profile-image-wrap">
          <img src={profile.image} alt={profile.name} />
        </div>

        <div className="profile-main-info">
          <p className="kicker">{profile.type} Profile</p>
          <h1>{profile.name}</h1>
          <p>{profile.bio}</p>

          <div className="profile-tags">
            <span>{profile.location}</span>
            <span>{profile.niche}</span>
            <span>{profile.rate}</span>
          </div>
        </div>
      </div>

      <div className="profile-details-grid">
        {isCreator ? (
          <>
            <div className="detail-card">
              <h3>Audience</h3>
              <p>{profile.audience}</p>
            </div>

            <div className="detail-card">
              <h3>Engagement</h3>
              <p>{profile.engagement}</p>
            </div>

            <div className="detail-card">
              <h3>Platforms</h3>
              <div className="mini-tags">
                {profile.platforms.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="detail-card">
              <h3>Follower Reach</h3>
              <p>Instagram: {profile.followers.instagram}</p>
              <p>TikTok: {profile.followers.tiktok}</p>
              <p>YouTube: {profile.followers.youtube}</p>
            </div>

            <div className="detail-card wide">
              <h3>Interests</h3>
              <div className="mini-tags">
                {profile.interests.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="detail-card wide">
              <h3>Past Partnerships</h3>
              <div className="mini-tags">
                {profile.pastPartnerships.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="detail-card">
              <h3>Website</h3>
              <p>{profile.website}</p>
            </div>

            <div className="detail-card">
              <h3>Campaign Type</h3>
              <p>{profile.campaignType}</p>
            </div>

            <div className="detail-card">
              <h3>Target Audience</h3>
              <p>{profile.targetAudience}</p>
            </div>

            <div className="detail-card">
              <h3>Active Campaigns</h3>
              <p>{profile.activeCampaigns}</p>
            </div>

            <div className="detail-card wide">
              <h3>Preferred Platforms</h3>
              <div className="mini-tags">
                {profile.preferredPlatforms.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="detail-card contact-card wide">
          <h3>Contact</h3>
          <p>{isCreator ? profile.email : profile.contact}</p>
          <Link to="/contact" className="btn">
            Start Collaboration
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProfileDetails;