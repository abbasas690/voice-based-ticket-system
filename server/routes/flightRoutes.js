const express = require("express");
const router = express.Router();
const busController = require("../controller/flightController");

// Define routes for buses
router.get("/getBus", busController.getAllBus);
router.post("/findRoute", busController.findRoute);
router.post("/findBus", busController.findBus);
router.post("/seats", busController.seats);
router.post("/booking", busController.booking);
// Add more routes as needed

module.exports = router;
