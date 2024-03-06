import React, { useEffect, useState } from "react";
import {
  tamilToNumeric,
  isNumericNumber,
  isTamilNumber,
  speak,
  isObjEmpty,
} from "../../utils/speech";

function BusSeat({ busDetails, userDetails, dataRoute }) {
  console.log("userDetails", userDetails);
  console.log("dataRoute", dataRoute);
  const [seat, setSeat] = useState([
    ...Array.from(Array(busDetails.nos).keys(), (n) => n + 1),
  ]);
  const [occupiedSeats, setOccupiedSeat] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

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

    fetch("http://localhost:3001/bus/seats", requestOptions)
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
      startListening();
    }
  };

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "ta-IN";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      const sanitizedTranscript = transcript.replace(
        /[^\w\s\d\u0100-\uFFFF]/g,
        ""
      );
      console.log(sanitizedTranscript);
      processCommand(sanitizedTranscript);
      recognition.stop(); // Stop listening after processing a command
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      // recognition.start(); // Restart listening after processing is done
    };

    recognition.start();
  };

  const processCommand = async (command) => {
    // Normalize the input
    const normalizedCommand = command.trim().toLowerCase();

    // Split the command into action and value
    const [action, ...valueParts] = normalizedCommand.split(" ");
    const value = valueParts.join(" ");

    // Check if both action and value are present
    if (!action) {
      console.log("Invalid command. Please provide both action and value.");
      return;
    }

    // Process the command
    switch (action) {
      case "என்":
        if (!isNumericNumber(value) && isTamilNumber(value)) {
          if (
            !isSeatOccupied(occupiedSeats, parseInt(tamilToNumeric[value])) &&
            !isseatBooked(bookedSeats, parseInt(tamilToNumeric[value]))
          ) {
            setBookedSeats((prev) =>
              Array.from(new Set([...prev, parseInt(tamilToNumeric[value])]))
            );
          }
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
      default:
        console.log("Invalid command");
    }
  };
  console.log(bookedSeats);
  return (
    <div>
      <div>
        <h2>Bus Info</h2>
        <p>Name:{busDetails.name}</p>
        <p>type:{busDetails.type}</p>
        <p>Total No Of Seat :{busDetails.nos}</p>
        <p>pric:{busDetails.price}</p>
      </div>
      <div></div>
      <h2>Seat Info</h2>
      <div className="seatInfo">
        <div className="seatContainer">
          {/* First row */}
          <div className="firstRow">
            <div className="seat occupied">1</div>
            <div className="emptySeat"></div>
            <div className="emptySeat"></div>
            <div className="emptySeat"></div>
            <div className="seat occupied">2</div>
          </div>
          <div className="lastRow">
            {seat.slice(2, 52).map((seatNumber, index) => (
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

export default BusSeat;
