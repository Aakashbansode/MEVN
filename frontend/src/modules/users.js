import { ref, computed } from 'vue'
import { useRoute , useRouter } from 'vue-router'
import axios from 'axios';
  
const users = () => {
  
  

    const route = useRoute();
    const router = useRouter();
  
    const todoId = computed(() => route.params.id)
    //console.log("todoId: ", todoId)
  
    const state = ref({
        newAuthor: '',
        newTodoItem: '',
        users: [] // Initialize users as an empty array
      });



  const getusers = async () => {
    try {
       await fetch("http://localhost:3000/todos/users")
      .then(res => res.json())
      .then(data => {
        state.value.users = data
        // debugger
      })
    }
    catch(error) {
      console.log(error) // do different error to showcase - line 15 wrong name + line13 with incorrect path
    }
  }
  // Function to get the userId from JWT stored in localStorage or sessionStorage
  const getUserIdFromJWT = () => {
    // Implement the logic to retrieve the JWT from localStorage or sessionStorage
    const jwtToken = localStorage.getItem('jwtToken');
    // Parse the JWT to get user information
    const decodedToken = jwtToken ? JSON.parse(atob(jwtToken.split('.')[1])) : null;
    return decodedToken ? decodedToken.userId : null;
  };

  const userData = ref(null);// Define a reactive variable to hold user data
  const getuserdata = async () => {
    const userId = getUserIdFromJWT();
  
    if (userId) {
      // Fetch user-specific data including savedRoom using the JWT token
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
  












  return {
     //user,
     todoId,
    // GetSpecificTodo,
     state,
    getusers, 
     getuserdata,
     userData,
    // deleteTodo,
    // editTodo
  }
}

export default users