const express = require("express");
const router = express.Router();
const TrainController = require("../controller/TrainController");

// Define routes for buses
router.post("/getTrain", TrainController.getTrain);
// Add more routes as needed
router.post("/seats", TrainController.seats);
router.post("/booking", TrainController.booking);

module.exports = router;
