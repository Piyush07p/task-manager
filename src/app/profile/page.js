"use client"
import UserContext from '@/context/userContext'
import React, { useContext,useState,useEffect} from 'react'
import {ResponsiveContainer,PieChart,Pie,Tooltip,XAxis, LineChart, Line} from 'recharts'
import moment from 'moment'
const page = () => {

const {currUser,setCurrUser,activeData,setActiveData,completedTaskData,setCompletedTaskData,loadUser}=useContext(UserContext);

// const [profileData, setProfileData] = useState(()=>{
//   const changedCount=localStorage.getItem("profileData");
//   return changedCount?changedCount:[]
// })

useEffect(()=>{
  loadUser()

},[])
console.log("current_profile_user-->",currUser)
// useEffect(()=>{

//   localStorage.setItem("profileData",JSON.stringify(activeData))
// },[profileData])



const data02=[
  {
    "name": "Completed",
    "value": 3
  },
  {
    "name": "Pending",
    "value": activeData.length
  }
  
]

  return (
        <>
            <section className='p-3 flex flex-col items-center '>
               <h1 className='text-xl my-6'>Profile page</h1>
               <div className=' flex flex-col items-center w-[100%]'>
                    <div className='flex flex-col  sm:flex-row justify-between rounded-md items-center border w-[80%] sm:w-[60%] md:w-[50%] p-3 my-2'>
                       <h1 className='my-2'>Name: {currUser.name}</h1>
                       <h1>Email: {currUser.email}</h1>
                    </div>
                    <div className='felx flex-col  rounded-md items-center border w-[80%] sm:w-[60%] md:w-[50%] p-3'>
                        <h2 className='border-b-2 p-0 my-2 font-bold text-green-500 text-[1.5rem] sm:text-[1.8rem]'>Your activity</h2>
                        <div>
                          <p>Date : {moment().format("Do MMMM YYYY")}</p>
                            {/* <h1>Task pending:{profileData.length}</h1> */}
                            <h1>Task completed: {activeData.completedTask?.length}</h1>
                            <h1>Task pending: {activeData.tasks?.length-activeData.completedTask?.length}</h1>
                        </div>
                    </div>
               </div>
               
              <div className='w-[100%] h-[20rem]'>
                {/* <ResponsiveContainer >
                    <h1>Your Activity</h1>
                    <PieChart className="" width={100} height={10}>
                      <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} fill="#e671e6" label />
                      <Tooltip/>
                    </PieChart>
                </ResponsiveContainer>
              </div>
              <div className='w-[100%] h-[20rem]'>
                <ResponsiveContainer className="w-[50%]" >
                    <h1>Your Activity</h1>
                    <LineChart className="" width={100} height={10}>
                      <Line data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} fill="#e671e6" label />
                      <Tooltip/>
                    </LineChart>
                </ResponsiveContainer> */}
              </div>
            </section>   
        </>
  )
}

export default page