import "./featureinfo.css";
import { BsGraphDownArrow } from "react-icons/bs";
import { AiOutlineArrowUp } from "react-icons/ai";
import { useEffect, useState } from "react";

export default function FeatureInfo() {
  const [newData, setNewData] = useState([]);
  console.log(newData);
  const fetchPatient = async () => {
    try {
      const url = await fetch("http://localhost:3001/patient/chart");
      if (url.ok) {
        const response = await url.json();
        console.log(response);
        setNewData(response);
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
    <div className="features">
      {newData
        .slice(0, 3)
        .map((a, i) => (
          <div className="featuresItem" key={a._id}>
            <span className="featureTitle">Admissions</span>
            <div className="featureNumbers">
              <span className="featureAdmission">{a.numberOfPatients}</span>
              <span className="featureDeath">
                -5.0 <BsGraphDownArrow className="featureIcons negative" />
              </span>
            </div>
            <span className="featureSub"> Compared to last month</span>
          </div>
        ))

        .reverse()}
    </div>
  );
}
