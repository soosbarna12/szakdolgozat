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

/*
// save location to the database
router.post('/saveCurrentWeather', authGuard, async (req, res) => {
  const { name, lat, lon, date } = req.body; // destructure request body
  const payload = req.payload; // get the payload from the request

  const validationResult = validate(req.body, userSaveLocationConstraints)
  if (validationResult) {
    console.log(validationResult);
    return res.status(400).json({ error: validationResult?? "All fields are required" });
  }


  // try to get userId from token payload; if missing, look it up from the Users table
  let userID = payload.userId;
  if (!userID) {
    try {
      const pool = await sql.connect(); // database connection

      // insert into DimDate if not exists
      await pool.request()
        .input('DateKey', sql.Int, normalized.dateKey)
        .input('FullDate', sql.Date, normalized.fullDate)
        .input('Day', sql.Int, normalized.day)
        .input('Month', sql.Int, normalized.month)
        .input('MonthName', sql.NVarChar(20), normalized.monthName)
        .input('Quarter', sql.Int, normalized.quarter)
        .input('Year', sql.Int, normalized.year)
        .input('WeekdayName', sql.NVarChar(20), normalized.weekdayName)
        .input('IsWeekend', sql.Bit, normalized.isWeekend)
        .query(`
            IF NOT EXISTS (SELECT 1 FROM DimDate WHERE DateKey = @DateKey)
            INSERT INTO DimDate (DateKey, FullDate, Day, Month, MonthName, Quarter, Year, WeekdayName, IsWeekend)
            VALUES (@DateKey, @FullDate, @Day, @Month, @MonthName, @Quarter, @Year, @WeekdayName, @IsWeekend)
        `);

      // insert into DimLocation if not exists
      await pool.request()
          .input('CityName', sql.NVarChar(100), normalized.cityName)
          .input('CountryCode', sql.Char(2), normalized.countryCode)
          .input('Latitude', sql.Float, normalized.latitude)
          .input('Longitude', sql.Float, normalized.longitude)
          .query(`
              IF NOT EXISTS (SELECT 1 FROM DimLocation WHERE CityName = @CityName AND CountryCode = @CountryCode)
              INSERT INTO DimLocation (CityName, CountryCode, Latitude, Longitude)
              VALUES (@CityName, @CountryCode, @Latitude, @Longitude)
          `);

      // insert into FactWeather
      await pool.request()
      .input('DateKey', sql.Int, normalized.dateKey)
      .input('Temperature', sql.Float, normalized.temperature)
      .input('MinTemperature', sql.Float, normalized.minTemperature)
      .input('MaxTemperature', sql.Float, normalized.maxTemperature)
      .input('Humidity', sql.Int, normalized.humidity)
      .input('WindSpeed', sql.Float, normalized.windSpeed)
      .input('Precipitation', sql.Float, 0)
      .input('Pressure', sql.Int, normalized.pressure)
      .input('CloudCover', sql.Int, normalized.cloudCover)
      .input('Source', sql.NVarChar(50), 'OpenWeatherMap')
      .input('ObservationTime', sql.DateTime, normalized.observationTime)
      .query(`
          INSERT INTO FactWeather
          (DateKey, LocationKey, Temperature, MinTemperature, MaxTemperature, Humidity, WindSpeed, Precipitation, Pressure, CloudCover, Source, ObservationTime)
          VALUES
          (@DateKey, 
          (SELECT TOP 1 LocationKey FROM DimLocation WHERE CityName = @CityName AND CountryCode = @CountryCode),
          @Temperature, @MinTemperature, @MaxTemperature, @Humidity, @WindSpeed, @Precipitation, @Pressure, @CloudCover, @Source, @ObservationTime)
      `);

    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to save weather data" });
    }
  }

  if (!userID) {
    return res.status(400).json({ error: "User ID could not be determined." });
  }

  try {
    const pool = await sql.connect(); // database connection
    await pool.request()
      .input('userID', sql.Int, userID)
      .input('name', sql.VarChar, name)
      .input('latitude', sql.Decimal(10, 8), lat)
      .input('longitude', sql.Decimal(11, 8), lon)
      .input('date', sql.DateTime, date)
      .query(`
        INSERT INTO userLocations (userID, name, latitude, longitude, date) 
        VALUES (@userID, @name, @latitude, @longitude, @date)
      `);
    res.status(200).json({ message: "Location saved successfully" });

  } catch (err) {
    
    console.error(err);
    res.status(500).json({ error: "Failed to save location" });
  }
});
*/

// FOR FUTURE USE
// fetch weather data by coordinates -> converts back to city name
// coordinates are necessary for the data map
router.get("/reverse-geocode", async (req, res) => {
  try {
    const { lat, lon } = req.query;  // get latitude and longitude from query params
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    console.log(response.data[0]); 
    const { name, country } = response.data?.[0];
    res.send({name, country});

  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
