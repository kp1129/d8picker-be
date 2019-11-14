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

// get user calendars with user id 
router.get('/:id/calendar' , (req, res) => {
  const { id } = req.params

  Users.getCalendar(id)
  .then(calendars => {
      res.status(200).json({ calendars })
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message : 'Could not get Calendar', error:error })
  })
}) 

module.exports = router;