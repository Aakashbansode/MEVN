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
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ order.room_details.summary }}</p>
              <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
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
  import { onMounted, ref } from 'vue'
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
  </script>
  