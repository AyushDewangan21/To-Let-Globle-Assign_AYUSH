import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");

  useEffect(() => {
    API.get(`/posts?search=${username}`)
      .then((res) => {
        const mine = res.data.filter((p) => p.username === username);
        setPosts(mine);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [username]);

  const deletePost = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this post? This action cannot be undone.",
      )
    )
      return;

    try {
      await API.delete(`/posts/${id}`);
      setPosts(posts.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          color: "#9ca3af",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid #374151",
              borderTop: "4px solid #60a5fa",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px",
            }}
          ></div>
          Loading your posts...
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "8px",
            background: "linear-gradient(135deg, #60a5fa 0%, #93c5fd 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          My Posts
        </h1>
        <p style={{ color: "#9ca3af", fontSize: "18px" }}>
          Manage your published stories
        </p>
      </div>

      {posts.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#9ca3af",
          }}
        >
          <h2 style={{ color: "#60a5fa", marginBottom: "16px" }}>
            No posts yet
          </h2>
          <p style={{ marginBottom: "24px" }}>
            Start sharing your thoughts with the world!
          </p>
          <Link
            to="/create"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: "500",
              boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(59, 130, 246, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(59, 130, 246, 0.3)";
            }}
          >
            Create Your First Post
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "24px",
            gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
          }}
        >
          {posts.map((p) => (
            <div
              key={p._id}
              className="card"
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 25px 50px rgba(0, 0, 0, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(0, 0, 0, 0.3)";
              }}
            >
              {p.imageURL && (
                <div
                  style={{
                    marginBottom: "16px",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={p.imageURL}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
              <h3
                style={{
                  fontSize: "20px",
                  marginBottom: "12px",
                  color: "#e2e8f0",
                  lineHeight: "1.4",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  color: "#9ca3af",
                  fontSize: "14px",
                  marginBottom: "16px",
                }}
              >
                {new Date(p.createdAt).toLocaleDateString()}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end",
                }}
              >
                <Link
                  to={`/edit/${p._id}`}
                  style={{
                    padding: "8px 16px",
                    background: "transparent",
                    border: "2px solid #60a5fa",
                    color: "#60a5fa",
                    textDecoration: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#60a5fa";
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#60a5fa";
                  }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => deletePost(p._id)}
                  style={{
                    padding: "8px 16px",
                    background:
                      "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                    border: "none",
                    color: "white",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(220, 38, 38, 0.3)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 6px 20px rgba(220, 38, 38, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 4px 15px rgba(220, 38, 38, 0.3)";
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
