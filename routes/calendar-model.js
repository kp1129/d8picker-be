const db = require("../data/db-config.js"); // Calendar-Modal
const uuidv1 = require("uuid/v1");
module.exports = {
	getByCalendarId,
	getByUsersCalendarsId,
	getByUuid,
	add,
	addDefaultCalendar,
	remove,
	update,
	subscribe,
	unsubscribe
};

function getByCalendarId(calendarId) {
	return db("calendars as c")
		.join("usersCalendars as uc", "c.calendarId", "uc.calendarId")
		.where({ "c.calendarId": calendarId })
		.select(
			"calendarName",
			"calendarDescription",
			"calendarColor",
			"isPrivate",
			"isDefault",
			"uc.isOwner",
			"c.uuid"
		)
		.first();
}

function getByUsersCalendarsId(usersCalendarsId) {
	return db("usersCalendars as uc")
		.join("calendars as c", "uc.calendarId", "c.calendarId")
		.where({ usersCalendarsId })
		.select(
			"calendarName",
			"calendarDescription",
			"calendarColor",
			"isPrivate",
			"isDefault",
			"uc.isOwner",
			"c.uuid"
		)
		.first();
}
function getByUuid(uuid) {
	return db("calendars")
		.where({ uuid })
		.first();
}

function addDefaultCalendar(userId) {
	const calendar = {
		calendarName: "Primary",
		calendarDescription: "Primary calendar",
		calendarColor: "#A35629",
		isDefault: true,
		isPrivate: true,
		uuid: uuidv1()
	};
	return db("calendars")
		.insert(calendar, "calendarId")
		.then(ids => {
			const calendarId = ids[0];
			return db("usersCalendars")
				.insert(
					{ userId, calendarId, isOwner: true, uuid: uuidv1() },
					"usersCalendarsId"
				)
				.then(ids => {
					return ids[0];
				});
		});
}
function add(userId, calendar) {
	calendar.uuid = uuidv1();
	return db("calendars")
		.insert(calendar, "calendarId")
		.then(ids => {
			const calendarId = ids[0];
			return db("usersCalendars")
				.insert(
					{ userId, calendarId, isOwner: true, uuid: uuidv1() },
					"usersCalendarsId"
				)
				.then(ids => {
					return getByUsersCalendarsId(ids[0]);
				});
		});
}

function remove(calendarId) {
	return db("calendars")
		.where({ calendarId })
		.del();
}
function update(calendarId, updated) {
	return db("calendars")
		.where({ calendarId })
		.update(updated)
		.then(update => {
			if (update === 1) {
				return getByCalendarId(calendarId);
			}
		});
}
function subscribe(calendarId, userId) {
	return db("usersCalendars")
		.insert({ calendarId, userId, uuid: uuidv1() }, "usersCalendarsId")
		.then(ids => {
			return getByUsersCalendarsId(ids[0]);
		});
}

function unsubscribe(calendarId, userId) {
	return db("usersCalendars")
		.where({ calendarId, userId })
		.del();
}
