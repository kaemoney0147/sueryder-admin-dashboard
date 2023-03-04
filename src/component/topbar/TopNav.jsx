import "./topbar.css";
import { MdOutlineNotificationsNone, MdOutlineLanguage } from "react-icons/md";
import { AiTwotoneSetting } from "react-icons/ai";
export default function TopNav() {
  return (
    <div className="topbar">
      <div className="topbarwrappper">
        <div className="leftside">
          <span className="logo">
            <img src="logo.svg" alt="logo" />
          </span>
        </div>
        <div className="rightside">
          <div className="right-icons">
            <div className="rightside-icons">
              <MdOutlineNotificationsNone />
            </div>
            <div className="rightside-icons">
              <MdOutlineLanguage />
            </div>
            <div className="rightside-icons">
              <AiTwotoneSetting />
            </div>
            <span className="profile-image">
              <img src="IMG_6951.jpg" alt="profileimage" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
