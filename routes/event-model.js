const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    addEvent,
    removeEvent, 
    updateEvent,
}

function find() {
    return db('events')
    .select('eventName', 'eventInfo', 'calendarId')
}

function findById(id) {
    return db('events')
    .where('id', id);
}

async function addEvent(events) {
    return db('events')
    .insert(events, 'id')

}

async function removeEvent(id) {
    return db('events')
    .where({ id })
    .del();
}

function updateEvent(id , changes) {
    return db('events')
    .where({ id })
    .update(changes)
    
}