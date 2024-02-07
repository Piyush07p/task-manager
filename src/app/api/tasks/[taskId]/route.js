import { taskModel } from "@/models/task"
import { NextResponse } from "next/server";
import { createDb } from "@/db/connectDb";



export const GET=async(request)=>{
    await createDb();
    const taskData=await taskModel.find()
    return NextResponse.json({
       data:taskData
    })
}

export const DELETE=async (request,{params})=>{
    
        try {
            const {taskId}=params;
             console.log("deleteApi-->",params)
            await createDb();
            await taskModel.deleteOne({
                _id:taskId
            })
            return NextResponse.json({
                msg:"task deleted"
            })
        } catch (error) {
            console.log(error)  
            return NextResponse.json({
                Error:"error in deletion!!"
            })
        }
}