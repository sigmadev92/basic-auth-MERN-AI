import React, { useState, useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const NavigationBar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode"); // Apply dark mode globally
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data
    setUser(null);
    navigate("/login"); // Redirect to login
  };

  return (
    <Navbar
      expand="lg"
      bg={darkMode ? "dark" : "light"}
      variant={darkMode ? "dark" : "light"}
      className="shadow"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          MERN Auth
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {!user && (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
            {user && (
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
            )}

            {/* Show Dashboard Link Only When Logged In */}
            {user && (
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
            )}

            {/* Dark Mode Toggle Button */}
            <Button
              variant={darkMode ? "light" : "dark"}
              className="ms-3"
              onClick={toggleDarkMode}
            >
              {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
            </Button>

            {/* Logout Button for Logged-In Users */}
            {user && (
              <Button variant="danger" className="ms-3" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
