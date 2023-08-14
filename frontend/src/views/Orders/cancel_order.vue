<template>
    <div>
    <Navbar></Navbar>
    <div>
      <h1>Cancel Order for ID: {{ orderId }}</h1>
      <!-- Fetch and display order and user details based on the orderId -->
    </div>
</div>
  </template>
  
 
  <script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import Order from '../../modules/Orders';
 
  import Navbar from '../../components/Navbar.vue'
  
  
const route = useRoute();
const orderId = route.params.orderId;
const { getOrderDetails } = Order();
const loading = ref(true);
const order = ref({});

  onMounted(async () => {
  try {
    const orderDetails = await getOrderDetails(orderId);
    order.value = orderDetails;
    loading.value = false;
  } catch (error) {
    console.error('Error fetching order details:', error);
    loading.value = false;
  }
});
  
 

  </script>