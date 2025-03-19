import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { userURL } from "../functions/urls";
import AuthContext from "../context/AuthContext";
const Register = () => {
  const [email, setEmail] = useState("");
  const { user } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${userURL}/signup`, {
        email,
        password,
      });
      if (response.data.status) {
        setSuccess(response.data.message);
        setTimeout(() => {
          navigate("/login"); // Redirect to login after successful signup
        }, 2000);
      } else {
        setSuccess(response.data.message);
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <>
      {!user && (
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <Card style={{ width: "400px" }} className="p-4 shadow">
            <h3 className="text-center">Sign Up</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSignup}>
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
                  placeholder="Enter password (6-10 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength="6"
                  maxLength="10"
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Sign Up
              </Button>
            </Form>

            <div className="text-center mt-3">
              <small>
                Already have an account? <a href="/login">Login</a>
              </small>
            </div>
          </Card>
        </Container>
      )}
    </>
  );
};

export default Register;
