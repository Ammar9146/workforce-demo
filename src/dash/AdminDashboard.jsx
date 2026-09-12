import { useState } from "react";
import "./AdminDashboard.css";
import logo from "../assets/golden-eagle-logo.jpg";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './dash/AdminLogin';
import AdminDashboard from './dash/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* الصفحات الرئيسية */}
        <Route path="/" element={<AdminLogin />} />
        
        {/* رابط الداشبورد المخصص */}
        <Route path="/admin" element={<AdminDashboard />} />
        {/* أو يمكنك تسميته /dashboard */}
      </Routes>
    </Router>
  );
}


const initialRequests = [
  {
    id: 1,
    worker: "Ahmed Hassan",
    workerId: "W-1025",
    job: "General Worker",
    date: "11 Sep 2026",
    submitted: "10 Sep 2026 - 08:30 PM",
    status: "Pending",
  },
  {
    id: 2,
    worker: "Mohamed Ali",
    workerId: "W-1031",
    job: "Electrician",
    date: "11 Sep 2026",
    submitted: "10 Sep 2026 - 07:45 PM",
    status: "Pending",
  },
  {
    id: 3,
    worker: "Mahmoud Samir",
    workerId: "W-1044",
    job: "Driver",
    date: "11 Sep 2026",
    submitted: "10 Sep 2026 - 06:20 PM",
    status: "Approved",
    site: "Cairo Project",
    shift: "Morning Shift",
    attendance: "07:00 AM",
  },
  {
    id: 4,
    worker: "Omar Ibrahim",
    workerId: "W-1052",
    job: "General Worker",
    date: "11 Sep 2026",
    submitted: "10 Sep 2026 - 05:10 PM",
    status: "Rejected",
  },
];

function AdminDashboard({ onLogout }) {
  const [requests, setRequests] = useState(initialRequests);
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const approvedCount = requests.filter(
    (request) => request.status === "Approved"
  ).length;

  const rejectedCount = requests.filter(
    (request) => request.status === "Rejected"
  ).length;

  const handleApprove = () => {
    if (!selectedRequest) return;

    setRequests((current) =>
      current.map((request) =>
        request.id === selectedRequest.id
          ? {
              ...request,
              status: "Approved",
              site: "dogam site 2",
              shift: "Morning Shift",
              attendance: "07:00 AM",
            }
          : request
      )
    );

    setSelectedRequest(null);
  };

  const handleReject = () => {
    if (!selectedRequest) return;

    setRequests((current) =>
      current.map((request) =>
        request.id === selectedRequest.id
          ? {
              ...request,
              status: "Rejected",
            }
          : request
      )
    );

    setSelectedRequest(null);
  };

  const pageTitles = {
    dashboard: "Dashboard",
    requests: "Work Requests",
    workers: "Workers",
    sites: "Work Sites",
    assignments: "Assignments",
    attendance: "Attendance",
    reports: "Reports",
  };

  return (
    <div className="admin-app">

      {/* =========================================
          SIDEBAR
          ========================================= */}
      <aside className="admin-sidebar">

        {/* Golden Eagle Brand */}
        <div className="admin-brand">
          <img
            src={logo}
            alt="Golden Eagle Logistics Services"
            className="admin-logo"
          />

          <div className="admin-brand-text">
            <strong>GOLDEN EAGLE</strong>
            <span>LOGISTICS SERVICES</span>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="sidebar-section">
          <p>MAIN</p>

          <button
            className={activePage === "dashboard" ? "active" : ""}
            onClick={() => setActivePage("dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className={activePage === "requests" ? "active" : ""}
            onClick={() => setActivePage("requests")}
          >
            <span>▤</span>
            Work Requests

            {pendingCount > 0 && (
              <b className="sidebar-badge">
                {pendingCount}
              </b>
            )}
          </button>

          <button
            className={activePage === "workers" ? "active" : ""}
            onClick={() => setActivePage("workers")}
          >
            <span>♙</span>
            Workers
          </button>

          <button
            className={activePage === "sites" ? "active" : ""}
            onClick={() => setActivePage("sites")}
          >
            <span>⌖</span>
            Work Sites
          </button>

          <button
            className={activePage === "assignments" ? "active" : ""}
            onClick={() => setActivePage("assignments")}
          >
            <span>✓</span>
            Assignments
          </button>
        </div>

        {/* Operations */}
        <div className="sidebar-section">
          <p>OPERATIONS</p>

          <button
            className={activePage === "attendance" ? "active" : ""}
            onClick={() => setActivePage("attendance")}
          >
            <span>◷</span>
            Attendance
          </button>

          <button
            className={activePage === "reports" ? "active" : ""}
            onClick={() => setActivePage("reports")}
          >
            <span>▥</span>
            Reports
          </button>
        </div>

        {/* Sidebar Bottom */}
        <div className="sidebar-bottom">

          <button>
            <span>⚙</span>
            Settings
          </button>

          <div className="admin-user">

            <div className="admin-avatar">
              A
            </div>

            <div className="admin-user-info">
              <strong>Admin User</strong>
              <span>Company Admin</span>
            </div>

            <button
              onClick={onLogout}
              className="logout-button"
              title="Logout"
            >
              ↪
            </button>

          </div>
        </div>
      </aside>

      {/* =========================================
          MAIN CONTENT
          ========================================= */}
      <main className="admin-main">

        {/* Header */}
        <header className="admin-header">

          <div>
            <h1>
              {pageTitles[activePage] || "Dashboard"}
            </h1>

            <p>
              Manage your workforce and daily work assignments.
            </p>
          </div>

          <div className="header-actions">

            <button className="notification-button">
              🔔
              <i></i>
            </button>

            <div className="header-date">
              <span>Today</span>
              <strong>10 September 2026</strong>
            </div>

          </div>
        </header>

        {/* =========================================
            DASHBOARD
            ========================================= */}
        {activePage === "dashboard" && (
          <>

            {/* Stats */}
            <section className="stats-grid">

              <div className="stat-card">
                <div className="stat-top">
                  <span>Pending Requests</span>
                  <div className="stat-icon orange">
                    ◷
                  </div>
                </div>

                <strong>{pendingCount}</strong>

                <small>
                  Requests waiting for review
                </small>
              </div>

              <div className="stat-card">
                <div className="stat-top">
                  <span>Approved Today</span>

                  <div className="stat-icon green">
                    ✓
                  </div>
                </div>

                <strong>
                  {approvedCount + 84}
                </strong>

                <small className="positive">
                  ↑ 8.4% from yesterday
                </small>
              </div>

              <div className="stat-card">
                <div className="stat-top">
                  <span>Workers Assigned</span>

                  <div className="stat-icon blue">
                    ♙
                  </div>
                </div>

                <strong>92</strong>

                <small>
                  Across all work sites
                </small>
              </div>

              <div className="stat-card">
                <div className="stat-top">
                  <span>Attendance</span>

                  <div className="stat-icon purple">
                    ◉
                  </div>
                </div>

                <strong>88%</strong>

                <small className="positive">
                  ↑ 3.2% this week
                </small>
              </div>

            </section>

            {/* Main Dashboard Grid */}
            <section className="dashboard-grid">

              {/* Requests */}
              <div className="requests-card">

                <div className="card-header">

                  <div>
                    <h2>Work Requests</h2>
                    <p>
                      Latest requests from workers
                    </p>
                  </div>

                  <button
                    className="view-all"
                    onClick={() => setActivePage("requests")}
                  >
                    View All →
                  </button>

                </div>

                <div className="request-table">

                  <div className="table-head">
                    <span>Worker</span>
                    <span>Job Type</span>
                    <span>Work Date</span>
                    <span>Status</span>
                    <span></span>
                  </div>

                  {requests.map((request) => (
                    <div
                      className="table-row"
                      key={request.id}
                    >

                      <div className="worker-cell">

                        <div className="worker-avatar">
                          {request.worker.charAt(0)}
                        </div>

                        <div>
                          <strong>
                            {request.worker}
                          </strong>

                          <small>
                            {request.workerId}
                          </small>
                        </div>

                      </div>

                      <span>
                        {request.job}
                      </span>

                      <span>
                        {request.date}
                      </span>

                      <span>
                        <Status
                          status={request.status}
                        />
                      </span>

                      <button
                        className="review-button"
                        onClick={() =>
                          setSelectedRequest(request)
                        }
                      >
                        Review
                      </button>

                    </div>
                  ))}

                </div>
              </div>

              {/* Today's Overview */}
              <div className="side-card">

                <div className="card-header">

                  <div>
                    <h2>Today's Overview</h2>
                    <p>
                      Workforce activity
                    </p>
                  </div>

                </div>

                <div className="overview-item">
                  <span>
                    Workers Requested
                  </span>
                  <strong>126</strong>
                </div>

                <div className="overview-item">
                  <span>
                    Workers Approved
                  </span>
                  <strong>94</strong>
                </div>

                <div className="overview-item">
                  <span>
                    Workers Rejected
                  </span>
                  <strong>18</strong>
                </div>

                <div className="overview-item">
                  <span>
                    Awaiting Review
                  </span>

                  <strong className="orange-text">
                    {pendingCount}
                  </strong>
                </div>

                <div className="capacity-box">

                  <div>
                    <span>
                      Workforce Capacity
                    </span>

                    <strong>
                      78%
                    </strong>
                  </div>

                  <div className="progress">
                    <div
                      style={{
                        width: "78%",
                      }}
                    ></div>
                  </div>

                  <small>
                    92 of 118 available positions assigned
                  </small>

                </div>

              </div>
            </section>

            {/* =========================================
                SITES
                ========================================= */}
            <section className="bottom-grid">

              <div className="sites-card">

                <div className="card-header">

                  <div>
                    <h2>Work Sites</h2>
                    <p>
                      Current workforce distribution
                    </p>
                  </div>

                  <button className="view-all">
                    Manage Sites →
                  </button>

                </div>

                <div className="site-list">

                  <Site
                    name="helal Project"
                    workers="32 / 40"
                    percentage="80%"
                  />

                  <Site
                    name="dorgam 1 Site"
                    workers="24 / 30"
                    percentage="80%"
                  />

                  <Site
                    name="air port Project"
                    workers="21 / 28"
                    percentage="75%"
                  />

                  <Site
                    name="arish Construction"
                    workers="15 / 20"
                    percentage="75%"
                  />

                </div>
              </div>

              {/* Recent Activity */}
              <div className="activity-card">

                <div className="card-header">

                  <div>
                    <h2>Recent Activity</h2>
                    <p>
                      Latest system events
                    </p>
                  </div>

                </div>

                <Activity
                  title="New work request"
                  description="Ahmed Hassan submitted a request"
                  time="2 min ago"
                />

                <Activity
                  title="Request approved"
                  description="Mahmoud Samir was assigned"
                  time="16 min ago"
                />

                <Activity
                  title="Worker assigned"
                  description="Cairo Project · Morning Shift"
                  time="18 min ago"
                />

                <Activity
                  title="Request rejected"
                  description="Omar Ibrahim was not selected"
                  time="32 min ago"
                />

              </div>
            </section>

          </>
        )}

        {/* =========================================
            REQUESTS PAGE
            ========================================= */}
        {activePage === "requests" && (
          <section className="full-page-card">

            <div className="card-header">

              <div>
                <h2>All Work Requests</h2>

                <p>
                  Review and manage worker requests
                </p>
              </div>

            </div>

            <div className="request-table">

              <div className="table-head">
                <span>Worker</span>
                <span>Job Type</span>
                <span>Work Date</span>
                <span>Status</span>
                <span></span>
              </div>

              {requests.map((request) => (
                <div
                  className="table-row"
                  key={request.id}
                >

                  <div className="worker-cell">

                    <div className="worker-avatar">
                      {request.worker.charAt(0)}
                    </div>

                    <div>
                      <strong>
                        {request.worker}
                      </strong>

                      <small>
                        {request.workerId}
                      </small>
                    </div>

                  </div>

                  <span>
                    {request.job}
                  </span>

                  <span>
                    {request.date}
                  </span>

                  <span>
                    <Status
                      status={request.status}
                    />
                  </span>

                  <button
                    className="review-button"
                    onClick={() =>
                      setSelectedRequest(request)
                    }
                  >
                    Review
                  </button>

                </div>
              ))}

            </div>
          </section>
        )}

        {/* =========================================
            OTHER MODULES
            ========================================= */}
        {activePage !== "dashboard" &&
          activePage !== "requests" && (
            <section className="coming-card">

              <div className="coming-icon">
                ◈
              </div>

              <h2>
                {pageTitles[activePage]} module
              </h2>

              <p>
                This module is ready to be connected to the
                workforce management workflow.
              </p>

            </section>
          )}

      </main>

      {/* =========================================
          REVIEW MODAL
          ========================================= */}
      {selectedRequest && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedRequest(null)}
        >

          <div
            className="review-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Modal Header */}
            <div className="modal-header">

              <div>
                <span>
                  WORK REQUEST
                </span>

                <h2>
                  Review Request
                </h2>
              </div>

              <button
                className="close-button"
                onClick={() =>
                  setSelectedRequest(null)
                }
              >
                ×
              </button>

            </div>

            {/* Worker */}
            <div className="modal-worker">

              <div className="large-avatar">
                {selectedRequest.worker.charAt(0)}
              </div>

              <div>
                <h3>
                  {selectedRequest.worker}
                </h3>

                <p>
                  {selectedRequest.workerId} ·{" "}
                  {selectedRequest.job}
                </p>
              </div>

              <Status
                status={selectedRequest.status}
              />

            </div>

            {/* Request Details */}
            <div className="request-details">

              <div>
                <span>
                  Requested Work Date
                </span>

                <strong>
                  {selectedRequest.date}
                </strong>
              </div>

              <div>
                <span>
                  Submitted
                </span>

                <strong>
                  {selectedRequest.submitted}
                </strong>
              </div>

            </div>

            {/* Assignment */}
            {selectedRequest.status === "Pending" && (
              <div className="assignment-section">

                <div className="section-title">

                  <h3>
                    Assignment
                  </h3>

                  <span>
                    Required after approval
                  </span>

                </div>

                <div className="form-grid">

                  <label>
                    Work Site

                    <select defaultValue="Cairo Project">
                      <option>
                        Cairo Project
                      </option>

                      <option>
                        Alexandria Site
                      </option>

                      <option>
                        New Capital Project
                      </option>

                      <option>
                        Giza Construction
                      </option>
                    </select>
                  </label>

                  <label>
                    Shift

                    <select defaultValue="Morning Shift">
                      <option>
                        Morning Shift
                      </option>

                      <option>
                        Evening Shift
                      </option>

                      <option>
                        Night Shift
                      </option>
                    </select>
                  </label>

                  <label>
                    Attendance Time

                    <input
                      type="time"
                      defaultValue="07:00"
                    />
                  </label>

                </div>
              </div>
            )}

            {/* Approved Details */}
            {selectedRequest.status === "Approved" && (
              <div className="approved-details">

                <div>
                  <span>
                    Work Site
                  </span>

                  <strong>
                    {selectedRequest.site}
                  </strong>
                </div>

                <div>
                  <span>
                    Shift
                  </span>

                  <strong>
                    {selectedRequest.shift}
                  </strong>
                </div>

                <div>
                  <span>
                    Attendance
                  </span>

                  <strong>
                    {selectedRequest.attendance}
                  </strong>
                </div>

              </div>
            )}

            {/* Modal Actions */}
            <div className="modal-actions">

              <button
                className="cancel-button"
                onClick={() =>
                  setSelectedRequest(null)
                }
              >
                Close
              </button>

              {selectedRequest.status === "Pending" && (
                <>
                  <button
                    className="reject-button"
                    onClick={handleReject}
                  >
                    Reject Request
                  </button>

                  <button
                    className="approve-button"
                    onClick={handleApprove}
                  >
                    Approve & Assign
                  </button>
                </>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
}


/* =========================================
   STATUS COMPONENT
   ========================================= */

function Status({ status }) {
  const className = status.toLowerCase();

  return (
    <span className={`status ${className}`}>
      <i></i>
      {status}
    </span>
  );
}


/* =========================================
   SITE COMPONENT
   ========================================= */

function Site({
  name,
  workers,
  percentage,
}) {
  return (
    <div className="site-row">

      <div className="site-info">

        <div className="site-icon">
          ⌖
        </div>

        <div>
          <strong>
            {name}
          </strong>

          <span>
            {workers} workers
          </span>
        </div>

      </div>

      <div className="site-progress">

        <div className="progress">
          <div
            style={{
              width: percentage,
            }}
          ></div>
        </div>

        <strong>
          {percentage}
        </strong>

      </div>

    </div>
  );
}


/* =========================================
   ACTIVITY COMPONENT
   ========================================= */

function Activity({
  title,
  description,
  time,
}) {
  return (
    <div className="activity-row">

      <div className="activity-dot"></div>

      <div>
        <strong>
          {title}
        </strong>

        <p>
          {description}
        </p>
      </div>

      <span>
        {time}
      </span>

    </div>
  );
}


export default AdminDashboard;