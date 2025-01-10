const express = require('express');
const { getLatestCryptoStats, getCryptoDeviation } = require('../controllers/cryptoController'); // Import controller
const router = express.Router();

// Define the route for /stats
router.get('/stats', getLatestCryptoStats); // Use the controller for the stats route
router.get('/deviation',getCryptoDeviation);

module.exports = router;
