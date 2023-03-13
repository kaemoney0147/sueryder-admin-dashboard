import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./newadmission.css";
export default function NewAdmission() {
  const [firstName, SetFirstName] = useState("");
  const [lastName, SetLastName] = useState("");
  const [age, SetAge] = useState("");
  const [dob, SetDob] = useState("");
  const [title, SetTitle] = useState("");
  const [Gender, setGender] = useState("");
  const [ward, SetWard] = useState("");
  const [discription, SetDiscription] = useState("");
  const [image, setImage] = useState("");
  const [date, SetDate] = useState("");
  const [time, SetTime] = useState("");
  const [room, SetRoom] = useState("");

  const data = {
    firstName: firstName,
    lastName: lastName,
    Gender: Gender,
    title: title,
    age: age,
    admission: {
      date: date,
      time: time,
    },
    discription: discription,
    ward: ward,
    dob: dob,
    room: room,
  };

  function calculateAge(birthday) {
    const ageDifMs = Date.now() - new Date(birthday);
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const handleDobChange = (event) => {
    const dob = event.target.value;
    SetDob(dob);
    SetAge(calculateAge(dob));
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
        `http://localhost:3001/patient/upload`,
        options
      );
      if (response.ok) {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {});
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("http://localhost:3001/patient", options);
      if (response) {
        alert("You have successfully register this patient");
      }
    } catch (error) {}
  };
  return (
    <div className="newadmision">
      <Form className="form">
        <Form.Group className="form-group" onSubmit={handleSubmit}>
          <Form.Label className="FormLabel">Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g Mr,Mrs "
            className="forminput"
            value={title}
            onChange={(e) => SetTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="FormLabel">First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            className="forminput"
            value={firstName}
            onChange={(e) => SetFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label className="FormLabel">Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="LastName"
            className="forminput"
            value={lastName}
            onChange={(e) => SetLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="FormLabel">Dob</Form.Label>
          <Form.Control
            type="date"
            placeholder="Date of Birth"
            className="forminput"
            value={dob}
            onChange={handleDobChange}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="FormLabel">Age</Form.Label>
          <Form.Control
            type="text"
            placeholder="Age"
            className="forminput"
            value={age}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="FormLabel">Room</Form.Label>
          <Form.Control
            type="text"
            placeholder="Allocated Room"
            className="forminput"
            value={room}
            onChange={(e) => SetRoom(e.target.value)}
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
            type="file"
            placeholder="Image"
            className="forminput"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="FormLabel">Ward</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unit"
            className="forminput"
            value={ward}
            onChange={(e) => SetWard(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="FormLabel">Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Unit"
            className="forminput"
            value={date}
            onChange={(e) => SetDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="FormLabel">Time</Form.Label>
          <Form.Control
            type="time"
            placeholder="Unit"
            className="forminput"
            value={time}
            onChange={(e) => SetTime(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="FormLabel">Discription</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Patient History"
            value={discription}
            onChange={(e) => SetDiscription(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Button
        className="submitAdmissionBtn"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
}
