import { ref } from 'vue';
import {  useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';


const router = useRouter();



const Admin = () => {
  const error = ref('');
  const successMessage = ref('');
  const users = ref([]);


  const getAllUsersData = async () => {
    try {
      // Fetch the JWT token from local storage
      const jwtToken = localStorage.getItem('jwtToken');
  
      // Check if the token is available
      if (!jwtToken) {
        throw new Error('Please log in to your account to view users data');
      }
  
      // Proceed with the fetch request and other logic
      const response = await fetch("http://localhost:3000/admin/getusers", {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        users.value = data.users; // Populate the 'users' ref with fetched data
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch users data');
      }
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while fetching users data');
    }
  };
  
  const getuserdata = async (userId) => {
    if (userId) {
      // Fetch user-specific data using the provided user ID
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      };
  
      try {
        const userDataResponse = await fetch(`http://localhost:3000/users/${userId}`, requestOptions);
        const userDataJson = await userDataResponse.json();
  
        if (userDataResponse.status === 200) {
          // Update reactive variable with user data
          userData.value = userDataJson;
        } else {
          console.error('Error fetching user data:', userDataResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };
  
  
  const deleteUser = (userId) => {
    // Implement your delete user logic here
    console.log(`Delete user with ID: ${userId}`);
  };

// Add the CreateAccount function to the module exports
  return {
    getAllUsersData,
    users,
    deleteUser
  };

};

export default Admin;


