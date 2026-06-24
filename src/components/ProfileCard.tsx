import "./ProfileCard.css";

type ProfileCardProps = {
  name: string;
  type: string;
  location: string;
  niche: string;
  rate: string;
  description: string;
};

function ProfileCard({
  name,
  type,
  location,
  niche,
  rate,
  description,
}: ProfileCardProps) {
  return (
    <article className="profile-card">
      <div className="profile-badge">{type}</div>
      <div className="profile-avatar">{name.charAt(0)}</div>
      <h3>{name}</h3>
      <p>{description}</p>

      <div className="profile-meta">
        <span>{location}</span>
        <span>{niche}</span>
        <span>{rate}</span>
      </div>
    </article>
  );
}

export default ProfileCard;