const express = require('express');
const router = express.Router();
const busController = require('../controller/busController');

// Define routes for buses
router.get('/getBus', busController.getAllBus);
router.get('/findRoute', busController.findRoute);
router.get('/findBus', busController.findBus);
// Add more routes as needed

module.exports = router;