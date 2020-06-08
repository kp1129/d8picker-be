const router = require('express').Router();
const Groups = require('../model/groupsModel.js');

// middleware functions
const{ validateGroupId, validateContactId, validateContactInGroup} = require('../api/middleware/authenticator');
// GET Groups by adminId
router.get('/:adminId', (req, res) => {
    
    Groups.findGroupsByAdminId(req.params.adminId)
        .then(response => {
            res.status(200).json({ groups: response })
        })
        .catch(err => {
            console.log('findGroupsByAdminId', err.details);
            res.status(500).json(err)
        });
});

// GET Group by groupId
router.get('/:adminId/:groupId', validateGroupId, (req, res) => {
    Groups.findContactsByGroupId(req.params.groupId)
        .then(response => {
            req.group.contacts = response;
            res.status(200).json(req.group)
        })
        .catch(err => console.log(err));

})

// POST Group 
router.post('/:adminId', (req, res) => {
    const adminId = req.params.adminId;
    const {groupName, groupDescription} = req.body;
    
    Groups.addGroup({groupName, groupDescription, adminId})
        .then(response => {
            Groups.findGroupsByAdminId(adminId)
                .then(groups => {
                    res.status(201).json({
                        newGroupId: response[0], 
                        groups: groups
                    })
                })
        })
        .catch(error => {
            console.log('Group post error',error)
            res.status(500).json(error)
        })
})

// POST Contact to the group
router.post('/:adminId/:groupId/contacts', validateGroupId, validateContactId, (req, res) => {
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
router.delete('/:adminId/:groupId/contacts', validateGroupId, validateContactId, validateContactInGroup, (req, res) => {
    const contactId = req.body.contactId;
    const groupId = req.params.groupId;

    Groups.deleteContactFromGroup(contactId, groupId)
            .then(response => {
                res.status(201).json({message: 'contact removed from the group successfully!'})
            })
            .catch(err => res.status(500).json(err));
})

// PUT Group
router.put('/:adminId/:groupId', validateGroupId, (req, res) => {
    const {groupName, groupDescription} = req.body;
    const groupId = req.params.groupId;

    Groups.updateGroup(groupId, {groupName, groupDescription})
    .then(response => {
        // console.log('Group Updated', response)
        res.status(201).json({ response: response })
    })
    .catch(error => {
        console.log('Group/PUT error', error) 
        res.status(500).json(error)
    })
})

// Delete Group
router.delete('/:adminId/:groupId', validateGroupId, (req, res) => {
    Groups.deleteGroup(req.params.groupId)
    .then(response => {
        res.status(201).json({message: 'group deleted successfully!'})
    })
    .catch(err => {console.log(err); res.status(500).json(err)})
})



module.exports = router;