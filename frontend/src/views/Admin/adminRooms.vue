<template>
    <div>
      <Navbar></Navbar>
   
      <v-row justify="center" style="min-height: 160px;">
        <v-col class="shrink">
          <v-btn class="ma-2" color="primary" @click="expand = !expand">
            Users
          </v-btn>
  
          <v-expand-transition>
            <v-card v-show="expand" height="100" width="300" class="mx-auto bg-secondary">
              <!-- Options for updating and deleting user data -->
              <div>
                <h3>Update User Data</h3>
                <!-- Your update user data form/components can go here -->
              </div>
            </v-card>
          </v-expand-transition>
        </v-col>
  
        <div class="mx-4 hidden-sm-and-down"></div>
  
        <v-col class="shrink">
          <v-btn class="ma-2" color="secondary" @click="expand2 = !expand2">
            Rooms
          </v-btn>
          <v-expand-x-transition>
            <v-card v-show="expand2" height="100" width="200" class="mx-auto bg-secondary">
              <!-- Options for updating and deleting room data -->
              <div>
                <h3>Update Room Data</h3>
                <!-- Your update room data form/components can go here -->
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
  
  const expand = ref(false);
  const expand2 = ref(false);
  
  
  </script> 