import { useState } from "react";
import "./AdminLogin.css";

function AdminLogin({ onLogin, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demo credentials
    if (
      email === "admin@workforce.com" &&
      password === "123456"
    ) {
      setError("");
      onLogin();
    } else {
      setError(
        "Invalid credentials. Use the demo account provided below."
      );
    }
  };

  return (
    <div className="admin-login">
      <div className="login-background-shape shape-one"></div>
      <div className="login-background-shape shape-two"></div>

      <div className="login-container">
        <div className="login-brand">
          <div className="login-logo">W</div>

          <div>
            <strong>Workforce</strong>
            <span>Management System</span>
          </div>
        </div>

        <div className="login-card">
          <div className="login-heading">
            <span>COMPANY ADMINISTRATION</span>

            <h1>Welcome back</h1>

            <p>
              Sign in to manage workers, requests and
              assignments.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Email Address

              <div className="input-wrapper">
                <span>✉</span>

                <input
                  type="email"
                  placeholder="admin@workforce.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </label>

            <label>
              Password

              <div className="input-wrapper">
                <span>●</span>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </label>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <button className="login-button" type="submit">
              Sign in to Dashboard
              <span>→</span>
            </button>
          </form>

          <div className="demo-account">
            <div>
              <strong>Demo Account</strong>
              <span>For company presentation</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setEmail("admin@workforce.com");
                setPassword("123456");
              }}
            >
              Use Demo Account
            </button>
          </div>
        </div>

        <button className="back-button" onClick={onBack}>
          ← Back to Worker Portal
        </button>

        <p className="login-footer">
          Workforce Management System · Administration Portal
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;