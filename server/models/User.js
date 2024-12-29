const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
    }, 
    token:{
        type:String,
    },
    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task"
    }]
},{timestamps:true})

module.exports=mongoose.model("User",userSchema);