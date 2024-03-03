import React, { useState } from 'react'
import { useEffect } from 'react';
import { isNumericNumber,isTamilNumber,speak,tamilToNumeric } from '../utils/speech';
export default function BusDetail({data,selectedBus,setSelectedBus}) {

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
    case 'பேருந்து':
        !isNumericNumber(value) && isTamilNumber(value) ?    setSelectedBus( tamilToNumeric[value])
                    :setSelectedBus(value)
        console.log(selectedBus)
    break;
    case 'தகவல்':

    let index=0;
    for(const d of data){
      index+=1
       speak(`
       பேருந்து எண் ${index}
       பேருந்து பெயர் ${d.name}
       மொத்த இருக்கை எண்ணிக்கை ${d.nos}
       விலை ${d.price}
       பேருந்து வகை ${d.type}
       `)
    }
      break
  };

}
  return (
    <div>
     { 
        data.map((bus,index) =>(
          <div key={bus.bus_id} style={{"border":selectedBus == index+1 ? "2px solid green" : ""}} className= "busDetails">
            <p>Name:{bus.name}</p>
            <p>Type: {bus.type}</p>
            <p>Total No Of Seat :{bus.nos}</p>
            <p>Price: {bus.price}</p>
          </div>
          
        ))
  }
    </div>
  )
}
