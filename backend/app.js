const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

// create our express app
const app = express();
app.use(express.json());
app.use(cors());

app.use(cookieParser());

// Handle CORS + middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); // If using .fetch and not axios
  res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(session({
  secret: 'aakashbansode',
  resave: false,
  saveUninitialized: false
}));

// Database connection
const uri = "mongodb+srv://dbuser:Aakash%40123@cluster0.rroq00f.mongodb.net/sample_airbnb?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Mongo DB Connected");
    console.log("Connected to database:", mongoose.connection.name);
  })
  .catch(err => console.log(err));

app.use(bodyParser.json());



// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['auth-token'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    // Make the user object available to subsequent route handlers
    req.user = user;
    next();
  });
};



// Routes
app.get("/", (req, res) => {
  res.send("This is my First home page home page");
});

const TodosRoute = require('./routes/Todos');
app.use('/todos', authenticateToken,TodosRoute);

const UsersRoute = require('./routes/users');
app.use('/users',UsersRoute);

const RoomsRoute = require('./routes/rooms');
app.use('/rooms',RoomsRoute);


// Start the app
app.listen(3000, () => {
  console.log("listening at port 3000");
});
