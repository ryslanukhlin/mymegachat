const Router = require('express').Router();
const registerController = require('../controller/registerController');
const loginController = require('../controller/loginController');
const registerValidate = require('./validate/registerValidate');

Router.post('/register', registerValidate, registerController);
Router.post('/login', loginController);

module.exports = Router;