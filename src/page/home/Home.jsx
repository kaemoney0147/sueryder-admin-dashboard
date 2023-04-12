import Chart from "../../component/chart/Chart";
import FeatureInfo from "../../component/features/FeatureInfo";
import "./home.css";
import { userdata } from "../../data.js";
import WitageSm from "../../component/WitageSm/WitageSm";
import WitageXl from "../../component/WitageXl/WitageXl";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.user.userInfo);
  console.log(user);
  return (
    <div className="home">
      <h1 className="homeTitle">Welcome</h1>
      <div className="userInfos">
        {user.role}
        <span className="homeUserName">
          {user.firstName} {user.lastName}
        </span>
      </div>

      <FeatureInfo />
      <Chart
        data={userdata}
        title="Admision Analytics"
        grid
        dataKey="Acitive Key"
      />
      <div className="homewitage">
        <WitageSm />
        <WitageXl />
      </div>
    </div>
  );
}
