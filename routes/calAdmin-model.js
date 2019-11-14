const db = require("../data/db-config.js");

module.exports = {
	get,
	getById,
	add,
	remove,
	update
};

function get(calendarId) {
	return db("adminCalendars")
		.where({ calendarId })
		.join("users", "adminId", "users.id")
		.select("name", "username", "email", "phone");
}

function getByIds(calendarId, adminId) {
	return db("adminCalendars")
		.where({ calendarId, adminId })
		.join("users", "adminId", "users.id")
		.select("name", "username", "email", "phone")
		.first();
}

function getById(id) {
	return db("adminCalendars")
		.where({ id })
		.first();
}

function add(calendarId, userId) {
	console.log("Cal Id", calendarId);
	return db("adminCalendars")
		.insert({ calendarId, adminId: userId })
		.then(ids => {
			return getById(ids[0]);
		});
}

function remove(calendarId, adminId) {
	return db("adminCalendars")
		.where({ calendarId, adminId })
		.del();
}

function update(calendarId, adminId, changes) {
	return db("adminCalendars")
		.where({ calendarId, adminId })
		.then(adminCalendar => {
			const id = adminCalendar[0].id;
			return db("users")
				.where({ id })
				.update(changes)
				.then(update => {
					return update;
				});
		});
}
