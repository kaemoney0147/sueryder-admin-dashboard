import React, { useEffect, useState } from "react";
import "./witagesm.css";
import { MdOutlineVisibility } from "react-icons/md";
// import { getAccessToken } from "../../redux/action/index.js";
import { useSelector } from "react-redux";

export default function WitageSm() {
  const [loguser, setLoguser] = useState([]);

  const token = useSelector((state) => state.user.accessToken);

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
      if (response) {
        const data = await response.json();
        setLoguser(data.users);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="witagesm">
      <span className="witageTitle">New Users</span>
      <ul className="witageSmList">
        {loguser

          .map((u) => (
            <li className="witageSmListitem" key={u._id}>
              <img className="witageSmImage" src={u.avatar} alt="" />
              <div className="witageSmUser">
                <span>{u.username}</span>
              </div>
              <button className="witageBtn">
                <MdOutlineVisibility className="witageSmIcon" />
                Display
              </button>
            </li>
          ))
          .reverse()
          .slice(0, 2)}
      </ul>
    </div>
  );
}
