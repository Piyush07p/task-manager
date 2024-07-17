import { notesModel } from "@/models/notesModel"
import { NextResponse } from "next/server";
import { createDb } from "@/db/connectDb";
import jwt from 'jsonwebtoken'

export const POST= async(request)=>{
    
        const {title, content}= await request.json();

        if(!title|| !content ){
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
            const notes=await notesModel.create({
                title:title, 
                content:content, 
                userId:data._id
            },{
                timestamps:true
            })

            console.log("inside Taskapi--->",notes)
             return NextResponse.json({
                msg:"Notes created"
             })
        } catch (error) {
            console.log(error)
            return NextResponse.json({
                msg:"Error occured"
            })
        }
} 