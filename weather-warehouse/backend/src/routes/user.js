require('dotenv').config({ path: __dirname + '/../authentication/jwtToken.env' });
const express = require("express");
const router = express.Router();
const sql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10; // number of salt rounds for hashing

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // validate input
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: "Password requirements: At least 8 characters, one uppercase letter, one lowercase letter, and one digit."
      });
    }

    const pool = await sql.connect();

    // Check if the username already exists
    const checkResult = await pool.request()
      .input('username', sql.VarChar, username)
      .query('SELECT * FROM Users WHERE username = @username');

    if (checkResult.recordset.length > 0) {
      return res.status(400).json({ error: "Username already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Insert the user into the database
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, hashedPassword) // Store hashed password
      .query('INSERT INTO Users (username, password) VALUES (@username, @password); SELECT SCOPE_IDENTITY() AS id;');

    res.status(201).json({ message: "User registered successfully", id: result.recordset[0].id });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: error.message || "Registration failed" });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    const pool = await sql.connect();

    // fetch user by username
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query('SELECT * FROM Users WHERE username = @username');

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const user = result.recordset[0];

    // Compare the hashed password with the provided password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Determine role based on username
    const role = user.username.toLowerCase() === "admin" ? "admin" : "user";

    // Create JWT payload and sign token
    const payload = { userId: user.userId, username: user.username, role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Logged in successfully", token, role });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message || "Login failed" });
  }
});

router.get('/data', async (req, res) => {
  try {
    const pool = await sql.connect();
    // Query to fetch all users with their status (active or pending)
    const result = await pool.request().query(`
      SELECT 
        userId, 
        username, 
        CASE WHEN isActive = 1 THEN 'active' ELSE 'pending' END AS status 
      FROM Users
    `);
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.post('/accept', async (req, res) => {
  try {
    const { id } = req.body;
    const pool = await sql.connect();

    // Update the user's isActive status to 1
    await pool.request()
      .input('id', sql.Int, id)
      .query('UPDATE Users SET isActive = 1 WHERE userId = @id');
    res.status(200).json({ message: "User accepted successfully" });
  } catch (error) {
    console.error("Error accepting user:", error);
    res.status(500).json({ error: "Failed to accept user" });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const pool = await sql.connect();

    // Check if the user is an admin
    const userCheck = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT username FROM Users WHERE userId = @id');

    if (userCheck.recordset.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userCheck.recordset[0];
    if (user.username.toLowerCase() === "admin") {
      return res.status(403).json({ error: "Cannot delete admin user" });
    }

    // Delete the user from the database
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Users WHERE userId = @id');

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// New route: saveLocation
router.post('/saveLocation', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
  
  // Try to get userId from token payload; if missing, look it up from the Users table
  let userID = payload.userId;
  if (!userID) {
    try {
      const pool = await sql.connect();
      const result = await pool.request()
        .input('username', sql.VarChar, payload.username)
        .query('SELECT userId FROM Users WHERE username = @username');
      if (result.recordset.length > 0) {
        userID = result.recordset[0].userId;
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to determine user ID" });
    }
  }
  
  if (!userID) {
    return res.status(400).json({ error: "User ID could not be determined." });
  }
  
  const { latitude, longitude } = req.body;
  if (latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: "Missing coordinates" });
  }
  try {
    let pool = await sql.connect();
    await pool.request()
      .input('userID', sql.Int, userID)
      .input('latitude', sql.Decimal(10, 8), latitude)
      .input('longitude', sql.Decimal(11, 8), longitude)
      .query('INSERT INTO userLocations (userID, latitude, longitude) VALUES (@userID, @latitude, @longitude)');
    res.status(200).json({ message: "Location saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save location" });
  }
});

module.exports = router;