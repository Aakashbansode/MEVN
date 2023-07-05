const express = require('express');
const router = express.Router();
const { validateUser, User } = require('../models/users');
const { checkEmailExists } = require('../models/users');





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
  
  

module.exports = router