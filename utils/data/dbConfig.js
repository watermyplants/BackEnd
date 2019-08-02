const knex = require('knex');
const connection = require('../../knexfile');
require('dotenv').config();


const dbEnv= process.env.DB_ENV || 'development'

module.exports = knex(connection[dbEnv]);