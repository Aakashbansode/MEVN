const { ListingsAndReviews } = require('./airbnb.js');

const testFetchListingsAndReviews = async () => {
  try {
    const data = await ListingsAndReviews.find().toArray();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

testFetchListingsAndReviews();
