import "./Contact.css";

function Contact() {
  return (
    <section className="page contact-page">
      <div className="contact-hero">
        <div>
          <p className="eyebrow">Contact Mission Control</p>
          <h1>Send The Signal</h1>
          <p>
            Whether you are a business looking for the right creator or a
            creator looking for aligned brand opportunities, Mission Control can
            help organize the connection.
          </p>
        </div>

        <div className="contact-note">
          <h3>What happens next?</h3>
          <p>
            Once your message is received, Mission Control can review the
            details, understand the goal, and help move the right partnership
            forward.
          </p>
        </div>
      </div>

      <section className="services-section">
        <p className="eyebrow">Services</p>
        <h2>What Mission Control Can Help With</h2>

        <div className="services-grid">
          <div className="service-card">
            <h3>Brand & Creator Matching</h3>
            <p>
              Helping businesses find creators who match their location, niche,
              audience, values, and campaign goals.
            </p>
          </div>

          <div className="service-card">
            <h3>Influencer Outreach</h3>
            <p>
              Supporting the first point of contact so businesses do not have to
              send random messages or manage every conversation alone.
            </p>
          </div>

          <div className="service-card">
            <h3>Campaign Coordination</h3>
            <p>
              Helping manage timelines, communication, expectations,
              deliverables, and collaboration details from start to finish.
            </p>
          </div>

          <div className="service-card">
            <h3>Negotiation Support</h3>
            <p>
              Helping both sides stay clear on value, expectations, content
              needs, dates, and partnership structure.
            </p>
          </div>

          <div className="service-card">
            <h3>Content Delivery</h3>
            <p>
              Making sure promotional content is organized, aligned with the
              campaign, and delivered in a professional way.
            </p>
          </div>

          <div className="service-card">
            <h3>Long-Term Partnerships</h3>
            <p>
              Helping brands and creators build relationships that feel
              meaningful, authentic, and beneficial beyond one post.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <div>
          <p className="eyebrow">Start Here</p>
          <h2>Tell Us About The Mission</h2>
          <p>
            This form can later be connected to Supabase, EmailJS, FormSubmit,
            or a custom backend notification system.
          </p>
        </div>

        <form className="contact-form">
          <div className="form-row">
            <input type="text" placeholder="Your name" />
            <input type="email" placeholder="Email address" />
          </div>

          <div className="form-row">
            <select defaultValue="">
              <option value="" disabled>
                I am a...
              </option>
              <option>Business</option>
              <option>Influencer / Creator</option>
              <option>Agency / Partner</option>
              <option>Other</option>
            </select>

            <input type="text" placeholder="City / Area" />
          </div>

          <select defaultValue="">
            <option value="" disabled>
              What service are you interested in?
            </option>
            <option>Brand & Creator Matching</option>
            <option>Influencer Outreach</option>
            <option>Campaign Coordination</option>
            <option>Negotiation Support</option>
            <option>Content Delivery</option>
            <option>Long-Term Partnership Support</option>
          </select>

          <textarea placeholder="Tell us what you are trying to build, who you want to connect with, and any important dates or details." />

          <button type="submit">Send Transmission</button>
        </form>
      </section>
    </section>
  );
}

export default Contact;