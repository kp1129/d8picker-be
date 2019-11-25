exports.up = function(knex) {
	return knex.schema
		.createTable("users", table => {
			table.increments().primary();
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
				.unique()
				.defaultTo(1);
			table.timestamps(true, true);
		})
		.createTable("calendars", table => {
			table.increments().primary();
			table.string("calendarName", 255);
			table.string("calendarDescription", 255);
			table.string("calendarColor", 255).defaultTo("#A35629");
			table.boolean("isPrivate").defaultTo(true);
			table.boolean("isDefault").defaultTo(false);
			table.string("uuid");
			table.timestamps(true, true);
		})
		.createTable("userCalendars", table => {
			table.increments().primary();
			table
				.integer("userId")
				.unsigned()
				.references("id")
				.inTable("users")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			table
				.integer("calendarId")
				.unsigned()
				.references("id")
				.inTable("calendars")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			table.timestamps(true, true);
		})
		.createTable("adminCalendars", table => {
			table.increments().primary();
			table
				.integer("adminId")
				.unsigned()
				.references("id")
				.inTable("users")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			table
				.integer("calendarId")
				.unsigned()
				.references("id")
				.inTable("calendars")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			table.timestamps(true, true);
		})
		.createTable("events", table => {
			table.increments().primary();
			table.string("eventTitle", 255).notNullable();
			table.string("eventNote", 255).notNullable();
			table.string("eventLocation", 255);
			table.string("timeZone", 255);
			table
				.date("startDate")
				.notNullable()
				.defaultTo(knex.fn.now());
			table
				.date("endDate")
				.notNullable()
				.defaultTo(knex.fn.now());
			table
				.timestamp("startTime")
				.notNullable()
				.defaultTo(knex.fn.now());
			table
				.timestamp("endTime")
				.notNullable()
				.defaultTo(knex.fn.now());
			table
				.boolean("isAllDayEvent")
				.notNullable()
				.defaultTo(false);
			table
				.boolean("isRepeatingEvent")
				.notNullable()
				.defaultTo(false);
			table.string("recurrence");
			table.string("eventColor").defaultTo("#1A73E8");
			table.string("uuid");
			table.timestamps(true, true);
		})
		.createTable("calendarEvents", table => {
			table.increments().primary();
			table
				.integer("calendarId")
				.unsigned()
				.references("id")
				.inTable("calendars")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			table
				.integer("eventId")
				.unsigned()
				.references("id")
				.inTable("events")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			table.timestamps(true, true);
		});
};
exports.down = function(knex) {
	return knex.schema
		.dropTableIfExists("calendarEvents")
		.dropTableIfExists("events")
		.dropTableIfExists("adminCalendars")
		.dropTableIfExists("userCalendars")
		.dropTableIfExists("calendars")
		.dropTableIfExists("users");
};
