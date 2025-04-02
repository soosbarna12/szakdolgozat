const express = require("express");
const router = express.Router();

// use todays weather data as the past weather data is not available yet
router.get('/data', (req, res) => {
  res.send('hello world forecast')
})

module.exports = router;