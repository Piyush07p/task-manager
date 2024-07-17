"use client"
import React, { useContext, useEffect, useState } from 'react'

import {getNotesList,deleteAllNotes,deleteNotes} from '@/services/notesService'


import UserContext from '@/context/userContext'
import { RxCross2 } from "react-icons/rx";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { currentUser } from '@/services/userService';

import ScaleLoader from "react-spinners/ScaleLoader";
import Update  from '../components/update';
import moment from 'moment';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';
import { BsCalendar2Check } from "react-icons/bs";


const page = () => {
  const context=useContext(UserContext);
  const {activeData,setActiveData,taskId,setTaskid,notesId,setNotesid,hidePopup,setHidePopup,
    markasRead,setMarkAsRead,completedTaskData,setCompletedTaskData}=useContext(UserContext)


  const [taskList,setTaskList]=useState([])
  
  const [finalSubmit,setFinalSubmit]=useState(true)
  // function that loads tasks

  async function loadNotesfunc(userId){
    
    let listData=await getNotesList(userId)
    console.log("noteslistPage---=> ", listData)   
    
    setTaskList([...listData].reverse())
  
    // setActiveData({tasks:[...listData],completedTask:completedTask});
    
  }

//*************************************************************************************
// function  calling the deleteNotes api

  async function  deleteNotesFunc(notesId){
       try {
        const resp=await deleteNotes(notesId)
        const newNotes= taskList.filter(item=> item._id!=notesId)
        setTaskList(newNotes)
        toast.success("Note deleted successfully !!")
       } catch (error) {
        console.log(error)
        toast.error("Error in deletion of note !!");
       }
  }

  const [deleteFlag,setDeleteFlag]=useState(false)

  async function deleteAllNotesFunc(){
    setDeleteFlag(true)
    setFinalSubmit(true)
    let conf=confirm("Are you sure ? All notes wil be deleted")
    if(!conf){
      setDeleteFlag(false)
      return;
    }

    try {
     const resp=await deleteAllNotes(taskList[0].userId)
     setTaskList([])
     setDeleteFlag(false)
     toast.success("All task deleted successfully !!")
    } catch (error) {
     setDeleteFlag(false)
     toast.error("No task present to delete !!");
    }
}

//************************************************************************************
//************************************************************************************

//--------------(useEffect_hook)--------------------

  useEffect(()=>{
  
   if(context.currUser){
    console.log("context-->" , context.currUser)
    loadNotesfunc(context.currUser._id);
   
   }
  },[context.currUser])

  
  
  
  function editNotesFunc(task_id,task_title,task_content){
    setHidePopup(true)
    setNotesid({
      task_id,task_title,task_content,notes:"yes"
    }) 
  }
  //----------------------------------------------
  //----------------(setInterval)-----------------
  //----------------------------------------------



// useEffect hook to start the interval when the component mounts
const [loading,setLoading]=useState(false)
useEffect(() => {
  setLoading(true)
  setTimeout(()=>{
    setLoading(false)
  },2000)
  
  
 
}, []);


// ------------------((end))----------------------

return (
    <>
    {
      (hidePopup)?<Update/>:""
    }
      <section className='p-3 text-white flex flex-col'>
          <h1 className='font-bold text-xl my-3 text-center'>The listed notes are below</h1>
          <div className='flex justify-center  '>
            <h2 className='rounded-md text-center text-[0.7rem] md:text-[1rem] border w-[11rem] p-1 mx-10 my-3'>Total Notes: {taskList.length}</h2>
            {/* <h2 className=' rounded-md text-center text-[0.7rem] md:text-[1rem] border w-[11rem] p-1 mx-10 my-3'>Completed tasks: {completedTask()} </h2> */}
          </div>
          <ToastContainer/>  
          <div className='flex flex-col  items-center  justify-center'>
            
               <div className='w-[85%]  md:w-[60%] flex justify-between items-center '>
              

                 <button onClick={deleteAllNotesFunc} className='p-1 w-[7.5rem] text-[0.8rem] md:text-[1rem] hover:bg-green-700 bg-green-600 rounded '>
                   {
                     (deleteFlag)?<ClipLoader color='#fff' size={22}/>:"Clear all notes"
                   }   
                 </button>
                
                  <button className=" p-1 text-[0.8rem] md:text-[1rem] hover:bg-green-700 bg-green-600 rounded ">
                     <Link href="/notes">Add Notes</Link>
                  </button>
                
               </div>

               <div className='my-4 w-[85%] flex  md:w-[60%] items-center  justify-start'>
               <BsCalendar2Check className='text-[1.2rem]'/>
               <span className= 'text-[0.8rem] md:text-[1rem]  p-1'>
               {moment().format('MMMM Do YYYY')}
                </span>
               </div>
            
              {

                (!taskList.length)
                ?
                 <div className='h-[55vh] flex items-center'>
                     <p className={`${loading?"hidden":""}`}>No notes present</p>
                     <p className={`${loading?"":"hidden"}`}> <ScaleLoader  color="#731273" size={20} /> </p>
                 </div>
                :taskList.map((notes)=>{
                  return(
                    <>
                       <div style={{border:"2px solid rgba(109,105,105,0.5)"}} className={` p-2 w-[85%]  md:w-[60%]  rounded-lg border m-3 `}>
                          <div className='flex justify-between text-[0.8rem] md:text-[1.2rem]'>
                           <h1 className=' my-2 underline font-bold'>{notes.title}</h1>
                           <p className='flex items-center'>
                              <span className='mr-4'>
                                <button onClick={()=>editNotesFunc(notes._id,notes.title,notes.content)} className=' inline text-right text-[0.7rem] md:text-[1rem] hover:bg-green-700 bg-green-600 rounded cursor-pointer py-1 px-2'>Edit</button>
                              </span>
                              <span className='text-white cursor-pointer' onClick={()=>{
                                  deleteNotesFunc(notes._id)
                                   
                                }}>
                                <RxCross2/>
                              </span>
                           </p>
                          </div>
                          <p className='text-[0.7rem] md:text-[1rem] whitespace-pre-wrap'>{notes.content}</p>
                      
                          {/* <p className={`text-right text-[0.7rem] md:text-[1rem] `}>Status: <span className={`${task.status==="Important"?"text-yellow-300":(task.status==="completed")?"text-green-500":"text-red-500"}`}>{task.status}</span></p> */}
                          <div className='flex items-center justify-between mt-4'>
                            {/* <button onClick={()=>updateTaskFunc(task._id)} className={`text-right text-[0.7rem] md:text-[1rem] hover:bg-green-700 ${markasRead?" bg-green-900 ":"bg-green-600 "} rounded cursor-pointer p-1`}>Mark as completed</button> */}
                            <p className='text-right text-[0.5rem] sm:text-[0.7rem]'>{notes.dateAdded}</p>
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

export  default page