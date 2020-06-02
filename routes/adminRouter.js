const router = require('express').Router();
const Admin = require('../model/adminModel');

router.post('/', checkforAdmin, (req, res) => {
    const adminInfo = {
        name: req.body.name,
        email: req.body.email,
        googleId: req.body.googleId
    }
    // console.log('req.body: ', req.body)
    // console.log('adminInfo: ', adminInfo)
    // const {name, email, googleId} = req.body;
    Admin.addAdmin(adminInfo)
        .then(response => {
            console.log('Posted?', response);
            res.status(200).json({ message: 'admin posted', adminId: response[0]});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'Error posting the admin'})
        })
})

function checkforAdmin(req, res, next) {
    const googleId = req.body.googleId;
    Admin.findAdminByGoogleId(googleId)
        .then(response => {
            console.log('did i find you?', response);
            if(!response) {
                next();
            }
            res.status(200).json({message: 'admin exists in database', adminId: response.id});
        })
        .catch(err => console.log(err));
}

module.exports = router;