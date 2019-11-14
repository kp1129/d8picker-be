const db = require("../data/db-config.js");

module.exports = {
	get,
	getById,
	add,
	remove,
	update
};

function get(calendarId) {
	return db("calendarEvents")
		.where({ calendarId })
		.join("events", "eventsId", "events.id")
		.select("eventName", "eventInfo");
}
function getAll() { 
    return (
        db('events')
            .select(
                'eventName',
                'eventInfo',
                'startDate',
                'endDate',
                'endTime',
                'isFullDayEvent',
                'isRecurring',
                )
    )
}

function getById(calendarId, eventsId) {
	return db("calendarEvents")
		.where({ calendarId, eventsId })
		.join("events", "eventsId", "events.id")
		.select("eventName", "eventInfo")
		.first();
}

function add(calendarId, event) {
	return db("events")
		.insert(event)
		.then(events => {
			return db("calendarEvents")
				.insert({ calendarid: calendarId, eventsid: events[0] })
				.then(calendarEvent => {
					return getById(calendarId, calendarEvent[0]);
				});
		});
} //fix
function add(calendarId, event) {
    return (
        db("events")
        .insert(event)
        .then(events => {
            return db("calendarEvents")
            .insert({calendarid: calendarId, eventsid: events[0]})
            .then(calendarEvent => {
                return getById(calendarId, calendarEvent[0])
            })
        })
    )
} 

function remove(calendarId, eventsId) {
	return db("calendarEvents")
		.where({ calendarId, eventsId })
		.del();
}


function update(calendarId, eventsId, changes) {
	return db("calendarEvents")
		.where({ calendarId, eventsId })
		.then(calendarEvent => {
			const id = calendarEvent[0].id;
			return db("events")
				.where({ id })
				.update(changes)
				.then(update => {
					return update;
				});
		});
} //fix
