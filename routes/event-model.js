const db = require("../data/db-config.js");
const uuidv1 = require("uuid/v1");

module.exports = {
	get,
	getByCalendarsEventsId,
	getByUuid,
	getById,
	add,
	addCalendarsEvents,
	remove,
	update
};

function get(calendarId) {
	return db("calendarsEvents as ce")
		.where({ "ce.calendarId": calendarId })
		.join("events", "ce.eventId", "events.eventId")
		.join("calendars as c", "ce.calendarId", "c.calendarId")
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
			"c.isPrivate",
			"c.calendarColor",
			"events.uuid"
		);
}

function getByCalendarsEventsId(calendarsEventsId) {
	return db("calendarsEvents")
		.where({ "calendarsEvents.calendarsEventsId": calendarsEventsId })
		.join("events", "calendarsEvents.eventId", "events.eventId")
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
			"isPrivate",
			"eventColor",
			"events.uuid"
		)
		.first();
}
function getById(eventId) {
	return db("events")
		.where({ eventId })
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
			"isPrivate",
			"uuid"
		)
		.first();
}
function getByUuid(uuid) {
	return db("events")
		.where({ uuid })
		.select(
			"eventId",
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
			"isPrivate",
			"uuid"
		)
		.first();
}
function add(event) {
	event.uuid = uuidv1();
	return db("events")
		.insert(event, "eventId")
		.then(ids => {
			return ids[0];
		});
}

function addCalendarsEvents(calendarId, eventId) {
	const uuid = uuidv1();
	return db("calendarsEvents")
		.insert({ calendarId, eventId, uuid }, "calendarsEventsId")
		.then(calendarsEventIds => {
			return getByCalendarsEventsId(calendarsEventIds[0]);
		});
}

function remove(eventId) {
	return db("events")
		.where({ eventId })
		.del();
}

function update(eventId, changes) {
	return db("events")
		.where({ eventId })
		.update(changes)
		.then(update => {
			if (update === 1) {
				return getById(eventId);
			}
		});
}
