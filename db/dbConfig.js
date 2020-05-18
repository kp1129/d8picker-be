const knex = require('knex');
const config = require('../knexfile');

const env = process.env.DB_ENV || "development";
const env_testing = 'testing';

module.exports = knex(config[env]);
