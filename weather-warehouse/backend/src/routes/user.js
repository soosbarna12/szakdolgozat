require('dotenv').config({ path: __dirname + '/../authentication/jwtToken.env' });
const express = require("express");
const router = express.Router();
const sql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const validate = require('validate.js');
const authGuard = require("../middleware/authGuard");
const { userRegisterConstraints, userRecoveryConstraints, userLoginConstraints, userAcceptConstraints, userDeleteConstraints, userSaveLocationConstraints, userDeleteLocationConstraints } = require('../authentication/validationConstraints');


const SALT_ROUNDS = 10; // number of salt rounds for hashing

// user registration
router.post('/register', async (req, res) => {
  try {
    const { username, password, securityQuestion, securityAnswer } = req.body;

    const validationResult = validate(req.body, userRegisterConstraints)
    if (validationResult) {
      return res.status(400).json({ error: validationResult?? "All fields are required" });
    }

    const pool = await sql.connect();

    const checkResult = await pool.request()
      .input('username', sql.VarChar, username)
      .query('SELECT * FROM Users WHERE username = @username');

    if (checkResult.recordset.length > 0) {
      return res.status(400).json({ error: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const hashedAnswer = await bcrypt.hash(securityAnswer, SALT_ROUNDS);

    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, hashedPassword)
      .input('securityQuestion', sql.VarChar, securityQuestion)
      .input('securityAnswer', sql.VarChar, hashedAnswer)
      .query('INSERT INTO Users (username, password, securityQuestion, securityAnswer) VALUES (@username, @password, @securityQuestion, @securityAnswer); SELECT SCOPE_IDENTITY() AS id;');

    res.status(201).json({ message: "User registered successfully", id: result.recordset[0].id });

  } catch (error) {
    res.status(500).json({ error: error.message || "Registration failed" });
  }
});

// user password recovery
router.post('/recoverPassword', async (req, res) => {
  try {
    const { username, securityAnswer, newPassword } = req.body;

    const validationResult = validate(req.body, userRecoveryConstraints)
    if (validationResult) {
      return res.status(400).json({ error: validationResult?? "All fields are required" });
    }

    const pool = await sql.connect();

    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query('SELECT * FROM Users WHERE username = @username');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const user = result.recordset[0];

    const isAnswerValid = await bcrypt.compare(securityAnswer, user.securityAnswer);
    if (!isAnswerValid) {
      return res.status(401).json({ error: "Invalid security answer." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    await pool.request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, hashedPassword)
      .query('UPDATE Users SET password = @password WHERE username = @username');

    res.status(200).json({ message: "Password updated successfully." });

  } catch (error) {
    res.status(500).json({ error: error.message || "Password recovery failed" });
  }
});

// user login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const validationResult = validate(req.body, userLoginConstraints)
    if (validationResult) {
      return res.status(400).json({ error: validationResult?? "All fields are required" });
    }

    const pool = await sql.connect();

    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query('SELECT * FROM Users WHERE username = @username');

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const user = result.recordset[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const role = user.username.toLowerCase() === "admin" ? "admin" : "user";

    const payload = { userId: user.userID, username: user.username, role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.status(200).json({ message: "Logged in successfully", token, role });

  } catch (error) {
    res.status(500).json({ error: error.message || "Login failed" });
  }
});

// user data status
router.get('/userData', async (req, res) => {
  try {
    const pool = await sql.connect();
    const result = await pool.request().query(`
      SELECT 
        userId, 
        username, 
        isAdmin,
        CASE WHEN isActive = 1 THEN 'active' ELSE 'pending' END AS status 
      FROM Users
    `);
    res.json(result.recordset);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// user status accept
router.post('/accept', async (req, res) => {
  try {
    const { id } = req.body;

    const validationResult = validate(req.body, userAcceptConstraints)
    if (validationResult) {
      return res.status(400).json({ error: validationResult?? "ID required" });
    }

    const pool = await sql.connect();

    // Update the user's isActive status to 1
    await pool.request()
      .input('id', sql.Int, id)
      .query('UPDATE Users SET isActive = 1 WHERE userId = @id');
    res.status(200).json({ message: "User accepted successfully" });

  } catch (error) {
    res.status(500).json({ error: "Failed to accept user" });
  }
});

// reject user registration
router.delete('/delete', async (req, res) => {
  try {
    const { id } = req.query;

    const validationResult = validate(req.body, userDeleteConstraints)
    if (validationResult) {
      return res.status(400).json({ error: validationResult?? "ID required" });
    }

    const pool = await sql.connect();

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

    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Users WHERE userId = @id');

    res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// save location to the database
router.post('/saveLocation', authGuard, async (req, res) => {
  const { historicalPageData } = req.body;
  const payload = req.payload;

  const validationResult = validate(req.body, userSaveLocationConstraints)
  if (validationResult) {
    return res.status(400).json({ error: validationResult?? "All fields are required" });
  }

  const userID = payload.userId;

  if (!userID ||  historicalPageData.length === 0) {
    return res.status(400).json({ error: "User ID and location data could not be determined." });
  }

  try {
    const pool = await sql.connect();

    const locationData = JSON.stringify(historicalPageData);

      await pool.request()
      .input('userID', sql.Int, userID)
      .input('locationData', sql.NVarChar, locationData)
      .query(`
        INSERT INTO userLocations (userID, locationData) 
        VALUES (@userID, @locationData)
      `);

      res.status(200).json({ message: "Location saved successfully" });

  } catch (err) {
    res.status(500).json({ error: "Failed to save location" });
  }
});

// delete location to the database
router.delete('/deleteLocation', authGuard, async (req, res) => {
  const { userLocationID } = req.query;
  const payload = req.payload;

  const validationResult = validate(req.query, userDeleteLocationConstraints)
  if (validationResult) {
    return res.status(400).json({ error: validationResult?? "All fields are required" });
  }

  const userID = payload.userId;

  if (!userID || !userLocationID) {
    return res.status(400).json({ error: "User ID and location ID could not be determined." });
  }

  try {
    const pool = await sql.connect();
    await pool.request()
      .input('userID', sql.Int, userID)
      .input('userLocationID', sql.Int, userLocationID)
      .query(`
        DELETE FROM userLocations
        WHERE userID = @userID AND userLocationID = @userLocationID
      `);

    res.status(200).json({ message: "Location deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete location" });
  }
});

// fetch saved locations from the database
router.get('/fetchSavedLocations', authGuard, async (req, res) => {
  const payload = req.payload;
  const userID = payload.userId;

  try {
    const pool = await sql.connect();
    const result = await pool.request()
      .input('userID', sql.Int, userID)
      .query('SELECT userLocationID, locationData, dateSaved FROM userLocations WHERE userID = @userID');

      const savedLocations =  result.recordset.map(userLocation => {
        const parsedLocationData = JSON.parse(userLocation.locationData);
        return { locationData: parsedLocationData, dateSaved: userLocation.dateSaved, userLocationID: userLocation.userLocationID };
      }
      
    );

    res.status(200).json(savedLocations);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch saved locations" });
  }
});

module.exports = router;
