import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Create a mock adapter instance
const mock = new MockAdapter(axios, { delayResponse: 500 });

// Mock the historical data API
mock.onGet("/today/data").reply(200, {
  coord: { lat: 47.4979, lon: 19.0402 },
  main: {
    temp_max: 303.15,
    temp_min: 293.15,
    humidity: 60,
  },
  name: "Budapest",
  state: "Budapest",
  sys: { country: "HU" },
});

// Mock today's weather data API
mock.onGet("/today/data").reply(200, {
  dt: 1696000000,
  main: {
    temp: 298.15,
    feels_like: 300.15,
    humidity: 65,
    pressure: 1012,
  },
  weather: [{ main: "Clear", description: "clear sky" }],
  wind: { speed: 3.6 },
  name: "Budapest",
  sys: { country: "HU" },
});

// Mock the save location API
mock.onPost("/user/saveLocation/").reply(200, {
  message: "Location saved successfully",
});

// Export the mock for use in tests or development
export default mock;