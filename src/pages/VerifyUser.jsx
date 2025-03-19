import axios from "axios";
import React from "react";
import { userURL } from "../functions/urls";
import { useNavigate, useParams } from "react-router-dom";

export default function VerifyUser() {
  const navigate = useNavigate();
  const { token } = useParams();
  async function handleClick(e) {
    console.log(token);
    e.preventDefault();
    try {
      const response = await axios.get(`${userURL}/verify/${token}`);
      if (response.data.status) {
        console.log("Email verified Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log("something went wrong");
    }
  }
  return (
    <div>
      <form>
        <button onClick={handleClick}>Click Here to verify</button>
      </form>
    </div>
  );
}
