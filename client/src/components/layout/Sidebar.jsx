import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside
      style={{
        width: "220px",
        background: "#334155",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h3>Admin Panel</h3>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/profile">Profile</Link>
        <Link to="/admin/skills">Skills</Link>
        <Link to="/admin/projects">Projects</Link>
        <Link to="/admin/experience">Experience</Link>
        <Link to="/admin/education">Education</Link>
        <Link to="/admin/certificates">Certificates</Link>
        <Link to="/admin/resume">Resume</Link>
        <Link to="/admin/social-links">Social Links</Link>
        <Link to="/admin/messages">Messages</Link>
        <Link to="/admin/settings">Settings</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;