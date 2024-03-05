import React, { useEffect, useState } from 'react'


function BusSeat({busDetails ,userDetails,dataRoute}) {
    console.log("userDetails",userDetails)
    console.log("dataRoute",dataRoute)
    const [seat,setSeat]=useState([...Array.from(Array(busDetails.nos).keys(), n => n + 1)])
const  [ occupiedSeats,setOccupiedSeat]=useState([])
function isSeatOccupied(occupiedSeats, seatNumber) {
    // Check if the seatNumber exists in the occupiedSeats array
    return occupiedSeats.indexOf(seatNumber) !== -1;
}
    useEffect(()=>{
        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "date": `${userDetails.day}-${userDetails.month}-${userDetails.year}`,
  "route_id":dataRoute.route_id 
});
console.log(raw)
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:3001/bus/seats", requestOptions)
  .then(response => response.json())
  .then(result => {setOccupiedSeat([...result,1,2]) ;console.log(result)})
  .catch(error => console.log('error', error));
    },[])

    console.log(seat)
  return (
    <div>
        <div>
            <h2>Bus Info</h2>
            <p>Name:{busDetails.name}</p>
            <p>type:{busDetails.type}</p>
            <p>Total No Of Seat :{busDetails.nos}</p>
            <p>pric:{busDetails.price}</p>
        </div>
 <div>
    </div>
        <h2>Seat Info</h2>
    <div className='seatInfo'>
        <div className='seatContainer'>
            {/* First row */}
            <div className="firstRow">
                <div className="seat">1</div>
                <div className="emptySeat"></div>
                <div className="emptySeat"></div>
                <div className="emptySeat"></div>
                <div className="seat">2</div>
            </div>
            <div className="lastRow">
                {seat.slice(2,52).map((seatNumber, index) => (
                    <div key={index} className={isSeatOccupied(occupiedSeats, seatNumber) ? 'seat occupied' : 'seat'}>
                        {seatNumber}
                    </div>
                ))}
            </div>
        </div>
    </div>
    </div>
  )
}

export default BusSeat
