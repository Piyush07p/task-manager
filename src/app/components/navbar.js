"use client"
import React, {  useEffect,useContext} from 'react'
import Link from 'next/link'

import UserContext from '@/context/userContext'
import { logoutUser } from '@/services/userService'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

import { FiHome } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { GrTask } from "react-icons/gr";


const Navbar = () => {
   const {currUser,setCurrUser}=useContext(UserContext)
   console.log("current_user2-->",currUser)
   const router=useRouter()
   async function doLogout(){
       
    try {
        const result =await logoutUser()
        setCurrUser(undefined)
        router.push('/login')
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
               <p className='text-[0.8rem] sm:text-[1.2rem]'>Tasks</p>
            </div>
            <div>
                <ul className='flex items-center  m-2'>
                        <li className='group mx-3 sm:w-[5rem]  sm:mx-2 navli   text-[1rem] sm:text-[1.2rem]  '>
                            <Link href="/"><FiHome style={{display:"inline-block",marginBottom:"0.3rem",marginRight:"0.2rem"}} /><span className='hidden sm:group-hover:inline'>Home</span></Link>
                        </li>
                        {/* <li className='mx-1 sm:mx-2  text-[0.6rem] sm:text-[1rem]  '>
                        <Link href="/task">Add Task</Link>
                        </li> */}
                        <li className='group mx-3 sm:w-[8rem]   transition-all sm:hover:w-[8rem] sm:mx-2 navli text-[1rem] sm:text-[1.2rem]  '>
                            <Link href="/tasklist"><GrTask style={{display:"inline-block",marginBottom:"0.3rem",marginRight:"0.2rem"}} /><span className='hidden  sm:group-hover:inline'>Show tasks</span></Link>
                        </li>
                        {
                            (currUser)?  
                           <>
                            <li className='mx-3 sm:mx-2  text-[0.8rem] sm:text-[1rem]   font-bold '>
                            <Link href="/profile"><FaRegUser style={{display:"inline-block",marginBottom:"0.3rem"}}/> {JSON.parse(localStorage.getItem("userName"))}</Link>
                            </li>
                            <li className='mx-3 sm:mx-2  text-[0.8rem] sm:text-[1rem]   shadow-sm  bg-gray-900 px-2 rounded-md py-1'>
                            <button  onClick={doLogout}>logout</button>
                            </li>
                           </>
                           :
                           <>
                           <li className='mx-2 text-[0.8rem] sm:text-[1rem]   bg-gray-900 px-2 rounded-md py-1'>
                           <Link href="/login">Login</Link>
                           </li>
                           <li  className='mx-2 text-[0.8rem] sm:text-[1rem]   bg-gray-900 px-2 rounded-md py-1'>
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