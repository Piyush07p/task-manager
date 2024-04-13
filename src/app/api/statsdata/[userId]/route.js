import { statsModel } from "@/models/taskstatsModel";
import { createDb } from "@/db/connectDb";
import { NextResponse } from "next/server";



export const GET=async(request,{params})=>{
    await createDb();
    const statsData=await statsModel.find({userId:params.userId })
    return NextResponse.json({
        statsData:statsData
    })
}
