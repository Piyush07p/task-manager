import { NextResponse } from "next/server";
import { createDb } from "@/db/connectDb";
import { taskModel } from "@/models/task" ;



export  async function GET(request,{params}){
    const {userId}=params;
    try {
        await createDb();
        const users=await taskModel.find({
            userId:userId,  
        });
        return NextResponse.json(users)
    } catch (error) {
        console.log(error) 
        return NextResponse.json({
            Error:error
        })  
    }
   
}