import Home from "./pages/Home";
import BusBookingPage from "./pages/bus/BusBookingPage";
import TrainBookingPage from "./pages/train/TrainBookingPage";
import AirlineBookingPage from "./pages/AirlineBookingPage";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BusDetail from "./pages/bus/BusDetail";
import BusSeat from "./pages/bus/BusSeat";
import BusBooking from "./pages/bus/BusBooking";
import TrainDetail from "./pages/train/TrainDetail";
import TrainSeat from "./pages/train/TrainSeat";
import TrainBooking from "./pages/train/TrainBooking";
function App() {
  const [userDetails, setUserDetails] = useState({
    name: "danush",
    from: "சென்னை",
    destination: "கோயம்புத்தூர்",
    email: "9566777567",
    day: "1",
    month: "2",
    year: "24",
    date: ` `,
  });
  const [bookedSeats, setBookedSeats] = useState([]);
  const [dataRoute, setDataRoute] = useState({
    bus_id: [],
    route_id: 0,
    source: "",
    destination: "",
  });
  const [data, setData] = useState([]);
  const [TrainData, setTrainData] = useState({});
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [TrainbookedSeat, setTrainBookedSeat] = useState({
    "1A": [],
    "2A": [],
    "2S": [],
    "3A": [],
    SL: [],
  });
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/bus"
          element={
            <BusBookingPage
              userDetails={userDetails}
              setUserDetails={setUserDetails}
              dataRoute={dataRoute}
              setDataRoute={setDataRoute}
              setData={setData}
              data={data}
            />
          }
        />
        <Route
          path="/train"
          element={
            <TrainBookingPage
              userDetails={userDetails}
              setUserDetails={setUserDetails}
              setData={setTrainData}
              data={TrainData}
            />
          }
        />
        <Route
          path="/train/details"
          element={
            <TrainDetail
              data={TrainData}
              selectedTrain={selectedTrain}
              setSelectedTrain={setSelectedTrain}
            />
          }
        />
        <Route path="/airline" element={<AirlineBookingPage />} />
        <Route
          path="/bus/details"
          element={
            <BusDetail
              data={data}
              selectedBus={selectedBus}
              setSelectedBus={setSelectedBus}
            />
          }
        />
        <Route
          path="/bus/booking"
          element={
            <BusBooking
              busDetails={data.length !== 0 ? data[selectedBus - 1] : []}
              userDetails={userDetails}
              dataRoute={dataRoute}
              bookedSeats={bookedSeats}
              setBookedSeats={setBookedSeats}
              selectedBus={selectedBus}
            />
          }
        />
        <Route
          path="/train/seat"
          element={
            <TrainSeat
              TrainData={TrainData}
              selectedTrain={selectedTrain}
              userDetails={userDetails}
              TrainbookedSeat={TrainbookedSeat}
              setTrainBookedSeat={setTrainBookedSeat}
            />
          }
        />
        <Route
          path="/train/booking"
          element={
            <TrainBooking
              userDetails={userDetails}
              TrainbookedSeat={TrainbookedSeat}
            />
          }
        />
        <Route
          path="/bus/seat"
          element={
            <BusSeat
              busDetails={data.length !== 0 ? data[selectedBus - 1] : []}
              userDetails={userDetails}
              dataRoute={dataRoute}
              bookedSeats={bookedSeats}
              setBookedSeats={setBookedSeats}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
