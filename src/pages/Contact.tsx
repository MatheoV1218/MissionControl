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

      <form
        className="contact-form"
        action="https://formsubmit.co/mateovillada1@outlook.com"
        method="POST"
      >
        <input
          type="hidden"
          name="_subject"
          value="New Moonshot Contact Form Submission"
        />

        <input
          type="hidden"
          name="_captcha"
          value="false"
        />

        <input
          type="hidden"
          name="_template"
          value="table"
        />

        <input
          type="hidden"
          name="_next"
          value={window.location.origin + "/contact?success=true"}
        />

        <label>
          Name
          <input
            name="Name"
            type="text"
            placeholder="Your name"
            required
          />
        </label>

        <label>
          Email
          <input
            name="Email"
            type="email"
            placeholder="you@email.com"
            required
          />
        </label>

        <label>
          I am a...
          <select name="Account Type">
            <option>Business Owner</option>
            <option>Influencer / Creator</option>
            <option>Both</option>
          </select>
        </label>

        <label>
          Message
          <textarea
            name="Message"
            placeholder="Tell us what you want to launch..."
            required
          />
        </label>

        <button
          type="submit"
          className="btn"
        >
          Send Transmission
        </button>
      </form>
    </section>
  );
}

export default Contact;