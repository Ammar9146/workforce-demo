import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import logo from "./assets/golden-eagle-logo.jpg";

import AdminLogin from "./dash/AdminLogin";
import AdminDashboard from "./dash/AdminDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 1. رابط تطبيق العمال الرئيسي */}
        <Route path="/" element={<WorkerPortal />} />
        <Route path="/worker" element={<WorkerPortal />} />

        {/* 2. رابط لوجن الأدمن */}
        <Route path="/admin" element={<AdminLoginWrapper />} />

        {/* 3. رابط الداشبورد للأدمن */}
        <Route path="/admin/dashboard" element={<AdminDashboardWrapper />} />

        {/* أي رابط خطأ يوجه للتطبيق */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

// Wrapper لصفحة اللوجن للتنقل بالـ Router
function AdminLoginWrapper() {
  const navigate = useNavigate();
  return (
    <AdminLogin
      onLogin={() => navigate("/admin/dashboard")}
      onBack={() => navigate("/")}
    />
  );
}

// Wrapper للداشبورد للتنقل بالـ Router
function AdminDashboardWrapper() {
  const navigate = useNavigate();
  return <AdminDashboard onLogout={() => navigate("/admin")} />;
}

// =========================
// تطبيق العمال (Worker Portal)
// =========================
function WorkerPortal() {
  const [page, setPage] = useState("login");
  const [requestStatus, setRequestStatus] = useState("none");

  const handleLogin = () => setPage("dashboard");
  const submitRequest = () => {
    setRequestStatus("pending");
    setPage("success");
  };

  return (
    <div className="app">
      {page === "login" && (
        <main className="login-page">
          <div className="login-brand">
            <img src={logo} alt="Golden Eagle Logistics Services" className="login-logo" />
            <div className="brand-text">
              <span>GOLDEN EAGLE</span>
              <small>LOGISTICS SERVICES</small>
            </div>
          </div>
          <section className="login-content">
            <div className="eyebrow">WORKER PORTAL</div>
            <h1>Welcome back</h1>
            <p className="subtitle">Access your work requests, assignments and work history.</p>
            <div className="form-card">
              <label htmlFor="nationalId">National ID</label>
              <input id="nationalId" type="text" placeholder="Enter your National ID" />
              <button className="primary-button" onClick={handleLogin}>
                Continue <span>→</span>
              </button>
            </div>
          </section>
          <p className="login-footer">Golden Eagle Workforce Management System</p>
        </main>
      )}

      {page === "dashboard" && (
        <main className="dashboard">
          <header className="dashboard-header">
            <div className="header-brand">
              <img src={logo} alt="Golden Eagle" className="header-logo" />
              <div className="header-company">
                <strong>Golden Eagle</strong>
                <span>Worker Portal</span>
              </div>
            </div>
            <div className="header-actions">
              <button className="notification-button" aria-label="Notifications">
                🔔 <span className="notification-dot"></span>
              </button>
              <div className="profile-icon">AM</div>
            </div>
          </header>

          <section className="welcome-section">
            <p className="welcome">Thursday, September 10</p>
            <h1>Good morning, Ahmed 👋</h1>
            <p>Here is your work overview for today.</p>
          </section>

          <section className="employee-card">
            <div className="employee-card-top">
              <div>
                <p className="card-label">WORKER PROFILE</p>
                <h2>Ahmed Mohamed</h2>
              </div>
              <div className="active-badge"><span></span>Active</div>
            </div>
            <div className="employee-card-bottom">
              <div><span>Worker ID</span><strong>#GE-1025</strong></div>
              <div><span>Job Type</span><strong>General Worker</strong></div>
            </div>
          </section>

          {requestStatus === "none" && (
            <section className="request-card request-card-main">
              <div className="request-icon">📅</div>
              <div className="request-content">
                <div className="request-status">TOMORROW'S WORK</div>
                <h2>Ready to work tomorrow?</h2>
                <p>Submit your availability request and the administration will review it before assigning available work.</p>
              </div>
              <button className="gold-button" onClick={() => setPage("request")}>
                Request Work <span>→</span>
              </button>
            </section>
          )}

          {requestStatus === "pending" && (
            <section className="request-card pending-card">
              <div className="request-icon pending-icon">⏳</div>
              <div className="request-content">
                <div className="request-status pending-text">REQUEST UNDER REVIEW</div>
                <h2>Your request is pending</h2>
                <p>Your request for tomorrow has been successfully submitted. The company administration is currently reviewing it.</p>
                <div className="request-date">Requested for: September 11, 2026</div>
              </div>
            </section>
          )}

          <section className="stats-section">
            <div className="section-heading">
              <h2>Your Work Summary</h2>
              <span>This month</span>
            </div>
            <div className="stats">
              <div className="stat-card">
                <div className="stat-icon">📆</div>
                <span>Work Days</span>
                <strong>18</strong>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏱</div>
                <span>Total Shifts</span>
                <strong>22</strong>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✓</div>
                <span>Attendance</span>
                <strong>96%</strong>
              </div>
            </div>
          </section>

          <section className="activity-section">
            <div className="section-heading">
              <h2>Recent Activity</h2>
              <button className="text-button">View All</button>
            </div>
            <div className="activity-card">
              <div className="activity-icon">✓</div>
              <div className="activity-info">
                <strong>Work shift completed</strong>
                <span>Cairo Project · Morning Shift</span>
              </div>
              <small>Yesterday</small>
            </div>
            <div className="activity-card">
              <div className="activity-icon activity-gold">📍</div>
              <div className="activity-info">
                <strong>Assigned to New Cairo Site</strong>
                <span>Morning Shift</span>
              </div>
              <small>Sep 8</small>
            </div>
          </section>

          <nav className="bottom-navigation">
            <button className="nav-item active"><span>⌂</span>Home</button>
            <button className="nav-item"><span>📋</span>Requests</button>
            <button className="nav-item"><span>◷</span>History</button>
            <button className="nav-item"><span>👤</span>Profile</button>
          </nav>
        </main>
      )}

      {page === "request" && (
        <main className="request-page">
          <header className="simple-header">
            <button className="back-button" onClick={() => setPage("dashboard")}>←</button>
            <div>
              <span>WORK REQUEST</span>
              <h2>Request Work</h2>
            </div>
          </header>
          <section className="request-intro">
            <div className="request-large-icon">📅</div>
            <h1>Request work for tomorrow</h1>
            <p>Submit your availability and the Golden Eagle administration will review available work assignments.</p>
          </section>
          <section className="request-box">
            <div className="request-info-row">
              <div className="info-icon">📆</div>
              <div>
                <span>WORK DATE</span>
                <strong>September 11, 2026</strong>
              </div>
            </div>
            <div className="important-note">
              <span>ℹ</span>
              <p>Submitting a request does not guarantee a work assignment. The company administration will review your request and assign the available site and shift if approved.</p>
            </div>
            <button className="primary-button submit-button" onClick={submitRequest}>
              Submit Work Request <span>→</span>
            </button>
          </section>
        </main>
      )}

      {page === "success" && (
        <main className="success-page">
          <div className="success-card">
            <div className="success-icon">✓</div>
            <div className="eyebrow">REQUEST SUBMITTED</div>
            <h1>Your request was sent</h1>
            <p>Your availability request for tomorrow has been successfully submitted to Golden Eagle administration.</p>
            <div className="status pending-status">
              <div><span className="status-dot"></span>Pending Review</div>
              <small>Administration review required</small>
            </div>
            <button className="primary-button" onClick={() => setPage("dashboard")}>
              Back to Home <span>→</span>
            </button>
          </div>
        </main>
      )}
    </div>
  );
}