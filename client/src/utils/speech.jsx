const tamilToNumeric = {
  ஒன்று: 1,
  இரண்டு: 2,
  மூன்று: 3,
  நான்கு: 4,
  ஐந்து: 5,
  ஆறு: 6,
  ஏழு: 7,
  எட்டு: 8,
  ஒன்பது: 9,
  பத்து: 10,
  பதினொன்று: 11,
  பன்னிரண்டு: 12,
  பதின்மூன்று: 13,
  பதினான்கு: 14,
  பதினைந்து: 15,
  பதினாறு: 16,
  பதினேழு: 17,
  பதினெட்டு: 18,
  பத்தொன்பது: 19,
  இருபது: 20,
  "இருபத்தி ஒன்று": 21,
  "இருபத்தி இரண்டு": 22,
  "இருபத்தி மூன்று": 23,
  "இருபத்தி நான்கு": 24,
  "இருபத்தி ஐந்து": 25,
  "இருபத்தி ஆறு": 26,
  "இருபத்தி ஏழு": 27,
  "இருபத்தி எட்டு": 28,
  "இருபத்தி ஒன்பது": 29,
  முப்பது: 30,
  "முப்பத்தி ஒன்று": 31,
  ஜனவரி: 1,
  பிப்ரவரி: 2,
  மார்ச்: 3,
  ஏப்ரல்: 4,
  மே: 5,
  ஜூன்: 6,
  ஜூலை: 7,
  ஆகஸ்ட்: 8,
  செப்டம்பர்: 9,
  அக்டோபர்: 10,
  நவம்பர்: 11,
  டிசம்பர்: 12,
};

const speak = (text) => {
  const msg = new window.SpeechSynthesisUtterance(text);
  msg.lang = "ta-IN";
  window.speechSynthesis.speak(msg);
};
function isTamilNumber(word) {
  //to check the key exisit in tamilToNumeric
  return tamilToNumeric.hasOwnProperty(word);
}
function isNumericNumber(word) {
  // Regular expression to match digits only
  const numericRegex = /^[0-9]+$/;
  return numericRegex.test(word);
}

let isObjEmpty = (obj) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key].length !== 0) {
      return false; // If any property has a non-empty value, return false
    }
  }
  return true; // If all properties are empty, return true
};

const startListening = (call) => {
  const recognition = new window.webkitSpeechRecognition();
  recognition.lang = "ta-IN";

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    const sanitizedTranscript = transcript.replace(
      /[^\w\s\d\u0100-\uFFFF]/g,
      ""
    );
    console.log(sanitizedTranscript);
    const normalizedCommand = sanitizedTranscript.trim().toLowerCase();

    // Split the command into action and value
    const [action, ...valueParts] = normalizedCommand.split(" ");
    const value = valueParts.join(" ");

    // Check if both action and value are present
    if (!action) {
      console.log("Invalid command. Please provide both action and value.");
      return;
    }

    // Process the command
    call(action, value);
    recognition.stop(); // Stop listening after processing a command
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };

  recognition.onend = () => {
    // recognition.start(); // Restart listening after processing is done
  };

  recognition.start();
};
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

const processCommand = async (command) => {
  // Normalize the input
};
export {
  tamilToNumeric,
  isTamilNumber,
  startListening,
  isNumericNumber,
  speak,
  isObjEmpty,
  getRandomInt,
};
