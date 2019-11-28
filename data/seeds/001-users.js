const bcrypt = require("bcryptjs");
const uuidv1 = require("uuid/v1");
exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("users")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("users").insert([
				{
					firstName: "Thai",
					lastName: "Nguyen",
					username: "tnguyen",
					email: "tnguyen@email.dev",
					password: bcrypt.hashSync(
						process.env.SEED_PASSWORD || "password",
						10
					),
					isAdmin: 1,
					uuid: uuidv1()
				},
				{
					firstName: "Bob",
					lastName: "Smith",
					username: "bsmith",
					email: "bsmith@email.dev",
					password: bcrypt.hashSync(
						process.env.SEED_PASSWORD || "password",
						10
					),
					isAdmin: 1,
					uuid: uuidv1()
				}
			]);
		});
};
