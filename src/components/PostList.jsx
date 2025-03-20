import { useEffect, useState } from "react";
import axios from "axios";

export default function PostList({ newPost }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts when component mounts
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data);
        console.log(response.data[0]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    // Update post list when a new post is created
    if (newPost) {
      console.log(newPost);
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    }
  }, [newPost]);

  return (
    <div className="mt-4">
      <h3>Recent Posts</h3>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="card mb-3 p-3">
            <h5>{post.user?.email}</h5>
            <p>{post.content}</p>
          </div>
        ))
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  );
}
