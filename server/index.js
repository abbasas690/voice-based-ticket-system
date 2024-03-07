const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;
const busRout = require("./routes/busRoutes");
const trainRout = require("./routes/trainRoutes");

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/bus", busRout);
app.use("/train", trainRout);
// Route to get available routes

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
