import { NextResponse } from "next/server";
import { createDb } from "@/db/connectDb";
import { userModel } from "@/models/user";
import bcrypt from 'bcrypt'



export  async function POST(request){
    
    try {
        const {name,email,password,taskId}=await request.json();
        const hashedPass=await bcrypt.hash(password,10);
        await createDb();
        const user=await userModel.create({
            name:name,
            email:email,
            password:hashedPass,
            taskId:taskId
    
        })
    
        return NextResponse.json({
            msg:"user added successfully "
        })
    
    } catch (error) {
        return NextResponse.json({
            msg:error.message
        })
    }
}