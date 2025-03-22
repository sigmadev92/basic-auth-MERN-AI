import { useEffect, useState } from "react";
import axios from "axios";
import { likeURL, postURL } from "../functions/urls";
import { FaHeart } from "react-icons/fa";

export default function PostList({ newPost }) {
  const [posts, setPosts] = useState([]);
  const handleLikeButton = async (postId) => {
    try {
      const response = await axios.post(
        `${likeURL}`,
        { postId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.status) {
        console.log("Post liked successfully");
        const updatedPosts = posts.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              currentUserLiked: true,
              likesCount: post.likesCount + 1,
            };
          }
          return post;
        });

        setPosts(updatedPosts);

        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnlikeButton = async (postId) => {
    try {
      const response = await axios.post(
        `${likeURL}/unlike`,
        { postId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Post unliked successfully");
        const updatedPosts = posts.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              currentUserLiked: null,
              likesCount: post.likesCount - 1,
            };
          }
          return post;
        });
        setPosts(updatedPosts);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Fetch posts when component mounts
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${postURL}/posts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
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
            <div className="d-flex justify-content-end align-items-center">
              <FaHeart
                style={{
                  fill: post.currentUserLiked !== null ? "red" : "white",
                  backgroundColor: "black",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (post.currentUserLiked) handleUnlikeButton(post._id);
                  else handleLikeButton(post._id);
                }}
              />
              <span className="ms-2">{post.likesCount}</span>
            </div>
          </div>
        ))
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  );
}
