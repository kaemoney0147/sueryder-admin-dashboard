import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { LOGIN_REQUEST } from "../../redux/action/index.js";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../redux/action/index.js";
import "./loginpage.css";

export default function HomeComponent() {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.user.loginStatus);
  const loginStatusMessage = userStatus?.status;

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
    // setError("Username and password do not match");
  };

  const loginUser = () => {
    const userLogin = {
      username: username,
      password: password,
    };
    dispatch(getAccessToken(userLogin));
  };

  useEffect(() => {
    if (loginStatusMessage === "success") {
      navigate("/home");
    }
  }, [userStatus]);
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
                value={username}
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
              onClick={loginUser}
            >
              Login
            </button>
          </Form>
        </div>
      </div>
    </Container>
  );
}
