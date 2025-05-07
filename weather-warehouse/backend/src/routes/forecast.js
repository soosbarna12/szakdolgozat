const express = require("express");
const path = require("path");
const { exec } = require("child_process");
const router = express.Router();

router.post("/forecastLSTM", (req, res) => {
  const { location } = req.body;

  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  const notebookPath = path.join(__dirname, "../notebooks/lstm_forecast.ipynb");
  const outputPath = path.join(__dirname, "../notebooks/output.ipynb");

  // Run the notebook with papermill
  const command = `papermill ${notebookPath} ${outputPath} -p location "${location}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing notebook: ${error.message}`);
      return res.status(500).json({ error: "Failed to run notebook" });
    }

    console.log("Notebook executed successfully");
    res.json({ message: "Notebook executed successfully", output: outputPath });
  });
});

module.exports = router;