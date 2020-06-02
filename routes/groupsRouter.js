const router = require('express').Router();
const Groups = require('../model/groupsModel.js');
const Contacts = require('../model/contactsModel');

// GET Groups by adminId
router.get('/', (req, res) => {
    const adminId = req.body.adminId;

    Groups.findGroupsByAdminId(adminId)
        .then(response => {
            res.status(200).json({ groups: response })
        })
        .catch(err => {
            console.log('findGroupsByAdminId', err.details);
            res.status(500).json(err)
        });
});

// GET Group by groupId
router.get('/:groupId', validateGroupId, (req, res) => {
    Groups.findContactsByGroupId(req.params.groupId)
        .then(response => {
            req.group.contacts = response;
            res.status(200).json(req.group)
        })
        .catch(err => console.log(err));
})

// POST Group 
router.post('/', (req, res) => {
    const adminId = req.body.adminId;
    const {groupName, groupDescription} = req.body;
    
    Groups.addGroup({groupName, groupDescription, adminId})
        .then(response => {
            console.log('group postResponse', response)
            res.status(201).json(response)
        })
        .catch(error => {
            console.log('Group post error',error)
            res.status(500).json(error)
        })
})

// POST Contact to the group
router.post('/:groupId', validateGroupId, validateContactId, (req, res) => {
    const groupId = req.params.groupId;
    const contactId = req.body.contactId;

    Groups.addContact(contactId, groupId)
        .then(response => {
            res.status(201).json({ message: 'contact added successfylly to the group'});
        })
        .catch(error => {
            console.log('Add contact to the group error',error)
            res.status(500).json(error)
        });
})
// Delete Contact from the group
router.delete('/:groupId', validateGroupId, validateContactId, validateContactInGroup, (req, res) => {
    const contactId = req.body.contactId;
    const groupId = req.params.groupId;

    Contacts.findContactById(id) 
    .then(contact => {
        if(contact.length === 0) {
    Groups.deleteContactFromGroup(groupId)
    .then(response => {
        res.status(201).json(response)
    })
    } else {
        res.status(404).json({ message: 'failed to delete group'})
    }
    })  
    .catch(error => {
        res.status(500).json(error)
    })
})

// PUT Group
router.put('/:groupId', validateGroupId, (req, res) => {
    const {groupName, groupDescription} = req.body;
    const groupId = req.params.groupId;

    Groups.updateGroup(groupId, {groupName, groupDescription})
    .then(response => {
        console.log('Group Updated', response)
        res.status(201).json({ response: response })
    })
    .catch(error => {
        console.log('Group/PUT error', error) 
        res.status(500).json(error)
    })
})

// Delete Group
router.delete('/:groupId', validateGroupId, (req, res) => {
    const groupId = req.params.groupId;
    
    Groups.deleteGroup(groupId)
    .then(response => {
        res.status(201).json({ message: 'group deleted successsfuly!' })
    })
    .catch(error => {
        res.status(500).json(error)
    })
})


// validate contact if it belongs to the admin
function validateContactId(req, res, next){
    const contactId = req.body.contactId;
    const adminId = req.body.adminId;

    // find the contact using contactId
    Contacts.findContactById(contactId)
        .then(contact => {
            console.log('from validateContactId', contact);
            // check if admin is same as adminId from request
            if(contact.adminId == adminId) {
                req.contact = contact;
                next();
            } else {
                // if not respond with error message
                res.status(404).json({ error: 'invalid contact id'});
            }
        })
        .catch(error => {
                res.status(500).json(error)
            });
}

// validate group if it belongs to the admin
function validateGroupId(req, res, next) {
    const groupId = req.params.groupId;
    const adminId = req.body.adminId;

    Groups.findGroupByGroupId(groupId)
        .then(group => {
            // check if admin is same as adminId from request
            console.log('from validateGroupId', group);
            if(group.adminId == adminId) {
                req.group = group;
                next();
            } else {
                // respond with error
                res.status(404).json({ error: 'invalid group id' });
            }
        })
        .catch(err => res.status(500).json(err));
}
// validate contact if it belongs to the group
function validateContactInGroup(req, res, next) {
    const groupId = req.params.groupId;
    const contactId = req.body.contactId;
    
    Groups.findGroupsByContact(contactId)
        .then(groups => {
            console.log('from validateContactInGroup', groups);
            const group = groups.find(g => g.groupId == groupId);
            if (!group) {
                res.status(404).json({ error: `contact does not belong to the groupId ${groupId}`});
            } else {
                next();
            }
        })
}

module.exports = router;