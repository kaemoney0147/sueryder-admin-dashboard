import "./sidebar.css";
import { HiHome } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import { GiTelepathy } from "react-icons/gi";
import { MdReport, MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_REQUEST } from "../../redux/action/index.js";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function SideBar() {
  const [userProfile, setUserProfile] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const fetchMyData = async (data) => {
  //   try {
  //     const token = localStorage.getItem("accessToken");
  //     const response = await fetch("http://localhost:3001/users/me", {
  //       headers: { Authorization: `Bearer ${token}` },
  //       "Content-Type": "application/json",
  //     });
  //     if (response.ok) {
  //       const data = await response.json();

  //       dispatch({ type: LOGIN_REQUEST, payload: data });
  //       console.log(data);
  //       setUserProfile(data);
  //     } else {
  //       console.log("Error while fetching my profile");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const logoutUser = () => {
    setUserProfile("");
    localStorage.clear();
    navigate("/");
  };

  // useEffect(() => {
  //   fetchMyData();
  // }, []);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMeun">
          <h3 className="sidebarTitle">Daskboard</h3>
          <ul className="sidebarList">
            <Link to={"/home"} className="Link">
              <li className="sidebarbarItem">
                <HiHome className="sidebar-icons" />
                Home
              </li>
            </Link>
            <li className="sidebarbarItem">
              <FaUserTie className="sidebar-icons" />
              User
            </li>
            <Link to={"/patient"} className="Link">
              <li className="sidebarbarItem">
                <GiTelepathy className="sidebar-icons" />
                Patient
              </li>
            </Link>
            <li className="sidebarbarItem">
              <MdReport className="sidebar-icons" />
              Report
            </li>
            <li className="sidebarbarItem">
              <MdLogout className="sidebar-icons" onClick={logoutUser} />
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
