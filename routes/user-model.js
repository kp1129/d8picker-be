const db = require("../data/db-config.js");

module.exports = {
	add,
	get,
	getCalendars,
	getDefaultCalendar,
	getByUserId,
	getBy,
	getByUuid,
	update,
	remove,
	find
};

function get() {
	return db("users").select(
		"id",
		"username",
		"firstName",
		"lastName",
		"email",
		"phone",
		"password",
		"isAdmin",
		"uuid"
	);
}
function getCalendars(userId) {
	return db("users as u")
		.join("usersCalendars as uc", "uc.userId", "u.userId")
		.join("calendars as c", "c.calendarId", "uc.calendarId")
		.select(
			"c.calendarName",
			"c.calendarDescription",
			"c.calendarColor",
			"c.isPrivate",
			"c.isDefault",
			"uc.isOwner",
			"c.uuid"
		)
		.where({ "u.userId": userId })
		.then(calendars => {
			return calendars;
		});
}

function getDefaultCalendar(userId) {
	return db("users as u")
		.join("usersCalendars as uc", "uc.userId", "u.userId")
		.join("calendars as c", "c.calendarId", "uc.calendarId")
		.select(
			"c.calendarName",
			"c.calendarDescription",
			"c.calendarColor",
			"c.isPrivate",
			"c.isDefault",
			"c.uuid"
		)
		.where({ "u.userId": userId, "c.isDefault": true })
		.then(calendars => {
			return calendars;
		});
}

function getBy(filter) {
	return db("users").where(filter);
}

function getByUuid(uuid) {
	return db("users")
		.where({ uuid })
		.first();
}

function find(userId) {
	return db("users")
		.where(function() {
			this.where("username", "=", userId).orWhere("email", "=", userId);
		})
		.first();
}
function add(user) {
	return db("users")
		.insert(user, "userId")
		.then(userIds => {
			return getByUserId(userIds[0]);
		});
}
function getByUserId(userId) {
	return db("users")
		.where({ userId })
		.first();
}

function update(changes, id) {
	return db("users")
		.where("id", id)
		.update(changes)
		.then(count => {
			count > 0 ? this.get(id) : null;
		});
}
function remove(id) {
	return db("users")
		.where("id", id)
		.del();
}
