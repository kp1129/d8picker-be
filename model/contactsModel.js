const db = require('../db/dbConfig');

module.exports = {
    findContactsByAdmin
}

function findContactsByAdmin(id){
    return db('contact_admin')
        .join('contacts', 'contactId', 'id')
        .where('adminId', id);
}

// function find