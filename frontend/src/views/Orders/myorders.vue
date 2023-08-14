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
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Check In Date: {{ new Date(order.startDate).toLocaleString("en-US") }}</p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Check Out Date: {{ new Date(order.endDate).toLocaleString("en-US") }}</p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">No Of days: {{ getNumberOfDays(order.startDate, order.endDate) }}</p>
              <button class="text-black bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" @click="sendOTP(order)">
               Cancel Booking
              </button>
            </div>
          </div>
        </div>
      </section> 
    </div>
  </template>
  
  

  <script setup>
  import Order from '../../modules/Orders'
  import { onMounted, ref,computed } from 'vue'
 
  import Navbar from '../../components/Navbar.vue'
  
  const { getuserorders, error, successMessage, user, room, orders,sendOTP } = Order()
  
  

  
  onMounted(() => {
    getuserorders()
    
  })


const getNumberOfDays = (startDate, endDate) => {
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  }
  return 0;
};


  </script>
  