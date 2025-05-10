const express = require("express");
const path = require("path");
const { exec } = require("child_process");
const router = express.Router();

router.post("/forecastLSTM", async (req, res) => {
  const { location } = req.body;

  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  const notebookPath = path.join(__dirname, "../notebook/lstm_forecast.ipynb");
  const outputPath = path.join(__dirname, "../notebook/output.ipynb");

  const command = `papermill ${notebookPath} ${outputPath} -p locationName "${location.name}" -p locationCountry "${location.country}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: "Failed to run notebook" });
    }

    const forecastData = extractForecastData(outputPath);

    res.json(forecastData);
    });
});

function extractForecastData(outputPath) {
  const fs = require("fs");
  const notebook = JSON.parse(fs.readFileSync(outputPath, "utf8"));

  const forecastCell = notebook.cells.find(cell =>
    cell.source.some(line => line.includes("forecast_data"))
  );

  const forecastOutput = forecastCell?.outputs.find(output => output?.output_type === "execute_result");
  if (!forecastOutput || !forecastOutput?.data || !forecastOutput?.data["text/plain"]) {
    throw new Error("Forecast data output is missing or malformed.");
  }

  const rawForecastData = forecastOutput.data["text/plain"];
  const forecastDataString = Array.isArray(rawForecastData) ? rawForecastData.join("") : rawForecastData;

  let forecastData;
  try {
    forecastData = JSON.parse(forecastDataString.replace(/'/g, '"'));
  } catch (err) {
    throw new Error("Failed to parse forecast data: " + err.message);
  }

  return forecastData;
}

module.exports = {
  router,
  extractForecastData,
};