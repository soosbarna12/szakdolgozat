const express = require("express");
const axios = require("axios");
const router = express.Router();
const apiKey = '462394b96065d405cd9ca7b3ef92d634';

/*
// NOT IN USE
// fetch weather data by city name
router.get('/locationDataByCoords', async (req, res) => {
  try {
    const { lat, lon } = req.query;  // get latitude and longitude from query params

    if(!(lat && lon)) {
      throw res.status(400).json({ error: 'Coordinates is required' }); // check if location is provided
    }

    const lang = req.query.lang || 'en'; // optinal language parameter, default to english

    // fetch weather data from openweathermap api
    //const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&lang=${lang}`);
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=${lang}`);
    console.log("_________________________________"); // log the response data for debugging
    console.log(response.data);
    res.send(response.data); // send the response data back to the client

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
})
*/

// fetch weather data by city name
router.get('/locationData', async (req, res) => {
  try {
    const { locationName } = req.query; // get city name from query params

    if (!locationName) {
      return res.status(400).json({ error: 'Location name is required' }); // check if city name is provided
    }

    const lang = req.query.lang || 'en'; // optional language parameter, default to English

    // Split locationName into city and country (if provided)
    const [city, country] = locationName.split(',').map((part) => part.trim());

    // Construct the query parameter for the API
    const query = country ? `${city},${country}` : city;

    // fetch weather data from OpenWeatherMap API using city name
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&lang=${lang}`);
    res.send(response.data); // send the response data back to the client

  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'City not found' });
    } else {
      console.log(locationName);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
});

// FOR FUTURE USE
// fetch weather data by coordinates -> converts back to city name
// coordinates are necessary for the data map
router.get("/reverse-geocode", async (req, res) => {
  try {
    const { lat, lon } = req.query;  // get latitude and longitude from query params
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    const cityName = response.data?.[0]?.name || "Unknown location"; // get city name from response data
    res.send(cityName);

  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
