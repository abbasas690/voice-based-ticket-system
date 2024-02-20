import { useState } from 'react'
import VoiceBookingSystem from './pages/Home'
import BusBookingPage from './pages/BusBookingPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
function App() {

  return (
   <Router>
     <Routes>
      <Route path="/" element={<VoiceBookingSystem/>} />
      <Route path="/bus" element={<BusBookingPage/>} />
      <Route path="/train" element={<h1>train</h1>} />
      <Route path="/airline" element={<h1>airline</h1>} />
    </Routes>
    </Router>
  );
}

export default App
