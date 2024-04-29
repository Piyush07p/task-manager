
import { addStats } from "@/services/taskService";
import { currentUser } from '@/services/userService';
import { NextResponse } from "next/server";

export async function GET(request){
   const loggedUser=await currentUser();
    
      return NextResponse.json({
        msg:"loggedUser._id"
      })

  }

  