import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { LOGIN_REQUEST } from "../../redux/action/index.js";
import { useNavigate } from "react-router-dom";
import "./loginpage.css";

export default function HomeComponent() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = {
    username: user,
    password: password,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const fetchMyData = async (data) => {
    try {
      const response = await fetch("http://localhost:3001/users/me", {
        headers: { Authorization: `Bearer ${data.accessToken}` },
        "Content-Type": "application/json",
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: LOGIN_REQUEST, payload: data });
      } else {
        console.log("Error while fetching my profile");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("userLogin", data.accessToken);
        await fetchMyData(data);
        navigate("/home");
      } else {
        setError("Username and password do not match");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="login">
      <div className="loginTop">
        <img src="logo.svg" alt="" />
      </div>
      <div className="loginWrapper">
        <div>
          {error && <p>{error}</p>}
          <Form className="loginForm" onSubmit={handleSubmit}>
            <Form.Group className="form-group">
              <Form.Label className="FormLabel">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                className="forminput"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="FormLabel">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="forminput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <button
              className="submitAdmissionBtn"
              type="submit"
              onClick={handleLogin}
            >
              Login
            </button>
          </Form>
        </div>
      </div>
    </Container>
  );
}
