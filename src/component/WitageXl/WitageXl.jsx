import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPatient } from "../../redux/action";
import "./witagexl.css";

export default function WitageXl() {
  const patient = useSelector((state) => state.patient.patient);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPatient());
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
