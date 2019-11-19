const db = require("../data/db-config.js");
const uuidv1 = require("uuid/v1");
module.exports = {
	get,
	getByCalendarEventsId,
	getByUuid,
	getById,
	add,
	remove,
	update
};

function get(calendarId) {
	return db("calendarEvents")
		.where({ calendarId })
		.join("events", "eventsId", "events.id")
		.select(
			"eventTitle",
			"eventNote",
			"eventLocation",
			"startDate",
			"endDate",
			"startTime",
			"endTime",
			"isAllDayEvent",
			"isRepeatingEvent",
			"eventColor",
			"uuid"
		);
}

function getByCalendarEventsId(calendarEventsId) {
	return db("calendarEvents as ce")
		.where({ "ce.id": calendarEventsId })
		.join("events", "ce.eventsId", "events.id")
		.select(
			"eventTitle",
			"eventNote",
			"eventLocation",
			"startDate",
			"endDate",
			"startTime",
			"endTime",
			"isAllDayEvent",
			"isRepeatingEvent",
			"eventColor",
			"uuid"
		)
		.first();
}
function getById(id) {
	return db("events")
		.where({ id })
		.select(
			"eventTitle",
			"eventNote",
			"eventLocation",
			"startDate",
			"endDate",
			"startTime",
			"endTime",
			"isAllDayEvent",
			"isRepeatingEvent",
			"eventColor",
			"uuid"
		)
		.first();
}
function getByUuid(uuid) {
	return db("events")
		.where({ uuid })
		.select(
			"id",
			"eventTitle",
			"eventNote",
			"eventLocation",
			"startDate",
			"endDate",
			"startTime",
			"endTime",
			"isAllDayEvent",
			"isRepeatingEvent",
			"eventColor",
			"uuid"
		)
		.first();
}
function add(calendarId, event) {
	event.uuid = uuidv1();

	return db("events")
		.insert(event)
		.then(events => {
			return db("calendarEvents")
				.insert({ calendarId: calendarId, eventsId: events[0] })
				.then(calendarEvents => {
					return getByCalendarEventsId(calendarEvents[0]);
				});
		});
}

function remove(eventId) {
	return db("events")
		.where({ id: eventId })
		.del();
}

function update(eventId, changes) {
	return db("events")
		.where({ id: eventId })
		.update(changes)
		.then(update => {
			if (update === 1) {
				return getById(eventId);
			}
		});
}
