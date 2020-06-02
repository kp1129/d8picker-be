const db = require('../db/dbConfig');

module.exports = {
    addAdmin,
    findAdminByGoogleId
}

function addAdmin(adminInfo){
    return db('admin')
        .insert(adminInfo);
}

function findAdminByGoogleId(googleId){
    return db('admin')
        .where({googleId})
        .first();
}