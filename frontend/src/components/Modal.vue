<template>
    <transition name="fade">
      <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50">
        <div class="bg-white p-4 rounded-lg w-96">
          <h2 class="text-lg font-semibold">{{ room.name }}</h2>
          <p>{{ room.description }}</p>
          <button @click="closeModal" class="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg">Close</button>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref, onUnmounted } from 'vue';
  
  const show = ref(false);
  const room = ref({});
  
  const openModal = (data) => {
    room.value = data;
    show.value = true;
  };
  
  const closeModal = () => {
    show.value = false;
  };
  </script>
  