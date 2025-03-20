import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import { useContext, useEffect } from "react";
import UserContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../functions/urls";
import VerifyUser from "../pages/VerifyUser";
import Feed from "../pages/Feed";
const AppRouter = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null || token.length === 0) return;
    const fetcht = async () => {
      const response = await axios.get(`${baseURL}/api/auth/profile`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      if (response.data.status) {
        // console.log(response.data);
        setUser(response.data.user);
      } else {
        setUser(null);
        navigate("/");
      }
    };
    if (token.length > 1) fetcht();
  }, []);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify/:token" element={<VerifyUser />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="*" element={<NotFound />} /> {/* 404 Page */}
      </Routes>
    </Layout>
  );
};

export default AppRouter;
