// jwtVerify.js
const jwt = require('jsonwebtoken');
const { secretKey } = require('your-config-file'); // Replace this with your secret key for JWT

function verifyToken(token) {
  try {
    const decodedToken = jwt.verify(token, secretKey);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying JWT token:', error);
    return null;
  }
}

export default verifyToken;
