"use client"
import UserContext from '@/context/userContext'
import React, { useContext } from 'react'

const page = () => {

const {activeData,setActiveData}=useContext(UserContext);
console.log(activeData)


  return (
        <>
            <section className='h-[100vh] flex flex-col items-center '>
               <h1 className='text-xl my-6'>Profile page</h1>
               <div className=' flex flex-col items-center w-[100%]'>
                    <h1 className='my-2'>Name: xyz</h1>
                    <div className='felx flex-col  rounded-md items-center border w-[80%] sm:w-[60%] md:w-[50%] p-3'>
                        <h2 className='border-b-2 p-0 my-2 text-[red]'>Your activity</h2>
                        <div>
                          <p>date : {activeData.dateAdded}</p>
                            <h1>Task pending:{activeData.length}</h1>
                            <h1>Task completed:</h1>
                        </div>
                    </div>
               </div>
            </section>   
        </>
  )
}

export default page