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
                    <h1>name: mike</h1>
                    <div className='felx flex-col items-center border w-[80%] sm:w-[60%] md:w-[40%] p-3'>
                        <h2>Your activity</h2>
                        <div>
                          <p>date :</p>
                            <h1>Task pending:{activeData.length}</h1>
                            <h1>Task completed: 4</h1>
                        </div>
                    </div>
               </div>
            </section>   
        </>
  )
}

export default page