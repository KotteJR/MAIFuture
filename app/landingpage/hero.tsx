export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-center bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-4">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col items-start text-left lg:items-start lg:text-left">
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-5xl max-w-xl">
              From Risk To Relief
            </h1>
            <p className="text-gray-600 mb-8 max-w-xl lg:text-lg">
            Revolutionizing healthcare through AI-powered lung cancer screening solutions. Building the future of early detection and prevention in North Macedonia.
            </p>
            <form className="flex w-full lg:w-[420px] items-center gap-2 justify-start lg:justify-start">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button type="button" className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800">
                Submit
              </button>
            </form>
          </div>

          {/* Right Column */}
          <div className="relative -mb-10 mt-12 lg:mb-0 lg:mt-0">
            <div className="absolute -inset-8 z-0 rounded-2xl bg-gradient-to-r from-[#C7E9FB]/90 via-[#89BFE2]/80 to-[#3B82F6]/50 opacity-40 blur-3xl"></div>
            {/* Mobile-first: 2-column grid with one large card and two stacked small cards */}
            <div className="relative z-10 grid grid-cols-2 gap-4 sm:gap-5 lg:flex lg:justify-end lg:items-stretch lg:gap-4">
              {/* Large card */}
              <div className="col-span-1 row-span-2 h-[220px] sm:h-[260px] lg:h-[420px] lg:w-[420px] lg:order-1 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src="/hero1.png"
                  alt="placeholder hero"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Right stacked small cards */}
              <div className="flex flex-col gap-4 lg:order-2 lg:w-[260px]">
                <div className="h-[100px] sm:h-[120px] lg:h-[200px] w-full bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                  <img
                    src="/hero2.png"
                    alt="hero image 2"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="h-[100px] sm:h-[120px] lg:h-[200px] w-full bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                  <img
                    src="/hero3.png"
                    alt="hero image 3"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
