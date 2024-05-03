"use client"
import { useEffect, useRef, useState } from "react"
import { MdDelete } from "react-icons/md";
import { ClipLoader } from 'react-spinners';
import { CiSquarePlus } from "react-icons/ci";
import { LiaHandPointRight } from "react-icons/lia";
import { addRandomTask } from '@/services/taskService';

const page = () => {

    // const getLocalStorageData=()=>{
    //     let data=localStorage.getItem("storedTaskArr");
    //     if(data){
    //         return JSON.parse(localStorage.getItem("storedTaskArr"))
    //     }else{
    //         return []
    //     }
    // }
    const [task,setTask]=useState('')
    const [taskArray,setTaskArray]=useState([])
    const [loader,setLoader]=useState(false)
   function addTask(){
    setTaskArray([...taskArray,task])
     setTask('')
   }

   const deleteTask=(id)=>{
      const updateTasks=taskArray.filter((elem,ind)=>{
        return ind!=id;
      })
      setTaskArray(updateTasks)
   }
  
   useEffect(()=>{
    // localStorage.setItem("storedTaskArr",JSON.stringify(taskArray))
   },[taskArray])

    const taskRef=useRef('')
    const [randomTasks,setRandomTask]=useState([])

   const getRandomTask=()=>{
        setLoader(true)
        if(randomTasks.length){
            setRandomTask([])
        }
        let  addedTaskLen=taskArray.length;
        let  selectedTaskLen=taskRef.current.value;
        if(selectedTaskLen<1){
            alert("set no. of task !!")
             setLoader(false)
            return
        }
        if (selectedTaskLen > addedTaskLen) {
            console.error("Cannot be more tha added Tasks");
            return ;
        }

        while(randomTasks.length<selectedTaskLen){
            const randomIndex=Math.floor(Math.random()*addedTaskLen);
            const getTask=taskArray[randomIndex];
            console.log("--->",getTask)
            if(!randomTasks.includes(getTask)){
                randomTasks.push(getTask)
            }
        } 
   }

   const deleteTask2=(id)=>{
    const updateTasks=randomTasks.filter((elem,ind)=>{
        return ind!=id;
      })
      setRandomTask(updateTasks)
  }

   useEffect(()=>{

    let timeoutId;

        timeoutId = setTimeout(() => {
            setLoader(false);
        }, 2000);
    
    return () => {
        clearTimeout(timeoutId);
    };
  

   },[loader])

// ---------------(addding to taskList)----------------

   
   const addToTaskList=async(title)=>{
    const randomTask={
        title:title
    }
    try {
    
       const res=await addRandomTask(randomTask)

    }
     catch (error) {
    //   toast.error("Something went wrong",{
    //     position:'top-center'
    //   })
      alert(error)
      console.log("taskError--> ",error);
    }

}

  return (
    <section className="p-2 flex text-white flex-col items-center">
         <div style={{border:"1px solid rgba(109,105,105,0.5)"}} className="py-4 px-2 rounded-md text-[0.8rem] sm:text-[1rem]  w-[95%] sm:w-[80%] md:w-[60%] mt-10  items-center justify-between">
            <h1 className="text-[1.6rem] mx-3 ">Note :</h1>
            <p className="flex w-full  pb-6 px-4">When we have multiple pending tasks to do, we remain confuse which tasks to choose, let taskfreak to choose tasks for you.</p>

             <ul className=""> 
                <p className="flex w-full py-1"><span><LiaHandPointRight className="text-[1.2rem]  mx-2"/></span>Add title of all your pending  tasks.</p>
                <p className="flex w-full  py-1"><span><LiaHandPointRight className="text-[1.2rem]  mx-2"/></span>After that choose how many tasks you want to do today out of multiple tasks added.</p>
                <p className="flex w-full py-1"><span><LiaHandPointRight className="text-[1.2rem]  mx-2"/></span>Click on the Get Random Tasks button below which will randomly choose tasks for you. </p>
                <p className="flex w-full py-1"><span><LiaHandPointRight className="text-[1.2rem]  mx-2"/></span>Click on the plus (+) icon to add these tasks to your tasklist</p>
                <p className="flex w-full py-1"><span><LiaHandPointRight className="text-[1.2rem]  mx-2"/></span>Keep in mind that you have to stick to the tasks choosen by taskfreak and complete it by today.</p>


             </ul>
          </div>

         <div  style={{border:"1px solid rgba(109,105,105,0.5)"}} className="w-[95%] rounded-md sm:w-[80%] md:w-[60%] p-3 my-4">
             <input ref={taskRef} className="bg-[#272727] w-[80%] px-1 h-[2rem] my-2" placeholder="No. of task" type="number"/>
             <div className="flex flex-col flex-wrap  w-[80%]  justify-between ">
                <input  name="title" value={task} onChange={(e)=>setTask(e.target.value)}  placeholder="add title" className="bg-[#272727] text-[white] my-4 w-[100%] h-[2rem] px-1 rounded" type="text"/>
                <button className="w-[4rem] sm:text[1.2rem] text-[0.8rem] px-4 py-1 bg-green-600 rounded" onClick={addTask}>Add</button>
             </div>
            <div>
                  <ul className="my-4 flex flex-wrap">
                       {
                           taskArray?.map((elem,ind)=>{
                            return(
                                <>
                                    <li className="rounded-md py-1 px-2 my-2 flex-wrap items-center min-w-[6.5rem] sm:min-w-[9rem] m-2 bg-[#272727] flex justify-between">
                                        <span className="whitespace-break-spaces	 ">{elem}</span>
                                        <span><MdDelete onClick={()=>deleteTask(ind)} style={{cursor:"pointer",marginLeft:"0.5rem"}}/></span>
                                    </li>
                                </>
                            )
                           })
                       }
                  </ul>
            </div>
        </div>  
        <div  style={{border:"1px solid rgba(109,105,105,0.5)"}} className="w-[95%] rounded-md sm:w-[80%] md:w-[60%] py-4">
            <div className=" flex flex-col justify-center items-center py-2">
                <p className="mt-4">Click on the button</p>
                 <ul className="m-4 flex flex-wrap">
                        {
                            loader? <ClipLoader color="#fff" size={22} />
                            :randomTasks?.map((elem,ind)=>{
                                return(
                                    <>
                                        <p className="rounded-md py-1 px-2 my-2 items-center min-w-[10rem] m-2 bg-[#272727] flex justify-between">
                                                <span>{elem}</span>
                                                <CiSquarePlus onClick={()=>{
                                                    addToTaskList(elem);
                                                    deleteTask2(ind)
                                                }} className="text-[1.5rem] cursor-pointer"/>
                                        </p>
                                    </>
                                )
                            })
                        }
                 </ul>
            </div>
            <div className=" flex justify-center items-center">
                 <button className=" px-4 py-1 bg-green-600 rounded" onClick={getRandomTask} >Get Random Tasks</button>
            </div>
        </div>
    </section>
  )
}

export default page