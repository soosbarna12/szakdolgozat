const express = require("express");
const router = express.Router();
const validate = require('validate.js');
const sql = require("mssql");
const { historicalLocationConstraints } = require('../authentication/validationConstraints');


// use todays weather data as the past weather data is not available yet
router.get('/historicalData', async (req, res) => {
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


// get stored locations from the historical database
router.get('/historicalLocations', async (req, res) => {
  try {
    const { location } = req.query;

    const validationResult = validate(req.query, historicalLocationConstraints)
    if (validationResult) {
      console.log(validationResult);
      return res.status(400).json({ error: validationResult?? "Location required" });
    }

    const pool = await sql.connect();

    const result = await pool.request()
    .input('location', sql.NVarChar, location)
    .query("SELECT DISTINCT CityName AS name, CountryCode AS country FROM DimLocation WHERE CityName LIKE '%' + @location + '%'");

    const locations = result.recordset;

    console.log("Query result:", result.recordset);    
    console.log(result);
    console.log(locations);

    res.status(200).json(locations);

  } catch (error) {
    console.error("Error fetching historical locations.", error);
    res.status(500).json({ error: 'Failed to fetch historical locations' });
  }
});

module.exports = router;
