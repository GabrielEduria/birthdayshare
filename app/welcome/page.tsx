
import Link from "next/link";
import Button from "../components/button/Button";

export default function Welcome() {
return (
  <div className="relative h-screen w-full overflow-hidden bg-linear-to-r from-rose-200 to-yellow-100  dark:bg-gray-950">

  {/*BG Tailwind Snippet*/}
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

    <div className="absolute inset-0 h-full backdrop-blur-[6px]" />

   {/* Home Display */}
    <div className="h-full w-full flex justify-center items-center ">

      <div className="relative h-1/2 z-30 text-center px-6">
        <p className="font-roboto inline-block rounded-full shadow-2xl px-4 py-1 text-black backdrop-blur-xl bg-white/20">Birthday Share!</p>
       <h1 className="mx-auto max-w-5xl font-happy-monkey text-4xl lg:text-6xl px-12 text-center tracking-tight text-black font-black leading-tight pt-10">
          A shareable birthday canvas url maker made easy to use
        </h1>
        <h2 className="font-roboto text-lg text-center tracking-tight text-black leading-tight px-12 mt-5">
          A quick minute tool, responsive canvas maker, Zero-hassle, No account Needed
        </h2>
        <div className="flex justify-center mt-4">
          <Link href="/create">
            <Button>Write a message!</Button>
          </Link>
        </div>
      </div>

    </div>
  </div>
);
}


