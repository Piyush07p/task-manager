
import { NextResponse } from "next/server";
import { userModel } from "@/models/user";
import { statsModel } from "@/models/taskstatsModel";
import { taskModel } from "@/models/task";
import { createDb } from "@/db/connectDb";
import moment from "moment";

export async function GET(request){

       await createDb();
      const allUsers=await userModel.find({});
      let userid=allUsers.map((user)=>user._id)
      console.log(userid);
    
      userid.forEach(async(id,ind)=>{
         let taskData=await taskModel.find({userId:id});
         
        let filterData=taskData.filter((data,ind)=>{
            return data.status=='completed'&&data.dateAdded.includes(moment().format('MMMM Do YYYY'));
        })
         
        const statsObj={
            userId:id,
            taskCompleted:filterData.length,
            pendingTask:taskData.length-filterData.length,
            date:moment().format("Do MMMM YY"),
            accuracy:(filterData.length/(taskData.length))*100
        }
          if(filterData.length>0){
            const {userId,taskCompleted,pendingTask,date,accuracy}=statsObj;
            const stats=await statsModel.create({
                userId,
                taskCompleted,
                pendingTask,
                date,
                accuracy
            })

            console.log("successfully added stats")
  
          }
         
         console.log("--------------------x--x--x---------------")
      })

      
      return NextResponse.json({
        msg:"success"
      })

  }

  