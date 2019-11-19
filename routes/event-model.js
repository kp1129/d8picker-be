const db = require("../data/db-config.js");
const uuidv1 = require("uuid/v1");
module.exports = {
	get,
	getByCalendarEventsId,
	getByUuid,
	getById,
	add,
	addCalendarEvents,
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
	return db("calendarEvents")
		.where({ "calendarEvents.id": calendarEventsId })
		.join("events", "calendarEvents.eventsId", "events.id")
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
function add(event) {
	event.uuid = uuidv1();

	return db("events")
		.insert(event)
		.then(eventIds => {
			return eventIds[0];
		});
}

function addCalendarEvents(calendarId, eventId) {
	return db("calendarEvents")
		.insert({ calendarId, eventsId: eventId })
		.then(calendarEventIds => {
			return getByCalendarEventsId(calendarEventIds[0]);
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
