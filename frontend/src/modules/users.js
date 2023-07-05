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















  return {
     //user,
     todoId,
    // GetSpecificTodo,
     state,
    getusers, 
    // newTodo,
    // deleteTodo,
    // editTodo
  }
}

export default users