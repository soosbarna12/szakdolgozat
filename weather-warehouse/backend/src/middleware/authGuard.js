const jwt = require("jsonwebtoken");

function authGuard(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1]; // Extract JWT token from header

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.payload = payload; // Attach the decoded payload to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authGuard;