import Image from "next/image";
import Link from "next/link";
import svg from './assets/task_home_img.svg'
import { GoPencil } from "react-icons/go";
import { LiaHandPointRight } from "react-icons/lia";
export default function Home() {
  return (
    <main className="flex text-white min-h-screen flex-col items-center  p-2">
          <Image alt='image' className='my-4 md:w-[28rem] sm:w-[24rem] w-[17rem]' src={svg}/>

          <div style={{border:"1px solid rgba(109,105,105,0.5)"}} className="py-8 px-2 rounded-md text-[0.8rem] sm:text-[1rem]  w-[90%] sm:w-[80%] md:w-[50%] mt-10  items-center justify-between">
            <h1 className="text-[2rem] mx-3 my-2">Features</h1>
             <ul className=""> 
                <p className="flex w-full py-1"><span><LiaHandPointRight className="text-[1.2rem]  mx-2"/></span>Create and modify daily tasks effortlessly on taskfreak.</p>
                <p className="flex w-full  py-1"><span><LiaHandPointRight className="text-[1.2rem]  mx-2"/></span>Track your task status (pending,important,completed) and set tasks to be completed.</p>
                <p className="flex w-full py-1"><span><LiaHandPointRight className="text-[1.2rem]  mx-2"/></span>Track your daily task performance accuracy.</p>
                <p className="flex w-full py-1"><span><LiaHandPointRight className="text-[1.2rem]  mx-2"/></span>Get your overall accuracy based on your performance.</p>
                <p className="flex w-full py-1"><span><LiaHandPointRight className="text-[1.2rem]  mx-2"/></span>Create and modify notes </p>


             </ul>
          </div>

          <div style={{border:"1px solid rgba(109,105,105,0.5)"}} className="py-8 px-2 rounded-md text-[0.8rem] sm:text-[1rem]  w-[90%] sm:w-[80%] md:w-[50%] mt-10 flex items-center justify-between">
             <p className="flex"> <GoPencil className="text-[1.3rem] mx-2"/>Create and track your daily tasks</p>
            <button className="  w-[6rem]  p-2 hover:bg-green-700 bg-green-600 rounded ">
              <Link href="/task">Add Task</Link>
            </button>
          </div>

          <div style={{border:"1px solid rgba(109,105,105,0.5)"}} className="py-8 px-2 rounded-md text-[0.8rem] sm:text-[1rem]  w-[90%] sm:w-[80%] md:w-[50%] mt-10 flex items-center justify-between">
             <p className="flex"> <GoPencil className="text-[1.3rem] mx-2"/>Create  your daily notes</p>
            <button className="  w-[6.5rem]  p-2 hover:bg-green-700 bg-green-600 rounded ">
              <Link href="/notes">Add Notes</Link>
            </button>
          </div>

          


          <div style={{border:"1px solid rgba(109,105,105,0.5)"}} className="py-8 px-2 rounded-md text-[0.8rem] sm:text-[1rem]  w-[90%] sm:w-[80%] md:w-[50%] mt-10 flex items-center justify-between">
             <p className="flex"> <GoPencil className="text-[1.3rem] mx-2"/>Choose Random Tasks</p>
            <button className="  w-[6rem]  p-2 hover:bg-green-700 bg-green-600 rounded ">
              <Link href="/challenges">Choose</Link>
            </button>
          </div>
    </main>
  );
}
