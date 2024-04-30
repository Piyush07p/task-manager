"use client"
import React, { useState ,useContext} from 'react'
import UserContext from '@/context/userContext'
import { loginUser } from '@/services/userService'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

import { ClipLoader } from 'react-spinners';


//icons
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";




const page = () => {
   const router=useRouter()

  const [loginData,setLoginData]=useState({
    email:"",
    password:""
  });
  const [showPass,setShowPass]=useState(false)
const [loginLoader,setLoginLoader]=useState(false)

const {loadUser}=useContext(UserContext)

// ----------------------(Login_handler)--------------------
//-----------------------(            )--------------------

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
      loadUser()
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
  const showPassFunc=(flag)=>{
      if(flag){
        setShowPass(flag)
      }else{
        setShowPass(flag)
      }
  }
  return (
    <>
        <section className='flex  w-full  justify-center pt-[5rem] py-4  px-10'>
          <ToastContainer/>
          
            <form method='POST' className='  w-[100%] rounded-xl border-[var(--border1)] md:w-[50%] sm:w-[65%] bg-[#272727] p-4 h-[17.5rem] md:h-[19rem]' >

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
                      <div className='flex'>
                        <input name='password' value={loginData.value} onChange={(e)=>{
                          setLoginData({
                            ...loginData,password:e.target.value
                          })
                        }} className='passInput w-[90%] outline-none border-b-2  border-gray-500 bg-[#272727] text-white h-8  mt-4 px-2' placeholder='enter password' type={showPass?"text":"password"} />
                        <span className='cursor-pointer' >{(showPass)?<FaEye onClick={()=>showPassFunc(false)}/>:<FaEyeSlash onClick={()=>showPassFunc(true)}/>}</span>
                      </div>
                    </div>

                    <button onClick={handleLogin} className='bg-[#731273]  rounded-3xl my-10 w-24 hover:bg-black hover:border  p-2'>
                      {
                        (loginLoader)?<ClipLoader color="#fff" size={22} />: "Submit"
                      }
                    </button>

                  
            </form>

     </section>
     <div className='flex justify-center w-full px-10 pb-10'>
        <div style={{border:"1px solid rgba(109,105,105,0.5)"}} className="py-4 px-2 rounded-md text-[0.8rem] sm:text-[1rem]  w-[100%] md:w-[50%] sm:w-[65%] mt-10 flex-col items-center justify-center">
             <h1 className='text-[1.2rem] mb-4'>Login with this credentails for demo</h1>
              <p className="flex"><span className='border px-2 rounded'>Email</span> : demouser22@gmail.com</p>
              <p className="flex"><span className='border px-2 rounded'>Password</span>  : demouser22</p>
          </div>
     </div>
        
    </>
  )
}

export default page