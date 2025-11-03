import Image from 'next/image'

export default function Hero() {
  return (
    <section id="hero" className="h-screen flex items-center justify-center bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col items-start text-left md:items-start md:text-left">
            <h1 className="my-6 text-pretty text-4xl lg:text-5xl max-w-lg">
              From Risk To Relief
            </h1>
            <p className="text-gray-600 mb-8 max-w-lg lg:text-lg">
            Advancing lung-health screening through AI-enabled imaging technology and standardized clinical workflows. Strengthening early-detection pathways, supporting clinicians, and expanding access to modern lung-cancer screening across the region.

            </p>
            <form className="flex w-full max-w-lg items-center gap-2 justify-start lg:justify-start">
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
          <div className="relative -mb-10 mt-12 md:mb-0 md:mt-0">
            <div className="absolute -inset-8 z-0 rounded-2xl bg-gradient-to-r from-[#C7E9FB]/90 via-[#89BFE2]/80 to-[#3B82F6]/50 opacity-40 blur-3xl"></div>
            {/* Mobile-first: 2-column grid with one large card and two stacked small cards */}
            <div className="relative z-10 grid grid-cols-2 gap-4 sm:gap-5 md:flex md:justify-end md:items-stretch md:gap-4">
              {/* Large card */}
              <div className="col-span-1 row-span-2 h-[220px] sm:h-[260px] md:h-[360px] md:w-[360px] md:order-1 lg:h-[420px] lg:w-[420px] bg-gray-100 rounded-xl overflow-hidden relative">
                <Image src="/hero1.png" alt="MAI Future clinical imaging" fill priority sizes="(max-width: 768px) 50vw, 420px" className="object-cover" />
              </div>
              {/* Right stacked small cards */}
              <div className="flex flex-col gap-4 md:order-2 md:w-[240px] lg:w-[260px]">
                <div className="h-[100px] sm:h-[120px] md:h-[170px] lg:h-[200px] w-full bg-gray-100 rounded-xl overflow-hidden relative">
                  <Image src="/hero2.png" alt="CT scan visualization" fill sizes="(max-width: 768px) 40vw, 260px" className="object-cover" />
                </div>
                <div className="h-[100px] sm:h-[120px] md:h-[170px] lg:h-[200px] w-full bg-gray-100 rounded-xl overflow-hidden relative">
                  <Image src="/hero3.png" alt="Clinical workflow UI" fill sizes="(max-width: 768px) 40vw, 260px" className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
