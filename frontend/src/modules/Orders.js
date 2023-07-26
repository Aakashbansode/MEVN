import { ref } from 'vue';

const Order = () => {
  const error = ref('');
  const successMessage = ref('');
  const orders = ref([]);
  const user = ref({});
  const room = ref({});

  const getuserorders = async () => {
    try {
      // Fetch the JWT token from local storage
      const jwtToken = localStorage.getItem('jwtToken');
  
      // Check if the token is available
      if (!jwtToken) {
        error.value = 'Please logIn to your Account to view your Orders';
        return;
      }
  
      // Log the JWT token to the console
      console.log('JWT Token:', jwtToken);
  
      // Proceed with the fetch request and other logic
      const response = await fetch("http://localhost:3000/rooms/myorders", {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        orders.value = data.orders;
        user.value = data.user;
        room.value = data.room;
      } else {
        error.value = data.error || 'Failed to fetch user orders';
      }
    } catch (error) {
      console.error(error);
      error.value = 'An error occurred while fetching user orders';
    }
  };

  
  
  
  



  return {
    getuserorders,
    error,
    successMessage,
    orders,
    user,
    room,
  };
};

export default Order;
