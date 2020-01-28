const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv/config');

//Import Routes
const postsRoutes = require('./router/posts');

app.use('/posts', postsRoutes);

//ROUTES
app.get('/',(req, res)=> {
    res.send('this is home');
});

//MIDDLEWARE


//CONNECT DB
mongoose.connect(
  "mongodb+srv://admin:yj8p6vLZjRE0zw4P@d8picker-db-qqopr.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => {
    console.log("connected to DB");
  }
);


app.listen(3000);