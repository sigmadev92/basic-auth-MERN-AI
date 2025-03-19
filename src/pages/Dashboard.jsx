import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import axios from "axios";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import AuthContext from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return (
    <>
      {user ? (
        <Container fluid className="dashboard">
          <Row>
            {/* Sidebar */}
            <Col md={3} className="sidebar bg-dark text-light p-4">
              <h4 className="text-center mb-4">Dashboard</h4>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Button
                    variant="outline-light"
                    className="w-100 mb-2"
                    onClick={() => navigate("/")}
                  >
                    Home
                  </Button>
                </li>
                <li className="nav-item">
                  <Button
                    variant="outline-light"
                    className="w-100 mb-2"
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </Button>
                </li>
                <li className="nav-item">
                  <Button
                    variant="outline-danger"
                    className="w-100 mt-4"
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/login");
                    }}
                  >
                    Logout
                  </Button>
                </li>
              </ul>
            </Col>

            {/* Main Content */}
            <Col md={9} className="p-4">
              <Alert variant="success">You have successfully logged in.</Alert>
            </Col>
          </Row>
        </Container>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
};

export default Dashboard;
