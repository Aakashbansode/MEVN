// // backend/middleware/auth.js

const jwt = require('jsonwebtoken');
const { secretKey } = require('../config.js'); // Correct the path to config.js

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is sent as "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }

    req.userId = decoded.userId; // Set the userId on the request object
    next();
  });
};

module.exports = authenticateToken;

