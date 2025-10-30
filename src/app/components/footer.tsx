import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top: brand + nav + cta */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logos/logo.png"
                alt="MAI Future"
                width={160}
                height={40}
                className="h-8 w-auto"
                priority
              />
              <span className="sr-only">MAI Future</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-gray-600">
              AI-powered lung cancer screening solutions for earlier detection and better outcomes.
            </p>
          </div>


          {/* CTA */}
          <form className="w-full max-w-md md:w-auto">
            <label htmlFor="footer-email" className="sr-only">Email</label>
            <div className="flex gap-2">
              <input
                id="footer-email"
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button type="button" className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800">
                Sign up
              </button>
            </div>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 pt-6 text-sm text-gray-600 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} MAI Future. All rights reserved.</p>
          </div>
        </div>
    </footer>
  );
}
