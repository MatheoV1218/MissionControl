import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./Auth.css";

function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    const result =
      mode === "signup"
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

    if (result.error) {
      alert(result.error.message);
      return;
    }

    const user = result.data.user;

    if (mode === "signup" && user) {
      const { error: profileError } = await supabase
        .from("user_profiles")
        .upsert({
          id: user.id,
          email: user.email,
          role: "user",
        });

      if (profileError) {
        console.error(profileError);
        alert(profileError.message);
        return;
      }
    }

    navigate("/account");
  };

  return (
    <section className="page auth-page">
      <div className="auth-card">
        <p className="kicker">Mission Login</p>
        <h1>{mode === "login" ? "Login" : "Sign Up"}</h1>

        <form onSubmit={handleAuth}>
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button className="btn" type="submit">
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        <button
          className="auth-switch"
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login"
            ? "Need an account? Sign up"
            : "Already have an account? Login"}
        </button>
      </div>
    </section>
  );
}

export default Auth;