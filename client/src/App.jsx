import Home from './pages/Home'
import BusBookingPage from './pages/BusBookingPage';
import TrainBookingPage from './pages/TrainBookingPage';
import AirlineBookingPage from './pages/AirlineBookingPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
function App() {

  return (
   <Router>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/bus" element={<BusBookingPage/>} />
      <Route path="/train" element={<TrainBookingPage/>} />
      <Route path="/airline" element={<AirlineBookingPage/>} />
    </Routes>
    </Router>
  );
}

export default App
