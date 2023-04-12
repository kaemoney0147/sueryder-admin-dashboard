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
              <img
                src="https://media.istockphoto.com/id/1373258655/photo/happy-nurse-at-hospital.jpg?b=1&s=170667a&w=0&k=20&c=qeigp16Mw6wEL-bE22nSnVLSaoBzBZtRUNRyXCQ6qrg="
                alt="profileimage"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
