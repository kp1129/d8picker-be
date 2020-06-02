const router = require('express').Router();
const Contacts = require('../model/contactsModel');

// GET contacts for admin Id
router.get('/', (req, res) => {
    // get adminId from request body
    const adminId = req.body.adminId;
    // get contacts using adminId
    Contacts.findContactsByAdmin(adminId)
        .then(contacts => {
            res.status(200).json({contacts: contacts});
        })
        .catch(err => {
            console.log('findContactsByAdmin', err.details);
            res.status(500).json(err);
        });
});


module.exports = router;