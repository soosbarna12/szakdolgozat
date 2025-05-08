const express = require("express");
const path = require("path");
const { exec } = require("child_process");
const router = express.Router();

router.post("/forecastLSTM", (req, res) => {
  const { location } = req.body;

  if (!location) {
    console.log("Error: Location is required");
    return res.status(400).json({ error: "Location is required" });
  }

  console.log(`Received request to generate forecast for location: ${location}`);

  const notebookPath = path.join(__dirname, "../notebooks/lstm_forecast.ipynb");
  const outputPath = path.join(__dirname, "../notebooks/output.ipynb");

  // Run the notebook with papermill
  const command = `papermill ${notebookPath} ${outputPath} -p location "${location}"`;

  console.log(`Executing command: ${command}`);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing notebook: ${error.message}`);
      return res.status(500).json({ error: "Failed to run notebook" });
    }

    console.log("Notebook executed successfully. Extracting forecast data...");
    const forecastData = extractForecastData(outputPath); // Implement this function to parse the notebook output
    console.log("Extracted forecast data:", forecastData);

    res.json({ forecast: forecastData });
  });
});

function extractForecastData(outputPath) {
  const fs = require("fs");
  const notebook = JSON.parse(fs.readFileSync(outputPath, "utf8"));

  // Find the cell containing the forecast data
  const forecastCell = notebook.cells.find(cell =>
    cell.source.some(line => line.includes("forecast_data"))
  );

  if (!forecastCell || !forecastCell.outputs || forecastCell.outputs.length === 0) {
    throw new Error("Forecast data not found in notebook output.");
  }

  // Extract the forecast data from the cell's output
  const forecastOutput = forecastCell.outputs.find(output => output.output_type === "execute_result");
  if (!forecastOutput || !forecastOutput.data || !forecastOutput.data["text/plain"]) {
    throw new Error("Forecast data output is missing or malformed.");
  }

  // Handle multi-line output
  const rawForecastData = forecastOutput.data["text/plain"];
  const forecastDataString = Array.isArray(rawForecastData) ? rawForecastData.join("") : rawForecastData;

  let forecastData;
  try {
    forecastData = JSON.parse(forecastDataString.replace(/'/g, '"')); // Replace single quotes with double quotes for JSON parsing
  } catch (err) {
    throw new Error("Failed to parse forecast data: " + err.message);
  }

  console.log("Validated forecast data:", forecastData);
  return forecastData;
}

module.exports = router;