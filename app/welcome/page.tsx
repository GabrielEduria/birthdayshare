import Link from "next/link";

export default function Welcome() {
  return (
    <div className="welcome-section bg-amber-200 text-black min-h-screen flex">
      <div className="welcome-left-section flex-1 p-5">
        <div className="z-10 relative lg:mt-4 lg:mb-16">
          <Link href="/create" className="text-2xl">
            <h1>Start Designing</h1>
          </Link>
        </div>
        <div className="pb-6 lg:pb-8 flex-1"></div>
      </div>

      <div className="welcome-right-section bg-[#FF9280] flex-1 flex items-center justify-center">
        <div className="z-10 relative p-4 text-center">
          <blockquote className="text-sm md:text-xl lg:text-2xl font-medium mb-1 md:mb-6 lg:mb-8">
            BirthdayShare — a shareable URL app by{" "}
            <a
              href="http://gabrieleduria.com"
              className="text-blue-700 hover:underline transition duration-200"
            >
              Gabbbyyyy
            </a>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
