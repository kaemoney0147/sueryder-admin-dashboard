import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import "./records.css";
import { set } from "date-fns";

export default function Records() {
  const [food, setFood] = useState([]);
  const [fluid, setFluid] = useState([]);
  const [foodshow, setfoodShow] = useState(true);
  const [fluidshow, setFluidShow] = useState(false);
  const [bowel, setBowel] = useState([]);
  const [bowelshow, setBowelShow] = useState(false);
  const param = useParams();
  const userId = param.id;

  const singlePatientFood = async () => {
    try {
      let url = await fetch(
        `${process.env.REACT_APP_BE_URL}/foodchart/patient/${userId}`
      );
      if (url.ok) {
        const response = await url.json();
        setFood(response);
        console.log(food);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const singlePatientFluid = async () => {
    try {
      let url = await fetch(
        `${process.env.REACT_APP_BE_URL}/fluid/patient/${userId}`
      );
      if (url.ok) {
        const response = await url.json();
        setFluid(response);
        console.log(fluid);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const singleBowel = async () => {
    try {
      let url = await fetch(
        `${process.env.REACT_APP_BE_URL}/bowel/patient/${userId}`
      );
      if (url.ok) {
        const response = await url.json();
        setBowel(response);
        console.log(bowel);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletFluid = async (item) => {
    console.log(item);
    try {
      const option = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = await fetch(
        `${process.env.REACT_APP_BE_URL}/fluid/${item._id}/delete`,
        option
      );
      if (url.ok) {
        window.location.reload();
      } else {
        console.log("something went wrong");
      }
    } catch (error) {}
  };
  const deletFood = async (item) => {
    console.log(item);
    try {
      const option = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = await fetch(
        `${process.env.REACT_APP_BE_URL}/foodchart/${item._id}/delete`,
        option
      );
      if (url.ok) {
        window.location.reload();
      } else {
        console.log("something went wrong");
      }
    } catch (error) {}
  };
  const deleteBowel = async (item) => {
    console.log(item);
    try {
      const option = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = await fetch(
        `${process.env.REACT_APP_BE_URL}/bowel/${item._id}/delete`,
        option
      );
      if (url.ok) {
        window.location.reload();
      } else {
        console.log("something went wrong");
      }
    } catch (error) {}
  };

  useEffect(() => {
    singlePatientFood();
    singlePatientFluid();
    singleBowel();
  }, []);

  const handleFoodClick = () => {
    setFluidShow(false);
    setfoodShow(true);
    setBowelShow(false);
  };

  const handleFluidClick = () => {
    setFluidShow(true);
    setfoodShow(false);
    setBowelShow(false);
  };
  const handleBowel = () => {
    setFluidShow(false);
    setfoodShow(false);
    setBowelShow(true);
  };
  return (
    <div className="recordCotainer">
      <h3 className="RecordTitle">Daily Records</h3>
      {/* <h3>Name:{food[0].patient.firstName}</h3>; */}
      <div className="recordWrapper">
        <Nav className="recordTask" as="ul">
          <button onClick={handleFoodClick} className="recordsBtn">
            Food
          </button>
          <button onClick={handleFluidClick} className="recordsBtn">
            Fluid
          </button>
          <button className="recordsBtn" onClick={handleBowel}>
            Bowel
          </button>
          <button className="recordsBtn">Observation</button>
          <button className="recordsBtn">PersonalCare</button>
          <button className="recordsBtn">Vitals</button>
          <button className="recordsBtn">Reposition</button>
        </Nav>
      </div>
      <div>
        {food.length > 0 && foodshow && (
          <table className="blueTable mb-3">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Offered</th>
                <th>Amount</th>
                <th>Accept</th>
                <th>Givenby</th>
              </tr>
            </thead>
            <tbody>
              {food
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.offered}</td>
                    <td>{item.amountoffered}</td>
                    <td>{item.amountaccepted}</td>
                    <td>{item.givenby}</td>
                    <div>
                      {" "}
                      <MdDelete
                        className="fluidDeleteBtn"
                        onClick={() => deletFood(item)}
                      />
                    </div>
                  </tr>
                ))
                .reverse()}
            </tbody>
          </table>
        )}
        {fluid.length > 0 && fluidshow && (
          <div>
            <table className="blueTable mb-3">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Period</th>
                  <th>Offered</th>
                  <th>Route</th>
                  <th>Amount</th>
                  <th>Accept</th>
                  <th>Givenby</th>
                </tr>
              </thead>
              <tbody>
                {fluid
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.date}</td>
                      <td>{item.time}</td>
                      <td>{item.timeofday}</td>
                      <td>{item.type}</td>
                      <td>{item.route}</td>
                      <td>{item.amountofferd}</td>
                      <td>{item.amounttaken}</td>
                      <td>{item.givenby}</td>
                      <div>
                        {" "}
                        <MdDelete
                          className="fluidDeleteBtn"
                          onClick={() => deletFluid(item)}
                        />
                      </div>
                    </tr>
                  ))
                  .reverse()}
              </tbody>
            </table>
          </div>
        )}
        {bowel.length > 0 && bowelshow && (
          <div>
            <table className="blueTable mb-3">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>amount</th>
                  <th>Type</th>
                  <th>Intervention</th>
                  <th>Carers</th>
                </tr>
              </thead>
              <tbody>
                {bowel
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.date}</td>
                      <td>{item.time}</td>
                      <td>{item.amount}</td>
                      <td>{item.type}</td>
                      <td>{item.intervention}</td>
                      <td>{item.signature}</td>
                      <div>
                        {" "}
                        <MdDelete
                          className="fluidDeleteBtn"
                          onClick={() => deleteBowel(item)}
                        />
                      </div>
                    </tr>
                  ))
                  .reverse()}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
