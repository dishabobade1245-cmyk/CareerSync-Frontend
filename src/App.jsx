import { useState, useEffect } from "react";
import "./App.css";
import StudentJobs from "./StudentJobs";
import StudentApplications from "./StudentApplications";
import StudentProfile from "./StudentProfile";
import RecruiterPostJob from "./RecruiterPostJob";
import RecruiterJobs from "./RecruiterJobs";
import RecruiterApplications from "./RecruiterApplications";
import AdminUsers from "./AdminUsers";

function Dashboard({ name, role, onLogout }) {
  const [view, setView] = useState("dashboard");

  const roleTitle = {
    STUDENT: "Student Dashboard",
    RECRUITER: "Recruiter Dashboard",
    ADMIN: "Admin Dashboard",
  };

  const roleDescription = {
    STUDENT:
      "Find opportunities, manage applications and build your career.",
    RECRUITER:
      "Manage job openings and review student applications.",
    ADMIN:
      "Manage users, jobs and the complete placement ecosystem.",
  };

  if (view === "student-jobs" && role === "STUDENT") {
    return (
      <DashboardPage onBack={() => setView("dashboard")}>
        <StudentJobs />
      </DashboardPage>
    );
  }

  if (view === "student-applications" && role === "STUDENT") {
    return (
      <DashboardPage onBack={() => setView("dashboard")}>
        <StudentApplications />
      </DashboardPage>
    );
  }

  if (view === "student-profile" && role === "STUDENT") {
    return (
      <DashboardPage onBack={() => setView("dashboard")}>
        <StudentProfile />
      </DashboardPage>
    );
  }

  if (view === "recruiter-post-job" && role === "RECRUITER") {
    return (
      <DashboardPage onBack={() => setView("dashboard")}>
        <RecruiterPostJob />
      </DashboardPage>
    );
  }

  if (view === "recruiter-jobs" && role === "RECRUITER") {
    return (
      <DashboardPage onBack={() => setView("dashboard")}>
        <RecruiterJobs />
      </DashboardPage>
    );
  }

  if (
    view === "recruiter-applications" &&
    role === "RECRUITER"
  ) {
    return (
      <DashboardPage onBack={() => setView("dashboard")}>
        <RecruiterApplications />
      </DashboardPage>
    );
  }

  if (view === "admin-users" && role === "ADMIN") {
    return (
      <DashboardPage onBack={() => setView("dashboard")}>
        <AdminUsers />
      </DashboardPage>
    );
  }

  if (view === "admin-jobs" && role === "ADMIN") {
    return (
      <DashboardPage onBack={() => setView("dashboard")}>
        <AdminJobs />
      </DashboardPage>
    );
  }

  if (view === "admin-applications" && role === "ADMIN") {
    return (
      <DashboardPage onBack={() => setView("dashboard")}>
        <AdminApplications />
      </DashboardPage>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eee7ff 0%, #eef2ff 45%, #f8ecff 100%)",
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow:
            "0 25px 70px rgba(79, 70, 229, 0.15)",
        }}
      >
        <div
          style={{
            padding: "25px 35px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              color: "#111827",
            }}
          >
            Career<span style={{ color: "#6366f1" }}>Sync</span>
          </h1>

          <button
            type="button"
            onClick={onLogout}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "10px",
              background: "#eef2ff",
              color: "#4338ca",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        <div
          style={{
            padding: "45px 50px",
            background:
              "linear-gradient(135deg, #111827 0%, #1e1b4b 100%)",
            color: "white",
          }}
        >
          <p
            style={{
              margin: "0 0 10px",
              color: "#a5b4fc",
              fontSize: "15px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {role}
          </p>

          <h2
            style={{
              margin: "0 0 10px",
              fontSize: "38px",
            }}
          >
            Welcome, {name}!
          </h2>

          <p
            style={{
              margin: 0,
              color: "#c7d2fe",
              fontSize: "17px",
            }}
          >
            {roleDescription[role]}
          </p>
        </div>

        <div style={{ padding: "40px 50px" }}>
          <h2
            style={{
              margin: "0 0 8px",
              fontSize: "28px",
              color: "#111827",
            }}
          >
            {roleTitle[role]}
          </h2>

          <p
            style={{
              margin: "0 0 30px",
              color: "#64748b",
            }}
          >
            Manage your CareerSync activities from here.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {role === "STUDENT" && (
              <>
                <DashboardCard
                  title="Browse Jobs"
                  description="Explore available job opportunities."
                  onClick={() => setView("student-jobs")}
                />

                <DashboardCard
                  title="My Applications"
                  description="Track your submitted applications."
                  onClick={() =>
                    setView("student-applications")
                  }
                />

                <DashboardCard
                  title="My Profile"
                  description="View and manage your student profile."
                  onClick={() => setView("student-profile")}
                />
              </>
            )}

            {role === "RECRUITER" && (
              <>
                <DashboardCard
                  title="Post Jobs"
                  description="Create and publish new job openings."
                  onClick={() =>
                    setView("recruiter-post-job")
                  }
                />

                <DashboardCard
                  title="My Jobs"
                  description="Manage your posted job opportunities."
                  onClick={() =>
                    setView("recruiter-jobs")
                  }
                />

                <DashboardCard
                  title="Applications"
                  description="Review applications from students."
                  onClick={() =>
                    setView("recruiter-applications")
                  }
                />
              </>
            )}

            {role === "ADMIN" && (
              <>
                <DashboardCard
                  title="Manage Users"
                  description="View students and recruiters."
                  onClick={() => setView("admin-users")}
                />

                <DashboardCard
                  title="Manage Jobs"
                  description="Monitor all posted job opportunities."
                  onClick={() => setView("admin-jobs")}
                />

                <DashboardCard
                  title="Applications"
                  description="Monitor the complete application process."
                  onClick={() =>
                    setView("admin-applications")
                  }
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:8080/api/admin/jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load jobs");
        }

        const data = await response.json();
        setJobs(data);
      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          padding: "30px",
          textAlign: "center",
          color: "#111827",
        }}
      >
        Loading jobs...
      </div>
    );
  }

  return (
    <div>
      <h2
        style={{
          margin: "0 0 8px",
          textAlign: "center",
          fontSize: "30px",
          color: "#111827",
        }}
      >
        Manage Jobs
      </h2>

      <p
        style={{
          margin: "0 0 30px",
          textAlign: "center",
          color: "#64748b",
        }}
      >
        Monitor all posted job opportunities.
      </p>

      {message && (
        <div
          style={{
            padding: "14px 18px",
            marginBottom: "25px",
            borderRadius: "10px",
            background: "#fef2f2",
            color: "#b91c1c",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          {message}
        </div>
      )}

      {jobs.map((job) => (
        <div
          key={job.id}
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "18px",
            padding: "30px",
            marginBottom: "24px",
            background: "#ffffff",
            boxShadow:
              "0 8px 25px rgba(15, 23, 42, 0.06)",
          }}
        >
          <h3
            style={{
              margin: "0 0 8px",
              fontSize: "24px",
              color: "#111827",
            }}
          >
            {job.title}
          </h3>

          <p
            style={{
              margin: "0 0 20px",
              fontSize: "17px",
              fontWeight: "600",
              color: "#334155",
            }}
          >
            {job.company}
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "25px",
            }}
          >
            <span
              style={{
                padding: "8px 14px",
                borderRadius: "8px",
                background: "#f1f5f9",
                color: "#334155",
                fontSize: "14px",
              }}
            >
              📍 {job.location}
            </span>

            <span
              style={{
                padding: "8px 14px",
                borderRadius: "8px",
                background: "#f1f5f9",
                color: "#334155",
                fontSize: "14px",
              }}
            >
              💼 {job.employmentType}
            </span>

            {job.salary && (
              <span
                style={{
                  padding: "8px 14px",
                  borderRadius: "8px",
                  background: "#f1f5f9",
                  color: "#334155",
                  fontSize: "14px",
                }}
              >
                💰 ₹{job.salary.toLocaleString("en-IN")} / year
              </span>
            )}
          </div>

          <h4
            style={{
              margin: "0 0 8px",
              color: "#111827",
            }}
          >
            Job Description
          </h4>

          <p
            style={{
              margin: "0 0 20px",
              lineHeight: "1.7",
              color: "#475569",
            }}
          >
            {job.description}
          </p>

          {job.requiredSkills && (
            <p
              style={{
                margin: "0 0 20px",
                color: "#475569",
              }}
            >
              <strong>Required Skills:</strong>{" "}
              {job.requiredSkills}
            </p>
          )}

          <div
            style={{
              paddingTop: "20px",
              borderTop: "1px solid #e5e7eb",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Posted by:{" "}
            <strong style={{ color: "#334155" }}>
              {job.recruiterName}
            </strong>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:8080/api/admin/applications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load applications");
        }

        const data = await response.json();
        setApplications(data);
      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          padding: "30px",
          textAlign: "center",
          color: "#111827",
        }}
      >
        Loading applications...
      </div>
    );
  }

  return (
    <div>
      <h2
        style={{
          margin: "0 0 8px",
          textAlign: "center",
          fontSize: "30px",
          color: "#111827",
        }}
      >
        Applications
      </h2>

      <p
        style={{
          margin: "0 0 30px",
          textAlign: "center",
          color: "#64748b",
        }}
      >
        Monitor the complete student application process.
      </p>

      {message && (
        <div
          style={{
            padding: "14px 18px",
            marginBottom: "25px",
            borderRadius: "10px",
            background: "#fef2f2",
            color: "#b91c1c",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          {message}
        </div>
      )}

      {applications.length === 0 ? (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            border: "1px solid #e2e8f0",
            borderRadius: "18px",
            background: "#ffffff",
          }}
        >
          <h3
            style={{
              margin: "0 0 10px",
              color: "#111827",
            }}
          >
            No Applications Found
          </h3>

          <p
            style={{
              margin: 0,
              color: "#64748b",
            }}
          >
            No student applications are available yet.
          </p>
        </div>
      ) : (
        applications.map((application) => (
          <div
            key={application.id}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "18px",
              padding: "28px",
              marginBottom: "20px",
              background: "#ffffff",
              boxShadow:
                "0 8px 25px rgba(15, 23, 42, 0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: "23px",
                    color: "#111827",
                  }}
                >
                  {application.studentName}
                </h3>

                <p
                  style={{
                    margin: "0 0 8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#334155",
                  }}
                >
                  {application.jobTitle}
                </p>

                <p
                  style={{
                    margin: "0 0 8px",
                    color: "#64748b",
                  }}
                >
                  {application.company}
                </p>

                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    color: "#64748b",
                  }}
                >
                  Application ID: #{application.id}
                </p>
              </div>

              <span
                style={{
                  padding: "9px 16px",
                  borderRadius: "10px",
                  background:
                    application.status === "SELECTED"
                      ? "#dcfce7"
                      : application.status === "REJECTED"
                        ? "#fee2e2"
                        : application.status === "SHORTLISTED"
                          ? "#fef3c7"
                          : "#eef2ff",
                  color:
                    application.status === "SELECTED"
                      ? "#15803d"
                      : application.status === "REJECTED"
                        ? "#b91c1c"
                        : application.status === "SHORTLISTED"
                          ? "#b45309"
                          : "#4338ca",
                  fontWeight: "700",
                  fontSize: "14px",
                }}
              >
                {application.status}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function DashboardPage({ onBack, children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eee7ff 0%, #eef2ff 45%, #f8ecff 100%)",
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "40px",
          boxShadow:
            "0 25px 70px rgba(79, 70, 229, 0.15)",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{
            marginBottom: "25px",
            padding: "10px 18px",
            border: "none",
            borderRadius: "10px",
            background: "#eef2ff",
            color: "#4338ca",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          ← Back to Dashboard
        </button>

        {children}
      </div>
    </div>
  );
}

function DashboardCard({ title, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      style={{
        width: "100%",
        padding: "25px",
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        background: "#ffffff",
        boxShadow:
          "0 8px 25px rgba(15, 23, 42, 0.05)",
        textAlign: "center",
        cursor: onClick ? "pointer" : "default",
        fontFamily: "inherit",
        appearance: "none",
      }}
    >
      <h3
        style={{
          margin: "0 0 10px",
          color: "#111827",
          fontSize: "19px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: 0,
          color: "#64748b",
          lineHeight: "1.6",
        }}
      >
        {description}
      </p>
    </button>
  );
}

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const [name, setName] = useState(
    localStorage.getItem("name") || ""
  );

  const [role, setRole] = useState(
    localStorage.getItem("role") || ""
  );

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);

      setName(data.name);
      setRole(data.role);
      setLoggedIn(true);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    setLoggedIn(false);
    setName("");
    setRole("");
    setEmail("");
    setPassword("");
  };

  if (loggedIn) {
    return (
      <Dashboard
        name={name}
        role={role}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="app">
      <div className="decor decor-one"></div>
      <div className="decor decor-two"></div>
      <div className="decor decor-three"></div>
      <div className="decor decor-four"></div>
      <div className="decor decor-five"></div>

      <div className="dot-pattern dots-left"></div>
      <div className="dot-pattern dots-right"></div>

      <div className="curve curve-one"></div>
      <div className="curve curve-two"></div>

      <div className="login-container">
        <div className="brand-section">
          <div className="brand-circle circle-top"></div>
          <div className="brand-circle circle-bottom"></div>

          <div className="brand-content">
            <h1>
              Career<span>Sync</span>
            </h1>

            <p className="tagline">
              Connect. Apply. Grow.
            </p>

            <div className="brand-line"></div>

            <p className="brand-description">
              A unified platform for students, recruiters and
              administrators to manage the complete placement journey.
            </p>
          </div>
        </div>

        <div className="login-card">
          <div className="login-content">
            <h2>Welcome Back</h2>

            <p className="login-subtitle">
              Sign in to continue to CareerSync
            </p>

            <form onSubmit={handleLogin}>
              <label>Email</label>

              <div className="input-wrapper">
                <svg
                  className="input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                  />
                  <path d="m3 7 9 6 9-6" />
                </svg>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <label>Password</label>

              <div className="input-wrapper">
                <svg
                  className="input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="10"
                    rx="2"
                  />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <span className="eye-icon">◉</span>
              </div>

              <button type="submit">
                Sign In
              </button>
            </form>

            {message && (
              <p className="message">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;