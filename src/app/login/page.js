"use client"
import React, { useState } from 'react'
import { loginUser } from '@/services/userService'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

import { ClipLoader } from 'react-spinners';
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
          
            <form method='POST' className=' w-[90%] md:w-[50%] sm:w-[65%] bg-[#272727] p-4 h-[15.5rem] md:h-[17rem]' >

                    <div>
                        <label>Email</label><br/>
                        <input name='email' value={loginData.email} onChange={(e)=>{
                           setLoginData({
                               ...loginData,email:e.target.value
                           })
                        }} className='w-[90%]  text-black h-8 rounded-md mt-2 px-2' placeholder='enter your name' type='text'/><br/><br/>
                        
                    </div>
                    <div>
                    <label htmlFor="">password</label><br/>
                        <input name='password' value={loginData.value} onChange={(e)=>{
                          setLoginData({
                            ...loginData,password:e.target.value
                          })
                        }} className='w-[90%]  text-black h-8 rounded-md mt-2 px-2' placeholder='enter your name' type="password" />
                    </div>

                    <button onClick={handleLogin} className='bg-[#731273] rounded-md my-8 w-20 hover:bg-black hover:border  p-1'>
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