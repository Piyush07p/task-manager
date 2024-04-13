import  mongoose  from "mongoose";

const stasSchema= new mongoose.Schema({
    userId:{
        type:String,
    },
    taskCompleted:{
        type:String,

    },
    pendingTask:{
        type:String,
    },
    date:{
        type:String,
    },
    accuracy:{
        type:Number
    }
})

mongoose.models={};

export  const statsModel=mongoose.models.statsData||mongoose.model("statsData",stasSchema)
