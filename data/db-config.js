// ./data/dbConfig.js
const knex = require("knex");
const knexConfig = require("../knexfile.js");

const environment = process.env.NODE_ENV || "staging";

module.exports = knex(knexConfig[environment]);
