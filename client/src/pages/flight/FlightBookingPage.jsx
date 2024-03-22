import React, { useState, useEffect } from "react";
import {
  tamilToNumeric,
  isNumericNumber,
  isTamilNumber,
  speak,
  startListening,
  isObjEmpty,
} from "../../utils/speech";
import { useNavigate } from "react-router-dom";

const FlightBookingPage = ({
  userDetails,
  data,
  dataRoute,
  setUserDetails,
  setData,
  setDataRoute,
}) => {
  const history = useNavigate();
  function isAllFilled(userdetails) {
    console.log(userdetails);
    return (
      userdetails.name !== "" &&
      userdetails.from !== "" &&
      userdetails.destination !== ""
    );
  }
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      source: userDetails.from,
      destination: userDetails.destination,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3001/flight/findRoute", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setDataRoute({ ...dataRoute, ...result[0] });
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, [userDetails.from, userDetails.destination]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const data = [];
    for (const val of dataRoute.flight_id) {
      console.log(val);
      fetch("http://localhost:3001/flight/findFlight", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ flight_id: val }),
      })
        .then((result) => result.json())
        .then((res) => {
          data.push(res[0]);
          console.log("flight result: ", res);
        })
        .catch((e) => console.log(e));
    }
    setData(data);
  }, [dataRoute]);
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
          case "name":
          case "பெயர்":
            setUserDetails((prevDetails) => ({ ...prevDetails, name: value }));
            speak(`பெயர் ${value}}`);
            break;
          case "from":
          case "இருந்து":
            setUserDetails((prevDetails) => ({ ...prevDetails, from: value }));
            speak(`இருந்து ${value}}`);
            break;
          case "destination":
          case "இடம்":
            setUserDetails((prevDetails) => ({
              ...prevDetails,
              destination: value,
            }));
            speak(`இடம் ${value}}`);
            break;
          case "mobile":
          case "கைபேசி":
            setUserDetails((prevDetails) => ({ ...prevDetails, email: value }));
            speak(`கைபேசி ${value}}`);
            break;
          case "date":
          case "நாள்":
            !isNumericNumber(value) && isTamilNumber(value)
              ? setUserDetails((prevDetails) => ({
                  ...prevDetails,
                  day: tamilToNumeric[value],
                }))
              : setUserDetails((prevDetails) => ({
                  ...prevDetails,
                  day: value,
                }));
            speak(`நாள் ${value}}`);
            break;
          case "மாதம்":
            !isNumericNumber(value) && isTamilNumber(value)
              ? setUserDetails((prevDetails) => ({
                  ...prevDetails,
                  month: tamilToNumeric[value],
                }))
              : setUserDetails((prevDetails) => ({
                  ...prevDetails,
                  month: value,
                }));
            speak(`மாதம் ${value}}`);
            break;
          case "ஆண்டு":
            !isNumericNumber(value) && isTamilNumber(value)
              ? setUserDetails((prevDetails) => ({
                  ...prevDetails,
                  year: tamilToNumeric[value],
                }))
              : setUserDetails((prevDetails) => ({
                  ...prevDetails,
                  year: value,
                }));
            speak(`ஆண்டு ${value}}`);
            break;
          case "தேடு":
            history("/flight/details");
            break;
          case "கட்டளை":
            speak(
              `பெயர் . பயனரின் பெயரை அமைக்க
         இருந்து. பயனரின் செல்லும் இடம் அமைக்க
         இலக்கு. பயனரின்  இருக்கும்  இடம் அமைக்க
         கைபேசி. பயனரின்  அலைபேசி எண்   அமைக்க
         நாள். பயனரின்  இடத்திற்கு செல்லும் நாள்  அமைக்க
         மாதம். பயனரின்  இடத்திற்கு செல்லும் மாதம் அமைக்க
         ஆண்டு. பயனரின்  இடத்திற்கு செல்லும் ஆண்டு அமைக்க
         தேடு. ரயில் தேடுவதற்கு
         பின்னால். பூர்த்தி செய்யும் படிவத்திற்கு மீண்டும் திரும்பு 
         கட்டளை. கட்டளைகளின் பட்டியலை பார்க்க`
            );
            break;
          case "இருக்கை":
            console.log(value);
            break;
          default:
            console.log("Invalid command");
        }
      });
    }
  };

  return (
    <div id="busBookingContainer">
      <h1>Flight Booking</h1>
      <div>
        <p>Name: {userDetails.name}</p>
        <p>From: {userDetails.from}</p>
        <p>Destination: {userDetails.destination}</p>
        <p>mobile: {userDetails.email}</p>
        <p> Date: </p>
        <div className="date-box">
          <span className="date-item">{userDetails.day}</span>
          <span className="date-item">{userDetails.month}</span>
          <span className="date-item">{userDetails.year}</span>
        </div>
      </div>
    </div>
  );
};

export default FlightBookingPage;
