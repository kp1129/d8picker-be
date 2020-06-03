const db = require('../db/dbConfig');

module.exports = {
    findGroupsByAdminId,
    addGroup, 
    findGroupByGroupId,
    findContactsByGroupId,
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
}

// add group
function addGroup(newGroupInfo){
    return db('groups')
            .insert(newGroupInfo)
}

// find group by groupId
function findGroupByGroupId(id){
    return db("groups")
    .where({id})
    .first();
}

// find contacts for a group
function findContactsByGroupId(groupId) {
    return db('contacts')
        .join('contact_group', 'contact_group.contactId', 'contacts.id')
        .where({'contact_group.groupId': groupId});
}

// add contact to a group
function addContact(contactId, groupId){
    return db('contact_group')
        .insert({contactId: contactId, groupId: groupId});

}

// delete contact from a group
function deleteContactFromGroup(){
    return ('contact_group')
    .whereIn(['contactId', 'groupId'], [contactId, groupId])
            
}

// find groups for a contact
function findGroupsByContact(contactId) {
    return db('contact_group')
        .where({contactId})
        .join('groups', 'contact_group.groupId', 'groups.id');
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