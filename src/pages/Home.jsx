import React, { useContext } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Home.css";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div>
      {/* Dark Mode Toggle */}

      {/* Hero Section with Animation */}
      <motion.div
        className="hero-section text-center text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Container>
          <h1>Welcome to MERN Auth</h1>
          <p className="lead">
            Secure authentication with modern technologies. Sign up now to get
            started!
          </p>
          {!user && (
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/register")}
            >
              Get Started
            </Button>
          )}
        </Container>
      </motion.div>

      {/* Features Section with Animation */}
      <Container className="features-section mt-5">
        <h2 className="text-center mb-4">Why Choose Us?</h2>
        <Row>
          {[
            {
              title: "Secure Authentication",
              desc: "We use bcrypt for password hashing and JWT for secure user sessions.",
            },
            {
              title: "Easy to Use",
              desc: "Our simple and intuitive interface makes authentication seamless.",
            },
            {
              title: "Fast Performance",
              desc: "Optimized for speed and reliability using MERN",
            },
          ].map((feature, index) => (
            <Col md={4} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="feature-card text-center">
                  <Card.Body>
                    <h4>{feature.title}</h4>
                    <p>{feature.desc}</p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
