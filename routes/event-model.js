const db = require('../data/db-config.js');

module.exports = {
    get,
    getById,
    add,
    remove, 
    update,
    getEventById
}

function get(calendarId) { 
    return (
        db('calendarEvents')
            .where({calendarId})
            .join('events', 'eventsId', 'events.id')
            .select('eventName', 'eventInfo')
    )
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
function getEventById(id){
    return (
        db('events')
        .where({ id })
        .first()
    )
}

function add(event) {
    return db('events')
            .insert(event, 'id')
            .then(ids => {
                const [id] = ids
                return getEventById(id)
            })
    
        // db('calendarEvents')
        //     .where({ calendarId })
        //     .insert(event)
        // db('events')
        //     .insert(event)
        //     // .then(res => {
        //     //     db('calendarEvents')
        //     //         .where({calendarId})
        //     // })
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