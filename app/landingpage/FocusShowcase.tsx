'use client';

import Image from 'next/image';
import { Users, Shield, Heart, Globe } from 'lucide-react';

export default function FocusShowcase() {
  const items = [
    { icon: Users, title: 'Population Reach', description: 'Expanding access to screening across communities' },
    { icon: Shield, title: 'AI Product Development', description: 'Advanced algorithms for accurate detection' },
    { icon: Heart, title: 'Institutional Partnerships', description: 'Partnering with healthcare providers' },
    { icon: Globe, title: 'Regional Scalability', description: 'Building for sustainable growth and impact' },
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl px-6 lg:px-4 mx-auto">
        {/* Top split: copy left, image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12">
          <div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Our Strategic Focus Areas
            </h2>
            <p className="mt-4 text-md text-gray-600 leading-relaxed max-w-lg">
              &quot;From Risk To Relief&quot; — our mission is to transform lives through technology by enabling earlier detection,
              clearer clinical decisions, and more compassionate care for every patient and provider we serve.
            </p>
          </div>
          <div className="relative w-full h-[350px]">
            <div className="absolute -inset-8 z-0 rounded-2xl bg-gradient-to-r from-[#C7E9FB]/80 via-[#89BFE2]/70 to-[#3B82F6]/70 opacity-50 blur-3xl"></div>
            <div className="relative z-10 rounded-md overflow-hidden w-full h-full">
              <Image src="/features1.png" alt="MAI FUTURE" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Icons grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-8 mt-14">
          {items.map(({ icon: Icon, title, description }, i) => (
            <div key={i} className="flex flex-col">
              <div className="h-12 w-12 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold mt-3 text-gray-900">{title}</h3>
              <p className="text-md text-gray-600 mt-1 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


