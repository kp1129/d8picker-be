const db = require('../db/dbConfig');

module.exports = {
    findContactsByAdmin,
    updateContact,
    addContact,
    deleteContact
}

// find all contacts by adminId
function findContactsByAdmin(id){
    return db('contact_admin')
        .join('contacts', 'contactId', 'id')
        .where('adminId', id)
        .select('adminId', 'contactId', 'firstName', 'lastName', 'phoneNumber', 'email');
}


// update a contact
function updateContact(id, newContactInfo){
    return db('contacts')
            .where({id})
            .update(newContactInfo)
}

// add a contact
async function addContact(adminId, newContactInfo){

    // add contact to the contacts table
    const newContactId = await db('contacts')
        .insert(newContactInfo);

    // add relationship in contact_admin table
    await db('contact_admin')
        .insert({adminId, contactId: newContactId});

    // return the new contact id
    return newContactId;
}
// delete a contact
function deleteContact(id){
    return db('contacts')
            .where({id})
            .delete()
}