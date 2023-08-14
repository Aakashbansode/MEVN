// backend/models/myorder.js
const mongoose = require('mongoose');
const Order = require('./orders');

const getRoomById = async (roomId) => {
  try {
    const room = await Order.findById(roomId); // Use roomId directly without converting to ObjectId
    return room;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching the room details');
  }
};


// const getordersByRoomId = async (roomId) => {
//   try {
//     // Convert the roomId to a valid ObjectId
//     const objectIdRoomId = mongoose.Types.ObjectId(roomId);

//     // Fetch orders specific to the given roomId
//     const orders = await Order.find({ roomId: objectIdRoomId });
//     return orders;
//   } catch (error) {
//     console.error(error);
//     throw new Error('An error occurred while fetching the order details');
//   }
// };

const getordersByRoomId = async (roomId) => {
  try {
    const orders = await Order.find({ 'room_details.roomId': roomId });
    return orders;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching the order details');
  }
};


const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password');
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching the user details');
  }
};


const getOrderDetailsByOrderId = async (orderId) => {
  try {
    const orderDetails = await Order.findById(orderId);
    
    // Manually populate user and room details
    const user = await getUserById(orderDetails.user_details.userId);
    const room = await getRoomById(orderDetails.room_details.roomId);
    
    orderDetails.user_details.userId = user;
    orderDetails.room_details.roomId = room;
    
    return orderDetails;
  } catch (error) {
    console.error('Error fetching order details by order ID:', error);
    throw new Error('An error occurred while fetching order details');
  }
};



module.exports = {

  getRoomById,
  getordersByRoomId,
  getOrderDetailsByOrderId,
};
