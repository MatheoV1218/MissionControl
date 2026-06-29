import "./ProfileCard.css";

type ProfileCardProps = {
  name: string;
  type: string;
  location?: string;
  niche?: string;
  rate?: string;
  description?: string;
  imageUrl?: string;
  availability?: string[];
};

function ProfileCard({
  name,
  type,
  location,
  niche,
  rate,
  description,
  imageUrl,
  availability = [],
}: ProfileCardProps) {
  return (
    <article className="profile-card">
      <div className="profile-badge">{type}</div>

      <div className="profile-top-row">
        <div className="profile-avatar">{name.charAt(0)}</div>

        <div className="profile-picture">
          {imageUrl ? (
            <img src={imageUrl} alt={name} />
          ) : (
            <span>{name.charAt(0)}</span>
          )}
        </div>
      </div>

      <h3>{name}</h3>
      <p>{description || "No bio added yet."}</p>

      <div className="profile-meta">
        {location && <span>{location}</span>}
        {niche && <span>{niche}</span>}
        {rate && <span>{rate}</span>}
        {availability.length > 0 && <span>Available</span>}
      </div>
    </article>
  );
}

export default ProfileCard;