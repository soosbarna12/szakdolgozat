const express = require("express");
const router = express.Router();
const { lstmForecast } = require("../services/lstmService");

router.post("/lstm", async (req, res) => {
  try {
    const { data } = req.body; // Historical data array
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ error: "Invalid data format. Provide an array of numbers." });
    }

    const forecast = await lstmForecast(data);
    res.status(200).json({ forecast });
  } catch (error) {
    console.error("Error generating LSTM forecast:", error);
    res.status(500).json({ error: "Failed to generate forecast" });
  }
});

module.exports = router;