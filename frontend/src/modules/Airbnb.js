import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const Airbnb = () => {
  const error = ref('');
  const successMessage = ref('');

  const airbnb = ref({
    name: '',
    listingsAndReviews: {}
  });

  const showFullDescriptionFlag = ref({});
  const bookedDates = ref([]);

  const toggleFullDescription = (itemId) => {
    showFullDescriptionFlag.value[itemId] = !showFullDescriptionFlag.value[itemId];
  };

  const GetAll_airbnbdata = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/airbnbdata");
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log the received data
        airbnb.value.listingsAndReviews = data;
      } else {
        throw new Error('Failed to fetch Airbnb data');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const room = ref([]);

  const getspecificroom = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/room/${roomId}`);
      if (response.ok) {
        const data = await response.json();
        room.value = data;
  
        // Check if the user has already booked this room
        const userId = getUserIdFromJWT();
        const userOrders = await getuserorders();
  
        if (userOrders && userOrders.length > 0) {
          const bookedOrder = userOrders.find((order) => order.user_details._id === userId && order.room_details._id === roomId);
          if (bookedOrder) {
            room.value.isBooked = true;
            bookedDates.value = [bookedOrder.startDate, bookedOrder.endDate];
          } else {
            room.value.isBooked = false;
            bookedDates.value = [];
          }
        } else {
          room.value.isBooked = false;
          bookedDates.value = [];
        }
  
        console.log('New room data:', room.value);
      } else {
        throw new Error('Failed to fetch room data');
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  // Function to get the userId from JWT stored in localStorage or sessionStorage
  const getUserIdFromJWT = () => {
    // Implement the logic to retrieve the JWT from localStorage or sessionStorage
    const jwtToken = localStorage.getItem('jwtToken');
    // Parse the JWT to get user information
    const decodedToken = jwtToken ? JSON.parse(atob(jwtToken.split('.')[1])) : null;
    return decodedToken ? decodedToken.userId : null;
  };

  const bookroom = async (roomId, startDate, endDate) => {
    try {
      const userId = getUserIdFromJWT();

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`, // Include JWT token in the request headers for authentication
        },
        body: JSON.stringify({
          roomId: roomId,
          userId: userId,
          startDate: startDate,
          endDate: endDate,
        }),
      };

      const response = await fetch('http://localhost:3000/users/create', requestOptions);
      const data = await response.json();
      return data; // The server should respond with the newly created order details
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('There was an issue while creating the order.');
    }
  };


  const getuserorders = async () => {
    try {
      // Fetch the JWT token from local storage
      const jwtToken = localStorage.getItem('jwtToken');

      // Check if the token is available
      if (!jwtToken) {
        throw new Error('Please log in to your account to view your orders');
      }

      // Proceed with the fetch request and other logic
      const response = await fetch("http://localhost:3000/rooms/myorders", {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data.orders;
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch user orders');
      }
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while fetching user orders');
    }
  };

  const fetchorders = async (roomId, startDate, endDate) => {
    try {
      const url = `http://localhost:3000/rooms/orders/${roomId}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
  
        // Filter orders that overlap with the selected startDate and endDate
        const overlappingOrders = data.orders.filter((order) => {
          const orderStartDate = new Date(order.startDate).getTime();
          const orderEndDate = new Date(order.endDate).getTime();
          const selectedStartDate = new Date(startDate).getTime();
          const selectedEndDate = new Date(endDate).getTime();
  
          // Check for overlapping conditions:
          // Case 1: Order start date is between selected start and end date
          // Case 2: Order end date is between selected start and end date
          // Case 3: Order start date is before the selected start date and end date is after the selected start date
          return (
            (orderStartDate >= selectedStartDate && orderStartDate <= selectedEndDate) ||
            (orderEndDate >= selectedStartDate && orderEndDate <= selectedEndDate) ||
            (orderStartDate <= selectedStartDate && orderEndDate >= selectedStartDate)
          );
        });
  
        return overlappingOrders;
      } else {
        throw new Error('Failed to fetch orders');
      }
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while fetching orders');
    }
  };
  
  

  // Add the CreateAccount function to the module exports
  return {
    GetAll_airbnbdata,
    airbnb,
    showFullDescriptionFlag,
    toggleFullDescription,
    getspecificroom,
    room,
    bookroom,
    getuserorders,
    fetchorders,
  };
};

export default Airbnb;
