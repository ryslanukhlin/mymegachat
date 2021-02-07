const Router = require('express').Router();
const { getUsers } = require('../controller/userController');

Router.post('/users', getUsers);

module.exports = Router;