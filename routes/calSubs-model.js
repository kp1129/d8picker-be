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
        db('userCalendars')
            .where({calendarId})
            .join('users', 'userId', 'users.id')
            .select('name', 'username', 'email', 'phone')
    )
}

function getById(calendarId, userId) {
    return (
        db('userCalendars')
            .where({calendarId, userId})
            .join('users', 'userId', 'users.id')
            .select('name', 'username', 'email', 'phone')
            .first()
    )
}

function add(calendarId, user) {
    return (
        db('userCalendars')
            .where({calendarId})
            .insert(user)
    )
}

function remove(calendarId, userId) {
    return (
        db('userCalendars')
            .where({calendarId, userId})
            .del()
    )
}

function update(calendarId, userId, changes) {
    return (
        db('userCalendars')
            .where({calendarId, userId})
            .update(changes)
    )
}