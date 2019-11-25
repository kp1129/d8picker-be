exports.up = function(knex) {
	return knex.schema.createTable("invitations", table => {
		table.increments("invitationId").primary();
		table.integer("userId");
		table
			.foreign("userId")
			.references("userId")
			.inTable("users")
			.onDelete("CASCADE")
			.onUpdate("CASCADE");
		table
			.string("invitationCode")
			.notNullable()
			.unique();
		table
			.boolean("isUsed")
			.notNullable()
			.defaultTo(0);
		table
			.string("uuid")
			.notNullable()
			.unique();
		table.timestamps(true, true);
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists("invitations");
};
