<template>
  <div>
    <Navbar></Navbar>
    <div class="relative overflow-x-auto">
      <div class="mx-auto container pr-12 pl-12">
        <div class="flex justify-center mx-auto container max-h-28 overflow-x-auto">
          <div class="grid grid-cols-9 gap-9 mb-2">
            <div class="relative">
              <div
                class="bg-blue-200 rectangle-full p-2 cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" @click="shiftImages('left')" fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </div>
            </div>
            <div v-for="(img, index) in visibleImages" :key="index">
              <img class="w-12 h-12 object-contain" :src="img.url" :alt="img.name" />
              <p class="text-xs text-gray-600 dark:text-gray-200 mt-2">{{ img.name }}</p>
            </div>
            <div class="relative">
              <div
                class="bg-blue-200 rectangle-full p-2 cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" @click="shiftImages('right')" fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-center" @click="onFilterButtonClick">
            <div class="bg-white p-2 rounded-lg"> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
              </svg>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-200 mt-2">Filter</p>
            <button @click="onFilterButtonClick" class="px-2 py-2 text-white bg-green-600 rounded-lg">
              filter heresss
            </button>
            <!-- Include the FilterModal component -->
            <FilterModal v-if="showFilterModal" @closefilterModal="showFilterModal = false" />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-10 mt-16">
          <div v-for="item in airbnb.listingsAndReviews" :key="item._id" tabindex="0"
            class="flex flex-col justify-between sm:rounded-lg bg-blue-200 dark:bg-gray-800">
            <div class="focus:outline-none">
              <img :src="item.images.picture_url" class="w-full h-30 rounded" />
              <div class="p-4">
                <div class="flex items-center">
                  <h2 tabindex="0" class="focus:outline-none text-lg dark:text-white font-semibold">
                    {{ item.name }}
                  </h2>
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-200 mt-2">
                  {{ getShortenedDescription(item.description) }}
                  <button @click="openShowMoreModal(item)" class="text-blue-600 font-medium underline">
                    Show More
                  </button>
                </p>
                <transition name="fade">
                  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
                    <div class="bg-gray-200 p-4 rounded-lg w-96"> <!-- Add bg-gray-300 class here -->
                      <h2 class="text-lg font-semibold">{{ room.name }}</h2>
                      <p>{{ room.description }}</p>
                      <button @click="closeModal" class="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg">Close</button>
                    </div>
                  </div>
                </transition>
                <p v-if="showFullDescriptionFlag[item._id]" class="text-xs text-gray-600 dark:text-gray-200 mt-2">
                  {{ item.description[item._id] }}
                </p>
                <div class="flex flex-row items-start mt-2">
                  <label for="title" class="block text-sm font-medium text-blue-700">Bedrooms</label>
                  <p tabindex="0" class="block text-sm font-medium text-blue-700 ml-2">{{ item.bedrooms }}</p>
                </div>
                <div class="flex flex-row items-start mt-2">
                  <label for="title" class="block text-sm font-medium text-blue-700">Beds</label>
                  <p tabindex="0" class="block text-sm font-medium text-blue-700 ml-2">{{ item.beds }}</p>
                </div>
                <router-link :to="`/room/${item._id}`">
                  <button @click="getspecificroom(item._id)" class="px-2 py-2 text-white bg-green-600 rounded-lg">
                    View More
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import Airbnb from '../../modules/Airbnb';
import Navbar from '../../components/Navbar.vue';
import Modal from '../../components/Modal.vue';
import FilterModal from '../../components/FilterModal.vue';

const { GetAll_airbnbdata, airbnb, getspecificroom, room } = Airbnb();

const showFullDescriptionFlag = reactive({}); // Create a reactive object

const getShortenedDescription = (description) => {
  if (description.length > 50) {
    return description.slice(0, 50) + '...';
  } else {
    return description;
  }
};

const onFilterButtonClick = () => {
  console.log("Button clicked!");
  showFilterModal.value = !showFilterModal.value;
};


const showModal = ref(false);

onMounted(() => {
  GetAll_airbnbdata();
});


const showFilterModal = ref(false);// Use reactive instead of ref


const openShowMoreModal = (item) => {
  toggleFullDescription(item._id);
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const toggleFullDescription = (itemId) => {
  // Check if the item's _id is already in the reactive object
  if (showFullDescriptionFlag[itemId]) {
    // If yes, then toggle its value to show/hide the full description
    showFullDescriptionFlag[itemId] = !showFullDescriptionFlag[itemId];
  } else {
    // If not, then set its value to true and fetch the full description
    showFullDescriptionFlag[itemId] = true;
    getspecificroom(itemId); // Fetch the room data for the modal
  }
};



const activeIndex = ref(0); // Initialize active index to 0


// Array containing all image URLs
const imageUrls = [
  {
    url: "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
    name: "Treehouse",
  },
  {
    url: "https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg",
    name: "Lakefront",
  },
  {
    url: "https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg",
    name: "Tinyhomes",
  },
  {
    url: "https://a0.muscache.com/pictures/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg",
    name: "Lake",
  },
  {
    url: "https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg",
    name: "Farms",
  },
  {
    url: "https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg",
    name: "Beachfront",
  },
  {
    url: "https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg",
    name: "Cabins",
  },
  {
    url: "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
    name: "Treehouse",
  },
  {
    url: "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
    name: "Rooms",
  },
  {
    url: "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg",
    name: "CountrySide",
  },
  {
    url: "https://a0.muscache.com/pictures/35919456-df89-4024-ad50-5fcb7a472df9.jpg",
    name: "Historical Homes",
  },
  {
    url: "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
    name: "Castles",
  },
  {
    url: "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
    name: "Islands",
  },
  {
    url: "https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg",
    name: "Camping",
  },

  // Add the rest of the image URLs here...
];


// Computed property to get the visible images based on the activeIndex
const visibleImages = computed(() => {
  const startIndex = activeIndex.value;
  const endIndex = startIndex + 7;
  return imageUrls.slice(startIndex, endIndex);
});


// Function to shift images based on direction ('left' or 'right')
const shiftImages = (direction) => {
  const totalImages = imageUrls.length;
  const step = 7; // Number of images to show at a time

  if (direction === "left") {
    activeIndex.value = Math.max(activeIndex.value - step, 0);
  } else if (direction === "right") {
    activeIndex.value = Math.min(activeIndex.value + step, totalImages - 7);
  }
};

</script>

