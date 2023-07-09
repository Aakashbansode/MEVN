const express = require('express');
const router = express.Router();
const { validateUser } = require('../models/users');
const { checkEmailExists } = require('../models/users');
const {  User } = require('../models/users');
const { fetchUsers, exportUsers } = require('../models/export');
const { ListingsAndReviews } = require('../models/airbnb'); // Import the model
const { fetchListingsAndReviews } = require('../models/airbnb'); // Import the model






// Getter by id
router.get('/rooms/:id', async (req, res) => {
    const t = await Todo.findById({ _id : req.params.id })
    res.json(t)
  })
  

















module.exports = router