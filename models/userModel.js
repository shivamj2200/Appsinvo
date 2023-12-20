const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        firstName:{
            type : String,
            required : false,
        },
        lastName:{
            type : String,
            required : false,
        },
        email:{
            type:String,
            unique:true,
            required:true,
        },
        password:{
            type: String,
            required: false,
        },
        phone:{
           type:"string",
           required:false
        },
        google_id :{
               type:String,
               requird:false
        },
        apple_id:{
            type:String,
            requird:false
        },
        facebook_id:{
            type:String,
            requird:false
        },
        userType: {
            type: String,
            required: false,
            enum: ["admin", "user"],
            default: "user",
          },
    },
      {
        timestamps: true,
      }
)
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;