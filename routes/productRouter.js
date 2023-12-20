const express = require("express");
const controller =  require("../controllers/api")
const Router = express.Router();
Router.post('/add', controller.addProduct);
Router.delete('/delete/:id', controller.deleteProduct);
Router.get('/getAllProduct', controller.ReadAllProduct);
Router.put('/updateProduct/:id', controller.UpdateAllProduct)
module.exports =  Router;