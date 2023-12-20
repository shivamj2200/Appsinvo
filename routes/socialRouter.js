const express = require("express");
const controller =  require("../controllers/api")
const Router = express.Router();

Router.post('/socialLogin',controller.socialLogin)
module.exports = Router;