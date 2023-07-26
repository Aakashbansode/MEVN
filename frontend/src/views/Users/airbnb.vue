<template>
  <div>
    <Navbar></Navbar>
    <div class="relative overflow-x-auto">
      <div class="mx-auto container">
        <div class="flex justify-center mx-auto container">
          <div class="grid grid-cols-12 gap-9 mb-6">
            <!-- Your images -->
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-10 mt-16">
          <div
            v-for="item in airbnb.listingsAndReviews"
            :key="item._id"
            tabindex="0"
            class="flex flex-col justify-between sm:rounded-lg bg-blue-200 dark:bg-gray-800"
          >
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
                  <button @click="openShowMoreModal(item)"
                          class="text-blue-600 font-medium underline">
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
import { ref, onMounted, reactive } from 'vue';
import Airbnb from '../../modules/Airbnb';
import Navbar from '../../components/Navbar.vue';
import Modal from '../../components/Modal.vue';


const { GetAll_airbnbdata, airbnb, getspecificroom, room } = Airbnb();

const showFullDescriptionFlag = reactive({}); // Create a reactive object

const getShortenedDescription = (description) => {
  if (description.length > 50) {
    return description.slice(0, 50) + '...';
  } else {
    return description;
  }
};



onMounted(() => {
  GetAll_airbnbdata();
});


const showModal = ref(false);


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

</script>

