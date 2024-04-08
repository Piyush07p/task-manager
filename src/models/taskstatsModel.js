import  mongoose  from "mongoose";

const stasSchema= new mongoose.Schema({
    completed:{
        type:String,

    },
    pending:{
        type:String,
    },
    date:{
        type:String,
    }
})

mongoose.models={};

export  const statsModel=mongoose.models.statsData||mongoose.model("statsData",stasSchema)
