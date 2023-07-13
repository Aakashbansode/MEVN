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
        <li class="inline-block">
          <RouterLink to="/Register" class="text-sm px-2 py-1">Register User</RouterLink>
        </li>
        <li class="inline-block">
          <RouterLink to="/login" class="text-sm px-2 py-1">Login</RouterLink>
        </li>
        <li class="inline-block">
          <RouterLink to="/users_export" class="text-sm px-2 py-1">User Export</RouterLink>
        </li>
        <li class="inline-block">
          <RouterLink to="/airbnb" class="text-sm px-2 py-1">Air bnb</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</nav>





</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'


</script>