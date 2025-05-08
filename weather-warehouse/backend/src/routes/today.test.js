const request = require("supertest");
const express = require("express");
const axios = require("axios");
const todayRouter = require("./today");

jest.mock("axios");

const app = express();
app.use(express.json());
app.use("/today", todayRouter);

describe("GET /today/location", () => {
  it("returns 400 if location query is missing", async () => {
    const response = await request(app).get("/today/location");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Query  location is required." });
  });

  it("returns location data from OpenWeatherMap API", async () => {
    const mockLocationData = [
      { name: "Budapest", country: "HU", lat: 47.4979, lon: 19.0402 },
    ];
    axios.get.mockResolvedValueOnce({ data: mockLocationData });

    const response = await request(app)
      .get("/today/location")
      .query({ location: "Budapest" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockLocationData);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(
        "https://api.openweathermap.org/geo/1.0/direct?q=Budapest"
      )
    );
  });

  it("handles API errors gracefully", async () => {
    axios.get.mockRejectedValueOnce({
      response: { status: 500 },
      message: "Internal Server Error",
    });

    const response = await request(app)
      .get("/today/location")
      .query({ location: "Budapest" });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal Server Error" });
  });
});

describe("GET /today/locationData", () => {
  it("returns 400 if locationName query is missing", async () => {
    const response = await request(app).get("/today/locationData");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Location name is required" });
  });

  it("returns weather data for a valid city", async () => {
    const mockWeatherData = { weather: [{ description: "clear sky" }] };
    axios.get.mockResolvedValueOnce({ data: mockWeatherData });

    const response = await request(app)
      .get("/today/locationData")
      .query({ locationName: "Budapest" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockWeatherData);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(
        "https://api.openweathermap.org/data/2.5/weather?q=Budapest"
      )
    );
  });

  it("returns 404 if city is not found", async () => {
    axios.get.mockRejectedValueOnce({
      response: { status: 404 },
    });

    const response = await request(app)
      .get("/today/locationData")
      .query({ locationName: "InvalidCity" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "City not found" });
  });

  it("returns 500 if city is not found", async () => {
    axios.get.mockRejectedValueOnce({
      response: { status: 500 },
    });

    const response = await request(app)
      .get("/today/locationData")
      .query({ locationName: "InvalidCity" });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Something went wrong" });
  });
});

describe("GET /today/reverse-geocode", () => {
  it("returns city name and country for valid coordinates", async () => {
    const mockReverseGeocodeData = [{ name: "Budapest", country: "HU" }];
    axios.get.mockResolvedValueOnce({ data: mockReverseGeocodeData });

    const response = await request(app)
      .get("/today/reverse-geocode")
      .query({ lat: 47.4979, lon: 19.0402 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ name: "Budapest", country: "HU" });
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(
        "https://api.openweathermap.org/geo/1.0/reverse?lat=47.4979&lon=19.0402"
      )
    );
  });

  it("handles errors gracefully", async () => {
    axios.get.mockRejectedValueOnce({
      response: { status: 500 },
      message: "Internal Server Error",
    });

    const response = await request(app)
      .get("/today/reverse-geocode")
      .query({ lat: 47.4979, lon: 19.0402 });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Something went wrong" });
  });
});