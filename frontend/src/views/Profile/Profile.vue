<template>
    <div>
      <Navbar />
      <main>
        <div v-if="error" class="bg-red-500 text-white p-4 text-lg mb-4 text-center">{{ error }}</div>
        <div v-if="successMessage" class="bg-green-500 text-white p-4 text-lg mb-4 text-center">{{ successMessage }}</div>
  
        <div class="bg-grey-lighter min-h-screen flex flex-col mb-10">
          <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 bg-slate-300 border border-gray-700">
            <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full bg-slate-200 border-spacing-2">
              <h1 class="mb-8 text-3xl text-center">Edit Profile</h1>
              <form @submit.prevent="updateProfile">
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name:</label>
                  <input v-model="profile.name" type="text" id="name" name="name" class="block border border-gray-300 w-full p-3 rounded" />
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="age">Age:</label>
                  <select v-model="profile.age" id="age" name="age" class="block border border-gray-300 w-full p-3 rounded">
                    <option value="">Select Age</option>
                    <option v-for="age in ages" :value="age" :key="age">{{ age }}</option>
                  </select>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="address">Address:</label>
                  <textarea v-model="profile.address" id="address" name="address" rows="4" class="block border border-gray-300 w-full p-3 rounded"></textarea>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email:</label>
                  <input v-model="profile.email" type="text" id="email" name="email" class="block border border-gray-300 w-full p-3 rounded" />
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="qualification">Qualification:</label>
                  <input v-model="profile.qualification" type="text" id="qualification" name="qualification" class="block border border-gray-300 w-full p-3 rounded" />
                </div>           
                <div class="text-center">
                  <button type="submit" class="w-full py-3 rounded bg-blue-500 hover:bg-blue-700 text-white focus:outline-none">Update Profile</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
 <script setup>
 import Navbar from '../../components/Navbar.vue';
 import Export from '../../modules/Export';
 import { ref, reactive, onMounted } from 'vue';
 
 const ages = ref(Array.from({ length: 43 }, (_, i) => i + 18)); // Generate an array with ages from 18 to 60
 // Define the successMessage and errorMessage variables
const successMessage = ref("");
const errorMessage = ref("");
 // Create a reactive object to hold the user profile details
 const profile = reactive({
   name: "",
   age: "",
   address: "",
   email: "",
   qualification: "",
 });
 
 // Function to get the userId from JWT stored in localStorage or sessionStorage
 const getUserIdFromJWT = () => {
   // Implement the logic to retrieve the JWT from localStorage or sessionStorage
   const jwtToken = localStorage.getItem('jwtToken');
   // Parse the JWT to get user information
   const decodedToken = jwtToken ? JSON.parse(atob(jwtToken.split('.')[1])) : null;
   return decodedToken ? decodedToken.userId : null;
 };
 
 // Function to fetch the user profile from the server based on the userId
 const FetchProfile = async (userId) => {
   try {
     const requestOptions = {
       method: 'GET',
       headers: {
         'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`, // Include JWT token in the request headers for authentication
       },
     };
 
     const response = await fetch(`http://localhost:3000/users/${userId}`, requestOptions);
     const data = await response.json();
     return data;
   } catch (error) {
     console.error('Error fetching user data:', error);
     throw new Error('There was an issue while fetching user data.');
   }
 };
 
 // Fetch user data when the component is mounted
 onMounted(async () => {
   const userId = getUserIdFromJWT();
   if (userId) {
     try {
       const userData = await FetchProfile(userId);
       // Update the profile object with the fetched data
       profile.name = userData.name;
       profile.age = userData.age;
       profile.address = userData.address;
       profile.email = userData.email;
       profile.qualification = userData.qualification;
     } catch (error) {
       console.error('Error fetching user data:', error);
       // Handle the error, display a message, or redirect to an error page
     }
   }
 });


 const updateProfile = async () => {
  try {
    const userId = getUserIdFromJWT();
    if (!userId) {
      // Handle the case when the userId is not available
      console.error('User ID not found.');
      return;
    }

    // Prepare the payload with the updated profile data
    const payload = {
      name: profile.name,
      age: profile.age,
      address: profile.address,
      email: profile.email,
      qualification: profile.qualification,
    };

    // Send the updated profile data to the server
    const requestOptions = {
      method: 'PUT', // Use PUT or POST, depending on your server's API design for updating profiles
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`, // Include JWT token in the request headers for authentication
      },
      body: JSON.stringify(payload),
    };

    const response = await fetch(`http://localhost:3000/users/update/${userId}`, requestOptions);
    const data = await response.json();
    
    // Handle the response, e.g., show success message
    console.log('Profile updated successfully:', data);
    // Set a success message to display on the page
    successMessage.value = 'Profile updated successfully!';
    // You can clear the success message after a certain time using setTimeout if you want
    // setTimeout(() => (successMessage.value = ''), 5000);
  } catch (error) {
    console.error('Error updating user profile:', error);
    // Handle the error, e.g., show error message
    errorMessage.value = 'Failed to update profile. Please try again.';
  }
};

 </script>
 
  