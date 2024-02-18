import { NextResponse } from 'next/server';
import cron from 'node-cron';
export function GET(){
    try {
        cron.schedule('* * * * * *',function(){
            console.log("hello")
        })
        return NextResponse.json({
            msg:"success..."
        })
    } catch (error) {
        return NextResponse.json({
            error: error.message

        })
    }

}

