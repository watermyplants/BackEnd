const express = require('express');
const server = express();
const cors = require('cors');

const UserRouter = require('../utils/resources/users/users-router');



server.use(cors())
server.use('/', UserRouter);











module.exports = server;