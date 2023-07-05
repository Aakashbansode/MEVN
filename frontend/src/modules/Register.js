import { ref, computed } from 'vue'
import { useRoute , useRouter } from 'vue-router'
import axios from 'axios';

const Register = () => {

    const route = useRoute();
    const router = useRouter();
  
    const todoId = computed(() => route.params.id)
    //console.log("todoId: ", todoId)


    const register = ref({
        
          name: '',
          age: '',
          qualification: '',
          address: '',
          email: '',
          password: '',
          confirm_password: '',
        
        todos: {}
      });
     
      const error = ref('');
      const successMessage = ref('');

      const checkEmailAvailability = async () => {
        try {
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: register.value.email
            })
          };
      
          const response = await fetch('http://localhost:3000/users/checkusers', requestOptions);
          const data = await response.json();
      
          if (data.error) {
            error.value = data.error; // Set the error message
            console.log('Error:', data.error);
          } else {
            error.value = ''; // Reset the error message
            if (data.exists) {
              console.log('This email is already registered.');
            } else {
              successMessage.value = 'Email is available.'; // Set the success message
              console.log('Email is available.');
            }
          }
        } catch (error) {
          console.error('Error checking email availability:', error);
          error.value = 'Error checking email availability'; // Set a generic error message
        }
      };
      
      
       

const GetAllUsers = async () => {
    try {
       await fetch("http://localhost:3000/todos/users")
      .then(res => res.json())
      .then(data => {
        register.value.users = data
        // debugger
      })
    }
    catch(error) {
      console.log(error) // do different error to showcase - line 15 wrong name + line13 with incorrect path
    }
  }

 
  const CreateAccount = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: register.value.name,
        age: register.value.age,
        qualification: register.value.qualification,
        address: register.value.address,
        email: register.value.email,
        password: register.value.password
      })
    };
  
    fetch('http://localhost:3000/users/registernewuser', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          error.value = data.error;
          console.log('Error:', data.error);
        } else {
          error.value = '';
          successMessage.value = 'Account created successfully!';
          console.log('Account created:', data);
          GetAllUsers();
        }
      })
      .catch(error => {
        console.error(error);
        error.value = 'Failed to create account.';
        successMessage.value = '';
      });
  };
  
  
  // Add the CreateAccount function to the module exports

  return {
    //todo,
  //  todoId,
  //  GetSpecificTodo,
    register,
    GetAllUsers, 
    CreateAccount,
    checkEmailAvailability,
  //  deleteTodo,
  //  editTodo
  error,
  successMessage
  }

}

export default Register;