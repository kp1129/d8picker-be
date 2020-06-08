const router = require('express').Router();
const Hash = require('../model/hashModel');
const Groups = require('../model/groupsModel');

// find hash in database and get admin and group info - groupId, adminId, and groupInviteHash in the req.body
router.get('/', (req, res) => {
    const groupInviteHash = req.body.groupInviteHash;

    // find group using the hash provided
    Hash.findGroupByHash(groupInviteHash)
        .then(group => {
            // if group not found, respond with invalid hash
            if(!group){
                res.status(404).json({error: 'invalid group invite hash'})
            } else {
                // if group found, find admin info using adminId from group
                Hash.findAdminById(group.adminId)
                    .then(adminInfo => {
                        // send 200 response with adminInfo and groupInfo
                        res.status(200).json({
                            message: 'invite hash found', 
                            adminInfo: adminInfo,
                            groupInfo: group
                        })
                    })
                    .catch(err => {
                        console.log('error finding the admin', err);
                        res.status(500).json(err);
                    })
            }
        })
        .catch(err => {
            console.log('error finding the groupInviteHash', err);
            res.status(500).json(err);
        });
})

// add groupInviteHash to the database - groupId, adminId, and groupInviteHash in the req.body - protected route using GAPI OAuth
router.post('/', validateUser, validateGroupId, (req, res) => {
    const id = req.body.groupId;
    const groupInviteHash = req.body.groupInviteHash;

    // add hash to the group using groupId
    Hash.addHash(id, groupInviteHash)
        .then(groupId => {
            // respond with the message - invite hash added
            res.status(201).json({message: 'group invite hash posted to the database'})
        })
        .catch(err => {
            console.log('error adding hash to the database', err);
            res.status(500).json(err);
        })
});

// Middleware functions
// validate group if it belongs to the admin
function validateGroupId(req, res, next) {
    const groupId = req.body.groupId;
    const adminId = req.body.adminId;

    Groups.findGroupByGroupId(groupId)
        .then(group => {
            // check if admin is same as adminId from request
            console.log('from validateGroupId', group);
            if(!group) {
                // if group not found, respond with error
                res.status(404).json({ error: 'invalid group id'});
            } else if(group.adminId == adminId) {
                req.group = group;
                console.log('moving on!')
                next();
            } else {
                // respond with error
                res.status(404).json({ error: 'invalid group id' });
            }
        })
        .catch(err => res.status(500).json(err));
}


// oauth for posting hash
const {OAuth2Client} = require('google-auth-library');
const axios = require('axios');
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


module.exports = router;