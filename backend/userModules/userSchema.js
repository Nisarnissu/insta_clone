const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    image:{
        type:Buffer,
        require:true
    },
    date:{
        type:Date,
        default:Date.now() 
    }

});

module.exports = mongoose.model("upload",userModel)