import React, { useState, useEffect } from 'react';

const VoiceBookingSystem = () => {
  const [speechRecognitionActive, setSpeechRecognitionActive] = useState(false);
  const [prompted, setPrompted] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !speechRecognitionActive) {
      startVoiceInput();
    }
  };

  const startVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'ta-IN';
    recognition.start();
    setSpeechRecognitionActive(true);
    
    recognition.onresult = (event) => {
      const userResponse = event.results[0][0].transcript.toLowerCase();
      handleUserResponse(userResponse);
      recognition.stop();
      setSpeechRecognitionActive(false);
      startVoiceInput();
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      recognition.stop();
      setSpeechRecognitionActive(false);
      startVoiceInput();
    };
  };

  const handleUserResponse = (response) => {
    if (response.includes('பஸ்')) {
      window.location.href = '/bus'; // பஸ் பக்கத்திற்கு நகர்த்துக
    } else if (response.includes('ரயில்')) {
      window.location.href = '/train'; // ரயில் பக்கத்திற்கு நகர்த்துக
    } else if (response.includes('விமானம்')) {
      window.location.href = '/airline'; // விமானம் பக்கத்திற்கு நகர்த்துக
    } else {
      if (!prompted) {
        speak("   நீங்கள் எந்த சேவையை  விரும்புகிறீர்கள்? பஸ், ரயில், அல்லது விமானம்?");
        setPrompted(true);
      }
    }
  };

  const speak = (text) => {
    const msg = new window.SpeechSynthesisUtterance(text);
    msg.lang = 'ta-IN';
    window.speechSynthesis.speak(msg);
  };

  useEffect(() => {
    speak("புதிய சேவையை தொடங்க என்டர் பட்டனை அழுத்தவும்");
  }, []);

  return (
    <div>
      <h1>Voice-Based Booking System</h1>
    </div>
  );
};

export default VoiceBookingSystem;
