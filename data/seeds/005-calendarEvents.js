exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("calendarEvents")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("calendarEvents").insert([
				{ calendarId: 1, eventId: 1 },
				{ calendarId: 1, eventId: 2 },
				{ calendarId: 1, eventId: 3 }
			]);
		});
};
