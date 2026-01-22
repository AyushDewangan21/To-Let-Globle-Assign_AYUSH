import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

export default function CreateEditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    imageURL: "",
    content: "",
  });

  const [errors, setErrors] = useState({});

  // Load post if EDIT
  useEffect(() => {
    if (id) {
      API.get(`/posts/${id}`).then((res) => {
        setForm({
          title: res.data.title,
          imageURL: res.data.imageURL,
          content: res.data.content,
        });
      });
    }
  }, [id]);

  const validate = () => {
    const errs = {};

    if (form.title.length < 5 || form.title.length > 120) {
      errs.title = "Title must be 5–120 characters";
    }

    if (form.content.length < 50) {
      errs.content = "Content must be at least 50 characters";
    }

    if (form.imageURL && !/^https?:\/\/.+\..+/.test(form.imageURL)) {
      errs.imageURL = "Invalid image URL";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (id) {
        await API.put(`/posts/${id}`, form);
      } else {
        await API.post("/posts", form);
      }
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <div className="card">
        <div style={{ marginBottom: "32px", textAlign: "center" }}>
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
            {id ? "Edit Your Post" : "Create New Post"}
          </h2>
          <p style={{ color: "#9ca3af", margin: "0" }}>
            {id
              ? "Make changes to your story"
              : "Share your thoughts with the world"}
          </p>
        </div>

        <form
          onSubmit={submit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#e2e8f0",
                fontWeight: "500",
              }}
            >
              Title *
            </label>
            <input
              type="text"
              placeholder="Enter an engaging title..."
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              style={{ width: "100%" }}
            />
            {errors.title && (
              <div className="error" style={{ marginTop: "8px" }}>
                {errors.title}
              </div>
            )}
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#e2e8f0",
                fontWeight: "500",
              }}
            >
              Image URL (optional)
            </label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.imageURL}
              onChange={(e) => setForm({ ...form, imageURL: e.target.value })}
              style={{ width: "100%" }}
            />
            {errors.imageURL && (
              <div className="error" style={{ marginTop: "8px" }}>
                {errors.imageURL}
              </div>
            )}
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#e2e8f0",
                fontWeight: "500",
              }}
            >
              Content *
            </label>
            <textarea
              placeholder="Write your story here... (minimum 50 characters)"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              style={{
                width: "100%",
                minHeight: "200px",
                resize: "vertical",
              }}
            />
            {errors.content && (
              <div className="error" style={{ marginTop: "8px" }}>
                {errors.content}
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "flex-end",
              marginTop: "16px",
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/")}
              style={{
                background: "transparent",
                border: "2px solid #374151",
                color: "#9ca3af",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#60a5fa";
                e.target.style.color = "#60a5fa";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "#374151";
                e.target.style.color = "#9ca3af";
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: "0 0 auto",
                minWidth: "140px",
              }}
            >
              {id ? "Update Post" : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
