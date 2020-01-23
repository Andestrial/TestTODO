const express = require('express');
const mongoose = require('mongoose');
const taskRouts = require('../routs/taskRouts');
const path = require('path');
const bodyParser = require('body-parser');
const userRouts = require('../routs/userRouts');
const register = require("../routs/register")


const port = process.env.PORT || 8080;
const app = express();


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    }, (err)=>{
  if(err) return console.log(err);
  app.listen(port, ()=>{
    console.log("Server start");
})
});


app.use(express.static( path.join(__dirname ,'../public')));
app.use(bodyParser());

app.use(userRouts);
app.use(taskRouts);
app.use(register);





