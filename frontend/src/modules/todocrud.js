import { ref, computed } from 'vue'
import { useRoute , useRouter } from 'vue-router'
import axios from 'axios';

const getTodos = () => {

  const route = useRoute();
  const router = useRouter();

  const todoId = computed(() => route.params.id)
  //console.log("todoId: ", todoId)

  const state = ref({
    newAuthor: '',
    newTodoItem: '',
    todos: {}
  })

  const GetAllTodos = async () => {
    try {
       await fetch("http://localhost:3000/todos")
      .then(res => res.json())
      .then(data => {
        state.value.todos = data
        // debugger
      })
    }
    catch(error) {
      console.log(error) // do different error to showcase - line 15 wrong name + line13 with incorrect path
    }
  }
  
  const newTodo = () => { 
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // "auth-token": state.token
      },
      body: JSON.stringify({
        author: state.value.newAuthor,
        todo: state.value.newTodoItem
      }) 
    }
    fetch("http://localhost:3000/todos/new1", 
      requestOptions
    ).then(GetAllTodos())
  }
  

  const deleteTodo = (_id) => {
    axios("http://localhost:3000/todos/delete/" + _id, { method: "DELETE"})
      .then(GetAllTodos())
  }



  
  const editTodo = () => { 
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
        // "auth-token": state.token
      },
      body: JSON.stringify({
        author: state.value.newAuthor,
        todo: state.value.newTodoItem
      }) 
    }
    fetch("http://localhost:3000/todos/update/" + todoId.value, 
    requestOptions)
     // .then(GetAllTodos())
      .then(res =>  res.body ) // redundant
      .then(res => {console.log(res)}) // redundant
      router.push('/todos')
  }




const todo = ref({});
const GetSpecificTodo = async () => {
  try {
    axios("http://localhost:3000/todos")
      .then((response) => {
        todo.value = response.data.filter((t) => t._id === todoId.value);
      });
  } catch (error) {
    console.log(error);
  }
};


const jwtToken = localStorage.getItem('jwtToken');

if (jwtToken) {
  const tokenParts = jwtToken.split('.');
  if (tokenParts.length === 3) {
    const encodedPayload = tokenParts[1];
    const decodedPayload = JSON.parse(atob(encodedPayload));

    const expirationTimestamp = decodedPayload.exp;
    const currentTimestamp = Math.floor(Date.now() / 1000); // Get current time in seconds

    if (expirationTimestamp < currentTimestamp) {
      console.log('Token has expired');
    } else {
      console.log('Token is still valid');
    }
  } else {
    console.log('Invalid JWT token format');
  }
} else {
  console.log('JWT token not found');
}

  return {
    todo,
    todoId,
    GetSpecificTodo,
    state,
    GetAllTodos, 
    newTodo,
    deleteTodo,
    editTodo
  }
}

export default getTodos