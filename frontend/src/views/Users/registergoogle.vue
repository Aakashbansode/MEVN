<template>
  <div>
    <GoogleLogin :callback="callback" prompt="select_account" auto-login />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Import the useRouter function from Vue Router

const router = useRouter();
const callback = (response) => {
  // This callback will be triggered when the user selects or logs in to
  // their Google account from the popup
  console.log("Handle the response", response);

  if (response.credential) {
    // Token is generated and returned in the response
    const token = response.credential;

    // Store the token in local storage or cookies as needed
    // localStorage.setItem('token', token);

    // Use the router to navigate to the user's home page
    
    router.push('/airbnb'); // Replace '/airbnb' with the actual route for the home page
  }
}
</script>

