import React, { useState, useEffect } from 'react';
import { tamilToNumeric ,isNumericNumber,isTamilNumber, speak } from '../utils/speech';
const BusBookingPage = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    from: '',
    destination: '',
    email: '',
    day:'',
    month:'',
    year:'',
    date:` `
  });
  const [data,setData]=useState([])
  const [submit,setSubmit]=useState(false)

  useEffect(()=>{

    fetch('http://localhost:3001/routes').then(result => result.json()).then(routes => setData(routes))
  },[])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log(data)
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
      // recognition.start(); // Restart listening after processing is done
    };

    recognition.start();
  };
  
  const processCommand = async(command) => {
  // Normalize the input
  const normalizedCommand =command.trim().toLowerCase();

  // Split the command into action and value
  const [action, ...valueParts] = normalizedCommand.split(' ');
  const value = valueParts.join(' ');

  // Check if both action and value are present
  if (!action ) {
    console.log('Invalid command. Please provide both action and value.');
    return;
  }

  // Process the command
  switch (action) {
    case 'name':
    case 'பெயர்':
      if(!submit){
       setUserDetails(prevDetails => ({ ...prevDetails, name: value }));
      }
      break;
    case 'from':
    case 'இருந்து':
      !submit && setUserDetails(prevDetails => ({ ...prevDetails, from: value }));
      break;
    case 'destination':
    case 'இலக்கு':
     !submit &&  setUserDetails(prevDetails => ({ ...prevDetails, destination: value }));
      break;
    case 'mobile':
    case 'கைபேசி':
     !submit &&  setUserDetails(prevDetails => ({ ...prevDetails, email: value }));
      break;
    case 'date':
    case 'நாள்':
        !isNumericNumber(value) && isTamilNumber(value) ?    setUserDetails(prevDetails => ({ ...prevDetails, day: tamilToNumeric[value] }))
                    : setUserDetails(prevDetails => ({ ...prevDetails, day: value }))
      break;
    case 'மாதம்':
        !isNumericNumber(value) && isTamilNumber(value)  ?    setUserDetails(prevDetails => ({ ...prevDetails, month: tamilToNumeric[value] }))
                    : setUserDetails(prevDetails => ({ ...prevDetails, month: value }))
      break;
    case 'ஆண்டு':
        !isNumericNumber(value) && isTamilNumber(value) ?   setUserDetails(prevDetails => ({ ...prevDetails, year: tamilToNumeric[value] }))
                    :  setUserDetails(prevDetails => ({ ...prevDetails, year: value }))
      break;
    case 'தேடு':
      setSubmit(true)
      break
    case 'பின்னால்':
      setSubmit(false)
      break
    case 'கட்டளை':
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
         கட்டளை. கட்டளைகளின் பட்டியலை பார்க்க`)
      break
      case '':
      break;
    default:
      console.log('Invalid command');
  }
};


  

  return (
    <div id="busBookingContainer">
      <h1>Bus Booking</h1>
      {!submit ?
      <div>
        <p>Name: {userDetails.name}</p>
        <p>From: {userDetails.from}</p>
        <p>Destination: {userDetails.destination}</p>
        <p>mobile: {userDetails.email}</p>
        <p>Date:{userDetails.day}-{userDetails.month}-{userDetails.year} </p>
        <p>day: {userDetails.day}</p>
        <p>month: {userDetails.month}</p>
        <p>year: {userDetails.year}</p>
      </div>
      : data !== 0 && (
        data.map(bus =>(
          bus.destination == userDetails.destination && bus.source == userDetails.from &&(
          <div key={bus.route_id}  class="busDetails">
            <p>name:{bus.name}</p>
            <p>from: {bus.source} </p>
            <p>destination: {bus.destination} </p>
            <p>type: {bus.type}</p>
            <p>price: {bus.price}</p>
          </div>
          )
        ))
      )
      }
    </div>
  );
};

export default BusBookingPage;
