import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";

export default function Chart({ grid }) {
  const [newData, setNewData] = useState([]);
  const { format } = require("date-fns");
  // let months = newData.map((month) => {
  //   return {
  //     name: format(new Date(2023, month._id.month - 1), "MMM"),
  //     Admission: month.numberOfPatients,
  //   };
  // });
  let months = newData
    .map((month) => {
      return {
        name: format(new Date(2023, month._id.month - 1), "MMM"),
        Admission: month.numberOfPatients,
      };
    })
    .sort((a, b) => {
      return new Date("2000 " + a.name) - new Date("2000 " + b.name);
    });

  const fetchPatient = async () => {
    try {
      const url = await fetch("http://localhost:3001/patient/chart");
      if (url.ok) {
        const response = await url.json();
        const list = response;
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
        <LineChart data={months}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <YAxis />
          <Line type="monotone" dataKey="Admission" stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
