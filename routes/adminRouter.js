const express = require("express");
const controller =  require("../controllers/api")
const auth = require('../middleware/auth')
const Router = express.Router();

Router.get('/findpagUser', auth.authenticateAdmin,controller.findPagUser);
Router.get('/findOneUser/:id', auth.authenticateAdmin, controller.findOneUser);
Router.delete('/deleteUser/:id', auth.authenticateAdmin , controller.deleteUser);
Router.put('/updateUser/:id',auth.authenticateAdmin, controller.updateUserOrAdmin);

module.exports = Router;