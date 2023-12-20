const express = require("express");
const admin = require('./adminRouter')
const users = require('./userRouter')
const products = require('./productRouter')
const socialLogin = require('./socialRouter')
const Router = express.Router();
Router.use('/userOrAdmin', users)
Router.use('/admin', admin);
Router.use('/product',products)
Router.use('/socialApi',socialLogin)
module.exports = Router;
// const controller =  require("../controllers/api")
//userAndAdmin
// Router.post('/registerUser', controller.registerUser);
// Router.post('/login', controller.login);
// Router.get('/findAllUser', controller.findAllUser);
//onlyAdmin
// Router.get('/findpagUser', auth.authenticateAdmin,controller.findPagUser);
// Router.get('/findOneUser/:id', auth.authenticateAdmin, controller.findOneUser);
// Router.delete('/deleteUser/:id', auth.authenticateAdmin , controller.deleteUser);
// Router.put('/updateUser/:id',auth.authenticateAdmin, controller.updateUserOrAdmin);
//for product crud 
// Router.post('/add', controller.addProduct);
// Router.delete('/delete/:id', controller.deleteProduct);
// Router.get('/getAllProduct', controller.ReadAllProduct);
// Router.put('/updateProduct', controller.UpdateAllProduct)
//Sociallogin
// Router.post('/socialLogin',controller.socialLogin)

