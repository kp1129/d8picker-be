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
    'mongodb+srv://testdb:testing123@cluster0-hnltr.gcp.mongodb.net/test?retryWrites=true&w=majority',
 { useNewUrlParser: true }, () => {
    console.log('connected to DB')
})


app.listen(3000);