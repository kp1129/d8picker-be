exports.up = function(knex) {
	return knex.schema
		.createTable("users", table => {
			table.increments("userId").primary();
			table
				.string("username", 255)
				.notNullable()
				.unique();
			table.string("firstName", 255);
			table.string("lastName", 255);
			table
				.string("email")
				.notNullable()
				.unique();
			table.string("password", 255).notNullable();
			table.integer("phoneNumber");
			table
				.boolean("isAdmin")
				.notNullable()
				.defaultTo(true);
			table
				.string("uuid", 255)
				.notNullable()
				.unique();
			table.timestamps(true, true);
		})
		.createTable("calendars", table => {
			table.increments("calendarId").primary();
			table.string("calendarName", 255);
			table.string("calendarDescription", 255);
			table.string("calendarColor", 255).defaultTo("#A35629");
			table.boolean("isPrivate").defaultTo(true);
			table.boolean("isDefault").defaultTo(false);
			table
				.string("uuid")
				.notNullable()
				.unique();
			table.timestamps(true, true);
		})
		.createTable("usersCalendars", table => {
			table.increments("usersCalendarsId").primary();
			table
				.integer("userId")
				.unsigned()
				.references("userId")
				.inTable("users")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			table
				.integer("calendarId")
				.unsigned()
				.references("calendarId")
				.inTable("calendars")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			table.boolean("isOwner").defaultTo(false);
			table
				.string("uuid")
				.notNullable()
				.unique();
			table.timestamps(true, true);
		})
		.createTable("events", table => {
			table.increments("eventId").primary();
			table.string("eventTitle", 255).notNullable();
			table.string("eventNote", 255).notNullable();
			table.string("eventLocation", 255);
			table.string("timeZone", 255);
			table.date("startDate").notNullable();
			table.date("endDate").notNullable();
			table.timestamp("startTime");
			table.timestamp("endTime");
			table
				.boolean("isAllDayEvent")
				.notNullable()
				.defaultTo(false);
			table
				.boolean("isRepeatingEvent")
				.notNullable()
				.defaultTo(false);
			table.string("rrule");
			table.string("eventColor").defaultTo("#1A73E8");
			table.boolean("isPrivate").defaultTo(true);
			table
				.string("uuid")
				.notNullable()
				.unique();
			table.timestamps(true, true);
		})
		.createTable("calendarsEvents", table => {
			table.increments("calendarsEventsId").primary();
			table
				.integer("calendarId")
				.unsigned()
				.references("calendarId")
				.inTable("calendars")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			table
				.integer("eventId")
				.unsigned()
				.references("eventId")
				.inTable("events")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			table
				.string("uuid")
				.notNullable()
				.unique();
			table.timestamps(true, true);
		});
};
exports.down = function(knex) {
	return knex.schema
		.dropTableIfExists("calendarsEvents")
		.dropTableIfExists("events")
		.dropTableIfExists("usersCalendars")
		.dropTableIfExists("calendars")
		.dropTableIfExists("users");
};
