const express = require('express');
const {OAuth2Client} = require('google-auth-library');
const cors = require('cors');
const helmet = require('helmet');
const templateRouter = require('../routes/templateRouter');
const contactsRouter = require('../routes/contactsRouter');
const adminRouter = require('../routes/adminRouter');
const groupsRouter = require('../routes/groupsRouter');
const hashRouter = require('../routes/hashRouter');
const axios = require('axios');

//Require env variables
require('dotenv').config();
const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/admin', validateUser, adminRouter);
server.use('/api/template', validateUser, templateRouter);
server.use('/api/contacts', validateUser, contactsRouter);
server.use('/api/groups', validateUser, groupsRouter);
server.use('/api/inviteToGroup', validateUser, hashRouter);

server.get('/', (req, res) => {
  res.send({ api: 'Ok', dbenv: process.env.DB_ENV });
});

// user validation using google token
function validateUser(req, res, next){
const token = req.headers.authorization;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  //const domain = payload['hd'];
}
verify().catch(console.error);
axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`)
.then(response => {
  if(response.status === 200){
    next();
  } else{
    res.status(400).json({ error: 'invalid user.' })
  }
})
.catch(error => {
  res.status(500).json({ error: 'failed to authenticate user.' })
})
}

module.exports = server;
