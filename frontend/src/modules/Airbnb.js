import { ref,computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';



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

  const getUniqueCountries = computed(() => {
    const countries = new Set();
    airbnb.value.listingsAndReviews.forEach(room => {
      countries.add(room.address.country);
    });
    return Array.from(countries);
  });

  const uniqueAmenities = computed(() => {
    const amenitiesSet = new Set();
  
    airbnb.value.listingsAndReviews.forEach(room => {
      room.amenities.forEach(amenity => {
        amenitiesSet.add(amenity);
      });
    });
  
    return Array.from(amenitiesSet);
  });

   // Compute unique room names based on the data
   const uniqueRoomNames = computed(() => {
    const roomNamesSet = new Set();
    
    airbnb.value.listingsAndReviews.forEach(room => {
      roomNamesSet.add(room.name);
    });

    return Array.from(roomNamesSet);
  });

  const uniquePropertyTypes = computed(() => {
    const propertyTypesSet = new Set();
  
    airbnb.value.listingsAndReviews.forEach(room => {
      propertyTypesSet.add(room.property_type);
    });
  
    return Array.from(propertyTypesSet);
  });

  // Define the removeRoomName function
  const removeRoomName = index => {
    selectedRoomNames.value.splice(index, 1);
  };
  
  const selectedAmenities = ref([]);
  const removeAmenity = index => {
    selectedAmenities.value.splice(index, 1);
  };
  
  const selecteduniquePropertyTypes = ref([]);
  const removeuniquePropertyTypes = index => {
    selecteduniquePropertyTypes.value.splice(index, 1);
  };

    // Define the removeBedroom function
    const removeBedroom = index => {
      selectedBedrooms.value.splice(index, 1);
    };

    // Create bedroom options array
    const bedroomOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];


  // Define the selectedBedrooms ref
  const selectedBedrooms = ref([]);
  const selectedCountry = ref('');
  // Define the selectedRoomNames ref
  const selectedRoomNames = ref([]);
  const clearAllRoomNames = () => {
    selectedRoomNames.value = [];
  };

  const resetAllFilters = () => {
    selectedRoomNames.value = [];
    selectedBedrooms.value = [];
    selecteduniquePropertyTypes.value = [];
    selectedAmenities.value = [];
    selectedCountry.value = ref('');
  };


  const room = ref([]);

  const getspecificroom = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/room/${roomId}`);
      if (response.ok) {
        const data = await response.json();
        room.value = data;
  
        // Remove the code for checking if the user has already booked this room
        // room.value.isBooked will not be set in this function anymore
  
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
  
  const saveRoom = async (roomId) => {
    try {
        const userId = getUserIdFromJWT();

        if (!userId) {
            throw new Error('User is not authenticated.');
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
            },
            body: JSON.stringify({
                userId: userId,
                roomId: roomId,
            }),
        };

        const response = await fetch('http://localhost:3000/users/saveroom', requestOptions);
        const data = await response.json();

        if (response.status === 200) {
            // Check if the room is already in the user's favorites
            const isAlreadySaved = userData.value.savedRoom.includes(roomId);
            if (isAlreadySaved) {
                Swal.fire({
                    icon: 'info',
                    title: 'Info',
                    text: 'You already have this room in your favorites.',
                });
            } else {
                // Show a success SweetAlert message
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Room has been added to favorites.',
                });
            }
            
            return data; // Successfully saved the room
        } else {
            throw new Error('There was an issue while saving the room.');
        }
    } catch (error) {
        console.error('Error saving room:', error);
        throw new Error('There was an issue while saving the room.');
    }
};


  
const userData = ref(null);// Define a reactive variable to hold user data
  const getuserdata = async () => {
    const userId = getUserIdFromJWT();
  
    if (userId) {
      // Fetch user-specific data including savedRoom using the JWT token
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      };
  
      try {
        const userDataResponse = await fetch(`http://localhost:3000/users/${userId}`, requestOptions);
        const userDataJson = await userDataResponse.json();
  
        if (userDataResponse.status === 200) {
          // Update reactive variable with user data
          userData.value = userDataJson;
        } else {
          console.error('Error fetching user data:', userDataResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };
  const priceRange = ref([0, 1000]); // Initial price range
  const reviewRange = ref([0, 10]); // Initial price range
    const applyFilters = async () => {
        console.log('applyFilters function called');
        // Prepare your payload with selected filter options
        const payload = {
          country: selectedCountry.value,
          amenities: selectedAmenities.value,
          bedrooms: selectedBedrooms.value,
          propertyTypes: selecteduniquePropertyTypes.value,
          roomNames: selectedRoomNames.value,
          reviewRange: reviewRange,
          priceRange: priceRange,
        };
    
        // Send the payload to the server and fetch data based on filters
        try {
          const response = await fetch('http://localhost:3000/rooms/filter', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
    
          if (response.ok) {
            const data = await response.json();
            // Handle the received data as needed
          } else {
            throw new Error('Failed to fetch data');
          }
        } catch (error) {
          console.error(error);
        }
    
        dialog.value = false; // Close the dialog after applying filters
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
    saveRoom,
    getuserdata,
    userData,
    getUniqueCountries,
    uniqueAmenities,
    selectedAmenities,
    removeAmenity,
    uniquePropertyTypes,
    removeuniquePropertyTypes,
    selecteduniquePropertyTypes,
    removeRoomName,
    selectedRoomNames,
    uniqueRoomNames,
    selectedBedrooms,
    removeBedroom,
    bedroomOptions,
    clearAllRoomNames,
    resetAllFilters,
    selectedCountry,
    applyFilters,
    priceRange,
    reviewRange


    
  };
};

export default Airbnb;
