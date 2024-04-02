"use client"
import React, { useState } from 'react'
import { loginUser } from '@/services/userService'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

import { ClipLoader } from 'react-spinners';

import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";




const page = () => {
   const router=useRouter()

  const [loginData,setLoginData]=useState({
    email:"",
    password:""
  });

const [loginLoader,setLoginLoader]=useState(false)

  async function handleLogin(e){
    e.preventDefault();
    setLoginLoader(true)
    try {
      let resp=await loginUser(loginData);
      if(!resp.success){
       setLoginLoader(false)
        throw new Error("Invalid credentails !!")
      }
      setLoginLoader(false)
      toast.success("Login success",{
        position: 'top-center',
      })
      router.push('/')
      console.log("loginpage--> ",resp)
    } 
    catch (error) {
      toast.error("Invalid credentails",{
        position: "top-center",
      })
    }

  }

  return (
    <>
        <section className='flex justify-center items-center h-[100vh] p-10'>
          <ToastContainer/>
          
            <form method='POST' className=' w-[100%] rounded-xl border-[var(--border1)] md:w-[50%] sm:w-[65%] bg-[#272727] p-4 h-[17.5rem] md:h-[19rem]' >

                    <div>
                        <label> <MdOutlineEmail style={{display:"inline-block",marginRight:"0.5rem"}}/> Email</label><br/>
                        <input name='email' value={loginData.email} onChange={(e)=>{
                           setLoginData({
                               ...loginData,email:e.target.value
                           })
                        }} className='w-[90%] outline-none border-b-2  border-gray-500 bg-[#272727] text-white h-8  mt-4 px-2' placeholder='enter name' type='text'/><br/><br/>
                        
                    </div>
                    <div>
                    <label htmlFor=""><RiLockPasswordLine style={{display:"inline-block",marginRight:"0.5rem"}}/>Password</label><br/>
                        <input name='password' value={loginData.value} onChange={(e)=>{
                          setLoginData({
                            ...loginData,password:e.target.value
                          })
                        }} className='w-[90%] outline-none border-b-2  border-gray-500 bg-[#272727] text-white h-8  mt-4 px-2' placeholder='enter password' type="password" />
                    </div>

                    <button onClick={handleLogin} className='bg-[#731273]  rounded-3xl my-10 w-24 hover:bg-black hover:border  p-2'>
                    {
                      (loginLoader)?<ClipLoader color="#fff" size={22} />: "Submit"
                    }
                      </button>

                  
            </form>
            


     </section>
    
        
    </>
  )
}

export default page