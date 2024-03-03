import Home from './pages/Home'
import BusBookingPage from './pages/BusBookingPage';
import TrainBookingPage from './pages/TrainBookingPage';
import AirlineBookingPage from './pages/AirlineBookingPage';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import BusDetail from './pages/BusDetail';
function App() {

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
  const [dataRoute,setDataRoute]=useState([])
  const [data,setData]=useState([])
  const [submit,setSubmit]=useState(false)
  const [selectedBus,setSelectedBus]=useState(null)
  return (
   <Router>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/bus" element={<BusBookingPage
       userDetails={userDetails} 
       setUserDetails={setUserDetails}
        dataRoute={dataRoute}
        setDataRoute={setDataRoute}
        submit={submit}
        setSubmit={setSubmit}
        setData={setData}
        data={data}
        />} />
      <Route path="/train" element={<TrainBookingPage/>} />
      <Route path="/airline" element={<AirlineBookingPage/>} />
      <Route path="/bus/details" element={<BusDetail data={data} selectedBus={selectedBus} setSelectedBus={setSelectedBus}/>} />
    </Routes>
    </Router>
  );
}

export default App
