
import { addStats } from "@/services/taskService";
import { currentUser } from '@/services/userService';
import { NextResponse } from "next/server";

export async function GET(request){
   const loggedUser=await currentUser();
    // setFinalSubmit(false)
    
//    const taskCompleted=completedTask();
//    const pendingTask=taskList.length-taskCompleted;
//    const  accuracy= (taskCompleted/taskList.length)*100
//    const statsObj={
//         userId:loggedUser._id,
//         taskCompleted:taskCompleted,
//         pendingTask:pendingTask,
//         date:moment().format("Do MMMM YY"),
//         accuracy:accuracy
 
//    }

   return NextResponse.json({
    msg:"loggedUser._id"
   })
   try {
     const resp= await addStats(statsObj)
    //  toast.success("Stats updated !!")
     // deleteAllTaskFunc()
   } catch (error) {
     console.log("Error_in_addStats-->",error)
   }
  }

  