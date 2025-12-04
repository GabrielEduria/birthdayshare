
import Link from "next/link";
import Button from "../components/button/Button";
import Navbar from "../components/Navbar";

export default function Welcome() {
return (
  <div className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-gray-950">

  
    <div className="absolute inset-0 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950" />

    <div className="absolute -inset-[10%] overflow-hidden">
      <div className="absolute top-[10%] left-[20%] w-[30%] aspect-square rounded-full 
        bg-linear-to-r from-purple-300/40 to-indigo-400/40 
        dark:from-purple-600/20 dark:to-indigo-700/20 blur-3xl" />

      <div className="absolute top-[60%] left-[60%] w-[25%] aspect-square rounded-full
        bg-linear-to-r from-amber-300/40 to-orange-400/40 
        dark:from-amber-600/20 dark:to-orange-700/20 blur-3xl" />

      <div className="absolute top-[40%] left-[30%] w-[20%] aspect-square rounded-full
        bg-linear-to-r from-emerald-300/40 to-teal-400/40 
        dark:from-emerald-600/20 dark:to-teal-700/20 blur-3xl" />
    </div>

  
    <div className="absolute inset-0 backdrop-blur-[6px]" />

 
    <div className="relative z-20">
      <Navbar />
    </div>


    <div className="relative z-30 w-5xl mx-auto text-center px-6 pt-50">
      <p className="inline-block px-4 py-1 bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 rounded-2xl text-black dark:text-white mb-4">
        Make a message now!
      </p>
      <h1 className="font-happy-monkey text-4xl lg:text-6xl text-gray-900 dark:text-white font-black leading-tight">
        Welcome to Birthday-Share!
      </h1>
      <h2 className="font-roboto text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 font-medium mt-4">
        Your Shareable Birthday URL Web Application
      </h2>
      <div className="flex justify-center mt-8">
        <Link href="/create">
          <Button>Write a message!</Button>
        </Link>
      </div>
    </div>
  </div>
);
}


