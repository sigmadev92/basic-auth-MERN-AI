import { useState } from "react";
import axios from "axios";
import { postURL } from "../functions/urls";

export default function CreatePost({ setNewPost, setToast }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${postURL}/create`,
        { content },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      setContent("");
      if (response.data.status) {
        setNewPost(response.data.newPost);
        setToast({
          show: true,
          message: "Post created successfully!",
          variant: "success",
        });
      } else {
        setError("Failed to create post");
        setToast({
          show: true,
          message: response.data.message,
          variant: "danger",
        });
      }
    } catch (err) {
      setError("Failed to create post");
      setToast({ show: true, message: "Some Error", variant: "danger" });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-3">Create a Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="4"
              placeholder="Write your post here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Posting..." : "Submit"}
          </button>
        </form>
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    </div>
  );
}
