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
const { checkAdminRole, checkUserRole } = require('../middleware/checkRoles');
const Message = require('../models/message'); // Import your message model




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
    password: req.body.password,
    role: 'user', // Set the default role to 'user'
  });

  try {
    const savedUser = await newUser.save();

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: savedUser._id }, secretKey, { expiresIn: '1h' });

    // Return the token in the response
    res.json({ message: 'User registered successfully', token });
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
      const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '24h' }); // Adjust the expiration time as needed
  
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


// Route to update user data
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


// Route to save a room ID in the user's collection
router.post('/saveroom', authenticateToken, async (req, res) => {
  const userId = req.userId; // userId is available from the middleware

  try {
    const { roomId } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Update or add the savedRoom array with the new roomId
    if (!user.savedRoom) {
      user.savedRoom = [roomId];
    } else {
      if (!user.savedRoom.includes(roomId)) {
        user.savedRoom.push(roomId);
      }
    }

    // Save the updated user document
    await user.save();

    res.json({ message: 'Room saved successfully.' });
  } catch (error) {
    console.error('Error saving room:', error);
    res.status(500).json({ error: 'There was an issue while saving the room.' });
  }
});

router.delete('/removeroom', authenticateToken, async (req, res) => {
  const userId = req.userId; // userId is available from the middleware

  try {
    const { roomId } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Remove the roomId from savedRoom array
    user.savedRoom = user.savedRoom.filter(savedRoomId => savedRoomId !== roomId);

    // Save the updated user document
    await user.save();

    res.json({ message: 'Room removed from favorites successfully.' });
  } catch (error) {
    console.error('Error removing room from favorites:', error);
    res.status(500).json({ error: 'There was an issue while removing the room.' });
  }
});



router.get('/:userId', authenticateToken, async (req, res) => {
  const userId = req.params.userId; // User ID from the request parameters

  try {
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json(user); // Send the user data
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'There was an issue while fetching user data.' });
  }
});

const nodemailer = require('nodemailer');

// Generate OTP
function generateOTP() {
  // Generate a random 6-digit OTP (you can change the length as needed)
  return Math.floor(100000 + Math.random() * 900000);
}

// Send OTP via email
// Send OTP via email
router.post('/sendOTP', async (req, res) => {
  const { email } = req.body;

  try {
    // Generate OTP
    const otp = generateOTP();

    // Send OTP via email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'skytechdataservices@gmail.com',
        pass: 'vpnl zrwu kktt nhbr'
      }
    });

    const mailOptions = {
      from: 'aakashbansode30@gmail.com',
      to: email,
      subject: 'Your OTP Verification Code',
      text: `Your OTP code is: ${otp}`,
    };

    // Save the OTP in the user's collection
    const user = await User.findOneAndUpdate(
      { email: email },
      { otp: otp },
      { new: true } // To get the updated user object
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP via email:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});


// Verify OTP
router.post('/verifyOTP', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the user by their email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    console.log('Received Email:', email);
    console.log('Received OTP:', otp);
    console.log('Stored OTP:', user.otp);

    // Compare the received OTP with the one stored in the user's collection
    if (otp === user.otp.toString()) {
      await user.save();

      res.json({ success: true, message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP' });
  }
});



// Create a new message

router.post('/messages', async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);
    
    // Emit the new message to all connected clients
    io.emit('message', newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create message' });
  }
});


// Get all messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find({});
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch messages' });
  }
});




module.exports = router;










