import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { userURL } from "../functions/urls";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import userContext from "../context/AuthContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${userURL}/login`, {
        email,
        password,
      });
      if (response.data.status) {
        localStorage.setItem("token", response.data.token); //
        console.log(response.data.token);
        setUser(response.data.userData);
        navigate("/dashboard");
      } else {
        setError(response.data.message);
      }

      // Redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <>
      {!user ? (
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <Card style={{ width: "400px" }} className="p-4 shadow">
            <h3 className="text-center">Login</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>

            <div className="text-center mt-3">
              <small>
                Don't have an account? <a href="/register">Sign Up</a>
              </small>
            </div>
          </Card>
        </Container>
      ) : (
        <Navigate to={"/dashboard"} />
      )}
    </>
  );
};

export default Login;
