"use client"
import React, { useEffect, useState, useSyncExternalStore } from 'react'
import UserContext from './userContext'
import { currentUser } from '@/services/userService';
import { toast } from 'react-toastify';

const ContextProvider = ({children}) => {
    const [currUser,setCurrUser]=useState("");
    const [activeData,setActiveData]=useState("")
    const [taskId,setTaskid]=useState({})
    const [hidePopup,setHidePopup]=useState(false);
    const [markasRead,setMarkAsRead]=useState(false);
    const [completedTaskData,setCompletedTaskData]=useState("")

   useEffect(()=>{
    async function loadUser(){
      
        try {
            const loggedUser=await currentUser();
            localStorage.setItem("userName",JSON.stringify(loggedUser.name))
            console.log("provider--> ", loggedUser)
            setCurrUser({...loggedUser});
        } catch (error) {
            console.log(error)
            toast.error("error in loading current user")
        }
    }
    loadUser()
   },[])
  return <UserContext.Provider value={{currUser,setCurrUser,activeData,setActiveData,taskId,setTaskid,hidePopup,setHidePopup,
  markasRead,setMarkAsRead,completedTaskData,setCompletedTaskData}}>
       {children}
  </UserContext.Provider>
}

export default ContextProvider;