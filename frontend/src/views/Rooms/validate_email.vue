<template>
    <div>
      <Navbar />
      <main>
        <!-- Display Error Messages -->
        <div v-if="error" class="bg-red-500 text-white p-4 text-lg mb-4 text-center">{{ error }}</div>
        <div v-if="successMessage" class="bg-green-500 text-white p-4 text-lg mb-4 text-center">{{ successMessage }}</div>
  
        <!-- OTP Sending and Verification Form -->
        <div class="bg-grey-lighter min-h-screen flex flex-col mb-10">
          <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 bg-slate-300 border border-gray-700">
            <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full bg-slate-200 border-spacing-2">
              <h1 class="mb-8 text-3xl text-center">Edit Profile</h1>
  
              <!-- Step 1: Enter Email to Receive OTP -->
              <div v-if="!otpSent && !otpVerified">
                <h2 class="text-2xl mb-4 text-center">Step 1: Your Registered email id</h2>
                <form @submit.prevent="sendOTP">
                  <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email:</label>
                    {{ userData && userData.email ? userData.email : 'Loading...' }}
                  </div>
                  <div class="text-center">
                    <button type="submit" class="w-full py-3 rounded bg-blue-500 hover:bg-blue-700 text-white focus:outline-none">Send OTP</button>
                  </div>
                </form>
              </div>
  
              <!-- Step 2: Enter OTP to Verify -->
              <div v-if="otpSent && !otpVerified">
                <h2 class="text-2xl mb-4 text-center">Step 2: Enter OTP to Verify</h2>
                <form @submit.prevent="verifyOTP">
                  <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="otp">OTP:</label>
                    <input v-model="otp" type="text" id="otp" name="otp" class="block border border-gray-300 w-full p-3 rounded" />
                  </div>
                  <div class="text-center">
                    <button type="submit" class="w-full py-3 rounded bg-blue-500 hover:bg-blue-700 text-white focus:outline-none">Verify OTP</button>
                  </div>
                </form>
              </div>
  
              <!-- Step 3: Show Verification Result -->
              <div v-if="otpVerified">
                <h2 class="text-2xl mb-4 text-center">Step 3: OTP Verified Successfully!</h2>
                <p>You can now proceed with profile editing.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  

  
  <script setup>
  import { ref, watchEffect } from 'vue';
  import Navbar from '../../components/Navbar.vue';
  import axios from 'axios';
  import { useStore } from 'vuex';
  
  const email = ref('');
  const otp = ref('');
  const otpSent = ref(false);
  const otpVerified = ref(false);
  const error = ref(null);
  const successMessage = ref(null);
  const store = useStore();
  
  // Initialize userData ref with the current value from the store
  const userData = ref(store.state.userData);
  
  // Watch for changes in userData from the store
  watchEffect(() => {
    // Update the value of userData when it changes in the store
    userData.value = store.state.userData;
  });
  
  const sendOTP = async () => {
  try {
    // Check if userData is available and has an email
    if (!userData.value || !userData.value.email) {
      console.error('User data is not available.');
      return;
    }

    // Create the request body
    const requestBody = { email: userData.value.email };

    // Make an API request to your backend to send OTP to the user's email
    const response = await fetch('http://localhost:3000/users/sendOTP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify JSON content type
      },
      body: JSON.stringify(requestBody), // Convert the body to JSON
    });

    // Check if the OTP was sent successfully (you should handle this based on your API response)
    const responseData = await response.json(); // Parse the response JSON

    if (responseData.success) {
      otpSent.value = true;
    } else {
      alert("Failed to send OTP. Please try again.");
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    alert("Failed to send OTP. Please try again.");
  }
};


  // Simulate verifying OTP (You should replace this with a real API call)
  const verifyOTP = async () => {
    
    try {
    const requestBody = {
      email: userData.value.email, // Send the user's email
      otp: otp.value, // Send the OTP
    };

    // Make an API request to your backend to verify OTP
    const response = await fetch('http://localhost:3000/users/verifyOTP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify JSON content type
      },
      body: JSON.stringify(requestBody), // Convert the body to JSON
    });

    const responseData = await response.json(); // Parse the response JSON

    // Check if OTP verification was successful based on the responseData
    if (responseData.success) {
      otpVerified.value = true;
    } else {
      alert("OTP verification failed. Please try again.");
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    alert("OTP verification failed. Please try again.");
  }
};


  </script>
  
  

  