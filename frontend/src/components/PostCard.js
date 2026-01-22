import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div
      className="card"
      style={{
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.3)";
      }}
    >
      {post.imageURL && (
        <div
          style={{
            marginBottom: "16px",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <img
            src={post.imageURL}
            alt={post.title}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          />
        </div>
      )}
      <h2
        style={{
          fontSize: "20px",
          marginBottom: "12px",
          color: "#e2e8f0",
          lineHeight: "1.4",
        }}
      >
        {post.title}
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <p
          style={{
            color: "#9ca3af",
            fontSize: "14px",
            margin: "0",
          }}
        >
          By:{" "}
          <span style={{ color: "#60a5fa", fontWeight: "500" }}>
            {post.username}
          </span>
        </p>
        <span
          style={{
            color: "#6b7280",
            fontSize: "12px",
          }}
        >
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
      <Link
        to={`/post/${post._id}`}
        className="link"
        style={{
          display: "inline-flex",
          alignItems: "center",
          fontWeight: "500",
          fontSize: "16px",
        }}
      >
        Read more
        <span style={{ marginLeft: "8px", transition: "transform 0.3s ease" }}>
          →
        </span>
      </Link>
    </div>
  );
}
