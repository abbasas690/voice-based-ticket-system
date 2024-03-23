import React, { useEffect, useState } from "react";
import {
  tamilToNumeric,
  isNumericNumber,
  isTamilNumber,
  startListening,
  speak,
  isObjEmpty,
} from "../../utils/speech";
import { useNavigate } from "react-router-dom";

function FlightSeat({
  busDetails,
  userDetails,
  dataRoute,
  bookedSeats,
  setBookedSeats,
}) {
  console.log("userDetails", userDetails);
  console.log("dataRoute", dataRoute);
  const [seat, setSeat] = useState([
    ...Array.from(Array(busDetails.seats).keys(), (n) => n + 1),
  ]);
  const [occupiedSeats, setOccupiedSeat] = useState([]);
  const history = useNavigate();

  function isSeatOccupied(occupiedSeats, seatNumber) {
    // Check if the seatNumber exists in the occupiedSeats array
    return occupiedSeats.indexOf(seatNumber) !== -1;
  }
  function isseatBooked(bookedSeats, seatNumber) {
    // Check if the seatNumber exists in the occupiedSeats array
    return bookedSeats.indexOf(seatNumber) !== -1;
  }

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      date: `${userDetails.day}-${userDetails.month}-${userDetails.year}`,
      route_id: dataRoute.route_id,
    });
    console.log(raw);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3001/flight/seats", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setOccupiedSeat([...result, 1, 2]);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      startListening((action, value) => {
        switch (action) {
          case "என்":
            if (!isNumericNumber(value) && isTamilNumber(value)) {
              !isSeatOccupied(occupiedSeats, parseInt(tamilToNumeric[value])) &&
              !isseatBooked(bookedSeats, parseInt(tamilToNumeric[value]))
                ? setBookedSeats((prev) =>
                    Array.from(
                      new Set([...prev, parseInt(tamilToNumeric[value])])
                    )
                  )
                : null;
            } else if (isNumericNumber(value)) {
              setBookedSeats((prev) =>
                Array.from(new Set([...prev, parseInt(value)]))
              );
            } else {
              console.log("invalid number");
            }
            break;
          case "பின்":
            history(-1);
            break;
          case "பதிவு":
            history("/flight/booking");
            break;
          default:
            console.log("Invalid command");
        }
      });
    }
  };
  console.log(bookedSeats);
  return (
    <div>
      <div>
        <h2>Flight Info</h2>
        <p>Name:{busDetails.name}</p>
        <p>Type:{busDetails.class}</p>
        <p>Total No Of Seat :{busDetails.seats}</p>
        <p>Pric:{busDetails.price}</p>
      </div>
      <div></div>
      <h2>Seat Info</h2>
      <div className="seatInfo">
        <div className="seatContainer">
          {/* First row */}
          <div className="lastRow">
            {seat.slice(0, 52).map((seatNumber, index) => (
              <div
                key={index}
                className={
                  isSeatOccupied(occupiedSeats, seatNumber)
                    ? "seat occupied"
                    : isseatBooked(bookedSeats, seatNumber)
                    ? "seat booked"
                    : "seat"
                }
              >
                {seatNumber}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightSeat;
