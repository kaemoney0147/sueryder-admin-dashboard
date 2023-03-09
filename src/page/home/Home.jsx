import Chart from "../../component/chart/Chart";
import FeatureInfo from "../../component/features/FeatureInfo";
import "./home.css";
import { userdata } from "../../data.js";
import WitageSm from "../../component/WitageSm/WitageSm";
import WitageXl from "../../component/WitageXl/WitageXl";

export default function Home() {
  return (
    <div className="home">
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
