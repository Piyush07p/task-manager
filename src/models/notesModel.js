import mongoose from "mongoose"
import moment from "moment";

const notesSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true

    },
    dateAdded:{
        type:String,
        default:moment().format('MMMM Do YYYY, h:mm:ss a')
    },
    userId:{
        type:String,
        // required:true,
    }
})
mongoose.models={};
export  const notesModel=mongoose.models.notesdata||mongoose.model("notesdata",notesSchema)
