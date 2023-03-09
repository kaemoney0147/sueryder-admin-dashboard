import { useEffect, useState } from "react";
import "./witagexl.css";

export default function WitageXl() {
  const [patient, setPatient] = useState([]);

  const fetchPatient = async () => {
    try {
      const url = await fetch("http://localhost:3001/patient");
      if (url.ok) {
        const response = await url.json();
        console.log(response);
        setPatient(response);
      } else {
        console.log("Erro fecthing Patient List");
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchPatient();
  }, []);
  return (
    <div className="witagexl">
      <h3 className="witageXlTitle">New Admimission</h3>
      <table className="table">
        <tbody>
          <tr className="tableTr">
            <th className="witageTableTh">Patient</th>
            <th className="witageTableTh">Admision Date</th>
            <th className="witageTableTh">Time</th>
            <th className="witageTableTh"> Allocated Room</th>
          </tr>
          {patient
            .map((p) => (
              <tr className="tableTr" key={p._id}>
                <td className="witagePatient">
                  <img className="patientImg" src={p.image} alt="" />
                  <span className="witagePatientName">
                    {p.title} {p.firstName} {p.lastName}
                  </span>
                </td>
                <td className="witageAdmission">{p.admission.date}</td>
                <td className="witageTime">{p.admission.time}</td>
                <td className="witageWard">{p.room}</td>
              </tr>
            ))
            .reverse()
            .slice(0, 5)}
        </tbody>
      </table>
    </div>
  );
}
