import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import "../adduser/adduser.css";
import { ToastContainer, toast } from "react-toastify";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function AddUser() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [listofuser, setListofUser] = useState([]);

  const token = useSelector((state) => state.user.accessToken);

  const user = {
    username: username,
    password: password,
    role: role,
    firstName: firstName,
    lastName: lastName,
  };
  const creatUser = async (e) => {
    e.preventDefault();
    try {
      let opt = {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/users/register`,
        opt
      );
      if (response.ok) {
        toast("user created sucessfully!");
        setUserName("");
        setPassword("");
        setRole("");
      }
    } catch (error) {}
  };

  const fetchUsers = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/users`,
        options
      );
      if (response.ok) {
        const receivedData = await response.json();
        console.log(receivedData.users);
        setListofUser(receivedData.users);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const deletUser = async (user) => {
    console.log(user);
    try {
      const option = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const url = await fetch(
        `${process.env.REACT_APP_BE_URL}/users/${user._id}`,
        option
      );
      if (url.ok) {
        window.location.reload();
      } else {
        console.log("something went wrong");
      }
    } catch (error) {}
  };

  //   const editUserProfile = async (e) => {
  //     try {
  //       const option = {
  //         method: "PUT",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       };
  //       const url = await fetch(
  //         `http://localhost:3001/users/${userId}/me`,
  //         option
  //       );
  //       if (url.ok) {
  //         const response = await url.json();
  //         console.log(response);
  //         alert("You have sucessfuly change patient infomation");
  //       } else {
  //         console.log("something went wrong");
  //       }
  //     } catch (error) {}
  //   };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h3> Users Dashboard</h3>
      </div>
      <div className="userContainer">
        <div className="listOfUsers">
          {listofuser.map((user, i) => (
            <div className="userInfo" key={i}>
              <div className="userDetails">
                <img src={user.avatar} alt="photo" className="userImage" />
                <span className="userName">{user.username}</span>
              </div>

              <div className="test">
                <div className="userRole">{user.role}</div>
                <button
                  className="userDeletebtn"
                  onClick={() => deletUser(user)}
                >
                  <MdDelete className="userDeleteIcon" />
                </button>
              </div>
            </div>
          ))}
          <div className="userIcons">
            <FaArrowCircleLeft className="leftIcons" />
            <span>
              <FaArrowCircleRight className="rightIcons" />
            </span>
          </div>
        </div>
      </div>
      <div className="createNewUsers">
        <h3>Add New</h3>
        <Form onSubmit={creatUser}>
          <Form.Group className="form-group">
            <Form.Label className="FormLabel">First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              className="forminput"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label className="FormLabel">Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              className="forminput"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label className="FormLabel">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              className="forminput"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
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
              required
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label className="FormLabel">Role</Form.Label>
            <select
              className="inputField"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option>Select</option>
              <option>Care Assistance</option>
              <option>Nurse</option>
              <option>Admin</option>
            </select>
          </Form.Group>
          <button className="creatUserBtn" type="submit">
            Create User
          </button>
          <ToastContainer />
        </Form>
      </div>
    </div>
  );
}
