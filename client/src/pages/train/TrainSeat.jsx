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

function TrainSeat({ TrainData, selectedTrain }) {
  const [seatClass, setSeatClass] = useState(["1A", "2A", "2S", "3A", "SL"]);
  const [selectedClass, setSelectedClass] = useState(1);
  const NoOfSeat = [10, 45, 106, 63, 71];
  const [bookedSeat, setBookedSeat] = useState({
    "1A": [],
    "2A": [],
    "2s": [],
    "3A": [],
    SL: [],
  });
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
  const history = useNavigate();
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
          case "வகை":
            !isNumericNumber(value) && isTamilNumber(value)
              ? setSelectedClass(
                  tamilToNumeric[value] < 7 ? tamilToNumeric[value] : 1
                )
              : setSelectedClass(value < 7 ? value : 1);
            console.log(value);
            break;
          case "வகை":
            !isNumericNumber(value) && isTamilNumber(value)
              ? setSelectedClass(
                  tamilToNumeric[value] < 7 ? tamilToNumeric[value] : 1
                )
              : setSelectedClass(value < 7 ? value : 1);
            console.log(value);
            break;
          case "பின்":
            history(-1);
            break;
          case "பதிவு":
            history("/bus/booking");
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
                border: i == selectedClass - 1 ? "2px solid green" : null,
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
          border: "2px solid #f5f456",
          height: "100",
        }}
      >
        {seatNo.map((d, i) => (
          <div
            key={i}
            style={{
              border: "2px solid #00ff00",
              textAlign: "center",
              backgroundColor: "blue",
              color: "white",
            }}
          >
            L{d}
          </div>
        ))}
        {seatNo.map((d, i) => (
          <div
            key={i}
            style={{
              border: "2px solid #00ff00",
              textAlign: "center",
              backgroundColor: "red",
              color: "white",
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
                border: ".3rem solid #ff00ff",
                display: "flex",
                alignItems: "center",
                width: "2rem",
                height: "2rem",
                margin: "0px",
                outline: "green",
                justifyContent: "center",
                backgroundColor: "azure",
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
                border: ".3rem solid #ff00ff",
                display: "flex",
                alignItems: "center",
                width: "2rem",
                height: "2rem",
                margin: "0px",
                justifyContent: "center",
                backgroundColor: "azure",
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
                border: ".3rem solid #ff00ff",
                display: "flex",
                alignItems: "center",
                width: "2rem",
                height: "2rem",
                margin: "0px",
                outline: "green",
                justifyContent: "center",
                backgroundColor: "azure",
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
                border: ".3rem solid #ff00ff",
                display: "flex",
                alignItems: "center",
                width: "2rem",
                height: "2rem",
                margin: "0px",
                justifyContent: "center",
                backgroundColor: "azure",
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
                border: ".3rem solid #ff00ff",
                display: "flex",
                alignItems: "center",
                width: "2rem",
                height: "2rem",
                margin: "0px",
                outline: "green",
                justifyContent: "center",
                backgroundColor: "azure",
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
                border: ".3rem solid #ff00ff",
                display: "flex",
                alignItems: "center",
                width: "2rem",
                height: "2rem",
                margin: "0px",
                justifyContent: "center",
                backgroundColor: "azure",
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
                border: ".3rem solid #ff00ff",
                display: "flex",
                alignItems: "center",
                width: "2rem",
                height: "2rem",
                margin: "0px",
                outline: "green",
                justifyContent: "center",
                backgroundColor: "azure",
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
                border: ".3rem solid #ff00ff",
                display: "flex",
                alignItems: "center",
                width: "2rem",
                height: "2rem",
                margin: "0px",
                justifyContent: "center",
                backgroundColor: "azure",
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
      <div>
        <h1>trani seat info</h1>
        {TrainData.success ? (
          <TrainDetails train={TrainData.data[selectedTrain - 1]} />
        ) : (
          <div>no selected train avaliable</div>
        )}
      </div>
      <h1>seat info</h1>
      {selectedClass == 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "1rem",
          }}
        >
          <p>
            {" "}
            <b>Class: </b> First AC <b>coach type: </b>A
          </p>
          <NoOfSeat1A />
        </div>
      )}
      {selectedClass == 1 && (
        <div style={{ textalign: "center" }}>
          <p>
            {" "}
            <b>Class: </b> 2 Tire AC <b>Coach Type: </b>A
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
          <NoOfSeat2s />{" "}
        </div>
      )}
      {selectedClass == 3 && (
        <div>
          <p>
            {" "}
            <b>Class: </b> 3 Tire AC
          </p>
          <NoOfSeat3A />{" "}
        </div>
      )}
      {selectedClass == 4 && (
        <div>
          <b>Class: </b> Sleeper
          <NoOfSeatSL />{" "}
        </div>
      )}
    </div>
  );
}

export default TrainSeat;
