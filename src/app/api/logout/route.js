import { createDb } from "@/db/connectDb";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request){

    const response=NextResponse.json({
        msg:"logout success!",
        success:true
    });
    response.cookies.set("loginToken","",{
        expiresin:new Date(0)
    })
    return response
}