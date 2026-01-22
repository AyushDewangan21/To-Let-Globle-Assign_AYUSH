import { useEffect, useState } from "react";
import API from "../api/api";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

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
          Loading posts...
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "#9ca3af",
        }}
      >
        <h2 style={{ color: "#60a5fa", marginBottom: "16px" }}>No posts yet</h2>
        <p>Be the first to share your thoughts!</p>
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
          Discover Amazing Stories
        </h1>
        <p style={{ color: "#9ca3af", fontSize: "18px" }}>
          Explore the latest posts from our community
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gap: "24px",
          gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
        }}
      >
        {posts.map((p) => (
          <PostCard key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
