const express = require("express");
const router = express.Router();

router.get('/data', (req, res) => {
  res.send('hello world today')
})

module.exports = router;