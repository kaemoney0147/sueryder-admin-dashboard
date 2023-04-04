import { Table } from "react-bootstrap";
import "./userlist.css";
import { MdDelete, MdEditNote } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPatient } from "../../redux/action/index.js";

export default function UserList() {
  const patient = useSelector((state) => state.patient.patient);

  const dispatch = useDispatch();
  const [querylist, setQueryList] = useState([]);

  const [query, setQuery] = useState("");
  const [sliceIndex, setSliceIndex] = useState(0);
  const sliceSize = 10;

  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleQuery = () => {
    let wardQuert = [];
    wardQuert = patient.filter(
      (q) =>
        q.ward.toLowerCase().includes(query) ||
        q.firstName.toLowerCase().includes(query)
    );
    setQueryList(wardQuert);
  };
  useEffect(() => {
    handleQuery();
  }, [query]);
  const nextSlice = () => {
    const nextIndex = sliceIndex + sliceSize;
    if (nextIndex >= patient.length) {
      return;
    }
    setSliceIndex(nextIndex);
  };

  const prevSlice = () => {
    const prevIndex = sliceIndex - sliceSize;
    if (prevIndex < 0) {
      return;
    }
    setSliceIndex(prevIndex);
  };
  useEffect(() => {
    dispatch(getAllPatient());
  }, []);
  return (
    <div className="Patient">
      <div className="patientProfile">
        <h3 className="patientTitle">Patient Dashboard</h3>
        <input
          placeholder="Search"
          type="search"
          className="SearchInput"
          onChange={handleChange}
        ></input>
        <Link to={"/newpatient"}>
          <button className="crateAdmission">New Admission</button>
        </Link>
      </div>
      <Table striped bordered hover className="patientTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Admission Date</th>
            <th>Time</th>
            <th>Room</th>
            <th>Ward</th>
            <th>Dob</th>
          </tr>
        </thead>
        {query ? (
          <tbody>
            {querylist
              .map((p, i) => (
                <tr key={i}>
                  <td className="patientTabelTd">
                    <img className="patientImg" src={p.image} alt="" />
                    <span>
                      {p.firstName} {p.lastName}
                    </span>
                  </td>
                  <td className="tableTd">{p.admission.date}</td>

                  <td className="tableTd">{p.admission.time}</td>
                  <td className="tableTd">{p.room}</td>
                  <td className="tableTd">{p.ward}</td>
                  <td className="tableTd">{p.dob}</td>
                  <span className="patientDeleteBtn">
                    <Link to={`/patientrecord/${p._id}`}>
                      <button className="patientRecord">Records</button>
                    </Link>
                    <Link to={`/editpatient/${p._id}`}>
                      <MdEditNote className="PatientIcons" />
                    </Link>
                    <Link to={`/delete/${p._id}`}>
                      <MdDelete className="patientDeleteBtn" />
                    </Link>
                  </span>
                </tr>
              ))
              .reverse()
              .slice(sliceIndex, sliceIndex + sliceSize)}
          </tbody>
        ) : (
          <tbody>
            {patient
              .map((p, i) => (
                <tr key={i}>
                  <td className="patientTabelTd">
                    <img className="patientImg" src={p.image} alt="" />
                    <span>
                      {p.firstName} {p.lastName}
                    </span>
                  </td>
                  <td className="tableTd">{p.admission.date}</td>

                  <td className="tableTd">{p.admission.time}</td>
                  <td className="tableTd">{p.room}</td>
                  <td className="tableTd">{p.ward}</td>
                  <td className="tableTd">{p.dob}</td>

                  <span className="patientDeleteBtn">
                    <Link to={`/patientrecord/${p._id}`}>
                      <button className="patientRecord">Records</button>
                    </Link>
                    <Link to={`/editpatient/${p._id}`}>
                      <MdEditNote className="PatientIcons" />
                    </Link>
                    <Link to={`/delete/${p._id}`}>
                      <span>
                        <MdDelete className="patientDeleteBtn" />
                      </span>
                    </Link>
                  </span>
                </tr>
              ))
              .reverse()
              .slice(sliceIndex, sliceIndex + sliceSize)}
          </tbody>
        )}
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
