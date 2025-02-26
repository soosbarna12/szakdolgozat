const express = require("express");
const axios = require("axios");
const router = express.Router();

const apiKey = '462394b96065d405cd9ca7b3ef92d634';

router.get('/data', async (req, res) => {
  try {
    const location = req.query.location;
    if(!location) {
      throw res.status(400).json({ error: 'Location is required' });
    }

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
})

module.exports = router;