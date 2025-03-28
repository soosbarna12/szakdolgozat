const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key"; // Replace with the same key used in login

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Expecting "Bearer <token>"
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
}

module.exports = authenticateToken;