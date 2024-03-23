import React, { useEffect, useState } from "react";
import {
  tamilToNumeric,
  isNumericNumber,
  isTamilNumber,
  startListening,
  speak,
  isObjEmpty,
  getRandomInt,
} from "../../utils/speech";
import { useNavigate } from "react-router-dom";

function TrainSeat({
  TrainData,
  selectedTrain,
  userDetails,
  TrainbookedSeat,
  setTrainBookedSeat,
}) {
  const [seatClass, setSeatClass] = useState(["1A", "2A", "2S", "3A", "SL"]);
  const [selectedClass, setSelectedClass] = useState(0);
  const [price, setPrice] = useState(getRandomInt(800, 1000));
  const NoOfSeat = [20, 45, 106, 63, 71];
  const [isPayment, setIsPayment] = useState(false);
  const [isbooked, setisbooked] = useState(false);
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  console.log(TrainbookedSeat);

  const [occupiedSeat, setOccupiedSeat] = useState({
    "1A": [],
    "2A": [],
    "2s": [],
    "3A": [],
    SL: [],
  });
  const [seatNo, setSeatNo] = useState([
    ...Array.from(Array(NoOfSeat[selectedClass]).keys(), (n) => n + 1),
  ]);
  useEffect(() => {
    setSeatNo([
      ...Array.from(Array(NoOfSeat[selectedClass]).keys(), (n) => n + 1),
    ]);
  }, [selectedClass]);
  const history = useNavigate();
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      date: `${userDetails.day}-${userDetails.month}-${userDetails.year}`,
      destination: userDetails.destination,
      source: userDetails.from,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://localhost:3001/train/seats", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // if (result) {
        // data = result;
        // }
        setOccupiedSeat({ occupiedSeat, ...result });
        console.log(result);
      })
      .catch((error) => console.log("error", error));
    // setOccupiedSeat(data);
  }, [userDetails]);
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  let newSelectedClass = 0;
  let booked = false;
  const handleKeyPress = (event) => {
    console.log(occupiedSeat, typeof occupiedSeat);
    if (event.key === "Enter") {
      startListening((action, value) => {
        switch (action) {
          case "வகை":
            if (!isNumericNumber(value) && isTamilNumber(value)) {
              newSelectedClass =
                tamilToNumeric[value] < 6 ? tamilToNumeric[value] : 1;
            } else {
              newSelectedClass = value < 6 ? value : 1;
            }
            newSelectedClass = newSelectedClass - 1;
            setSelectedClass(newSelectedClass);
            console.log(newSelectedClass);
            break;
          case "என்":
            if (!isNumericNumber(value) && isTamilNumber(value)) {
              console.log(selectedClass);
              if (newSelectedClass == 0) {
                console.log("temp boooked seat:", tempBookedseat);
                setTrainBookedSeat((prev) => ({
                  ...prev,
                  "1A": [...prev["1A"], tamilToNumeric[value]],
                }));
              }
              if (newSelectedClass == 1) {
                setTrainBookedSeat((prev) => ({
                  ...prev,
                  "2A": [...prev["2A"], tamilToNumeric[value]],
                }));
              }
              if (newSelectedClass == 2) {
                setTrainBookedSeat((prev) => ({
                  ...prev,
                  "2S": [...prev["2S"], tamilToNumeric[value]],
                }));
              }
              if (newSelectedClass == 3) {
                setTrainBookedSeat((prev) => ({
                  ...prev,
                  "3A": [...prev["3A"], tamilToNumeric[value]],
                }));
              }
              if (newSelectedClass == 4) {
                setTrainBookedSeat((prev) => ({
                  ...prev,
                  SL: [...prev["SL"], tamilToNumeric[value]],
                }));
              }
            } else if (isNumericNumber(value)) {
              if (newSelectedClass == 0) {
                setTrainBookedSeat((prev) => ({
                  ...prev,
                  "1A": [...prev["1A"], parseInt(value)],
                }));
              }
              if (newSelectedClass == 1) {
                setTrainBookedSeat((prev) => ({
                  ...prev,
                  "2A": [...prev["2A"], parseInt(value)],
                }));
              }
              if (newSelectedClass == 2) {
                setTrainBookedSeat((prev) => ({
                  ...prev,
                  "2S": [...prev["2S"], parseInt(value)],
                }));
              }
              if (newSelectedClass == 3) {
                setTrainBookedSeat((prev) => ({
                  ...prev,
                  "3A": [...prev["3A"], parseInt(value)],
                }));
              }
              if (newSelectedClass == 4) {
                setTrainBookedSeat((prev) => ({
                  ...prev,
                  SL: [...prev["SL"], parseInt(value)],
                }));
              }
            } else {
              console.log("invalid number", value);
            }
            break;
          case "பின்":
            history(-1);
            break;
          case "பதிவு":
            setIsPayment(true);
            break;
          case "கட்டணம்":
            if (!isNumericNumber(value) && isTamilNumber(value)) {
              setNumber(tamilToNumeric[value]);
            } else if (isNumericNumber(value)) {
              setNumber(value);
            } else {
              console.log("invalid number");
            }
            break;
          case "புக்":
            const bookedSeat = {
              "1A": Array.from(new Set(TrainbookedSeat["1A"])),
              "2A": Array.from(new Set(TrainbookedSeat["2A"])),
              "2S": Array.from(new Set(TrainbookedSeat["2S"])),
              "3A": Array.from(new Set(TrainbookedSeat["3A"])),
              SL: Array.from(new Set(TrainbookedSeat["SL"])),
            };
            if (!booked) {
              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");

              var raw = JSON.stringify({
                date: `${userDetails.day}-${userDetails.month}-${userDetails.year}`,
                destination: userDetails.destination,
                seats: bookedSeat,
                source: userDetails.from,
                username: userDetails.name,
              });

              var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
              };

              let res = "";
              fetch("http://localhost:3001/train/booking", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                  console.log(result);
                  setMessage(result.message);
                  res = result;
                })
                .catch((error) => console.log("error", error));
              booked = true;
            } else {
              console.log("alredy booked!!!");
            }
            break;
          default:
            console.log("Invalid command");
        }
      });
    }
  };
  const TrainDetails = ({ train }) => {
    return (
      <div className="train-details">
        <h4>
          {train.train_base.train_name} ({train.train_base.train_no})
        </h4>
        {/* <p>
          <strong>Source Station:</strong> {train.train_base.source_stn_name} (
          {train.train_base.source_stn_code})
        </p>
        <p>
          <strong>Destination Station:</strong> {train.train_base.dstn_stn_name}{" "}
          ({train.train_base.dstn_stn_code})
        </p> */}
        <p>
          <strong>From Station:</strong> {train.train_base.from_stn_name} (
          {train.train_base.from_stn_code})
        </p>
        <p>
          <strong>To Station:</strong> {train.train_base.to_stn_name} (
          {train.train_base.to_stn_code})
        </p>
        <p>
          <strong>Departure Time:</strong> {train.train_base.from_time}
        </p>
        <p>
          <strong>Arrival Time:</strong> {train.train_base.to_time}
        </p>
        <p>
          <strong>Travel Time:</strong> {train.train_base.travel_time}
        </p>
        {/* <p>
          <strong>Running Days:</strong> {train.train_base.running_days}
        </p> */}

        <div>
          {seatClass.map((d, i) => (
            <p
              key={i}
              style={{
                border: i == selectedClass ? "2px solid green" : null,
              }}
            >
              {d}
            </p>
          ))}
        </div>
      </div>
    );
  };
  const NoOfSeat1A = () => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10,80px)",
          height: "100",
        }}
      >
        {seatNo.slice(0, 10).map((d, i) => (
          <div
            key={i}
            style={{
              border: "2px solid #00fff0",
              textAlign: "center",
              backgroundColor: occupiedSeat["1A"].includes(d)
                ? "red"
                : TrainbookedSeat["1A"].includes(d)
                ? "green"
                : "white",
            }}
          >
            L{d}
          </div>
        ))}
        {seatNo.slice(10, 20).map((d, i) => (
          <div
            key={i}
            style={{
              border: "2px solid #00fff0",
              textAlign: "center",
              backgroundColor: occupiedSeat["1A"].includes(d)
                ? "red"
                : TrainbookedSeat["1A"].includes(d)
                ? "green"
                : "white",
            }}
          >
            U{d}
          </div>
        ))}
      </div>
    );
  };
  const NoOfSeat2A = () => {
    return (
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(15,40px)",
            marginBottom: "1rem",
          }}
        >
          {seatNo.slice(0, 15).map((d, i) => (
            <p
              key={i}
              style={{
                rotate: "-90deg",
                border: "2px solid #00fff0",
                backgroundColor: occupiedSeat["2A"].includes(d)
                  ? " red"
                  : TrainbookedSeat["2A"].includes(d)
                  ? " green"
                  : " white",
                display: "flex",
                alignItems: "center",
                width: "2rem",
                height: "2rem",
                margin: "0px",
                outline: "green",
                justifyContent: "center",
              }}
            >
              {d}
            </p>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(15,40px)",
            gridTemplateRows: "40px 40px",
          }}
        >
          {seatNo.slice(15, 45).map((d, i) => (
            <p
              key={i}
              style={{
                rotate: "-90deg",
                border: "2px solid #00fff0",
                backgroundColor: occupiedSeat["2A"].includes(d)
                  ? "red"
                  : TrainbookedSeat["2A"].includes(d)
                  ? "green"
                  : "white",

                display: "flex",
                alignItems: "center",
                width: "2rem",
                height: "2rem",
                margin: "0px",
                justifyContent: "center",
              }}
            >
              {d}
            </p>
          ))}
        </div>
      </div>
    );
  };
  const NoOfSeat2s = () => {
    return (
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(18,40px)",
            marginBottom: "1rem",
          }}
        >
          {seatNo.slice(0, 53).map((d, i) => (
            <p
              key={i}
              style={{
                rotate: "-90deg",
                border: "2px solid #00fff0",
                backgroundColor: occupiedSeat["2S"].includes(d)
                  ? "red"
                  : TrainbookedSeat["2S"].includes(d)
                  ? "green"
                  : "white",
                display: "flex",
                alignItems: "center",
                width: "2rem",
                height: "2rem",
                margin: "0px",
                outline: "green",
                justifyContent: "center",
              }}
            >
              {d}
            </p>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(18,40px)",
            gridTemplateRows: "40px 40px 40px",
          }}
        >
          {seatNo.slice(53, 106).map((d, i) => (
            <p
              key={i}
              style={{
                rotate: "-90deg",
                border: "2px solid #00fff0",
                backgroundColor: occupiedSeat["2S"].includes(d)
                  ? "red"
                  : TrainbookedSeat["2S"].includes(d)
                  ? "green"
                  : "white",
                display: "flex",
                alignItems: "center",
                width: "2rem",
                height: "2rem",
                margin: "0px",
                justifyContent: "center",
              }}
            >
              {d}
            </p>
          ))}
        </div>
      </div>
    );
  };
  const NoOfSeat3A = () => {
    return (
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(16,40px)",
            gridTemplateRows: "repeat(3,40px)",
            marginBottom: "1rem",
          }}
        >
          {seatNo.slice(0, 48).map((d, i) => (
            <p
              key={i}
              style={{
                rotate: "-90deg",
                border: "2px solid #00fff0",
                backgroundColor: occupiedSeat["3A"].includes(d)
                  ? "red"
                  : TrainbookedSeat["3A"].includes(d)
                  ? "green"
                  : "white",
                display: "flex",
                alignItems: "center",
                width: "2rem",
                height: "2rem",
                margin: "0px",
                outline: "green",
                justifyContent: "center",
              }}
            >
              {d}
            </p>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(18,40px)",
            gridTemplateRows: "40px 40px 40px",
          }}
        >
          {seatNo.slice(48, 63).map((d, i) => (
            <p
              key={i}
              style={{
                rotate: "-90deg",
                border: "2px solid #00fff0",
                backgroundColor: occupiedSeat["3A"].includes(d)
                  ? "red"
                  : TrainbookedSeat["3A"].includes(d)
                  ? "green"
                  : "white",
                display: "flex",
                alignItems: "center",
                width: "2rem",
                height: "2rem",
                margin: "0px",
                justifyContent: "center",
              }}
            >
              {d}
            </p>
          ))}
        </div>
      </div>
    );
  };
  const NoOfSeatSL = () => {
    return (
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(18,40px)",
            gridTemplateRows: "repeat(3,40px)",
            marginBottom: "1rem",
          }}
        >
          {seatNo.slice(0, 54).map((d, i) => (
            <p
              key={i}
              style={{
                rotate: "-90deg",
                border: "2px solid #00fff0",
                backgroundColor: occupiedSeat["SL"].includes(d)
                  ? "red"
                  : TrainbookedSeat["SL"].includes(d)
                  ? "green"
                  : "white",
                display: "flex",
                alignItems: "center",
                width: "2rem",
                height: "2rem",
                margin: "0px",
                outline: "green",
                justifyContent: "center",
              }}
            >
              {d}
            </p>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(18,40px)",
            gridTemplateRows: "40px 40px 40px",
          }}
        >
          {seatNo.slice(54, 71).map((d, i) => (
            <p
              key={i}
              style={{
                rotate: "-90deg",
                border: "2px solid #00fff0",
                backgroundColor: occupiedSeat["SL"].includes(d)
                  ? "red"
                  : TrainbookedSeat["SL"].includes(d)
                  ? "green"
                  : "white",
                display: "flex",
                alignItems: "center",
                width: "2rem",
                height: "2rem",
                margin: "0px",
                justifyContent: "center",
              }}
            >
              {d}
            </p>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div>
      {isPayment ? (
        <div>
          <div className="booking-details">
            <div className="booking-user">
              <h2> User Details </h2>
              <p>Name:{userDetails.name}</p>
              <p>from:{userDetails.from}</p>
              <p>destination:{userDetails.destination}</p>
              <p>
                date:
                {`${userDetails.day}-${userDetails.month}-${userDetails.year}`}
              </p>
              <p>
                booked seat:{" "}
                {`
              ${
                TrainbookedSeat["1A"].toString()
                  ? " 1A : " +
                    Array.from(new Set(TrainbookedSeat["1A"].toString())) +
                    " . "
                  : ""
              }
              ${
                TrainbookedSeat["2A"].toString()
                  ? " 2A: " +
                    Array.from(new Set(TrainbookedSeat["2A"].toString())) +
                    " . "
                  : ""
              }
              ${
                TrainbookedSeat["2S"].toString()
                  ? " 2S: " +
                    Array.from(new Set(TrainbookedSeat["2S"].toString())) +
                    " . "
                  : ""
              }
              ${
                TrainbookedSeat["3A"].toString()
                  ? " 3A: " +
                    Array.from(new Set(TrainbookedSeat["3A"].toString())) +
                    " . "
                  : ""
              }
              ${
                TrainbookedSeat["SL"].toString()
                  ? " SL: " +
                    Array.from(new Set(TrainbookedSeat["SL"].toString())) +
                    " . "
                  : ""
              }
              `}
              </p>
            </div>
          </div>
          <div className="booking-box">
            <div>
              <p>pay number: </p>{" "}
              <div className="booking-box-number">{number}</div>
            </div>
            <div>{message}</div>
          </div>
        </div>
      ) : (
        <>
          <div>
            <h1>trani seat info</h1>
            {TrainData.success ? (
              <TrainDetails
                train={TrainData.data[selectedTrain - 1]}
                seatClass={seatClass}
              />
            ) : (
              <div>no selected train avaliable</div>
            )}
          </div>
          <h1>seat info</h1>
          {selectedClass == 0 && (
            <div
              style={{
                margin: "1rem",
              }}
            >
              <p>
                {" "}
                <b>Class: </b> First AC <b>coach type: </b>A
                <b>
                  {"  "} Price:{price}
                </b>
              </p>
              <NoOfSeat1A />
            </div>
          )}
          {selectedClass == 1 && (
            <div style={{ textalign: "center" }}>
              <p>
                {" "}
                <b>Class: </b> 2 Tire AC <b>Coach Type: </b>A
                <b>
                  {"  "} Price:{price - 60}
                </b>
              </p>
              <NoOfSeat2A />{" "}
            </div>
          )}
          {selectedClass == 2 && (
            <div>
              <p>
                {" "}
                <b>Class: </b> Second seating(2s)
              </p>
              <b>
                {"  "} Price:{price - 400}
              </b>
              <NoOfSeat2s />{" "}
            </div>
          )}
          {selectedClass == 3 && (
            <div>
              <p>
                {" "}
                <b>Class: </b> 3 Tire AC
              </p>
              <b>
                {"  "} Price:{price - 100}
              </b>
              <NoOfSeat3A />{" "}
            </div>
          )}
          {selectedClass == 4 && (
            <div>
              <b>Class: </b> Sleeper
              <b>
                {"  "} Price:{price - 300}
              </b>
              <NoOfSeatSL />{" "}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TrainSeat;
