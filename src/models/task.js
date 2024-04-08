import mongoose from "mongoose"
import moment from "moment";
const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        
    },
    content:{
        type:String,

    },
    dateAdded:{
        type:String,
        default:moment().format('MMMM Do YYYY, h:mm:ss a')
    },
    status:{
        type:String,
        enum:["pending","Important"],
    },
    userId:{
        type:String,
        // required:true,
    }
})
mongoose.models={};
export  const taskModel=mongoose.models.taskdata||mongoose.model("taskdata",taskSchema)
