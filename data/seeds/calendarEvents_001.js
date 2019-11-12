exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("calendarEvents")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("calendarEvents").insert([
				{ id: 1, calendarId: 1, eventsId: 1 },
				{ id: 2, calendarId: 1, eventsId: 2 },
				{ id: 3, calendarId: 1, eventsId: 3 },
				{ id: 4, calendarId: 2, eventsId: 1 },
				{ id: 5, calendarId: 2, eventsId: 2 },
				{ id: 6, calendarId: 2, eventsId: 3 },
				{ id: 7, calendarId: 3, eventsId: 1 },
				{ id: 8, calendarId: 3, eventsId: 2 },
				{ id: 9, calendarId: 3, eventsId: 3 }
			]);
		});
};
