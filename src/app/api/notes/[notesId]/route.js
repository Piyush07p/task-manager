import { notesModel } from "@/models/notesModel"
import { NextResponse } from "next/server";
import { createDb } from "@/db/connectDb";



export const GET=async(request)=>{
    await createDb();
    const notesData=await notesModel.find()
    return NextResponse.json({
       data:notesData
    })
}

export const DELETE=async (request,{params})=>{
    
        try {
            const {notesId}=params;
             console.log("deleteApi-->",params)
            await createDb();
            await notesModel.deleteOne({
                _id:notesId
            })
            return NextResponse.json({
                msg:"Note deleted"
            })
        } catch (error) {
            console.log(error)  
            return NextResponse.json({
                Error:"Error in deletion!!"
            })
        }
}

export const PUT=async(request,{params})=>{
    try {

        const updated=await notesModel.findByIdAndUpdate(params.taskId,{status:'completed'});  
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