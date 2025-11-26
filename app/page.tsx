import Link from "next/link"

export default function page () {
    return (
        <main className="welcome-section bg-amber-100 text-black ">
            <section className="welcome-left-section  scrollbar-hide-default">
                <div className="z-10 relative lg:mt-4 lg:mb-16 p-5">
                    <Link href="/create" className="text-2xl">
                      <h1>Starting Designing</h1>
                    </Link>
                </div>
                <div className="pb-6 lg:pb-8 flex-1">

                </div>
            </section>

            <section className="welcome-right-section bg-[#FF9280]">
                <div className="z-10 relative lg:mt-4 lg:mb-16 p-4">
                    <blockquote className="text-sm md:text-xl lg:text-2xl font-medium mb-1 md:mb-6 lg:mb-8">
                        BirthdayShare a shareable url APP by <a href="http://gabrieleduria.com" className="text-blue-700 hover:underline transition-0.2s">Gabbbyyyy</a>
                    </blockquote>
                </div>
            </section>
        </main>
    )
}