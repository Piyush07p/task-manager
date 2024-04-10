"use client"
import React, { useEffect, useState } from 'react'
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

    const loadUser=async()=>{
      
        try {
            const loggedUser=await currentUser();
            localStorage.setItem("userName",JSON.stringify(loggedUser.name))
            console.log("provider--> ", loggedUser)
            if(loggedUser.code=="ERR_BAD_REQUEST"){

            }else{
                setCurrUser({...loggedUser});
            }
        } catch (error) {
            console.log(error)
            toast.error("error in loading current user")
        }
    }
   useEffect(()=>{
    loadUser()
   },[])
  return <UserContext.Provider value={{currUser,setCurrUser,activeData,setActiveData,taskId,setTaskid,hidePopup,setHidePopup,
  markasRead,setMarkAsRead,completedTaskData,setCompletedTaskData,loadUser}}>
       {children}
  </UserContext.Provider>
}

export default ContextProvider;