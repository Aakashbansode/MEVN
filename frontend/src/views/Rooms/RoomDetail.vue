<template>
  <div>
    <Navbar></Navbar>
    <!-- component -->
    <div v-if="room.isBooked"
      class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
      role="alert">
      <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
        fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      
      <span class="sr-only">Info</span>
      <div>
        <span class="font-medium">Room Already Booked! </span> Please book another room.
      </div>
    </div>
    <div class="lg:w-4/5 mx-auto flex flex-wrap justify-center">
      <div class="w-full lg:w-1/3">
        <label for="startdate" class="block text-sm font-medium text-gray-900">Start Date</label>
        <div class="flex items-center bg-white rounded-md shadow-sm">
          <VueDatePicker id="startdate" v-model="startdate"
            class="w-full px-4 py-2 rounded-md focus:ring-red-500 focus:border-red-500" />
        </div>
      </div>
      <div class="w-full lg:w-1/3">
        <label for="enddate" class="block text-sm font-medium text-gray-900">End Date</label>
        <div class="flex items-center bg-white rounded-md shadow-sm">
          <VueDatePicker id="enddate" v-model="enddate"
            class="w-full px-4 py-2 rounded-md focus:ring-red-500 focus:border-red-500" />
        </div>
      </div>
    </div>
    <div class="lg:w-4/5 mx-auto flex flex-wrap mb-8">
      <div class="lg:w-4/5 mx-auto flex flex-wrap mb-8">
        <img v-if="room.images && room.images.picture_url" alt="ecommerce"
          class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
          :src="room.images.picture_url" />
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 relative">
          <div class="lg:w-1/2 w-full lg:pl-20 lg:py-6 mt-6 lg:mt-0 relative">
  <div class="flex items-center">
    <div class="mr-2">
      <button @click="saveRoom(room._id)"
        :class="{
          'bg-pink-500': isRoomSavedInFavorites, // Change to green for saved rooms
          'bg-white p-2 rounded-lg shadow-md hover:bg-gray-300 hover:border-black-400 transition duration-300': !isRoomSavedInFavorites,
          'hover:bg-gray-300 hover:border-black-400 transition duration-300': !isRoomSavedInFavorites
        }">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            :class="{ 'hover:text-gray-200': !isRoomSavedInFavorites, 'text-gray-200': isRoomSavedInFavorites }"
            stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          <p class="ml-1 text-sm cursor-pointer"
            :class="{ 'hover:text-gray-200': !isRoomSavedInFavorites, 'text-gray-200': isRoomSavedInFavorites }">
            Save
          </p>
        </div>
      </button>
    </div>
    <div>
      <button onclick="shareRoom()"
        class="bg-white p-2 rounded-lg shadow-md hover:bg-gray-300 hover:border-black-400 transition duration-300">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-4 h-4 cursor-pointer hover:text-gray-200">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
          <p class="ml-1 text-sm cursor-pointer hover:text-gray-200">Share</p>
        </div>
      </button>
    </div>
  </div>
</div>

          <h2 class="leading-relaxed">{{ room.access }}</h2>
          <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{{ room.name }}</h1>
          <div class="flex mb-4">
            <span class="flex items-center">
              <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                </path>
              </svg>
              <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                </path>
              </svg>
              <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                </path>
              </svg>
              <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                </path>
              </svg>
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                </path>
              </svg>
              <span class="text-gray-600 ml-3">4 Reviews</span>
            </span>
            <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
              <a class="text-gray-500">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5"
                  viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a class="ml-2 text-gray-500">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5"
                  viewBox="0 0 24 24">
                  <path
                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z">
                  </path>
                </svg>
              </a>
              <a class="ml-2 text-gray-500">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5"
                  viewBox="0 0 24 24">
                  <path
                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z">
                  </path>
                </svg>
              </a>
            </span>
          </div>
          <p class="leading-relaxed">{{ room.description }}</p>
          <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
            <div class="flex">
              <span class="mr-3">Color</span>
              <button class="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
              <button class="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
              <button class="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
            </div>
            <div class="flex ml-10 items-center">
              <span class="mr-3">Bedroom</span>
              <span class="mr-3">{{ room.bedrooms }}</span>
            </div>
            <div class="flex ml-6 items-center">
              <span class="mr-3">Beds</span>
              <span class="mr-3">{{ room.beds }}</span>
            </div>
            <div class="flex ml-6 items-center">
              <span class="mr-3">Size</span>
              <div class="relative">
                <select
                  class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                  <option>SM</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </select>
                <span
                  class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    class="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div class="flex">
            <!-- Show the updated price when start and end dates are selected -->
            <span v-if="totalPrice" class="title-font font-medium text-2xl text-gray-900">
              Updated Price ${{ totalPrice }}
            </span>
            <!-- Show the original room price when no dates are selected -->
            <span v-else-if="room.price && room.price.$numberDecimal"
              class="title-font font-medium text-2xl text-gray-900">
              Per Night ${{ room.price.$numberDecimal }}
            </span>
            <button @click="bookRoom"
              class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Book
              Room</button>
            <button
              class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5"
                viewBox="0 0 24 24">
                <path
                  d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z">
                </path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <button @click="openYouTubeVideo" class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      Click here to watch room video
  </span>
</button>
    <div class="flex flex-wrap -mx-2">
      <div v-for="bed in room.beds" :key="bed"
        class="max-w-xs mx-2 p-2 mb-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <img
          srcset="https://img.icons8.com/?size=1x&amp;id=561&amp;format=png 1x, https://img.icons8.com/?size=2x&amp;id=561&amp;format=png 2x"
          src="https://img.icons8.com/?size=1x&amp;id=561&amp;format=png 1x" alt="Bed icon" class="w-10 h-10 rounded" />
        <div class="px-3 py-2">
          <p class="text-gray-700 text-sm">
            Beds: {{ bed }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { onMounted, ref, watch, computed } from 'vue';
import Airbnb from '@/modules/Airbnb';
import Navbar from '../../components/Navbar.vue';
import { useRoute, useRouter } from 'vue-router'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import Swal from 'sweetalert2';



const { getspecificroom, room, bookroom, getuserdata, fetchorders, saveRoom, userData } = Airbnb();
const router = useRouter();
const route = useRoute();
const roomId = ref(route.params.id);
const startdate = ref(null);
const enddate = ref(null);
const totalPrice = ref(null); // Define totalPrice as a reactive variable



const openYouTubeVideo = () => {
  // Define the YouTube video URL
  const videoUrl = 'https://www.youtube.com/watch?v=oPS-ayK43zI';

  // Open the video URL in a new window or tab
  window.open(videoUrl, '_blank');
};

// Watch for changes in the room ID
watch(roomId, async (newRoomId) => {
  await getspecificroom(newRoomId);
});

// onMounted(async () => {
//   console.log('The component is now mounted.');
//   await getspecificroom(roomId.value);
// });


const isLoggedIn = ref(false);

onMounted(() => {
  // Check if the JWT token is present in the local storage
  isLoggedIn.value = checkIfUserIsLoggedIn();
});
// Function to check if the user is logged in based on the presence of the JWT token in local storage
const checkIfUserIsLoggedIn = () => {
  const jwtToken = localStorage.getItem('jwtToken');
  return !!jwtToken; // Returns true if the JWT token is present, otherwise false
};

const bookRoom = async () => {

  // Check if the user is logged in
  if (!isLoggedIn.value) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Please log in to book a room.',
    });
    return;
  }
  // Check if start date and end date are selected
  if (!startdate.value || !enddate.value) {
    // SweetAlert to display the error message
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Please select both start date and end date before booking.',
    });
    return;
  }

  // Check if the selected dates are available
  try {
    const overlappingOrders = await fetchorders(room.value._id, startdate.value, enddate.value);
    console.log(overlappingOrders);
    if (overlappingOrders.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'The selected dates are not available. Please select different dates.',
      });
      return;
    }

    // If the selected dates are available, proceed with the booking

    await bookroom(room.value._id, startdate.value, enddate.value);

    // Optionally, you can show a success message or navigate to a confirmation page
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Room booked successfully!',
    });
    router.push('/myorders');
  } catch (error) {
    // Handle any errors that occur during the booking process
    Swal.fire({
      icon: 'error',
      title: 'Error booking room',
      text: error.message, // Use the error.message to display the specific error returned from the server, if available
    });
    console.error('Error booking room:', error);
  }
};


watch([startdate, enddate], (newValues, oldValues) => {
  const [newStartDate, newEndDate] = newValues;
  const [oldStartDate, oldEndDate] = oldValues;

  // Check if the start date has changed
  if (newStartDate !== oldStartDate) {
    const currentDate = new Date();
    const selectedStartDate = new Date(newStartDate);
    const selectedEndDate = new Date(newEndDate);

    // Check if the selected start date is in the past
    if (selectedStartDate < currentDate) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'You cannot book dates for the past.',
      });
      startdate.value = null;
      return;
    }

    // Check if the selected end date is before the selected start date
    if (selectedEndDate <= selectedStartDate) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'End date should be greater than the start date.',
      });
      enddate.value = null;
      return;
    }

    // Check if the booking duration is at least 1 day
    const oneDayInMillis = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
    const bookingDuration = selectedEndDate - selectedStartDate;
    if (bookingDuration < oneDayInMillis) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Minimum 1-day booking is allowed.',
      });
      enddate.value = null;
      return;
    }

    console.log('Start Date Selected:', newStartDate);
  }

  // Check if the end date has changed
  if (newEndDate !== oldEndDate) {
    const selectedStartDate = new Date(newStartDate);
    const selectedEndDate = new Date(newEndDate);

    // Check if the selected end date is before the selected start date
    if (selectedEndDate <= selectedStartDate) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'End date should be greater than the start date.',
      });
      enddate.value = null;
      return;
    }

    // Check if the booking duration is at least 1 day
    const oneDayInMillis = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
    const bookingDuration = selectedEndDate - selectedStartDate;
    if (bookingDuration < oneDayInMillis) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Minimum 1-day booking is allowed.',
      });
      enddate.value = null;
      return;
    }

    console.log('End Date Selected:', newEndDate);
  }

  // Calculate the number of days between selected start date and end date
  const selectedStartDate = new Date(newStartDate);
  const selectedEndDate = new Date(newEndDate);
  const timeDifference = selectedEndDate.getTime() - selectedStartDate.getTime();
  const numberOfDays = timeDifference / (1000 * 3600 * 24);

  // Assuming that 'room.price.$numberDecimal' contains the price for one night (24hrs)
  const pricePerNight = parseFloat(room.value.price?.$numberDecimal);
  // const totalPrice = (pricePerNight * numberOfDays).toFixed(2);
  totalPrice.value = (pricePerNight * numberOfDays).toFixed(2);


  console.log(`Number of days: ${numberOfDays}`);
  console.log(`Total Price: $${totalPrice}`);
});


onMounted(async () => {
  console.log('The component is now mounted.');

  // Fetch the specific room data
  await getspecificroom(roomId.value);
  await getuserdata();
});


const isRoomSavedInFavorites = computed(() => {
  if (userData.value && userData.value.savedRoom.includes(roomId.value)) {
    return true;
  }
  return false;
});

</script> 