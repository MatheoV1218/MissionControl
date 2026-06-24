import "./Contact.css";

function Contact() {
  return (
    <section className="page contact-page">
      <div className="contact-copy">
        <p className="kicker">Contact Mission Control</p>
        <h1>Book A Sit Down Before Launch</h1>
        <p>
          The goal is to make sure every business and creator starts with the
          right profile, clear expectations, and a strong plan for collaboration.
        </p>
      </div>

      <form className="contact-form">
        <label>
          Name
          <input type="text" placeholder="Your name" />
        </label>

        <label>
          Email
          <input type="email" placeholder="you@email.com" />
        </label>

        <label>
          I am a...
          <select>
            <option>Business Owner</option>
            <option>Influencer / Creator</option>
            <option>Both</option>
          </select>
        </label>

        <label>
          Message
          <textarea placeholder="Tell us what you want to launch..." />
        </label>

        <button type="submit" className="btn">
          Send Transmission
        </button>
      </form>
    </section>
  );
}

export default Contact;