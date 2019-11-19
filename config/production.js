const knex = require("knex");
const knexConfig = require("../knexfile");

const config = {
	env: "production",
	port: process.env.PORT,
	seedPassword: process.env.SEED_PASSWORD,
	db: knex(knexConfig.production)
};

module.exports = {
	config
};
