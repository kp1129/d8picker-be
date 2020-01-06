require("dotenv").config();
const knex = require("knex");
const knexConfig = require("../knexfile");

const config = {
	env: "development",
	db: knex(knexConfig.development)
};

module.exports = {
	config
};
