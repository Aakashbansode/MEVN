const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const Order = require('../models/orders');
const { getUserById } = require('../models/users');
const { getRoomById } = require('../models/airbnb');
const { getorders } = require('../models/myorder');

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

router.get('/orders', async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await getorders();

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


module.exports = router;
