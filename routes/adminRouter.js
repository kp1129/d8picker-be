const router = require('express').Router();
const Admin = require('../model/adminModel');

// post endpoint to add admin to the table
router.post('/', checkforAdmin, (req, res) => {
    // get the admin info from request body
    const adminInfo = {
        name: req.body.name,
        email: req.body.email,
        googleId: req.body.googleId
    }
    // add the admin to database
    Admin.addAdmin(adminInfo)
        .then(response => {
            console.log('Posted?', response);
            // respond with the adminId for admin created
            res.status(200).json({ message: 'admin posted', adminId: response[0]});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'Error posting the admin'})
        })
})

// middleware to check whether user exists
function checkforAdmin(req, res, next) {
    const googleId = req.body.googleId;
    Admin.findAdminByGoogleId(googleId)
        .then(response => {
            console.log('did i find you?', response);
            // if googleId is not found, proceed to add admin to the database
            if(!response) {
                next();
            }
            // if admin is found respond with the adminId
            res.status(200).json({message: 'admin exists in database', adminId: response.id});
        })
        .catch(err => console.log(err));
}

module.exports = router;