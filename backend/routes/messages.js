// messages.js
const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const authenticateToken = require('../middleware/auth');

module.exports = (io) => { // Accept io as a parameter here
  // ... your existing code ...

  // Create a new message
  router.post('/send_message', authenticateToken, async (req, res) => {
    try {
      const { text, receiver } = req.body;
  
      // Log the extracted user ID for debugging
      console.log('Sender ID:', req.user.userId);
  
      // Create a new message document with the sender's ID
      const newMessage = new Message({
        text,
        sender: req.user.userId, // Use req.user.userId
        receiver,
      });
  
      await newMessage.save();
  
      // Emit the new message to all connected clients using Socket.io
      io.emit('message', newMessage); // Use io here
  
      res.status(201).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ success: false, error: 'Unable to send message' });
    }
  });
  
  

  router.get('/my_messages', authenticateToken, async (req, res) => {
    try {
      // Extract the user ID from the authenticated request
      const userId = req.userId; // Use req.userId
      // Log the user ID
      console.log('User ID:', userId);
  
      // Query messages in your database where the user's ID matches the receiver ID
      const userMessages = await Message.find({ receiver: userId });
  
      res.status(200).json({ success: true, messages: userMessages });
    } catch (error) {
      console.error('Error fetching user messages:', error);
      res.status(500).json({ success: false, error: 'Unable to fetch user messages' });
    }
  });
  

  return router;
};
