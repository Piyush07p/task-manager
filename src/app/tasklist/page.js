"use client"
import React, { useContext, useEffect, useState } from 'react'
import { deleteTask, getTaskList, updateTask } from '@/services/taskService'
import UserContext from '@/context/userContext'
import { RxCross2 } from "react-icons/rx";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScaleLoader from "react-spinners/ScaleLoader";
import  Update  from '../components/update';
const page = () => {
  const context=useContext(UserContext);
  const {activeData,setActiveData,taskId,setTaskid,hidePopup,setHidePopup,markasRead,setMarkAsRead}=useContext(UserContext)
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
        toast.error("Error in deletion the task !!");
       }
  }

 async function updateTaskFunc(task_id){
      try {
        const resp= await updateTask(task_id)
        setMarkAsRead(prevState=>!prevState)
        window.location.reload()
      } catch (error) {
        console.log("update_task_err--> ",error)
      }
 }
  useEffect(()=>{
  
   if(context.currUser){
    console.log("context-->" , context.currUser)
    loadTaskfunc(context.currUser._id);
   
   }
  },[context.currUser])
  function completedTask(){
    return taskList.filter((elem)=>elem.status==="completed").length
    
  }
  
  
  function editTaskFunc(task_id){
    setHidePopup(true)
    setTaskid(task_id)
    
  }
  return (
    <>
    {
      (hidePopup)?<Update/>:""
    }
      <section className='p-3flex flex-col'>
          <h1 className='font-bold text-xl my-3 text-center'>The listed tasks are below</h1>
          <div className='flex justify-center '>
            <h2 className='text-center text-[0.7rem] md:text-[1rem] border w-[11rem] p-1 mx-10 my-3'>Total tasks: {taskList.length}</h2>
            <h2 className='text-center text-[0.7rem] md:text-[1rem] border w-[11rem] p-1 mx-10 my-3'>Completed tasks: {completedTask()} </h2>
          </div>

          <div className='flex flex-col items-center justify-center'>
            <ToastContainer/>  
         
              {
                (taskList.length===0)
                ?
                 <div className='h-[55vh] flex items-center'>
                      <ScaleLoader color="#731273" size={20} /> 
                 </div>
                :taskList.map((task)=>{
                  return(
                    <>
                       <div className={` p-2 w-[85%]  md:w-[60%]  rounded-lg border m-3 `}>
                          <div className='flex justify-between text-[0.8rem] md:text-[1.2rem]'>
                           <h1 className=' my-2 underline font-bold'>{task.title}</h1>
                           <p className='flex items-center'>
                              <span className='mr-4'>
                                <button onClick={()=>editTaskFunc(task._id)} className=' inline text-right text-[0.7rem] md:text-[1rem] hover:bg-green-700 bg-green-600 rounded cursor-pointer py-1 px-2'>Edit</button>
                              </span>
                              <span className='text-white cursor-pointer' onClick={()=>{
                                  deleteTaskFunc(task._id)
                                  
                                }}>
                                <RxCross2/>
                              </span>
                           </p>
                          </div>
                          <p className='text-[0.7rem] md:text-[1rem] whitespace-pre-wrap'>{task.content}</p>
                          <p className={`text-right text-[0.7rem] md:text-[1rem] ${task.status==="completed"?"text-green-600":"text-red-600"}`}>Status: {task.status}</p>
                          <div className='flex items-center justify-between'>
                            <button onClick={()=>updateTaskFunc(task._id)} className={`text-right text-[0.7rem] md:text-[1rem] hover:bg-green-700 ${markasRead?" bg-green-900 ":"bg-green-600 "} rounded cursor-pointer p-1`}>Mark as completed</button>
                            <p className='text-right text-[0.5rem] sm:text-[0.7rem]'>{task.dateAdded}</p>
                          </div>
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