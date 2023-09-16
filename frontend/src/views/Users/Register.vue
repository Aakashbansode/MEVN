<template>
  <div>
  <Navbar />
  <main>
     
      <div v-if="error" class="bg-red-500 text-white p-4 text-lg mb-4 text-center">{{ error }}</div>
<div v-if="successMessage" class="bg-green-500 text-white p-4 text-lg mb-4 text-center">{{ successMessage }}</div>

<div>
    <GoogleLogin :callback="callback" prompt="select_account" auto-login />
  </div>      
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
                      <span v-if="error" class="bg-red-500 text-white p-2 text-lg mb-2 text-center">{{ error }}</span>
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
import { useRouter } from 'vue-router'; // Import the useRouter function from Vue Router
import Swal from 'sweetalert2'; // Import SweetAlert library

const { successMessage, error, register, GetAllUsers, CreateAccount, checkEmailAvailability, editTodo } = Register()

const router = useRouter();
const ages = ref(Array.from({ length: 43 }, (_, i) => i + 18)); // Generate an array with ages from 18 to 60

// Define the callback function for Google Sign-In
const callback = async (response) => {
  console.log('Google Sign-In Response:', response);

  if (response.credential) {
    const { name, email } = response; // Access user data directly from response

    console.log('Name:', name);
    console.log('Email:', email);

    // Call the registerUserViaGoogle function to save user data
    await registerUserViaGoogle(name, email); // Define this function

    // Redirect to the dashboard or home page
    router.push('/airbnb'); // Replace with your actual route
  }
};

// Fetch the JWT token from local storage
const accessToken = localStorage.getItem('token');
const fetchUserData = async () => {
  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();
    
    console.log('Response Status:', response.status);
    console.log('Response Data:', responseData);

    if (response.ok) {
      console.log('User Data:', responseData);
    } else {
      console.error('Failed to fetch user data:', responseData.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};



// Define the function to register the user via Google
const registerUserViaGoogle = async (name, email) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
    })
  };

  try {
    const response = await fetch('http://localhost:3000/users/registernewuser', requestOptions);
    const data = await response.json();

    if (data.error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.error,
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Account created successfully!',
      });
      // Redirect to the login page
      router.push('/login'); // Replace with your actual route
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to create account.',
    });
  }
};

// Call the fetchUserData function
onMounted(fetchUserData);

</script>
