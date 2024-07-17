"use client"
import React, { useEffect } from 'react'
import { useState ,useContext} from 'react'
import { editTask } from '@/services/taskService'
import {editNotes} from '@/services/notesService'
import UserContext from '@/context/userContext'

const Update = () => {
  const {taskId,notesId,hidePopup,setHidePopup}=useContext(UserContext)
  const [udpateData,setUpdateData]=useState({})

    useEffect(()=>{
        if(notesId.notes){
            setUpdateData({
                title:notesId.task_title,
                description:notesId.task_content
            }) 
        }
        else{
            setUpdateData({
                title:taskId.task_title,
                description:taskId.task_content
            }) 
        }
    },[])

    const updateDataFunc=async (e)=>{
        e.preventDefault();
        setHidePopup(false);
        try {
            if(notesId.notes){
                console.log("-------(notesId)---------->",notesId)
                let resp2=await editNotes(notesId.task_id,udpateData);
            }
            else{
                let resp=await editTask(taskId.task_id,udpateData);
            }
             window.location.reload()
        } catch (error) {
           console.log(error) 
        }
    }
    const cancelPopup=()=>{
        setHidePopup(false)
    }
  return (
      <section className='w-[100%] my-2 text-white  flex justify-center '>
        <div className='transition duration-200 border fixed bg-[#121216] text-[0.8rem]  rounded-md p-3 w-[90%] sm:w-[65%] md:w-[55%] md:text-[1rem]'>
          <h1 className='font-bold text-[1rem]'>Edit your task</h1> <br/>
          <form method='PUT'>
            <input onChange={(e)=>{
                 setUpdateData({
                    ...udpateData,title:e.target.value
                })
            }
            } value={udpateData.title} name='title' className=' bg-[#272727]  w-[90%]  h-[2rem] px-2 md:w-[90%]' type="text" placeholder='edit title'/> <br/><br/>
            <textarea onChange={(e)=>{
                setUpdateData({
                    ...udpateData,description:e.target.value
                })
            }} className=' bg-[#272727] w-[90%]  px-2 md:w-[90%] h-[8rem]' value={udpateData.description}  name='description' type="text" placeholder='edit description'></textarea> <br/><br/>
            <button onClick={updateDataFunc} className='bg-green-600 hover:bg-green-700 p-1 rounded-sm mr-2'>Update</button>
            <button onClick={cancelPopup} className='bg-green-600  hover:bg-green-700 p-1 rounded-sm'>Cancel</button>

          </form>
      </div>
      </section>
  )
}

export default Update