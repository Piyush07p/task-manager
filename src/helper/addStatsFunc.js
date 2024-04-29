import UserContext from '@/context/userContext'
import React, { useContext, useEffect, useState } from 'react'
import {addStats} from '@/services/taskService'

export default async function addStatsFunc(){
    const context=useContext(UserContext);

    //  const loggedUser=await currentUser();
    //  setFinalSubmit(false)
    // const taskCompleted=completedTask();
    // const pendingTask=taskList.length-taskCompleted;
    // const  accuracy= (taskCompleted/taskList.length)*100
    const statsObj={
         userId:"anenioawe23in43na",
         taskCompleted:2,
         pendingTask:9,
         date:moment().format("Do MMMM YY"),
         accuracy:50
  
    }
    try {
      const resp= await addStats(statsObj)
    } catch (error) {
      console.log("Error_in_addStats-->",error)
    }
   }