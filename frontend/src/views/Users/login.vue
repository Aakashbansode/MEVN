<template>
    <div>
    <Navbar></Navbar>
    
    <section class="bg-gray-50 dark:bg-gray-900">
    
        <div class="carousel-container">
      <v-carousel :show-arrows="false">
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.url"
          cover
        ></v-carousel-item>
    </v-carousel> 
  
   <!-- <div class="text-center">
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
</div> 
<v-slider></v-slider>
<v-switch label="Switch"></v-switch>
<v-range-slider></v-range-slider> -->
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"> 
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" @submit.prevent="submitLogin">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input v-model="login_val.email"  type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input v-model="login_val.password"  type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div>
                  <div class="flex items-center justify-between">
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <RouterLink to="/Register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</RouterLink>
                  </p>
                  <div v-if="error" class="bg-red-500 text-white p-4 text-lg mb-4 text-center">{{ error }}</div> 
              </form>
          </div>
      </div>
  </div>

  </div>

</section>
</div>

</template>

<script setup>

import Login from '../../modules/login'
import { onMounted } from 'vue'
import { ref, computed } from 'vue'
import Navbar from '../../components/Navbar.vue';
import vue3GoogleLogin from 'vue3-google-login'



const {  login_val, submitLogin, error } = Login();


const items = [
          {
            url: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            url: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            url: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            url: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ];
      


    

  </script>