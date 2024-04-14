"use client"
import UserContext from '@/context/userContext'
import React, { useContext,useState,useEffect} from 'react'
import {ResponsiveContainer,PieChart,Pie,Tooltip,XAxis, LineChart, Line} from 'recharts'
import moment from 'moment'
import { getStats } from '@/services/taskService'
import { BsCalendar2Check } from "react-icons/bs";
import ScaleLoader from "react-spinners/ScaleLoader";


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


const [statsData,setStatsData]=useState([])
const [totalAccuracy,setTotalAccuracy]=useState(0);
const [userlevel,setUserlevel]=useState("");

async function loadStatsfunc(userId){
  let getstatsData=await getStats(userId)
  setStatsData([...getstatsData.statsData]);
  console.log("statsData-->",statsData)
  let sum=getstatsData.statsData.reduce((acc,curr)=>{
    return acc+ curr.accuracy
  },0)
  sum=sum/getstatsData.statsData.length;
  setTotalAccuracy(sum)
  if(sum<40){
    setUserlevel("Novice")
  }else if(sum>40&&sum<70){
    setUserlevel("Intermediate")
  }else if(sum>70&&sum<85){
    setUserlevel("Advance")
  }else{
    setUserlevel("Expert")
  }
}
useEffect(()=>{
  
   loadStatsfunc(currUser?._id);
  
 },[currUser])




  return (
        <>
            <section className='p-3 flex flex-col items-center '>
               <h1 className='text-xl my-6'>Profile page</h1>
               <div className=' flex flex-col items-center w-[100%]'>
                    <div className='flex flex-col  sm:flex-row justify-between rounded-md items-center border w-[95%] sm:w-[60%] md:w-[50%] p-3 my-2'>
                       <h1 className='my-2'>Name: {currUser?.name}</h1>
                       <h1>Email: {currUser?.email}</h1>
                    </div>
                    <div className='flex flex-col  sm:flex-row justify-between rounded-md items-center border w-[95%] sm:w-[60%] md:w-[50%] p-3 my-2'>
                           <h1 className='my-2'>Overall Accuracy: {totalAccuracy.toFixed(2)} %
                           
                           </h1>
                          <h1>Level: {userlevel}</h1>
                    </div>
                    <div className='felx flex-col  rounded-md items-center border w-[95%] sm:w-[60%] md:w-[50%] p-3'>
                        <h2 className='border-b-2 p-0 my-2 font-bold text-green-500 text-[1.5rem] sm:text-[1.8rem]'>Your activity</h2>
                        
                            {
                               (!statsData?.length)
                               ?
                                <div className='h-[30vh] flex justify-center items-center'>
                                    {/* <p className={`${loading?"":"hidden"}`}> </p> */}
                                    <ScaleLoader  color="#731273" size={20} />
                                </div>
                               :statsData?.map((elem)=>{
                                return(
                                  <>
                                    <div className='border p-3 m-2'>
                                      <h1 className='flex'> <BsCalendar2Check className='text-[1.2rem] mr-2'/> {elem.date}</h1>
                                      <h1>Completed task: {elem.taskCompleted}</h1>
                                      <h1>Pending task: {elem.pendingTask}</h1>
                                      <div className='flex items-center'>
                                          <h1>Accuracy:</h1>
                                          <p className='h-[1.5rem] m-2 w-[10rem] border flex items-center '>
                                            <p className=' bg-green-500 w-[50%] h-[1.2rem] mr-2'></p> {elem.accuracy.toFixed(2)}%
                                          </p>
                                      </div>
                                    </div>
                                  </>
                                )
                              })
                            } 
                       
                    </div>
                    
               </div>
               
            
            </section>   
        </>
  )
}

export default page