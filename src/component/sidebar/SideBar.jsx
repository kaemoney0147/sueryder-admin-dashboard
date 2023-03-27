import "./sidebar.css";
import { HiHome } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import { GiTelepathy } from "react-icons/gi";
import { MdReport, MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/action";
import { useDispatch } from "react-redux";
import { persistor } from "../../redux/store/index.js";

export default function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    dispatch(logoutUser());
    persistor.purge();
    navigate("/");
  };
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
            <Link to={"/user"} className="Link">
              <li className="sidebarbarItem">
                <FaUserTie className="sidebar-icons" />
                User
              </li>
            </Link>
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
              <MdLogout className="sidebar-icons" onClick={logOut} />
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
