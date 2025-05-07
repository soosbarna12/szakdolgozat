// filepath: backend/src/routes/forecast.js
const express = require("express");
const router = express.Router();

router.post("/lstm", async (req, res) => {
  try {
    const { location, date } = req.body; // Location and date from the request
    if (!location || !date) {
      return res.status(400).json({ error: "Location and date are required." });
    }

    // Fetch historical data for the location
    const historicalData = get_historical_data(location);
    if (!historicalData || historicalData.length < 7) {
      return res.status(404).json({ error: "Insufficient historical data for the location." });
    }

    // Generate forecast using the LSTM model
    const forecast = await lstmForecast(historicalData);
    res.status(200).json({ forecast });
  } catch (error) {
    console.error("Error generating forecast:", error);
    res.status(500).json({ error: "Failed to generate forecast." });
  }
});

module.exports = router;