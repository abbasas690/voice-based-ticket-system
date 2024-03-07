const express = require("express");
const router = express.Router();
const busController = require("../controller/TrainController");

// Define routes for buses
router.post("/getTrain", busController.getTrain);
// Add more routes as needed

module.exports = router;
