const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv/config');


//ROUTES
app.get('/',(req, res)=> {
    res.send('this is home');
});
app.get('/posts',(req,res) =>{
    res.send('this is posts');
});

//MIDDLEWARE


//TESTING DB KENNETH
mongoose.connect(
  "mongodb+srv://admin:yj8p6vLZjRE0zw4P@d8picker-db-qqopr.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => {
    console.log("connected to DB");
  }
);


app.listen(3000);