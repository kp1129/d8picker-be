exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("events")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("events").insert([
				{ eventName: "event 1", eventInfo: "first event" },
				{ eventName: "event 2", eventInfo: "second event" },
				{ eventName: "event 3", eventInfo: "third event" }
			]);
		});
};
