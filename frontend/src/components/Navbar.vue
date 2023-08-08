<template>  
    <nav class="bg-white border-gray-200 dark:bg-gray-900 mb-6">
  <div class="max-w-screen-xl flex items-center justify-between mx-auto p-2">
    <a href="https://flowbite.com/" class="flex items-center">
      <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 mr-2" alt="Flowbite Logo" />
      <span class="self-center text-base font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
    </a>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex p-2 md:p-0 mt-2 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-4 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li class="inline-block">
          <RouterLink to="/" class="text-sm px-2 py-1">Home</RouterLink>  
        </li>
        <li class="inline-block">
          <RouterLink to="/todos" class="text-sm px-2 py-1">Todos</RouterLink>
        </li>
        <li class="inline-block">
          <RouterLink to="/users" class="text-sm px-2 py-1">Users</RouterLink>
        </li>
        <li class="inline-block" v-if="!isLoggedIn">
          <RouterLink to="/Register" class="text-sm px-2 py-1">Register User</RouterLink>
        </li>
        <li class="inline-block" v-if="!isLoggedIn">
          <RouterLink to="/login" class="text-sm px-2 py-1">Login</RouterLink>
        </li>
        <li class="inline-block">
          <RouterLink to="/users_export" class="text-sm px-2 py-1">User Export</RouterLink>
        </li>
        <li class="inline-block">
          <RouterLink to="/airbnb" class="text-sm px-2 py-1">Air bnb</RouterLink>
        </li>
        <li class="inline-block" v-if="isLoggedIn">
          <RouterLink to="/myorders" class="text-sm px-2 py-1">My Orders</RouterLink>
        </li>
        <li class="inline-block" v-if="isLoggedIn">
          <RouterLink to="/myprofile" class="text-sm px-2 py-1">My Profile</RouterLink>
        </li>
      </ul>  
    </div>
  </div>
  <div class="relative">
  <button v-if="isLoggedIn" @click="handleSignOut" class="absolute top-0 right-0 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
    <span class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
      Signout
    </span>
  </button>
</div>
</nav>





</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRoute , useRouter } from 'vue-router'
import { ref, onMounted, reactive } from 'vue';

const router = useRouter();

// You might have a method to check if the user is logged in based on the presence of the JWT token in local storage
const isLoggedIn = ref(false);

onMounted(() => {
  // Check if the JWT token is present in the local storage
  isLoggedIn.value = checkIfUserIsLoggedIn();
});

// Method to handle the sign-out functionality
const handleSignOut = () => {
  // Remove the JWT token from the local storage
  removeJWTFromLocalStorage();

  // Update the "isLoggedIn" variable to hide the "Sign Out" button
  isLoggedIn.value = false;

  // Optionally, you might want to redirect the user to the login page after sign-out
   router.push('/login');
};

// Function to check if the user is logged in based on the presence of the JWT token in local storage
const checkIfUserIsLoggedIn = () => {
  const jwtToken = localStorage.getItem('jwtToken');
  return !!jwtToken; // Returns true if the JWT token is present, otherwise false
};

// Function to remove the JWT token from the local storage
const removeJWTFromLocalStorage = () => {
  localStorage.removeItem('jwtToken');
};



</script>