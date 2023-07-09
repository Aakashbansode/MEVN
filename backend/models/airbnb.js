const mongoose = require('mongoose');

// Get a reference to the existing collection without defining a schema
const ListingsAndReviews = mongoose.connection.collection('listingsAndReviews');

// Function to fetch data from the "listingsAndReviews" collection
const fetchListingsAndReviews = async () => {
  try {
    const projection = {
      name: 1,
      _id: 1,
    };
    
    const data = await ListingsAndReviews.find({}, projection).limit(20).toArray();
    //console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching data');
  }
};

const getRoomById = async (roomId) => {
  try {
    const room = await ListingsAndReviews.findOne({ _id: roomId });
    return room;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching the room');
  }
};

module.exports = {
  fetchListingsAndReviews,
  ListingsAndReviews,
  getRoomById
};
