const db = require('../db/dbConfig');

module.exports = {
    findContacts
}

function findContacts(googleId){
    return db('contact_admin')
        .join('contacts', 'contactId', 'id')
        .where({googleId})
}