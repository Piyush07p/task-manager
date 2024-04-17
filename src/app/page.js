import Image from "next/image";
import Link from "next/link";
import svg from './assets/task_home_img.svg'
import { GoPencil } from "react-icons/go";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-2">
          <Image alt='image' className='my-4 md:w-[28rem] sm:w-[24rem] w-[17rem]' src={svg}/>
          <div style={{border:"1px solid rgba(109,105,105,0.5)"}} className="py-8 px-2 rounded-md text-[0.8rem] sm:text-[1rem]  w-[90%] sm:w-[80%] md:w-[50%] mt-10 flex items-center justify-between">
             <p className="flex"> <GoPencil className="text-[1.3rem] mx-2"/>Create and track your daily tasks</p>
            <button className="  w-[6rem]  p-2 hover:bg-green-700 bg-green-600 rounded ">
              <Link href="/task">Add Task</Link>
            </button>
          </div>
    </main>
  );
}
