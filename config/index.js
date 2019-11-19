const { merge } = require("lodash");

const env = process.env.NODE || "development";

const baseConfig = {
	env,
	port: 4000,
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
