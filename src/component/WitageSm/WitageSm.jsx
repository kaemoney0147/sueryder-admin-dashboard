import React, { useEffect, useState } from "react";
import "./witagesm.css";
import { MdOutlineVisibility } from "react-icons/md";

export default function WitageSm() {
  const [loguser, setLoguser] = useState([]);
  console.log(loguser);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/users");
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
      <span className="witageTitle">USERS</span>
      <ul className="witageSmList">
        {loguser.map((u) => (
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
        ))}
      </ul>
    </div>
  );
}
