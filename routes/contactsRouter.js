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

// GET contact by contactId
router.get('/:contactId', validateContactId, (req, res) => {
    const contactId = req.params.contactId;

    res.status(200).json(req.contact);
})

// POST contact
router.post('/', (req, res) => {
    const adminId = req.body.adminId
    const newContactInfo = req.body; 

    Contacts.addContact(adminId, newContactInfo)
    .then(response => {
        res.status(201).json(response)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})
// PUT contact
router.put('/:contactId', validateContactId, (req, res) => {
    const newContactInfo = req.body;
    const contactId = req.params.contactId;

    Contacts.updateContact(contactId, newContactInfo)
    .then(response => {
        console.log('updateResponse: ', response)
        res.status(201).json({ response: response })
    })
    .catch(error => {
        res.status(500).json(error)
    })
})
// DELETE contact
router.delete('/:contactId', validateContactId, (req, res) => {
    const contactId = req.params.contactId;

    Contacts.deleteContact(contactId)
    .then(response => {
        console.log('deleteResponse: ', response)
        res.status(201).json({ message: 'contact deleted successfully!' })
    })
    .catch(error => {
        res.status(500).json(error)
    })
})


module.exports = router;

// middleware function to see if contact belongs to the admin
function validateContactId(req, res, next){
    const contactId = req.params.contactId;
    const adminId = req.body.adminId;

    Contacts.findContactsByAdmin(adminId)
    .then(async response => {
        const contact = await response.filter(c => {
            c.contactId === contactId
        })
        if(contact.length === 0){
            res.status(404).json({message: 'invalid contact id.'})
        }else {
            req.contact = await contact[0];
            next();
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
}