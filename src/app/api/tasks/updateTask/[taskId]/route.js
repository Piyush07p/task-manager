import { taskModel } from "@/models/task"
import { NextResponse } from "next/server";
import { createDb } from "@/db/connectDb";


export const PUT=async(request,{params})=>{
    try {
        const {title,description}=await request.json()
        console.log("putApi-->",description)
        const resp=await taskModel.findByIdAndUpdate(params.taskId,{title:title,content:description})
        return NextResponse.json({
            msg:"task updated"
        })
    } catch (error) {
          console.log("updateTaskapiErr--> ",error)
          return NextResponse.json({
            Error:error
          })
    }
}