
import Link from "next/link";
import Button from "../components/button/Button";
import Navbar from "../components/Navbar";

export default function Welcome() {
  return (
   <div className="h-screen w-screen bg-amber-200">
    <Navbar />
      <div className="border-2 h-auto mx-auto">
          <div className="flex flex-col text-center border-2 mt-50">
            <h1 className="font-happy-monkey text-3xl lg:text-4xl text-gray-700 font-black">Welcome to Birthday-Share!</h1>
            <h2 className="font-roboto text-2xl lg:text-3xl text-gray-700 font-medium">Your Shareable Birthday Url Web Application</h2>
          </div>
          <div className="w-full flex justify-center pt-5">
            <Link href='/create'>
              <Button>
                Write a message!
              </Button>
            </Link>
          </div> 
      </div>
   </div>    
  )
}
