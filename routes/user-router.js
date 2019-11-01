const router = require('express').Router();

// const authenticate = require('../auth/authenticate-middleware.js')
const Users = require('./user-model.js');


router.get('/', (req, res) => {
  Users.get()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json( {message: `server 500 error` })
    });
  });  

module.exports = router;