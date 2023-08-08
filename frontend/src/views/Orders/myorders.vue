<template>
    <div>
      <Navbar></Navbar>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-wrap justify-center">
          <div v-for="order in orders" :key="order._id" class="max-w-sm m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img class="img-small rounded-t-lg" :src="order.room_details.images.picture_url" alt="" />
            </a>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ order.room_details.name }}</h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Check In Date: {{ new Date(order.startDate).toLocaleString("en-US", options) }}</p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Check Out Date: {{ new Date(order.endDate).toLocaleString("en-US", options) }}</p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">No Of days: {{ getNumberOfDays(order.startDate, order.endDate) }}</p>
              <v-btn class="text-black bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" @click="cancelBookingConfirmation(order)">
               Cancel Booking
              </v-btn>
            </div>
          </div>
        </div>
      </section>
      <div v-if="error" class="p-4 mt-4 bg-red-200 text-red-800 rounded-lg">
      {{ error }} You will redirected to login page in {{ countdown }} seconds
    </div>
    </div>
  </template>
  
  

  <script setup>
  import Order from '../../modules/Orders'
  import { onMounted, ref,computed } from 'vue'
  import { useRouter } from 'vue-router'
  import Navbar from '../../components/Navbar.vue'
  
  const { getuserorders, error, successMessage, user, room, orders } = Order()
  
  const router = useRouter()
  const countdown = ref(5) // Initial countdown value
  
  onMounted(() => {
    getuserorders()
  
    // Redirect to "/login" page after 5 seconds if there is an error
    if (error.value) {
      const timer = setInterval(() => {
        countdown.value -= 1
        console.log(`You will be redirected to login page in ${countdown.value} seconds`)
      }, 1000) // 1000 milliseconds = 1 second
  
      setTimeout(() => {
        clearInterval(timer)
        router.push('/login')
      }, 5000) // 5000 milliseconds = 5 seconds
    }
  })

  // Define the options for formatting the date
const options = {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};


const getNumberOfDays = (startDate, endDate) => {
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  }
  return 0;
};



const cancelBookingConfirmation = (order) => {
  const confirmation = window.confirm(`Are you sure you want to cancel the booking for ${order.room_details.name}?
Booking Details:
Check In Date: ${new Date(order.startDate).toLocaleString("en-US", options)}
Check Out Date: ${new Date(order.endDate).toLocaleString("en-US", options)}
No Of days: ${getNumberOfDays(order.startDate, order.endDate)}
`);

  if (confirmation) {
    sendOTP(order);
  }
};

const sendOTP = (order) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  window.alert(`An OTP has been sent to your registered email address.
Please enter the following OTP to confirm cancellation:
OTP: ${otp}`);
};


  </script>
  