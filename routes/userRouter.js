const express = require("express");
const controller =  require("../controllers/api")
const Router = express.Router();
//userAndAdmin
Router.post('/registerUser', controller.registerUser);
Router.post('/login', controller.login);
Router.get('/findAllUser', controller.findAllUser);
module.exports = Router;