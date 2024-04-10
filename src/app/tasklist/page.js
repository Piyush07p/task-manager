"use client"
import React, { useContext, useEffect, useState } from 'react'
import { deleteTask, getTaskList, updateTask,deleteAllTask,addStats} from '@/services/taskService'
import UserContext from '@/context/userContext'
import { RxCross2 } from "react-icons/rx";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScaleLoader from "react-spinners/ScaleLoader";
import  Update  from '../components/update';
import moment from 'moment';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';



const page = () => {
  const context=useContext(UserContext);
  const {activeData,setActiveData,taskId,setTaskid,hidePopup,setHidePopup,markasRead,setMarkAsRead,completedTaskData,setCompletedTaskData}=useContext(UserContext)
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

  const [deleteFlag,setDeleteFlag]=useState(false)

  async function deleteAllTaskFunc(){
    setDeleteFlag(true)
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
  //----------------------------------------------
  //----------------(setInterval)-----------------
  //----------------------------------------------

  function setTimeUntil() {
    const currTime = new Date();
    const tenPM = new Date(currTime);
    tenPM.setHours(23, 6, 0, 0); // Set hours to 22:00:00 (10 PM)
    
    let timeDiff = tenPM.getTime() - currTime.getTime();
    if (timeDiff < 0) {
        // If it's already past 10 PM for today, set it for tomorrow
        tenPM.setDate(tenPM.getDate() + 1);
        timeDiff = tenPM.getTime() - currTime.getTime();
    }
    
    return timeDiff;
}
//--------------------(add_stats)--------------------

 async function addStatsFunc(){
  //  const taskCompleted=completedTask();
  // const pendingTask=taskList.length-taskCompleted;
  // console.log(pendingTask,taskCompleted)
  // try {
  //   const resp= await addStats(pendingTask,taskCompleted)
  //   toast.success("Stats upadated !!")
    
  // } catch (error) {
  //   console.log("Error_in_addStats-->",error)
  // }
 }

// useEffect hook to start the interval when the component mounts
useEffect(() => {
  function scheduleFunc(){
    setCompletedTaskData("completed")
  }
  
  const interval = setInterval(scheduleFunc, setTimeUntil()); // Execute tick function every 1000 milliseconds (1 second)

  // Return a cleanup function to clear the interval when the component unmounts
  return () => clearInterval(interval);
}, []);


// ------------------((end))----------------------

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
          <ToastContainer/>  
          <div className='flex flex-col  items-center  justify-center'>
            
               <div className='w-[85%]  md:w-[60%] flex justify-between items-center '>
              

                 <button onClick={deleteAllTaskFunc} className='p-1 w-[7rem] text-[0.8rem] md:text-[1rem] hover:bg-green-700 bg-green-600 rounded '>
                   {
                     (deleteFlag)?<ClipLoader color='#fff' size={22}/>:"Clear all task"
                   }   
                 </button>
                
                  <button className=" p-1 text-[0.8rem] md:text-[1rem] hover:bg-green-700 bg-green-600 rounded ">
                     <Link href="/task">Add more tasks</Link>
                  </button>
                
               </div>

               <div className='my-4 w-[85%]  md:w-[60%]  justify-start'>
               <span className= 'text-[0.8rem] md:text-[1rem] border p-1'>
                {moment().format('MMMM Do YYYY')}
                </span>
               </div>
            
              {

                (!taskList.length)
                ?
                 <div className='h-[55vh] flex items-center'>
                     {(taskList.length==0)?<p>No task present</p>:""}
                     <p> <ScaleLoader color="#731273" size={20} /> </p>
                 </div>
                :taskList.map((task)=>{
                  return(
                    <>
                       <div className={` p-2 w-[85%]  md:w-[60%]  rounded-lg border m-3 `}>
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
                          <p className={`text-right text-[0.7rem] md:text-[1rem] ${task.status==="Important"?"text-yellow-300":(task.status==="completed")?"text-green-500":"text-red-500"}`}>Status: {task.status}</p>
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
          <div className='flex justify-center'>
             <button onClick={addStatsFunc} className='rounded bg-green-600 px-2 py-1 m-2'>final submit</button>
          </div>
      </section>
    </>
  )
}

export default page