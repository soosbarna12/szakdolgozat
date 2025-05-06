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

  it("should return 200 if user is deleted successfully", async () => {
    validate.mockReturnValueOnce(undefined); // No validation errors
    sql.connect.mockResolvedValueOnce({
      request: jest.fn().mockReturnValue({
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({ rowsAffected: [1] }), // Simulate successful deletion
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
});