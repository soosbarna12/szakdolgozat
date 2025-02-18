const express = require("express");
const router = express.Router();

router.get('/data', (req, res) => {
  res.send('hello world user')
})

module.exports = router;