// backend/models/myorder.js
const mongoose = require('mongoose');
const Order = require('./orders');

const getRoomById = async (roomId) => {
  try {
    // Convert the roomId to a valid ObjectId
    const objectIdRoomId = mongoose.Types.ObjectId(roomId);

    const room = await Order.findById(objectIdRoomId);
    return room;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching the room details');
  }
};

const getorders = async () => {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching the order details');
  }
};

module.exports = {

  getRoomById,
  getorders,
};
