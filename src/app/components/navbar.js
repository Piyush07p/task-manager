"use client"
import React, {useEffect,useContext} from 'react'
import Link from 'next/link'

import UserContext from '@/context/userContext'
import { logoutUser } from '@/services/userService'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

import { FiHome } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { GrTask } from "react-icons/gr";
import { MdAddTask } from "react-icons/md";
import { CgNotes } from "react-icons/cg";

const Navbar = () => {
   const {currUser,setCurrUser}=useContext(UserContext)
   console.log("current_user2-->",currUser)
   const router=useRouter()

   async function doLogout(){
       
    try {
        const result =await logoutUser()
        setCurrUser('')
        router.push('/login')
        // toast.success("logout successfull !!")
    } catch (error) {
        console.log(error);
        toast.error("logout error")
    }

    }
    
   
  return (
    <>
    
        <nav className='flex items-center text-white justify-between p-2 box-border bg-[#731273] w-[100%]'>
          
            <div className='flex items-center'>
               <p className='text-[0.8rem] sm:text-[1.2rem]'>Taskfreak</p>
            </div>
            <div>
                <ul className='flex items-center text-white  m-1'>
                        <li className='group mx-3 sm:w-[5rem]  sm:mx-2 navli   text-[1.2rem] sm:text-[1.2rem]  '>
                            <Link href="/"><FiHome style={{display:"inline-block",marginBottom:"0.3rem",marginRight:"0.2rem"}} /><span className='hidden sm:inline  text-[0.9rem]'>Home</span></Link>
                        </li>
                        {/* <li className='mx-1 sm:mx-2  text-[0.6rem] sm:text-[1rem]  '>
                        <Link href="/task">Add Task</Link>
                        </li> */}
                        <li className='group  sm:w-[8rem]    sm:hover:w-[8rem] sm:mx-2 navli text-[1.2rem] sm:text-[1.2rem]  '>
                            <Link href="/tasklist"><MdAddTask style={{display:"inline-block",marginBottom:"0.3rem",marginRight:"0.2rem"}} /><span className='hidden sm:inline text-[0.9rem]  sm:group-hover:inline'>Show tasks</span></Link>
                        </li>
                        <li className='group  sm:w-[8rem]    sm:hover:w-[8rem] sm:mx-2 navli text-[1.2rem] sm:text-[1.2rem]  '>
                            <Link href="/noteslist"><CgNotes style={{display:"inline-block",marginBottom:"0.3rem",marginRight:"0.2rem"}} /><span className='hidden sm:inline text-[0.9rem]  sm:group-hover:inline'>Notes</span></Link>
                        </li>
                        {
                            (currUser)?  
                           <>
                            <li className='mx-3 sm:mx-2  text-[0.8rem] sm:text-[1rem]   font-bold '>
                            <Link href="/profile"><FaRegUser style={{display:"inline-block",marginBottom:"0.3rem"}}/> {JSON.parse(localStorage.getItem("userName")).substring(0,8)}</Link>
                            </li>
                            <li className='ml-2 sm:mx-2  text-[0.8rem] sm:text-[1rem]   shadow-sm  border-2 px-2 rounded-md py-1'>
                            <button  onClick={doLogout}>logout</button>
                            </li>
                           </>
                           :
                           <>
                           <li className='mx-2 text-[0.8rem] sm:text-[1rem] text-black font-semibold   bg-[white] px-2 rounded-md py-1'>
                           <Link href="/login">Login</Link>
                           </li>
                           <li  className='mx-2 text-[0.8rem] sm:text-[1rem] box-border  border-2 px-2 rounded-md py-1'>
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