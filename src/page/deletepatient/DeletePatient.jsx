import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./deletepatient.css";
import { ToastContainer, toast } from "react-toastify";
export default function DeletePatient() {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState([]);
  console.log(data);
  const navigate = useNavigate();
  const fetchSinglePatient = async () => {
    try {
      const url = await fetch(`${process.env.REACT_APP_BE_URL}/patient/${id}`);
      if (url.ok) {
        const newData = await url.json();
        setData(newData);
      }
    } catch (error) {}
  };
  const deleteProfile = async (e) => {
    try {
      let options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = await fetch(
        `${process.env.REACT_APP_BE_URL}/patient/${id}/delete`,
        options
      );
      if (url.ok) {
        toast("You have sucessfuly delete patient infomation");
        navigate("/home");
      } else {
        console.log("something went wrong");
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchSinglePatient();
  }, []);
  return (
    <div className="deletePatient">
      <div className="patienWrapper">
        <div className="patientTitle">
          <h3 className="title">Delete Patient Information</h3>
        </div>
      </div>
      <div className="dle">
        <div className="deleteImage ">
          <img src={data.image} alt="" />
        </div>
        <div className="deletePatientInfo">
          <span>
            Name: {data.title} {data.firstName} {data.lastName}
          </span>
          <span>Age: {data.age}</span>
          <span>Ward: {data.ward}</span>
          <span>Date of Birth: {data.dob}</span>
          <span>NHS NO: 29387377</span>
        </div>
      </div>
      <button onClick={deleteProfile} className="deletBtn">
        Delete
      </button>
      <ToastContainer />
    </div>
  );
}
