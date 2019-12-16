const db = require("../data/db-config.js");
const uuidv1 = require("uuid/v1");
const moment = require("moment");
module.exports = {
	getUpcoming,
	get,
	getByCalendarsEventsId,
	getByUuid,
	getById,
	add,
	addCalendarsEvents,
	remove,
	update
};

function getUpcoming(userId, limit) {
	const today = moment().format("YYYY-MM-DD");
	return db("calendarsEvents as ce")
		.where("events.startDate", ">=", today)
		.andWhere("uc.userId", userId)
		.join("events", "ce.eventId", "events.eventId")
		.join("calendars as c", "ce.calendarId", "c.calendarId")
		.join("usersCalendars as uc", "c.calendarId", "uc.calendarId")
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
			"events.uuid",
			"rrule"
		)
		.limit(limit)
		.orderBy("events.startDate", "asc");
}

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
			"events.uuid",
			"rrule"
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
			"events.uuid",
			"rrule"
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
			"uuid",
			"rrule"
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
			"uuid",
			"rrule"
		)
		.first();
}
function add(event) {
	event.uuid = uuidv1();
	event.endDate = event.isAllDayEvent
		? moment(event.endDate)
				.add(1, "days")
				.format()
		: event.endDate;
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
