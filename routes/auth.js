const express = require('express');
const { register, login } = require('../controller/auth');
const Router = express.Router();





Router.route("/register").post(register)
Router.route("/login").post(login)


module.exports = Router;