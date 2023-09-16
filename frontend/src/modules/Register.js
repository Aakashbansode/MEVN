import { ref, computed } from 'vue'
import { useRoute , useRouter } from 'vue-router'
import axios from 'axios';
import Swal from 'sweetalert2';

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
        // Check if email field is blank
        if (!register.value.email) {
          error.value = 'Email cannot be blank.';
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Email cannot be blank.',
          });
          return;
        }
      
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
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: data.error,
            });
          } else {
            error.value = ''; // Reset the error message
            if (data.exists) {
              console.log('This email is already registered.');
              Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'This email is already registered.',
              });
            } else {
              successMessage.value = 'Email is available.'; // Set the success message
              console.log('Email is available.');
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Email is available.',
              });
            }
          }
        } catch (error) {
          console.error('Error checking email availability:', error);
          error.value = 'Error checking email availability'; // Set a generic error message
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error checking email availability',
          });
        }
      };
      
      
      
      
       

// const GetAllUsers = async () => {
//     try {
//        await fetch("http://localhost:3000/todos/users")
//       .then(res => res.json())
//       .then(data => {
//         register.value.users = data
//         // debugger
//       })
//     }
//     catch(error) {
//       console.log(error) // do different error to showcase - line 15 wrong name + line13 with incorrect path
//     }
//   }

 
  const CreateAccount = async () => {
    if (register.value.password !== register.value.confirm_password) {
      error.value = 'Password and confirm password must be the same';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Password and confirm password must be the same',
      });
      return;
    }
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
  
    try {
      const response = await fetch('http://localhost:3000/users/registernewuser', requestOptions);
      const data = await response.json();
      
      if (data.error) {
        error.value = data.error;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error,
        });
        console.log('Error:', data.error);
      } else {
        error.value = '';
        successMessage.value = 'Account created successfully!';
        console.log('Account created:', data);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Account created successfully!',
        });
        router.push('/login');
      }
    } catch (error) {
      console.error(error);
      error.value = 'Failed to create account.';
      successMessage.value = '';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create account.',
      });
    }
  };
  
  
  
  // Add the CreateAccount function to the module exports

  return {
    //todo,
  //  todoId,
  //  GetSpecificTodo,
    register,
   // GetAllUsers, 
    CreateAccount,
    checkEmailAvailability,
  //  deleteTodo,
  //  editTodo
  error,
  successMessage
  }

}

export default Register;