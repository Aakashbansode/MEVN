// mongodb+srv://<username>:<password>@cluster0.rroq00f.mongodb.net/?retryWrites=true&w=majority

const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

// create out express app
const app = express()

// Handle CORS + middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); // If using .fetch and not axios
  res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
})

//database stuff

const uri = "mongodb+srv://dbuser:Aakash%40123@cluster0.rroq00f.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
})
.then(() => {
    console.log("Mongo DB Connected")
})
.catch(err => console.log(err))

app.use(bodyParser.json())

//routes

app.get("/", (res,req)=>{
    res.send("This is my First home page home page")
})

const TodosRoute = require('./routes/Todos');
app.use('/todos',TodosRoute)

//start the app

const UsersRoute = require('./routes/users');
app.use('/users', UsersRoute);



app.listen(3000, ()=>{
    console.log("listening at port 3000")
})