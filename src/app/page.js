import Image from "next/image";
import Link from "next/link";
import svg from './assets/task_home_img.svg'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
          <Image alt='image' className='md:w-[25rem] sm:w-[30rem]' src={svg}/>
           <button className=" mt-10 w-[6rem] p-1 hover:bg-green-700 bg-green-600 rounded ">
            <Link href="/task">Add Task</Link>
           </button>
    </main>
  );
}
