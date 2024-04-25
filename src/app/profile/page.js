"use client"
import UserContext from '@/context/userContext'
import React, { useContext,useState,useEffect,useRef} from 'react'
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
const [userlevel,setUserlevel]=useState("novice");
const progressWidth=useRef('')

async function loadStatsfunc(userId){
  let getstatsData=await getStats(userId)
  setStatsData([...getstatsData.statsData]);
  console.log("statsData-->",statsData)
  let sum=getstatsData.statsData.reduce((acc,curr)=>{
    return acc+ curr.accuracy
  },0)

  if(sum!=0){ 
      sum=sum/getstatsData.statsData.length;
  }

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

 const [selectDays,setSelectDays]=useState(4)
 
 function selectDaysFunc(e){
      setSelectDays(e.target.value)
      if(e.target.value=="ten"){
        setSelectDays(10)
      }else if(e.target.value=="week"){
        setSelectDays(7)
      }else if(e.target.value=="allTime"){
        setSelectDays(Infinity)
      }
 }

  return (
        <>
            <section className='p-3 flex flex-col items-center '>
               <h1 className='text-xl my-6'>User Profile</h1>
               <div className=' flex flex-col items-center w-[100%]'>
                    <div className='flex flex-col  sm:flex-row justify-between rounded-md items-center border w-[95%] sm:w-[75%] md:w-[60%] p-3 my-2'>
                       <h1 className='my-2'>Name: {currUser?.name}</h1>
                       <h1>Email: {currUser?.email}</h1>
                    </div>
                    <div className='flex flex-col  sm:flex-row justify-between rounded-md items-center border w-[95%] sm:w-[75%] md:w-[60%] p-3 my-2'>
                           <h1 className='my-2'>Overall Accuracy: {totalAccuracy.toFixed(2)} %
                           
                           </h1>
                          <h1>Your Level: <span className='text-green-400 font-bold'>{userlevel}</span></h1>
                    </div>
                    <div className='felx flex-col  rounded-md items-center border w-[95%] sm:w-[75%] md:w-[60%] p-3'>
                        <div className='flex justify-between items-center'>
                        <h2 className=' p-0 my-2 font-bold text-green-500 text-[1.3rem] sm:text-[1.6rem]'>Your activity</h2>
                          <select onChange={selectDaysFunc}   className='bg-gray-950  border-none outline-none sm:w-[7.5rem] w-[6rem] h-[2rem]'>
                             <option >Choose</option>
                             <option  value={"week"}>Last 7 days</option>
                             <option  value={"ten"}>Last 10 days</option>
                             <option  value={"allTime"}>All time</option>
                          </select>
                        </div>
                            {
                               (!statsData?.length)
                               ?
                                <div className='h-[30vh] flex justify-center items-center'>
                                    {/* <p className={`${loading?"":"hidden"}`}> </p> */}
                                    <ScaleLoader  color="#731273" size={20} />
                                </div>
                               :statsData?.reverse().slice(0,selectDays).map((elem,ind)=>{
                                return(
                                  <>
                                    <div className='border p-3 m-2'>
                                      <div className='flex justify-between'>
                                        <h1 className='mb-2 text-[0.9rem] sm:text-[1.2rem]'>Day: {ind+1}</h1>
                                        <h1 className='flex mb-2 text-[0.7rem] sm:text-[1rem]'> <BsCalendar2Check className=' sm:text-[1.2rem] mr-2'/> {elem.date}</h1>
                                      </div>
                                      <h1 className='text-[0.8rem] sm:text-[1rem]'>Completed task: {elem.taskCompleted}</h1>
                                      <h1 className='text-[0.8rem] sm:text-[1rem]'>Pending task: {elem.pendingTask}</h1>
                                      <div className='flex items-center mt-4'>
                                          <h1 className='text-[0.8rem] sm:text-[1rem]'>Accuracy:</h1>
                                          <p className='h-[1.5rem] m-2 w-[10rem] border flex items-center '>
                                            <p style={{width:`${elem.accuracy}%`}}  className={`progressWidth ${elem.accuracy>70?"bg-green-600":elem.accuracy>40?"bg-green-400":"bg-red-400"}  h-[1.2rem]`}></p> 
                                          </p>
                                          <p className='text-[0.75rem]'>{elem.accuracy.toFixed(2)}%</p>
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