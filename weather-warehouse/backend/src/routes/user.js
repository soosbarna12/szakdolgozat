const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }
    
    // validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: "Password requirements: At least 8 characters, one uppercase letter, one lowercase letter, and one digit."
      });
    }
    
    const pool = await sql.connect();
    
    // check if the username already exists
    const checkResult = await pool.request()
      .input('username', sql.VarChar, username)
      .query('SELECT * FROM Users WHERE username = @username');
    
    if (checkResult.recordset.length > 0) {
      return res.status(400).json({ error: "Username already exists." });
    }
    
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, password)
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
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query('SELECT * FROM Users WHERE username = @username');
    
    if (result.recordset.length === 0) {
      return res.status(401).json({ error: "Invalid username or password." });
    }
    
    const user = result.recordset[0];
    // In production, compare hashed passwords
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password." });
    }
    
    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message || "Login failed" });
  }
});

router.get('/data', (req, res) => {
  res.send('hello world user')
});

module.exports = router;