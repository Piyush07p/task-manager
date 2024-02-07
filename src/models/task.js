import mongoose from "mongoose"

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    dateAdded:{
        type:Date,
        required:true,
        default:Date.now(),
    },
    status:{
        type:String,
        enum:["pending","completed"],
        default:"pending",
    },
    userId:{
        type:String,
        required:true,
    }
})
mongoose.models={};
export  const taskModel=mongoose.models.taskdata||mongoose.model("taskdata",taskSchema)
