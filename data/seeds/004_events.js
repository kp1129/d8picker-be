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
					eventTitle: "Partial Team Standup",
					eventNote: "Discussing team performance.",
					eventLocation: "The Quad",
					startDate: moment()
						.days(1)
						.format("YYYY-MM-DD"),
					endDate: moment()
						.days(1)
						.format("YYYY-MM-DD"),
					startTime: moment()
						.days(1)
						.hours(9)
						.minutes(0)
						.seconds(0)
						.toISOString(true),
					endTime: moment()
						.days(1)
						.hours(10)
						.minutes(15)
						.seconds(0)
						.toISOString(true),
					isAllDayEvent: false,
					isRepeatingEvent: false,
					isPrivate: true,
					uuid: uuidv1()
				},
				{
					eventTitle: "All Day Fundraising",
					eventNote: "Planning fundraising in nearby shopping malls.",
					eventLocation: "Building 1A, Birmingham HS",
					startDate: moment()
						.days(3)
						.format("YYYY-MM-DD"),
					endDate: moment()
						.days(4)
						.format("YYYY-MM-DD"),
					isAllDayEvent: true,
					isRepeatingEvent: false,
					isPrivate: true,
					uuid: uuidv1()
				},
				{
					eventTitle: "Recurring conference",
					eventNote: "Discussing players training plan.",
					eventLocation: "Online",
					startDate: moment()
						.days(4)
						.format("YYYY-MM-DD"),
					endDate: moment()
						.days(4, "days")
						.format("YYYY-MM-DD"),
					startTime: moment()
						.days(4)
						.hours(13)
						.minutes(0)
						.seconds(0)
						.toISOString(true),
					endTime: moment()
						.days(4)
						.hours(14)
						.minutes(0)
						.seconds(0)
						.toISOString(true),
					isAllDayEvent: false,
					isRepeatingEvent: true,
					isPrivate: true,
					uuid: uuidv1(),
					rrule:
						"DTSTART:20191219T130000 RRULE:FREQ=WEEKLY;COUNT=10;INTERVAL=1;WKST=SU;UNTIL=20200119T130000"
				}
			]);
		});
};
