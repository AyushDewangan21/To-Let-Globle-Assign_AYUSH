import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        color: "white",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        borderBottom: "1px solid #374151",
        backdropFilter: "blur(10px)",
      }}
    >
      <div>
        <Link
          to="/"
          style={{
            color: "#60a5fa",
            fontWeight: "bold",
            fontSize: "24px",
            textDecoration: "none",
            background: "linear-gradient(135deg, #60a5fa 0%, #93c5fd 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          MyBlog
        </Link>
      </div>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {!user && (
          <>
            <Link
              to="/login"
              style={{
                color: "#e2e8f0",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(96, 165, 250, 0.1)";
                e.target.style.color = "#60a5fa";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#e2e8f0";
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                color: "#e2e8f0",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(96, 165, 250, 0.1)";
                e.target.style.color = "#60a5fa";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#e2e8f0";
              }}
            >
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <span style={{ color: "#e2e8f0", fontWeight: "500" }}>
              Welcome, <span style={{ color: "#60a5fa" }}>{user}</span>
            </span>
            <Link
              to="/create"
              style={{
                color: "#e2e8f0",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(96, 165, 250, 0.1)";
                e.target.style.color = "#60a5fa";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#e2e8f0";
              }}
            >
              Create Post
            </Link>
            <Link
              to="/myposts"
              style={{
                color: "#e2e8f0",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(96, 165, 250, 0.1)";
                e.target.style.color = "#60a5fa";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#e2e8f0";
              }}
            >
              My Posts
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                border: "none",
                color: "white",
                padding: "8px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500",
                boxShadow: "0 4px 15px rgba(220, 38, 38, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(220, 38, 38, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(220, 38, 38, 0.3)";
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
