"use client"
import React, { useContext, useEffect, useState } from 'react'
import { deleteTask, getTaskList } from '@/services/taskService'
import UserContext from '@/context/userContext'
import { RxCross2 } from "react-icons/rx";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
  const context=useContext(UserContext);
  const {activeData,setActiveData}=useContext(UserContext)
  const [taskList,setTaskList]=useState([])
  
  // function that loads tasks

  async function loadTaskfunc(userId){
    let listData=await getTaskList(userId)
    console.log("tasklistPage---=> ", listData)    
    setTaskList([...listData].reverse())
    setActiveData([...listData]);
  }

  // function  calling the deleteTask api

  async function  deleteTaskFunc(taskId){
       try {
        const resp=await deleteTask(taskId)
        const newTask= taskList.filter(item=> item._id!=taskId)
        setTaskList(newTask)
        toast.success("task deleted successfully !!")
       } catch (error) {
        console.log(error)
        toast.error("Error in deletin the task !!");
       }
  }

  useEffect(()=>{
  
   if(context.currUser){
    console.log("context-->" , context.currUser)
    loadTaskfunc(context.currUser._id);
    
   }
  },[context.currUser])
  return (
    <>
      <section className='h-[100vh] flex flex-col'>
          <h1 className='font-bold text-xl my-3 text-center'>The listed tasks are below</h1>
          <h2 className='text-center border w-[10rem] p-2 mx-10 my-3'>You have {taskList.length} tasks</h2>
          <div className='flex flex-col items-center justify-center'>
            <ToastContainer/>
              {
                taskList.map((task)=>{
                  return(
                    <>
                       <div className={` p-2 w-[85%]  md:w-[60%]  rounded-lg border m-3 `}>
                          <div className='flex justify-between text-[0.7rem] md:text-[1rem]'>
                           <h1 className=' my-2'>{task.title}</h1>
                           <span className='text-white cursor-pointer' onClick={()=>{
                             deleteTaskFunc(task._id)
                            
                           }}>
                            <RxCross2/>
                           </span>
                          </div>
                          <p className='text-[0.7rem] md:text-[1rem]'>{task.content}</p>
                          <p className={`text-right text-[0.7rem] md:text-[1rem]  ${task.status==="completed"?"text-green-600":"text-red-600"}`}>Status: {task.status}</p>
                       </div>
                    </>
                  )
                })
              }
          </div>
      </section>
    </>
  )
}

export default page