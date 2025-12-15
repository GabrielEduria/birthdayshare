
import Link from "next/link";
import Button from "../components/button/Button";
import Navbar from "../components/Navbar";

export default function Welcome() {
return (
  <div className="relative min-h-screen w-full overflow-hidden bg-linear-to-r from-rose-200 to-yellow-100  dark:bg-gray-950">


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

  <div>
      <div className="relative z-30 mx-auto text-center px-6 pt-50">
     
        <h1 className="font-happy-monkey text-4xl lg:text-6xl tracking-tight text-black font-black leading-tight">
          Welcome to Birthday-Share!
        </h1>
        <h2 className="font-roboto text-xl text-black font-medium text-center line-clamp-3 px-20 mt-4">
          A shareable birthday canvas url maker application made easy to use. S for your loved ones.
          No Account no hassle.
        </h2>
        <div className="flex justify-center mt-8">
          <Link href="/create">
            <Button>Write a message!</Button>
          </Link>
        </div>
      </div>
    <div>

    </div>
   </div>
  </div>
);
}


