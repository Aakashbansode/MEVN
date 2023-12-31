const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const socketIo = require('socket.io');
const http = require('http'); // Import the http module
const corsSocketIO = require('cors'); // Import the cors middleware for Socket.io


// Create our express app
const app = express();
const server = http.createServer(app); // Create an HTTP server and pass it the express app
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173', // Replace with your frontend's origin
    methods: ['GET', 'POST'], // Add the methods your frontend will use
  },
}); // Initialize socket.io with the server and CORS configuration

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

// Routes
app.get("/", (req, res) => {
  res.send("This is my First home page home page");
});

const TodosRoute = require('./routes/Todos');
app.use('/todos',TodosRoute);

const UsersRoute = require('./routes/users');
app.use('/users',UsersRoute);

const RoomsRoute = require('./routes/rooms');
app.use('/rooms',RoomsRoute);

const AdminRoute = require('./routes/admin');
app.use('/admin',AdminRoute);

// Pass the io object to the routes
const MessagesRoute = require('./routes/messages')(io); // Pass the io object here
app.use('/messages', MessagesRoute);

// Start the app
server.listen(3000, () => {
  console.log("listening at port 3000");
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('send_message', async (data) => {
      const { text, receiver } = data;

      // Log the sender's socket ID for debugging
      console.log('Sender Socket ID:', socket.id);

      // Use Socket.io to send the message to the receiver's room
      socket.to(receiver).emit('new_message', {
          text,
          senderSocketId: socket.id, // Optionally, you can include the sender's socket ID
      });
  });
});
