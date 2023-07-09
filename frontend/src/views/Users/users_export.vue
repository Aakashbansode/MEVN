<template>
    <div>
    <Navbar />
    <main>
       
        <div v-if="error" class="bg-red-500 text-white p-4 text-lg mb-4 text-center">{{ error }}</div>
<div v-if="successMessage" class="bg-green-500 text-white p-4 text-lg mb-4 text-center">{{ successMessage }}</div>

             
    <div class="bg-grey-lighter min-h-screen flex flex-col mb-10">
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 bg-slate-300 border border-gray-700">

                

                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full bg-slate-200 border-spacing-2">
                    <h1 class="mb-8 text-3xl text-center">Data Export</h1>
                    <input v-model="export_user.email"
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email"
                        
                         /> 
                    <label  for="age">Age:</label>
                            <select v-model="export_user.age" id="age" name="age" class="block border border-grey-light w-full p-3 rounded mb-4">
                            <option value="">Select Age</option>
                            <option v-for="age in ages" :value="age" :key="age">{{ age }}</option>
                            </select>
                    <button @click="users_export"
                        type="submit"
                        class="w-full text-center py-3 rounded bg-blue-500 hover:bg-blue-700 text-white focus:outline-none my-1"
                    >Users Export</button>
                </div>
            </div>
        </div>
    </main>
</div>
</template>


<script setup>
import Navbar from '../../components/Navbar.vue';
import Export from '../../modules/Export'
import { onMounted } from 'vue'
import { ref, computed } from 'vue'

const { successMessage,error, export_user, users_export, checkEmailAvailability, editTodo } = Export()


   
const ages = ref(Array.from({ length: 43 }, (_, i) => i + 18)); // Generate an array with ages from 18 to 60
  




  </script>