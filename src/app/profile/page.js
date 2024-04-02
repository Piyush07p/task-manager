"use client"
import UserContext from '@/context/userContext'
import React, { useContext,useState,useEffect} from 'react'
import {ResponsiveContainer,PieChart,Pie,Tooltip,XAxis} from 'recharts'
const page = () => {

const {activeData,setActiveData,completedTaskData,setCompletedTaskData}=useContext(UserContext);

const [profileData, setProfileData] = useState(()=>{
  const changedCount=localStorage.getItem("profileData");
  return changedCount?changedCount:[]
})
console.log("activeData",activeData)
useEffect(()=>{

  localStorage.setItem("profileData",JSON.stringify(activeData))
},[profileData])



const data02=[
  {
    "name": "Completed",
    "value": 0
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
                    <h1 className='my-2'>Name: xyz</h1>
                    <div className='felx flex-col  rounded-md items-center border w-[80%] sm:w-[60%] md:w-[50%] p-3'>
                        <h2 className='border-b-2 p-0 my-2 text-[red]'>Your activity</h2>
                        <div>
                          <p>date : {activeData.dateAdded}</p>
                            <h1>Task pending:{profileData.length}</h1>
                            <h1>Task completed:</h1>
                            <h1>this{completedTaskData}</h1>
                        </div>
                    </div>
               </div>
              <div className='w-[100%] h-[20rem]'>
                {/* <ResponsiveContainer >
                    <h1>Today's Activity</h1>
                    <PieChart className="" width={100} height={10}>
                      <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="red" /> 
                      <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} fill="#e671e6" label />
                      <Tooltip/>
                    </PieChart>
                </ResponsiveContainer> */}
              </div>
            </section>   
        </>
  )
}

export default page