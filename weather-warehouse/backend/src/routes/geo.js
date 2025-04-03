const express = require("express");
const axios = require("axios");
const router = express.Router();
const apiKey = "462394b96065d405cd9ca7b3ef92d634";


router.get("/location", async (req, res) => {
  const { location } = req.query;
  const limit = 5; // limit for the number of results
  if (!location) {
    return res.status(400).json({ error: "Query  location is required." });
  }
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=${limit}&appid=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

module.exports = router;
