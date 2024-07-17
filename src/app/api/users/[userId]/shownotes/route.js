import { NextResponse } from "next/server";
import { createDb } from "@/db/connectDb";
import { notesModel } from "@/models/notesModel" ;



export  async function GET(request,{params}){
    const {userId}=params;
    try {
        await createDb();
        const notes=await notesModel.find({
            userId:userId,  
        });
        return NextResponse.json(notes)
    } catch (error) {
        console.log(error) 
        return NextResponse.json({
            Error:error
        })  
    }
   
}