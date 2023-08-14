import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';



const Login = () => {
  const login_val = ref({
    email: '',
    password: '',
  });

  const route = useRoute();
  const router = useRouter();

  const error = ref('');
  const successMessage = ref('');

  const submitLogin = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: login_val.value.email,
          password: login_val.value.password,
        }),
      };
  
      const response = await fetch('http://localhost:3000/users/loginuser', requestOptions);
      const data = await response.json();
  
      if (data.error) {
        error.value = data.error;
        // Show error message using Swal
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error,
        });
      } else {
        error.value = '';
        successMessage.value = 'User is logged in successfully!';
        console.log('Valid User:', data);
        console.log('JWT Token:', data.token);
  
        // Store the token in the local storage
        localStorage.setItem('jwtToken', data.token);
  
        // Show success message using Swal
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'You have logged in successfully!',
        });
  
        // Redirect to the desired route
        router.push('/airbnb');
      }
    } catch (error) {
      console.error(error);
      error.value = 'An unexpected error occurred';
      successMessage.value = '';
  
      // Show error message using Swal
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred',
      });
    }
  
    // Accessing the query parameters
    const queryParams = route.query;
    login_val.value.email = queryParams.email || '';
    login_val.value.password = queryParams.password || '';
  };
  

  return {
    login_val,
    submitLogin,
    error,
    successMessage,
  };
};

export default Login;
