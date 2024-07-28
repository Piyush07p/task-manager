"use client"
import React, { useContext, useEffect, useState } from 'react'
import { deleteTask, getTaskList, updateTask,deleteAllTask,addStats} from '@/services/taskService'
import UserContext from '@/context/userContext'
import { RxCross2 } from "react-icons/rx";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { currentUser } from '@/services/userService';

import ScaleLoader from "react-spinners/ScaleLoader";
import  Update  from '../components/update';
import moment from 'moment';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';
import { BsCalendar2Check } from "react-icons/bs";


const page = () => {
  const context=useContext(UserContext);
  const {activeData,setActiveData,taskId,setTaskid,hidePopup,setHidePopup,markasRead,setMarkAsRead,completedTaskData,setCompletedTaskData}=useContext(UserContext)
  const [taskList,setTaskList]=useState([])
  
  const [finalSubmit,setFinalSubmit]=useState(true)
  // function that loads tasks

  async function loadTaskfunc(userId){
    let listData=await getTaskList(userId)
    console.log("tasklistPage---=> ", listData)   
    
    setTaskList([...listData].reverse())
    const completedTask=listData.filter((e)=>e.status=="completed")

    setActiveData({tasks:[...listData],completedTask:completedTask});
    
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

  const [deleteFlag,setDeleteFlag]=useState(false)

  async function deleteAllTaskFunc(){
    setDeleteFlag(true)
    setFinalSubmit(true)
    let conf=confirm("Are you sure ? All task wil be deleted")
    if(!conf){
      setDeleteFlag(false)
      return;
    }

    try {
     const resp=await deleteAllTask(taskList[0].userId)
     setTaskList([])
     setDeleteFlag(false)
     toast.success("All task deleted successfully !!")
    } catch (error) {
     setDeleteFlag(false)
     toast.error("No task present to delete !!");
    }
}


 async function updateTaskFunc(task_id){
    let conf=confirm("Are you sure ?")
    if(!conf){
       return
    }
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
  
  
  function editTaskFunc(task_id,task_title,task_content){
    setHidePopup(true)
    setTaskid({
      task_id,task_title,task_content
    })
    
  }
  

//--------------------(add_stats)--------------------

 async function addStatsFunc(){
  let conf=confirm("Are you sure ? You want to submit")
  if(!conf){
    setDeleteFlag(false)
    return;
  }
   const loggedUser=await currentUser();
   setFinalSubmit(false)
  const taskCompleted=completedTask();
  const pendingTask=taskList.length-taskCompleted;
  const  accuracy= (taskCompleted/taskList.length)*100
  const statsObj={
       userId:loggedUser._id,
       taskCompleted:taskCompleted,
       pendingTask:pendingTask,
       date:moment().format("Do MMMM YY"),
       accuracy:accuracy

  }
  try {
    const resp= await addStats(statsObj)
    toast.success("Stats updated !!")
    // deleteAllTaskFunc()
  } catch (error) {
    console.log("Error_in_addStats-->",error)
  }
 }
// ------------------(end)--------------------


// useEffect hook to start the interval when the component mounts
const [loading,setLoading]=useState(false)
useEffect(() => {
  setLoading(true)
  setTimeout(()=>{
    setLoading(false)
  },2000)
  function scheduleFunc(){
    setCompletedTaskData("completed")
  }
  
  
}, []);


// ------------------((end))----------------------

return (
    <>
    {
      (hidePopup)?<Update/>:""
    }
      <section className='p-3 text-white flex flex-col '>
          <h1 className='font-bold text-xl my-3 text-center'>The listed tasks are below</h1>
          <div className='w-full flex justify-center'>
            <div className='flex justify-between  w-[95%] md:w-[60%] '>
              <h2 className='rounded-md text-center text-[0.7rem] md:text-[1rem] border w-[11rem] p-1 mr-2  my-3'>Total tasks: {taskList.length}</h2>
              <h2 className=' rounded-md text-center text-[0.7rem] md:text-[1rem] border w-[11rem] p-1 ml-2  my-3'>Completed tasks: {completedTask()} </h2>
            </div>
          </div>
          <ToastContainer/>  
          <div className='flex flex-col  items-center  justify-center'>
            
               <div className='w-[95%]  md:w-[60%] flex justify-between items-center '>
              

                 <button onClick={deleteAllTaskFunc} className='p-1 w-[7rem] text-[0.8rem] md:text-[1rem] hover:bg-green-700 bg-green-600 rounded '>
                   {
                     (deleteFlag)?<ClipLoader color='#fff' size={22}/>:"Clear all task"
                   }   
                 </button>
                
                  <button className=" p-1 text-[0.8rem] md:text-[1rem] hover:bg-green-700 bg-green-600 rounded ">
                     <Link href="/task">Add tasks</Link>
                  </button>
                
               </div>

               <div className='my-4 w-[95%] flex  md:w-[60%] items-center  justify-start'>
                <BsCalendar2Check className='text-[1.2rem]'/>
                <span className= 'text-[0.8rem] md:text-[1rem]  p-1'>
                {moment().format('MMMM Do YYYY')}
                  </span>
               </div>
            
              {

                (!taskList.length)
                ?
                 <div className='h-[55vh] flex items-center'>
                     <p className={`${loading?"hidden":""}`}>No task present</p>
                     <p className={`${loading?"":"hidden"}`}> <ScaleLoader  color="#731273" size={20} /> </p>
                 </div>
                :taskList.map((task)=>{
                  return(
                    <>
                       <div style={{border:"2px solid rgba(109,105,105,0.5)"}} className={` p-2 w-[95%]  md:w-[60%]  rounded-lg border m-3 `}>
                          <div className='flex justify-between text-[0.8rem] md:text-[1.2rem]'>
                           <h1 className=' my-2 underline font-bold'>{task.title}</h1>
                           <p className='flex items-center'>
                              <span className='mr-4'>
                                <button onClick={()=>editTaskFunc(task._id,task.title,task.content)} className=' inline text-right text-[0.7rem] md:text-[1rem] hover:bg-green-700 bg-green-600 rounded cursor-pointer py-1 px-2'>Edit</button>
                              </span>
                              <span className='text-white cursor-pointer' onClick={()=>{
                                  deleteTaskFunc(task._id)
                                   
                                }}>
                                <RxCross2/>
                              </span>
                           </p>
                          </div>
                          <p className='text-[0.7rem] md:text-[1rem] whitespace-pre-wrap'>{task.content}</p>
                      
                          <p className={`text-right text-[0.7rem] md:text-[1rem] `}>Status: <span className={`${task.status==="Important"?"text-yellow-300":(task.status==="completed")?"text-green-500":"text-red-500"}`}>{task.status}</span></p>
                          <div className='flex items-center justify-between'>
                            {
                              (task.status=="pending")?<button onClick={()=>updateTaskFunc(task._id)} className={`text-right text-[0.7rem] md:text-[1rem] hover:bg-green-700 bg-green-600  rounded cursor-pointer p-1`}>Mark as completed</button>:""
                            }
                            <p className='text-right text-[0.5rem] sm:text-[0.7rem]'>{task.dateAdded}</p>
                          </div>
                       </div>
                    </>
                  )
                })
              }
          </div>
          <div className='flex justify-center'>
          {
            finalSubmit?<button onClick={addStatsFunc} className='rounded bg-green-600 px-2 py-1 m-2 text-[0.8rem] sm:text-[1rem]'>final submit</button>:""
          }
             
          </div>
      </section>
    </>
  )
}

export  default page