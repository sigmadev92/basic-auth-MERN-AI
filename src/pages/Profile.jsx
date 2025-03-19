import React, { useContext } from "react";
import { Container, Card, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import UserContext from "../context/AuthContext";
import "../styles/Profile.css";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(UserContext);
  // const navigate = useNavigate();

  // Redirect to login if no user is found

  // Default profile picture
  const defaultProfilePic =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <>
      {user ? (
        <Container className="profile-container">
          <Card className="profile-card">
            <Card.Body className="text-center">
              <img
                src={user.profilePic || defaultProfilePic}
                alt="Profile"
                className="profile-image"
              />
              <h3 className="mt-3">{user.name || "User Name"}</h3>
              <p className="text-muted">
                {user.email || "user@example.com"} {user.EmailVerified && "✔️"}
              </p>

              <Button
                variant="primary"
                className="mt-3"
                onClick={() => alert("Edit Profile Coming Soon!")}
              >
                Edit Profile
              </Button>
            </Card.Body>
          </Card>
        </Container>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
};

export default Profile;
