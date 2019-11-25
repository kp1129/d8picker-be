const db = require("../data/db-config.js"); // Calendar-Modal
const uuidv1 = require("uuid/v1");
module.exports = {
	getByCalendarId,
	getByUuid,
	add,
	addDefaultCalendar,
	remove,
	update
};

function getByCalendarId(calendarId) {
	return db("calendars")
		.where({ calendarId })
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
				.insert({ userId, calendarId, uuid: uuidv1() }, "usersCalendarsId")
				.then(ids => {
					return ids[0];
				});
		});
}
function add(calendar) {
	return db("calendars")
		.insert(calendar, "calendarId")
		.then(ids => {
			return getById(ids[0]);
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
		.update(updated);
}
