exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("adminCalendars")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("adminCalendars").insert([
				{ adminId: 1, calendarId: 1 },
				{ adminId: 1, calendarId: 2 },
				{ adminId: 1, calendarId: 3 }
			]);
		});
};
