const bcrypt = require("bcryptjs");
const uuidv1 = require("uuid/v1");
const config = require("../../config");
const { seedPassword } = config;
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
					password: bcrypt.hashSync(seedPassword, 10),
					isAdmin: 1,
					uuid: uuidv1(),
					externalType: "native"
				},
				{
					firstName: "Bob",
					lastName: "Smith",
					username: "bsmith",
					email: "bsmith@email.dev",
					password: bcrypt.hashSync(seedPassword, 10),
					isAdmin: 1,
					uuid: uuidv1(),
					externalType: "native"
				}
			]);
		});
};
