const db = require('../data/db-config.js');

module.exports = {
    get,
    getById,
    add,
    remove, 
    update,
}

function get() {
    return db('events')
    .select('eventName', 'eventInfo', 'calendarId')
}

function getById(calendarId, eventsId) {
    return (
        db('calendarEvents')
            .where({calendarId, eventsId})
            .join('events', 'eventsId', 'events.id')
            .select('eventName', 'eventInfo')
            .first()
    )
}

function add(calendarId, event) {
    return (
        db('calendarEvents')
            .where({calendarId})
            .insert(event)
        // db('events')
        //     .insert(event)
        //     // .then(res => {
        //     //     db('calendarEvents')
        //     //         .where({calendarId})
        //     // })
    )
} //fix

function remove(calendarId, eventsId) {
    return (
        db('calendarEvents')
            .where({calendarId, eventsId})
            .del()
    )
}

function update(calendarId, eventsId, changes) {
    return (
        db('calendarEvents')
            .where({calendarId, eventsId})
            .update(changes)
    )
} //fix