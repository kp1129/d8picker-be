const db = require("../data/db-config.js"); // Calendar-Modal
const uuidv1 = require("uuid/v1");
module.exports = {
	get,
	getById,
	getByUuid,
	add,
	addDefaultCalendar,
	remove,
	update
};

function get() {
	return db("calendars").select("calendarName");
}
function getById(id) {
	return db("calendars")
		.where({ id })
		.first();
}

function getByUuid(uuid) {
	return db("calendars")
		.where({ uuid })
		.first();
}

function addDefaultCalendar(adminId) {
	const calendar = {
		calendarName: "Calendar",
		calendarDescription: "Default calendar",
		calendarColor: "#A35629",
		uuid: uuidv1()
	};
	return db("calendars")
		.insert(calendar)
		.then(ids => {
			const calendarId = ids[0];
			return db("adminCalendars")
				.insert({ adminId, calendarId })
				.then(ids => {
					return ids[0];
				});
		});
}
function add(calendar) {
	return db("calendars")
		.insert(calendar)
		.then(ids => {
			return getById(ids[0]);
		});
}
function remove(id) {
	return db("calendars")
		.where({ id })
		.del();
}
function update(id, updated) {
	return db("calendars")
		.where({ id })
		.update(updated);
}
