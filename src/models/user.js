import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    taskId:{
        type:String,
    }
})

export const userModel=mongoose.models.userdata||mongoose.model("userdata",userSchema);
