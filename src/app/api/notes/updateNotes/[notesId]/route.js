import { notesModel } from "@/models/notesModel"
import { NextResponse } from "next/server";
import { createDb } from "@/db/connectDb";


export const PUT=async(request,{params})=>{
    try {
        const {title,description}=await request.json()

        const resp=await notesModel.findByIdAndUpdate(params.notesId,{title:title,content:description})
        return NextResponse.json({
            msg:"Notes updated"
        })
    } catch (error) {
          console.log("updateNotesApiError--> ",error)
          return NextResponse.json({
            Error:error
          })
    }
}