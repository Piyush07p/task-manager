import { notesModel } from "@/models/notesModel"
import { NextResponse } from "next/server";
import { createDb } from "@/db/connectDb";

export const DELETE=async (request,{params})=>{
    
    try {
        const {userId}=params;
        await createDb();
        const notes = await notesModel.find({ userId: userId });
        if (notes.length > 0) {
            const deletionResult = await notesModel.deleteMany({ userId: userId });
            console.log(notes.length)
        } else {
            console.log(`No notes found for user with id ${userId}`);
        }
        return NextResponse.json({
            msg:"notes deleted"
        })
    } catch (error) {
        console.log(error)  
        return NextResponse.json({
            Error:"Error in deletion!!"
        })
    }
}