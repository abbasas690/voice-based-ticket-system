import Home from "./pages/Home";
import BusBookingPage from "./pages/bus/BusBookingPage";
import TrainBookingPage from "./pages/train/TrainBookingPage";
import FlightBookingPage from "./pages/flight/FlightBookingPage";
import FlightDetail from "./pages/flight/FlightDetail";
import FlightSeat from "./pages/flight/FlightSeat";
import FlightBooking from "./pages/flight/FlightBooking";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BusDetail from "./pages/bus/BusDetail";
import BusSeat from "./pages/bus/BusSeat";
import BusBooking from "./pages/bus/BusBooking";
import TrainDetail from "./pages/train/TrainDetail";
import TrainSeat from "./pages/train/TrainSeat";
import TrainBooking from "./pages/train/TrainBooking";
function App() {
  //bus
  const [userDetails, setUserDetails] = useState({
    name: "danush",
    from: "",
    destination: "",
    email: "9566777567",
    day: "",
    month: "",
    year: "24",
    date: ` `,
  });

  const [data, setData] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [dataRoute, setDataRoute] = useState({
    bus_id: [],
    route_id: 0,
    source: "",
    destination: "",
  });
  const [selectedBus, setSelectedBus] = useState(null);
  //flight
  const [flightbookedSeats, setFlightBookedSeats] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [flightdataRoute, setFlightDataRoute] = useState({
    flight_id: [],
    route_id: 0,
    source: "",
    destination: "",
  });

  // train
  const [TrainData, setTrainData] = useState({});
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
        {/* bus page start */}
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
        {/* bus page end */}
        {/* train page start */}
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
        {/* train page end */}
        {/* Flight page start */}
        <Route
          path="/flight"
          element={
            <FlightBookingPage
              userDetails={userDetails}
              setUserDetails={setUserDetails}
              dataRoute={flightdataRoute}
              setDataRoute={setFlightDataRoute}
              setData={setData}
              data={data}
            />
          }
        />
        <Route
          path="/flight/details"
          element={
            <FlightDetail
              data={data}
              selectedBus={selectedFlight}
              setSelectedBus={setSelectedFlight}
            />
          }
        />
        <Route
          path="/flight/seat"
          element={
            <FlightSeat
              busDetails={data.length !== 0 ? data[selectedFlight - 1] : []}
              userDetails={userDetails}
              dataRoute={flightdataRoute}
              bookedSeats={flightbookedSeats}
              setBookedSeats={setFlightBookedSeats}
            />
          }
        />
        <Route
          path="/flight/booking"
          element={
            <FlightBooking
              busDetails={data.length !== 0 ? data[selectedFlight - 1] : []}
              userDetails={userDetails}
              dataRoute={flightdataRoute}
              bookedSeats={flightbookedSeats}
              setBookedSeats={setFlightBookedSeats}
              selectedBus={selectedFlight}
            />
          }
        />
        {/* bus page end */}
      </Routes>
    </Router>
  );
}

export default App;
