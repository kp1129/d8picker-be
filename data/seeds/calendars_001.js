exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("calendars")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("calendars").insert([
				{
					id: 1,
					calendarName: "calendar 1",
					calendarDescription: "first calendar"
				},
				{
					id: 2,
					calendarName: "calendar 2",
					calendarDescription: "second calendar"
				},
				{
					id: 3,
					calendarName: "calendar 3",
					calendarDescription: "third calendar"
				}
			]);
		});
};
