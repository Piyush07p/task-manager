"use client"
import React, {  useEffect,useContext} from 'react'
import Link from 'next/link'

import UserContext from '@/context/userContext'
import { logoutUser } from '@/services/userService'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const Navbar = () => {
    const context=useContext(UserContext)
   async function doLogout(){
       
    try {
        const result =await logoutUser()
        context.setCurrUser(undefined)
        // toast.success("logout successfull !!")
    } catch (error) {
        console.log(error);
        toast.error("logout error")
    }

    }
   
  return (
    <>
    
        <nav className='flex items-center justify-between p-2 box-border bg-[#731273] w-[100%]'>
          
            <div className='flex items-center'>
               <p className='text-[0.8rem] sm:text-[1.2rem]'>Tasks <span className='text-green-600'>x</span></p>
            </div>
            <div>
                <ul className='flex items-center  m-2'>
                        <li className='mx-1 sm:mx-2  text-[0.6rem] sm:text-[1rem]  '>
                            <Link href="/">Home</Link>
                        </li>
                        <li className='mx-1 sm:mx-2  text-[0.6rem] sm:text-[1rem]  '>
                        <Link href="/task">Add Task</Link>
                        </li>
                        <li className='mx-1  sm:mx-2 text-[0.6rem] sm:text-[1rem]  '>
                            <Link href="/tasklist">Show task</Link>
                        </li>
                        {
                            (context.currUser)?  
                           <>
                            <li className='mx-1 sm:mx-2  text-[0.6rem] sm:text-[1rem]   font-bold border-b'>
                            <Link href="/profile">{JSON.parse(localStorage.getItem("userName"))}</Link>
                            </li>
                            <li className='mx-1 sm:mx-2  text-[0.6rem] sm:text-[1rem]   shadow-sm  bg-gray-900 px-2 rounded-md py-1'>
                            <Link href={'/login'} onClick={doLogout}>logout</Link>
                            </li>
                           </>
                           :
                           <>
                           <li className='mx-2 text-[0.6rem] sm:text-[1rem]   bg-gray-900 px-2 rounded-md py-1'>
                           <Link href="/login">Login</Link>
                           </li>
                           <li  className='mx-2 text-[0.6rem] sm:text-[1rem]   bg-gray-900 px-2 rounded-md py-1'>
                           <Link href="/Signup">Signup</Link>
                           </li>
                          </>
                        } 
                    
                </ul>
            </div>
        </nav>
        <ToastContainer/>
    </>
  )
}

export default Navbar