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

export default function TrainDetail({ data, selectedTrain, setSelectedTrain }) {
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
          case "ரயில்":
            !isNumericNumber(value) && isTamilNumber(value)
              ? setSelectedTrain(tamilToNumeric[value])
              : setSelectedTrain(value);
            console.log(selectedTrain);
            break;
          case "தகவல்":
            let index = 0;
            for (const d of data.data) {
              index += 1;
              if (index > 4) {
                break;
              }
              console.log(d);
              speak(`
              ரயில் எண் ${index} 
              ரயில் பெயர் ${d.train_base.train_name} ${d.train_base.train_no}
              ${d.train_base.from_stn_name} to ${d.train_base.to_stn_name}
              புறப்படும் நேரம்: ${d.train_base.from_time}
              வருகை நேரம்: ${d.train_base.to_time}
       `);
            }
            break;
          case "இருக்கை":
            history("/train/seat");
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
      </div>
    );
  };

  return (
    <div className="trainContainer">
      {data.success ? (
        data.data.map((train, index) =>
          index < 4 ? (
            <div
              key={train.train_base.train_no}
              style={{
                border: selectedTrain == index + 1 ? "2px solid green" : "",
              }}
              className=""
            >
              <TrainDetails train={train} />
            </div>
          ) : null
        )
      ) : (
        <div>no trains avaliable</div>
      )}
    </div>
  );
}
