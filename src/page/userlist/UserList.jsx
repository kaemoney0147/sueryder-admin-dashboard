import { Table } from "react-bootstrap";
import "./userlist.css";
import { MdDelete, MdEditNote } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserList() {
  const [patient, setPatient] = useState([]);
  const [sliceIndex, setSliceIndex] = useState(0);
  const sliceSize = 10;

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
  const nextSlice = () => {
    setSliceIndex(sliceIndex + sliceSize);
  };

  const prevSlice = () => {
    setSliceIndex(sliceIndex - sliceSize);
  };
  useEffect(() => {
    fetchPatient();
  }, []);
  return (
    <div className="Patient">
      <div className="patientProfile">
        <h1 className="patientTitle">ALL PATIENT</h1>
        <Link to={"/newpatient"}>
          <button className="crateAdmission">New Admission</button>
        </Link>
      </div>
      <Table striped bordered hover className="patientTable">
        <thead>
          <tr className="PatientTr">
            <th className="patientTableTh">Name</th>
            <th className="patientTableTh">Admission Date</th>
            <th className="patientTableTh">Time</th>
            <th className="patientTableTh">Allocated Room</th>
            <th className="patientTableTh">Ward</th>
            <th className="patientTableTh">Dob</th>
          </tr>
        </thead>

        <tbody>
          {patient
            .map((p, i) => (
              <tr className="th" key={i}>
                <td className="patientTabelTd">
                  <img className="patientImg" src={p.image} alt="" />
                  <span>
                    {p.firstName} {p.lastName}
                  </span>
                </td>
                <td>{p.admission.date}</td>

                <td>{p.admission.time}</td>
                <td>{p.room}</td>
                <td>{p.ward}</td>
                <td>{p.dob}</td>
                <span className="patientDeleteBtn">
                  <Link to={`/editpatient/${p._id}`}>
                    <MdEditNote className="PatientIcons" />
                  </Link>
                  <Link to={`/delete/${p._id}`}>
                    <span>
                      <MdDelete className="PatientIcons" />
                    </span>
                  </Link>
                </span>
              </tr>
            ))
            .slice(sliceIndex, sliceIndex + sliceSize)
            .reverse()}
        </tbody>
      </Table>
      <div className="patientButton">
        <button className="btnPatient" onClick={prevSlice}>
          back
        </button>
        <button className="btnPatient" onClick={nextSlice}>
          next
        </button>
      </div>
    </div>
  );
}
