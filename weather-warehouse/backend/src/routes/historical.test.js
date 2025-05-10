const request = require("supertest");
const express = require("express");
const sql = require("mssql");
const validate = require("validate.js");
const historicalRouter = require("./historical");

// Mock the SQL module and validate.js
jest.mock("mssql");
jest.mock("validate.js");

const app = express();
app.use(express.json());
app.use("/historical", historicalRouter);

describe("POST /historical/historicalData", () => {
  it("should return 400 if validation fails", async () => {
    validate.mockReturnValueOnce({ error: "Validation failed" });

    const response = await request(app).post("/historical/historicalData").send({
      location: { name: "Budapest", country: "HU" },
      date: "2023-01-01",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: { error: "Validation failed" } });
  });

  it("should return 200 with historical data if input is valid", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    sql.connect.mockResolvedValueOnce({
      request: jest.fn().mockReturnValue({
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({
          recordset: [{ temperature: 25, humidity: 60 }],
        }),
      }),
    });

    const response = await request(app).post("/historical/historicalData").send({
      location: { name: "Budapest", country: "HU" },
      date: "2023-01-01",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ temperature: 25, humidity: 60 }]);
  });

  it("should return 500 if an error occurs", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    sql.connect.mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app).post("/historical/historicalData").send({
      location: { name: "Budapest", country: "HU" },
      date: "2023-01-01",
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to fetch historical data" });
  });
});

describe("GET /historical/historicalLocations", () => {
  it("should return 400 if validation fails", async () => {
    validate.mockReturnValueOnce({ error: "Validation failed" });

    const response = await request(app).get("/historical/historicalLocations").query({
      location: "Budapest",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: { error: "Validation failed" } });
  });

  it("should return 200 with location data if input is valid", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    sql.connect.mockResolvedValueOnce({
      request: jest.fn().mockReturnValue({
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({
          recordset: [{ name: "Budapest", country: "HU" }],
        }),
      }),
    });

    const response = await request(app).get("/historical/historicalLocations").query({
      location: "Budapest",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ name: "Budapest", country: "HU" }]);
  });

  it("should return 500 if an error occurs", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    sql.connect.mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app).get("/historical/historicalLocations").query({
      location: "Budapest",
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to fetch historical locations" });
  });
});

describe("GET /historical/historicalDates", () => {
  it("should return 400 if validation fails", async () => {
    validate.mockReturnValueOnce({ error: "Validation failed" });

    const response = await request(app).get("/historical/historicalDates").query({
      location: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toEqual({ error: "Validation failed" });
  });

  it("should return 200 with date data if input is valid", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    sql.connect.mockResolvedValueOnce({
      request: jest.fn().mockReturnValue({
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({
          recordset: [{ date: "2023-01-01" }],
        }),
      }),
    });

    const response = await request(app).get("/historical/historicalDates").query({
      location: "Budapest",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ date: "2023-01-01" }]);
  });

  it("should return 200 with an empty array if no dates are found", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    sql.connect.mockResolvedValueOnce({
      request: jest.fn().mockReturnValue({
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({ recordset: [] }), // Simulate no results
      }),
    });

    const response = await request(app).get("/historical/historicalDates").query({
      location: "NonExistentCity",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]); // Expect an empty array
  });

  it("should return 500 if an error occurs", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    sql.connect.mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app).get("/historical/historicalDates").query({
      location: "Budapest",
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to fetch historical dates" });
  });
});

describe('POST /pastHistoricalData', () => {
  it('should return past historical data for valid input', async () => {
    validate.mockReturnValue(undefined);
    sql.connect.mockResolvedValue({
      request: jest.fn().mockReturnValue({
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({
          recordset: [{ date: new Date("2020-01-01"), temperature: 20, maxTemperature: 10, minTemperature: 3, precipitation: 0, pressure: 1000 }],
        }),
      }),
    });

    const response = await request(app)
      .post('/historical/pastHistoricalData')
      .send({ location: { name: 'City', country: 'Country' } });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ date: "2020-01-01", temperature: 20, maxTemperature: 10, minTemperature: 3, precipitation: 0, pressure: 1000 }]);
  });

  it('should return past historical data for partial input', async () => {
    validate.mockReturnValue(undefined);
    sql.connect.mockResolvedValue({
      request: jest.fn().mockReturnValue({
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({
          recordset: [{ date: new Date("2020-01-01") }],
        }),
      }),
    });

    const response = await request(app)
      .post('/historical/pastHistoricalData')
      .send({ location: { name: 'City', country: 'Country' } });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ date: "2020-01-01", temperature: 0, maxTemperature: 0, minTemperature: 0, precipitation: 0, pressure: 0 }]);
  });

  it('should return 400 if validation fails', async () => {
    validate.mockReturnValue({ location: 'Location is required' });

    const response = await request(app)
      .post('/historical/pastHistoricalData')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: { location: 'Location is required' } });
  });

  it('should return 500 if an error occurs', async () => {
    validate.mockReturnValue(undefined);
    sql.connect.mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .post('/historical/pastHistoricalData')
      .send({ location: { name: 'City', country: 'Country' } });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to fetch same day history' });
  });
});