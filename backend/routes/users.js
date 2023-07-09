const express = require('express');
const router = express.Router();
const { validateUser } = require('../models/users');
const { checkEmailExists } = require('../models/users');
const {  User } = require('../models/users');
const { fetchUsers, exportUsers } = require('../models/export');
const { ListingsAndReviews } = require('../models/airbnb'); // Import the model
const { fetchListingsAndReviews } = require('../models/airbnb'); // Import the model
const { getRoomById } = require('../models/airbnb');






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
      res.json({ message: 'User is logged in successfully', user });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(400).json({ error: 'Invalid email or password' });
    }
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
  


module.exports = router