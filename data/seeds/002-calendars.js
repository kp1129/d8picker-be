exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("calendars")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("calendars").insert([
				{
					calendarName: "calendar 1"
				},
				{
					calendarName: "calendar 2"
				},
				{
					calendarName: "calendar 3"
				}
			]);
		});
};
