import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./Contact.css";

const FORM_ENDPOINT = "https://formsubmit.co/ajax/meccashabazzmusic@gmail.com";

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    // Lets Mecca hit "Reply" in her inbox and reach the sender directly.
    formData.set("_replyto", formData.get("Email") as string);

    setStatus("sending");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Submission failed");

      setStatus("success");
      formEl.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

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

      {status === "success" ? (
        <div className="contact-form contact-success">
          <FaCheckCircle className="contact-success-icon" />
          <h2>Transmission Received</h2>
          <p>Thanks for reaching out. Mecca will reply directly to your email soon.</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="hidden" name="_subject" value="New Moonshot Contact Form Submission" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />

          <label>
            Name
            <input name="Name" type="text" placeholder="Your name" required />
          </label>

          <label>
            Email
            <input name="Email" type="email" placeholder="you@email.com" required />
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

          {status === "error" && (
            <p className="contact-error">
              Something went wrong sending that. Please try again in a moment.
            </p>
          )}

          <button type="submit" className="btn" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send Transmission"}
          </button>
        </form>
      )}
    </section>
  );
}

export default Contact;
