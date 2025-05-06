const request = require("supertest");
const express = require("express");
const axios = require("axios");
const todayRouter = require("./today");

// Mock the axios module
jest.mock("axios");

const app = express();
app.use(express.json());
app.use("/today", todayRouter);

describe("GET /today/location", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clears all mock calls and instances
  });

  it("should return 400 if location query is missing", async () => {
    const response = await request(app).get("/today/location");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Query  location is required." });
  });

  it("should return location data if location query is provided", async () => {
    const mockResponse = [{ name: "Budapest", country: "HU" }];
    axios.get.mockResolvedValueOnce({ data: mockResponse });

    const response = await request(app).get("/today/location").query({ location: "Budapest" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);

    // Simplify the expectation
    expect(axios.get).toHaveBeenCalledWith(
      "https://api.openweathermap.org/geo/1.0/direct?q=Budapest&limit=5&appid=462394b96065d405cd9ca7b3ef92d634"
    );
  });

  it("should return 500 if the external API call fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("API error"));
  
    const response = await request(app).get("/today/location").query({ location: "Budapest" });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "API error" });
  });
});

describe("GET /today/locationData", () => {
  it("should return 400 if locationName query is missing", async () => {
    const response = await request(app).get("/today/locationData");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Location name is required" });
  });

  it("should return weather data if locationName query is provided", async () => {
    const mockResponse = { weather: "Sunny", temperature: 25 };
    axios.get.mockResolvedValueOnce({ data: mockResponse });

    const response = await request(app).get("/today/locationData").query({ locationName: "Budapest" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);

    // Match the full URL
    expect(axios.get).toHaveBeenCalledWith(
      "https://api.openweathermap.org/data/2.5/weather?q=Budapest&appid=462394b96065d405cd9ca7b3ef92d634&lang=en"
    );
  });

  it("should return 500 if the external API call fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("API error"));
  
    const response = await request(app).get("/today/locationData").query({ locationName: "Budapest" });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Something went wrong" });
  });
});

describe("GET /today/reverse-geocode", () => {
  it("should return 500 if lat or lon query is missing", async () => {
    const response = await request(app).get("/today/reverse-geocode");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Something went wrong" });
  });

  it("should return location data if lat and lon query are provided", async () => {
    const mockResponse = [{ name: "Budapest", country: "HU" }];
    axios.get.mockResolvedValueOnce({ data: mockResponse });

    const response = await request(app).get("/today/reverse-geocode").query({ lat: 47.4979, lon: 19.0402 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ name: "Budapest", country: "HU" });

    // Match the full URL
    expect(axios.get).toHaveBeenCalledWith(
      "https://api.openweathermap.org/geo/1.0/reverse?lat=47.4979&lon=19.0402&appid=462394b96065d405cd9ca7b3ef92d634"
    );
  });

  it("should return 500 if the external API call fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("API error"));
  
    const response = await request(app).get("/today/reverse-geocode").query({ lat: 47.4979, lon: 19.0402 });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Something went wrong" });
  });

  it("should return 500 if lat or lon query is invalid", async () => {
    // Mock axios to simulate no API call being made due to validation failure
    axios.get.mockRejectedValueOnce(new Error("Something went wrong"));
  
    const response = await request(app).get("/today/reverse-geocode").query({ lat: "invalid", lon: "invalid" });
  
    // Expect the route to handle invalid input and return a 400 status
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Something went wrong" });
  });
});