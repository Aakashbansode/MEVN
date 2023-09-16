const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const Order = require('../models/orders');
const { getUserById } = require('../models/users');
const { getRoomById } = require('../models/airbnb');
const { getordersByRoomId } = require('../models/myorder');
const {  User } = require('../models/users');
const { getOrderDetailsByOrderId } = require('../models/myorder');
const { applyFiltersToData } = require('../models/airbnb');

router.get('/myorders', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Invalid user information in token.' });
    }

    const userOrders = await Order.find({ 'user_details.userId': userId });

    // Fetch user and room details for each order
    const ordersWithDetails = await Promise.all(
      userOrders.map(async (order) => {
        const user = await getUserById(order.user_details.userId);
        const room = await getRoomById(order.room_details.roomId);

        return {
          ...order.toObject(),
          user_details: user,
          room_details: room,
        };
      })
    );

    res.status(200).json({ orders: ordersWithDetails, userId: userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching user orders' });
  }
});

router.get('/orders/:roomId', async (req, res) => { // Use :roomId instead of :id
  try {
    const roomId = req.params.roomId; // Use req.params.roomId to get the roomId

    // Fetch all orders for the specified roomId from the database
    const orders = await getordersByRoomId(roomId);

    // Extract the startDate and endDate fields from each order
    const ordersWithDates = orders.map((order) => {
      return {
        startDate: order.startDate,
        endDate: order.endDate,
      };
    });

    res.status(200).json({ orders: ordersWithDates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching orders' });
  }
});




router.get('/cancel_order/:orderId', authenticateToken, async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Fetch order details by order ID from the database
    const orderDetails = await getOrderDetailsByOrderId(orderId);

    if (!orderDetails) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ order: orderDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching order details' });
  }
});


router.post('/filter', async (req, res) => {
  try {
    const filters = req.body; // Get the filter payload from the request

    // Apply filters to the data
    const filteredData = await applyFiltersToData(filters);

    if (!filteredData) {
      return res.status(404).json({ error: 'No data matching the filters' });
    }

    res.status(200).json({ airbnb: filteredData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while filtering the data' });
  }
});





module.exports = router;
