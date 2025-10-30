export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-center bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-4">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col items-center text-left lg:items-start lg:text-left">
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-5xl max-w-xl">
              From Risk To Relief
            </h1>
            <p className="text-gray-600 mb-8 max-w-xl lg:text-lg">
            Revolutionizing healthcare through AI-powered lung cancer screening solutions. Building the future of early detection and prevention in North Macedonia.
            </p>
            <div className="flex w-full justify-left lg:justify-start">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all bg-black text-white shadow-xs hover:bg-gray-800 h-10 px-5">
                Started for free
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative -mb-10 mt-12 lg:mb-0 lg:mt-0">
            <div className="absolute -inset-8 z-0 rounded-2xl bg-gradient-to-r from-[#C7E9FB]/90 via-[#89BFE2]/80 to-[#3B82F6]/50 opacity-40 blur-3xl"></div>
            {/* Mobile-first: 2-column grid with one large card and two stacked small cards */}
            <div className="relative z-10 grid grid-cols-2 gap-4 sm:gap-5 lg:flex lg:justify-end">
              {/* Large card */}
              <div className="col-span-1 row-span-2 h-[220px] sm:h-[260px] lg:h-auto lg:order-1 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src="/hero1.png"
                  alt="placeholder hero"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Right stacked small cards */}
              <div className="flex flex-col gap-4 lg:ml-4 lg:order-2">
                <div className="h-[100px] sm:h-[120px] w-full bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                  <img
                    src="/hero2.png"
                    alt="hero image 2"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="h-[100px] sm:h-[120px] w-full bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
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
