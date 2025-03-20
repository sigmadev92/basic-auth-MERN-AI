import { useContext, useState } from "react";
import CreatePost from "../components/CreatePost";
import PostList from "../components/PostList";
import ToastNotification from "../components/ToastComponent";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Feed() {
  const [newPost, setNewPost] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", variant: "" });
  const { user } = useContext(AuthContext);
  return (
    <>
      {user ? (
        <div className="container mt-4">
          <CreatePost setNewPost={setNewPost} setToast={setToast} />
          <h2>Feed</h2>
          <PostList newPost={newPost} />
          <ToastNotification toast={toast} setToast={setToast} />
        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
}
