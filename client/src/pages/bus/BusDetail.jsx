import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  isNumericNumber,
  isTamilNumber,
  speak,
  tamilToNumeric,
  startListening,
} from "../../utils/speech";

export default function BusDetail({ data, selectedBus, setSelectedBus }) {
  const history = useNavigate();
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log(data);
      startListening((action, value) => {
        switch (action) {
          case "பேருந்து":
            !isNumericNumber(value) && isTamilNumber(value)
              ? setSelectedBus(tamilToNumeric[value])
              : setSelectedBus(value);
            console.log(selectedBus);
            break;
          case "தகவல்":
            let index = 0;
            for (const d of data) {
              index += 1;
              speak(`
       பேருந்து எண் ${index}
       பேருந்து பெயர் ${d.name}
       மொத்த இருக்கை எண்ணிக்கை ${d.nos}
       விலை ${d.price}
       பேருந்து வகை ${d.type}
       `);
            }
            break;
          case "இருக்கை":
            history("/bus/seat");
            break;
          case "பின்":
            history(-1);
            break;
          default:
            console.log("invalid command");
        }
      });
    }
  };

  return (
    <div>
      {data.map((bus, index) => (
        <div
          key={bus.bus_id}
          style={{ border: selectedBus == index + 1 ? "2px solid green" : "" }}
          className="busDetails"
        >
          <p>Name:{bus.name}</p>
          <p>Type: {bus.type}</p>
          <p>Total No Of Seat :{bus.nos}</p>
          <p>Price: {bus.price}</p>
        </div>
      ))}
    </div>
  );
}
