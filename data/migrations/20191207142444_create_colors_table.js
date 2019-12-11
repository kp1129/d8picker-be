exports.up = function(knex) {
	return knex.schema.createTable("colors", table => {
		table.increments("colorId").primary();
		table
			.string("color")
			.unique()
			.notNullable();
		table
			.string("uuid")
			.unique()
			.notNullable();
		table.timestamps(true, true);
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists("colors");
};
