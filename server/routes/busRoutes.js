const express = require('express');
const router = express.Router();
const busController = require('../controller/busController');

// Define routes for buses
router.get('/getBus', busController.getAllBus);
router.post('/findRoute', busController.findRoute);
router.post('/findBus', busController.findBus);
// Add more routes as needed

module.exports = router;