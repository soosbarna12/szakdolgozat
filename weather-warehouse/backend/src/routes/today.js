const express = require("express");
const axios = require("axios");
const router = express.Router();
const apiKey = '462394b96065d405cd9ca7b3ef92d634';


// fetch locations
router.get("/location", async (req, res) => {
  const { location } = req.query;
  const limit = 5;
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


// fetch weather data by city name
router.get('/locationData', async (req, res) => {
  try {
    const { locationName } = req.query;

    if (!locationName) {
      return res.status(400).json({ error: 'Location name is required' });
    }

    const lang = req.query.lang || 'en'; // optional language parameter, default to English

    const [city, country] = locationName.split(',').map((part) => part.trim());

    const query = country ? `${city},${country}` : city;

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&lang=${lang}`);
    res.send(response.data);

  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'City not found' });
    } else {
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
});

// fetch weather data by coordinates -> converts back to city name
// coordinates are necessary for the data map
router.get("/reverse-geocode", async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    const { name, country } = response.data?.[0];
    res.send({name, country});

  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
