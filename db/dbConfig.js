const knex = require('knex');
const config = require('../knexfile');
require("dotenv").config();

const env = process.env.DB_ENV || "development";

module.exports = knex(config[env]);
