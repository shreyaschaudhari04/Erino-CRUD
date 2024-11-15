const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobileNumber:{
        type:Number,
        required:true,
        unique:true
    },
    company:{
        type:String,
        required:true,
    },
    jobTitle:{
        type:String,
        required:true,
    },
});


const users = new mongoose.model("users", userSchema);
module.exports = users;