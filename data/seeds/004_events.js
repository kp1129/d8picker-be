const uuidv1 = require("uuid/v1");
const moment = require("moment");

exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("events")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("events").insert([
				{
					eventTitle: "Team Standup",
					eventNote: "Discussing team performance.",
					eventLocation: "The Quad",
					startDate: moment().format("YYYY-MM-DD"),
					endDate: moment()
						.add(1, "days")
						.format("YYYY-MM-DD"),
					startTime: moment()
						.startOf("hour")
						.toISOString(true),
					endTime: moment()
						.startOf("hour")
						.add(2, "hours")
						.toISOString(true),
					isAllDayEvent: false,
					isRepeatingEvent: true,
					uuid: uuidv1()
				},
				{
					eventTitle: "Fundraising Plan",
					eventNote: "Planning fundraising in nearby shopping malls.",
					eventLocation: "Building 1A, Birmingham HS",
					startDate: moment()
						.add(7, "days")
						.format("YYYY-MM-DD"),
					endDate: moment()
						.add(7, "days")
						.format("YYYY-MM-DD"),
					startTime: moment()
						.startOf("hour")
						.subtract(3, "hours")
						.toISOString(true),
					endTime: moment()
						.startOf("hour")
						.subtract(2, "hours")
						.toISOString(true),
					isAllDayEvent: false,
					isRepeatingEvent: true,
					uuid: uuidv1()
				},
				{
					eventTitle: "Regular Zoom conference",
					eventNote: "Discussing players training plan.",
					eventLocation: "Online",
					startDate: moment()
						.add(1, "months")
						.format("YYYY-MM-DD"),
					endDate: moment()
						.add(1, "months")
						.format("YYYY-MM-DD"),
					startTime: moment()
						.startOf("hour")
						.add(1, "months")
						.toISOString(true),
					endTime: moment()
						.startOf("hour")
						.add(1, "months")
						.toISOString(true),
					isAllDayEvent: false,
					isRepeatingEvent: true,
					uuid: uuidv1()
				}
			]);
		});
};
