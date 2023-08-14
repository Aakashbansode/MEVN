// models/orders.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order: { type: String, required: true },
  user_details: {
    userId: { type: String, required: true },
  },
  room_details: {
    roomId: { type: String, required: true },
  },
  timestamp: { type: Date, default: Date.now },
  startDate: { type: Date, required: true }, // New field for start date
  endDate: { type: Date, required: true },   // New field for end date
});



const Order = mongoose.model('Order', orderSchema);



module.exports = Order;
