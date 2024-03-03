const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
const busRout=require("./routes/busRoutes")
// Dummy data for demonstration purposes
const busRoutes = [
    { route_id: 1, name:"kpn", source: "`சென்னை", destination: "கோயம்புத்தூர்", price: 250,type:"ac",nos:52 },
    { route_id: 2, name:"kpn", source: "சென்னை", destination: "கோயம்புத்தூர்", price: 150,type:"non-ac",nos:52 },
    { route_id: 3, name:"kpn", source: "சென்னை", destination: "கோயம்புத்தூர்", price: 150,type:"non-ac",nos:52 },
    { route_id: 4, name:"kpc", source: "கோயம்புத்தூர்", destination: "மதுரை", price:250, type:"ac",nos:25 },
    { route_id: 5,name:"kyc", source: "திருப்பூர்", destination: "சென்னை", price: 300,type:"ac" ,nos:52}
];

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/bus",busRout)
// Route to get available routes
app.get('/routes', (req, res) => {
    res.json(busRoutes);
});

// Route to book a ticket
app.post('/book', (req, res) => {
    const { name } = req.body;
    console.log(name)
    // Dummy logic to book the ticket
    // In a real application, this would involve adding booking details to a database
    res.json({ message: "Booking successful!" });
});

app.post('/route',(req,res)=>{

    
    console.log(req.body.json)
    // console.log(destination)
//   const data =  busRoutes.filter(bus =>{
//         bus.destination == destination && bus.source == source
//     })
//     if (data){
//          res.json({data:data})
//     }
//     console.log(destination)
//     console.log(source)
     res.json({message:"failed!"})
})

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
