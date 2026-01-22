import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div className="card" style={{ maxWidth: "400px", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "32px",
              marginBottom: "8px",
              background: "linear-gradient(135deg, #60a5fa 0%, #93c5fd 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Create Account
          </h2>
          <p style={{ color: "#9ca3af", margin: "0" }}>
            Join our blogging community
          </p>
        </div>

        {error && <div className="error">{error}</div>}

        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            style={{ marginBottom: "16px" }}
          />
          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{ marginBottom: "16px" }}
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          onClick={submit}
          disabled={loading}
          style={{
            width: "100%",
            marginBottom: "24px",
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <div style={{ textAlign: "center" }}>
          <span style={{ color: "#9ca3af" }}>Already have an account? </span>
          <a href="/login" className="link" style={{ fontWeight: "500" }}>
            Sign in here
          </a>
        </div>
      </div>
    </div>
  );
}
