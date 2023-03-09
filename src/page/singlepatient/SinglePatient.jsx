import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./singlepatient.css";
import { EDIT_PROFILE } from "../../redux/action";
import { FiUpload } from "react-icons/fi";

export default function SinglePatient() {
  const [isfetch, setIsfetch] = useState(false);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setdDob] = useState("");
  const [Gender, setGender] = useState("");
  const [discription, setDiscription] = useState("");
  const [ward, setWard] = useState("");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [age, setAge] = useState("");
  const [room, setRoom] = useState("");
  const dispatch = useDispatch();

  const params = useParams();
  const id = params.id;
  console.log(id);
  const [data, setData] = useState([]);
  console.log(data);

  const changeVaules = {
    firstName: firstName,
    lastName: lastName,
    dob: dob,
    age: age,
    Gender: Gender,
    title: title,
    discription: discription,
    ward: ward,
    room: room,
  };

  const fetchUserbyId = async () => {
    try {
      const url = await fetch(`http://localhost:3001/patient/${id}`);
      if (url.ok) {
        const response = await url.json();
        console.log(response);
        setIsfetch(true);
        setData(response);
        setFirstname(data.firstName);
        setTitle(data.title);
        setLastName(data.lastName);
        setImage(data.image);
        setDiscription(data.discription);
        setGender(data.Gender);
        setdDob(data.dob);
        setWard(data.ward);
        setAge(data.age);
        setRoom(data.room);
      } else {
        console.log("error fetching user");
      }
    } catch (error) {}
  };
  const profileEdit = async (e) => {
    try {
      let options = {
        method: "PUT",
        body: JSON.stringify(changeVaules),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = await fetch(`http://localhost:3001/patient/${id}`, options);
      if (url.ok) {
        const response = await url.json();
        console.log(response);
        alert("You have sucessfuly change patient infomation");
      } else {
        console.log("something went wrong");
      }
    } catch (error) {}
  };
  const uploadImage = async () => {
    const data = new FormData();
    data.append("image", image);

    const options = {
      method: "POST",
      body: data,
    };

    try {
      let response = await fetch(
        `http://localhost:3001/patient/${id}/upload`,
        options
      );
      if (response.ok) {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: EDIT_PROFILE,
      payload: changeVaules,
    });
    uploadImage();
    profileEdit(changeVaules);
  };

  useEffect(() => {
    fetchUserbyId();
  }, [isfetch]);

  return (
    <div className="singlepatient">
      <div className="patienWrapper">
        <div className="patientTitle">
          <h3 className="title">Updat Patient Info</h3>
        </div>
      </div>
      <div className="leftsidePatientInfo">
        <div className="patientImage">
          <img src={data.image} alt="" />
          <span>
            Name: {data.title} {data.firstName} {data.lastName}
          </span>
          <span>Age: {data.Age}</span>
          <span>Ward: {data.ward}</span>
          <span>Date of Birth: {data.dob}</span>
        </div>
        <div>
          <div>
            <label htmlFor="file-input">
              <FiUpload className="inputField" />
            </label>
            <input
              id="file-input"
              type="file"
              accept=".jpg,.jpeg,.png"
              className="fileUpload"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>
      </div>
      <div className="patientInfo">
        <div className="rightsidePatientInfo">
          <Form className="singlePatientform" onSubmit={onSubmitHandler}>
            <Form.Group className="form-group">
              <Form.Label className="FormLabel">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g Mr,Mrs "
                className="forminput"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label className="FormLabel">First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                className="forminput"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="FormLabel">Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="LastName"
                className="forminput"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label className="FormLabel">Dob</Form.Label>
              <Form.Control
                type="text"
                placeholder="Date of Birth"
                className="forminput"
                value={dob}
                onChange={(e) => setdDob(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label className="FormLabel">Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Age"
                className="forminput"
                defaultValue={age}
                // onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label className="FormLabel">Room</Form.Label>
              <Form.Control
                type="text"
                placeholder="Allocated Room"
                className="forminput"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label className="FormLabel">Gender</Form.Label>
              <Form.Control
                type="text"
                placeholder="Gender"
                className="forminput"
                value={Gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label className="FormLabel">Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Image"
                className="forminput"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label className="FormLabel">Ward</Form.Label>
              <Form.Control
                type="text"
                placeholder="Unit"
                className="forminput"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label className="FormLabel">Discription</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Patient History"
                value={discription}
                onChange={(e) => setDiscription(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Button
            id="submitAdmissionBtn"
            type="submit"
            onClick={onSubmitHandler}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
