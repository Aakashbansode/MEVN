<template>
  <div>
    <Navbar></Navbar>
 
    <v-row justify="center" style="min-height: 160px;">
      <v-col class="shrink">
        <v-btn class="ma-2" color="primary" @click="users = !users">
          Users
        </v-btn>

        <v-expand-transition>
          <v-card v-show="users" height="100" width="300" class="mx-auto bg-secondary">
            <!-- Options for updating and deleting user data -->
            <div>
              <router-link to="/Admin/users" class="text-sm px-2 py-1">Update User Data</router-link>
            </div>
          </v-card>
        </v-expand-transition>
      </v-col>
      <div class="mx-4 hidden-sm-and-down"></div>
      <v-col class="shrink">
        <v-btn class="ma-2" color="secondary" @click="rooms = !rooms">
          Rooms
        </v-btn>
        <v-expand-x-transition>
          <v-card v-show="rooms" height="100" width="200" class="mx-auto bg-secondary">
            <!-- Options for updating and deleting room data -->
            <div>
              <router-link to="/Admin/rooms" class="text-sm px-2 py-1">Update Rooms Data</router-link>
            </div>
          </v-card>
        </v-expand-x-transition>
      </v-col>
    </v-row>
  </div>
</template>


<script setup>


import Navbar from '../../components/Navbar.vue';
import { ref, computed } from 'vue'

const users = ref(false);
const rooms = ref(false);


</script> 