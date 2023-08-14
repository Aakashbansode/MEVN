<template>
    <div>
    <Navbar />
    <main>              
    <div class="bg-grey-lighter min-h-screen flex flex-col mb-10">
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 bg-slate-300 border border-gray-700">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full bg-slate-200 border-spacing-2">
                    <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                    <input v-model="register.name"
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fullname"
                        placeholder="Full Name" 
                        />
                        
                        <label  for="age">Age:</label>
                            <select v-model="register.age" id="age" name="age" class="block border border-grey-light w-full p-3 rounded mb-4">
                            <option value="">Select Age</option>
                            <option v-for="age in ages" :value="age" :key="age">{{ age }}</option>
                            </select>
                        <input v-model="register.qualification"
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="qualification"
                        placeholder="qualification" />
                        <input v-model="register.address"
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="address"
                        placeholder="address"
                         />
                    <input v-model="register.email"
                    required type="email"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email"
                        @blur="checkEmailAvailability" 
                         /> 
                    <input v-model="register.password"
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" 
                        />
                    <input v-model="register.confirm_password"
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="Confirm Password" />
                    <button @click="CreateAccount"
                        type="submit"
                        class="w-full text-center py-3 rounded bg-blue-500 hover:bg-blue-700 text-white focus:outline-none my-1"
                    >Create Account</button>
                    <div class="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and 
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div class="text-grey-dark mt-6">
                    Already have an account? 
                    <a class="no-underline border-b border-blue text-blue" href="../login/">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
    </main>
</div>
</template>


<script setup>
import Navbar from '../../components/Navbar.vue';
import Register from '../../modules/Register'
import { onMounted } from 'vue'
import { ref, computed } from 'vue'

const { successMessage,error,register, GetAllUsers, CreateAccount, checkEmailAvailability, editTodo } = Register()

onMounted(() => {
    GetAllUsers()
      })
    
const ages = ref(Array.from({ length: 43 }, (_, i) => i + 18)); // Generate an array with ages from 18 to 60
  
  </script>