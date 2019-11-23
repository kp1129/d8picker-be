const uuidv1 = require("uuid/v1");
exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("usersCalendars")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("usersCalendars").insert([
				{ userId: 1, calendarId: 1, isOwner: true, uuid: uuidv1() },
				{ userId: 1, calendarId: 2, isOwner: true, uuid: uuidv1() },
				{ userId: 1, calendarId: 3, isOwner: true, uuid: uuidv1() },
				{ userId: 1, calendarId: 4, isOwner: true, uuid: uuidv1() }
			]);
		});
};
