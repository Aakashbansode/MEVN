// backend/models/jwtVerify.js


const jwt = require('jsonwebtoken');
const { secretKey } = require('../config.js'); // Correct the path to config.js

function verifyToken(token) {
  try {
    const decodedToken = jwt.verify(token, secretKey);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying JWT token:', error);
    return null;
  }
}

const user = {
  email: response.email, // Extracted from Google response
  name: response.name // Extracted from Google response
};

module.exports = verifyToken;

