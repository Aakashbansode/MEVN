<template>
    <div>
      <h1>All Todos</h1>
      <button @click="newTodo()">New Todo - static</button>
      <br>
      <input type="text" placeholder="Author" v-model="state.newAuthor">
      <span> Test: {{ state.newAuthor }} </span>
      <br>
      <input type="text" placeholder="Todo" v-model="state.newTodoItem">
      <span> Test: {{ state.newTodoItem }} </span>
  
      <br>
  
      <div v-for="item in state.users" :key="item._id">
        <router-link :to="`/user/${item._id}`">
          <h4>
            {{item.name}}
          </h4>
          <p>
            {{item.age}}
          </p>
          
          <button @click="editTodo(item._id)">Edit todo</button>
        </router-link>
        <button @click="deleteTodo(item._id)">Delete todo</button>
      </div>
      
    </div>
  </template>
  
  <script>
  import users from '../modules/users'
  import { onMounted } from 'vue'
  
    export default {
      setup() {
  
        const { state, getusers, newTodo, deleteTodo, editTodo  } = users()
  
        onMounted(() => {
          getusers()
        })
  
        return { state, getusers, newTodo, deleteTodo, editTodo }
      },
     
      
    }
  </script>
  
  <style lang="scss" scoped>
  
  </style>