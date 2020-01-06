const uuidv1 = require("uuid/v1");
exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("calendars")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("calendars").insert([
				{
					calendarName: "Primary",
					calendarDescription: "Default calendar",
					isDefault: true,
					isPrivate: true,
					uuid: uuidv1(),
					calendarColor: "#FFC312"
				},
				{
					calendarName: "Home",
					calendarDescription: "Home calendar",
					isDefault: false,
					isPrivate: true,
					uuid: uuidv1(),
					calendarColor: "#3498db"
				},
				{
					calendarName: "Work",
					calendarDescription: "School calendar",
					isDefault: false,
					isPrivate: true,
					uuid: uuidv1(),
					calendarColor: "#9b59b6"
				},
				{
					calendarName: "Lambda",
					calendarDescription: "Course calendar",
					isDefault: false,
					isPrivate: false,
					uuid: uuidv1(),
					calendarColor: "#34495e"
				},
				{
					calendarName: "Primary",
					calendarDescription: "Default calendar",
					isDefault: true,
					isPrivate: true,
					uuid: uuidv1(),
					calendarColor: "#FFC312"
				}
			]);
		});
};
