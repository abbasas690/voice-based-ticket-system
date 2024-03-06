import Home from "./pages/Home";
import BusBookingPage from "./pages/bus/BusBookingPage";
import TrainBookingPage from "./pages/TrainBookingPage";
import AirlineBookingPage from "./pages/AirlineBookingPage";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BusDetail from "./pages/bus/BusDetail";
import BusSeat from "./pages/bus/BusSeat";
function App() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    from: "",
    destination: "",
    email: "",
    day: "",
    month: "",
    year: "24",
    date: ` `,
  });
  const [dataRoute, setDataRoute] = useState({
    bus_id: [],
    route_id: 0,
    source: "",
    destination: "",
  });
  const [data, setData] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
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
              submit={submit}
              setSubmit={setSubmit}
              setData={setData}
              data={data}
            />
          }
        />
        <Route path="/train" element={<TrainBookingPage />} />
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
          path="/bus/seat"
          element={
            <BusSeat
              busDetails={data.length !== 0 ? data[selectedBus - 1] : []}
              userDetails={userDetails}
              dataRoute={dataRoute}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
