import "./Account.css";

function Account() {
  return (
    <section className="page account-page">
      <div className="account-panel">
        <p className="kicker">Create Profile</p>
        <h1>Build Your Launch File</h1>
        <p>
          This page is set up as a front-end placeholder for Supabase. Later,
          this can connect to authentication, profile images, bios, rates,
          platforms, campaign goals, and saved matches.
        </p>

        <form className="account-form">
          <label>
            Profile Type
            <select>
              <option>Business</option>
              <option>Influencer / Creator</option>
            </select>
          </label>

          <label>
            Name / Brand
            <input type="text" placeholder="Moonshot Coffee Co." />
          </label>

          <label>
            Location
            <input type="text" placeholder="White Plains, NY" />
          </label>

          <label>
            Niche
            <input type="text" placeholder="Food, beauty, fitness, lifestyle..." />
          </label>

          <label>
            Bio
            <textarea placeholder="Describe your brand, audience, goals, or content style..." />
          </label>

          <button type="submit" className="btn">
            Save Profile
          </button>
        </form>
      </div>
    </section>
  );
}

export default Account;