const db = require('../data/db-config.js');

module.exports = {
    get,
    getById,
    add,
    remove, 
    update,
}

function get(calendarId) {
    return (
        db('adminCalendars')
            .where({calendarId})
            .join('users', 'adminId', 'users.id')
            .select('name', 'username', 'email', 'phone')
    )
}

function getById(calendarId, adminId) {
    return (
        db('adminCalendars')
            .where({calendarId, adminId})
            .join('users', 'adminId', 'users.id')
            .select('name', 'username', 'email', 'phone')
            .first()
    )
}

function add(calendarId, admin) {
    return (
        db('adminCalendars')
            .where({calendarId})
            .insert(admin)
    )
}

function remove(calendarId, adminId) {
    return (
        db('adminCalendars')
            .where({calendarId, adminId})
            .del()
    )
}

function update(calendarId, adminId, changes) {
    return (
        db('adminCalendars')
            .where({calendarId, adminId})
            .update(changes)
    )
}
