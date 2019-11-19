const knex = require("knex");
const knexConfig = require("../knexfile");

const config = {
	env: "development",
	secrets: {
		jwt: "iloveLambdaLab17"
	},
	db: knex(knexConfig.development)
};

module.exports = {
	config
};
