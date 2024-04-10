import { taskModel } from "@/models/task"
import { NextResponse } from "next/server";
import { createDb } from "@/db/connectDb";
import jwt from 'jsonwebtoken'

export const POST= async(request)=>{
    
        const {title, content, status}= await request.json();

        if(!title|| !content || !status){
            return NextResponse.json({
                msg:"Fill all the fields"
             }) 
        }
        // fetching logged-in User --->
        const authToken=request.cookies.get('loginToken')?.value;
        const data=jwt.verify(authToken,process.env.JWT_KEY);
        console.log("---> ",data)
        try {
            console.log(title)
            await createDb();
            const task=await taskModel.create({
                title:title, 
                content:content, 
                status:status,
                userId:data._id
            },{
                timestamps:true
            })

            console.log("inside Taskapi--->",task)
             return NextResponse.json({
                msg:"task created"
             })
        } catch (error) {
            console.log(error)
            return NextResponse.json({
                msg:"error occured"
            })
        }
}