const mongoose = require("mongoose");
const {ObjectId}=mongoose.Schema;
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true, // remove space from end & an begining if have
        required:true,
        maxlength:35
    },
    description:{
        type:String,
        required:true,
        maxlength:3000
    },
    price:{
        type:Number,
        trim:true,
        required:true,
        maxlength:35
    },
    category:{
        type:ObjectId,
        ref:'Category',
        required:true
    },
    quantity:{
        type:Number,
        default:50
    },
    sold:{
        type:Number,
        default:0
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    shipping:{
        required:false,
        type:Boolean
    }
    
},{timestamps:true});

module.exports= mongoose.model("Product",productSchema);