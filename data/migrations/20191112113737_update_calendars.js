exports.up = function(knex) {
	return knex.schema.table("calendars", table => {
		table.boolean("isPrivate").defaultTo(0);
		table.string("uuid");
	});
};

exports.down = function(knex) {
	return knex.schema.table("calendars", table => {
		table.dropColumn("isPrivate");
		table.dropColumn("uuid");
	});
};
