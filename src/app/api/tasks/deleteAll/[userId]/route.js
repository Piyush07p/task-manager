import { taskModel } from "@/models/task"
import { NextResponse } from "next/server";
import { createDb } from "@/db/connectDb";

export const DELETE=async (request,{params})=>{
    
    try {
        const {userId}=params;
        await createDb();
        const tasks = await taskModel.find({ userId: userId });
        if (tasks.length > 0) {
            const deletionResult = await taskModel.deleteMany({ userId: userId });
            console.log(tasks.length)
        } else {
            console.log(`No tasks found for user with id ${userId}`);
        }
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