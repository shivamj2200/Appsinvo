const jwt = require('jsonwebtoken')
const db  = require("../models/userModel");
const { userTypes } = require("../config/userTypeConstant");


const authenticateAdmin = async(req,res,next) => {
    try {
        if (!req.headers["authorization"]) {
          throw new Error("There is no authorization token");
        }
        // get token from header
        let token = req.headers["authorization"].split(" ")[1];
        // console.log(token)
        let verfiedToken = jwt.verify(token, process.env.ACCESS_SEKRET_KEY);
        //  console.log(verfiedToken)
        // if token verfied
        if (verfiedToken.data.type === userTypes.ADMIN) {
          let user = await db.findById(verfiedToken.data.id);
          if (user) {
            req.user = verfiedToken.data;
            next();
          } else {
            throw new Error("User not found");
          }
        } else {
          throw new Error("You are not authenticated user");
        }
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            message: err.name
          })
        }
        return res.status(400).json({
          message: err.message,
        });
      }
}

const authenticateUser = async(req,res,next)=>{
    try {
        if (!req.headers["authorization"]){
          throw new Error("There is no authorization token");
        }
        // get token from header
        let token = req.headers["authorization"].split(" ")[1];
    
        let verfiedToken = jwt.verify(token, process.env.ACCESS_SEKRET_KEY);
    
        // if token verfied
        if (verfiedToken.data.type === userTypes.USER) {
          let user = await db.findById(verfiedToken.data.id);
          if (user) {
            req.user = verfiedToken.data;
            next();
          } else {
            throw new Error("User not found");
          }
        } else {
          throw new Error("You are not authenticated user");
        }
      } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                message: err.name
            })
        }
        return res.status(400).json({
          message: err.message,
        });
      }
}

const authenticatedBoth =  async(req,res,next)=>{
    try {
        if (!req.headers["authorization"]) {
          throw new Error("There is no authorization token");
        }
        // get token from header
        let token = req.headers["authorization"].split(" ")[1];
    
        let verfiedToken = jwt.verify(token, process.env.ACCESS_SEKRET_KEY);
    
        // if token verfied
        if (
          verfiedToken.data.type === userTypes.ADMIN ||
          verfiedToken.data.type === userTypes.USER
        ) {
          let user = await db.findById(verfiedToken.data.id);
          if (user) {
            req.user = verfiedToken.data;
            next();
          } else {
            throw new Error("User not found");
          }
        } else {
          throw new Error("You are not authenticated user");
        }
      } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                message: err.name
            })
        }
        return res.status(400).json({
          message: err.message,
        });
      }
}
module.exports = {
    authenticateAdmin,
    authenticateUser,
    authenticatedBoth
}