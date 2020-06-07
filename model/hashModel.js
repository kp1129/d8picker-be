const db = require('../db/dbConfig');

module.exports = {
    findHash,
    addHash
}

function findHash(groupInviteHash){
    return db('groups')
        .where({groupInviteHash})
        .first();
}

function addHash(id, groupInviteHash){
    return db('groups')
        .where({id})
        .update({groupInviteHash});
}