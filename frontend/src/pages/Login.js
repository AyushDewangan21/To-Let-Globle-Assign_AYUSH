import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token, res.data.username);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
            Welcome Back
          </h2>
          <p style={{ color: "#9ca3af", margin: "0" }}>
            Sign in to your account
          </p>
        </div>

        {error && <div className="error">{error}</div>}

        <div style={{ marginBottom: "20px" }}>
          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{ marginBottom: "16px" }}
          />
          <input
            type="password"
            placeholder="Password"
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
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div style={{ textAlign: "center" }}>
          <span style={{ color: "#9ca3af" }}>Don't have an account? </span>
          <a href="/register" className="link" style={{ fontWeight: "500" }}>
            Create one here
          </a>
        </div>
      </div>
    </div>
  );
}
