const request = require("supertest");
const express = require("express");
const forecastRouter = require("./forecast");
const { lstmForecast } = require("../services/lstmService");

// Mock the lstmForecast function
jest.mock("../services/lstmService", () => ({
  lstmForecast: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use("/forecast", forecastRouter);

describe.skip("POST /forecast/lstm", () => {
  it("should return 400 if data is not provided", async () => {
    const response = await request(app).post("/forecast/lstm").send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid data format. Provide an array of numbers.",
    });
  });

  it("should return 400 if data is not an array", async () => {
    const response = await request(app).post("/forecast/lstm").send({ data: "invalid" });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid data format. Provide an array of numbers.",
    });
  });

  it("should return 200 with the forecast if data is valid", async () => {
    const mockForecast = [10, 20, 30];
    lstmForecast.mockResolvedValue(mockForecast);

    const response = await request(app)
      .post("/forecast/lstm")
      .send({ data: [1, 2, 3] });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ forecast: mockForecast });
    expect(lstmForecast).toHaveBeenCalledWith([1, 2, 3]);
  });

  it("should return 500 if an error occurs in the service", async () => {
    lstmForecast.mockRejectedValue(new Error("Service error"));

    const response = await request(app)
      .post("/forecast/lstm")
      .send({ data: [1, 2, 3] });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to generate forecast" });
    expect(lstmForecast).toHaveBeenCalledWith([1, 2, 3]);
  });
});