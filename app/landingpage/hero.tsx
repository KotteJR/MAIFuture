export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-center bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-4">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-5xl max-w-xl">
              From Risk To Relief
            </h1>
            <p className="text-gray-600 mb-8 max-w-xl lg:text-lg">
            Revolutionizing healthcare through AI-powered lung cancer screening solutions. Building the future of early detection and prevention in North Macedonia.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border bg-white shadow-xs hover:bg-gray-100 text-black h-9 px-4 py-2 w-full sm:w-auto">
                Learn More
              </button>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all bg-black text-white shadow-xs hover:bg-gray-800 h-9 px-4 py-2 w-full sm:w-auto">
                Get Notified
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative -mb-16 mt-16 flex justify-center gap-4 lg:mb-0 lg:mt-0 lg:justify-end">
            <div className="absolute -inset-8 z-0 rounded-2xl bg-gradient-to-r from-[#C7E9FB]/90 via-[#89BFE2]/80 to-[#3B82F6]/50 opacity-40 blur-3xl"></div>
            <div className="relative z-10">
              <img
                src="/hero1.png"
                alt="placeholder hero"
                className="h-[400px] rounded-lg object-cover object-center sm:max-w-[320px]"
              />
            </div>
            <div className="relative z-10 hidden sm:flex flex-col gap-4">
              <img
                src="/hero2.png"
                alt="hero image 2"
                className="bg-white w-[256px] flex-1 overflow-hidden rounded-lg object-cover"
              />
              <img
                src="/hero3.png"
                alt="hero image 3"
                className="aspect-[2/1] bg-white w-[256px] overflow-hidden rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
