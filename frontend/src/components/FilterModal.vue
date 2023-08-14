<template>
    <div class="flex items-center">
    <transition name="fade">
      <div v-if="showFilterModal" class="fixed inset-0 flex items-center justify-center z-50">
        <div class="bg-gray-200 p-4 rounded-lg w-96">
          <h2 class="text-lg font-semibold">Filters</h2>
          <div class="mt-4">
            <h3 class="font-medium">Price range</h3>
            <p>The average nightly price is ₹11,502</p>
            <div class="flex items-center mt-2">
              <div class="flex items-center w-16">
                <span class="font-medium">min price</span>
                <span class="ml-1 text-gray-600">₹</span>
                <input type="number" class="w-16 border-gray-300 rounded-sm ml-1" v-model="minPrice" />
              </div>
              <span class="mx-1 text-gray-600">–</span>
              <div class="flex items-center w-16">
                <span class="font-medium">max price</span>
                <span class="ml-1 text-gray-600">₹</span>
                <input type="number" class="w-10 border-gray-300 rounded-sm ml-1" v-model="maxPrice" />
                <span class="ml-1 text-gray-600">+</span>
              </div>
            </div>
          </div>
       Add other filters here
          <div class="mt-4">
            <button @click="handleCloseButtonClick" class="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg">Close</button>
          </div>
        </div>
      </div>
    </transition>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  
  const { showFilterModal } = defineProps(['showFilterModal']);
  const emits = defineEmits();
  
  const handleCloseButtonClick = () => {
    console.log("Closing modal from child component");
    emits('closefilterModal');
  };
  
  const minPrice = ref(820);
  const maxPrice = ref(3600);
  </script>
  
  
  
  
  
  