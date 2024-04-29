
import { addStats } from "@/services/taskService";
import { currentUser } from '@/services/userService';
import { NextResponse } from "next/server";

import {addStatsFunc}  from "@/helper/addStatsFunc";
export async function GET(request){
   
      // addStatsFunc()
      return NextResponse.json({
        msg:"loggedUser._id"
      })

  }

  