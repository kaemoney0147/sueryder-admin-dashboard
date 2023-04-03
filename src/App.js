import SideBar from "./component/sidebar/SideBar";
import TopNav from "./component/topbar/TopNav";

import "./app.css";
import Home from "./page/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserList from "./page/userlist/UserList";
import SinglePatient from "./page/singlepatient/SinglePatient";
import NewAdmission from "./page/newadmission/NewAdmission";
import LoginPage from "./page/loginpage/LoginPage";

import { useSelector } from "react-redux";
import DeletePatient from "./page/deletepatient/DeletePatient";
import AddUser from "./page/adduser/AddUser";
import Records from "./page/records/Records";

function App() {
  // const { isloading, setIsloading } = useState(false);
  const userData = useSelector((state) => state.user.userInfo);

  //read redux store, if there is user data show nav/sidebar
  return (
    <BrowserRouter>
      {userData && userData._id ? <TopNav /> : ""}

      <div className="container">
        {userData && userData._id ? <SideBar /> : ""}

        <Routes>
          {userData ? <Route path="/home" element={<Home />} /> : ""}
          {/* <Route path="/home" element={<Home />} /> */}
          {userData && userData.id ? (
            <Route path="/patient" element={<UserList />} />
          ) : (
            ""
          )}
          <Route path="/patient" element={<UserList />} />

          <Route path="/editpatient/:id" element={<SinglePatient />} />

          <Route path="/newpatient/" element={<NewAdmission />} />
          <Route path="/delete/:id" element={<DeletePatient />} />
          <Route path="/user/" element={<AddUser />} />

          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/patientrecord/:id" element={<Records />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
