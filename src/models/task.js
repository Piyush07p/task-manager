import mongoose from "mongoose"
import moment from "moment";
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
        type:String,
        default:moment().format('MMMM Do YYYY, h:mm:ss a')
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
