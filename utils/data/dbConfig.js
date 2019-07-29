const knex = require('knex');
const connection = require('../../knexfile');

const dbEnv= process.env.DB_ENV || 'development'

module.exports = knex(connection[dbEnv]);