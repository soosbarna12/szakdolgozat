const express = require("express");
const router = express.Router();
const validate = require('validate.js');
const sql = require("mssql");
const { historicalDataConstraints, historicalLocationConstraints, pastHistoricalDataConstraints } = require('../authentication/validationConstraints');


// use todays weather data as the past weather data is not available yet
router.post('/historicalData', async (req, res) => {
  try {
    const { location, date } = req.body;

    const validationResult = validate(req.body, historicalDataConstraints)
    if (validationResult) {
      return res.status(400).json({ error: validationResult?? "Location and date required" });
    }

    const pool = await sql.connect();
    const result = await pool.request()
    .input('location', sql.NVarChar, location.name)
    .input('country', sql.NVarChar, location.country)
    .input('date', sql.Date, date)
    .query(`SELECT 
            f.WeatherID,
            f.LocationKey,
            f.DateKey,
            d.FullDate,
            l.CityName,
            l.CountryCode,
            f.Temperature,
            f.MinTemperature,
            f.MaxTemperature,
            f.Humidity,
            f.WindSpeed,
            f.Precipitation,
            f.Pressure,
            f.CloudCover,
            f.Source,
            f.ObservationTime
        FROM FactWeather f
        JOIN DimDate d ON f.DateKey = d.DateKey
        JOIN DimLocation l ON f.LocationKey = l.LocationKey
        WHERE l.CityName = @location 
        AND l.CountryCode = @country 
        AND d.FullDate = @date;`
      );

    const historicalData = result.recordset;

    res.status(200).json(historicalData);

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
});

// get stored locations from the historical database
router.get('/historicalLocations', async (req, res) => {
  try {
    const { location } = req.query;

    const validationResult = validate(req.query, historicalLocationConstraints)
    if (validationResult) {
      return res.status(400).json({ error: validationResult?? "Location required" });
    }

    const pool = await sql.connect();

    const result = await pool.request()
    .input('location', sql.NVarChar, location)
    .query("SELECT DISTINCT CityName AS name, CountryCode AS country, Latitude AS lat, Longitude AS lon FROM DimLocation WHERE CityName LIKE '%' + @location + '%'");

    const locations = result.recordset;

    res.status(200).json(locations);

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch historical locations' });
  }
});

// get stored dates from the historical database
router.get('/historicalDates', async (req, res) => {
  try {
    const { location } = req.query;

    const validationResult = validate(req.query, historicalLocationConstraints)
    if (validationResult) {
      return res.status(400).json({ error: validationResult?? "Location required" });
    }

    const pool = await sql.connect();

    const result = await pool.request()
    .input('location', sql.NVarChar, location)
    .query(`SELECT DISTINCT d.FullDate AS date FROM DimDate d
      JOIN FactWeather f ON d.DateKey = f.DateKey
      JOIN DimLocation l ON f.LocationKey = l.LocationKey
      WHERE l.CityName = @location;`)
    const dates = result.recordset;

    res.status(200).json(dates);

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch historical dates' });
  }
});


router.post('/pastHistoricalData', async (req, res) => {
  try {
    const { location } = req.body;

    const validationResult = validate(req.body, pastHistoricalDataConstraints)
    if (validationResult) {
      return res.status(400).json({ error: validationResult?? "Location required" });
    }

    const today = new Date();
    const pastYear = new Date(today);
    pastYear.setDate(today.getDate() - 365);

    const pool = await sql.connect();
    const result = await pool.request()
      .input('location', sql.NVarChar, location.name)
      .input('country', sql.NVarChar, location.country)
      .input('startDate', sql.Date, pastYear.toISOString().slice(0, 10))
      .input('endDate', sql.Date, today.toISOString().slice(0, 10))
      .query(`
        SELECT d.FullDate AS date, f.Temperature AS temperature, f.MinTemperature AS minTemperature, f.MaxTemperature AS maxTemperature, f.Precipitation AS precipitation, f.Pressure AS pressure
        FROM FactWeather f
        JOIN DimDate d ON f.DateKey = d.DateKey
        JOIN DimLocation l ON f.LocationKey = l.LocationKey
        WHERE l.CityName = @location
          AND l.CountryCode = @country
          AND d.FullDate >= @startDate
          AND d.FullDate < @endDate
        ORDER BY d.FullDate DESC
      `);

    const historical = result.recordset.map(r => ({
      date: r.date.toISOString().slice(0, 10),
      temperature: r.temperature ?? 0,
      minTemperature: r.minTemperature ?? 0,
      maxTemperature: r.maxTemperature ?? 0,
      precipitation: r.precipitation ?? 0,
      pressure: r.pressure ?? 0
    }));

    res.json(historical);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch same day history' });
  }
});

module.exports = router;
