const { merge } = require("lodash");

const env = process.env.NODE_ENV || "development";

const baseConfig = {
	env,
	port: 4000,
	googleClientId: process.env.GOOGLE_CLIENT_ID,
	seedPassword: process.env.SEED_PASSWORD,
	secrets: {
		jwt: process.env.JWT_SECRET,
		jwtExp: "6h"
	}
};

let envConfig = {};

switch (env) {
	case "development":
		envConfig = require("./development").config;
		break;
	case "production":
		envConfig = require("./production").config;
		break;
	default:
		envConfig = require("./development").config;
}

module.exports = merge(baseConfig, envConfig);
