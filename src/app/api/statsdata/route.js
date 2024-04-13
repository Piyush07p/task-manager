import { statsModel } from "@/models/taskstatsModel";
import { createDb } from "@/db/connectDb";
import { NextResponse } from "next/server";


export async function POST(request){
       try {
            const {userId,taskCompleted,pendingTask,date,accuracy}=await request.json()
            await createDb();
            const stats=await statsModel.create({
                userId,
                taskCompleted,
                pendingTask,
                date,
                accuracy
            })
            return NextResponse.json({
                msg:"stats successfully added"
            })
       } catch (error) {
            return NextResponse.json({
                msg:"failed to add stats",
                error:error.message
            })
       }

}