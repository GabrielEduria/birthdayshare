import Link from "next/link";
import Button from "../components/button/Button";
import { FaArrowRight } from "react-icons/fa";
import Header from "../components/Header";

export default function Welcome() {
  return (
    <div>
    <Header/>
    <section className="h-screen flex bg-white text-black">
   
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 bg-[#F5FAFA]">
         
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
          Celebrate birthdays with a single shareable link
        </h1>

        <p className="text-base md:text-lg text-gray-700 max-w-xl mb-8">
          BirthdayShare lets you create a personalized birthday message page
          that you can share instantly—no apps, no sign-ups for recipients.
        </p>

        <div>
          <Button className="flex items-center gap-2 px-6 py-3 text-base">
            <Link href="/create" className="flex items-center gap-2">
              Create your birthday link <FaArrowRight />
            </Link>
          </Button>
        </div>
      </div>

   
      <div className="hidden lg:flex flex-1 items-center justify-center bg-[#FF9280]">
        <div className="max-w-md text-center px-8">
          <p className="text-xl font-semibold mb-2">
            Simple. Personal. Shareable.
          </p>
          <p className="text-base text-black/80">
            One link. One message. A better way to say happy birthday.
          </p>
        </div>
      </div>
    </section>
    </div>
  );
}
