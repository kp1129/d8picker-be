const db = require('../db/dbConfig');

module.exports = {
    findGroupsByAdminId,
    addGroup, 
    findGroupByGroupId,
    addContact,
    deleteContactFromGroup,
    findGroupsByContact,
    deleteGroup,
    updateGroup

}

// find groups by adminId
function findGroupsByAdminId(adminId){
    return db("groups")
            .where({adminId})
            // .join('contact_group','groups.id', 'contact_group.groupId')
            // .groupBy('groups.id')
}

// add group
function addGroup(newGroupInfo){
    return db('groups')
            .insert(newGroupInfo)
}

// find group by groupId
function findGroupByGroupId(groupId){
    return db("groups")
    .where({groupId})
    .join('contact_group', 'groups.id', 'contact_group.groupId')
    .groupBy('groups.id')
    .first();
}

// add contact to a group
function addContact(contactId, groupId){
    return db('contact_group')
        .insert({contactId, groupId});

}

// delete contact from a group
function deleteContactFromGroup(){
    return ('contact_group')
    .whereIn(['contactId', 'groupId'], [contactId, groupId])
            
}

// find groups for a contact
function findGroupsByContact(contactId) {
    return ('contact_group')
        .where({contactId})
        .join('groups', 'groups.id', 'contact_group.groupId');
}

// update group
function updateGroup(id, newGroupInfo){
    return db('groups')
            .where({id})
            .update(newGroupInfo)
}

// delete group
function deleteGroup(id){
    return db('groups')
    .where({id})
    .delete()
}