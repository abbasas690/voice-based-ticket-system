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
  const history = useNavigate();
  console.log(selectedTrain, TrainData);
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
      </div>
    );
  };

  return (
    <div>
      <h1>trani seat info</h1>
      TrainData.success ? (
      <TrainDetails train={TrainData.data[selectedTrain - 1]} />
      ):
      <div>no selected train avaliable</div>
    </div>
  );
}

export default TrainSeat;
