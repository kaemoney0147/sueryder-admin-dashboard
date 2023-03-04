import SideBar from "./component/sidebar/SideBar";
import TopNav from "./component/topbar/TopNav";
import "/app.css";

function App() {
  return (
    <div className="App">
      <TopNav />
      <div className="container">
        <SideBar />
        otherpages
      </div>
    </div>
  );
}

export default App;
