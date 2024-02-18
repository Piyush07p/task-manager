import { NextResponse } from "next/server";
import { createDb } from "@/db/connectDb";
import { taskModel } from "@/models/task" ;



export  async function GET(request,{params}){
    const {userId}=params;
    try {
        await createDb();
        const tasks=await taskModel.find({
            userId:userId,  
        });
        return NextResponse.json(tasks)
    } catch (error) {
        console.log(error) 
        return NextResponse.json({
            Error:error
        })  
    }
   
}