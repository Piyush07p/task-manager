"use client"
import React from 'react'
import { useState ,useContext} from 'react'
import { editTask } from '@/services/taskService'
import UserContext from '@/context/userContext'

const Update = () => {
  const {taskId,setTaskid,hidePopup,setHidePopup}=useContext(UserContext)

     console.log("props-->",taskId)
    const [udpateData,setUpdateData]=useState({
        title:"",
        description:""
    })
    const updateData=async (e)=>{
        e.preventDefault();
        setHidePopup(false)
        try {
             let resp=await editTask(taskId,udpateData);
             window.location.reload()
        } catch (error) {
           console.log(error) 
        }
    }
    const cancelPopup=()=>{
        setHidePopup(false)
    }
  return (
      <section className='w-[100%] my-2  flex justify-center '>
        <div className='transition duration-200 border text-[0.8rem]  rounded-md p-3 w-[80%] sm:w-[50%] md:w-[45%] md:text-[1rem]'>
          <h1>Edit your task</h1> <br/>
          <form method='PUT'>
            <input onChange={(e)=>{
                 setUpdateData({
                    ...udpateData,title:e.target.value
                })
            }
            } value={udpateData.title} name='title' className='text-[black]  w-[90%]  h-[2rem] px-2 md:w-[90%]' type="text" placeholder='edit title'/> <br/><br/>
            <textarea onChange={(e)=>{
                setUpdateData({
                    ...udpateData,description:e.target.value
                })
            }} className='text-[black] w-[90%]  px-2 md:w-[90%] h-[5rem]'  name='description' type="text" placeholder='edit description'></textarea> <br/><br/>
            <button onClick={updateData} className='bg-[green] p-1 rounded-sm mr-2'>Update</button>
            <button onClick={cancelPopup} className='bg-[green] p-1 rounded-sm'>Cancel</button>

          </form>
      </div>
      </section>
  )
}

export default Update