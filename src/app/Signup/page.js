"use client"
import React, { useState } from 'react'
import { addUser } from '@/services/userService'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiUserCheck } from "react-icons/fi";
import { FiUpload } from "react-icons/fi";


const page = () => {
    const [signData,setSignData]=useState({
            name:"",
            email:"",
            password:"",
            taskId:"65bce38d6ab04829bd7b8319"
    })
    async function handleSignup(event){
            event.preventDefault();
            try {
               
                const resp= await addUser(signData)
                console.log("signup--> ",resp)
                if(resp){
                    toast.success("user registeration success !!",{
                      position:'top-center'
                    })
                    setSignData({
                     name:"",
                     email:"",
                     password:"",
                     taskId:"65bce38d6ab04829bd7b8319"
                    })
                   }
            } catch (error) {
                toast.error("Something went wrong !",{
                    position:'top-center'
                  })
                console.log("signupErr--> ", error )
            }
    }
 return(
    <>
     <section className='flex justify-center items-center h-[100vh] p-10'>
          <ToastContainer/>
            <form method='POST' className='bg-[#272727] rounded-2xl w-[100%] md:w-[60%] lg:w-[50%] sm:w-[65%] p-4 h-[24rem]' >
                    <div>
                        <label><FiUserCheck style={{display:"inline-block",marginRight:"0.5rem"}}/>Name</label><br/>
                        <input value={signData.name} name="name" onChange={(e)=>{
                            setSignData({
                                ...signData,name:e.target.value
                            })
                        }} className='w-[90%] outline-none border-b-2  border-gray-500 bg-[#272727] text-white h-8  mt-4 px-2' placeholder='enter your name' type="text"/> <br/><br/>
                       
                    </div>
                    <div>
                        <label><MdOutlineEmail style={{display:"inline-block",marginRight:"0.5rem"}}/>Email</label><br/>
                        <input  value={signData.email} name="email" onChange={(e)=>{
                            setSignData({
                                ...signData,email:e.target.value
                            })
                        }}  className='w-[90%] outline-none border-b-2  border-gray-500 bg-[#272727] text-white h-8  mt-4 px-2' placeholder='enter your email' type='text'/><br/><br/>
                        
                    </div>
                    <div>
                    <label htmlFor=""><RiLockPasswordLine style={{display:"inline-block",marginRight:"0.5rem"}}/>Password</label><br/>
                        <input  value={signData.password} name="password" onChange={(e)=>{
                            setSignData({
                                ...signData,password:e.target.value
                            })
                        }}  className='w-[90%] outline-none border-b-2  border-gray-500 bg-[#272727] text-white h-8  mt-4 px-2' placeholder='enter your name' type="password" />
                    </div>

                    <button onClick={handleSignup} className='bg-[#731273]  rounded-3xl my-10 w-24 hover:bg-black hover:border  p-2'>Submit <FiUpload style={{display:"inline-block",marginRight:"0.2rem"}}/></button>
            </form>

          
     </section>
    </>
 )
}

export default page