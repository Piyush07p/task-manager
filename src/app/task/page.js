"use client";

import React, { useState } from 'react'
import Image from "next/image"; 
import svg from '../assets/taskImage.svg'
import { addTask } from '@/services/taskService';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
   const [taskData,setTaskData]=useState({
          title:"",
          content:"",
          status:"",
          userId:"65bfe15b4e8941ff6607ef12"

   })
   const handleAddTask=async(event)=>{
        event.preventDefault();
        try {
            const res=await addTask(taskData)
            console.log("taskfile-->",res) 
           if(res!=null){
            toast.success("task added",{
              position:'top-center'
            })
            setTaskData({
              title:"",
              content:"",
              status:"",
              userId:"65bce38d6ab04829bd7b8319"
            })
           }
        } catch (error) {
          toast.error("Something went wrong",{
            position:'top-center'
          })
          console.log("taskError--> ",error);
        }

   }
  return (
    <>
        <section className='p-2 flex flex-col items-center  '>
            <ToastContainer />
              <div className=' mt-3 border' >
                <Image alt='image' className='w-[13rem] sm:w-[20rem]' src={svg}/>
              </div>
              <div className=' p-4 w-[80%] sm:w-[60%] md:w-[50%]  my-2 text-black'>
                <h1 className='text-white font-bold mb-2'>Add task here...</h1>
                 <form className='w-[100%] sm:text-[1rem] text-white text-[0.7rem] '>
                      <div className='w-[100%]'>
                        
                        <label>Enter title</label> <br/>
                        <input placeholder='enter title' className=' w-[100%] text-black h-8 sm:h-10' onChange={(e)=>{
                            setTaskData({
                              ...taskData, 
                              title:e.target.value
                            })
                        }} value={taskData.title} type='text'/> <br/> <br/>
                      </div>
                      <div>
                        <label>Enter Content</label> <br/>
                        <input  placeholder='enter content'  onChange={(e)=>{
                            setTaskData({
                              ...taskData, 
                              content:e.target.value
                            })
                        }} value={taskData.content} className='border w-[100%] text-black h-8 sm:h-10' type='text'/> <br/><br/>
                      </div>
                      <div>
                        <label>Status</label> <br/>
                        <select   placeholder='enter status'  onChange={(e)=>{
                              setTaskData({
                                ...taskData, 
                                status:e.target.value
                              })
                          }} value={taskData.status} className='border w-[100%] h-8 sm:h-10 text-black'  type='text'> 
                          <option>Choose</option>
                          <option>pending</option>
                          <option>completed</option>
                        </select>
                      </div>
                      <div>
                         <button className='bg-[#731273] py-1 px-2 my-3 rounded-sm text-white' onClick={handleAddTask} >Add Task</button>
                      </div>
                 </form>
               
              </div>

        </section>
    </>
  )
}

export default page