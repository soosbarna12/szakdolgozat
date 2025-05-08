const request = require("supertest");
const express = require("express");
const sql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validate = require("validate.js");
const userRouter = require("./user");

// Mock dependencies
jest.mock("mssql");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("validate.js");

const app = express();
app.use(express.json());
app.use("/user", userRouter);
jest.mock("../middleware/authGuard", () => jest.fn((req, res, next) => {
  req.payload = { userId: 1 }; // Mock payload for authenticated user
  next();
}));

describe("POST /user/register", () => {
  it("should return 400 if validation fails", async () => {
    validate.mockReturnValueOnce({ error: "Validation failed" });

    const response = await request(app).post("/user/register").send({
      username: "testuser",
      password: "password123",
      securityQuestion: "What is your pet's name?",
      securityAnswer: "Fluffy",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: { error: "Validation failed" } });
  });

  it("should return 201 if registration is successful", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    bcrypt.hash.mockResolvedValueOnce("hashedPassword");
    bcrypt.hash.mockResolvedValueOnce("hashedAnswer");
    sql.connect.mockResolvedValueOnce({
      request: jest.fn().mockReturnValue({
        input: jest.fn().mockReturnThis(),
        query: jest.fn()
          .mockResolvedValueOnce({ recordset: [] }) // Simulate no existing user
          .mockResolvedValueOnce({ recordset: [{ id: 1 }] }), // Simulate successful insertion
      }),
    });

    const response = await request(app).post("/user/register").send({
      username: "testuser",
      password: "Password123",
      securityQuestion: "What is your pet's name?",
      securityAnswer: "Fluffy",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "User registered successfully",
      id: 1,
    });
  });

  it("should return 400 if user already exists", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    sql.connect.mockResolvedValueOnce({
      request: jest.fn().mockReturnValue({
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValueOnce({ recordset: [{ username: "testuser" }] }), // Simulate user exists
      }),
    });

    const response = await request(app).post("/user/register").send({
      username: "testuser",
      password: "Password123",
      securityQuestion: "What is your pet's name?",
      securityAnswer: "Fluffy",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Username already exists." });
  });

  it("returns 500 if there is a server error", async () => {
    sql.connect.mockRejectedValueOnce(new Error("Database connection failed"));

    const response = await request(app).post("/user/register").send({
      username: "newuser",
      password: "password123",
      securityQuestion: "What is your favorite color?",
      securityAnswer: "Blue",
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Database connection failed" });
  });
});

describe("POST /user/login", () => {
  it("should return 400 if validation fails", async () => {
    validate.mockReturnValueOnce({ error: "Validation failed" });

    const response = await request(app).post("/user/login").send({
      username: "testuser",
      password: "Password123",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: { error: "Validation failed" } });
  });

  it("should return 200 with a token if login is successful", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    bcrypt.compare.mockResolvedValueOnce(true); // Password matches
    jwt.sign.mockReturnValueOnce("mockToken");
    sql.connect.mockResolvedValueOnce({
      request: jest.fn().mockReturnValue({
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({
          recordset: [{ username: "testuser", password: "hashedPassword" }],
        }),
      }),
    });

    const response = await request(app).post("/user/login").send({
      username: "testuser",
      password: "Password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Logged in successfully",
      token: "mockToken",
      role: "user",
    });
  });

  it("should return 401 if invalid credentials are provided", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    bcrypt.compare.mockResolvedValueOnce(false); // Password does not match
    sql.connect.mockResolvedValueOnce({
      request: jest.fn().mockReturnValue({
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({
          recordset: [{ username: "testuser", password: "hashedPassword" }],
        }),
      }),
    });

    const response = await request(app).post("/user/login").send({
      username: "testuser",
      password: "WrongPassword",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "Invalid username or password." });
  });

  it("should return 401 if username is invalid", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    sql.connect.mockResolvedValueOnce({
      request: jest.fn().mockReturnValue({
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValueOnce({ recordset: [] }), // No user found
      }),
    });

    const response = await request(app).post("/user/login").send({
      username: "nonexistentuser",
      password: "Password123",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "Invalid username or password." });
  });

  it("should return 500 if a database error occurs", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    sql.connect.mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app).post("/user/login").send({
      username: "testuser",
      password: "Password123",
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Database error" });
  });
});

describe("POST /user/recoverPassword", () => {
  it("should return 400 if validation fails", async () => {
    validate.mockReturnValueOnce({ error: "Validation failed" });

    const response = await request(app).post("/user/recoverPassword").send({
      username: "testuser",
      securityAnswer: "Fluffy",
      newPassword: "NewPassword123",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: { error: "Validation failed" } });
  });

  it("should return 200 if password recovery is successful", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    bcrypt.compare.mockResolvedValueOnce(true); // Security answer matches
    bcrypt.hash.mockResolvedValueOnce("hashedNewPassword");
    sql.connect.mockResolvedValueOnce({
      request: jest.fn().mockReturnValue({
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({
          recordset: [{ securityAnswer: "hashedAnswer" }],
        }),
      }),
    });

    const response = await request(app).post("/user/recoverPassword").send({
      username: "testuser",
      securityAnswer: "Fluffy",
      newPassword: "NewPassword123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Password updated successfully.",
    });
  });

  it("should return 401 if security answer is invalid", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    bcrypt.compare.mockResolvedValueOnce(false); // Security answer does not match
    sql.connect.mockResolvedValueOnce({
      request: jest.fn().mockReturnValue({
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValueOnce({
          recordset: [{ securityAnswer: "hashedAnswer" }],
        }),
      }),
    });

    const response = await request(app).post("/user/recoverPassword").send({
      username: "testuser",
      securityAnswer: "WrongAnswer",
      newPassword: "NewPassword123",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "Invalid security answer." });
  });

  it("should return 400 if required fields are missing", async () => {
    validate.mockReturnValueOnce({ error: "Validation failed" });

    const response = await request(app).post("/user/recoverPassword").send({
      username: "testuser",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: { error: "Validation failed" } });
  });

  it("returns 404 if user is not found", async () => {
    const mockRequest = {
      input: jest.fn().mockReturnThis(),
      query: jest.fn().mockResolvedValueOnce({ recordset: [] }), // No user found
    };

    sql.connect.mockResolvedValueOnce({ request: () => mockRequest });

    const response = await request(app).post("/user/recoverPassword").send({
      username: "nonexistentuser",
      securityAnswer: "Blue",
      newPassword: "newpassword123",
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "User not found." });
  });

  it("returns 500 if there is a server error", async () => {
    sql.connect.mockRejectedValueOnce(new Error("Database connection failed"));

    const response = await request(app).post("/user/recoverPassword").send({
      username: "testuser",
      securityAnswer: "Blue",
      newPassword: "newpassword123",
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Database connection failed" });
  });
});

describe("POST /user/accept", () => {
  it("should return 400 if validation fails", async () => {
    validate.mockReturnValueOnce({ error: "Validation failed" });

    const response = await request(app).post("/user/accept").send({
      id: 1,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: { error: "Validation failed" } });
  });

  it("should return 200 if user is accepted successfully", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    sql.connect.mockResolvedValueOnce({
      request: jest.fn().mockReturnValue({
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({}),
      }),
    });

    const response = await request(app).post("/user/accept").send({
      id: 1,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "User accepted successfully",
    });
  });

  it("should return 400 if user ID is missing", async () => {
    validate.mockReturnValueOnce({ error: "Validation failed" });

    const response = await request(app).post("/user/accept").send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: { error: "Validation failed" } });
  });

  it("should return 500 if a database error occurs", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    sql.connect.mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app).post("/user/accept").send({
      id: 1,
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to accept user" });
  });
});

describe("DELETE /user/delete", () => {
  it("should return 400 if validation fails", async () => {
    validate.mockReturnValueOnce({ error: "Validation failed" });

    const response = await request(app).delete("/user/delete").query({
      id: 1,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: { error: "Validation failed" } });
  });

  it("should return 404 if user is not found", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    sql.connect.mockResolvedValueOnce({
      request: jest.fn().mockReturnValue({
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValueOnce({ recordset: [] }), // Simulate no user found
      }),
    });

    const response = await request(app).delete("/user/delete").query({
      id: 1,
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "User not found" });
  });

  it("should return 403 if trying to delete an admin user", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    sql.connect.mockResolvedValueOnce({
      request: jest.fn().mockReturnValue({
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValueOnce({ recordset: [{ username: "admin" }] }), // Simulate admin user
      }),
    });

    const response = await request(app).delete("/user/delete").query({
      id: 1,
    });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: "Cannot delete admin user" });
  });

  it("should return 200 if user is deleted successfully", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    sql.connect.mockResolvedValueOnce({
      request: jest.fn().mockReturnValue({
        input: jest.fn().mockReturnThis(),
        query: jest
          .fn()
          .mockResolvedValueOnce({ recordset: [{ username: "testuser" }] }) // Simulate user exists
          .mockResolvedValueOnce({ rowsAffected: [1] }), // Simulate successful deletion
      }),
    });

    const response = await request(app).delete("/user/delete").query({
      id: 1,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "User deleted successfully",
    });
  });

  it("should return 403 if trying to delete an admin user", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    sql.connect.mockResolvedValueOnce({
      request: jest.fn().mockReturnValue({
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValueOnce({ recordset: [{ username: "admin" }] }), // Admin user
      }),
    });

    const response = await request(app).delete("/user/delete").query({
      id: 1,
    });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: "Cannot delete admin user" });
  });
});

describe("POST /user/saveLocation", () => {
  it("should return 400 if validation fails", async () => {
    validate.mockReturnValueOnce({ error: "Validation failed" });

    const response = await request(app).post("/user/saveLocation").send({
      historicalPageData: [],
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: { error: "Validation failed" } });
  });

  it("should return 200 if location is saved successfully", async () => {
    validate.mockReturnValueOnce(undefined);
    sql.connect.mockResolvedValueOnce({
      request: jest.fn().mockReturnValue({
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValueOnce({}),
      }),
    });

    const response = await request(app).post("/user/saveLocation").send({
      historicalPageData: [{ location: "Budapest", date: "2023-01-01" }],
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Location saved successfully" });
  });

  it("should return 400 if location data is missing", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors

    const response = await request(app).post("/user/saveLocation").send({
      historicalPageData: [],
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "User ID and location data could not be determined.",
    });
  });

  it("should return 500 if a database error occurs", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    sql.connect.mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app).post("/user/saveLocation").send({
      historicalPageData: [{ location: "Budapest", date: "2023-01-01" }],
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to save location" });
  });
});

describe("DELETE /user/deleteLocation", () => {
  it("should return 400 if validation fails", async () => {
    validate.mockReturnValueOnce({ error: "Validation failed" });

    const response = await request(app).delete("/user/deleteLocation").query({
      userLocationID: "",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: { error: "Validation failed" } });
  });

  it("should return 200 if location is deleted successfully", async () => {
    validate.mockReturnValueOnce(undefined);
    sql.connect.mockResolvedValueOnce({
      request: jest.fn().mockReturnValue({
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValueOnce({}),
      }),
    });

    const response = await request(app).delete("/user/deleteLocation").query({
      userLocationID: 1,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Location deleted successfully" });
  });

  it("should return 400 if location ID is missing", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors

    const response = await request(app).delete("/user/deleteLocation").query({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "User ID and location ID could not be determined.",
    });
  });

  it("should return 500 if a database error occurs", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    sql.connect.mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app).delete("/user/deleteLocation").query({
      userLocationID: 1,
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to delete location" });
  });
});

describe("GET /user/fetchSavedLocations", () => {
  it("should return 200 with saved locations", async () => {
    sql.connect.mockResolvedValueOnce({
      request: jest.fn().mockReturnValue({
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValueOnce({
          recordset: [
            {
              userLocationID: 1,
              locationData: JSON.stringify([{ location: "Budapest", date: "2023-01-01" }]),
              dateSaved: "2023-01-02",
            },
          ],
        }),
      }),
    });

    const response = await request(app).get("/user/fetchSavedLocations");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        userLocationID: 1,
        locationData: [{ location: "Budapest", date: "2023-01-01" }],
        dateSaved: "2023-01-02",
      },
    ]);
  });

  it("should return 500 if an error occurs", async () => {
    sql.connect.mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app).get("/user/fetchSavedLocations");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to fetch saved locations" });
  });

  it("should return 500 if a database error occurs", async () => {
    sql.connect.mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app).get("/user/fetchSavedLocations");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to fetch saved locations" });
  });

  it("should return 500 if user ID is missing in the payload", async () => {
    jest.mock("../middleware/authGuard", () => jest.fn((req, res, next) => {
      req.payload = {}; // Missing userId
      next();
    }));

    const response = await request(app).get("/user/fetchSavedLocations");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Failed to fetch saved locations",
    });
  });
});

describe("GET /user/userData", () => {
  it("should return 200 with user data", async () => {
    sql.connect.mockResolvedValueOnce({
      request: jest.fn().mockReturnValue({
        query: jest.fn().mockResolvedValueOnce({
          recordset: [
            { userId: 1, username: "testuser", isAdmin: 0, status: "active" },
          ],
        }),
      }),
    });

    const response = await request(app).get("/user/userData");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { userId: 1, username: "testuser", isAdmin: 0, status: "active" },
    ]);
  });

  it("should return 500 if a database error occurs", async () => {
    sql.connect.mockRejectedValueOnce(new Error("Database error"));

    const response = await request(app).get("/user/userData");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to fetch users" });
  });
});