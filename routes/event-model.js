const db = require("../data/db-config.js");
const uuidv1 = require("uuid/v1");
module.exports = {
	get,
	getById,
	getByUuid,
	add,
	remove,
	update
};

function get(uuid) {
	return db("calendars")
		.where({ "calendars.uuid": uuid })
		.join(
			"calendarsEvents",
			"calendars.calendarId",
			"calendarsEvents.calendarId"
		)
		.join("events", "calendarsEvents.eventId", "events.eventId")
		.select(
			"eventName",
			"eventInfo",
			"startDate",
			"endDate",
			"startTime",
			"endTime",
			"isFullDayEvent",
			"isRecurringEvent",
			"events.uuid"
		);
}

function getByUuid(uuid) {
	return db("events")
		.where({ uuid })
		.select(
			"eventName",
			"eventInfo",
			"startDate",
			"endDate",
			"startTime",
			"endTime",
			"isFullDayEvent",
			"isRecurringEvent",
			"events.uuid"
		)
		.first();
}

function getById(calendarsEventsId) {
	return db("calendarsEvents")
		.where({ calendarsEventsId })
		.join("events", "calendarsEvents.eventId", "events.eventId")
		.select(
			"eventName",
			"eventInfo",
			"startDate",
			"endDate",
			"startTime",
			"endTime",
			"isFullDayEvent",
			"isRecurringEvent",
			"calendarsEvents.uuid as calendarsEventsUUID"
		)
		.first();
}

function add(calendarId, event) {
	event.uuid = uuidv1();
	return db("events")
		.insert(event)
		.then(events => {
			return db("calendarsEvents")
				.insert({
					calendarId,
					eventId: events[0],
					uuid: uuidv1()
				})
				.then(calendarEvent => {
					return getById(calendarEvent[0]);
				});
		});
}

function remove(uuid) {
	return db("events")
		.where({ uuid })
		.del();
}

function update(uuid, changes) {
	return db("events")
		.where({ uuid })
		.update(changes)
		.then(update => {
			return update;
		});
} //fix
