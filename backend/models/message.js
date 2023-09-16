const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the sender's user ID
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the receiver's user ID
  text: String, // The message content
  timestamp: { type: Date, default: Date.now }, // The timestamp of when the message was sent
});

module.exports = mongoose.model('Message', messageSchema);
