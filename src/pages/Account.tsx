import "./Account.css";

function Account() {
  return (
    <section className="page account-page">
      <div className="page-hero">
        <p className="eyebrow">Your Account</p>
        <h1>Build Your Mission Profile</h1>
        <p>
          This area will eventually handle login, signup, profile editing,
          uploaded images, availability, and collaboration preferences.
        </p>
      </div>

      <div className="account-panels">
        <div className="retro-card">
          <h3>For Creators</h3>
          <p>
            Create a profile with your bio, location, niche, socials, images,
            availability, and the types of brands you want to work with.
          </p>
        </div>

        <div className="retro-card">
          <h3>For Businesses</h3>
          <p>
            Create a business profile with your brand details, campaign goals,
            location, and what kind of creators you want to connect with.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Account;