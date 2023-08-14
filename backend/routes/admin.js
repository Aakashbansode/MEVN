const authenticateToken = require('../middleware/auth');
const { getUserById } = require('../models/users');
const {  User } = require('../models/users');
const express = require('express');
const router = express.Router();
const { validateUser } = require('../models/users');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config.js'); // Replace this with your secret key for JWT

router.get('/getusers', authenticateToken, async (req, res) => {
    const userId = req.userId;
    console.log('Received User ID:', userId);
  
    try {
      const user = await User.findById(userId);
      console.log('Fetched User:', user);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      const userRole = user.role; // Access user role directly from the user object
      console.log('userRole:', userRole);
      if (userRole !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Only admin users can view all users data.' });
      }
  
      // Fetch all users' data
      const users = await User.find();
      //console.log('Fetched Users:', users);
  
      res.status(200).json({ users: users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching users data' });
    }
});

router.put('/user/update/:userId', authenticateToken, async (req, res) => {
  const userId = req.params.userId;

  // Ensure that only the admin user can update user data
  try {
    const adminUser = await User.findOne({ _id: req.userId, role: 'admin' });
    if (!adminUser) {
      return res.status(403).json({ error: 'Access denied. Only admin users can update user data.' });
    }

    const updatedProfile = req.body; // Assuming the profile fields are sent in the request body

    // Update the user's profile data in the database
    const user = await User.findByIdAndUpdate(userId, updatedProfile, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user: user });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
});

router.delete('/user/delete/:userId', authenticateToken, async (req, res) => {
  const userId = req.params.userId;

  // Ensure that only the admin user can delete user data
  try {
    const adminUser = await User.findOne({ _id: req.userId, role: 'admin' });
    if (!adminUser) {
      return res.status(403).json({ error: 'Access denied. Only admin users can delete user data.' });
    }

    // Delete the user from the database
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});



  module.exports = router