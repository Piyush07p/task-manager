"use client";
import React, { useState,useEffect } from 'react'
import Image from "next/image"; 
import svg from '../assets/notes_svg.svg'
import { createNotes } from '@/services/notesService';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

const page = () => {
   const [notesData,setNotesData]=useState({
          title:"",
          content:"",
          userId:"65bfe15b4e8941ff6607ef12"
   })

   const [taskLoader,setTaskLoader]=useState(false)

   const handleCreateNotes=async(event)=>{
      
        event.preventDefault();
        setTaskLoader(true)
        try { 

            const res=await createNotes(notesData)
           if(res.msg=="Fill all the fields"){
            toast.warning("Fields can't be empty !!",{
              position:'top-center'
            })
            setTaskLoader(false)
           }
           else{
            setTaskLoader(false)
            toast.success("Notes created successfully..!!",{
              position:'top-center'
            })
            setNotesData({
              title:"",
              content:"",
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
        <section className='p-2 text-white flex flex-col items-center  '>
            <ToastContainer />
              <div className=' mt-3 ' >
                <Image alt='image' className='w-[16rem] sm:w-[20rem] h-[20rem]' src={svg}/>
              </div>
              <div className=' p-4 w-[95%] sm:w-[60%] md:w-[50%]  my-2 text-black'>
                <h1 className='text-white font-bold mb-2'>Create notes here...</h1>
                 <form onSubmit={handleCreateNotes} className='w-[100%] sm:text-[1rem] text-white text-[0.7rem] '>
                      <div className='w-[100%]'>
                        
                        <label>Enter title</label> <br/>
                        <input  required  placeholder='enter title' className=' w-[100%] px-2 bg-[#272727] text-white h-8 sm:h-10' onChange={(e)=>{
                            setNotesData({
                              ...notesData, 
                              title:e.target.value
                            })
                        }} value={notesData.title} type='text'/> <br/> <br/>
                      </div>
                      <div>
                        <label>Enter description</label> <br/>
                        <textarea required   placeholder='enter description'  onChange={(e)=>{
                            setNotesData({
                              ...notesData, 
                              content:e.target.value
                            })
                        }} value={notesData.content} className=' w-[100%] px-2 bg-[#272727] text-white h-[6.5rem] sm:h-[5.5rem]  ' type='text'></textarea> <br/><br/>
                      </div>
                      
                      <div>
                         <button  className='bg-[#731273] w-[8rem] py-2 px-2 my-4 rounded-sm text-white' >
                            {
                            (taskLoader)? <ClipLoader color="#fff" size={22} />:"Create Note"
                            }
                          </button>
                      </div>
                 </form>
               
              </div>

        </section>
    </>
  )
}

export default page