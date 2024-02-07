"use client"
import React, { useEffect, useState } from 'react'
import UserContext from './userContext'
import { currentUser } from '@/services/userService';
import { toast } from 'react-toastify';

const ContextProvider = ({children}) => {
    const [currUser,setCurrUser]=useState("");
    const [activeData,setActiveData]=useState("")
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
  return <UserContext.Provider value={{currUser,setCurrUser,activeData,setActiveData}}>
       {children}
  </UserContext.Provider>
}

export default ContextProvider;