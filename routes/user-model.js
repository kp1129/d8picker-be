const db = require("../data/db-config.js");

module.exports = {
	add,
	get,
	getCalendars,
	getDefaultCalendar,
	getById,
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
		.join("adminCalendars as ac", "ac.adminId", "u.id")
		.join("calendars as c", "c.id", "ac.calendarId")
		.select(
			"c.calendarName",
			"c.calendarDescription",
			"c.calendarColor",
			"c.isPrivate",
			"c.isDefault",
			"c.uuid"
		)
		.where({ "u.id": userId, "c.isDefault": true })
		.then(calendars => {
			return calendars[0];
		});
}

function getDefaultCalendar(userId) {
	return db("users as u")
		.join("adminCalendars as ac", "ac.adminId", "u.id")
		.join("calendars as c", "c.id", "ac.calendarId")
		.select(
			"c.calendarName",
			"c.calendarDescription",
			"c.calendarColor",
			"c.isPrivate",
			"c.isDefault",
			"c.uuid"
		)
		.where("u.id", userId)
		.then(calendars => {
			return calendars;
		});
}

function getCalendars(userId) {
	return db("users as u")
		.join("adminCalendars as ac", "ac.adminId", "u.id")
		.join("calendars as c", "c.id", "ac.calendarId")
		.select(
			"c.calendarName",
			"c.calendarDescription",
			"c.calendarColor",
			"c.isPrivate",
			"c.isDefault",
			"c.uuid"
		)
		.where("u.id", userId)
		.then(calendars => {
			return calendars;
		});
}
function getBy(filter) {
	return db("users").where(filter);
}

function getByUuid(uuid) {
	return db("users")
		.where(uuid)
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
		.insert(user, "id")
		.then(ids => {
			return getById(ids[0]);
		});
}
function getById(id) {
	return db("users")
		.where({ id })
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
