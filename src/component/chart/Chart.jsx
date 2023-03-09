import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
// const month = [
//   "Jan=1",
//   "Feb=2",
//   "Mar=3",
//   "Apr=4",
//   "May=5",
//   "Jun=6",
//   "Jul=7",
//   "Aug=8",
//   "Sep=9",
//   "Oct=10",
//   "Nov=11",
//   "Dec=12",
// ];

export default function Chart({ grid }) {
  const [newData, setNewData] = useState([]);
  console.log(newData);
  const fetchPatient = async () => {
    try {
      const url = await fetch("http://localhost:3001/patient/chart");
      if (url.ok) {
        const response = await url.json();
        console.log(response);
        const list = response.map((resp) => {
          return {
            name: resp._id.month,
            Admission: resp.numberOfPatients,
          };
        });
        setNewData(list);
      } else {
        console.log("Error fetching Patient List");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPatient();
  }, []);
  return (
    <div className="chart">
      <h3>Admision Analytics</h3>
      <ResponsiveContainer width="100%" aspect={4}>
        <LineChart data={newData}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" dataKey="Admission" stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
