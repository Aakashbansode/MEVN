<template>
  <div>
    <Navbar></Navbar>
    <div class="relative overflow-x-auto">
      <div class="mx-auto container pr-12 pl-12">
        <div class="flex flex-wrap justify-center container max-h-36 overflow-x-auto">
          <v-row align="center" justify="center" class="mb-2">
            <v-btn @click="shiftImages('left')" class="mr-4">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-col v-for="(img, index) in visibleImages" :key="index" cols="auto">
              <v-img class="w-12 h-12" :src="img.url" :alt="img.name"></v-img>
              <p class="text-xs text-gray-600 dark:text-gray-200 mt-2">{{ img.name }}</p>
            </v-col>
            <v-btn @click="shiftImages('right')" class="ml-4">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
          <div class="flex flex-col items-center">
            <div class="bg-white p-2 rounded-lg">
              <div class="text-center">
                <v-row justify="center">
                  <v-dialog v-model="dialog" persistent width="1024"><template v-slot:activator="{ props }">
                      <v-btn color="primary" v-bind="props">
                        Open Filter
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h3">Filter Rooms</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-select :items="getUniqueCountries" label="Country" v-model="selectedCountry"></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <div>
                                <v-select v-model="selectedAmenities" :items="uniqueAmenities" label="Amenities" multiple
                                  chips>
                                  <template #selection="{ item, index }">
                                    {{ item }}
                                    <v-icon small @click="removeAmenity(index)">mdi-close</v-icon>
                                  </template>
                                </v-select>
                              </div>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <div>
                                <v-range-slider v-model="reviewRange" :min="1" :max="10" step="1" thumb-label
                                  label="Review Range" ticks></v-range-slider>
                              </div>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-range-slider v-model="priceRange" min="0" max="1000" step="10" snap-to-step thumb-label
                                label="Price Range"></v-range-slider>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-select v-model="selectedBedrooms" :items="bedroomOptions" label="Bedrooms" multiple
                                chips>
                                <template #selection="{ item, index }">
                                  {{ item }}
                                  <v-icon small @click="removeBedroom(index)">mdi-close</v-icon>
                                </template>
                              </v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-select v-model="selecteduniquePropertyTypes" :items="uniquePropertyTypes"
                                label="uniquePropertyTypes" multiple chips>
                                <template #selection="{ item, index }">
                                  {{ item }}
                                  <v-icon small @click="removeuniquePropertyTypes(index)">mdi-close</v-icon>
                                </template>
                              </v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <button class="text-sm p-1" @click="clearAllRoomNames">Clear All Selected Names</button>
                              <v-autocomplete v-model="selectedRoomNames" :items="uniqueRoomNames"
                                label="Search by Room Name" multiple chips>
                                <template #selection="{ item, index }">
                                  {{ item }}
                                  <v-icon small @click="removeRoomName(index)">mdi-close</v-icon>
                                </template>
                              </v-autocomplete>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-btn text small class="text-sm p-1 ml-2" @click="resetAllFilters">Reset All</v-btn>
                      </v-card-text>
                      <v-card-actions>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">Close</v-btn>
                          <v-btn color="blue-darken-1" variant="text" @click="applyFilters">Apply</v-btn>
                          <v-btn color="blue-darken-1" variant="text" @click="resetAllFilters">Reset All</v-btn>
                        </v-card-actions>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
              </div>
            </div>
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
import PrimaryButton from '../../components/PrimaryButton.vue';
import '@mdi/font/css/materialdesignicons.min.css';


const { priceRange, reviewRange, GetAll_airbnbdata, applyFilters, airbnb, getspecificroom, resetAllFilters, removeRoomName, clearAllRoomNames, selectedCountry, bedroomOptions, selectedBedrooms, removeBedroom, selectedRoomNames, uniqueRoomNames, room, getUniqueCountries, uniqueAmenities, removeAmenity, selectedAmenities, uniquePropertyTypes, selecteduniquePropertyTypes, removeuniquePropertyTypes } = Airbnb();


const showFullDescriptionFlag = reactive({}); // Create a reactive object
// const priceRange = ref([0, 1000]); // Initial price range
// const reviewRange = ref([0, 10]); // Initial price range

const getShortenedDescription = (description) => {
  if (description.length > 50) {
    return description.slice(0, 50) + '...';
  } else {
    return description;
  }
};



const showFilterModal = ref(false);

const onCloseFilterModal = () => {
  console.log("Received closefilterModal event. Closing modal...");
  showFilterModal.value = false;
};

const onFilterButtonClick = () => {
  console.log("Button clicked! Opening modal...");
  showFilterModal.value = true;
};

const showModal = ref(false);
const dialog = ref(false);


onMounted(() => {
  GetAll_airbnbdata();
});




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
    name: "1",
  },
  {
    url: "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
    name: "2",
  },
  {
    url: "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg",
    name: "3",
  },
  {
    url: "https://a0.muscache.com/pictures/35919456-df89-4024-ad50-5fcb7a472df9.jpg",
    name: "4",
  },
  {
    url: "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
    name: "5",
  },
  {
    url: "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
    name: "6",
  },
  {
    url: "https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg",
    name: "7",
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

