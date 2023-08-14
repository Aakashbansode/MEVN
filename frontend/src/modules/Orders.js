import { ref } from 'vue';
import { useRouter } from 'vue-router'



const Order = () => {
  const error = ref('');
  const successMessage = ref('');
  const orders = ref([]);
  const user = ref({});
  const room = ref({});

  const router = useRouter()
  
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

// Inside your component script setup
const sendOTP = async (order) => {
  try {
    const otpValue = Math.floor(100000 + Math.random() * 900000);

    // Send the OTP to the server
    const response = await fetch("http://localhost:3000/rooms/update-otp", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      },
      body: JSON.stringify({ otp: otpValue })
    });

    if (response.ok) {
      // Find the index of the order with the matching room_id
      const index = orders.value.findIndex((o) => o.room_details._id === order.room_details._id);
      if (index !== -1) {
        // Remove the order from the orders array
        orders.value.splice(index, 1);
      }

      // Redirect to /cancel_order with the room ID as a parameter
      router.push({ name: 'cancel_order', params: { orderId: order._id } });




    } else {
      console.error('Failed to send OTP:', response.statusText);
      window.alert('Failed to send OTP. Please try again later.');
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    window.alert('An error occurred while sending OTP. Please try again later.');
  }
};

  

const getOrderDetails = async (orderId) => {
  try {
    const jwtToken = localStorage.getItem('jwtToken');
    const response = await fetch(`http://localhost:3000/rooms/cancel_order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data.order; // Adjust the property path as needed
    } else {
      throw new Error(data.error || 'Failed to fetch order details');
    }
  } catch (error) {
    throw new Error('An error occurred while fetching order details');
  }
};




  return {
    getuserorders,
    error,
    successMessage,
    orders,
    user,
    room,
    sendOTP,
    getOrderDetails,
  };
};

export default Order;
