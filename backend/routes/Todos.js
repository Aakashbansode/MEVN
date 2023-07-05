const express = require('express');
const router = express.Router();
const Todo = require('../models/Todos')
const { validateUser, User } = require('../models/users');



// Get All Todo route
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos)
})


// Get All Todo route
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users)
})



// Create new Todo
router.post('/new1', async (req, res) => {
  
  const newTodo = new Todo(
    req.body // What the Vue App is sending
     // pass in body content to be stored in DB
    // { 
    //     author:"Sachin", 
    //     todo:"Go to Africa"
    //    } 
  ); 
  const savedTodo = await newTodo.save() // mongo save method
  res.json(savedTodo) // respond with json to our post endpoint
});



// Getter by id
router.get('/get/:id', async (req, res) => {
  const t = await Todo.findById({ _id : req.params.id })
  res.json(t)
})

// Delete a todo by id
router.delete('/delete/:id', async (req, res) => {
  const tDelete = await Todo.findByIdAndDelete({ _id : req.params.id })
  res.json(tDelete)
})

// Update a todo by id
router.put('/update/:id', async (req, res) => {
  const tUpdate = await Todo.updateOne(
    { _id: req.params.id }, 
    
    { $set: req.body }
   /*  {
      author: "Bart",
      todo: "Skating"
    } */
  )
  res.json(tUpdate)
})


module.exports = router