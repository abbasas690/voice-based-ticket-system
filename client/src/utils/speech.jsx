
  const speak = (text) => {
    const msg = new window.SpeechSynthesisUtterance(text);
    msg.lang = 'ta-IN';
    window.speechSynthesis.speak(msg);
  };

  const english = ()=>{
    const recognitionEnglish = new window.webkitSpeechRecognition();
    
    recognitionEnglish.onresult=(event) => {
      const transcript = event.results[0][0].transcript.toLowerCase()
      return transcript;
    }

    recognitionEnglish.start()

  }

export {speak,english};