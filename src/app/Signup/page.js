"use client"
import React, { useState } from 'react'
import { addUser } from '@/services/userService'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

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
            <form method='POST' className='bg-[#272727] w-[90%] md:w-[50%] sm:w-[65%] p-4 h-[22rem]' >
                    <div>
                        <label>Name</label><br/>
                        <input value={signData.name} name="name" onChange={(e)=>{
                            setSignData({
                                ...signData,name:e.target.value
                            })
                        }} className='w-[90%] text-black h-8 rounded-md mt-2 px-2' placeholder='enter your name' type="text"/> <br/><br/>
                       
                    </div>
                    <div>
                        <label>Email</label><br/>
                        <input  value={signData.email} name="email" onChange={(e)=>{
                            setSignData({
                                ...signData,email:e.target.value
                            })
                        }}  className='w-[90%]  text-black h-8 rounded-md mt-2 px-2' placeholder='enter your name' type='text'/><br/><br/>
                        
                    </div>
                    <div>
                    <label htmlFor="">password</label><br/>
                        <input  value={signData.password} name="password" onChange={(e)=>{
                            setSignData({
                                ...signData,password:e.target.value
                            })
                        }}  className='w-[90%]  text-black h-8 rounded-md mt-2 px-2' placeholder='enter your name' type="password" />
                    </div>

                    <button onClick={handleSignup} className='bg-[#731273] rounded-md my-8 w-20 hover:bg-black hover:border  p-1'>Submit</button>
            </form>

          
     </section>
    </>
 )
}

export default page