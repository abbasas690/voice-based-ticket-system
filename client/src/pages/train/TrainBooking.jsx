import React, { useState } from "react";
import { useEffect } from "react";
import {
  isTamilNumber,
  isNumericNumber,
  tamilToNumeric,
  startListening,
  speak,
} from "../../utils/speech";

function TrainBooking({ userDetails, bookedSeats }) {
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
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
          case "கட்டணம்":
            if (!isNumericNumber(value) && isTamilNumber(value)) {
              setNumber(tamilToNumeric[value]);
            } else if (isNumericNumber(value)) {
              setNumber(value);
            } else {
              console.log("invalid number");
            }
            break;
          case "பின்":
            history(-1);
            break;
          case "புக்":
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              username: userDetails.name,
              bus_id: dataRoute.bus_id[selectedBus - 1],
              route_id: dataRoute.route_id,
              date: `${userDetails.day}-${userDetails.month}-${userDetails.year}`,
              seats: bookedSeats,
            });

            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };

            fetch("http://localhost:3001/bus/booking", requestOptions)
              .then((response) => response.json())
              .then((result) => {
                console.log(result);
                setMessage(result.message);
              })
              .catch((error) => console.log("error", error));
            break;
          default:
            console.log("Invalid command");
        }
      });
    }
  };
  return (
    <div className="booking-details">
      <div className="booking-user">
        <h2> User Details </h2>
        <p>Name:{userDetails.name}</p>
        <p>from:{userDetails.from}</p>
        <p>destination:{userDetails.destination}</p>
        <p>
          date:{`${userDetails.day}-${userDetails.month}-${userDetails.year}`}
        </p>
        <p>booked Seats No : {bookedSeats.toString()}</p>
        <p>Bus name:{busDetails.name}</p>
        <p>type:{busDetails.type}</p>
        <p>price:{busDetails.price}</p>
      </div>
      <div className="booking-box">
        <div>
          <p>pay number: </p> <div className="booking-box-number">{number}</div>
        </div>
        <div>{message}</div>
      </div>
    </div>
  );
}

export default TrainBooking;
