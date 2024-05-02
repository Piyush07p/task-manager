"use client"
import { useEffect, useRef, useState } from "react"
import { MdDelete } from "react-icons/md";
import { ClipLoader } from 'react-spinners';


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

   useEffect(()=>{

    let timeoutId;

        timeoutId = setTimeout(() => {
            setLoader(false);
        }, 2000);
    
    return () => {
        clearTimeout(timeoutId);
    };
  

   },[loader])


  return (
    <section className="h-screen flex flex-col items-center">
         <div  style={{border:"1px solid rgba(109,105,105,0.5)"}} className="w-[95%] sm:w-[60%] p-3 my-4">
             <input ref={taskRef} className="bg-[#272727] w-[8rem] px-1 h-[2rem] mx-5 my-2" placeholder="No. of task" type="number"/>
             <div className="flex flex-wrap items-center justify-between px-5">
                <input  name="title" value={task} onChange={(e)=>setTask(e.target.value)}  placeholder="add title" className="bg-[#272727] my-4 w-[80%] h-[2rem] px-1 rounded" type="text"/>
                <button className=" px-4 py-1 bg-green-600 rounded" onClick={addTask}>Add</button>
             </div>
            <div>
                  <ul className="m-4 flex flex-wrap">
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
        <div  style={{border:"1px solid rgba(109,105,105,0.5)"}} className="w-[95%] sm:w-[60%] py-4">
            <div className=" flex flex-col justify-center items-center py-2">
                <p className="mt-4">Double click on the button</p>
                 <ul className="m-4 flex flex-wrap">
                        {
                            loader? <ClipLoader color="#fff" size={22} />
                            :randomTasks?.map((elem,ind)=>{
                                return(
                                    <>
                                        <p className="rounded-md py-1 px-4 my-2 items-center min-w-[10rem] m-2 bg-[#272727] flex justify-between">
                                                <span>{elem}</span>
                                            
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