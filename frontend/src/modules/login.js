import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

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

      fetch('http://localhost:3000/users/loginuser', requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            error.value = data.error;
            console.log('Error:', data.error);
          } else {
            error.value = '';
            successMessage.value = 'User is logged in successfully!';
            console.log('Valid User:', data);
            GetAllUsers();
          }
        })
        .catch(error => {
          console.error(error);
          error.value = 'There was some issue while logging in';
          successMessage.value = '';
        });
    } catch (error) {
      console.error(error);
      error.value = 'There was some issue while logging in';
      successMessage.value = '';
    }
  };

  // Accessing the query parameters
  const queryParams = route.query;
  login_val.value.email = queryParams.email || '';
  login_val.value.password = queryParams.password || '';

  return {
    login_val,
    submitLogin,
    error,
    successMessage,
  };
};

export default Login;
