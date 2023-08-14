const mongoose = require('mongoose');
//const { ListingsAndReviews } = ('./listingsandreviews');

// Get a reference to the existing collection without defining a schema
const ListingsAndReviews = mongoose.connection.collection('listingsAndReviews');


const fetchListingsAndReviews = async () => {
  try {
    const projection = {
      name: 1,
      _id: 1,
    };
    
    const data = await ListingsAndReviews.find({}, projection).limit(200).toArray();
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


const applyFiltersToData = async (filters) => {
  const {
    country,
    amenities,
    bedrooms,
    propertyTypes,
    roomNames,
    reviewRange,
    priceRange,
  } = filters;

  const query = {};

  if (country) {
    query.country = country;
  }

  if (amenities && amenities.length > 0) {
    query.amenities = { $in: amenities };
  }

  if (bedrooms && bedrooms.length > 0) {
    query.bedrooms = { $in: bedrooms };
  }

  if (propertyTypes && propertyTypes.length > 0) {
    query.propertyType = { $in: propertyTypes };
  }

  // Similar logic for other filters
  console.log('Query:', query);
  try {
    const filteredData = await ListingsAndReviews.find(query).limit(200).toArray();
    console.log('Filtered Data:', filteredData); // Log the filtered data
    return filteredData;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while applying filters');
  }

};  


module.exports = {
  fetchListingsAndReviews,
  ListingsAndReviews,
  getRoomById,
  applyFiltersToData,
  
};
