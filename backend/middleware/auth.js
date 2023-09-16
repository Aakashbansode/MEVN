// backend/middleware/auth.js

const jwt = require('jsonwebtoken');
const { secretKey } = require('../config.js'); // Correct the path to config.js


const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }

    // Log the decoded token contents for debugging
   // console.log('Decoded Token:', decoded);

    // Set user ID and user object on the request
    req.userId = decoded.userId;
    req.user = decoded; // This line sets the entire user object, adjust as needed

    console.log('req.user:', req.user); // Log req.user for debugging

    next();
  });
};



module.exports = authenticateToken;

