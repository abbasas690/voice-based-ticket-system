import React, { useState, useEffect } from 'react';

const BusBookingPage = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    from: '',
    destination: '',
    email: '',
    date: ''
  });

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      startListening();
    }
  };

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'ta-IN';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      const sanitizedTranscript = transcript.replace(/[^\w\s\d\u0100-\uFFFF]/g, '');
      console.log(sanitizedTranscript)
      processCommand(sanitizedTranscript);
      recognition.stop(); // Stop listening after processing a command
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      recognition.start(); // Restart listening after processing is done
    };

    recognition.start();
  };
  const processCommand = (command) => {
  // Normalize the input
  const normalizedCommand =command.trim().toLowerCase();

  // Split the command into action and value
  const [action, ...valueParts] = normalizedCommand.split(' ');
  const value = valueParts.join(' ');

  // Check if both action and value are present
  if (!action || !value) {
    console.log('Invalid command. Please provide both action and value.');
    return;
  }

  // Process the command
  switch (action) {
    case 'name':
    case 'பெயர்':
      setUserDetails(prevDetails => ({ ...prevDetails, name: value }));
      break;
    case 'from':
    case 'இருந்து':
      setUserDetails(prevDetails => ({ ...prevDetails, from: value }));
      break;
    case 'destination':
    case 'இலக்கு':
      setUserDetails(prevDetails => ({ ...prevDetails, destination: value }));
      break;
    case 'mobile':
    case 'கைபேசி':
      setUserDetails(prevDetails => ({ ...prevDetails, email: value }));
      break;
    case 'date':
    case 'தேதி':
      setUserDetails(prevDetails => ({ ...prevDetails, date: value }));
      break;
    default:
      console.log('Invalid command');
  }
};


  

  return (
    <div>
      <h1>Bus Booking</h1>
      <div>
        <p>Name: {userDetails.name}</p>
        <p>From: {userDetails.from}</p>
        <p>Destination: {userDetails.destination}</p>
        <p>mobile: {userDetails.email}</p>
        <p>Date: {userDetails.date}</p>
      </div>
    </div>
  );
};

export default BusBookingPage;
