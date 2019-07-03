const mongoose = require("mongoose");

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true, // remove space from end & an begining if have
        required:true,
        maxlength:35,
        unique:true
    },
},{timestamps:true});

module.exports= mongoose.model("Category",categorySchema);