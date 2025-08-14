import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto bg-bg-light">
        <div className="relative z-10 bg-light pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-15 d-flex justify-content-end align-items-end mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-20 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-bold text-gray-400 sm:text-3xl md:text-7xl">
                <span className="block xl:inline">Elevate Your Style</span>{" "}
                <span className="block text-gray-1000 xl:inline">with Every Click</span>
              </h1>
              <p className="mt-3 text-base  md:text-gray-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Discover trends that resonate with your individuality. Crafted for comfort, designed for you.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-circle shadow">
                  <Link href="/collections">
                    <Button className="w-full flex items-center justify-center px-8 py-7 border border-transparent text-base font-medium rounded-5 text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors hover:scale-105 transform duration-200">
                      Shop New Collection
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 rounded sm:ml-3">
                  <Link href="/lookbook">
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center px-8 py-5 border border-gray-300 text-base font-medium rounded-5 md:text-gray-100 bg-bg-transparent hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors hover:scale-105 transform duration-200"
                    >
                      View Lookbook
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute absolute lg:inset-y-0 lg:right-0 lg:w-full">
    <img
      className="h-40 w-full object-fit-cover sm:h-100 md:h-100 lg:w-full lg:h-155"
      src="/slider.webp"
      alt="Fashion model showcasing latest collection"
    />
  </div>
    </section>
  )
}
