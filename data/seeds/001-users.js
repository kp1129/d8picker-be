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
					name: "Bob Smith",
					firstName: "Bob",
					lastName: "Smith",
					username: "bsmith",
					email: "bsmith@email.dev",
					password: bcrypt.hashSync("password", 10),
					isAdmin: 1,
					uuid: uuidv1()
				}
			]);
		});
};
