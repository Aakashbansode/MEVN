// backend/models/listingsAndReviews.js
const mongoose = require('mongoose');

const listingsAndReviewsSchema = new mongoose.Schema({
  // Define your schema here based on the fields in the collection
  // For example:
  name: String,
  summary: String,
  // Add more fields as needed...
});

const ListingsAndReviews = mongoose.connection.collection('listingsAndReviews');

module.exports = ListingsAndReviews;
