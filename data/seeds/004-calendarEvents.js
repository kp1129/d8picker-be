exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("calendarEvents")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("calendarEvents").insert([
				{ calendarId: 1, eventsId: 1 },
				{ calendarId: 1, eventsId: 2 },
				{ calendarId: 1, eventsId: 3 },
				{ calendarId: 2, eventsId: 1 },
				{ calendarId: 2, eventsId: 2 },
				{ calendarId: 2, eventsId: 3 },
				{ calendarId: 3, eventsId: 1 },
				{ calendarId: 3, eventsId: 2 },
				{ calendarId: 3, eventsId: 3 }
			]);
		});
};
