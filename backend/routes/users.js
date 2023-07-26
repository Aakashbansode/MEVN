const express = require('express');
const router = express.Router();
const { validateUser } = require('../models/users');
const { checkEmailExists } = require('../models/users');
const {  User } = require('../models/users');
const { fetchUsers, exportUsers } = require('../models/export');
const { ListingsAndReviews } = require('../models/airbnb'); // Import the model
const { fetchListingsAndReviews } = require('../models/airbnb'); // Import the model
const { getRoomById } = require('../models/airbnb');
const { getUserById } = require('../models/users');
const { updateUserById } = require('../models/users');
const { loginuser, createSession } = require('../models/users');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config.js'); // Replace this with your secret key for JWT
const authenticateToken = require('../middleware/auth');
const Order = require('../models/orders');




router.post('/registernewuser', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  
    const newUser = new User({
      name: req.body.name,
      age: req.body.age,
      address: req.body.address,
      email: req.body.email,
      qualification: req.body.qualification,
      mobile_no: req.body.mobile_no,
      password: req.body.password
    });
  
    try {
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user.' });
    }
  });


  router.post('/checkusers', async (req, res) => {
    const { email } = req.body;
  
    try {
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        return res.status(400).json({ error: 'This email is already registered' });
      }
  
      res.json({ message: 'Email is available' });
    } catch (error) {
      console.error('Error checking email:', error);
      res.status(500).json({ error: 'Failed to check email' });
    }
  });

 
  router.post('/loginuser', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await loginuser(email, password);
  
      // Generate a JWT token for the user
      const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' }); // Adjust the expiration time as needed
  
      // Omit sensitive information from the logged user object
      const userData = { ...user.toObject() };
      delete userData.email;
      delete userData.password;
  
      console.log('Valid User:', userData);
  
      res.cookie('sessionId', token, { httpOnly: true });
  
      // Return the token in the response along with other data
      res.json({ message: 'User is logged in successfully', user: userData, token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(401).json({ error: 'Invalid email or password' });
    }
  });
  
  
  
  
  
  
  router.get('/protected-route', authenticateToken, (req, res) => {
    // This route requires authentication, and the user ID is available in `req.userId`
    // You can use this ID to fetch and display the user's information, manage products, etc.
  
    res.json({ message: 'Session active for logged-in user', userId: req.userId });
  });
  
  
  
  router.post('/export', async (req, res) => {
    // Retrieve the filter criteria from the request body
    const { email, age } = req.body;
  
    // Construct the filter based on the provided criteria
    const filter = {};
    if (email) {
      filter.email = email;
    }
    if (age) {
      filter.age = age;
    }
  
    try {
      // Fetch users based on the filter
      const users = await fetchUsers(filter);
  
      // Set the response headers for file download
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');
  
      // Send the users data for export
      await exportUsers(res, users);
    } catch (error) {
      console.error('Error during export:', error);
      res.status(500).json({ error: 'Failed to export users' });
    }
  });
  

  router.get('/airbnbdata', async (req, res) => {
    try {
      const data = await fetchListingsAndReviews();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  

  router.get('/room/:id', async (req, res) => {
    try {
      const roomId = req.params.id;
      const room = await getRoomById(roomId);
      res.json(room);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  // Create a new order


  router.post('/create', async (req, res) => {
    const { roomId, userId,startDate,endDate } = req.body;
  
    try {
      // Create a new order document and save it to the MongoDB collection
      const newOrder = new Order({
        order: 'New order', // Add some order information here if needed
        user_details: {
          userId: userId,
        },
        room_details: {
          roomId: roomId,
        },
        startDate: startDate, // Save the start date
        endDate: endDate,
      });
      const savedOrder = await newOrder.save();
  
      res.status(201).json(savedOrder); // Return the newly created order details
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'There was an issue while creating the order.' });
    }
  });
  
  

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  console.log('Received User ID:', userId);

  try {
    const user = await getUserById(userId); // Call the getUserById function
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data.' });
  }
});

router.put('/update/:id', async (req, res) => {
  const userId = req.params.id;
  console.log('Received User ID for Update:', userId);

  try {
    const updatedUserData = req.body; // Get the updated user data from the request body
    const updatedUser = await updateUserById(userId, updatedUserData); // Call the updateUserById function
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'Failed to update user data.' });
  }
});


module.exports = router