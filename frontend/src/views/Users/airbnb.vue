<template>
  <div>
    <Navbar></Navbar>
    <div class="relative overflow-x-auto">
      <div class="mx-auto container">

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
                  <button v-if="isLongDescription(item.description)" @click="showFullDescription(item)">
                    Show More
                  </button>
                </p>
                <p v-if="showFullDescriptionFlag[item._id]" class="text-xs text-gray-600 dark:text-gray-200 mt-2">
                  {{ item.description }}
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

const { GetAll_airbnbdata, airbnb, toggleFullDescription, getspecificroom } = Airbnb();

const showFullDescriptionFlag = reactive({}); // Create a reactive object

const getShortenedDescription = (description) => {
  if (description.length > 50) {
    return description.slice(0, 50) + '...';
  } else {
    return description;
  }
};

const isLongDescription = (description) => {
  return description.length > 50;
};

const showFullDescription = (item) => {
  toggleFullDescription(item._id); // Use _id instead of id
};

onMounted(() => {
  GetAll_airbnbdata();
});
</script>

