const request = require("supertest");
const express = require("express");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { router: forecastRouter } = require("./forecast");

jest.mock("fs");
jest.mock("child_process");

const app = express();
app.use(express.json());
app.use("/forecast", forecastRouter);

describe("POST /forecast/forecastLSTM", () => {
  const mockOutputPath = path.join(__dirname, "../notebooks/output.ipynb");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 400 if location is not provided", async () => {
    const response = await request(app).post("/forecast/forecastLSTM").send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Location is required" });
  });

  it("returns 500 if notebook execution fails", async () => {
    exec.mockImplementation((command, callback) => {
      callback(new Error("Execution failed"), null, null);
    });

    const response = await request(app)
      .post("/forecast/forecastLSTM")
      .send({ location: "Budapest" });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to run notebook" });
  });

  it("returns forecast data if notebook execution succeeds", async () => {
    exec.mockImplementation((command, callback) => {
      callback(null, "Notebook executed successfully", null);
    });

    const mockForecastData = [{ date: "2025-05-08", temperature: 22.5 }];
    fs.readFileSync.mockReturnValueOnce(
      JSON.stringify({
        cells: [
          {
            source: ["# forecast_data"],
            outputs: [
              {
                output_type: "execute_result",
                data: { "text/plain": JSON.stringify(mockForecastData) },
              },
            ],
          },
        ],
      })
    );

    const response = await request(app)
      .post("/forecast/forecastLSTM")
      .send({ location: "Budapest" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ forecast: mockForecastData });
  });
});

describe("extractForecastData", () => {
  const { extractForecastData } = require("./forecast");

  it("throws an error if forecast data is not found", () => {
    fs.readFileSync.mockReturnValueOnce(
      JSON.stringify({
        cells: [],
      })
    );

    expect(() => extractForecastData("mockOutputPath")).toThrow(
      "Forecast data output is missing or malformed"
    );
  });

  it("throws an error if forecast data output is malformed", () => {
    fs.readFileSync.mockReturnValueOnce(
      JSON.stringify({
        cells: [
          {
            source: ["# forecast_data"],
            outputs: [],
          },
        ],
      })
    );

    expect(() => extractForecastData("mockOutputPath")).toThrow(
      "Forecast data output is missing or malformed."
    );
  });

  it("parses and returns forecast data correctly", () => {
    const mockForecastData = [{ date: "2025-05-08", temperature: 22.5 }];
    fs.readFileSync.mockReturnValueOnce(
      JSON.stringify({
        cells: [
          {
            source: ["# forecast_data"],
            outputs: [
              {
                output_type: "execute_result",
                data: { "text/plain": JSON.stringify(mockForecastData) },
              },
            ],
          },
        ],
      })
    );

    const result = extractForecastData("mockOutputPath");
    expect(result).toEqual(mockForecastData);
  });
});