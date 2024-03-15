import React, { useState, useEffect } from "react";
import { speak, startListening } from "../utils/speech";
const Home = () => {
  const [speechRecognitionActive, setSpeechRecognitionActive] = useState(false);
  const [prompted, setPrompted] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !speechRecognitionActive) {
      startListening((response, value) => {
        if (response.includes("பஸ்")) {
          window.location.href = "/bus"; 
        } else if (response.includes("ரயில்")) {
          window.location.href = "/train"; 
        } else if (response.includes("விமானம்")) {
          window.location.href = "/airline"; 
        } else {
          if (!prompted) {
            speak(
              "நீங்கள் எந்த சேவையை  விரும்புகிறீர்கள்? பஸ், ரயில், அல்லது விமானம்?"
            );
            setPrompted(true);
          }
        }
      });
    }
  };

  useEffect(() => {
    speak("புதிய சேவையை தொடங்க நுழைவு  பட்டனை அழுத்தவும்");
    speak(
      "நீங்கள் எந்த சேவையை  விரும்புகிறீர்கள்? பஸ், ரயில், அல்லது விமானம்?"
    );
  }, []);

  return (
    <div>
      <h1>Voice-Based Booking System</h1>
    </div>
  );
};

export default Home;
